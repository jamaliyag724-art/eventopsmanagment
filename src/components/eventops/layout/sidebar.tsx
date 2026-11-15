import type { Dispatch, SetStateAction } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft, ChevronRight, ChevronsUpDown, CircleHelp, ShieldCheck, Sparkles, X,
} from "lucide-react";
import { toast } from "sonner";
import { modules } from "../data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SidebarProps = {
  module: string;
  admin: boolean;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  org: string;
  setOrg: Dispatch<SetStateAction<string>>;
};

export function Sidebar({ module, admin, collapsed, setCollapsed, mobileOpen, setMobileOpen, org, setOrg }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-foreground/30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`app-sidebar fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-sidebar transition-[width,transform] duration-200 ${
          collapsed ? "w-[76px]" : "w-[264px]"
        } ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-sidebar-border px-5">
          <Link
            to="/"
            className="flex items-center gap-3 overflow-hidden"
            aria-label="EventOps home"
          >
            <span className="brand-mark grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">e.</span>
            </span>
            {!collapsed && (
              <span className="text-[18px] font-semibold tracking-[-0.3px]">
                eventops
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="hidden h-8 w-8 md:inline-flex"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={
              collapsed ? "Expand navigation" : "Collapse navigation"
            }
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {!collapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="mx-3 mt-4 flex items-center gap-3 rounded-md border border-sidebar-border bg-background/60 p-2.5 text-left hover:bg-sidebar-accent">
                <span className="grid h-8 w-8 place-items-center rounded-sm bg-secondary text-xs font-semibold">
                  ME
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold">
                    {org}
                  </span>
                  <span className="block text-[11px] text-muted-foreground">
                    Studio plan
                  </span>
                </span>
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Organizations</DropdownMenuLabel>
              {[
                "Morrow Events",
                "Northstar Collective",
                "Common Ground Co.",
              ].map((name) => (
                <DropdownMenuItem
                  key={name}
                  onClick={() => setOrg(name)}
                >
                  {name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  toast.success("Organization settings opened")
                }
              >
                Manage organizations
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <nav
          aria-label="Workspace navigation"
          className="flex-1 overflow-y-auto px-3 py-5"
        >
          {!collapsed && (
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Workspace
            </p>
          )}

          <div className="space-y-1">
            {modules.map(({ label, slug, icon: Icon }) => {
              const active = module === slug && !admin;

              return (
                <Link
                  key={slug}
                  to="/app/$module"
                  params={{ module: slug }}
                  onClick={() => setMobileOpen(false)}
                  title={collapsed ? label : undefined}
                  className={`group flex h-10 items-center gap-3 rounded-md px-3 text-[13px] transition-colors ${
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <Icon className="h-[17px] w-[17px] shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{label}</span>
                      {slug === "live-operations" && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 border-t border-sidebar-border pt-4">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Administration
              </p>
            )}

            <Link
              to="/admin"
              title={collapsed ? "Platform administration" : undefined}
              className={`flex h-10 items-center gap-3 rounded-md px-3 text-[13px] ${
                admin
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <ShieldCheck className="h-[17px] w-[17px] shrink-0" />
              {!collapsed && <span>Platform admin</span>}
            </Link>
          </div>
        </nav>

        <div className="border-t border-sidebar-border p-3">
          {!collapsed && (
            <div className="mb-3 rounded-md bg-sidebar-accent/70 p-3">
              <div className="flex items-center gap-2 text-[12px] font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Your season, in view
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                Your upcoming events, teams and deadlines in one place.
              </p>
            </div>
          )}

          <button
            onClick={() => toast.info("Help center opened")}
            className="flex h-9 w-full items-center gap-3 rounded-md px-3 text-[12px] text-muted-foreground hover:bg-sidebar-accent"
          >
            <CircleHelp className="h-4 w-4" />
            {!collapsed && "Help & support"}
          </button>
        </div>
      </aside>
    </>
  );
}
