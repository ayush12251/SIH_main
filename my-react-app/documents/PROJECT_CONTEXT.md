# PROJECT_CONTEXT.md

## Product

The goal is not to build another internship portal. The goal is to help students understand their profile, identify skill gaps, discover relevant opportunities, improve readiness, and track career progress.

## Primary User

Student and Recruiter (Industry Partner) are the core MVP focus.

Future roles (academicians, institutions) should influence architecture but are not the current frontend priority.

## Core Flow

**1. Student Workflow (Self-Discovery & Readiness):**
1. **Onboarding:** Resume upload → AI extraction of skills and auto-generation of profile.
2. **Dashboard:** Profile rendering (via `StudentContext`).
3. **Assessment & Gaps:** Skill assessment → Verified skill levels and market gap analysis.
4. **Matching:** Opportunity mapping with Explainable Match scores (e.g., 80% Technical, 65% Soft Skills).
5. **Application:** ATS Analysis and Application Tracking.

**2. Recruiter Workflow (Precision Targeting & Pipeline):**
1. **Onboarding:** Login → Company profile population (via `RecruiterContext`).
2. **Job Postings:** Create opportunity → Explicitly define required Skill Matrices.
3. **Candidate Search:** Request candidates matching specific skill/education metrics.
4. **Match Precision:** View backend-calculated Match Precision to understand exactly why a candidate is a fit.
5. **Pipeline Management:** Track candidates through the recruitment phases.
## Frontend Philosophy

The frontend is a presentation layer.

It displays data, insights, recommendations, analytics, and progress received from the backend.

The frontend must not implement business logic, recommendation logic, scoring logic, ranking logic, or analysis logic.

## Data Flow

Backend (FastAPI)
    ↓
Services
    ↓
TypeScript Interfaces
    ↓
Pages
    ↓
Reusable Components

Pages fetch data.

Components receive props and render UI.

## Development Strategy

Build using mock data that mirrors future API responses.

When backend APIs become available, replace mock data inside services only.

Components and pages should require minimal or no refactoring.

## Design System

One shared design system across the application.

Reuse components whenever possible.

Avoid duplicate implementations of cards, chips, buttons, inputs, progress indicators, badges, sidebars, and navigation.

## Important

Figma is the source of truth for UI.

Architecture is split via Nested Routing (`StudentRoutes` vs `RecruiterRoutes`) and Scoped Contexts (`StudentContext` vs `RecruiterContext`) to ensure isolated workflows and prevent data leakage. Architecture should remain scalable for future roles.
