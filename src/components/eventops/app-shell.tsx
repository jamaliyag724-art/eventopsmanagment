import { useState } from "react";
import type { ElementType, ReactNode } from "react";
import {
  ShieldCheck,
  CalendarDays,
  ClipboardList,
  Wallet,
  Activity,
  Plus,
  Sparkles,
  MapPin,
  ArrowUpRight,
  LayoutGrid,
  List as ListIcon,
  CalendarCheck2,
  Search,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Sidebar } from "./layout/sidebar";
import { Topbar } from "./layout/topbar";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Settings } from "lucide-react";
import { ModuleWorkspace } from "./modules/module-workspace";

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
      <Sidebar
        module={module}
        admin={admin}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        org={org}
        setOrg={setOrg}
      />

      <div
        className={`min-h-screen transition-[margin] duration-200 ${
          collapsed ? "md:ml-[76px]" : "md:ml-[264px]"
        }`}
      >
        <Topbar
          title={title}
          search={search}
          setSearch={setSearch}
          setMobileOpen={setMobileOpen}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />
        <main className="mx-auto w-full max-w-[1540px] px-4 pb-12 pt-7 md:px-8 md:pt-9">
          {admin ? (
            <AdminPage search={search} />
          ) : module === "overview" ? (
            <Overview search={search} />
          ) : module === "events" ? (
            <EventsPage search={search} />
          ) : (
            <ModuleWorkspace module={module} search={search} />
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
    <div className="group rounded-xl border border-border/80 bg-card p-4 shadow-[0_2px_12px_rgba(38,32,24,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(38,32,24,0.07)]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${tone === "accent" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <strong className="text-[25px] font-semibold tracking-[-0.8px]">{value}</strong>
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
  const activeTasks = tasks.filter((task) => task.status !== "Done").length;
  const eventPhotos = [
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=85",
  ];

  return (
    <div className="space-y-7">
      <section className="relative isolate overflow-hidden rounded-2xl bg-[#292b25] px-6 py-7 text-white shadow-[0_14px_40px_rgba(35,32,25,0.12)] md:px-8 md:py-9">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_82%_20%,rgba(190,132,91,0.34),transparent_42%),linear-gradient(110deg,rgba(24,27,23,0.98),rgba(47,48,40,0.9))]" />
        <div className="absolute -right-10 -top-24 -z-10 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -right-1 -top-16 -z-10 h-56 w-56 rounded-full border border-white/10" />
        <div className="max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e0b99b]">
            <Sparkles className="h-3.5 w-3.5" /> {formatToday()} · Workspace overview
          </p>
          <h1 className="max-w-xl text-[28px] font-semibold leading-[1.12] tracking-[-1px] md:text-[38px]">
            Every detail, moving in the right direction.
          </h1>
          <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-white/65">
            Your event portfolio at a glance. See what is approaching, what is progressing, and what needs your attention.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <NewEventDialog />
            <span className="text-[10px] text-white/45">Demo workspace · Sample data</span>
          </div>
        </div>
        <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 border-t border-white/15 pt-5 md:mt-0 md:absolute md:bottom-8 md:right-8 md:w-[310px] md:border-l md:border-t-0 md:pl-6">
          <div><p className="text-[10px] text-white/50">Upcoming</p><p className="mt-1 text-2xl font-semibold">{upcomingEvents.length}</p></div>
          <div><p className="text-[10px] text-white/50">Active tasks</p><p className="mt-1 text-2xl font-semibold">{activeTasks}</p></div>
          <div><p className="text-[10px] text-white/50">Approvals</p><p className="mt-1 text-2xl font-semibold">3</p></div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <Stat label="Total events" value={String(events.length)} delta="In this demo" icon={CalendarDays} />
        <Stat label="Upcoming" value={String(upcomingEvents.length)} delta="Future events" icon={CalendarDays} tone="accent" />
        <Stat label="Active tasks" value={String(activeTasks)} delta="Sample task list" icon={ClipboardList} />
        <Stat label="Total budget" value="$942k" delta="Across active events" icon={Wallet} />
        <Stat label="Actual expenses" value="$614k" delta="65% utilized" icon={Wallet} tone="accent" />
        <Stat label="Approvals" value="3" delta="Need your review" icon={Activity} />
      </section>

      <div className="grid items-start gap-6 2xl:grid-cols-[minmax(0,1.65fr)_minmax(310px,0.85fr)]">
        <div className="min-w-0 space-y-7">
          <section>
            <SectionTitle action={<Link to="/app/$module" params={{ module: "events" }} className="text-xs font-semibold text-primary hover:underline">All events ↗</Link>}>
              Upcoming events
            </SectionTitle>
            {filteredEvents.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredEvents.slice(0, 4).map((event, index) => (
                  <article key={event.name} className="group overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_2px_12px_rgba(38,32,24,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(38,32,24,0.08)]">
                    <div className="relative h-36 overflow-hidden bg-secondary">
                      <img src={eventPhotos[index % eventPhotos.length]} alt="Event venue atmosphere" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />
                      <div className="absolute bottom-3 left-3"><span className="rounded-md border border-white/25 bg-black/25 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">{event.type}</span></div>
                      <div className="absolute right-3 top-3"><StatusBadge status={event.status} /></div>
                    </div>
                    <div className="p-4">
                      <h3 className="truncate text-[14px] font-semibold tracking-[-0.2px]">{event.name}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3 w-3" />{event.date}</span>
                        <span className="truncate">{event.venue}</span>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <Progress value={event.progress} className="h-1.5 flex-1" />
                        <span className="text-[10px] font-semibold tabular-nums text-muted-foreground">{event.progress}%</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-card px-4 py-10 text-center text-xs text-muted-foreground">No upcoming events match your search.</div>
            )}
          </section>

          <section className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-border/80 bg-card p-5 shadow-[0_2px_12px_rgba(38,32,24,0.035)]">
              <SectionTitle action={<Select value={range} onValueChange={setRange}><SelectTrigger className="h-7 w-[105px] text-[10px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="6 months">6 months</SelectItem><SelectItem value="This year">This year</SelectItem><SelectItem value="This quarter">This quarter</SelectItem></SelectContent></Select>}>
                Budget utilization
              </SectionTitle>
              <div className="mb-2 flex items-baseline gap-2"><strong className="text-[27px] font-semibold tracking-[-0.8px]">65%</strong><span className="text-[10px] text-muted-foreground">of allocated budget</span></div>
              <div className="h-[190px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={budgetSeries} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
                    <defs><linearGradient id="planned-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.2} /><stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: "var(--color-muted-foreground)" }} />
                    <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 9, fontSize: 11 }} />
                    <Area type="monotone" dataKey="planned" name="Planned" stroke="var(--color-chart-3)" fill="url(#planned-fill)" strokeWidth={1.8} />
                    <Area type="monotone" dataKey="actual" name="Actual" stroke="var(--color-primary)" fill="transparent" strokeWidth={2.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex gap-4 text-[10px] text-muted-foreground"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-chart-3" />Planned</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-primary" />Actual</span></div>
            </div>

            <div className="rounded-xl border border-border/80 bg-card p-5 shadow-[0_2px_12px_rgba(38,32,24,0.035)]">
              <SectionTitle>Task completion</SectionTitle>
              <div className="flex items-end justify-between"><div><strong className="text-[27px] font-semibold tracking-[-0.8px]">78%</strong><p className="mt-0.5 text-[10px] text-muted-foreground">of tasks on track</p></div><span className="text-[10px] text-muted-foreground">486 total tasks</span></div>
              <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full bg-secondary"><span className="bg-primary" style={{ width: "55%" }} /><span className="bg-chart-2" style={{ width: "23%" }} /><span className="bg-secondary" style={{ width: "17%" }} /><span className="bg-chart-4" style={{ width: "5%" }} /></div>
              <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 text-[10px]">
                {[{ label: "Complete", count: "267", color: "bg-primary" }, { label: "In progress", count: "112", color: "bg-chart-2" }, { label: "To do", count: "83", color: "bg-muted-foreground/30" }, { label: "At risk", count: "24", color: "bg-chart-4" }].map((item) => <div key={item.label} className="flex items-center gap-2"><i className={`h-2 w-2 rounded-full ${item.color}`} /><span className="text-muted-foreground">{item.label}</span><b className="ml-auto">{item.count}</b></div>)}
              </div>
              <div className="mt-6 rounded-lg bg-secondary/65 p-3"><p className="text-[10px] leading-relaxed text-muted-foreground">Task metrics are illustrative sample data for this prototype.</p></div>
            </div>
          </section>
        </div>

        <aside className="grid content-start gap-5 sm:grid-cols-2 2xl:grid-cols-1">
          <section className="rounded-xl border border-border/80 bg-card p-5 shadow-[0_2px_12px_rgba(38,32,24,0.035)]">
            <SectionTitle action={<button onClick={() => toast.info("Showing all activity")} className="text-[10px] font-semibold text-primary hover:underline">View all</button>}>Recent activity</SectionTitle>
            <div className="divide-y divide-border/70">
              {filteredActivity.slice(0, 5).map((item) => <div key={item.who + item.action} className="flex gap-3 py-3 first:pt-0 last:pb-0"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-[10px] font-semibold">{item.initials}</span><div className="min-w-0 flex-1 text-[11px] leading-relaxed"><b>{item.who}</b> {item.action}<div className="truncate text-muted-foreground">{item.event}</div></div><span className="shrink-0 text-[9px] text-muted-foreground">{item.time}</span></div>)}
            </div>
          </section>

          <section className="rounded-xl border border-border/80 bg-card p-5 shadow-[0_2px_12px_rgba(38,32,24,0.035)]">
            <SectionTitle action={<Link to="/app/$module" params={{ module: "planning" }} className="text-[10px] font-semibold text-primary hover:underline">Task list ↗</Link>}>Coming up</SectionTitle>
            <div className="space-y-3">
              {tasks.filter((task) => task.status !== "Done").slice(0, 4).map((task) => <div key={task.title} className="flex gap-3"><span className={`mt-0.5 h-4 w-4 shrink-0 rounded border ${task.priority === "High" ? "border-primary bg-primary/10" : "border-border"}`} /><div className="min-w-0 flex-1"><div className="text-[11px] font-medium leading-snug">{task.title}</div><div className="mt-1 truncate text-[10px] text-muted-foreground">{task.event} · {task.owner}</div></div><span className="shrink-0 text-[10px] text-muted-foreground">{task.due}</span></div>)}
            </div>
          </section>

          <section className="rounded-xl border border-border/80 bg-card p-5 shadow-[0_2px_12px_rgba(38,32,24,0.035)] sm:col-span-2 2xl:col-span-1">
            <SectionTitle>Needs attention <Badge variant="outline" className="ml-1 h-5 px-1.5 text-[9px]">3</Badge></SectionTitle>
            <div className="divide-y divide-border/70">
              <AlertRow title="Budget approval requested" detail="Northstar Product Summit · Scenic" label="Review" />
              <AlertRow title="Resource conflict detected" detail="Common Ground Festival · Main stage" label="Resolve" />
              <AlertRow title="Insurance certificate expiring" detail="Goodway Guest Travel · Nov 28" label="View" />
            </div>
            <p className="mt-3 text-[9px] text-muted-foreground">Alerts are simulated prototype content.</p>
          </section>
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


type EventRecord = (typeof events)[number];

const eventCoverImages: Record<string, string> = {
  Conference: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85",
  "Gala dinner": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
  "Public festival": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=85",
  "Company meeting": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85",
  "Partner forum": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85",
  default: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85",
};

function formatEventDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function EventsPage({ search }: { search: string }) {
  const [eventItems, setEventItems] = useState<EventRecord[]>(events);
  const [view, setView] = useState<"Grid" | "List">("Grid");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Date: soonest");
  const [selectedEvent, setSelectedEvent] = useState<EventRecord | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Conference");
  const [venue, setVenue] = useState("");
  const [budget, setBudget] = useState("");

  const normalizedSearch = search.trim().toLowerCase();
  const filteredEvents = eventItems
    .filter((event) => filter === "All" || event.status === filter)
    .filter((event) =>
      `${event.name} ${event.type} ${event.venue} ${event.status}`
        .toLowerCase()
        .includes(normalizedSearch),
    )
    .sort((a, b) => {
      if (sort === "Name: A–Z") return a.name.localeCompare(b.name);
      if (sort === "Progress: high to low") return b.progress - a.progress;
      if (sort === "Budget: high to low") {
        return Number(b.budget.replace(/[^0-9.]/g, "")) -
          Number(a.budget.replace(/[^0-9.]/g, ""));
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const upcomingCount = eventItems.filter(
    (event) => event.status !== "Completed" && new Date(event.date) >= new Date(new Date().setHours(0, 0, 0, 0)),
  ).length;
  const completedCount = eventItems.filter((event) => event.status === "Completed").length;
  const atRiskCount = eventItems.filter((event) => event.status === "At risk").length;
  const totalBudget = eventItems.reduce(
    (sum, event) => sum + Number(event.budget.replace(/[^0-9.]/g, "")),
    0,
  );

  const createEvent = () => {
    if (name.trim().length < 3 || !date || !venue.trim()) {
      toast.error("Enter an event name, date and venue.");
      return;
    }
    const formattedDate = formatEventDate(`${date}T12:00:00`);
    const newEvent: EventRecord = {
      name: name.trim(),
      type,
      date: formattedDate,
      venue: venue.trim(),
      status: "In planning",
      budget: budget.trim() ? (budget.startsWith("$") ? budget : `$${budget}`) : "$0",
      progress: 0,
    };
    setEventItems((current) => [newEvent, ...current]);
    setName("");
    setDate("");
    setType("Conference");
    setVenue("");
    setBudget("");
    setCreateOpen(false);
    setFilter("All");
    toast.success("Event added to this demo workspace.");
  };

  return (
    <div className="space-y-7">
      <PageHeading
        eyebrow="Morrow Events · Event portfolio"
        title="Events, thoughtfully organized."
        description="Create, track and manage every event from the first plan to the final wrap-up."
        action={
          <Button onClick={() => setCreateOpen(true)} className="h-9 gap-2 rounded-lg px-4 text-xs">
            <Plus className="h-4 w-4" /> New event
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total events", value: eventItems.length, note: "In this workspace", icon: CalendarDays },
          { label: "Upcoming", value: upcomingCount, note: "Scheduled ahead", icon: CalendarCheck2 },
          { label: "Completed", value: completedCount, note: "Successfully delivered", icon: ClipboardList },
          { label: "At risk", value: atRiskCount, note: "Needs attention", icon: Activity },
        ].map((item, index) => (
          <div key={item.label} className="rounded-xl border border-border/80 bg-card p-4 shadow-[0_2px_12px_rgba(38,32,24,0.035)]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-muted-foreground">{item.label}</span>
              <span className={`grid h-8 w-8 place-items-center rounded-lg ${index === 3 ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground"}`}>
                <item.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-[26px] font-semibold tracking-tight">{item.value}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{item.note}</p>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-border/80 bg-card p-4 shadow-[0_2px_12px_rgba(38,32,24,0.035)] md:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-sm font-semibold">Your event portfolio</h2>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {filteredEvents.length} of {eventItems.length} events shown · Total planned budget {totalBudget.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 w-[145px] text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["All", "In planning", "Confirmed", "At risk", "Completed"].map((status) => (
                  <SelectItem key={status} value={status}>{status === "All" ? "All statuses" : status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-9 w-[165px] text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Date: soonest">Date: soonest</SelectItem>
                <SelectItem value="Name: A–Z">Name: A–Z</SelectItem>
                <SelectItem value="Progress: high to low">Progress: high to low</SelectItem>
                <SelectItem value="Budget: high to low">Budget: high to low</SelectItem>
              </SelectContent>
            </Select>
            <Tabs value={view} onValueChange={(value) => setView(value as "Grid" | "List")}>
              <TabsList className="h-9">
                <TabsTrigger value="Grid" className="h-7 px-2.5"><LayoutGrid className="h-3.5 w-3.5" /><span className="sr-only">Grid view</span></TabsTrigger>
                <TabsTrigger value="List" className="h-7 px-2.5"><ListIcon className="h-3.5 w-3.5" /><span className="sr-only">List view</span></TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="mt-5 rounded-lg border border-dashed border-border px-4 py-14 text-center">
            <Search className="mx-auto h-5 w-5 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">No events found</p>
            <p className="mt-1 text-xs text-muted-foreground">Try another search term or change the status filter.</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => { setFilter("All"); }}>
              Clear status filter
            </Button>
          </div>
        ) : view === "Grid" ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <article key={`${event.name}-${event.date}`} className="group overflow-hidden rounded-xl border border-border/80 bg-background transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(38,32,24,0.08)]">
                <div className="relative h-40 overflow-hidden bg-secondary">
                  <img
                    src={eventCoverImages[event.type] ?? eventCoverImages.default}
                    alt={`${event.type} event setting`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />
                  <span className="absolute bottom-3 left-3 rounded-md border border-white/25 bg-black/30 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">{event.type}</span>
                  <div className="absolute right-3 top-3"><StatusBadge status={event.status} /></div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">{event.name}</h3>
                      <p className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground"><CalendarDays className="h-3 w-3 shrink-0" />{event.date}</p>
                      <p className="mt-1 flex items-center gap-1.5 truncate text-[10px] text-muted-foreground"><MapPin className="h-3 w-3 shrink-0" />{event.venue}</p>
                    </div>
                    <p className="shrink-0 text-xs font-semibold">{event.budget}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Progress value={event.progress} className="h-1.5 flex-1" />
                    <span className="text-[10px] font-semibold tabular-nums text-muted-foreground">{event.progress}%</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
                    <span className="text-[10px] text-muted-foreground">Planning progress</span>
                    <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-[10px] text-primary" onClick={() => setSelectedEvent(event)}>
                      View details <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-lg border border-border/70">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-secondary/60">
                <tr>{["Event", "Date", "Venue", "Budget", "Status", "Progress", ""].map((heading) => <th key={heading} className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{heading}</th>)}</tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={`${event.name}-${event.date}`} className="border-t border-border/70 hover:bg-secondary/25">
                    <td className="px-4 py-3"><p className="text-xs font-semibold">{event.name}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{event.type}</p></td>
                    <td className="px-4 py-3 text-[11px] text-muted-foreground">{event.date}</td>
                    <td className="px-4 py-3 text-[11px] text-muted-foreground">{event.venue}</td>
                    <td className="px-4 py-3 text-[11px] font-medium">{event.budget}</td>
                    <td className="px-4 py-3"><StatusBadge status={event.status} /></td>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><Progress value={event.progress} className="h-1.5 w-16" /><span className="text-[10px] text-muted-foreground">{event.progress}%</span></div></td>
                    <td className="px-4 py-3"><Button variant="ghost" size="sm" className="h-7 text-[10px]" onClick={() => setSelectedEvent(event)}>Details</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Create a new event</DialogTitle>
            <DialogDescription>Add the core event details. This prototype stores new events in local page state only.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2 sm:grid-cols-2">
            <label className="grid gap-1.5 text-xs font-medium sm:col-span-2">Event name
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Annual leadership summit" />
            </label>
            <label className="grid gap-1.5 text-xs font-medium">Event date
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label className="grid gap-1.5 text-xs font-medium">Event type
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Conference", "Gala dinner", "Public festival", "Company meeting", "Partner forum", "Exhibition", "Wedding", "Sports event"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
              </Select>
            </label>
            <label className="grid gap-1.5 text-xs font-medium sm:col-span-2">Venue
              <Input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Venue name · City" />
            </label>
            <label className="grid gap-1.5 text-xs font-medium sm:col-span-2">Estimated budget
              <Input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. 50000 (optional)" inputMode="decimal" />
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={createEvent}>Create event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(selectedEvent)} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-[520px]">
          {selectedEvent && (
            <>
              <div className="relative -mx-6 -mt-6 mb-2 h-44 overflow-hidden rounded-t-lg">
                <img src={eventCoverImages[selectedEvent.type] ?? eventCoverImages.default} alt={`${selectedEvent.type} venue`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-4"><span className="rounded bg-black/30 px-2 py-1 text-[10px] text-white">{selectedEvent.type}</span></div>
              </div>
              <DialogHeader>
                <div className="flex items-center justify-between gap-3"><DialogTitle>{selectedEvent.name}</DialogTitle><StatusBadge status={selectedEvent.status} /></div>
                <DialogDescription>Event overview · Demo workspace</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-secondary/60 p-3"><p className="text-[10px] text-muted-foreground">Event date</p><p className="mt-1 text-xs font-semibold">{selectedEvent.date}</p></div>
                <div className="rounded-lg bg-secondary/60 p-3"><p className="text-[10px] text-muted-foreground">Estimated budget</p><p className="mt-1 text-xs font-semibold">{selectedEvent.budget}</p></div>
                <div className="col-span-2 rounded-lg bg-secondary/60 p-3"><p className="text-[10px] text-muted-foreground">Venue</p><p className="mt-1 text-xs font-semibold">{selectedEvent.venue}</p></div>
                <div className="col-span-2 rounded-lg bg-secondary/60 p-3"><div className="flex justify-between text-[10px]"><span className="text-muted-foreground">Planning progress</span><b>{selectedEvent.progress}%</b></div><Progress value={selectedEvent.progress} className="mt-2 h-2" /></div>
              </div>
              <DialogFooter><Button onClick={() => setSelectedEvent(null)}>Close</Button></DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
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