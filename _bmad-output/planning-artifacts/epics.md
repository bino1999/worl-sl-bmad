---
project_name: test-bmad
user_name: Binodbandara
communication_language: English
document_output_language: English
stepsCompleted: [1,2,3]
date: 2026-03-18
---

# Epics and Stories Requirements Extraction

## Functional Requirements (FRs)
- User Registration (Job Seeker, Employer/Agency)
- Profile Management (Job Seeker, Employer)
- Job Posting (with Premium Boost)
- Job Search & Filter
- Job Detail Page
- Job Application Flow
- Application Management (Employer)
- In-App Messaging (Chat)
- Ratings & Reviews (Bidirectional)
- Notification System

## Non-Functional Requirements (NFRs)
- Page load time < 3s on 4G
- Uptime > 99.5% monthly
- Support 500 concurrent users at launch
- Mobile responsiveness (320px+)
- Data privacy (GDPR-aligned)
- Password storage (bcrypt hashed)
- Session management (JWT, 24hr expiry)
- Search latency < 1s

## Additional Requirements from Architecture
- Web frontend: React.js (TypeScript), Material-UI/Chakra UI
- Backend: Node.js + Express.js (TypeScript)
- Database: PostgreSQL
- JWT-based authentication
- Transactional email service integration
- Encrypted data in transit (TLS)
- Daily DB backups, WAL archiving
- Basic logging and error tracking

## Out of Scope (for v1)
- In-app payment processing
- Multi-language support
- Native mobile app
- Advanced analytics

---

# Proposed Epics

## Epic 1: User Authentication & Onboarding
**Description:** Enable users to register, verify, and manage their accounts as Job Seekers or Employers/Agencies.
**Covers:**
- User Registration (Job Seeker, Employer/Agency)
- Email verification
- Profile Management (Job Seeker, Employer)
- Session management (JWT, 24hr expiry)
- Password storage (bcrypt hashed)

### User Stories for Epic 1: User Authentication & Onboarding

#### Story 1.1: User Registration as Job Seeker
**User Story:** As a job seeker, I want to register with my details so that I can access job opportunities on the platform.
**Acceptance Criteria:**
- Registration form includes full name, mobile number, email, password, location
- User selects 'Job Seeker' role
- Email verification is required before account activation
- Error messages shown for invalid or missing fields
- Successful registration redirects to profile setup
**Epic:** User Authentication & Onboarding

#### Story 1.2: User Registration as Employer/Agency
**User Story:** As an employer or agency, I want to register my company so that I can post jobs and find workers.
**Acceptance Criteria:**
- Registration form includes full name, mobile number, email, password, location, company/agency name, industry type
- User selects 'Employer/Agency' role
- Email verification is required before account activation
- Error messages shown for invalid or missing fields
- Successful registration redirects to company profile setup
**Epic:** User Authentication & Onboarding

#### Story 1.3: User Login and Session Management
**User Story:** As a registered user, I want to log in securely so that I can access my account and stay logged in.
**Acceptance Criteria:**
- Login form accepts email and password
- Passwords are securely hashed (bcrypt)
- JWT-based session is created on successful login
- Session expires after 24 hours or on logout
- Error messages for invalid credentials
**Epic:** User Authentication & Onboarding

#### Story 1.4: Profile Management (Job Seeker)
**User Story:** As a job seeker, I want to manage my profile so that employers can view my skills and experience.
**Acceptance Criteria:**
- Can add/edit photo, bio, skill tags, work history, location radius
- Changes are saved and reflected immediately
- Profile is visible to employers when applying for jobs
**Epic:** User Authentication & Onboarding

#### Story 1.5: Profile Management (Employer/Agency)
**User Story:** As an employer/agency, I want to manage my company profile so that job seekers can learn about my business.
**Acceptance Criteria:**
- Can add/edit company logo, description, industry, verified status
- Changes are saved and reflected immediately
- Profile is visible to job seekers on job postings
**Epic:** User Authentication & Onboarding

## Epic 2: Job Posting & Premium Boost
**Description:** Allow employers to create, manage, and boost job postings for increased visibility.
**Covers:**
- Job Posting (with Premium Boost)
- Job status management (Draft, Active, Paused, Closed)
- Premium job boost feature

### User Stories for Epic 2: Job Posting & Premium Boost

## Story 2.1: Create Job Posting
**User Story:** As an employer, I want to create a job posting with all required details so that I can attract suitable job seekers.
**Acceptance Criteria:**
- Form includes job title, category, description, location, start/end date, pay rate, number of workers
- Optional fields: skill requirements, tools provided, accommodation details
- Only verified employer accounts can post jobs
- Job status can be set to Draft, Active, Paused, or Closed
- Validation for required fields and logical dates
**Epic:** Job Posting & Premium Boost

## Story 2.2: Edit and Manage Job Postings
**User Story:** As an employer, I want to edit or update my job postings so that I can keep information accurate and up to date.
**Acceptance Criteria:**
- Employers can edit any field of their job postings
- Changes are saved and reflected immediately
- Employers can pause, close, or reactivate postings
**Epic:** Job Posting & Premium Boost

