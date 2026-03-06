# Next Steps — What to Pick Up

## Current State (after Phase 5, 2026-03-06)

Phases 1 through 5 are complete. The app has:
- Client-side routing with sidebar nav (`web/router.ts`)
- 360-degree client detail with tabs (`web/components/ClientView.tsx`)
- Landing page with 6 KPI cards (incl. Alerts), clickable counts → filtered view (`web/components/LandingPage.tsx`)
- Attorney Daily Appointments page at `/appointments` (`web/components/AppointmentsPage.tsx`)
- Enhanced search: type dropdown (Clients/Contracts/Court Cases/etc.), phone/email/address partial matching
- Filtered Clients page with priority chips, status/attorney/board type dropdowns, date range (`web/components/ClientsPage.tsx`)
- Smart Alerts page at `/alerts` — overdue deadlines, stale cases, idle contracts, grouped by severity (`web/components/AlertsPage.tsx`)
- Reusable `useUrlFilters` hook for URL-driven filter persistence
- REST API at `server.ts` serving all data from read-only SQLite

332 tests passing. All code on the `read-only` branch.

---

## Phase 3: Attorney Daily Appointments — COMPLETE

**What was built**:
- `/appointments` page with attorney selector (All / R / M / LB / WH), synced to URL params + localStorage
- Three detail levels: Minimal (name + priority), Snapshot (+ case counts, deadline, contact info), Full (+ complete case breakdown)
- Today / This Week range toggle
- Expandable notes timeline per appointment card, reusing the existing `UpdatesTimeline` component
- Link to 360 client view from each card
- New query layer (`lib/query/appointments.ts`) with `getAppointments()` and `getAttorneyList()`
- New API endpoint: `GET /api/appointments?attorney=R&range=day`

**Deferred — Monday.com Write-Back**: This page is the first feature that will need editing (update status, add notes, reschedule). `TODO(monday-write)` markers are placed in the query layer and component. See `docs/decisions.md` for the planned write-back architecture.

---

## Phase 4: Enhanced Search & Filters — COMPLETE

**What was built**:
- Search type dropdown: Clients (default), Contracts, Court Cases, Open Forms, Motions, Appeals, FOIAs, RFEs, Litigation, I-918B
- Profile search recognizes phone numbers (partial match on last 4 digits), email addresses (partial with @), and street addresses (via FTS5)
- Schema migration v4→v5: rebuilt FTS5 index to include address column
- New `/api/search?q=...&type=...` endpoint for cross-entity search
- Clients page (`/clients`) with FilterBar: priority chips, status/attorney/board type dropdowns, date range picker
- URL-driven filters via `useUrlFilters` hook (URL params → localStorage → defaults)
- `GET /api/filter-options` returns distinct values for populating dropdowns
- `GET /api/clients` supports filter params: `status`, `priority`, `attorney`, `board_type`, `date_from`, `date_to`
- Virtual statuses (`pending_contracts`, `paid_fee_ks`) for KPI click-through
- KPI card counts on landing page are clickable → navigate to `/clients` with pre-set filters
- 23 new tests for search (phone, email, address, typed search, filtered listing, filter options)


## NOTE!!
There's a runtime error on the clients tab:
Runtime Error
TypeError: undefined is not an object (evaluating 'filteredProfiles.length')
at ClientsPage2 in http://localhost:3000/_bun/client/index-00000000543df285.js:1780:43
at react_stack_bottom_frame in http://localhost:3000/_bun/client/index-00000000543df285.js:19963:29
at renderWithHooks in http://localhost:3000/_bun/client/index-00000000543df285.js:10490:42
at updateFunctionComponent in http://localhost:3000/_bun/client/index-00000000543df285.js:11914:36
at runWithFiberInDEV in http://localhost:3000/_bun/client/index-00000000543df285.js:6626:137
at performUnitOfWork in http://localhost:3000/_bun/client/index-00000000543df285.js:15124:115
at workLoopSync in http://localhost:3000/_bun/client/index-00000000543df285.js:15010:28
at renderRootSync in http://localhost:3000/_bun/client/index-00000000543df285.js:14993:27
at performWorkOnRoot in http://localhost:3000/_bun/client/index-00000000543df285.js:14652:51
at performWorkOnRootViaSchedulerTask in http://localhost:3000/_bun/client/index-00000000543df285.js:15816:26
at performWorkUntilDeadline in http://localhost:3000/_bun/client/index-00000000543df285.js:21721:58
---

## Phase 5: Smart Alerts — COMPLETE

**What was built**:
- `/alerts` page with three severity-grouped alert categories: overdue deadlines (critical), stale cases (warning), pending contracts without activity (info)
- Attorney filter chips + severity filter chips, synced to URL params + localStorage
- Alert items show client name (linked to 360), board type, status, days overdue/stale
- New query layer (`lib/query/alerts.ts`) with `getAlerts()` and `getAlertsTotalCount()`
- New API endpoint: `GET /api/alerts?attorney=R`
- 6th KPI card on landing page showing total alerts count, clickable → `/alerts`
- 11 new tests for alert detection logic

---

## Landing Page Polish (backlog)

These were noted but deferred from Phase 2:
- **Count click → filtered list**: clicking the count on a KPI card should navigate to a filtered view showing all items (not just top 5)
- **Stale cases card**: "no updates in 30+ days" — good candidate for Alerts page instead
- **Empty state refinement**: cards currently show "No items" — could be more informative
