import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { organization } from "better-auth/plugins";
import { getPrisma } from "@/lib/db";
import { organizationAccess, organizationRoles } from "@/lib/permissions";

function getAuthBaseUrl(): string {
  const configuredUrl = process.env["BETTER_AUTH_URL"];
  if (configuredUrl) return configuredUrl;

  const vercelUrl = process.env["VERCEL_URL"];
  if (vercelUrl) return `https://${vercelUrl}`;
  return "http://localhost:5173";
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

function createUtsavAuth() {
  const baseURL = getAuthBaseUrl();
  const trustedOrigins = new Set([baseURL]);
  const vercelUrl = process.env["VERCEL_URL"];
  if (vercelUrl) trustedOrigins.add(`https://${vercelUrl}`);

  return betterAuth({
    appName: "Utsav",
    baseURL,
    basePath: "/api/auth",
    secret: getAuthSecret(),
    database: prismaAdapter(getPrisma(), { provider: "postgresql" }),
    trustedOrigins: [...trustedOrigins],
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
  if (!authInstance) authInstance = createUtsavAuth();
  return authInstance;
}
