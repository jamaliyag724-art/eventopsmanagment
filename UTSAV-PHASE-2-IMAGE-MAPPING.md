# Utsav Phase 2 — Event-specific image mapping

- Added a distinct project-local Navratri/Garba image.
- Added dedicated Diwali and College Festival Wikimedia Commons image sources.
- Seeded events now carry per-event `coverImageKey` values so a Diwali corporate summit can use Diwali imagery without changing the public event type.
- Dashboard upcoming-event cards, Events grid, and Events detail dialog all use the same `getEventCoverImage` helper.
- New events select a default image by event type.
- Existing layout, card geometry, copy, filters, and navigation are unchanged.
- Image attribution and source license details are documented in `public/IMAGE-CREDITS.md`.
