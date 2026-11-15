import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/eventops/app-shell";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "EventOps Workspace | Overview" },
      { name: "description", content: "A clear operational view of events, budgets, tasks, and teams in the EventOps workspace." },
      { property: "og:title", content: "EventOps Workspace | Overview" },
      { property: "og:description", content: "A clear operational view of events, budgets, tasks, and teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <AppShell />,
});