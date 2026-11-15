import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/eventops/public-site";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact EventOps | Let's Talk Events" },
    { name: "description", content: "Tell the EventOps team about your organization and the events you coordinate." },
    { property: "og:title", content: "Contact EventOps | Let's Talk Events" },
    { property: "og:description", content: "Start a conversation about your event operations." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ContactPage,
});