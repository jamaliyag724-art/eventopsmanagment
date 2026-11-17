import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/eventops/public-site";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create a Workspace | Utsav" },
      { name: "description", content: "Start exploring a sample Utsav workspace for your event team." },
      { property: "og:title", content: "Create a Workspace | Utsav" },
      { property: "og:description", content: "Create a sample Utsav workspace experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <AuthPage signup />,
});
