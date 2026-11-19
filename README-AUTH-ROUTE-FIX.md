# Utsav — Better Auth catch-all route fix

The generated `src/routeTree.gen.ts` already imports `./routes/api/auth/$`, but the actual route module was missing. This patch adds the TanStack Start server route that forwards GET and POST requests to Better Auth.

## Apply

From the project root:

```bash
unzip -o ~/Downloads/utsav-auth-route-fix.zip -d .
npm run typecheck
npm run test -- --run
```

Do not hand-edit `src/routeTree.gen.ts`. The file already references this route; TanStack Router can regenerate it from the new route module.

## Vercel build check

The pasted build was run locally without the Vercel environment flag, so the wrapper used its local Cloudflare Nitro preset. That alone does not prove the Vercel deployment is misconfigured. Simulate Vercel's build environment locally:

```bash
VERCEL=1 npm run build
```

Confirm the Nitro log says `preset: vercel`. Vercel sets `VERCEL=1` automatically for its build environment. If it still says `cloudflare-module`, stop and inspect the wrapper/Nitro configuration before deploying.
