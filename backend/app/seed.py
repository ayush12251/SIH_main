from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Job


def seed_development_jobs(db: Session) -> None:
    if db.scalar(select(Job.id).limit(1)) is not None:
        return
    db.add_all(
        [
            Job(
                title="Product Management Intern",
                company="TechFlow",
                location="San Francisco, CA",
                job_type="Hybrid",
                term="Summer 2026",
                pay="$35-45/hr",
                required_skills="Python, SQL, Agile",
            ),
            Job(
                title="Data Science Intern",
                company="Quantify Analytics",
                location="New York, NY",
                job_type="Remote",
                term="Summer 2026",
                pay="$40-50/hr",
                required_skills="Python, R, Statistics",
            ),
        ]
    )
    db.commit()
