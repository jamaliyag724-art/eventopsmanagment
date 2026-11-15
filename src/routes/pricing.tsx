import { createFileRoute } from "@tanstack/react-router";
import { PricingPage } from "@/components/eventops/public-site";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [
    { title: "Pricing Plans for Event Teams | EventOps" },
    { name: "description", content: "Explore clear EventOps plans for teams coordinating professional events. Sample pricing shown for demonstration." },
    { property: "og:title", content: "Pricing Plans for Event Teams | EventOps" },
    { property: "og:description", content: "Clear plans for teams of every shape and stage." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PricingPage,
});