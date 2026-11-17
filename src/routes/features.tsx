import { createFileRoute } from "@tanstack/react-router";
import { PublicContentPage } from "@/components/eventops/public-site";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Event Operations Features | Utsav" },
      { name: "description", content: "Explore Utsav tools for event planning, budgets, tasks, vendors, workforce, resources, and live operations." },
      { property: "og:title", content: "Event Operations Features | Utsav" },
      { property: "og:description", content: "Thoughtful tools for every part of professional event operations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PublicContentPage page="features" />,
});
