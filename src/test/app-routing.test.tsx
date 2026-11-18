import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

function makeRouter() {
  return createRouter({ routeTree, context: { queryClient: new QueryClient() } });
}

describe("App routing", () => {
  it("matches the public homepage instead of the not-found route", () => {
    const router = makeRouter();
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).toBe("/");
  });

  it.each([
    "/",
    "/features",
    "/solutions",
    "/pricing",
    "/about",
    "/contact",
    "/login",
    "/signup",
    "/privacy",
    "/terms",
    "/cookies",
    "/admin",
    "/app",
  ])("matches public or shell route %s", (path) => {
    const router = makeRouter();
    const matches = router.matchRoutes(path);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each([
    "overview",
    "events",
    "planning",
    "workshops",
    "vendors",
    "finance",
    "workforce",
    "sponsors",
    "venues",
    "live-operations",
    "intelligence",
    "analytics",
    "documents",
    "settings",
  ])("matches workspace module %s", (module) => {
    const router = makeRouter();
    const matches = router.matchRoutes(`/app/${module}`);
    expect(matches.at(-1)?.routeId).toBe("/app/$module");
  });
});
