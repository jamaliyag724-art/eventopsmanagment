import { createFileRoute } from "@tanstack/react-router";
import { PublicContentPage } from "@/components/eventops/public-site";

export const Route = createFileRoute("/features")({
  head: () => ({ meta: [
    { title: "Event Operations Features | EventOps" },
    { name: "description", content: "Explore EventOps tools for event planning, budgets, tasks, vendors, workforce, resources, and live operations." },
    { property: "og:title", content: "Event Operations Features | EventOps" },
    { property: "og:description", content: "Thoughtful tools for every part of professional event operations." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <PublicContentPage page="features" />,
});