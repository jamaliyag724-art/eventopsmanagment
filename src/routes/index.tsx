import { createFileRoute } from "@tanstack/react-router";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
import { PublicHome } from "@/components/eventops/public-site";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "EventOps | Make Room for the Moments That Matter" },
    { name: "description", content: "A thoughtful operations workspace for teams planning, producing, and delivering remarkable events." },
    { property: "og:title", content: "EventOps | Make Room for the Moments That Matter" },
    { property: "og:description", content: "One thoughtful workspace for planning the work behind every remarkable event." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PublicHome,
});
