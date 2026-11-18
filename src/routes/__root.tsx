import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { RouteLoadingSkeleton } from "@/components/eventops/route-loading-skeleton";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      { title: "Utsav | From Vision to Celebration" },

      {
        name: "description",
        content:
          "Utsav is an event operations management platform that brings event planning, teams, vendors, budgets and execution together in one workspace.",
      },

      { name: "author", content: "Utsav" },

      {
        property: "og:title",
        content: "Utsav | From Vision to Celebration",
      },
      {
        property: "og:description",
        content:
          "One workspace to plan, organize, execute and analyze every event.",
      },
      { property: "og:type", content: "website" },

      { name: "twitter:card", content: "summary_large_image" },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap",
      },
      {
        rel: "icon",
        href: "/utsav-hindi-favicon.svg",
        type: "image/svg+xml",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function PublicStartupExperience() {
  const [stage, setStage] = useState<"visible" | "leaving" | "hidden">("visible");

  useEffect(() => {
    const startedAt = window.performance.now();
    let completed = false;
    let exitTimer = 0;
    let fallbackTimer = 0;

    const finish = () => {
      if (completed) return;
      completed = true;
      window.clearTimeout(fallbackTimer);
      const minimumTimeLeft = Math.max(0, 560 - (window.performance.now() - startedAt));
      exitTimer = window.setTimeout(() => setStage("leaving"), minimumTimeLeft);
    };

    // Wait for the first hero image and the current font set, but never hold
    // the visitor behind the curtain for more than 1.25 seconds.
    const heroImage = document.querySelector<HTMLImageElement>("[data-utsav-hero]");
    const imageReady = heroImage?.decode ? heroImage.decode().catch(() => undefined) : Promise.resolve();
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fallbackTimer = window.setTimeout(finish, 1250);
    void Promise.allSettled([imageReady, fontsReady]).then(finish);

    return () => {
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(exitTimer);
    };
  }, []);

  useEffect(() => {
    if (stage !== "leaving") return;
    const timer = window.setTimeout(() => setStage("hidden"), 420);
    return () => window.clearTimeout(timer);
  }, [stage]);

  if (stage === "hidden") return null;

  return (
    <div className={`utsav-startup-screen${stage === "leaving" ? " is-leaving" : ""}`} role="status" aria-label="Loading Utsav">
      <div className="utsav-startup-content">
        <div className="utsav-startup-emblem" aria-hidden="true">
          <span className="utsav-startup-orbit utsav-startup-orbit-one" />
          <span className="utsav-startup-orbit utsav-startup-orbit-two" />
          <span className="utsav-startup-center">उ</span>
        </div>
        <img src="/utsav-horizontal-logo-navbar.svg" alt="Utsav" className="utsav-startup-logo" width="230" height="58" />
        <p className="utsav-startup-tagline">From vision to celebration</p>
        <div className="utsav-startup-progress" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const workspaceRoute =
    pathname.startsWith("/app") || pathname.startsWith("/admin");
  const publicRoute = ["/", "/features", "/solutions", "/pricing", "/about", "/contact", "/login", "/signup", "/privacy", "/terms", "/cookies"].includes(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <div key={pathname} className={`utsav-route-stage${publicRoute ? " utsav-public-route-stage" : ""}`}>
        <Suspense
          fallback={<RouteLoadingSkeleton workspace={workspaceRoute} />}
        >
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </Suspense>
      </div>
      {publicRoute && <PublicStartupExperience />}
      <Toaster />
    </QueryClientProvider>
  );
}
