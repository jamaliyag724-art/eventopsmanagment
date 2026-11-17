
import { useState } from "react";
import type { ElementType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Clock3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleHelp,
  ClipboardList,
  MapPin,
  Menu,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import {
  modules,
  events,
  tasks,
  vendors,
  activities,
  budgetSeries,
  moduleDescriptions,
} from "./data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export function AppShell({
  module = "overview",
  admin = false,
}: {
  module?: string;
  admin?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [org, setOrg] = useState("Morrow Events");

  const current = admin
    ? { label: "Platform Overview", slug: "admin", icon: ShieldCheck }
    : modules.find((item) => item.slug === module);

  const title = current?.label ?? "Overview";

  return (
    <div className="app-frame min-h-screen bg-background text-foreground">
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

      <div
        className={`min-h-screen transition-[margin] duration-200 ${
          collapsed ? "md:ml-[76px]" : "md:ml-[264px]"
        }`}
      >
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-sm md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <span>Workspace</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{title}</span>
            </div>

            <div className="sm:hidden truncate text-sm font-semibold">
              {title}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <label className="relative hidden w-[min(32vw,270px)] md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search workspace"
                aria-label="Search workspace"
                className="h-9 pl-9 pr-12 text-xs"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border px-1 text-[9px] text-muted-foreground">
                ⌘ K
              </kbd>
            </label>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Search"
              onClick={() => {
                document.getElementById("mobile-search")?.focus();
              }}
            >
              <Search className="h-4 w-4" />
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                onClick={() => setNotificationsOpen((v) => !v)}
                className="relative"
              >
                <Bell className="h-[17px] w-[17px]" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
              </Button>

              {notificationsOpen && (
                <div className="absolute right-0 top-11 z-50 w-[min(340px,calc(100vw-32px))] rounded-md border border-border bg-popover p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                    <button
                      className="text-xs text-muted-foreground"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-4 space-y-3 text-xs">
                    <p className="border-l-2 border-primary pl-3 leading-relaxed">
                      <b>Budget review due</b>
                      <span className="block text-muted-foreground">
                        Common Ground Festival · 2 approvals await you
                      </span>
                    </p>
                    <p className="border-l-2 border-chart-2 pl-3 leading-relaxed">
                      <b>Vendor confirmed</b>
                      <span className="block text-muted-foreground">
                        Goodwood Forum · Gather & Grain
                      </span>
                    </p>
                    <p className="border-l-2 border-border pl-3 leading-relaxed">
                      <b>New floor plan uploaded</b>
                      <span className="block text-muted-foreground">
                        Goodwood Forum · 2 hours ago
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 gap-2 px-1.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-[10px] font-semibold">
                    MC
                  </span>
                  <span className="hidden text-xs font-medium lg:block">
                    Maya Chen
                  </span>
                  <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground lg:block" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Maya Chen · Owner</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => toast.success("Profile opened")}
                >
                  My profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.success("Preferences opened")}
                >
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    toast.success("Sign-in is simulated in this prototype")
                  }
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <Input
          id="mobile-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search workspace"
          aria-label="Search workspace"
          className="m-4 w-[calc(100%-2rem)] md:hidden"
        />

        <main className="mx-auto w-full max-w-[1540px] px-4 pb-12 pt-7 md:px-8 md:pt-9">
          {admin ? (
            <AdminPage search={search} />
          ) : module === "overview" ? (
            <Overview search={search} />
          ) : (
            <ModulePage module={module} search={search} />
          )}
        </main>
      </div>
    </div>
  );
}

function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h1 className="text-[26px] font-semibold tracking-[-0.6px] md:text-[30px]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function Stat({
  label,
  value,
  delta,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  delta: string;
  icon: ElementType;
  tone?: string;
}) {
  return (
    <div className="min-w-0 border-l border-border pl-4 first:border-l-0 first:pl-0 md:pl-5">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <Icon
          className={`h-3.5 w-3.5 ${
            tone === "accent" ? "text-primary" : ""
          }`}
        />
        {label}
      </div>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <strong className="text-[22px] font-semibold tracking-[-0.5px]">
          {value}
        </strong>
        <span className="text-[10px] text-muted-foreground">{delta}</span>
      </div>
    </div>
  );
}

function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-[14px] font-semibold">{children}</h2>
      {action}
    </div>
  );
}

function parseEventDate(date: string) {
  // Demo dates are stored as values such as "Nov 19, 2026".
  return new Date(`${date} 00:00:00`);
}

