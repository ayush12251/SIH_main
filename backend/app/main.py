from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text

from app.api.routes import auth, resume, student
from app.core.config import get_settings
from app.db import Base, engine
from app import models
from app.db import SessionLocal
from app.seed import seed_development_jobs

settings = get_settings()
Base.metadata.create_all(bind=engine)
with engine.begin() as connection:
    existing_columns = {column["name"] for column in inspect(engine).get_columns("student_profiles")}
    for column_name, definition in {
        "skills_json": "TEXT NOT NULL DEFAULT '[]'",
        "education_json": "TEXT NOT NULL DEFAULT '[]'",
        "experience_json": "TEXT NOT NULL DEFAULT '[]'",
        "ats_score": "INTEGER NOT NULL DEFAULT 0",
        "ai_analysis_json": "TEXT NOT NULL DEFAULT '{}'",
    }.items():
        if column_name not in existing_columns:
            connection.execute(text(f"ALTER TABLE student_profiles ADD COLUMN {column_name} {definition}"))
with SessionLocal() as db:
    seed_development_jobs(db)

app = FastAPI(title=settings.app_name, version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["system"])
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(auth.router, prefix="/v1")
app.include_router(student.router, prefix="/v1")
app.include_router(resume.router, prefix="/v1")
app.include_router(resume.student_router, prefix="/v1")
