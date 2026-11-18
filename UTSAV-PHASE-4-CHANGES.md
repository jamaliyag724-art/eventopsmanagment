# Utsav Phase 4 — Admin Panel & Dashboard Module Completion

## Scope
Frontend-only demo functionality. Existing Utsav layout, typography, colours, spacing, routes and design tokens are preserved. No backend, database, API integration, localStorage or persistence layer has been added.

## Admin Panel
The `/admin` route now renders a dedicated Admin workspace with these sections:

1. **Organizations** — searchable/filterable directory with create, edit, delete and CSV export.
2. **Users** — sample user access register with roles, organization, last activity and status; create/edit/delete/export.
3. **Events** — platform event portfolio with format, event date, organization, INR budget and status; create/edit/delete/export.
4. **Workshops** — workshop directory with category, date, venue, registrations and status; create/edit/delete/export.
5. **Vendors** — partner register with category, contact, engagements, rating and status; create/edit/delete/export.
6. **Subscriptions** — organization plans, billing cycles, renewal dates, INR amounts and statuses; create/edit/delete/export.
7. **Payments** — demo transaction register with references, organizations, dates, INR amounts, payment method and status; create/edit/delete/export.
8. **Activity** — local activity feed that records admin create/update/delete actions in the current session.
9. **Reports** — downloadable CSV reports for organizations, users, events, subscriptions, payments and vendors.
10. **Content management** — website/help content items with edit, create, delete and status fields.
11. **Settings** — local demo toggles for maintenance preference, organization alerts, payment notifications and weekly digest.

All records are sample/demo data. CRUD changes live in React state and reset on refresh. These controls are not connected to a server and are not security boundaries.

## Dashboard module alignment
- Standardized active module sample records around the Indian Utsav event portfolio: Ahmedabad Navratri Nights, Jaipur Palace Wedding, Bengaluru Innovation Forum, Mumbai Diwali Leadership Summit and Delhi University Spring Utsav.
- Replaced leftover Morrow, Northstar, Goodwood and Common Ground references in the active workspace dataset with Utsav demo portfolio references.
- Replaced inconsistent US/UK-style sample staff names with Indian demo team names where those records are shown.
- Kept Finance values in INR and corrected portfolio-level demo metrics to ₹9.42 Cr budget and ₹6.14 Cr committed spend.
- Corrected example venue-to-event assignments in the venue register.
- Kept Workshops in the existing module list and seeded workshop records; the Admin Workshops section uses a platform-wide sample register.
- Updated workspace profile and sidebar initials to match the sample Utsav organization/user.

## Files changed
- `src/components/eventops/admin/admin-page.tsx` — new Admin Panel UI and local demo workflows.
- `src/components/eventops/app-shell.tsx` — routes `/admin` content to the new Admin page and aligns legacy sample tables/notifications.
- `src/components/eventops/data.ts` — aligns task/activity people with Indian demo users.
- `src/components/eventops/modules/module-workspace.tsx` — aligns Finance, Workforce, Sponsors, Venues, Live Operations, Intelligence, Documents and Settings demo rows.
- `src/components/eventops/layout/sidebar.tsx` — updates the organization monogram.
- `src/components/eventops/layout/topbar.tsx` — aligns the demo profile and notifications.

## Verification performed in this working environment
- TypeScript transpile/syntax pass for **91** source `.ts` / `.tsx` files: **0 diagnostics**.
- Isolated strict TypeScript check for `admin-page.tsx` with UI/module declaration stubs: **0 diagnostics**.
- Full project typecheck and Vite production build were not run here because project dependencies are not installed in this working environment. Run the commands below in the project after extracting the ZIP.

```bash
npx tsc --noEmit
npm run build
npm run dev
```

## Manual QA checklist
- Open `/admin` and switch through each of the 11 tabs.
- Test add/edit/delete on Organizations, Users, Events, Workshops, Vendors, Subscriptions, Payments and Content management.
- Test global search from the top bar and status filter on table tabs.
- Download a CSV from a table tab and from Reports.
- Toggle each Settings switch and confirm it gives demo feedback.
- Open `/app/planning`, `/app/workshops`, `/app/vendors`, `/app/finance`, `/app/workforce`, `/app/sponsors`, `/app/venues`, `/app/live-operations`, `/app/ai`, `/app/analytics`, `/app/documents` and `/app/settings` to check the refreshed sample records.