function isUpcomingEvent(event: (typeof events)[number]) {
  const eventDate = parseEventDate(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today && event.status !== "Completed";
}

function formatToday() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

function Overview({ search }: { search: string }) {
  const [range, setRange] = useState("6 months");
  const upcomingEvents = events.filter(isUpcomingEvent);
  const filteredEvents = upcomingEvents.filter((event) =>
    `${event.name} ${event.type} ${event.venue}`.toLowerCase().includes(search.toLowerCase()),
  );
  const filteredActivity = activities.filter((item) =>
    `${item.who} ${item.action} ${item.event}`.toLowerCase().includes(search.toLowerCase()),
  );
  const eventImages: Record<string, string> = {
    "Goodwood Partner Forum": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85",
    "Common Ground Festival": "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
    "Morrow Annual Meeting": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
  };
  const featuredEvent = filteredEvents.find((event) => event.name === "Common Ground Festival") ?? filteredEvents[0];
  const stats = [
    { label: "Total events", value: String(events.length), note: "Across your portfolio", icon: CalendarDays, tone: "bg-[#f2e6dc] text-[#a95e3d]" },
    { label: "Upcoming events", value: String(upcomingEvents.length), note: "Scheduled ahead", icon: Clock3, tone: "bg-[#e7eee4] text-[#647c5b]" },
    { label: "Active tasks", value: String(tasks.filter((task) => task.status !== "Done").length), note: "Across sample tasks", icon: ClipboardList, tone: "bg-[#eee9df] text-[#8a7651]" },
    { label: "Portfolio budget", value: "$942k", note: "Allocated budget", icon: Wallet, tone: "bg-[#e9eaf0] text-[#66718b]" },
  ];

  return (
    <div className="space-y-8">
      <section className="relative isolate overflow-hidden rounded-2xl bg-[#252b27] text-white shadow-sm">
        {featuredEvent && <img src={eventImages[featuredEvent.name] ?? eventImages["Goodwood Partner Forum"]} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" />}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#202722] via-[#202722]/90 to-[#202722]/25" />
        <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d6b99e]"><span className="h-1.5 w-1.5 rounded-full bg-[#c78b68]" />{formatToday()} · Workspace overview</p>
            <h1 className="text-3xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-4xl">Good morning, Maya.<span className="mt-1 block font-normal text-white/75">Let's make every detail count.</span></h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-white/65">Your events, teams and priorities — together in one clear view.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3"><NewEventDialog /><Link to="/app/$module" params={{ module: "events" }} className="inline-flex h-9 items-center gap-2 rounded-md border border-white/25 px-3 text-xs font-medium text-white hover:bg-white/10">Explore events <ArrowUpRight className="h-3.5 w-3.5" /></Link></div>
          </div>
          {featuredEvent && <div className="rounded-xl border border-white/15 bg-black/20 p-4 backdrop-blur-sm lg:max-w-sm lg:justify-self-end"><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#e2c7ae]">In focus</span><Badge className="border-0 bg-white/15 text-white hover:bg-white/15">{featuredEvent.status}</Badge></div><h2 className="mt-3 text-lg font-semibold">{featuredEvent.name}</h2><div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-white/70"><span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{featuredEvent.date}</span><span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{featuredEvent.venue}</span></div><div className="mt-4 flex items-center justify-between text-[10px] text-white/65"><span>Planning progress</span><strong className="text-white">{featuredEvent.progress}%</strong></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-[#d6a17e]" style={{ width: `${featuredEvent.progress}%` }} /></div></div>}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, note, icon: Icon, tone }) => <div key={label} className="rounded-xl border border-border/80 bg-card p-4 shadow-[0_2px_12px_rgba(42,36,29,0.035)] transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-start justify-between gap-3"><div><p className="text-[11px] font-medium text-muted-foreground">{label}</p><p className="mt-3 text-[27px] font-semibold tracking-[-0.055em]">{value}</p><p className="mt-1 text-[10px] text-muted-foreground">{note}</p></div><span className={`grid h-9 w-9 place-items-center rounded-lg ${tone}`}><Icon className="h-4 w-4" /></span></div></div>)}
      </section>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
        <section className="min-w-0 space-y-6">
          <section className="rounded-xl border border-border/80 bg-card p-5 shadow-[0_2px_12px_rgba(42,36,29,0.035)] sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Your calendar</p><h2 className="mt-1 text-lg font-semibold tracking-tight">Upcoming events</h2></div><Link to="/app/$module" params={{ module: "events" }} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">View all events <ArrowUpRight className="h-3.5 w-3.5" /></Link></div>
            <div className="grid gap-4 md:grid-cols-2">
              {filteredEvents.slice(0, 4).map((event) => <article key={event.name} className="group overflow-hidden rounded-xl border border-border/80 bg-background transition hover:-translate-y-0.5 hover:shadow-md"><div className="relative h-36 overflow-hidden bg-secondary"><img src={eventImages[event.name] ?? eventImages["Goodwood Partner Forum"]} alt={`${event.type} event`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" /><span className="absolute bottom-3 left-3 rounded-md bg-black/35 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">{event.type}</span><div className="absolute right-3 top-3"><StatusBadge status={event.status} /></div></div><div className="p-4"><h3 className="truncate text-sm font-semibold">{event.name}</h3><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-muted-foreground"><span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" />{event.date}</span><span className="inline-flex min-w-0 items-center gap-1"><MapPin className="h-3 w-3 shrink-0" /><span className="truncate">{event.venue}</span></span></div><div className="mt-4 flex items-center justify-between text-[10px]"><span className="text-muted-foreground">Planning progress</span><strong>{event.progress}%</strong></div><Progress value={event.progress} className="mt-2 h-1.5" /></div></article>)}
              {filteredEvents.length === 0 && <p className="col-span-full rounded-lg bg-background px-4 py-10 text-center text-xs text-muted-foreground">No upcoming events match your search.</p>}
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-border/80 bg-card p-5 shadow-[0_2px_12px_rgba(42,36,29,0.035)]"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Financial pulse</p><h2 className="mt-1 text-base font-semibold">Budget utilization</h2></div><Select value={range} onValueChange={setRange}><SelectTrigger className="h-8 w-[112px] text-[10px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="6 months">6 months</SelectItem><SelectItem value="This year">This year</SelectItem><SelectItem value="This quarter">This quarter</SelectItem></SelectContent></Select></div><div className="mb-2 flex items-baseline gap-2"><strong className="text-3xl font-semibold tracking-tight">65%</strong><span className="text-[10px] text-muted-foreground">of allocated budget</span></div><div className="h-[185px] w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={budgetSeries} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}><defs><linearGradient id="planned-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.2} /><stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="var(--color-border)" vertical={false} /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: "var(--color-muted-foreground)" }} /><Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 11 }} /><Area type="monotone" dataKey="planned" name="Planned" stroke="var(--color-chart-3)" fill="url(#planned-fill)" strokeWidth={1.8} /><Area type="monotone" dataKey="actual" name="Actual" stroke="var(--color-primary)" fill="transparent" strokeWidth={2.2} /></AreaChart></ResponsiveContainer></div><div className="mt-2 flex gap-4 text-[10px] text-muted-foreground"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-chart-3" />Planned</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-primary" />Actual</span></div></section>
            <section className="rounded-xl border border-border/80 bg-card p-5 shadow-[0_2px_12px_rgba(42,36,29,0.035)]"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Team execution</p><h2 className="mt-1 text-base font-semibold">Task completion</h2><div className="mt-5 flex items-end justify-between"><div><strong className="text-3xl font-semibold tracking-tight">78%</strong><p className="mt-1 text-[10px] text-muted-foreground">of tasks on track</p></div><span className="text-[10px] text-muted-foreground">486 total tasks</span></div><div className="mt-6 flex h-3 w-full overflow-hidden rounded-full bg-secondary"><span className="bg-primary" style={{ width: "55%" }} /><span className="bg-chart-2" style={{ width: "23%" }} /><span className="bg-muted-foreground/25" style={{ width: "17%" }} /><span className="bg-chart-4" style={{ width: "5%" }} /></div><div className="mt-5 space-y-3 text-[11px]">{[["Complete", "267", "bg-primary"], ["In progress", "112", "bg-chart-2"], ["To do", "83", "bg-muted-foreground/25"], ["At risk", "24", "bg-chart-4"]].map(([label, count, color]) => <div key={label} className="flex items-center gap-2"><i className={`h-2 w-2 rounded-full ${color}`} /><span className="text-muted-foreground">{label}</span><strong className="ml-auto font-semibold">{count}</strong></div>)}</div></section>
          </div>
        </section>

        <aside className="grid content-start gap-6 sm:grid-cols-2 2xl:grid-cols-1">
          <section className="rounded-xl border border-border/80 bg-card p-5 shadow-[0_2px_12px_rgba(42,36,29,0.035)]"><div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Team pulse</p><h2 className="mt-1 text-base font-semibold">Recent activity</h2></div><button onClick={() => toast.info("Showing all activity")} className="text-[10px] font-semibold text-primary hover:underline">View all</button></div><div className="space-y-4">{filteredActivity.map((item) => <div key={item.who + item.action} className="flex gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground">{item.initials}</span><div className="min-w-0 flex-1"><p className="text-[11px] leading-relaxed"><strong>{item.who}</strong> {item.action}</p><p className="mt-0.5 truncate text-[10px] text-muted-foreground">{item.event}</p><p className="mt-1 text-[9px] text-muted-foreground">{item.time}</p></div></div>)}{filteredActivity.length === 0 && <p className="py-5 text-center text-xs text-muted-foreground">No activity matches your search.</p>}</div></section>
          <section className="rounded-xl border border-border/80 bg-card p-5 shadow-[0_2px_12px_rgba(42,36,29,0.035)]"><div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Next on the list</p><h2 className="mt-1 text-base font-semibold">Coming up</h2></div><Link to="/app/$module" params={{ module: "planning" }} className="text-[10px] font-semibold text-primary hover:underline">Task list ↗</Link></div><div className="space-y-4">{tasks.filter((task) => task.status !== "Done").slice(0, 4).map((task) => <div key={task.title} className="flex gap-3"><span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md ${task.priority === "High" ? "bg-[#f4e5dc] text-[#a95e3d]" : "bg-secondary text-muted-foreground"}`}>{task.priority === "High" ? <Activity className="h-3 w-3" /> : <Clock3 className="h-3 w-3" />}</span><div className="min-w-0 flex-1"><p className="text-[11px] font-medium leading-snug">{task.title}</p><p className="mt-1 truncate text-[10px] text-muted-foreground">{task.event} · {task.owner}</p></div><span className="shrink-0 text-[9px] text-muted-foreground">{task.due}</span></div>)}</div></section>
          <section className="rounded-xl border border-[#e5cdbd] bg-[#f5eee7] p-5 sm:col-span-2 2xl:col-span-1 dark:border-border dark:bg-card"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#ead8c9] text-[#9b6042]"><Sparkles className="h-4 w-4" /></span><div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#95694f] dark:text-muted-foreground">Operations watch</p><h2 className="text-sm font-semibold text-[#3b342e] dark:text-foreground">Needs attention</h2></div><Badge variant="outline" className="ml-auto border-[#d8bda9] bg-white/50 text-[#89563d] dark:border-border dark:bg-secondary dark:text-foreground">3 open</Badge></div><div className="mt-4 space-y-2">{[["Budget approval requested", "Northstar Product Summit · Scenic", "Review"], ["Resource conflict detected", "Common Ground Festival · Main stage", "Resolve"], ["Insurance certificate expiring", "Goodway Guest Travel · Nov 28", "View"]].map(([title, detail, label]) => <button key={title} onClick={() => toast.info(`${label}: ${title}`)} className="flex w-full items-center gap-3 rounded-lg bg-white/65 p-3 text-left transition hover:bg-white dark:bg-secondary/50 dark:hover:bg-secondary"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f0dfd2] text-xs font-semibold text-[#9b6042]">!</span><span className="min-w-0 flex-1"><span className="block truncate text-[10px] font-semibold text-[#42372f] dark:text-foreground">{title}</span><span className="mt-0.5 block truncate text-[9px] text-[#8a7669] dark:text-muted-foreground">{detail}</span></span><span className="shrink-0 text-[9px] font-semibold text-[#9b6042] dark:text-primary">{label} →</span></button>)}</div></section>
        </aside>
      </div>
    </div>
  );
}

function AlertRow({
  title,
  detail,
  label,
}: {
  title: string;
  detail: string;
  label: string;
}) {
  return (
    <button
      className="flex w-full items-center gap-3 border-b border-border/70 py-3 text-left last:border-0"
      onClick={() => toast.info(`${label}: ${title}`)}
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-sm bg-accent text-primary">
        <span className="text-xs">!</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[11px] font-medium">{title}</span>
        <span className="block truncate text-[10px] text-muted-foreground">
          {detail}
        </span>
      </span>
      <span className="text-[10px] font-medium text-primary">
        {label} →
      </span>
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "At risk" || status === "Review due" || status === "Conflict"
      ? "destructive"
      : status === "Confirmed" ||
          status === "Preferred" ||
          status === "Done" ||
          status === "Completed" ||
          status === "Active" ||
          status === "Resolved" ||
          status === "Current"
        ? "secondary"
        : "outline";

  return (
    <Badge
      variant={variant}
      className="whitespace-nowrap rounded-[3px] px-1.5 py-0 text-[9px] font-medium"
    >
      {status}
    </Badge>
  );
}

function NewEventDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const create = () => {
    if (name.trim().length < 3 || !date) {
      toast.error("Add an event name and date to continue");
      return;
    }

    toast.success(`${name} added to your event list`);
    setName("");
    setDate("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-9 gap-2 rounded-sm px-3 text-xs">
          <Plus className="h-4 w-4" />
          New event
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[430px]">
        <DialogHeader>
          <DialogTitle>Create an event</DialogTitle>
          <DialogDescription>
            Start with the essentials. You can add a team, venue and budget
            later.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-3">
          <label className="grid gap-1.5 text-xs font-medium">
            Event name
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Winter partner summit"
              minLength={3}
            />
          </label>

          <label className="grid gap-1.5 text-xs font-medium">
            Event date
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label className="grid gap-1.5 text-xs font-medium">
            Event type
            <Select defaultValue="Conference">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Conference",
                  "Gala dinner",
                  "Festival",
                  "Company meeting",
                  "Partner forum",
                ].map((type) => (
                  <SelectItem value={type} key={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={create}>Create event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ModulePage({
  module,
  search,
}: {
  module: string;
  search: string;
}) {
  const [view, setView] = useState("List");
  const [filter, setFilter] = useState("All");
  const [taskState, setTaskState] = useState(
    tasks.map((task) => task.status),
  );

  const current = modules.find((item) => item.slug === module);

  if (!current) {
    return (
      <PageHeading
        title="Page not found"
        description="Choose a workspace module from the navigation."
      />
    );
  }

  const headingAction =
    module === "events" ? (
      <NewEventDialog />
    ) : (
      <Button
        className="h-9 gap-2 rounded-sm px-3 text-xs"
        onClick={() =>
          toast.success(
            `New ${current.label.toLowerCase().replace(/s$/, "")} started`,
          )
        }
      >
        <Plus className="h-4 w-4" />
        New{" "}
        {module === "planning"
          ? "task"
          : module === "vendors"
            ? "vendor"
            : "item"}
      </Button>
    );

  return (
    <>
      <PageHeading
        eyebrow="Morrow Events · Operations"
        title={current.label}
        description={
          moduleDescriptions[module] ?? "Keep the moving parts connected."
        }
        action={headingAction}
      />

      {module === "events" && (
        <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <Tabs value={view} onValueChange={setView}>
              <TabsList>
                <TabsTrigger value="List">List</TabsTrigger>
                <TabsTrigger value="Grid">Grid</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="h-9 w-36 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["All", "In planning", "Confirmed", "At risk", "Completed"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s} status
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-[11px] text-muted-foreground">
                {events.length} events
              </span>
            </div>
          </div>

          {view === "List" ? (
            <DataTable
              headers={[
                "Event",
                "Category",
                "Date",
                "Venue",
                "Status",
                "Budget",
              ]}
              rows={events
                .filter(
                  (event) =>
                    (filter === "All" || event.status === filter) &&
                    `${event.name} ${event.type} ${event.venue}`
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                )
                .map((event) => [
                  event.name,
                  event.type,
                  event.date,
                  event.venue,
                  event.status,
                  event.budget,
                ])}
            />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {events
                .filter(
                  (event) =>
                    (filter === "All" || event.status === filter) &&
                    `${event.name} ${event.type} ${event.venue}`
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                )
                .map((event, index) => (
                  <div
                    key={event.name}
                    className="overflow-hidden border border-border"
                  >
                    <div
                      className={`h-2 ${
                        index % 2 ? "bg-chart-2" : "bg-primary"
                      }`}
                    />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold">{event.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {event.type}
                          </p>
                        </div>
                        <StatusBadge status={event.status} />
                      </div>
                      <p className="mt-5 text-xs">{event.date}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {event.venue}
                      </p>
                      <div className="mt-5 flex items-center gap-2">
                        <Progress
                          value={event.progress}
                          className="h-1.5 flex-1"
                        />
                        <span className="text-[10px] text-muted-foreground">
                          {event.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}

      {module === "planning" && (
        <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <Tabs value={view} onValueChange={setView}>
              <TabsList>
                <TabsTrigger value="List">List</TabsTrigger>
                <TabsTrigger value="Board">Board</TabsTrigger>
                <TabsTrigger value="Calendar">Calendar</TabsTrigger>
              </TabsList>
            </Tabs>

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 w-36 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["All", "To do", "In progress", "Done"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s} tasks
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {view === "Board" ? (
            <div className="grid gap-4 md:grid-cols-3">
              {["To do", "In progress", "Done"].map((status) => (
                <section key={status} className="min-w-0">
                  <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
                    <h2 className="text-xs font-semibold">{status}</h2>
                    <Badge variant="secondary" className="h-5 text-[9px]">
                      {taskState.filter((s) => s === status).length}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {tasks.map(
                      (task, index) =>
                        taskState[index] === status &&
                        (filter === "All" || taskState[index] === filter) &&
                        `${task.title} ${task.event}`
                          .toLowerCase()
                          .includes(search.toLowerCase()) && (
                          <button
                            key={task.title}
                            onClick={() =>
                              setTaskState((prev) =>
                                prev.map((s, i) =>
                                  i === index
                                    ? s === "To do"
                                      ? "In progress"
                                      : s === "In progress"
                                        ? "Done"
                                        : "To do"
                                    : s,
                                ),
                              )
                            }
                            className="w-full border border-border bg-card p-3 text-left hover:border-primary/60"
                          >
                            <p className="text-xs font-medium">{task.title}</p>
                            <p className="mt-1.5 text-[10px] text-muted-foreground">
                              {task.event}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-[10px] text-muted-foreground">
                                {task.owner}
                              </span>
                              <StatusBadge status={task.priority} />
                            </div>
                          </button>
                        ),
                    )}
                  </div>
                </section>
              ))}
            </div>
          ) : view === "Calendar" ? (
            <div className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-4 lg:grid-cols-7">
              {[...Array(28)].map((_, i) => (
                <div
                  key={i}
                  className="min-h-24 border-b border-r border-border p-2"
                >
                  <span className="text-[10px] text-muted-foreground">
                    {i + 1}
                  </span>
                  {[4, 9, 15, 20, 24].includes(i) && (
                    <button
                      onClick={() => toast.info("Event details opened")}
                      className="mt-2 block w-full truncate rounded-sm bg-secondary px-1 py-1 text-left text-[9px] text-secondary-foreground"
                    >
                      {events[i % events.length]?.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <DataTable
              headers={[
                "Task",
                "Event",
                "Owner",
                "Due date",
                "Priority",
                "Status",
              ]}
              rows={tasks
                .map((task) => [
                  task.title,
                  task.event,
                  task.owner,
                  task.due,
                  task.priority,
                  task.status,
                ])
                .filter(
                  (row) =>
                    (filter === "All" || row[5] === filter) &&
                    row.join(" ").toLowerCase().includes(search.toLowerCase()),
                )}
            />
          )}
        </>
      )}

      {module === "vendors" && (
        <>
          <div className="mb-5 flex items-center justify-between">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 w-44 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "All",
                  "Catering",
                  "AV & Production",
                  "Floral & Decor",
                  "Transport",
                  "Photography",
                ].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-[11px] text-muted-foreground">
              {vendors.length} trusted partners
            </span>
          </div>

          <DataTable
            headers={[
              "Vendor",
              "Category",
              "Contact",
              "Rating",
              "Events",
              "Status",
            ]}
            rows={vendors
              .filter(
                (vendor) =>
                  (filter === "All" || vendor.category === filter) &&
                  `${vendor.name} ${vendor.category} ${vendor.contact}`
                    .toLowerCase()
                    .includes(search.toLowerCase()),
              )
              .map((v) => [
                v.name,
                v.category,
                v.contact,
                `★ ${v.rating}`,
                v.events,
                v.status,
              ])}
          />
        </>
      )}

      {module !== "events" &&
        module !== "planning" &&
        module !== "vendors" && (
          <GenericModule module={module} search={search} />
        )}
    </>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="w-full overflow-x-auto border-y border-border">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="bg-secondary/60">
            {headers.map((h) => (
              <th
                key={h}
                className="px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={`${row[0] ?? "row"}${i}`}
              className="border-t border-border/70 hover:bg-secondary/25"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-3 py-3.5 text-[11px] ${
                    j === 0
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {["Status", "Outcome", "Label"].includes(headers[j]) ? (
                    <StatusBadge status={cell} />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={headers.length}
                className="px-3 py-12 text-center text-xs text-muted-foreground"
              >
                Nothing matches your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const sampleRows: Record<
  string,
  {
    headers: string[];
    rows: string[][];
    summary: [string, string, string][];
  }
> = {
  finance: {
    headers: ["Category", "Event", "Budget", "Actual", "Variance", "Status"],
    rows: [
      ["Venue & site", "Northstar Product Summit", "$68,000", "$64,250", "-$3,750", "On track"],
      ["Production", "Northstar Product Summit", "$74,000", "$76,400", "+$2,400", "Review due"],
      ["Catering", "Fieldnotes Founders Dinner", "$24,500", "$19,800", "-$4,700", "On track"],
      ["Travel & transport", "Goodwood Partner Forum", "$18,000", "$12,650", "-$5,350", "On track"],
    ],
    summary: [
      ["Portfolio budget", "$942,000", "12 events"],
      ["Committed", "$614,320", "65% utilized"],
      ["Pending approval", "$18,400", "3 requests"],
    ],
  },
  workforce: {
    headers: ["Team member", "Department", "Assignment", "Next shift", "Availability", "Status"],
    rows: [
      ["Maya Chen", "Production", "Northstar Summit", "Oct 24 · 07:00", "Full time", "Assigned"],
      ["Alex Morgan", "Guest experience", "Founders Dinner", "Nov 08 · 12:00", "Full time", "Assigned"],
      ["Jordan Lee", "Technical", "Common Ground", "Dec 04 · 08:00", "Limited", "Review due"],
      ["Sam Rivera", "Partnerships", "Goodwood Forum", "Nov 18 · 10:00", "Full time", "Assigned"],
    ],
    summary: [
      ["Team members", "46", "Across 5 departments"],
      ["Shifts this week", "28", "4 events"],
      ["Open assignments", "6", "Need coverage"],
    ],
  },
  sponsors: {
    headers: ["Partner", "Package", "Event", "Commitment", "Deliverables", "Status"],
    rows: [
      ["Fallow & Field", "Presenting", "Northstar Summit", "$75,000", "8 of 10", "Active"],
      ["Meridian Bank", "Gold", "Northstar Summit", "$40,000", "5 of 6", "Active"],
      ["Common Table", "Community", "Founders Dinner", "$18,000", "4 of 4", "Complete"],
      ["Goodway Travel", "Supporting", "Goodwood Forum", "$22,500", "2 of 5", "Review due"],
    ],
    summary: [
      ["Active partners", "18", "Across all events"],
      ["Committed value", "$384,500", "This season"],
      ["Deliverables due", "7", "Next 14 days"],
    ],
  },
  venues: {
    headers: ["Venue / resource", "Type", "Capacity", "Event booking", "Date", "Status"],
    rows: [
      ["Pier 27", "Waterfront venue", "1,800", "Northstar Summit", "Oct 24", "Confirmed"],
      ["The Foundry", "Industrial venue", "240", "Founders Dinner", "Nov 08", "Confirmed"],
      ["Main stage · CG", "Production resource", "—", "Common Ground", "Dec 05", "Conflict"],
      ["The Glasshouse", "Conference venue", "620", "Morrow Annual Meeting", "Jan 16", "In planning"],
    ],
    summary: [
      ["Partner venues", "24", "Across 4 cities"],
      ["Resources tracked", "138", "Equipment & spaces"],
      ["Conflicts to resolve", "1", "Common Ground"],
    ],
  },
  "live-operations": {
    headers: ["Incident / operation", "Event", "Owner", "Updated", "Priority", "Status"],
    rows: [
      ["Stage power redundancy check", "Common Ground Festival", "Jordan Lee", "10 min ago", "High", "In progress"],
      ["Guest transport arrival window", "Northstar Summit", "Maya Chen", "28 min ago", "Medium", "Monitoring"],
      ["Final seating adjustment", "Founders Dinner", "Alex Morgan", "1 hr ago", "Low", "Resolved"],
    ],
    summary: [
      ["Live events", "2", "Operations active"],
      ["Open incidents", "3", "1 high priority"],
      ["Team check-ins", "86%", "On site"],
    ],
  },
  analytics: {
    headers: ["Event", "Attendance", "Budget variance", "Task completion", "Vendor rating", "Outcome"],
    rows: [
      ["Northstar Product Summit", "1,240 / 1,300", "-2.4%", "84%", "4.8 / 5", "On track"],
      ["Fieldnotes Founders Dinner", "186 / 200", "-5.8%", "72%", "4.9 / 5", "On track"],
      ["Goodwood Partner Forum", "320 / 320", "+1.2%", "96%", "4.7 / 5", "Complete"],
    ],
    summary: [
      ["Events delivered", "28", "This year"],
      ["Avg. budget variance", "-3.1%", "Under budget"],
      ["Guest satisfaction", "4.8 / 5", "Post-event average"],
    ],
  },
  documents: {
    headers: ["Document", "Category", "Event", "Owner", "Updated", "Status"],
    rows: [
      ["Northstar · Floor plan v4.pdf", "Production", "Northstar Summit", "Maya Chen", "Oct 14, 2026", "Current"],
      ["Catering agreement.pdf", "Contract", "Founders Dinner", "Alex Morgan", "Oct 13, 2026", "Review due"],
      ["Brand partner asset guide.docx", "Partnerships", "Goodwood Forum", "Sam Rivera", "Oct 12, 2026", "Current"],
      ["Safety & site plan.xlsx", "Operations", "Common Ground", "Jordan Lee", "Oct 11, 2026", "Current"],
    ],
    summary: [
      ["Documents", "246", "Across all events"],
      ["Awaiting review", "4", "Need your attention"],
      ["Recently added", "12", "This month"],
    ],
  },
  settings: {
    headers: ["Team member", "Role", "Department", "Last active", "Access", "Status"],
    rows: [
      ["Maya Chen", "Organization owner", "Leadership", "Just now", "Full access", "Active"],
      ["Alex Morgan", "Event manager", "Production", "12 min ago", "Events & finance", "Active"],
      ["Jordan Lee", "Operations lead", "Technical", "48 min ago", "Operations", "Active"],
      ["Sam Rivera", "Coordinator", "Partnerships", "2 hrs ago", "Events & sponsors", "Active"],
    ],
    summary: [
      ["Team members", "24", "3 pending invites"],
      ["Plan", "Studio", "$249 / month"],
      ["Renewal date", "Nov 01", "Card ending 4821"],
    ],
  },
  intelligence: {
    headers: ["Signal", "Event", "Context", "Suggested next step", "Confidence", "Label"],
    rows: [
      ["Production spend trending 8% over estimate", "Northstar Product Summit", "Scenic vendor revision · updated today", "Review the revised line items", "High", "Demo insight"],
      ["Task handoff may affect load-in", "Common Ground Festival", "3 dependencies due within 48 hours", "Confirm crew availability", "Medium", "Demo insight"],
      ["Venue hold expires this Friday", "Morrow Annual Meeting", "Glasshouse · 620 guest capacity", "Ask venue to extend hold", "High", "Demo insight"],
    ],
    summary: [
      ["Signals this week", "8", "Demo content"],
      ["Budget watchlist", "2", "Across 5 events"],
      ["Upcoming dependencies", "5", "Next 7 days"],
    ],
  },
};

function GenericModule({
  module,
  search,
}: {
  module: string;
  search: string;
}) {
  const [selected, setSelected] = useState("Portfolio");
  const [dialogOpen, setDialogOpen] = useState(false);

  const data = sampleRows[module] ?? sampleRows["finance"];
  if (!data) return null;

  const rows = data.rows.filter((row) =>
    row.join(" ").toLowerCase().includes(search.toLowerCase()),
  );

  if (module === "intelligence") {
    return (
      <>
        <div className="mb-5 flex items-center gap-2 border-y border-border py-3 text-[11px] text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Illustrative insights · Demo content only</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.8fr)]">
          <section>
            <SectionTitle>Signals to review</SectionTitle>
            <DataTable headers={data.headers} rows={rows} />
          </section>

          <section className="border border-border p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-primary" />
              Portfolio brief
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Across five upcoming events, two budgets are trending above early
              estimates. Three production tasks need an owner this week, and
              one venue hold is approaching its review date.
            </p>
            <div className="mt-4 border-t border-border pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Suggested checks
              </p>
              <ul className="mt-2 space-y-2 text-xs">
                <li>• Review revised scenic estimate</li>
                <li>• Confirm festival load-in crew</li>
                <li>• Extend Glasshouse venue hold</li>
              </ul>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {data.summary.map(([label, value, detail]) => (
          <div className="border-y border-border py-3" key={label}>
            <p className="text-[11px] text-muted-foreground">{label}</p>
            <div className="mt-1 flex items-baseline justify-between gap-2">
              <strong className="text-xl font-semibold">{value}</strong>
              <span className="text-[10px] text-muted-foreground">
                {detail}
              </span>
            </div>
          </div>
        ))}
      </div>

      {(module === "finance" || module === "analytics") && (
        <div className="mb-7 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <section>
            <SectionTitle>Portfolio spend</SectionTitle>
            <div className="h-[185px] border-y border-border py-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={budgetSeries}>
                  <CartesianGrid
                    stroke="var(--color-border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fontSize: 10,
                      fill: "var(--color-muted-foreground)",
                    }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fontSize: 9,
                      fill: "var(--color-muted-foreground)",
                    }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="var(--color-primary)"
                    fill="var(--color-secondary)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section>
            <SectionTitle>Spend by category</SectionTitle>
            <div className="space-y-3 border-y border-border py-3">
              {[
                ["Venue & site", "$184,200", 82],
                ["Production", "$156,400", 68],
                ["Food & beverage", "$118,600", 55],
                ["Travel & staffing", "$74,300", 38],
              ].map(([name, total, value]) => (
                <div key={name as string}>
                  <div className="mb-1 flex justify-between text-[10px]">
                    <span>{name}</span>
                    <span className="text-muted-foreground">{total}</span>
                  </div>
                  <Progress value={value as number} className="h-1.5" />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {module === "settings" && (
        <div className="mb-7 flex flex-wrap items-center gap-2">
          {[
            "Organization",
            "Team members",
            "Roles & permissions",
            "Notifications",
            "Preferences",
            "Subscription",
          ].map((tab) => (
            <Button
              key={tab}
              variant={selected === tab ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelected(tab)}
              className="h-8 text-[11px]"
            >
              {tab}
            </Button>
          ))}
        </div>
      )}

      {module === "live-operations" && (
        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          <div className="border-l-2 border-primary pl-3">
            <p className="text-[10px] text-muted-foreground">
              Northstar Product Summit
            </p>
            <p className="mt-1 text-xs font-semibold">Production checks · Dec 05</p>
          </div>
          <div className="border-l-2 border-chart-2 pl-3">
            <p className="text-[10px] text-muted-foreground">
              Goodwood Partner Forum
            </p>
            <p className="mt-1 text-xs font-semibold">
              Final checks · Nov 19
            </p>
          </div>
          <div className="border-l-2 border-chart-4 pl-3">
            <p className="text-[10px] text-muted-foreground">
              Common Ground Festival
            </p>
            <p className="mt-1 text-xs font-semibold">1 issue to resolve</p>
          </div>
        </div>
      )}

      {module === "documents" && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {["All files", "Contracts", "Production", "Operations"].map(
              (tab) => (
                <Button
                  key={tab}
                  variant={selected === tab ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSelected(tab)}
                  className="h-8 text-[10px]"
                >
                  {tab}
                </Button>
              ),
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[10px]"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Upload document
          </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a document</DialogTitle>
                <DialogDescription>
                  Select a document for your team library.
                </DialogDescription>
              </DialogHeader>

              <Input
                type="file"
                aria-label="Choose a document"
                onChange={() =>
                  toast.success(
                    "Document queued for upload in this prototype",
                  )
                }
              />

              <DialogFooter>
                <Button onClick={() => setDialogOpen(false)}>Done</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {module === "venues" && (
        <div className="mb-5 flex items-center justify-between">
          <Tabs value={selected} onValueChange={setSelected}>
            <TabsList>
              <TabsTrigger value="Portfolio">Venues</TabsTrigger>
              <TabsTrigger value="Resources">Resources</TabsTrigger>
              <TabsTrigger value="Bookings">Bookings</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[10px]"
            onClick={() => toast.info("Availability calendar opened")}
          >
            Availability calendar
          </Button>
        </div>
      )}

      <DataTable headers={data.headers} rows={rows} />

      {module === "settings" && (
        <div className="mt-7 border-y border-border py-5">
          <SectionTitle
            action={
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-[10px]"
                onClick={() => toast.success("Invite link copied")}
              >
                Invite team member
              </Button>
            }
          >
            Team access · {selected}
          </SectionTitle>
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Manage who can view and update your event plans. Role changes in
            this prototype are illustrative and do not provide real access
            control.
          </p>
        </div>
      )}
    </>
  );
}

function AdminPage({ search }: { search: string }) {
  const [tab, setTab] = useState("Organizations");

  const orgs = [
    ["Morrow Events", "Studio", "24", "Oct 2025", "Active", "San Francisco"],
    ["Northstar Collective", "Enterprise", "68", "Sep 2025", "Active", "New York"],
    ["Common Ground Co.", "Studio", "16", "Jan 2026", "Review due", "London"],
    ["Goodwood Partners", "Team", "9", "Mar 2026", "Active", "London"],
  ].filter((row) =>
    row.join(" ").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <PageHeading
        eyebrow="Platform administration · Demo environment"
        title="A view across every team."
        description="Manage organizations, accounts, subscriptions, and platform activity in one place."
        action={
          <Button
            className="h-9 rounded-sm text-xs"
            onClick={() =>
              toast.info("Organization provisioning is simulated")
            }
          >
            Add organization
          </Button>
        }
      />

      <div className="grid gap-4 border-y border-border py-5 sm:grid-cols-4">
        {[
          ["Organizations", "148", "+12 this month"],
          ["Active users", "2,840", "Across all teams"],
          ["Subscriptions", "132", "89% active"],
          ["Platform health", "99.98%", "Last 30 days"],
        ].map(([name, value, note]) => (
          <div key={name}>
            <p className="text-[11px] text-muted-foreground">{name}</p>
            <strong className="mt-1 block text-[23px]">{value}</strong>
            <span className="text-[10px] text-muted-foreground">{note}</span>
          </div>
        ))}
      </div>

      <div className="mt-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              {[
                "Organizations",
                "Users",
                "Subscriptions",
                "Activity",
                "System settings",
              ].map((item) => (
                <TabsTrigger key={item} value={item}>
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info(`${tab} report exported`)}
            className="h-8 text-[10px]"
          >
            Export report
          </Button>
        </div>

        {tab === "Organizations" ? (
          <DataTable
            headers={[
              "Organization",
              "Plan",
              "Members",
              "Started",
              "Status",
              "Location",
            ]}
            rows={orgs}
          />
        ) : (
          <div className="border-y border-border py-10 text-center">
            <Settings className="mx-auto h-5 w-5 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">{tab}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Platform {tab.toLowerCase()} controls are ready for review in
              this demo.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => toast.success(`${tab} settings opened`)}
            >
              Open {tab.toLowerCase()}
            </Button>
          </div>
        )}
      </div>

      <p className="mt-6 flex items-center gap-2 text-[10px] text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" />
        Sample organization data · Administrative controls are simulated and
        are not security boundaries.
      </p>
    </>
  );
}