## Story 2.3: Premium Job Boost Feature
**User Story:** As an employer, I want to boost my job posting for increased visibility so that I can attract more applicants quickly.
**Acceptance Criteria:**
- Employers can select boost duration (3, 7, 14 days)
- Boosted jobs appear at the top of search results and are highlighted
- Payment is processed externally (no in-app payment at launch)
- Boost status and duration are visible to employer
**Epic:** Job Posting & Premium Boost

## Story 2.4: Job Posting Validation and Moderation
**User Story:** As a platform admin, I want to review new job postings to ensure they meet quality and authenticity standards.
**Acceptance Criteria:**
- New postings are flagged for manual review if needed
- Employers receive notification if a posting is rejected or requires changes
- Community flagging system for inappropriate or spam postings
**Epic:** Job Posting & Premium Boost

## Epic 3: Job Search & Discovery
**Description:** Provide job seekers with robust search, filter, and discovery tools to find relevant jobs quickly.
**Covers:**
- Job Search & Filter
- Location-based job matching
- Job Detail Page
- Search latency < 1s

### User Stories for Epic 3: Job Search & Discovery

## Story 3.1: Search for Jobs by Keyword and Filters
**User Story:** As a job seeker, I want to search for jobs using keywords and filters so that I can quickly find relevant opportunities.
**Acceptance Criteria:**
- Search bar accepts keywords (job title, company, etc.)
- Filters available: location, category, pay range, date, employer rating
- Results update in real time as filters are applied
- Search latency is less than 1 second
**Epic:** Job Search & Discovery

## Story 3.2: Location-Based Job Matching
**User Story:** As a job seeker, I want to see jobs near my location so that I can find work that is convenient for me.
**Acceptance Criteria:**
- User can set preferred location and radius
- Jobs displayed are within the selected radius
- Map view or distance indicator is available
**Epic:** Job Search & Discovery

## Story 3.3: View Job Detail Page
**User Story:** As a job seeker, I want to view detailed information about a job so that I can decide whether to apply.
**Acceptance Criteria:**
- Job detail page shows full description, pay, location, employer profile, start date
- Number of applicants is visible
- One-tap apply button is present
**Epic:** Job Search & Discovery

## Story 3.4: Sort and Prioritize Job Listings
**User Story:** As a job seeker, I want to sort job listings by newest, closest, highest pay, or most applicants so that I can prioritize my search.
**Acceptance Criteria:**
- Sort options are available and functional
- Default sort is by newest
- User selection persists during session
**Epic:** Job Search & Discovery

## Epic 4: Application & Selection Flow
**Description:** Facilitate the application process, employer review, and selection of candidates.
**Covers:**
- Job Application Flow
- Application Management (Employer)
- Notification System (application updates)

### User Stories for Epic 4: Application & Selection Flow

## Story 4.1: Apply to a Job
**User Story:** As a job seeker, I want to apply to jobs with my availability and expected pay so that I can be considered for suitable roles.
**Acceptance Criteria:**
- Application form allows input of availability and expected pay
- Optional cover message can be included
- System notifies employer immediately upon new application
- User receives confirmation of application submission
**Epic:** Application & Selection Flow

## Story 4.2: Employer Reviews Applications
**User Story:** As an employer, I want to review, shortlist, and manage job applications so that I can select the best candidates efficiently.
**Acceptance Criteria:**
- Employer sees list of applicants with profile summary and expected pay
- Can shortlist, reject, or message applicants
- Can select final worker(s) and mark application as accepted
- Rejected applicants are notified automatically
**Epic:** Application & Selection Flow

## Story 4.3: Application Status Notifications
**User Story:** As a user, I want to receive notifications about my application status so that I am always informed of updates.
**Acceptance Criteria:**
- Email and in-app notifications for new application, shortlist, rejection, acceptance
- Notification bell with unread count in app
- Opt-out available for marketing notifications
**Epic:** Application & Selection Flow

## Epic 5: In-App Messaging
**Description:** Enable real-time or near-real-time communication between employers and job seekers within the context of job applications.
**Covers:**
- In-App Messaging (Chat)
- Message history
- Notification System (messages)

### User Stories for Epic 5: In-App Messaging

## Story 5.1: Initiate Chat on Job Application
**User Story:** As a job seeker or employer, I want to start a chat related to a job application so that I can communicate directly about the opportunity.
**Acceptance Criteria:**
- Chat is available only after an application is submitted
- Chat is tied to a specific job application
- Both parties receive notifications for new messages
**Epic:** In-App Messaging

## Story 5.2: Real-Time or Near-Real-Time Messaging
**User Story:** As a user, I want messages to be delivered in real time or near real time so that conversations are efficient and responsive.
**Acceptance Criteria:**
- Messages appear instantly or with minimal delay
- Unread message count is visible
- Message history is persisted for 30 days
**Epic:** In-App Messaging

## Story 5.3: Notification of New Messages
**User Story:** As a user, I want to be notified when I receive a new message so that I never miss important communication.
**Acceptance Criteria:**
- In-app notification bell updates with new messages
- Email notification sent for unread messages after a set period
- User can opt out of email notifications
**Epic:** In-App Messaging

