# Career & Job Application Management Platform
## Project Specification — Career Operating System

**Version:** 2.0.0  
**Date:** 2026-09-07  
**Status:** Stage 0 — Rectified Master Architecture  

---

## 1. Product Vision

A comprehensive, privacy-first **Career Operating System** that empowers candidates to manage their entire job-search lifecycle from one unified command center. 

The product is explicitly **NOT** a basic "Job → Application → Status" tracker. It is a complete, connected career management engine spanning:

```
Candidate Profile
       ↓
Career Information
       ↓
Resume / Documents
       ↓
Job Preferences
       ↓
Opportunity Discovery
       ↓
Opportunity → Application Conversion
       ↓
Application Pipeline & Health
       ↓
Recruiter / Company / Network
       ↓
Interview & Preparation
       ↓
Tasks / Follow-ups / Calendar
       ↓
Offer / Outcome
       ↓
Career Analytics & Future Intelligence
```

The platform gives candidates full ownership, transparency, and actionable intelligence over their career trajectory without reliance on opaque black-box AI algorithms.

---

## 2. Product Goals & Core Principles

1. **Unified Career Command Center**: Consolidate candidate profile, resumes, documents, job preferences, opportunity discovery, application tracking, interview prep, professional network, and analytics into a cohesive system.
2. **Modular Monolith Architecture**: React + TypeScript frontend communicating strictly via a REST API with a FastAPI backend, SQLAlchemy 2 (async), and PostgreSQL 16. No direct database access from frontend; no premature microservices.
3. **Historical Data Integrity**: Strict version pinning for resumes and documents. When an application is submitted with Resume v2, historical records permanently point to Resume v2 even if Resume v3 is subsequently uploaded.
4. **Explainable Deterministic Intelligence**: Profile Completeness and Application Health are calculated through transparent, rule-based algorithms — never arbitrary or hallucinatory percentages.
5. **Clear Separation of Concerns**: Strict boundary between **Profile** (professional career identity) and **Settings** (platform/account configuration).
6. **No Unauthorized Scraping**: Manual opportunity creation and clean URL imports only. No illegal or brittle web scrapers.
7. **Staged, Production-Ready Scaffold**: Every stage is verified and deployable to production cloud environments (Azure).

---

## 3. Target Users

- **Active Job Seekers**: Managing high-volume, multi-stage pipelines across companies.
- **Passive Candidates**: Curating opportunities, tracking industry network contacts, and keeping resume variants ready.
- **Career Changers & Transitioners**: Managing customized profile versions, targeted resumes, and skill alignments.
- **Recent Graduates / Students**: Tracking internships, building structured project/skill portfolios, and rehearsing interview Q&A.
- **Senior Professionals**: Tracking high-stakes executive pipelines, recruiters, and compensation negotiations.

---

## 4. Product Scope (Master Domain Matrix)

