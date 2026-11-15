import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/eventops/public-site";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Sign In | EventOps" },
    { name: "description", content: "Enter the EventOps sample workspace experience." },
    { property: "og:title", content: "Sign In | EventOps" },
    { property: "og:description", content: "Continue to the EventOps workspace demo." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <AuthPage />,
});