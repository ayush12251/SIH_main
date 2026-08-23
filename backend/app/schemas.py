from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


Role = Literal["student", "industry", "faculty"]


class UserCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    role: Role


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    email: EmailStr
    role: str
    created_at: datetime
    updated_at: datetime


class AuthResponse(BaseModel):
    user: UserResponse
    access_token: str
    token_type: str = "bearer"


class StudentProfileResponse(BaseModel):
    user_id: UUID
    name: str
    title: str
    location: str
    email: EmailStr
    github: str
    bio: str
    avatar_url: str | None
    profile_strength: int
    completed_skills: int
    applications_sent: int
    match_readiness: dict
    ats_score: dict
    skills: list[str]
    education: list[dict]
    experience: list[dict]


class StudentProfileUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=120)
    title: str | None = Field(default=None, max_length=160)
    location: str | None = Field(default=None, max_length=160)
    github: str | None = Field(default=None, max_length=255)
    bio: str | None = Field(default=None, max_length=5000)


class OpportunityResponse(BaseModel):
    id: UUID
    title: str
    company: str
    location: str
    type: str
    term: str
    pay: str
    required_skills: list[str]
    match_score: int


class OpportunitiesResponse(BaseModel):
    opportunities: list[OpportunityResponse]


class ApplicationResponse(BaseModel):
    id: UUID
    job_id: UUID
    job_title: str
    company: str
    status: str
    match_score: int
    applied_at: datetime


class ApplicationsResponse(BaseModel):
    applications: list[ApplicationResponse]


class ResumeParseResponse(BaseModel):
    parsed_profile: dict
    ats_score: dict
    resume_url: str


class StudentDashboardResponse(BaseModel):
    profile: StudentProfileResponse
    pending_task: dict
    activity: list[dict]
    mentors: list[dict]
    recommendations: list[dict]
