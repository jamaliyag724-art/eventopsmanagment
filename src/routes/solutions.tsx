import { createFileRoute } from "@tanstack/react-router";
import { PublicContentPage } from "@/components/eventops/public-site";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Event Operations Solutions | Utsav" },
      { name: "description", content: "Utsav workflows for production teams, in-house event teams, experiential agencies, venues, and partners." },
      { property: "og:title", content: "Event Operations Solutions | Utsav" },
      { property: "og:description", content: "A more connected way for event teams and partners to work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PublicContentPage page="solutions" />,
});
