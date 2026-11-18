# Utsav Phase 3 — Motion & Loading Polish (Revision 2)

## What changed
- Added `EventCoverImage`, a reusable image wrapper for Dashboard, Events grid, and Event detail.
- Displays a real shimmer skeleton while an event cover image is loading.
- Shows an accessible fallback when an image fails instead of leaving a blank card.
- Loads the first visible event images eagerly and defers below-the-fold images.
- Makes route and card entrance animations slightly more perceptible without changing layout, spacing, colors, or typography.
- Retains existing reduced-motion behavior and existing route-level Suspense skeleton fallback.

## Scope
No backend, persistence, localStorage, API, or new runtime dependency.
No layout redesign.

## Apply
From the project root, copy these files into the matching paths:
- `src/components/eventops/app-shell.tsx`
- `src/components/eventops/event-cover-image.tsx` (new)
- `src/styles.css`

Then run:
```bash
npx tsc --noEmit
npm run build
npm run dev
```

Note: TanStack route-level Suspense fallback only appears when route content actually suspends. The new image skeleton is deterministic and appears while image assets are loading.
