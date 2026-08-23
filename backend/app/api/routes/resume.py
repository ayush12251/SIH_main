import json
from pathlib import Path
from uuid import UUID, uuid4

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy import select

from app.api.deps import DbSession, require_role
from app.models import ResumeDocument, StudentProfile, User
from app.schemas import ResumeParseResponse
from app.services.resume_parser import analyze_profile_with_llama, extract_text, parse_resume_best_effort

router = APIRouter(prefix="/ai", tags=["resume"])
student_user = Depends(require_role("student"))
UPLOAD_DIR = Path(__file__).resolve().parents[3] / "uploads" / "resumes"
MAX_RESUME_SIZE = 10 * 1024 * 1024


@router.post("/resume/parse", response_model=ResumeParseResponse, status_code=status.HTTP_200_OK)
def parse_uploaded_resume(
    db: DbSession,
    resume: UploadFile = File(...),
    user: User = student_user,
) -> ResumeParseResponse:
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF resumes are supported")
    pdf_bytes = resume.file.read(MAX_RESUME_SIZE + 1)
    if len(pdf_bytes) > MAX_RESUME_SIZE:
        raise HTTPException(status_code=413, detail="Resume exceeds the 10MB limit")
    if not pdf_bytes.startswith(b"%PDF"):
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid PDF")
    try:
        text = extract_text(pdf_bytes)
        parsed = parse_resume_best_effort(text, resume.filename or "resume.pdf")
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=422, detail="Could not read this PDF") from error

    document_id = uuid4()
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    path = UPLOAD_DIR / f"{document_id}.pdf"
    path.write_bytes(pdf_bytes)
    db.add(ResumeDocument(id=document_id, student_id=user.id, filename=resume.filename or "resume.pdf", storage_path=str(path)))
    profile = db.scalar(select(StudentProfile).where(StudentProfile.user_id == user.id))
    if profile:
        if parsed["name"]:
            user.name = parsed["name"]
        profile.title = parsed["title"] or profile.title
        profile.location = parsed["location"] or profile.location
        profile.github = parsed["github"] or profile.github
        profile.bio = parsed["bio"] or profile.bio
        profile.skills_json = json.dumps(parsed.get("skills", []))
        profile.education_json = json.dumps(parsed.get("education", []))
        profile.experience_json = json.dumps(parsed.get("experience", []))
        profile.ats_score = parsed.get("atsScore", {}).get("score", 0)
        analysis = analyze_profile_with_llama(parsed)
        profile.ai_analysis_json = json.dumps(analysis or {})
    db.commit()
    parsed["resumeUrl"] = f"/v1/student/resumes/{document_id}"
    return ResumeParseResponse(parsed_profile=parsed, ats_score=parsed["atsScore"], resume_url=parsed["resumeUrl"])


student_router = APIRouter(prefix="/student", tags=["resume"])


@student_router.get("/resumes/{resume_id}")
def download_resume(resume_id: UUID, db: DbSession, user: User = student_user) -> FileResponse:
    document = db.scalar(select(ResumeDocument).where(ResumeDocument.id == resume_id, ResumeDocument.student_id == user.id))
    if document is None or not Path(document.storage_path).is_file():
        raise HTTPException(status_code=404, detail="Resume not found")
    return FileResponse(document.storage_path, media_type="application/pdf", filename=document.filename)
