# Crowdpilot - Specification (Dev-Friendly & Task-Oriented)

## 1. Project Goal

Build a **React SPA** that lets a project owner manage crowdfunding campaigns via a **secured JWT API**.

The application must cover:
- Authentication (registration, login, user session)
- Global steering via dashboard
- Projects CRUD
- Investors listing per project
- Global state shared across pages with Redux

## 2. Current Baseline (codebase audit)

The project is a **Vite + React + TypeScript** starter with this structure:

```text
src/
  api/client.ts              # Axios + QueryClient
  features/dashboard/        # feature already created
  router/index.tsx           # minimal routing ("/" -> Dashboard)
  layout/RootLayout.tsx      # root layout
  store/index.ts             # present but to be completed
  domain/                    # models/schemas (to leverage)
```

Key findings:
- `@reduxjs/toolkit` and `react-redux` are installed, but Redux is not wired yet.
- `@tanstack/react-query` is already set up via `QueryClientProvider`.
- Current routing exposes only the dashboard page.

## 3. Functional Scope

### 3.1 Authentication
Routes:
- `/login`
- `/register`

Features:
- Project owner registration
- Login and JWT retrieval
- Token storage
- Fetch current profile (`/auth/me`)
- Protect private routes

### 3.2 Dashboard (`/`)
Display:
- Total number of projects
- Number of open projects
- Number of closed projects
- Total capital raised

Data source:
- Backend API (preferred)
- Or front-end calculation from the projects list

### 3.3 Projects Management
#### List (`/projects`)
Show per project:
- Title
- Status (`open` | `closed`)
- Target capital
- Invested capital
- Percentage reached

Actions:
- Navigate to details
- Delete

#### Create / Update
Routes:
- `/projects/create`
- `/projects/update` (or `/projects/:id/edit`, to normalize)

Form:
- `title`
- `description`
- `capital`
- `initialInvestment`
- `maxInvestorPercentage`

#### Detail (`/projects/:id`)
Display:
- Title
- Description
- Status
- Target capital
- Current capital
- Percentage reached

Actions:
- Edit (if `open`)
- Close the project
- Delete the project

### 3.4 Project Investors (`/projects/:id/investors`)
Display:
- Investor name
- Amount invested
- Percentage of capital

### 3.5 Other route
- `/investors/:id` (investor profile, at minimum structure/routing ready)

## 4. Global Routing Requirements

Expected routes:
- `/`
- `/login`
- `/register`
- `/projects`
- `/projects/create`
- `/projects/:id`
- `/projects/:id/investors`
- `/investors/:id`

Rules:
- Private routes protected by authentication
- Redirect to `/login` when session is missing/invalid
- Redirect to `/` after successful login

## 5. State Management (Redux Core)

The Redux store must at minimum contain:
- `auth`: current user + auth status + errors
- `token`: JWT (and optional refresh/expiration status)
- `projects`: list of projects + loading status
- `selectedProject`: current project (or derived via route + selector)

Required use cases:
- Share project data across pages
- Avoid unnecessary re-fetches
- Refresh global state after create/update/delete
- Make the token available to all API requests

## 6. API Integration Rules

- Use `src/api/client.ts` as the single Axios entry point.
- Add a request interceptor to inject `Authorization: Bearer <token>`.
- Centralize API error handling (401, 403, 422, 500) with UI-friendly messages.
- Normalize payload/response types in `src/domain/models` and `src/domain/schemas`.

## 7. Non-Functional Requirements

- Strict TypeScript (no unjustified `any`)
- Reactive UI with explicit states: loading, empty, error
- Form validation (zod recommended, already available)
- Sensitive actions confirmed (e.g., delete, close)
- Code organized by feature to stay scalable

## 8. Delivery Plan (Task-Oriented)

### Phase 1 - Foundations
1. Wire Redux (`Provider`) at app entry.
2. Create `auth` and `projects` slices + base selectors.
3. Set up token persistence (storage) + hydration on startup.

### Phase 2 - Auth
1. Implement `/login` and `/register` pages.
2. Connect auth API (register/login/me).
3. Add route guards and redirects.

### Phase 3 - Projects CRUD
1. Implement `/projects` (list + delete).
2. Implement `/projects/create` and update.
3. Implement `/projects/:id` (detail + close + delete + conditional edit).

### Phase 4 - Dashboard & Investors
1. Build dashboard with KPIs.
2. Implement `/projects/:id/investors`.
3. Prepare `/investors/:id` (minimum viable page + routing).

### Phase 5 - Hardening
1. Standardize errors and loading states.
2. Finalize form validations.
3. Polish navigation UX and edge cases (session expired, project not found).

## 9. Definition of Done

The project is considered done when:
- All target routes are accessible and functional.
- JWT is used in all protected requests.
- The Redux store correctly drives auth + projects across pages.
- Core CRUD actions are operational and reflected globally.
- The user always sees an explicit state (loading/empty/error/success).
