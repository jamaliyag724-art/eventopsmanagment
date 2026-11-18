# Utsav public experience — Phase 6

This patch updates only the public-facing website experience. It does not change the Admin Panel, authenticated workspace, backend, or the existing theme system.

## Included changes
- Adds a short Utsav-branded startup transition on initial public-page document load. It waits briefly for the hero image and fonts, with a strict 1.25-second readiness fallback and a short fade-out. It does not run on `/app/*` or `/admin*`.
- Removes the extra 420 ms welcome-dialog timer. The welcome state becomes ready immediately after hydration, underneath the startup curtain, so it is visible as soon as the curtain clears. Existing once-per-tab dismissal behavior remains.
- Adds a smooth incoming-page transition to public marketing/auth pages.
- Adds staggered scroll entrances, a subtle active-slide image drift, refined navigation and hover interactions, and page-specific warm background depth.
- Adds a sample Utsav workspace preview on Features, event-format visual cards on Solutions, and a brand-story showcase on About. Uses existing local images and clearly labels the product preview/sample data.
- Refines Pricing card motion and Contact form focus feedback.
- Preserves the existing Utsav palette, typography, content, routes, functionality and reduced-motion support.

## Apply to the existing Git repository
Extract the ZIP into the root of `eventopsmanagment-github` and allow it to overwrite the three source files. Or apply the `.patch` with `git apply utsav-public-experience-phase6.patch`.

Then run:

```bash
npx tsc --noEmit
npm run test -- --run
npm run build
```

## Verification performed in this editing environment
- TypeScript: passed (`tsc --noEmit`).
- Tests: passed (28/28).
- CSS syntax parse: passed.
- Production build: not completed here because the uploaded dependency folder contained macOS native packages, while this build container is Linux; its `lightningcss` Linux optional binary is absent. The source code itself passed typecheck and tests. Run the production build on the Mac project checkout after applying the patch.
- ESLint reports pre-existing Prettier formatting violations throughout `public-site.tsx` and `__root.tsx`; no whole-file reformat was applied to avoid unrelated churn.
