import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7 moved the datasource URL into this config file.
// The fallback allows `prisma generate` during install/build before a database
// has been provisioned. Migrations still require a real DIRECT_URL or DATABASE_URL.
const migrationDatabaseUrl =
  process.env["DIRECT_URL"] ??
  process.env["DATABASE_URL"] ??
  "postgresql://not-configured:not-configured@127.0.0.1:5432/utsav?schema=public";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: migrationDatabaseUrl,
  },
});
