# Utsav Backend Phase 1 — TypeScript fixes

Apply this archive over the existing project root. It contains only the updated files and does not include or replace the rest of the project.

## Changes

- Use bracket notation for `process.env` access under `noPropertyAccessFromIndexSignature`.
- Preserve the concrete Better Auth type inferred from the Organization plugin so `activeOrganizationId` remains typed on sessions.
- Normalize Prisma `Decimal` and `Date` values to strings at the server-function boundary.
- Use explicit `null` for nullable Prisma Event columns instead of passing `undefined` under `exactOptionalPropertyTypes`.
- Use Nitro's Vercel preset without the unsupported `vercel` nested config key.
- Upgrade direct Zod dependency to 4.6.7, the patched release line for GHSA-mrhx-c7xc-m3w5. The current source uses only APIs compatible with Zod 4.

## Apply and verify

```bash
unzip -o ~/Downloads/utsav-phase1-typecheck-fixes.zip -d .
npm install --legacy-peer-deps
npm run db:generate
npm run db:validate
npm run typecheck
npm run test -- --run
npm run build
```

Regenerate and commit `package-lock.json` after `npm install`.

## Security note

The current `picomatch` ReDoS advisory covers versions through 4.0.7. No upstream fixed version was listed when this patch was prepared. Do not use `npm audit fix --force` or an arbitrary `overrides` entry to force a downgrade/unknown package version. Re-run `npm audit --omit=dev` after applying the patch and re-check the advisory when an upstream release is available.
