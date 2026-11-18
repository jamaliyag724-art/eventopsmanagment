# Utsav Phase 5 — Final Frontend QA & Release Readiness

## Implemented in this QA pass
- Added working `/privacy`, `/terms`, and `/cookies` routes using the existing explicitly marked legal-draft content.
- Added footer links to those legal pages. The pages retain their draft/legal-review disclaimer; they are not presented as finalized legal advice.
- Added automated route coverage for every public route, legal route, admin route, `/app`, and all 14 workspace slugs (Overview plus 13 operational modules).
- Completed the Workshops workspace module's own summary metrics, table columns and create-dialog label; it no longer falls back to Planning columns or a generic team-member label.
- Associated admin and workspace form labels with their inputs using generated IDs.
- Added keyboard activation and focus styling to clickable workspace table rows.
- Delayed CSV object-URL cleanup to avoid revoking a download URL before the browser starts handling it.
- Validated new event budgets; invalid, negative, and malformed values are rejected. Valid values are normalized to Indian Rupee formatting.
- Event budget sorting and total calculations now share the same safe numeric parser.

## Preserved
- Existing visual layout, color palette, typography, sidebar, cards, and spacing.
- Frontend-only demo state. No backend, API, database, or localStorage added.
- Existing Phase 1–4 assets and functionality.

## Verification required in the project environment
Run:
```bash
npx tsc --noEmit
npm run test -- --run
npm run build
```

The package does not include `node_modules`; the isolated editing environment did not run the app's Vite/Vitest dependency graph. Do not treat source checks as a substitute for these local commands.

## Release boundary
- Login/signup and contact forms remain preview-only.
- Legal pages explicitly remain drafts requiring operator and legal review before publication.
- Admin settings, subscription and payment records are simulated demo controls, not production administration or billing.
- Browser-level responsive/performance checks should be repeated in Chrome at mobile, tablet, and desktop widths.
