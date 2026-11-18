# Utsav Public Website Experience Update

This update is scoped to the public-facing website and sign-in pages. The authenticated workspace and Admin Panel layout are not changed.

## Public experience changes
- Added a first-visit welcome dialog inspired by the interaction pattern in the Veloria reference: dark backdrop, centered welcome panel, and two clear actions.
- Added an original CSS/SVG rangoli-inspired mark with subtle dandiya movement. No audio autoplay and no microphone permission are requested.
- The welcome dialog is shown once per browser tab session using `sessionStorage` only for the intro dismissal; it is not used for app data or backend persistence.
- Added bilingual Hindi/English headlines and a Playfair Display + Noto Sans Devanagari display stack; Manrope remains the body font.
- Added scroll-reveal motion across homepage, Platform, Solutions, About, Pricing, Contact, Login/Signup and legal content, with reduced-motion support.
- Added a Partner Ecosystem section listing partner categories (venues, production/AV, hospitality, travel/logistics, sponsors/brands).
- Added footer service coverage: “India · Nationwide”, plus partnership enquiries.

## Honesty about location and sponsor information
- “India · Nationwide” describes intended service coverage, not a verified office address.
- No named sponsor brands or approved sponsor logos were supplied in the source. The website therefore shows partner categories, not invented sponsor endorsements. Replace/add named logos only after the actual sponsors approve their use.

## Files changed
- `src/components/eventops/public-site.tsx`
- `src/components/eventops/legal-page.tsx`
- `src/routes/__root.tsx`
- `src/styles.css`

## Verification
- TypeScript transpile/syntax diagnostics: passed for all three changed TSX files.
- Full application typecheck and production build: not run in this isolated editing environment because the uploaded source archive does not include `node_modules`. Run locally:

```bash
npx tsc --noEmit
npm run build
npm run dev
```
