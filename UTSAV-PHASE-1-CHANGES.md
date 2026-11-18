# Utsav Phase 1 — Event Image Mapping

## What changed
- Fixed the event image lookup in `src/components/eventops/app-shell.tsx`.
- The old image keys (`Gala dinner`, `Public festival`, etc.) did not match the actual event types in `data.ts`, so most cards fell back to the conference image.
- Both the dashboard's Upcoming events cards and the Events page now use the event's actual `type` to select a local image.

## Current mapping
- Conference → `/utsav-conference.jpg`
- Wedding → `/utsav-wedding.jpg`
- Festival → `/utsav-festival.jpg`
- College festival → `/utsav-festival.jpg`
- Corporate event → `/utsav-exhibition.jpg`

No layout, styling, backend, persistence, or dependency changes were made.

## Note
This phase uses the four Indian event images already present in `public/`. A distinct Garba/Navratri-specific and Diwali-specific photo asset is still a separate visual asset task; those are not fabricated by renaming existing images.
