import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/eventops/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Utsav" },
      { name: "description", content: "Draft privacy information for the Utsav preview. Final policy requires legal review before publication." },
      { property: "og:title", content: "Privacy Policy | Utsav" },
      { property: "og:description", content: "Draft privacy information for the Utsav preview." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <LegalPage kind="privacy" />,
});
