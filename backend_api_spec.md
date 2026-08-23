# Internix Platform — Backend API Specification

> **Project:** Internix — AI-powered internship matching platform for students and recruiters  
> **Frontend Stack:** React + TypeScript (Vite)  
> **Suggested Backend:** Node.js (Express/Fastify) or Python (FastAPI/Django)  
> **Auth:** JWT Bearer tokens (access + refresh pattern)  
> **Base URL:** `https://api.internix.io/v1`

---

## Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Authentication & Authorization](#2-authentication--authorization)
3. [Data Models (Schemas)](#3-data-models-schemas)
4. [API Endpoints](#4-api-endpoints)
   - [Auth](#41-auth-endpoints)
   - [Student — Profile & Dashboard](#42-student--profile--dashboard)
   - [Student — Skill Assessment](#43-student--skill-assessment)
   - [Student — Career Guidance / Skill Mapping](#44-student--career-guidance--skill-mapping)
   - [Student — Opportunities](#45-student--opportunities)
   - [Student — Portfolio](#46-student--portfolio)
   - [Student — Progress / Learning](#47-student--progress--learning)
   - [Recruiter — Dashboard & Job Postings](#48-recruiter--dashboard--job-postings)
   - [Recruiter — ATS / Applications](#49-recruiter--ats--applications)
   - [Recruiter — Candidate Search](#410-recruiter--candidate-search)
   - [Recruiter — Analytics](#411-recruiter--analytics)
   - [Recruiter — Learning Hub](#412-recruiter--learning-hub)
   - [AI / Resume Processing](#413-ai--resume-processing)
5. [Error Handling](#5-error-handling)
6. [Auth & Role Matrix](#6-auth--role-matrix)
7. [Suggested Database Schema](#7-suggested-database-schema)
8. [Implementation Notes for the Frontend](#8-implementation-notes-for-the-frontend)

---

## 1. Architecture Overview

```
+---------------------------------------------+
|        React Frontend (Vite)                |
|  Roles: student | industry | faculty | admin |
+--------------------+------------------------+
                     | HTTPS / REST
+--------------------v------------------------+
|             Backend API (v1)                |
|  - JWT Auth middleware                      |
|  - Role-based guards                        |
|  - File upload (resume PDF)                 |
|  - AI microservice connector                |
+------+---------------------------+----------+
       |                           |
+------v------+          +---------v---------+
|  PostgreSQL  |          |  AI Microservice  |
|  (primary DB)|          |  (LLM resume      |
|              |          |   parser + vector  |
|              |          |   matcher)         |
+--------------+          +-------------------+
```

**User Roles** (from `AuthContext.tsx`):

| Role | Description |
|---|---|
| `student` | Internship seeker; accesses student portal |
| `industry` | Recruiter/employer; accesses recruiter portal |
| `faculty` | Academic mentor (future) |
| `admin` | Platform administrator |

---

## 2. Authentication & Authorization

All protected routes require:
```
Authorization: Bearer <access_token>
```

**Token Lifetimes (recommended):**
- Access Token: `15 minutes`
- Refresh Token: `7 days` (stored in `httpOnly` cookie)

---

## 3. Data Models (Schemas)

### 3.1 User
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "role": "student | industry | faculty | admin",
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

### 3.2 StudentProfile
```json
{
  "userId": "uuid",
  "title": "string",
  "location": "string",
  "github": "string",
  "bio": "string",
  "avatarUrl": "string | null",
  "profileStrength": "number (0-100)",
  "completedSkills": "number",
  "applicationsSent": "number",
  "matchReadiness": { "label": "string", "score": "number" },
  "atsScore": { "score": "number", "max": 100 },
  "skills": ["string"],
  "education": [
    {
      "id": "uuid",
      "degree": "string",
      "institution": "string",
      "year": "string",
      "gpa": "string | null"
    }
  ],
  "experience": [
    {
      "id": "uuid",
      "role": "string",
      "company": "string",
      "duration": "string",
      "description": "string"
    }
  ]
}
```

### 3.3 Job
```json
{
  "id": "uuid",
  "recruiterId": "uuid",
  "title": "string",
  "company": "string",
  "department": "string",
  "location": "string",
  "type": "Remote | Hybrid | On-site",
  "pay": "string",
  "term": "string",
  "duration": "string | null",
  "status": "Active | Review | Closed",
  "requiredSkills": ["string"],
  "applicants": "number",
  "matches": "number",
  "performance": "string",
  "performanceTrend": "up | down | flat",
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

### 3.4 Application
```json
{
  "id": "uuid",
  "jobId": "uuid",
  "studentId": "uuid",
  "status": "Applied | Reviewed | Interviewing | Offered | Rejected",
  "matchScore": "number (0-100)",
  "appliedAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

### 3.5 SkillInventoryRow
```json
{
  "id": "uuid",
  "studentId": "uuid",
  "skill": "string",
  "subSkill": "string | null",
  "proficiency": "number (0.0-1.0)",
  "level": "Expert | Advanced | Intermediate | Novice | Beginner",
  "lastTested": "ISO8601 | null"
}
```

### 3.6 Course / LearningModule
```json
{
  "id": "uuid",
  "title": "string",
  "provider": "string",
  "duration": "string",
  "level": "string",
  "status": "In Progress | Completed | Not Started",
  "progress": "number (0-100)"
}
```

---

## 4. API Endpoints

> **Legend:**
> GET | POST | PUT/PATCH | DELETE
> `[Auth]` = Requires JWT | `[Role]` = Role-restricted

---

### 4.1 Auth Endpoints

#### `POST /auth/register`
Register a new user.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "student | industry | faculty"
}
```

**Response `201`:**
```json
{
  "user": { "id": "...", "name": "...", "email": "...", "role": "..." },
  "accessToken": "jwt_string",
  "refreshToken": "jwt_string"
}
```

---

#### `POST /auth/login`
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response `200`:**
```json
{
  "user": { "id": "...", "name": "...", "email": "...", "role": "..." },
  "accessToken": "jwt_string",
  "refreshToken": "jwt_string"
}
```

---

#### `POST /auth/refresh`
Get a new access token using a refresh token.

**Request Body:**
```json
{ "refreshToken": "jwt_string" }
```

**Response `200`:**
```json
{ "accessToken": "jwt_string" }
```

---

#### `POST /auth/logout` [Auth]
Invalidate the refresh token.

**Response `204`:** *(No Content)*

---

#### `GET /auth/me` [Auth]
Get currently authenticated user.

**Response `200`:**
```json
{ "id": "...", "name": "...", "email": "...", "role": "..." }
```

---

### 4.2 Student — Profile & Dashboard

#### `GET /student/profile` [Auth] [Role: student]
Returns the student's full profile and dashboard summary.

**Response `200`:**
```json
{
  "profile": {
    "name": "string",
    "title": "string",
    "location": "string",
    "email": "string",
    "github": "string",
    "bio": "string",
    "avatarUrl": "string | null",
    "profileStrength": 85,
    "completedSkills": 12,
    "applicationsSent": 5,
    "matchReadiness": { "label": "High", "score": 78 },
    "atsScore": { "score": 82, "max": 100 }
  },
  "pendingTask": {
    "id": "string",
    "title": "string",
    "subtitle": "string",
    "ctaLabel": "string"
  },
  "activity": [
    { "id": "string", "title": "string", "meta": "string", "active": true }
  ],
  "mentors": [
    { "id": "string", "name": "string", "role": "string" }
  ],
  "recommendations": [
    { "id": "string", "type": "job | course", "title": "string", "meta": "string" }
  ]
}
```

---

#### `PUT /student/profile` [Auth] [Role: student]
Update the student's editable profile fields.

**Request Body:** *(all fields optional)*
```json
{
  "name": "string",
  "title": "string",
  "location": "string",
  "github": "string",
  "bio": "string",
  "education": [
    { "degree": "string", "institution": "string", "year": "string", "gpa": "string" }
  ],
  "experience": [
    { "role": "string", "company": "string", "duration": "string", "description": "string" }
  ]
}
```

**Response `200`:**
```json
{ "message": "Profile updated successfully", "profile": { "...updated fields..." } }
```

---

#### `POST /student/profile/avatar` [Auth] [Role: student]
Upload a profile photo.

**Request:** `multipart/form-data`
- Field: `avatar` (image file, max 5MB)

**Response `200`:**
```json
{ "avatarUrl": "https://cdn.internix.io/avatars/uuid.jpg" }
```

---

### 4.3 Student — Skill Assessment

#### `GET /student/skills/assessment` [Auth] [Role: student]
Returns the full skill assessment data for the radar chart, inventory, and ATS score.

**Response `200`:**
```json
{
  "scoreCards": [
    { "id": "tech", "label": "Technical Domain", "subLabel": "ML, Python", "score": 85 },
    { "id": "soft", "label": "Soft Skills", "subLabel": "Communication", "score": 92 },
    { "id": "aptitude", "label": "Aptitude", "subLabel": "Problem Solving", "score": 68 }
  ],
  "radarAxes": [
    { "label": "Machine Learning", "value": 0.85 },
    { "label": "Statistics", "value": 0.75 }
  ],
  "skillInventory": [
    {
      "id": "s1",
      "skill": "Machine Learning",
      "subSkill": null,
      "proficiency": 0.95,
      "level": "Expert",
      "lastTested": "2023-10-12",
      "highlighted": false
    }
  ],
  "dailyChallenges": [
    { "id": "c1", "tag": "Python", "title": "Pandas Data Manipulation", "description": "5 quick questions..." }
  ],
  "atsMatch": {
    "score": 88,
    "max": 100,
    "label": "Strong Match",
    "description": "string"
  },
  "assessmentHistory": [
    {
      "id": "h1",
      "period": "OCT 2023",
      "title": "Advanced ML Cert",
      "meta": "Score: 94%",
      "badge": { "label": "+12% Improvement", "color": "green" },
      "isUpcoming": false
    }
  ]
}
```

---

#### `PATCH /student/skills/:skillId` [Auth] [Role: student]
Update a single skill's proficiency/level after assessment completion.

**Request Body:**
```json
{
  "proficiency": 0.85,
  "level": "Advanced",
  "lastTested": "2024-01-15"
}
```

**Response `200`:**
```json
{ "message": "Skill updated", "skill": { "...updated skill row..." } }
```

---

#### `POST /student/skills/challenge/:challengeId/submit` [Auth] [Role: student]
Submit answers for a daily skill challenge.

**Request Body:**
```json
{
  "answers": ["A", "C", "B", "D", "A"]
}
```

**Response `200`:**
```json
{
  "score": 4,
  "total": 5,
  "passed": true,
  "skillUpdated": { "skill": "Python", "newProficiency": 0.82 }
}
```

---

### 4.4 Student — Career Guidance / Skill Mapping

#### `GET /student/career-guidance` [Auth] [Role: student]
Returns skill gap analysis, learning modules, and market trends for the student's target role.

**Response `200`:**
```json
{
  "pageHeader": {
    "targetRole": "Product Manager Intern",
    "currentMatch": 67
  },
  "impactPath": {
    "title": "string",
    "description": "string",
    "currentScore": 67,
    "projectedScore": 85
  },
  "marketTrends": [
    { "id": "t1", "skill": "Agile/Scrum", "percentage": 92, "isGap": false }
  ],
  "skillGaps": [
    {
      "id": "g1",
      "skill": "SQL Data Analysis",
      "requiredBy": "85%",
      "description": "string",
      "icon": "database"
    }
  ],
  "industries": [
    { "id": "i1", "name": "FinTech", "description": "string" }
  ],
  "learningModules": [
    {
      "id": "m1",
      "title": "Module 1: Agile & Scrum Basics",
      "statusText": "Completed",
      "status": "completed",
      "progress": 100
    }
  ],
  "certifications": [
    { "id": "c1", "title": "Certified Scrum Product Owner", "description": "string" }
  ]
}
```

---

#### `PATCH /student/career-guidance/target-role` [Auth] [Role: student]
Set or update the student's target role for personalized guidance.

**Request Body:**
```json
{ "targetRole": "Data Scientist Intern" }
```

**Response `200`:**
```json
{ "message": "Target role updated", "newMatch": 72 }
```

---

### 4.5 Student — Opportunities

#### `GET /student/opportunities` [Auth] [Role: student]
Returns all available jobs with computed match scores for the logged-in student.

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `sort` | `string` | `matchScore` (default) \| `recent` \| `pay` |
| `type` | `string` | Filter: `Remote`, `Hybrid`, `On-site` |
| `minMatch` | `number` | Min match score (0-100) |

**Response `200`:**
```json
{
  "opportunities": [
    {
      "id": "job-1",
      "title": "Product Management Intern",
      "company": "TechFlow",
      "location": "San Francisco, CA",
      "type": "Hybrid",
      "term": "Summer 2024",
      "duration": "12 weeks",
      "pay": "$35-45/hr",
      "posted": "2d ago",
      "matchScore": 92,
      "skills": [
        { "name": "Python", "matched": true },
        { "name": "SQL", "matched": true },
        { "name": "Agile", "matched": false }
      ],
      "extraSkillsCount": 1,
      "isTrending": true,
      "contextBadge": "STRONG MATCH"
    }
  ]
}
```

---

#### `POST /student/opportunities/:jobId/apply` [Auth] [Role: student]
Apply to a job opportunity.

**Response `201`:**
```json
{
  "applicationId": "app-uuid",
  "jobId": "job-uuid",
  "status": "Applied",
  "appliedAt": "ISO8601"
}
```

**Error `409` — Already applied:**
```json
{ "error": "ALREADY_APPLIED", "message": "You have already applied to this job." }
```

---

#### `GET /student/opportunities/:jobId` [Auth] [Role: student]
Get a single job's detailed view.

**Response `200`:** Full `Job` object (see [3.3](#33-job)) with the student's computed `matchScore`.

---

### 4.6 Student — Portfolio

#### `GET /student/portfolio` [Auth] [Role: student]
Returns the student's complete portfolio data.

**Response `200`:**
```json
{
  "profile": {
    "name": "string",
    "title": "string",
    "location": "string",
    "email": "string",
    "github": "string",
    "avatarUrl": "string"
  },
  "credentials": [
    {
      "id": "c1",
      "title": "AWS Certified Solutions Architect",
      "subtitle": "Associate Level",
      "meta": "Issued: Jan 2023",
      "badge": { "label": "Active", "color": "green" },
      "hasLink": true,
      "verificationUrl": "string | null"
    }
  ],
  "achievements": [
    {
      "id": "a1",
      "title": "Global AI Hackathon",
      "subtitle": "string",
      "meta": "string",
      "badge": { "label": "1st Place", "color": "yellow" }
    }
  ],
  "projects": [
    {
      "id": "p1",
      "title": "Distributed Ledger System",
      "role": "Lead Architect",
      "description": "string",
      "badge": "Academic Research",
      "skills": ["Go", "gRPC", "Docker"],
      "repoUrl": "string | null",
      "liveUrl": "string | null"
    }
  ],
  "techStack": [
    { "title": "LANGUAGES", "skills": ["Python", "Java", "TypeScript"] }
  ],
  "documents": [
    { "id": "d1", "name": "Master_Resume_2024.pdf", "size": "142 KB", "url": "https://...", "icon": "pdf" }
  ]
}
```

---

#### `POST /student/portfolio/projects` [Auth] [Role: student]
Add a new project to the portfolio.

**Request Body:**
```json
{
  "title": "string",
  "role": "string",
  "description": "string",
  "badge": "string",
  "skills": ["string"],
  "repoUrl": "string | null",
  "liveUrl": "string | null"
}
```

**Response `201`:** Created project object.

---

#### `PUT /student/portfolio/projects/:projectId` [Auth] [Role: student]
Update an existing project. All fields optional.

**Response `200`:** Updated project object.

---

#### `DELETE /student/portfolio/projects/:projectId` [Auth] [Role: student]

**Response `204`:** *(No Content)*

---

#### `POST /student/portfolio/documents` [Auth] [Role: student]
Upload a document (resume, transcript, certificate).

**Request:** `multipart/form-data`
- Field: `document` (PDF file, max 10MB)
- Field: `type` (`resume | transcript | cert`)

**Response `201`:**
```json
{ "id": "d-uuid", "name": "filename.pdf", "size": "142 KB", "url": "https://...", "icon": "pdf" }
```

---

#### `DELETE /student/portfolio/documents/:documentId` [Auth] [Role: student]

**Response `204`:** *(No Content)*

---

### 4.7 Student — Progress / Learning

#### `GET /student/progress` [Auth] [Role: student]
Returns the student's learning dashboard data.

**Response `200`:**
```json
{
  "activeCourses": [
    {
      "id": "c1",
      "title": "AWS Solutions Architect",
      "provider": "Amazon Web Services",
      "statusText": "In Progress",
      "moduleText": "Module 4 of 10",
      "progress": 40,
      "isReadyForFinal": false
    }
  ],
  "pathSteps": [
    { "label": "HTML/CSS", "state": "completed" },
    { "label": "Node.js", "state": "current" },
    { "label": "Databases", "state": "locked" }
  ],
  "recommendedCerts": [
    {
      "id": "r1",
      "title": "Data Analytics Professional",
      "provider": "Google",
      "providerIconInitial": "G",
      "duration": "6 months",
      "level": "Beginner Level"
    }
  ],
  "learningHours": {
    "total": "14.5 hrs",
    "trend": "+12%",
    "bars": [40, 60, 30, 80, 60, 10, 10],
    "days": ["M", "T", "W", "T", "F", "S", "S"]
  },
  "upcomingAssessments": [
    {
      "id": "a1",
      "date": { "month": "OCT", "day": "15" },
      "title": "AWS Practice Exam",
      "meta": "2 hours - Online"
    }
  ],
  "marketTrends": [
    { "skill": "Python Data Analysis", "boost": "+24% matches" }
  ],
  "networkActivity": [
    { "id": "n1", "name": "Sarah J.", "action": "earned the", "target": "React Native certification." }
  ]
}
```

---

#### `PATCH /student/progress/courses/:courseId` [Auth] [Role: student]
Update course progress when student marks progress or completes a module.

**Request Body:**
```json
{ "progress": 65, "status": "In Progress" }
```

**Response `200`:** Updated course object.

---

### 4.8 Recruiter — Dashboard & Job Postings

#### `GET /recruiter/dashboard` [Auth] [Role: industry]
Returns recruiter dashboard summary statistics and attention items.

**Response `200`:**
```json
{
  "companyName": "string",
  "postingStats": {
    "activePostings": "12",
    "totalApplicants": "1,452",
    "newMatches": "48",
    "newMatchesChange": "+12%",
    "avgTimeToHire": "18 days"
  },
  "attentionItems": [
    { "id": "1", "title": "Expiring in 48h", "role": "Senior Data Engineer", "type": "urgent" },
    { "id": "2", "title": "Draft", "role": "Backend Developer (Go)", "type": "draft" }
  ]
}
```

---

#### `GET /recruiter/jobs` [Auth] [Role: industry]
Returns all job postings created by the recruiter.

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `status` | `string` | Filter: `Active`, `Review`, `Closed` |
| `department` | `string` | Filter by department |

**Response `200`:**
```json
{
  "jobs": [
    {
      "id": "job-1",
      "title": "Senior Data Engineer",
      "department": "Data Science",
      "applicants": 142,
      "matches": 28,
      "status": "Active",
      "lastUpdated": "2h ago",
      "performance": "+5%",
      "performanceTrend": "up"
    }
  ]
}
```

---

#### `POST /recruiter/jobs` [Auth] [Role: industry]
Create a new job posting.

**Request Body:**
```json
{
  "title": "string",
  "department": "string",
  "location": "string",
  "type": "Remote | Hybrid | On-site",
  "pay": "string",
  "term": "string",
  "duration": "string | null",
  "requiredSkills": ["string"]
}
```

**Response `201`:** Full `Job` object.

---

#### `GET /recruiter/jobs/:jobId` [Auth] [Role: industry]
Get a single job posting's full details.

**Response `200`:** Full `Job` object (see [3.3](#33-job)).

---

#### `PUT /recruiter/jobs/:jobId` [Auth] [Role: industry]
Update a job posting. All fields optional.

**Response `200`:** Updated `Job` object.

---

#### `DELETE /recruiter/jobs/:jobId` [Auth] [Role: industry]
Delete or archive a job posting.

**Response `204`:** *(No Content)*

---

### 4.9 Recruiter — ATS / Applications

#### `GET /recruiter/applications` [Auth] [Role: industry]
Returns all applications across all job postings for the recruiter.

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `jobId` | `string` | Filter by specific job |
| `status` | `string` | Filter: `Applied`, `Reviewed`, `Interviewing`, `Offered`, `Rejected` |

**Response `200`:**
```json
{
  "applications": [
    {
      "id": "app-1",
      "jobId": "job-2",
      "jobTitle": "Data Science Intern",
      "company": "Quantify Analytics",
      "status": "Interviewing",
      "appliedAt": "ISO8601",
      "candidate": {
        "id": "cand-1",
        "name": "Sarah Chen",
        "role": "Data Science Intern",
        "matchScore": 94,
        "location": "Berkeley, CA",
        "yoe": "0 yrs (Student)",
        "education": "MS Computer Science, UC Berkeley",
        "tags": [
          { "text": "Python", "type": "matched" },
          { "text": "AWS", "type": "missing" }
        ],
        "aiInsight": {
          "intro": "string",
          "points": [{ "title": "string", "desc": "string" }]
        },
        "skills": [
          { "skill": "Python", "required": "Advanced", "candidate": "Advanced" }
        ]
      }
    }
  ]
}
```

---

#### `PATCH /recruiter/applications/:appId/status` [Auth] [Role: industry]
Move a candidate to a new ATS stage (Kanban drag-and-drop action).

**Request Body:**
```json
{ "status": "Interviewing" }
```

**Valid status flow:** `Applied` -> `Reviewed` -> `Interviewing` -> `Offered` | `Rejected`

**Response `200`:**
```json
{ "id": "app-1", "status": "Interviewing", "updatedAt": "ISO8601" }
```

---

#### `GET /student/applications` [Auth] [Role: student]
Returns all applications submitted by the student, with current ATS status (for `Progress.tsx`).

**Response `200`:**
```json
{
  "applications": [
    {
      "id": "app-1",
      "jobId": "job-2",
      "jobTitle": "Data Science Intern",
      "company": "Quantify Analytics",
      "status": "Interviewing",
      "matchScore": 94,
      "appliedAt": "ISO8601"
    }
  ]
}
```

---

### 4.10 Recruiter — Candidate Search

#### `GET /recruiter/candidates` [Auth] [Role: industry]
Get a shortlist of candidates for a specific job posting.

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `jobId` | `string` | *(required)* The job to find matches for |
| `minScore` | `number` | Min match score (default: 0) |
| `sort` | `string` | `matchScore` (default) \| `recent` |

**Response `200`:**
```json
{
  "candidates": [
    {
      "id": "cand-1",
      "name": "David Chen",
      "role": "Senior Frontend Engineer",
      "matchScore": 94,
      "appliedDate": "Applied 2d ago",
      "avatarUrl": "string | null",
      "initials": "DC",
      "tags": [{ "text": "React", "type": "default" }],
      "yoe": "8 YOE"
    }
  ]
}
```

---

#### `GET /recruiter/candidates/:candidateId` [Auth] [Role: industry]
Get detailed profile and AI insight for a specific candidate.

**Response `200`:**
```json
{
  "id": "cand-1",
  "name": "David Chen",
  "role": "Senior Frontend Engineer",
  "location": "San Francisco, CA",
  "yoe": "8 YOE",
  "education": "B.S. Comp Sci, 2016",
  "avatarUrl": "string",
  "aiInsight": {
    "intro": "string",
    "points": [{ "title": "string", "desc": "string" }]
  },
  "skills": [
    { "skill": "React / Next.js", "required": "Expert", "candidate": "100%", "colorClass": "text-green-600" }
  ],
  "interviewHistory": [
    { "round": "Initial Screen", "interviewer": "Sarah Jenkins", "date": "Oct 12, 2023", "score": "4.8/5.0" }
  ],
  "projects": [
    { "title": "Fintech Dashboard v2", "description": "string", "url": "string | null" }
  ],
  "reference": {
    "authorTitle": "CTO @ FinStream",
    "quote": "string"
  }
}
```

---

### 4.11 Recruiter — Analytics

#### `GET /recruiter/analytics` [Auth] [Role: industry]
Returns all analytics data for the recruiter dashboard.

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `period` | `string` | `30d` (default) \| `90d` \| `1y` |

**Response `200`:**
```json
{
  "funnel": [
    { "stage": "Posting Views", "count": 12450 },
    { "stage": "Applicants", "count": 8092 },
    { "stage": "Shortlisted", "count": 3112 },
    { "stage": "Hired", "count": 245 }
  ],
  "kpis": {
    "retention": {
      "title": "Intern Retention Rate", "value": "78.4", "unit": "%",
      "change": "+4.2%", "isPositive": true, "description": "string"
    },
    "timeToFill": {
      "title": "Avg Time-to-Fill", "value": "24", "unit": "Days",
      "change": "-2.1d", "isPositive": true, "description": "string"
    },
    "offerAcceptance": {
      "title": "Offer Acceptance Rate", "value": "92.1", "unit": "%",
      "change": "+1.5%", "isPositive": true, "description": "string"
    }
  },
  "topSkills": [
    { "skill": "React / Next.js", "percentage": 42 }
  ],
  "stageVelocity": [
    { "stage": "Sourcing", "days": 4.2 },
    { "stage": "Screening", "days": 2.1 },
    { "stage": "Interviewing", "days": 12.5 },
    { "stage": "Offer", "days": 3.8 }
  ],
  "demographics": [
    { "group": "Female", "percentage": 48 },
    { "group": "Male", "percentage": 45 },
    { "group": "Non-binary / Other", "percentage": 7 }
  ],
  "learningPrograms": [
    { "name": "Cloud Native Boot-camp", "enrolled": 1234, "completionRate": "82%", "status": "Active" }
  ],
  "sourcingPerformance": [
    { "source": "LinkedIn Recruiter", "applicants": 4250, "conversionRate": "12.4%", "costPerHire": "$1,200" }
  ]
}
```

---

### 4.12 Recruiter — Learning Hub

#### `GET /recruiter/learning` [Auth] [Role: industry]
Returns recruiter learning hub data.

**Response `200`:**
```json
{
  "yourProgress": [
    { "id": "1", "title": "Technical Sourcing Mastery", "status": "In Progress", "progress": 65, "label": "65% Completed" }
  ],
  "recommendedPrograms": [
    {
      "id": "1",
      "title": "AI in Modern Recruitment",
      "description": "string",
      "duration": "4 hrs",
      "isNew": true
    }
  ],
  "activeDiscussions": [
    {
      "id": "1",
      "title": "string",
      "description": "string",
      "author": "J. Doe",
      "replies": 24,
      "timeAgo": "2 hrs ago"
    }
  ],
  "industryMentors": [
    {
      "id": "1",
      "name": "Sarah Jenkins",
      "title": "VP Talent",
      "company": "TechCorp",
      "experience": "15+ Yrs Exp",
      "badge": "EXEC SEARCH"
    }
  ],
  "knowledgeLibrary": [
    { "id": "1", "title": "2024 Tech Salary Guide", "iconType": "file", "downloadUrl": "string" }
  ]
}
```

---

#### `PATCH /recruiter/learning/courses/:courseId` [Auth] [Role: industry]
Update recruiter course progress.

**Request Body:**
```json
{ "progress": 80, "status": "In Progress" }
```

**Response `200`:** Updated course object.

---

### 4.13 AI / Resume Processing

#### `POST /ai/resume/parse` [Auth] [Role: student]
Upload a PDF resume for AI parsing. Returns structured profile data extracted by LLM.

**Request:** `multipart/form-data`
- Field: `resume` (PDF file, max 10MB)

**Response `200`:**
```json
{
  "parsedProfile": {
    "name": "string",
    "title": "string",
    "location": "string",
    "email": "string",
    "github": "string",
    "bio": "string",
    "skills": ["Python", "Machine Learning", "SQL"],
    "education": [
      { "degree": "MSc Data Science", "institution": "UC Berkeley", "year": "2024" }
    ],
    "experience": [
      { "role": "Data Science Intern", "company": "TechCorp", "duration": "3 months", "description": "string" }
    ]
  },
  "atsScore": { "score": 82, "max": 100 },
  "resumeUrl": "https://cdn.internix.io/resumes/uuid.pdf"
}
```

---

#### `POST /ai/match/:jobId` [Auth] [Role: student]
Get a semantic AI match score between the student's profile and a specific job.

**Response `200`:**
```json
{
  "jobId": "job-1",
  "matchScore": 87,
  "matchedSkills": ["Python", "SQL"],
  "missingSkills": ["AWS"],
  "explanation": "Your Python and SQL skills align well. AWS experience would strengthen this application."
}
```

---

## 5. Error Handling

All error responses follow this structure:

```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable description",
  "details": {}
}
```

| HTTP Status | Error Code | Meaning |
|---|---|---|
| `400` | `VALIDATION_ERROR` | Request body/params failed validation |
| `401` | `UNAUTHORIZED` | Missing or invalid JWT |
| `403` | `FORBIDDEN` | Valid JWT but insufficient role |
| `404` | `NOT_FOUND` | Resource does not exist |
| `409` | `CONFLICT` | e.g., already applied, duplicate email |
| `413` | `FILE_TOO_LARGE` | Upload exceeds size limit |
| `422` | `UNPROCESSABLE` | Business logic violation |
| `500` | `INTERNAL_ERROR` | Unexpected server error |

---

## 6. Auth & Role Matrix

| Endpoint Group | `student` | `industry` | `faculty` | `admin` |
|---|:---:|:---:|:---:|:---:|
| `/auth/*` | YES | YES | YES | YES |
| `/student/*` | YES | NO | NO | YES |
| `/recruiter/*` | NO | YES | NO | YES |
| `/ai/resume/parse` | YES | NO | NO | YES |
| `/ai/match/:jobId` | YES | NO | NO | YES |
| Admin-only routes | NO | NO | NO | YES |

---

## 7. Suggested Database Schema

```sql
-- Users
users (
  id UUID PRIMARY KEY,
  name VARCHAR, email VARCHAR UNIQUE, password_hash VARCHAR,
  role ENUM('student','industry','faculty','admin'),
  created_at TIMESTAMP, updated_at TIMESTAMP
)

-- Student data
student_profiles (
  id UUID PRIMARY KEY, user_id UUID REFERENCES users,
  title VARCHAR, location VARCHAR, github VARCHAR, bio TEXT,
  avatar_url VARCHAR, profile_strength INT, ats_score INT,
  created_at TIMESTAMP, updated_at TIMESTAMP
)

student_skills (
  id UUID PRIMARY KEY, student_id UUID REFERENCES student_profiles,
  skill VARCHAR, sub_skill VARCHAR, proficiency DECIMAL(3,2),
  level ENUM('Expert','Advanced','Intermediate','Novice','Beginner'),
  last_tested DATE
)

student_education (
  id UUID PRIMARY KEY, student_id UUID REFERENCES student_profiles,
  degree VARCHAR, institution VARCHAR, year VARCHAR, gpa VARCHAR
)

student_experience (
  id UUID PRIMARY KEY, student_id UUID REFERENCES student_profiles,
  role VARCHAR, company VARCHAR, duration VARCHAR, description TEXT
)

projects (
  id UUID PRIMARY KEY, student_id UUID REFERENCES student_profiles,
  title VARCHAR, role VARCHAR, description TEXT, badge VARCHAR,
  skills JSONB, repo_url VARCHAR, live_url VARCHAR
)

documents (
  id UUID PRIMARY KEY, student_id UUID REFERENCES student_profiles,
  name VARCHAR, size VARCHAR, url VARCHAR,
  type ENUM('resume','transcript','cert'), created_at TIMESTAMP
)

-- Jobs & applications
jobs (
  id UUID PRIMARY KEY, recruiter_id UUID REFERENCES users,
  title VARCHAR, company VARCHAR, department VARCHAR, location VARCHAR,
  type ENUM('Remote','Hybrid','On-site'), pay VARCHAR, term VARCHAR, duration VARCHAR,
  status ENUM('Active','Review','Closed'), required_skills TEXT[],
  applicants INT DEFAULT 0, matches INT DEFAULT 0,
  performance VARCHAR, performance_trend ENUM('up','down','flat'),
  created_at TIMESTAMP, updated_at TIMESTAMP
)

applications (
  id UUID PRIMARY KEY, job_id UUID REFERENCES jobs, student_id UUID REFERENCES users,
  status ENUM('Applied','Reviewed','Interviewing','Offered','Rejected'),
  match_score INT, applied_at TIMESTAMP, updated_at TIMESTAMP,
  UNIQUE (job_id, student_id)
)

-- Learning
skill_challenges (
  id UUID PRIMARY KEY, tag VARCHAR, title VARCHAR, description TEXT, questions JSONB
)

assessment_history (
  id UUID PRIMARY KEY, student_id UUID REFERENCES student_profiles,
  period VARCHAR, title VARCHAR, meta VARCHAR, score INT, completed_at TIMESTAMP
)

recruiter_courses (
  id UUID PRIMARY KEY, recruiter_id UUID REFERENCES users,
  course_title VARCHAR, status VARCHAR, progress INT DEFAULT 0, updated_at TIMESTAMP
)
```

---

## 8. Implementation Notes for the Frontend

The frontend currently mocks all API calls inside `src/services/*.mock.ts` and React Contexts. The files already contain comments like `// replace with actual API calls when backend is ready`. When the backend is ready, swap them as follows:

| Current Mock File / Context | Replace With |
|---|---|
| `AuthContext.tsx` — `login()`, `register()` | `POST /auth/login`, `POST /auth/register` |
| `StudentContext.tsx` — `fetchStudentData()` | `GET /student/profile` |
| `studentDashboard.mock.ts` | `GET /student/profile` |
| `skillAssessment.mock.ts` | `GET /student/skills/assessment` |
| `skillMapping.mock.ts` | `GET /student/career-guidance` |
| `opportunities.mock.ts` + `JobsContext.tsx` | `GET /student/opportunities` |
| `portfolio.mock.ts` | `GET /student/portfolio` |
| `progress.mock.ts` | `GET /student/progress` |
| `RecruiterContext.tsx` + `postingsService.ts` | `GET /recruiter/dashboard`, `GET /recruiter/jobs` |
| `ATSContext.tsx` — `applyToJob()` | `POST /student/opportunities/:jobId/apply` |
| `ATSContext.tsx` — `getApplicationsForRecruiter()` | `GET /recruiter/applications` |
| `ATSContext.tsx` — `updateApplicationStatus()` | `PATCH /recruiter/applications/:id/status` |
| `ATSContext.tsx` — `getApplicationsForStudent()` | `GET /student/applications` |
| `candidateService.ts` — `getCandidateShortlist()` | `GET /recruiter/candidates?jobId=...` |
| `candidateService.ts` — `getCandidateDetails()` | `GET /recruiter/candidates/:id` |
| `analyticsService.ts` | `GET /recruiter/analytics` |
| `learningService.ts` | `GET /recruiter/learning` |

### Recommended HTTP Client Setup

Use `axios` or native `fetch` with an interceptor to:
1. Attach `Authorization: Bearer <token>` to every request automatically.
2. On `401` response, call `POST /auth/refresh` and retry the original request once.
3. On second `401`, redirect to the login page and clear localStorage.
