import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCurrentUser } from "@/lib/auth.functions";
import { AppShell } from "@/components/eventops/app-shell";
import { modules } from "@/components/eventops/data";

export const Route = createFileRoute("/app/$module")({
  beforeLoad: async () => {
    const user = await getCurrentUser();
    if (!user) throw redirect({ to: "/login" });
    if (!user.activeOrganizationId) throw redirect({ to: "/signup" });
    return { currentUser: user };
  },
  head: ({ params }) => {
    const module = modules.find((item) => item.slug === params.module);
    const title = `${module?.label ?? "Workspace"} | Utsav`;
    const description = `Manage ${module?.label.toLowerCase() ?? "event operations"} in your Utsav workspace.`;
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: ModuleRoute,
});

function ModuleRoute() {
  const { module } = Route.useParams();
  return <AppShell module={module} />;
}