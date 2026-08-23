# PROJECT_CONTEXT.md

## Product

The goal is not to build another internship portal. The goal is to help students understand their profile, identify skill gaps, discover relevant opportunities, improve readiness, and track career progress.

## Primary User

Student (MVP focus).

Future roles (industry, academicians, institutions) should influence architecture but are not the current frontend priority.

## Core Flow

Profile → Skill Assessment → Opportunity Matching → Explainable Match → Skill Gap Analysis → Learning Recommendations → ATS Analysis → Application Tracking

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

Architecture should remain scalable for future roles and features, but current development should optimize for the student experience.
