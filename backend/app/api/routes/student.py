import json
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, select

from app.api.deps import DbSession, require_role
from app.models import Application, Job, StudentProfile, User
from app.schemas import (
    ApplicationsResponse,
    ApplicationResponse,
    OpportunitiesResponse,
    OpportunityResponse,
    StudentDashboardResponse,
    StudentProfileResponse,
    StudentProfileUpdate,
)

router = APIRouter(prefix="/student", tags=["student"])
student_user = Depends(require_role("student"))


def to_response(user: User, profile: StudentProfile, applications_sent: int = 0) -> StudentProfileResponse:
    skills = json.loads(profile.skills_json or "[]")
    profile_completion = min(92, 25 + len(skills) * 4 + sum(bool(value) for value in (profile.title, profile.location, profile.github, profile.bio)) * 8)
    readiness_score = min(88, 20 + len(skills) * 5 + (15 if applications_sent else 0))
    return StudentProfileResponse(
        user_id=user.id,
        name=user.name,
        title=profile.title,
        location=profile.location,
        email=user.email,
        github=profile.github,
        bio=profile.bio,
        avatar_url=profile.avatar_url,
        profile_strength=profile_completion,
        completed_skills=len(skills),
        applications_sent=applications_sent,
        match_readiness={"label": "Developing" if readiness_score < 70 else "Strong", "score": readiness_score},
        ats_score={"score": min(92, profile.ats_score), "max": 100},
        skills=skills,
        education=json.loads(profile.education_json or "[]"),
        experience=json.loads(profile.experience_json or "[]"),
    )


@router.get("/profile", response_model=StudentProfileResponse)
def get_profile(db: DbSession, user: User = student_user) -> StudentProfileResponse:
    profile = db.scalar(select(StudentProfile).where(StudentProfile.user_id == user.id))
    if profile is None:
        raise HTTPException(status_code=404, detail="Student profile not found")
    applications_sent = db.scalar(select(func.count(Application.id)).where(Application.student_id == user.id)) or 0
    return to_response(user, profile, applications_sent)


@router.put("/profile", response_model=StudentProfileResponse)
def update_profile(
    payload: StudentProfileUpdate,
    db: DbSession,
    user: User = student_user,
) -> StudentProfileResponse:
    profile = db.scalar(select(StudentProfile).where(StudentProfile.user_id == user.id))
    if profile is None:
        raise HTTPException(status_code=404, detail="Student profile not found")

    updates = payload.model_dump(exclude_unset=True)
    if "name" in updates:
        user.name = updates.pop("name")
    for field, value in updates.items():
        setattr(profile, field, value)
    db.commit()
    db.refresh(user)
    db.refresh(profile)
    applications_sent = db.scalar(select(func.count(Application.id)).where(Application.student_id == user.id)) or 0
    return to_response(user, profile, applications_sent)


@router.get("/dashboard", response_model=StudentDashboardResponse)
def get_dashboard(db: DbSession, user: User = student_user) -> StudentDashboardResponse:
    profile = db.scalar(select(StudentProfile).where(StudentProfile.user_id == user.id))
    if profile is None:
        raise HTTPException(status_code=404, detail="Student profile not found")
    applications_sent = db.scalar(select(func.count(Application.id)).where(Application.student_id == user.id)) or 0
    student_profile = to_response(user, profile, applications_sent)
    skills = json.loads(profile.skills_json or "[]")
    analysis = json.loads(profile.ai_analysis_json or "{}")
    target_roles = analysis.get("targetRoles", [])
    modules = analysis.get("learningModules", [])
    return StudentDashboardResponse(
        profile=student_profile,
        pending_task={
            "id": "resume-review",
            "title": "Review your extracted profile",
            "subtitle": "Confirm your extracted details before using personalized recommendations.",
            "ctaLabel": "Review Profile",
        },
        activity=[
            {"id": "profile-created", "title": "Profile created from resume", "meta": "Just now", "active": True},
            {"id": "skill-detected", "title": f"Detected {len(skills)} skills", "meta": "Extracted from your resume", "active": False},
        ],
        mentors=[
            {
                "id": "demo-mentor",
                "name": "Sarah Jenkins",
                "role": "Senior Data Scientist • Available for career guidance",
                "linkedinUrl": "https://www.linkedin.com/search/results/people/?keywords=data%20science%20mentor",
            }
        ],
        recommendations=[
            {"id": f"role-{index}", "type": "job", "icon": "ml", "title": role, "meta": "Recommended by your resume analysis", "linkTo": "/student/opportunities"}
            for index, role in enumerate(target_roles[:2])
        ] + [
            {"id": f"module-{index}", "type": "course", "icon": "code", "title": module.get("title", "Learning recommendation"), "meta": module.get("reason", "Personalized learning recommendation"), "linkTo": "/student/skill-mapping"}
            for index, module in enumerate(modules[:max(0, 2 - len(target_roles[:2]))])
        ],
    )


