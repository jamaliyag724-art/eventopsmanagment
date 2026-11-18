import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/eventops/app-shell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Platform Administration | Utsav" },
    { name: "description", content: "Review organizations, subscriptions, users, and platform activity in the Utsav demo administration area." },
    { property: "og:title", content: "Platform Administration | Utsav" },
    { property: "og:description", content: "A platform-wide overview for Utsav administrators." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <AppShell admin />,
});