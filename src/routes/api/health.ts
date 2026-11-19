import { createFileRoute } from "@tanstack/react-router";
import { getPrisma } from "@/lib/db";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await getPrisma().$queryRaw`SELECT 1`;
          return Response.json({ status: "ok", database: "connected" });
        } catch (error) {
          console.error("Utsav health check failed", error);
          return Response.json(
            { status: "degraded", database: "unavailable" },
            { status: 503 },
          );
        }
      },
    },
  },
});