@router.get("/opportunities", response_model=OpportunitiesResponse)
def get_opportunities(db: DbSession, user: User = student_user) -> OpportunitiesResponse:
    jobs = db.scalars(select(Job).where(Job.status == "Active").order_by(Job.created_at.desc())).all()
    applied_job_ids = set(db.scalars(select(Application.job_id).where(Application.student_id == user.id)).all())
    opportunities = []
    for job in jobs:
        skills = [skill.strip() for skill in job.required_skills.split(",") if skill.strip()]
        opportunities.append(
            OpportunityResponse(
                id=job.id,
                title=job.title,
                company=job.company,
                location=job.location,
                type=job.job_type,
                term=job.term,
                pay=job.pay,
                required_skills=skills,
                match_score=0 if job.id in applied_job_ids else 50,
            )
        )
    return OpportunitiesResponse(opportunities=opportunities)


@router.post("/opportunities/{job_id}/apply", response_model=ApplicationResponse, status_code=201)
def apply_to_opportunity(job_id: UUID, db: DbSession, user: User = student_user) -> ApplicationResponse:
    job = db.get(Job, job_id)
    if job is None or job.status != "Active":
        raise HTTPException(status_code=404, detail="Opportunity not found")
    existing = db.scalar(
        select(Application).where(Application.job_id == job.id, Application.student_id == user.id)
    )
    if existing:
        raise HTTPException(status_code=409, detail="You have already applied to this job")
    application = Application(job_id=job.id, student_id=user.id, match_score=50)
    db.add(application)
    db.commit()
    db.refresh(application)
    return ApplicationResponse(
        id=application.id,
        job_id=job.id,
        job_title=job.title,
        company=job.company,
        status=application.status,
        match_score=application.match_score,
        applied_at=application.applied_at,
    )


@router.get("/applications", response_model=ApplicationsResponse)
def get_student_applications(db: DbSession, user: User = student_user) -> ApplicationsResponse:
    rows = db.execute(
        select(Application, Job)
        .join(Job, Application.job_id == Job.id)
        .where(Application.student_id == user.id)
        .order_by(Application.applied_at.desc())
    ).all()
    return ApplicationsResponse(
        applications=[
            ApplicationResponse(
                id=application.id,
                job_id=job.id,
                job_title=job.title,
                company=job.company,
                status=application.status,
                match_score=application.match_score,
                applied_at=application.applied_at,
            )
            for application, job in rows
        ]
    )


@router.get("/skills/assessment")
def get_skill_assessment(db: DbSession, user: User = student_user) -> dict:
    profile = db.scalar(select(StudentProfile).where(StudentProfile.user_id == user.id))
    skills = json.loads(profile.skills_json or "[]") if profile else []
    provisional_scores = [0.52, 0.68, 0.61, 0.77, 0.57]
    inventory = [
        {
            "id": f"skill-{index}",
            "skill": skill,
            "proficiency": provisional_scores[(index - 1) % len(provisional_scores)],
            "level": "Resume estimate",
            "lastTested": "Not verified",
            "highlighted": True,
        }
        for index, skill in enumerate(skills, start=1)
    ]
    technical_score = min(92, 35 + len(skills) * 5)
    return {
        "scoreCards": [
            {"id": "technical", "label": "Technical Skills", "subLabel": ", ".join(skills[:3]) or "Resume skills", "score": technical_score},
            {"id": "soft", "label": "Soft Skills", "subLabel": "Needs assessment", "score": 0},
            {"id": "aptitude", "label": "Aptitude", "subLabel": "Needs assessment", "score": 0},
        ],
        "radarAxes": [{"label": skill, "value": provisional_scores[index % len(provisional_scores)]} for index, skill in enumerate(skills)],
        "skillInventory": inventory,
        "dailyChallenges": [{"id": "challenge-1", "tag": skills[0] if skills else "Profile", "title": "Build your baseline", "description": "Complete a short challenge to verify your skills."}],
        "atsMatch": {"score": profile.ats_score if profile else 0, "max": 100, "label": "Resume score", "description": "Calculated from your uploaded resume."},
        "assessmentHistory": [],
    }


