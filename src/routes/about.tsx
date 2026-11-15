import { createFileRoute } from "@tanstack/react-router";
import { PublicContentPage } from "@/components/eventops/public-site";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About EventOps | Made for Event People" },
    { name: "description", content: "Learn about EventOps and the belief that event operations deserve thoughtful, connected tools." },
    { property: "og:title", content: "About EventOps | Made for Event People" },
    { property: "og:description", content: "Thoughtful tools for the teams behind remarkable events." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <PublicContentPage page="about" />,
});