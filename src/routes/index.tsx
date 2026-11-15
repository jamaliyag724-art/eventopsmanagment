import { createFileRoute } from "@tanstack/react-router";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
import { PublicHome } from "@/components/eventops/public-site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Utsav | From Vision to Celebration",
      },
      {
        name: "description",
        content:
          "Utsav is an event operations management platform that brings event planning, teams, vendors, budgets and execution together in one workspace.",
      },
      {
        name: "author",
        content: "Utsav",
      },
      {
        property: "og:title",
        content: "Utsav | From Vision to Celebration",
      },
      {
        property: "og:description",
        content:
          "One workspace to plan, organize, execute and analyze every event.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: PublicHome,
});
