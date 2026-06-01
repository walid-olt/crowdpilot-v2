# Plan: Investor portal + role-based features

## Problem & goal
The app currently supports owner-focused campaign management. We need to add an investor portal so INVESTOR users can browse projects, invest, and manage a wallet, while OWNER users keep their current project-management flow.

## Current state (from codebase)
- React + react-router, Redux Toolkit, React Query.
- Auth uses localStorage token + `authLoader` that only checks auth, not role.
- `Role = "OWNER" | "INVESTOR"` exists in types and register schema, but the register UI does not expose role selection.
- `/app` routes are owner-centric: dashboard, projects list, project details, project create.
- Projects API only targets `/projects/mine`.

## Proposed approach
- Add role selection at registration and make login/redirect role-aware.
- Introduce a `RoleGuard` and split authenticated routes into Owner vs Investor sections.
- Add role-specific navigation (sidebar links) and dashboard pages.
- Build investor flows: project browsing with filters, invest action on project details, portfolio summary, and wallet top-up.
- Extend the API layer for investor endpoints and wire via React Query.

## Todos
1. Add role selection to registration UI and update login redirect based on user role.
2. Introduce `RoleGuard` and update router structure to separate OWNER vs INVESTOR routes.
3. Update sidebar/navigation to show role-specific links and labels.
4. Add investor project browsing (list + filters) and invest flow on project details.
5. Add investor dashboard + portfolio summary views.
6. Add wallet view and top-up flow (balance + add funds).
7. Add investor API client functions and wire into hooks/queries.

## Notes / assumptions
- Backend endpoints exist for public project lists (filterable), investing, portfolio/me, and wallet top-up.
- Investors can see all projects with filters (per your input).
- Wallet scope is balance + add funds only.
- Keep changes lightweight and reuse existing UI patterns (QueryContainer, EmptyResult, etc.).
