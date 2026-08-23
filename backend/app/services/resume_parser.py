import re
import json
import logging
from io import BytesIO
from urllib.error import URLError
from urllib.request import Request, urlopen

from pypdf import PdfReader

from app.core.config import get_settings

logger = logging.getLogger(__name__)

KNOWN_SKILLS = {
    "python": "Python",
    "javascript": "JavaScript",
    "typescript": "TypeScript",
    "react": "React",
    "next.js": "Next.js",
    "node.js": "Node.js",
    "sql": "SQL",
    "postgresql": "PostgreSQL",
    "machine learning": "Machine Learning",
    "data analysis": "Data Analysis",
    "docker": "Docker",
    "aws": "AWS",
    "git": "Git",
}


def extract_text(pdf_bytes: bytes) -> str:
    reader = PdfReader(BytesIO(pdf_bytes))
    text = "\n".join(page.extract_text() or "" for page in reader.pages).strip()
    if not text:
        raise ValueError("No selectable text found; scanned PDF OCR is not enabled yet")
    return text


def parse_resume(text: str, filename: str) -> dict:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    email_match = re.search(r"[\w.+-]+@[\w-]+\.[\w.-]+", text)
    github_match = re.search(r"(?:https?://)?(?:www\.)?github\.com/[\w-]+", text, re.IGNORECASE)
    skills = [label for key, label in KNOWN_SKILLS.items() if re.search(rf"(?<![\w]){re.escape(key)}(?![\w])", text, re.IGNORECASE)]
    name = lines[0] if lines and "@" not in lines[0] else ""
    title = next((line for line in lines[1:8] if any(word in line.lower() for word in ("student", "engineer", "developer", "analyst", "designer"))), "")
    score = min(100, 35 + len(skills) * 5 + (15 if email_match else 0) + (10 if len(text) > 500 else 0))
    return {
        "name": name[:120],
        "title": title[:160],
        "location": "",
        "email": email_match.group(0) if email_match else "",
        "github": github_match.group(0) if github_match else "",
        "bio": "",
        "skills": skills,
        "education": [],
        "experience": [],
        "sourceFilename": filename,
        "extractionMethod": "pdf-text",
        "needsReview": True,
        "atsScore": {"score": score, "max": 100},
    }


def parse_resume_with_llama(text: str, filename: str) -> dict | None:
    settings = get_settings()
    resume_text = text[:16000]
    prompt = f"""Extract structured information from this resume. Return ONLY valid JSON, with no markdown.
Use empty strings or empty arrays when information is missing. Do not invent facts.
Extract location from the contact/header area when present. It may be written as a city,
city and state, city and country, or a full address. Return only the location text, without
labels such as "Location:". Do not use a university or company location as the student's location.
The JSON must have exactly these keys: name, title, location, email, github, bio, skills, education, experience.
Each education item must have: degree, institution, year, gpa.
Each experience item must have: role, company, duration, description.
skills must be an array of concise skill names.

Resume filename: {filename}
Resume text:
{resume_text}"""
    request_body = json.dumps({
        "model": settings.ollama_model,
        "prompt": prompt,
        "stream": False,
        "format": "json",
        "keep_alive": "10m",
        "options": {
            "temperature": 0,
            "num_ctx": 4096,
            "num_predict": 700,
        },
    }).encode("utf-8")
    request = Request(
        f"{settings.ollama_base_url.rstrip('/')}/api/generate",
        data=request_body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=settings.ollama_timeout_seconds) as response:
            result = json.loads(response.read().decode("utf-8"))
        extracted = json.loads(result.get("response", "{}"))
    except (URLError, TimeoutError, OSError, ValueError, json.JSONDecodeError) as error:
        logger.warning("Ollama resume extraction unavailable: %s", error)
        return None

    if not isinstance(extracted, dict) or not isinstance(extracted.get("skills", []), list):
        logger.warning("Ollama returned an invalid resume extraction response")
        return None
    parsed = {
        "name": str(extracted.get("name", ""))[:120],
        "title": str(extracted.get("title", ""))[:160],
        "location": str(extracted.get("location", ""))[:160],
        "email": str(extracted.get("email", ""))[:320],
        "github": str(extracted.get("github", ""))[:255],
        "bio": str(extracted.get("bio", ""))[:5000],
        "skills": [str(skill)[:100] for skill in extracted["skills"][:50]],
        "education": extracted.get("education", []) if isinstance(extracted.get("education", []), list) else [],
        "experience": extracted.get("experience", []) if isinstance(extracted.get("experience", []), list) else [],
        "sourceFilename": filename,
        "extractionMethod": "ollama-llama",
        "needsReview": True,
    }
    parsed["atsScore"] = {"score": min(92, 35 + len(parsed["skills"]) * 5), "max": 100}
    return parsed


def parse_resume_best_effort(text: str, filename: str) -> dict:
    return parse_resume_with_llama(text, filename) or parse_resume(text, filename)


def analyze_profile_with_llama(profile: dict) -> dict | None:
    settings = get_settings()
    prompt = f"""Analyze this student's resume profile and return ONLY valid JSON.
Do not invent facts. Make recommendations specific to this student. Use empty arrays when evidence is insufficient.
Return exactly these keys:
skillGaps (array of objects with skill, reason, priority),
recommendedIndustries (array of objects with name, reason),
learningModules (array of objects with title, reason, estimatedHours),
certifications (array of objects with title, reason),
careerSummary (string), targetRoles (array of strings).

Student profile:
{json.dumps(profile, ensure_ascii=True)[:16000]}"""
    body = json.dumps({
        "model": settings.ollama_model,
        "prompt": prompt,
        "stream": False,
        "format": "json",
        "keep_alive": "10m",
        "options": {"temperature": 0.2, "num_ctx": 4096, "num_predict": 900},
    }).encode("utf-8")
    request = Request(f"{settings.ollama_base_url.rstrip('/')}/api/generate", data=body, headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urlopen(request, timeout=settings.ollama_timeout_seconds) as response:
            result = json.loads(response.read().decode("utf-8"))
        analysis = json.loads(result.get("response", "{}"))
    except (URLError, TimeoutError, OSError, ValueError, json.JSONDecodeError) as error:
        logger.warning("Ollama career analysis unavailable: %s", error)
        return None
    required_keys = ("skillGaps", "recommendedIndustries", "learningModules", "certifications", "careerSummary", "targetRoles")
    if not isinstance(analysis, dict) or any(key not in analysis for key in required_keys):
        logger.warning("Ollama returned an invalid career analysis response")
        return None
    return analysis
