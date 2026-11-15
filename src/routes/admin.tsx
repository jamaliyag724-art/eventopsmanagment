import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/eventops/app-shell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Platform Administration | EventOps" },
    { name: "description", content: "Review organizations, subscriptions, users, and platform activity in the EventOps demo administration area." },
    { property: "og:title", content: "Platform Administration | EventOps" },
    { property: "og:description", content: "A platform-wide overview for EventOps administrators." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <AppShell admin />,
});