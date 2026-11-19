// @lovable.dev/vite-tanstack-config already installs the TanStack, React, Tailwind,
// path-alias, and Nitro plugins. Do not register duplicate plugins here.
// Vercel builds must override the wrapper's default Cloudflare preset so the
// Prisma PostgreSQL TCP adapter runs in a Node.js Vercel Function.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercelBuild = process.env["VERCEL"] === "1" || Boolean(process.env["VERCEL_URL"]);

export default defineConfig({
  // The wrapper's local/Lovable default is Cloudflare. Vercel must build
  // Node.js functions so Prisma's PostgreSQL TCP adapter can run safely.
  // Nitro detects Vercel automatically; the explicit preset keeps local CI
  // configuration deterministic without relying on unsupported wrapper keys.
  nitro: isVercelBuild ? { preset: "vercel" } : true,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
