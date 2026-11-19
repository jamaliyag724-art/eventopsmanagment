import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCurrentUser } from "@/lib/auth.functions";
import { AppShell } from "@/components/eventops/app-shell";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const user = await getCurrentUser();
    if (!user) throw redirect({ to: "/login" });
    if (user.platformRole !== "PLATFORM_ADMIN") throw redirect({ to: "/app" });
    return { currentUser: user };
  },
  head: () => ({ meta: [
    { title: "Platform Administration | Utsav" },
    { name: "description", content: "Review organizations, subscriptions, users, and platform activity in the Utsav demo administration area." },
    { property: "og:title", content: "Platform Administration | Utsav" },
    { property: "og:description", content: "A platform-wide overview for Utsav administrators." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <AppShell admin />,
});