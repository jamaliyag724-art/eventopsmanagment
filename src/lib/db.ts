import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  utsavPrisma?: PrismaClient;
};

/**
 * Lazily create one Prisma client per warm Vercel function instance.
 * Use a pooled PostgreSQL URL for DATABASE_URL to avoid exhausting database
 * connections as Vercel scales function instances horizontally.
 */
export function getPrisma(): PrismaClient {
  if (globalForPrisma.utsavPrisma) return globalForPrisma.utsavPrisma;

  const connectionString = process.env["DATABASE_URL"];
  if (!connectionString) {
    throw new Error("DATABASE_URL is missing. Configure it in Vercel Environment Variables and local .env.");
  }

  const adapter = new PrismaPg({
    connectionString,
    max: 1,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 30_000,
  });

  globalForPrisma.utsavPrisma = new PrismaClient({ adapter });
  return globalForPrisma.utsavPrisma;
}
