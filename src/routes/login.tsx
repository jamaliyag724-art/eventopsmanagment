import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/eventops/public-site";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In | Utsav" },
      { name: "description", content: "Enter the Utsav sample workspace experience." },
      { property: "og:title", content: "Sign In | Utsav" },
      { property: "og:description", content: "Continue to the Utsav workspace preview." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <AuthPage />,
});
