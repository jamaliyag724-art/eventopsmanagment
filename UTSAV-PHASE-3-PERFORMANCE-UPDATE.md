# Utsav Phase 3 — Image Performance & Motion Update

## Completed source changes

### Image performance
- Replaced the two remote Wikimedia event-card image URLs with bundled local assets.
- Replaced public-site Unsplash photo URLs and stale remote photo references in the dormant alternate shell with bundled local WebP files.
- Added local WebP assets for conference, wedding, Navratri/Garba, Diwali leadership gathering, festival-stage/college-fest, exhibition, and venue imagery.
- Added `fetchPriority="high"` for eager event images and `auto` for lazy images.
- Added intrinsic image dimensions, responsive `sizes`, and async decoding to the shared event image component.
- Kept first visible dashboard/event cards eager-loaded; below-the-fold cards remain lazy-loaded.
- Kept skeleton visibility until the image load event; failed image requests show an accessible fallback.

### Motion & loading
- Kept the existing route Suspense fallback and skeleton component.
- Kept the shimmer skeleton system and reduced-motion handling.
- Route stage now uses opacity-only fade so it does not create a transformed ancestor around fixed/sticky workspace UI.
- Page `<main>` retains the small fade/vertical entrance; existing staggered card and interaction motion is preserved.
- No artificial loading delays were added.

## Local image size comparison

| Asset | Original | WebP | Reduction |
|---|---:|---:|---:|
| Conference | 92,140 B | 49,422 B | 46.4% |
| Wedding | 124,482 B | 75,228 B | 39.6% |
| Navratri/Garba | 353,402 B | 232,912 B | 34.1% |
| Exhibition | 97,178 B | 51,298 B | 47.2% |
| Festival stage / College Fest | 123,282 B | 76,548 B | 37.9% |
| Diwali leadership gathering (generated PNG source) | 2,421,882 B | 161,808 B | 93.3% |
| Venue/gala | 206,394 B | 117,200 B | 43.2% |

These are file-size comparisons on the local image assets, not measured browser network timings. The updated event-card and public-site image paths are local, which removes those external photo-host round trips.

## Source-level validation performed
- Parsed 90 TypeScript/TSX source files with the installed TypeScript parser: zero syntax diagnostics.
- Confirmed dashboard event and public-site photo maps contain no Unsplash or Wikimedia photo URLs.
- Confirmed all seven referenced local WebP assets exist.
- Confirmed eager image loading uses high fetch priority, image dimensions are declared, skeleton fallback and image-error fallback exist, and reduced-motion CSS remains present.
- Confirmed route root uses opacity-only fade; page content handles the vertical entrance.

## Not verified in this environment
This source ZIP excludes `node_modules`. A full TypeScript semantic check, Vite production build, and browser timing measurement were not run in this environment. Please run the commands below in the existing local project before considering the phase closed:

```bash
npx tsc --noEmit
npm run build
npm run dev
```

Then inspect `/`, `/app/overview`, and `/app/events` in the browser. The project layout, palette, typography, and spacing have not been redesigned.
