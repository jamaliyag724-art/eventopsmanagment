import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/eventops/legal-page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Utsav" },
      { name: "description", content: "Draft terms of service for the Utsav preview. Final terms require legal review before publication." },
      { property: "og:title", content: "Terms of Service | Utsav" },
      { property: "og:description", content: "Draft terms of service for the Utsav preview." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <LegalPage kind="terms" />,
});
