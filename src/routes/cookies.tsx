import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/eventops/legal-page";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | Utsav" },
      { name: "description", content: "Draft cookie information for the Utsav preview. Final policy requires legal review before publication." },
      { property: "og:title", content: "Cookie Policy | Utsav" },
      { property: "og:description", content: "Draft cookie information for the Utsav preview." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <LegalPage kind="cookies" />,
});