@router.get("/career-guidance")
def get_career_guidance(db: DbSession, user: User = student_user) -> dict:
    profile = db.scalar(select(StudentProfile).where(StudentProfile.user_id == user.id))
    skills = json.loads(profile.skills_json or "[]") if profile else []
    target_role = profile.title if profile and profile.title else "Your target role"
    analysis = json.loads(profile.ai_analysis_json or "{}") if profile else {}
    certifications = analysis.get("certifications", analysis.get("recommendedCertifications", []))
    if not certifications:
        certification_skill = skills[0] if skills else "your target skill"
        certifications = [
            {"title": f"{certification_skill} Professional Certificate", "reason": f"A provisional recommendation based on your detected {certification_skill} skill."},
            {"title": "Communication and Problem Solving Certificate", "reason": "A provisional recommendation to strengthen skills not measurable from a resume."},
        ]
    current_match = min(82, 35 + len(skills) * 5)
    projected_match = min(92, current_match + 15)
    return {
        "pageHeader": {"targetRole": target_role, "currentMatch": current_match},
        "impactPath": {"title": "Build confidence from your resume", "description": "Complete assessments to turn detected skills into verified skills.", "currentScore": current_match, "projectedScore": projected_match},
        "marketTrends": [{"id": f"trend-{skill}", "skill": skill, "percentage": max(55, 85 - index * 7), "isGap": False} for index, skill in enumerate(skills[:4])],
        "skillGaps": [{"id": f"gap-{index}", "skill": item.get("skill", "Skill gap"), "requiredBy": item.get("priority", "Review"), "description": item.get("reason", "Identified by profile analysis."), "icon": "database"} for index, item in enumerate(analysis.get("skillGaps", []))],
        "industries": [{"id": f"industry-{index}", "name": item.get("name", "Industry"), "description": item.get("reason", "Recommended by profile analysis."), "icon": "building", "iconColor": "text-emerald-500", "iconBg": "bg-emerald-50"} for index, item in enumerate(analysis.get("recommendedIndustries", []))],
        "learningModules": [{"id": f"module-{index}", "title": item.get("title", "Learning module"), "statusText": f"Recommended • {item.get('estimatedHours', 'Time varies')}", "status": "in-progress", "progress": 0} for index, item in enumerate(analysis.get("learningModules", []))],
        "certifications": [{"id": f"cert-{index}", "title": item.get("title", "Certification"), "description": item.get("reason", "Provisional recommendation based on your profile."), "icon": "award"} for index, item in enumerate(certifications)],
    }


@router.get("/portfolio")
def get_portfolio(db: DbSession, user: User = student_user) -> dict:
    profile = db.scalar(select(StudentProfile).where(StudentProfile.user_id == user.id))
    skills = json.loads(profile.skills_json or "[]") if profile else []
    return {"profile": to_response(user, profile).model_dump() if profile else {}, "credentials": [], "achievements": [], "projects": [], "techStack": [{"title": "SKILLS FROM RESUME", "skills": skills}], "documents": []}


@router.get("/progress")
def get_progress(user: User = student_user) -> dict:
    return {"activeCourses": [], "pathSteps": [{"label": "Upload resume", "state": "completed"}, {"label": "Verify skills", "state": "current"}, {"label": "Apply to opportunities", "state": "locked"}], "recommendedCerts": [], "learningHours": {"total": "0 hrs", "trend": "0%", "bars": [0, 0, 0, 0, 0, 0, 0], "days": ["M", "T", "W", "T", "F", "S", "S"]}, "upcomingAssessments": [], "marketTrends": [], "networkActivity": []}