| Domain | Description | Primary Entities | Navigation Placement |
|--------|-------------|------------------|----------------------|
| **Dashboard** | Career Command Center with KPIs, pipeline funnel, upcoming tasks, interview alerts, quick actions | Aggregations across all domains | `/dashboard` |
| **Candidate Profile** | Comprehensive candidate identity (personal, summary, education, experience, projects, skills, certifications, achievements, languages, links) | `candidate_profiles`, `educations`, `experiences`, `projects`, `skills`, `certifications`, `achievements`, `languages`, `profile_links` | `/profile/*` (Hub & Tabs) |
| **Resume Management** | Multi-version resume vault, label tagging, default selection, version preservation | `resumes` | `/profile/resumes` |
| **Document Vault** | Private storage for cover letters, transcripts, certificates, portfolios with secure storage abstraction | `documents` | `/profile/documents` |
| **Job Preferences** | Detailed career preferences (roles, industries, locations, remote/hybrid, compensation targets, notice period) | `candidate_preferences` | `/profile/preferences` |
| **Opportunity Discovery** | Discover, curate, filter, and save job opportunities. One-click conversion to Application | `opportunities`, `saved_opportunities` | `/opportunities/*` |
| **Applications** | Multi-stage pipeline tracking, activity timeline, Q&A vault integration, deterministic health check | `applications`, `application_stage_history`, `application_documents`, `application_notes`, `application_followups`, `application_activity` | `/applications/*` |
| **Application Q&A Vault** | Reusable bank of answers to behavioral and common application questions | `qa_vault_entries`, `application_answers` | `/applications` (Vault / Sub-tab) |
| **Companies** | Company directory with recruitment history, linked applications, contacts, and notes | `companies` | `/companies/*` |
| **Network & Contacts** | Recruiter, hiring manager, interviewer, and referral relationship directory | `contacts` | `/network/*` |
| **Interviews** | Multi-round interview tracking (phone, technical, panel, onsite, HR) | `interviews` | `/interviews/*` |
| **Interview Preparation** | Company research, role research, questions to ask, checklists, and post-interview debrief | `interview_preparations` | `/interviews/:id/prep` |
| **Tasks & Follow-ups** | Unified task management linked polymorphically to applications, interviews, companies, or contacts | `tasks` | `/tasks/*` |
| **Calendar** | Unified schedule aggregating interviews, task deadlines, follow-up dates, and application cutoffs | Cross-entity aggregation | `/calendar` |
| **Notifications** | In-app alert system for upcoming interviews, pending follow-ups, and stale applications | `notifications` | `/notifications` |
| **Analytics** | Real database-driven metrics on conversion funnels, response times, sources, and trends | Aggregated relational queries | `/analytics/*` |
| **Settings** | Account credentials, active sessions, notification preferences, privacy, data export, account deletion | `users`, `refresh_tokens` | `/settings/*` |

---

## 5. Complete 12-Hub Product Navigation

The authenticated application features a responsive sidebar and top-level navigation structured around 12 core hubs:

```
Dashboard                 → /dashboard

Profile                   → /profile
 ├── Overview             → /profile
 ├── Personal             → /profile/personal
 ├── Professional         → /profile/professional
 ├── Education            → /profile/education
 ├── Experience           → /profile/experience
 ├── Projects             → /profile/projects
 ├── Skills               → /profile/skills
 ├── Certifications       → /profile/certifications
 ├── Achievements         → /profile/achievements
 ├── Languages            → /profile/languages
 ├── Resumes              → /profile/resumes
 ├── Documents            → /profile/documents
 ├── Preferences          → /profile/preferences
 └── Links                → /profile/links

Opportunities             → /opportunities
 ├── Discover             → /opportunities
 ├── Saved                → /opportunities/saved
 └── Details              → /opportunities/:id

Applications              → /applications
 ├── All Applications     → /applications
 ├── Pipeline (Kanban)    → /applications/pipeline
 ├── Follow-ups           → /applications/followups
 └── Details              → /applications/:id

Companies                 → /companies
 ├── All Companies        → /companies
 └── Company Details      → /companies/:id

Interviews                → /interviews
 ├── Upcoming             → /interviews?tab=upcoming
 ├── Completed            → /interviews?tab=completed
 ├── Cancelled            → /interviews?tab=cancelled
 └── Interview Details    → /interviews/:id

Tasks                     → /tasks
 ├── All                  → /tasks
 ├── Today                → /tasks?filter=today
 ├── Upcoming             → /tasks?filter=upcoming
 └── Completed            → /tasks?filter=completed

Calendar                  → /calendar

Network                   → /network
 ├── Contacts             → /network
 └── Contact Details      → /network/:id

Analytics                 → /analytics
 ├── Overview             → /analytics
 ├── Application Trends   → /analytics/trends
 ├── Pipeline Funnel      → /analytics/pipeline
 ├── Companies            → /analytics/companies
 ├── Outcomes             → /analytics/outcomes
 └── Time Analysis        → /analytics/time

Notifications             → /notifications

Settings                  → /settings
 ├── General / Account    → /settings/account
 ├── Security             → /settings/security
 ├── Notifications        → /settings/notifications
 ├── Privacy              → /settings/privacy
 ├── Sessions             → /settings/sessions
 ├── Data Export          → /settings/data
 ├── Appearance           → /settings/appearance
 └── Delete Account       → /settings/danger
```

