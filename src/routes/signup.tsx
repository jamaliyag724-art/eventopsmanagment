import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/eventops/public-site";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [
    { title: "Create a Workspace | EventOps" },
    { name: "description", content: "Start exploring a sample EventOps workspace for your event team." },
    { property: "og:title", content: "Create a Workspace | EventOps" },
    { property: "og:description", content: "Create a sample EventOps workspace experience." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <AuthPage signup />,
});