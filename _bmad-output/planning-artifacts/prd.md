# DayWork LK — Product Requirements Document
 
> **Version:** 1.0 (Initial PRD)
> **Author:** Binodbandara
> **Date:** March 18, 2026
> **Status:** Draft — Ready for Architect Review
> **Project:** test-bmad
 
---
 
| Field | Detail |
|---|---|
| Platform | Web App (Desktop + Mobile Responsive) |
| Language | English only |
| Revenue Model | Freemium — Free base, Premium job boosts for employers |
| Payments | Offline — No in-app payment processing at launch |
 
---
 
## Table of Contents
 
1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [Target Users & Personas](#4-target-users--personas)
5. [Product Scope](#5-product-scope)
6. [Feature Requirements](#6-feature-requirements)
7. [User Journeys](#7-user-journeys)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [Monetization Strategy](#9-monetization-strategy)
10. [Risks & Mitigations](#10-risks--mitigations)
11. [Assumptions & Constraints](#11-assumptions--constraints)
12. [Open Questions](#12-open-questions)
13. [Next Steps (BMAD Workflow)](#13-next-steps-bmad-workflow)
 
---
 
## 1. Executive Summary
 
DayWork LK is a web-based marketplace connecting day laborers and short-term job seekers with employers and agencies across Sri Lanka. It is the first platform of its kind in the local market, addressing a critical gap where no existing digital solution connects workers and employers for day-to-day or short-term engagements.
 
The platform will launch as a responsive web application (desktop and mobile), supporting English-only at launch. The core model is free for all users, with employers able to pay for premium job boost visibility. Payments between employers and workers happen offline; the platform facilitates matching and communication only.
 
The primary success goal is to reach **1,000+ active users in Year 1** and become the leading local platform for day work in Sri Lanka.
 
---
 
## 2. Problem Statement
 
### 2.1 The Gap
 
Sri Lanka has a significant informal labor market for day-to-day work — construction, domestic help, retail, event staffing, and more — but no dedicated digital platform exists to serve it. Workers rely on word-of-mouth, physical labor markets, or social media groups. Employers have no structured way to post, discover, or hire workers quickly.
 
### 2.2 Pain Points by User Type
 
**Job Seekers:**
- Difficulty discovering legitimate, nearby job opportunities
- Unclear pay rates and job expectations upfront
- Slow or no response from employers
- No platform to build a professional reputation as a day worker
 
**Employers & Agencies:**
- No centralized way to post roles and find verified workers fast
- High no-show rates and unqualified applicants
- Time-consuming, informal hiring processes
- No accountability or rating system for workers
 
---
 
## 3. Goals & Success Metrics
 
### 3.1 Business Goals
 
- Become the leading digital platform for day work in Sri Lanka
- Achieve 1,000+ active registered users within Year 1
- Build partnerships with at least 20 local agencies and businesses in Year 1
- Generate initial revenue through premium job boost subscriptions
 
### 3.2 Key Performance Indicators (KPIs)
 
| KPI | Target | Measurement Period |
|---|---|---|
| Active Registered Users | 1,000+ | End of Year 1 |
| Jobs Posted per Month | 200+ | By Month 6 |
| Average Time to Fill a Job | < 48 hours | Ongoing |
| Worker Application Rate | > 3 applications/job | Ongoing |
| User Satisfaction (CSAT) | > 4.0 / 5.0 | Quarterly surveys |
| Repeat Usage Rate | > 40% | Month 3 onward |
| Premium Boost Conversions | > 5% of employers | Month 4 onward |
 
---
 
## 4. Target Users & Personas
 
### 4.1 Persona 1: Job Seeker — "Kasun"
 
| Attribute | Detail |
|---|---|
| Name | Kasun, 24 |
| Background | Young urban male seeking daily/weekly income between formal jobs |
| Motivations | Find work quickly, earn income, explore flexible opportunities |
| Key Needs | Easy registration, clear job details, fast application process |
| Pain Points | Lack of local job options, slow employer responses, unclear pay rates |
| Tech Comfort | Comfortable using smartphones and web browsers |
| Primary Device | Mobile browser |
 
### 4.2 Persona 2: Employer / Agency — "Nimal"
 
| Attribute | Detail |
|---|---|
| Name | Nimal, 38 |
| Background | Owner of a small construction firm, hires 3–10 workers per week |
| Motivations | Fill positions quickly, find reliable workers, reduce hiring hassle |
| Key Needs | Simple job posting, ability to review applicants, communication tools |
| Pain Points | Worker no-shows, unqualified applicants, time-consuming hiring |
| Tech Comfort | Moderate; uses laptop and smartphone |
| Primary Device | Desktop browser for posting, mobile for checking applications |
 
---
 
## 5. Product Scope
 
### 5.1 In Scope (v1.0 Launch)
 
- User registration and profile creation (job seekers and employers)
- Job posting with structured fields (role, location, pay, dates)
- Job search and filter by location, skill category, and pay
- Job application flow with worker availability and expected pay input
- In-app messaging/chat between employer and applicant
- Location-based job matching
- Ratings and reviews (post-engagement, bidirectional)
- Push and email notifications (new jobs, applications, messages)
- Premium job boost feature for employers (paid visibility)
- Mobile-responsive web application
 
### 5.2 Out of Scope (Post-Launch)
 
- Native iOS or Android mobile applications
- In-app payment processing or escrow
- Multi-language support (Sinhala, Tamil)
- AI-based matching or recommendation engine
- Background verification integrations
- Payroll or tax management features
 
---
 
## 6. Feature Requirements
 
### 6.1 Authentication & Onboarding
 
**FR-001: User Registration**
- Users register as either Job Seeker or Employer/Agency
- Required fields: full name, mobile number, email, password, location (district/city)
- Employer additionally provides: company/agency name, industry type
- Email verification required before account activation
 
**FR-002: Profile Management**
- Job seekers: photo, bio, skill tags, work history, location radius preference
- Employers: company logo, description, industry, verified status badge
- Users can edit profiles at any time
 
---
 
### 6.2 Job Posting
 
**FR-003: Create Job Posting**
- Available to verified employer accounts only
- Required fields: job title, category, description, location (Google Maps pin or address), start date, end date (or ongoing), pay rate (per hour / per day / fixed), number of workers needed
- Optional fields: skill requirements, tools provided, accommodation details
- Job status: Draft, Active, Paused, Closed
 
**FR-004: Premium Job Boost**
- Employers can pay to boost a job posting for elevated visibility
- Boosted jobs appear at the top of search results and are highlighted
- Boost durations: 3 days, 7 days, 14 days (pricing TBD)
- Payment processed externally (bank transfer or mobile payment receipt upload) — no in-app payments at launch
 
---
 
### 6.3 Job Discovery & Search
 
**FR-005: Search & Filter**
- Job seekers can search jobs by keyword, location, category, pay range, and date
- Location-based filter: jobs within X km radius of seeker's location
- Filters: category, pay type, date range, employer rating
- Sort options: newest, closest, highest pay, most applicants
 
**FR-006: Job Detail Page**
- Full job description, pay rate, location map, start date, employer profile summary
- Number of applicants visible to seeker
- One-tap apply button with optional message
 
---
 
### 6.4 Application Flow
 
**FR-007: Apply to Job**
- Seeker submits availability (specific days/times they are available)
- Seeker states expected pay if different from posted rate
- Optional cover message
- System notifies employer immediately upon new application
 
**FR-008: Application Management (Employer)**
- Employer sees list of applicants with profile summary and expected pay
- Employer can: shortlist, reject, or message applicant directly
- Employer selects final worker(s) and marks application as accepted
- Rejected applicants are notified automatically
 
---
 
### 6.5 In-App Messaging
 
**FR-009: Chat**
- Real-time or near-real-time chat between employer and seeker (per job context)
- Chat is tied to a specific job application — not a free-form inbox
- File/photo sharing not required at v1
- Message history persisted for 30 days
 
---
 
### 6.6 Ratings & Reviews
 
**FR-010: Bidirectional Reviews**
- After a job is marked complete, both parties are prompted to rate each other
- Rating: 1–5 stars + optional text review
- Reviews are public on user profiles
- Users cannot edit or delete reviews after submission
- Report/flag system for inappropriate reviews
 
---
 
### 6.7 Notifications
 
**FR-011: Notification System**
- Email notifications: new application, message received, job status update
- In-app notification bell with unread count
- Opt-out available for marketing notifications; transactional notifications always on
 
---
 
## 7. User Journeys
 
### 7.1 Job Seeker Journey
 
1. Visit DayWork LK and register as a Job Seeker
2. Complete profile with skills, location, and availability
3. Browse or search jobs by location and category
4. Open job detail page and review requirements and pay
5. Submit application with availability and expected pay
6. Receive confirmation and wait for employer response
7. Chat with employer to negotiate or clarify details
8. Accept offer and confirm job details offline
9. After the job, leave a review for the employer
 
### 7.2 Employer Journey
 
1. Visit DayWork LK and register as an Employer/Agency
2. Complete company profile
3. Create a new job posting with all required details
4. Optionally purchase a Premium Boost for the posting
5. Receive applications and review seeker profiles
6. Shortlist and chat with preferred candidates
7. Select the worker(s) and confirm arrangement offline
8. After the job, leave a review for the worker
 
---
 
## 8. Non-Functional Requirements
 
| Requirement | Category | Target |
|---|---|---|
| Page load time | Performance | < 3 seconds on 4G mobile |
| Uptime / Availability | Reliability | > 99.5% monthly |
| Concurrent users | Scalability | Support 500 concurrent at launch |
| Mobile responsiveness | UX | All screens optimized for 320px+ |
| Data privacy | Security | GDPR-aligned; no data sold to third parties |
| Password storage | Security | Bcrypt hashed; no plaintext storage |
| Session management | Security | JWT with 24hr expiry; refresh tokens |
| Search latency | Performance | < 1 second for filtered job results |
 
---
 
## 9. Monetization Strategy
 
### 9.1 Launch Model: Freemium + Premium Boosts
 
The platform is free for all users at launch — both job seekers and employers can access all core features at no cost. Revenue is generated through Premium Job Boosts purchased by employers.
 
| Tier | Who | Features |
|---|---|---|
| Free (All Users) | Job Seekers | Unlimited job search, apply, chat, reviews |
| Free (Employers) | Employers | Up to 5 active job posts, standard visibility |
| Premium Boost | Employers | Top-of-search placement, highlighted listing, analytics |
 
### 9.2 Future Revenue Opportunities (Post-Launch)
 
- Employer subscription plans (unlimited posts, advanced analytics)
- Featured employer badges
- Agency partnership packages
- In-app payment processing (future phase)
 
---
 
## 10. Risks & Mitigations
 
| Risk | Severity | Mitigation |
|---|---|---|
| Low initial user adoption (cold start) | High | Launch with seeded job postings via agency partnerships; run targeted social media campaigns |
| Worker no-shows damaging trust | High | Implement rating system; flag repeat no-shows; send job day reminders via notifications |
| Employer spam / fake job posts | Medium | Email verification + manual review for first 5 posts; community flagging system |
| Platform stability under load | Medium | Load test before launch; use scalable cloud infrastructure (auto-scaling) |
| Data privacy violations | Medium | Minimal data collection; GDPR-aligned privacy policy; no third-party data sharing |
| Regulatory / labor law compliance | Low–Medium | Consult local legal counsel; add disclaimers that platform is a matching tool only |
 
---
 
## 11. Assumptions & Constraints
 
### 11.1 Assumptions
 
- Target users have access to smartphones or computers with internet connectivity
- Employers are willing to adopt a digital tool if it is simple and free
- Workers and employers are willing to handle payment and agreements offline at launch
- English is sufficient for the initial launch audience (urban employers and tech-comfortable seekers)
 
### 11.2 Constraints
 
- No in-app payment gateway at launch — all financial transactions are offline
- English only at v1; no Sinhala or Tamil support
- No native mobile app at v1 — web-responsive only
- Budget and team size are not defined; architecture must be lean and scalable
 
---
 
## 12. Open Questions
 
- What is the pricing structure for Premium Boosts (per boost vs. subscription)?
- How will employer identity be verified to prevent fraudulent job posts?
- Should worker profiles include a government ID verification step (NIC)?
- What cloud provider and tech stack will be selected (Architecture phase)?
- When will Sinhala and Tamil language support be added?
- Will the platform expand to a native mobile app — if so, what is the timeline?
- What is the dispute resolution process when a worker or employer misbehaves?
 
---
 
## 13. Next Steps (BMAD Workflow)
 
| Step | Agent | Deliverable |
|---|---|---|
| Step 03 | Architect | System architecture, tech stack, data models, API design |
| Step 04 | Scrum Master | Epic and story breakdown from this PRD |
| Step 05 | Developer | Story-by-story implementation (per sprint) |
| Step 06 | QA | Test plans, acceptance criteria validation, bug tracking |
 
---
 
## Document Sign-Off
 
| Role | Status |
|---|---|
| Product Manager (PM) | ✅ Approved — BMAD PRD Phase |
| Architect | ⏳ Pending — Step 03 |
| Developer Lead | ⏳ Pending — Step 05 |
| QA Lead | ⏳ Pending — Step 06 |
 
---
 
*This PRD was produced as part of the BMAD (Breakthrough Method of Agile AI-Driven Development) workflow for project `test-bmad`.*