# Utsav Phase 3 — Motion & Loading States

## Included
- Route-level entrance motion using a short opacity/vertical transition.
- Staggered entrance motion for app page sections, cards, event cards, and panels.
- Consistent button and interactive-surface hover/press transitions.
- Image hover zoom on existing grouped event cards.
- Accessible route loading fallback for suspended/lazy routes, with separate workspace and public-page skeleton layouts.
- Shimmer loading skeleton treatment using the existing shadcn Skeleton component.
- `prefers-reduced-motion` support disables non-essential entrance, hover, and shimmer motion.

## Scope guardrails
- Existing layouts, spacing, page content, branding, images, and colors are retained.
- No backend, persistence, localStorage, API, or new runtime dependency was added.
- Loading skeletons appear only when a route/page actually suspends; synchronous demo data does not show an artificial delay.

## Files
- `src/routes/__root.tsx`
- `src/components/eventops/route-loading-skeleton.tsx` (new)
- `src/components/ui/skeleton.tsx`
- `src/styles.css`