---

## 6. Profile vs. Settings Architectural Boundary

- **PROFILE (`/profile/*`)**: Defines the candidate's professional career identity. Contains personal info, work history, education, skills, resume variants, private certificates, and job search criteria.
- **SETTINGS (`/settings/*`)**: Defines application configuration, security controls, notification switches, theme preferences, session management, and GDPR-compliant data export/deletion.

---

## 7. Development Roadmap (Stages 0–16)

| Stage | Name | Key Deliverables |
|:-----:|:-----|:-----------------|
| **0** | **Product & Domain Architecture** | Complete specifications, database design, API design, user flows, navigation map |
| **1** | **Project Scaffold & Infrastructure** | Full 28+ SQLAlchemy models, Alembic async migration, FastAPI skeleton, React shell with 12-domain routing, Tailwind design system, health check, testing/CI baseline |
| **2** | **Authentication & Accounts** | JWT auth (short-lived access + secure HttpOnly refresh cookie), password hashing (bcrypt), password reset, session revocation |
| **3** | **Candidate Profile & Document Vault** | Profile subsections CRUD, multi-version resume management, storage abstraction (Local/Azure), job preferences, deterministic completeness engine |
| **4** | **Opportunity Discovery & Conversion** | Opportunity repository, filtering/search, saved opportunities, one-click conversion to application |
| **5** | **Applications & Health Engine** | Multi-stage pipeline (list + Kanban), resume version lock, notes, followups, documents, Q&A vault, immutable activity timeline, deterministic health check |
| **6** | **Companies & Network Directory** | Company CRUD with recruitment history, Contact management (recruiters/referrals) linked to companies, applications, and interviews |
| **7** | **Interviews & Preparation** | Interview scheduling, round types, outcome logging, structured prep checklists, research notes, and debrief |
| **8** | **Tasks, Calendar & Notifications** | Unified task management linked to entities, aggregated multi-event calendar, in-app notification engine |
| **9** | **Dashboard & Career Analytics** | Career command center, real relational aggregations (trends, funnel conversion, response rates, time metrics) |
| **10** | **Explainable Matching Engine** | Deterministic rule-based scoring matching candidate profile against opportunities (skills, role, location, comp) |
| **11** | **UI/UX Refinement & Polish** | Responsive design, accessibility (WCAG AA), micro-animations, loading/empty states, keyboard shortcuts |
| **12** | **Full Functional Testing** | Backend integration test suite, frontend component/integration tests, end-to-end workflow verification |
| **13** | **Security Hardening** | Rate limiting, CORS tightening, CSRF protection, input sanitization, security headers, dependency scanning |
| **14** | **Security Testing** | Vulnerability assessment, penetration testing, auth boundary verification, OWASP Top 10 validation |
| **15** | **Production Cloud Deployment** | Azure Container Apps / App Service, Azure Database for PostgreSQL, Azure Blob Storage, Azure Front Door |
| **16** | **Monitoring & Maintenance** | Azure Monitor, Application Insights, structured JSON logging, health alerts, database maintenance |

---

## 8. Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, React Router v6, TanStack React Query, Zustand, Axios, Lucide Icons.
- **Backend API**: Python 3.12/3.13, FastAPI (modular monolith), Pydantic v2.
- **Database**: PostgreSQL 16, SQLAlchemy 2 (asyncpg), Alembic migrations.
- **Storage Layer**: Custom `StorageService` abstraction (`LocalStorageProvider` for dev, `AzureBlobStorageProvider` for staging/prod).
- **Containerization**: Docker, Docker Compose, Nginx reverse proxy.
- **CI/CD**: GitHub Actions.
- **Cloud Infrastructure**: Microsoft Azure (Container Apps, Flexible PostgreSQL Server, Blob Storage, Key Vault).
