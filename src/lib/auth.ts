import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { organization } from "better-auth/plugins";
import { getPrisma } from "@/lib/db";
import { organizationAccess, organizationRoles } from "@/lib/permissions";

function getAuthBaseUrl(): string {
  const configuredUrl = process.env["BETTER_AUTH_URL"];

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  const vercelUrl = process.env["VERCEL_URL"];

  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return "http://localhost:8080";
}

function getAuthSecret(): string {
  const secret = process.env["BETTER_AUTH_SECRET"];

  if (!secret || secret.length < 32) {
    throw new Error(
      "BETTER_AUTH_SECRET must be configured and contain at least 32 characters. Generate one with: openssl rand -base64 32",
    );
  }

  return secret;
}

function getTrustedOrigins(baseURL: string): string[] {
  const trustedOrigins = new Set<string>([baseURL]);

  // Local development origins. The app is currently served on port 8080.
  // Keep 5173 as an allowed origin too in case the Vite dev server is used directly.
  if (process.env["NODE_ENV"] !== "production") {
    trustedOrigins.add("http://localhost:8080");
    trustedOrigins.add("http://127.0.0.1:8080");
    trustedOrigins.add("http://localhost:5173");
    trustedOrigins.add("http://127.0.0.1:5173");
  }

  const vercelUrl = process.env["VERCEL_URL"];

  if (vercelUrl) {
    trustedOrigins.add(`https://${vercelUrl}`);
  }

  return [...trustedOrigins];
}

function createUtsavAuth() {
  const baseURL = getAuthBaseUrl();

  return betterAuth({
    appName: "Utsav",
    baseURL,
    basePath: "/api/auth",
    secret: getAuthSecret(),
    database: prismaAdapter(getPrisma(), { provider: "postgresql" }),
    trustedOrigins: getTrustedOrigins(baseURL),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 12,
      maxPasswordLength: 128,
      requireEmailVerification: false,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    plugins: [
      organization({
        ac: organizationAccess,
        roles: organizationRoles,
        allowUserToCreateOrganization: true,
      }),
      // Keep this last: Better Auth delegates cookie writes to TanStack Start.
      tanstackStartCookies(),
    ],
  });
}

// Keep the concrete Better Auth type (including Organization plugin session
// fields) instead of widening it to ReturnType<typeof betterAuth>.
type UtsavAuth = ReturnType<typeof createUtsavAuth>;
let authInstance: UtsavAuth | undefined;

export function getAuth(): UtsavAuth {
  if (!authInstance) {
    authInstance = createUtsavAuth();
  }

  return authInstance;
}