## Epic 6: Ratings & Reviews
**Description:** Support bidirectional ratings and reviews after job completion to build trust and accountability.
**Covers:**
- Ratings & Reviews (Bidirectional)
- Review moderation/reporting

### User Stories for Epic 6: Ratings & Reviews

## Story 6.1: Leave a Review After Job Completion
**User Story:** As a job seeker or employer, I want to leave a rating and review after a job is completed so that I can share my experience.
**Acceptance Criteria:**
- Both parties are prompted to leave a review after job completion
- Rating is 1–5 stars with optional text review
- Reviews are public on user profiles
- Users cannot edit or delete reviews after submission
**Epic:** Ratings & Reviews

## Story 6.2: View and Report Reviews
**User Story:** As a user, I want to view reviews on profiles and report inappropriate content so that the platform remains trustworthy.
**Acceptance Criteria:**
- All reviews are visible on user profiles
- Users can flag reviews as inappropriate
- Admins can review and moderate flagged content
**Epic:** Ratings & Reviews

## Epic 7: Platform Operations & Security
**Description:** Ensure the platform is reliable, secure, and scalable for all users.
**Covers:**
- Page load time < 3s on 4G
- Uptime > 99.5% monthly
- Support 500 concurrent users at launch
- Mobile responsiveness (320px+)
- Data privacy (GDPR-aligned)
- Encrypted data in transit (TLS)
- Daily DB backups, WAL archiving
- Basic logging and error tracking

### User Stories for Epic 7: Platform Operations & Security

## Story 7.1: Ensure Fast Page Load Times
**User Story:** As a user, I want pages to load quickly so that I have a smooth experience on any device.
**Acceptance Criteria:**
- Page load time is less than 3 seconds on 4G mobile
- Performance is monitored and reported
**Epic:** Platform Operations & Security

## Story 7.2: Maintain High Uptime and Reliability
**User Story:** As a user, I want the platform to be available whenever I need it so that I can rely on it for job searching or hiring.
**Acceptance Criteria:**
- Uptime is greater than 99.5% monthly
- System alerts for downtime or critical failures
**Epic:** Platform Operations & Security

## Story 7.3: Support Concurrent Users and Scalability
**User Story:** As a platform owner, I want to support at least 500 concurrent users at launch so that the platform can grow without issues.
**Acceptance Criteria:**
- Load testing is performed before launch
- System scales horizontally as needed
**Epic:** Platform Operations & Security

## Story 7.4: Enforce Data Privacy and Security
**User Story:** As a user, I want my data to be secure and private so that I can trust the platform with my information.
**Acceptance Criteria:**
- Data is encrypted in transit (TLS)
- Passwords are hashed (bcrypt or Argon2)
- GDPR-aligned privacy policy is published
- No data is sold to third parties
**Epic:** Platform Operations & Security

## Story 7.5: Monitor and Backup System Data
**User Story:** As a platform admin, I want daily backups and error logging so that data is protected and issues can be resolved quickly.
**Acceptance Criteria:**
- Daily database backups and WAL archiving are enabled
- Basic logging and error tracking are implemented
- Admins can access logs and restore backups if needed
**Epic:** Platform Operations & Security

## Epic 8: Technical Foundation
**Description:** Establish the technical stack and integrations required for platform operation.
**Covers:**
- Web frontend: React.js (TypeScript), Material-UI/Chakra UI
- Backend: Node.js + Express.js (TypeScript)
- Database: PostgreSQL
- Transactional email service integration

---

# User Stories for Epic 8: Technical Foundation

## Story 8.1: Set Up Web Frontend with React.js
**User Story:** As a developer, I want to use React.js with TypeScript for the frontend so that the platform is modern, maintainable, and scalable.
**Acceptance Criteria:**
- Project is scaffolded with React.js and TypeScript
- UI library (Material-UI or Chakra UI) is integrated
- Responsive design is implemented
**Epic:** Technical Foundation

## Story 8.2: Implement Backend with Node.js and Express.js
**User Story:** As a developer, I want to use Node.js and Express.js with TypeScript for the backend so that the API is robust and scalable.
**Acceptance Criteria:**
- Backend project is scaffolded with Node.js and Express.js
- TypeScript is used throughout
- API endpoints follow RESTful conventions
**Epic:** Technical Foundation

## Story 8.3: Integrate PostgreSQL Database
**User Story:** As a developer, I want to use PostgreSQL as the database so that data is stored reliably and can be queried efficiently.
**Acceptance Criteria:**
- Database schema is designed and implemented
- Connection between backend and PostgreSQL is established
- Migrations and seed scripts are available
**Epic:** Technical Foundation

## Story 8.4: Add Transactional Email Service
**User Story:** As a developer, I want to integrate a transactional email service so that the platform can send notifications and verifications.
**Acceptance Criteria:**
- Email service (e.g., SendGrid, Mailgun) is integrated
- Emails are sent for verification, notifications, and password resets
- Email templates are customizable
**Epic:** Technical Foundation

---

*Please review these proposed epics. Reply with feedback, suggest edits, or type 'C' to confirm and continue to the next step.*
