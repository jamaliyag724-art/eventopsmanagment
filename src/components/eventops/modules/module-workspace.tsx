import { useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, ArrowDownToLine, Filter, Plus, Sparkles, Users, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { budgetSeries, events, moduleDescriptions, modules, tasks, vendors } from "../data";

type Row = { id: number; name: string; detail: string; owner: string; date: string; status: string; priority: string };
const seed: Record<string, Row[]> = {
  planning: tasks.map((t, i) => ({ id: i + 1, name: t.title, detail: t.event, owner: t.owner, date: t.due, status: t.status, priority: t.priority })),
  vendors: vendors.map((v, i) => ({ id: i + 1, name: v.name, detail: v.category, owner: v.contact, date: v.events, status: v.status, priority: `★ ${v.rating}` })),
  finance: [
    { id: 1, name: "Venue & site", detail: "Northstar Product Summit", owner: "Maya Chen", date: "Oct 24", status: "On track", priority: "$64,250 / $68,000" },
    { id: 2, name: "Production", detail: "Northstar Product Summit", owner: "Jordan Lee", date: "Oct 24", status: "Review due", priority: "$76,400 / $74,000" },
    { id: 3, name: "Catering", detail: "Fieldnotes Founders Dinner", owner: "Alex Morgan", date: "Nov 08", status: "On track", priority: "$19,800 / $24,500" },
    { id: 4, name: "Travel & transport", detail: "Goodwood Partner Forum", owner: "Sam Rivera", date: "Nov 19", status: "On track", priority: "$12,650 / $18,000" },
  ],
  workforce: [
    { id: 1, name: "Maya Chen", detail: "Production · Northstar Summit", owner: "Production", date: "Oct 24 · 07:00", status: "Assigned", priority: "Full time" },
    { id: 2, name: "Alex Morgan", detail: "Guest experience · Founders Dinner", owner: "Guest experience", date: "Nov 08 · 12:00", status: "Assigned", priority: "Full time" },
    { id: 3, name: "Jordan Lee", detail: "Technical · Common Ground", owner: "Technical", date: "Dec 04 · 08:00", status: "Review due", priority: "Limited" },
    { id: 4, name: "Sam Rivera", detail: "Partnerships · Goodwood Forum", owner: "Partnerships", date: "Nov 18 · 10:00", status: "Assigned", priority: "Full time" },
  ],
  sponsors: [
    { id: 1, name: "Fallow & Field", detail: "Presenting · Northstar Summit", owner: "Maya Chen", date: "8 of 10 deliverables", status: "Active", priority: "$75,000" },
    { id: 2, name: "Meridian Bank", detail: "Gold · Northstar Summit", owner: "Sam Rivera", date: "5 of 6 deliverables", status: "Active", priority: "$40,000" },
    { id: 3, name: "Common Table", detail: "Community · Founders Dinner", owner: "Sam Rivera", date: "4 of 4 deliverables", status: "Complete", priority: "$18,000" },
    { id: 4, name: "Goodway Travel", detail: "Supporting · Goodwood Forum", owner: "Alex Morgan", date: "2 of 5 deliverables", status: "Review due", priority: "$22,500" },
  ],
  venues: [
    { id: 1, name: "Pier 27", detail: "Waterfront venue · San Francisco", owner: "Northstar Summit", date: "Oct 24", status: "Confirmed", priority: "1,800 capacity" },
    { id: 2, name: "The Foundry", detail: "Industrial venue · New York", owner: "Founders Dinner", date: "Nov 08", status: "Confirmed", priority: "240 capacity" },
    { id: 3, name: "Main stage · CG", detail: "Production resource", owner: "Common Ground", date: "Dec 05", status: "Conflict", priority: "Power check" },
    { id: 4, name: "The Glasshouse", detail: "Conference venue · New York", owner: "Morrow Annual Meeting", date: "Jan 16", status: "In planning", priority: "620 capacity" },
  ],
  "live-operations": [
    { id: 1, name: "Stage power redundancy check", detail: "Common Ground Festival", owner: "Jordan Lee", date: "10 min ago", status: "In progress", priority: "High" },
    { id: 2, name: "Guest transport arrival window", detail: "Northstar Summit", owner: "Maya Chen", date: "28 min ago", status: "Monitoring", priority: "Medium" },
    { id: 3, name: "Final seating adjustment", detail: "Founders Dinner", owner: "Alex Morgan", date: "1 hr ago", status: "Resolved", priority: "Low" },
  ],
  intelligence: [
    { id: 1, name: "Production spend trending 8% over estimate", detail: "Northstar · Scenic vendor revision", owner: "Finance signal", date: "Today", status: "Review suggested", priority: "High confidence" },
    { id: 2, name: "Task handoff may affect load-in", detail: "Common Ground · 3 dependencies due", owner: "Schedule signal", date: "Next 48 hours", status: "Action suggested", priority: "Medium confidence" },
    { id: 3, name: "Venue hold expires this Friday", detail: "Morrow Annual Meeting · 620 capacity", owner: "Venue signal", date: "Friday", status: "Review suggested", priority: "High confidence" },
  ],
  analytics: events.map((e, i) => ({ id: i + 1, name: e.name, detail: e.type, owner: e.venue, date: e.date, status: e.status, priority: `${e.progress}% complete` })),
  documents: [
    { id: 1, name: "Northstar · Floor plan v4.pdf", detail: "Production · Northstar Summit", owner: "Maya Chen", date: "Oct 14, 2026", status: "Current", priority: "PDF · 4.2 MB" },
    { id: 2, name: "Catering agreement.pdf", detail: "Contract · Founders Dinner", owner: "Alex Morgan", date: "Oct 13, 2026", status: "Review due", priority: "PDF · 820 KB" },
    { id: 3, name: "Brand partner asset guide.docx", detail: "Partnerships · Goodwood Forum", owner: "Sam Rivera", date: "Oct 12, 2026", status: "Current", priority: "DOCX · 1.1 MB" },
    { id: 4, name: "Safety & site plan.xlsx", detail: "Operations · Common Ground", owner: "Jordan Lee", date: "Oct 11, 2026", status: "Current", priority: "XLSX · 640 KB" },
  ],
  settings: [
    { id: 1, name: "Maya Chen", detail: "Organization owner · Leadership", owner: "Owner", date: "Just now", status: "Active", priority: "Full access" },
    { id: 2, name: "Alex Morgan", detail: "Event manager · Production", owner: "Manager", date: "12 min ago", status: "Active", priority: "Events & finance" },
    { id: 3, name: "Jordan Lee", detail: "Operations lead · Technical", owner: "Operations", date: "48 min ago", status: "Active", priority: "Operations" },
    { id: 4, name: "Sam Rivera", detail: "Coordinator · Partnerships", owner: "Coordinator", date: "2 hrs ago", status: "Active", priority: "Events & sponsors" },
  ],
};
const summary: Record<string, [string, string, string][]> = {
  planning: [["Open tasks", "4", "Across 3 events"], ["In progress", "2", "Needs follow-through"], ["High priority", "2", "Review this week"]],
  vendors: [["Trusted partners", "5", "Sample directory"], ["Preferred", "2", "Approved partners"], ["Review due", "1", "Needs attention"]],
  finance: [["Portfolio budget", "$942k", "5 sample events"], ["Committed spend", "$614k", "65% utilized"], ["Pending approval", "$18.4k", "3 requests · demo"]],
  workforce: [["Team members", "46", "Across 5 departments"], ["Shifts this week", "28", "4 events"], ["Open assignments", "6", "Need coverage"]],
  sponsors: [["Active partners", "18", "Across all events"], ["Committed value", "$384.5k", "This season"], ["Deliverables due", "7", "Next 14 days"]],
  venues: [["Partner venues", "24", "Across 4 cities"], ["Resources tracked", "138", "Equipment & spaces"], ["Conflicts", "1", "Requires review"]],
  "live-operations": [["Live events", "2", "Operations active"], ["Open incidents", "3", "1 high priority"], ["Team check-ins", "86%", "On site · demo"]],
  intelligence: [["Signals this week", "8", "Illustrative data"], ["Budget watchlist", "2", "Across 5 events"], ["Dependencies", "5", "Next 7 days"]],
  analytics: [["Events delivered", "28", "This year · demo"], ["Avg. budget variance", "-3.1%", "Under budget · demo"], ["Guest satisfaction", "4.8 / 5", "Post-event average · demo"]],
  documents: [["Documents", "246", "Across all events · demo"], ["Awaiting review", "4", "Need attention"], ["Recently added", "12", "This month"]],
  settings: [["Team members", "24", "3 pending invites · demo"], ["Workspace plan", "Studio", "Prototype plan"], ["Access roles", "4", "Configurable roles"]],
};
const titles: Record<string, string> = { planning: "Planning & Tasks", vendors: "Vendors", finance: "Finance", workforce: "Workforce", sponsors: "Sponsors", venues: "Venues & Resources", "live-operations": "Live Operations", intelligence: "AI Intelligence", analytics: "Analytics & Reports", documents: "Documents", settings: "Settings" };
const columns: Record<string, string[]> = { planning: ["Task", "Event", "Owner", "Due", "Status", "Priority"], vendors: ["Vendor", "Category", "Contact", "Events", "Status", "Rating"], finance: ["Cost category", "Event", "Owner", "Updated", "Status", "Budget / actual"], workforce: ["Team member", "Assignment", "Department", "Next shift", "Status", "Availability"], sponsors: ["Partner", "Package / event", "Owner", "Deliverables", "Status", "Commitment"], venues: ["Venue / resource", "Type", "Event", "Date", "Status", "Capacity / note"], "live-operations": ["Incident / operation", "Event", "Owner", "Updated", "Status", "Priority"], intelligence: ["Signal", "Context", "Source", "Window", "Status", "Confidence"], analytics: ["Event", "Type", "Venue", "Date", "Status", "Progress"], documents: ["Document", "Category / event", "Owner", "Updated", "Status", "File"], settings: ["Team member", "Role / department", "Role", "Last active", "Status", "Access"] };

function Pill({ children }: { children: string }) {
  const positive = /complete|confirmed|preferred|contracted|current|assigned|resolved|active|on track/i.test(children);
  const warning = /risk|review|conflict|high|planning|progress|suggested/i.test(children);
  return <Badge variant="outline" className={`whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-medium ${positive ? "border-emerald-200 bg-emerald-50 text-emerald-700" : warning ? "border-amber-200 bg-amber-50 text-amber-800" : "border-border bg-secondary/60 text-muted-foreground"}`}>{children}</Badge>;
}
function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <section className={`rounded-xl border border-border/80 bg-card p-4 shadow-[0_2px_12px_rgba(38,32,24,0.035)] md:p-5 ${className}`}>{children}</section>; }

export function ModuleWorkspace({ module, search = "" }: { module: string; search?: string }) {
  const [rows, setRows] = useState<Row[]>(() => seed[module] ?? []);
  // Re-load the correct module dataset whenever navigation changes the module.
  useEffect(() => {
    setRows(seed[module] ?? []);
    setFilter("All");
    setView(module === "planning" ? "Board" : "Table");
    setDetail(null);
    setTab("Overview");
    setDraft({ name: "", detail: "", owner: "", date: "", priority: "Medium" });
  }, [module]);
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState(module === "planning" ? "Board" : "Table");
  const [dialog, setDialog] = useState(false);
  const [detail, setDetail] = useState<Row | null>(null);
  const [draft, setDraft] = useState({ name: "", detail: "", owner: "", date: "", priority: "Medium" });
  const [tab, setTab] = useState("Overview");
  const current = modules.find(m => m.slug === module);
  const filtered = useMemo(() => rows.filter(r => (filter === "All" || r.status === filter) && `${r.name} ${r.detail} ${r.owner} ${r.status} ${r.priority}`.toLowerCase().includes(search.toLowerCase())), [rows, filter, search]);
  if (!current || module === "overview" || module === "events") return <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">Module not found.</div>;
  const addLabel = module === "planning" ? "task" : module === "vendors" ? "vendor" : module === "documents" ? "document" : "record";
  const create = () => { if (!draft.name.trim()) { toast.error("Enter a name first"); return; } const item: Row = { id: Date.now(), name: draft.name, detail: draft.detail || current.label, owner: draft.owner || "Unassigned", date: draft.date || "Not scheduled", status: module === "planning" ? "To do" : "In planning", priority: draft.priority }; setRows(prev => [item, ...prev]); setDraft({ name: "", detail: "", owner: "", date: "", priority: "Medium" }); setDialog(false); toast.success(`${current.label} item added to this demo session`); };
  const updateStatus = (row: Row, status: string) => { setRows(prev => prev.map(r => r.id === row.id ? { ...r, status } : r)); setDetail({ ...row, status }); toast.success("Status updated for this demo session"); };
  const summaryCards = summary[module] ?? [];
  const visibleColumns = columns[module] ?? columns.planning;
  const rowCells = (r: Row) => [r.name, r.detail, r.owner, r.date, r.status, r.priority];
  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Morrow Events · Workspace</p><h1 className="text-[26px] font-semibold tracking-[-0.6px] md:text-[30px]">{titles[module] ?? current.label}</h1><p className="mt-1.5 max-w-2xl text-[13px] text-muted-foreground">{moduleDescriptions[module]}</p></div><div className="flex flex-wrap gap-2"><Button variant="outline" size="sm" className="h-9 gap-2 text-xs" onClick={() => toast.info("Export prepared in this prototype") }><ArrowDownToLine className="h-3.5 w-3.5"/>Export</Button><Button size="sm" className="h-9 gap-2 text-xs" onClick={() => setDialog(true)}><Plus className="h-3.5 w-3.5"/>Add {addLabel}</Button></div></div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{summaryCards.map(([label, value, note], i) => <Panel key={label}><div className="flex items-start justify-between"><p className="text-[11px] text-muted-foreground">{label}</p><span className="rounded-lg bg-secondary p-2 text-muted-foreground">{[<Activity className="h-4 w-4"/>,<Wallet className="h-4 w-4"/>,<Users className="h-4 w-4"/>][i]}</span></div><div className="mt-3 flex flex-wrap items-baseline justify-between gap-2"><strong className="text-[25px] font-semibold tracking-tight">{value}</strong><span className="text-[10px] text-muted-foreground">{note}</span></div></Panel>)}</div>
    {module === "planning" ? <>
      <div className="flex flex-wrap items-center justify-between gap-3"><Tabs value={view} onValueChange={setView}><TabsList><TabsTrigger value="Board">Board</TabsTrigger><TabsTrigger value="List">List</TabsTrigger><TabsTrigger value="Calendar">Calendar</TabsTrigger></TabsList></Tabs><div className="flex items-center gap-2"><Select value={filter} onValueChange={setFilter}><SelectTrigger className="h-9 w-36 text-xs"><Filter className="mr-2 h-3.5 w-3.5"/><SelectValue/></SelectTrigger><SelectContent>{["All","To do","In progress","Done"].map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div></div>
      {view === "Board" ? <div className="grid gap-4 lg:grid-cols-3">{["To do","In progress","Done"].map(status => <Panel key={status} className="min-h-64 bg-secondary/25"><div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold">{status}</h3><Badge variant="secondary">{filtered.filter(r=>r.status===status).length}</Badge></div><div className="space-y-3">{filtered.filter(r=>r.status===status).map(r=><button key={r.id} onClick={()=>setDetail(r)} className="w-full rounded-lg border border-border bg-card p-3 text-left transition hover:border-primary/50"><p className="text-xs font-semibold leading-snug">{r.name}</p><p className="mt-1.5 text-[10px] text-muted-foreground">{r.detail}</p><div className="mt-3 flex items-center justify-between"><span className="text-[10px] text-muted-foreground">{r.owner} · {r.date}</span><Pill>{r.priority}</Pill></div></button>)}</div></Panel>)}</div> : view === "Calendar" ? <Panel>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">November 2026 · Task calendar</h3>
          <span className="text-[10px] text-muted-foreground">Task due dates</span>
        </div>
        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-border bg-border">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="min-h-8 bg-secondary/70 p-2 text-[10px] text-muted-foreground">{day}</div>
          ))}
          {calendarCells(filtered).map((cell, i) => (
            <div key={i} className={`min-h-20 bg-card p-2 max-sm:min-h-16 ${cell ? "" : "bg-secondary/30"}`}>
              {cell && <>
                <span className="text-[10px] text-muted-foreground">{cell.day}</span>
                <div className="mt-1 space-y-1">
                  {cell.tasks.map(task => (
                    <button key={task.id} onClick={() => setDetail(task)}
                      className="block w-full truncate rounded bg-primary/10 px-1.5 py-1 text-left text-[9px] text-primary hover:bg-primary/15"
                      title={task.name}>
                      {task.name}
                    </button>
                  ))}
                </div>
              </>}
            </div>
          ))}
        </div>
      </Panel> : <Table headers={visibleColumns} rows={filtered.map(rowCells)} onSelect={i=>setDetail(filtered[i])}/> rows={filtered.map(rowCells)} onSelect={i=>setDetail(filtered[i])}/ >}
    </> : <>
      {(module === "finance" || module === "analytics") && <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]"><Panel><div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold">Portfolio spend trend</h3><Badge variant="outline">Illustrative data</Badge></div><div className="h-[230px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={budgetSeries}><defs><linearGradient id="moduleSpend" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity={.22}/><stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="var(--color-border)" vertical={false}/><XAxis dataKey="month" tickLine={false} axisLine={false}/><YAxis tickLine={false} axisLine={false}/><Tooltip/><Area dataKey="actual" name="Actual" stroke="var(--color-primary)" fill="url(#moduleSpend)" strokeWidth={2}/><Area dataKey="planned" name="Planned" stroke="var(--color-chart-3)" fill="transparent" strokeWidth={1.5}/></AreaChart></ResponsiveContainer></div></Panel><Panel><h3 className="mb-4 text-sm font-semibold">Allocation by category</h3><div className="space-y-5">{[["Venue & site",82,"$184,200"],["Production",68,"$156,400"],["Food & beverage",55,"$118,600"],["Travel & staffing",38,"$74,300"]].map(([name,pct,amount])=><div key={String(name)}><div className="mb-1.5 flex justify-between text-[11px]"><span>{name}</span><span className="text-muted-foreground">{amount}</span></div><Progress value={Number(pct)} className="h-1.5"/></div>)}</div></Panel></div>}
      {module === "intelligence" && <Panel className="border-primary/20 bg-primary/[0.035]"><div className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-primary"/>Portfolio brief <Badge variant="outline">Demo AI</Badge></div><p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground">Across the sample portfolio, two budgets are trending above early estimates. Three production tasks need an owner this week, and one venue hold is approaching its review date. These are illustrative signals, not live AI analysis.</p><div className="mt-4 grid gap-3 sm:grid-cols-3">{["Review revised scenic estimate","Confirm festival load-in crew","Extend Glasshouse venue hold"].map((s,i)=><div key={s} className="rounded-lg border border-border bg-card p-3"><span className="text-[10px] text-muted-foreground">Suggested check 0{i+1}</span><p className="mt-1 text-xs font-medium">{s}</p></div>)}</div></Panel>}
      {module === "live-operations" && <Panel><div className="mb-4 flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"/><h3 className="text-sm font-semibold">Operations pulse</h3><span className="ml-auto text-[10px] text-muted-foreground">Simulated live view</span></div><div className="grid gap-3 sm:grid-cols-3">{[["Crew check-ins","86%"],["Open incidents","03"],["Radio channels","08 active"]].map(([a,b])=><div key={a} className="rounded-lg bg-secondary/60 p-3"><p className="text-[10px] text-muted-foreground">{a}</p><p className="mt-1 text-xl font-semibold">{b}</p></div>)}</div></Panel>}
      {module === "documents" && <Panel><div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"><div><h3 className="text-sm font-semibold">Document library</h3><p className="mt-1 text-[11px] text-muted-foreground">Upload is simulated; files are not sent to a server.</p></div><label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium hover:bg-secondary"><Plus className="h-3.5 w-3.5"/>Choose file<input type="file" className="hidden" onChange={e=>{if(e.target.files?.[0])toast.success(`${e.target.files[0].name} selected for this demo`);e.currentTarget.value="";}}/></label></div></Panel>}
      {module === "settings" && <Panel><div className="mb-4 flex flex-wrap gap-2"><Tabs value={tab} onValueChange={setTab}><TabsList>{["Overview","Team","Roles","Notifications"].map(t=><TabsTrigger key={t} value={t}>{t}</TabsTrigger>)}</TabsList></Tabs></div><div className="grid gap-3 sm:grid-cols-2">{(tab === "Overview" ? [["Organization name","Morrow Events"],["Workspace plan","Studio · Demo"],["Default timezone","America/Los_Angeles"],["Date format","MMM DD, YYYY"]] : tab === "Team" ? [["Active members","24"],["Pending invitations","3"],["Departments","5"],["Guest collaborators","8"]] : tab === "Roles" ? [["Owner","Full workspace control"],["Administrator","Manage settings and members"],["Manager","Manage assigned events"],["Coordinator","Assigned operational access"]] : [["Task reminders","Enabled · Demo"],["Budget approvals","Enabled · Demo"],["Daily digest","Disabled · Demo"],["Incident alerts","Enabled · Demo"]]).map(([a,b])=><div key={a} className="rounded-lg border border-border p-3"><p className="text-[10px] text-muted-foreground">{a}</p><p className="mt-1 text-xs font-semibold">{b}</p></div>)}</div><p className="mt-4 text-[10px] text-muted-foreground">Settings are local prototype controls only; no access policy or account setting is changed.</p></Panel>}
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-sm font-semibold">{module === "documents" ? "Recent files" : module === "vendors" ? "Partner directory" : module === "workforce" ? "Team assignments" : module === "sponsors" ? "Partnership portfolio" : module === "venues" ? "Venue & resource register" : module === "intelligence" ? "Signals to review" : module === "analytics" ? "Event performance" : module === "settings" ? "Workspace members" : module === "finance" ? "Budget line items" : "Operations log"}</h3><p className="mt-1 text-[10px] text-muted-foreground">{filtered.length} records · Sample workspace data</p></div><div className="flex items-center gap-2"><Select value={filter} onValueChange={setFilter}><SelectTrigger className="h-9 w-36 text-xs"><SelectValue placeholder="Filter status"/></SelectTrigger><SelectContent><SelectItem value="All">All statuses</SelectItem>{Array.from(new Set(rows.map(r=>r.status))).map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select><Button variant="outline" size="sm" className="h-9 text-xs" onClick={()=>toast.info("Filters applied to sample records")}>Filter</Button></div></div>
      <Table headers={visibleColumns} rows={filtered.map(rowCells)} onSelect={i=>setDetail(filtered[i])}/>
    </>}
    <p className="flex items-center gap-2 text-[10px] text-muted-foreground"><AlertTriangle className="h-3.5 w-3.5"/>Prototype mode · Changes are held in local page state and reset on refresh. No backend persistence.</p>
    <Dialog open={dialog} onOpenChange={setDialog}><DialogContent className="sm:max-w-[520px]"><DialogHeader><DialogTitle>Add {addLabel}</DialogTitle><DialogDescription>Create a sample record in this browser session. It will reset on refresh.</DialogDescription></DialogHeader><div className="grid gap-3 py-2"><Field label="Name" value={draft.name} onChange={v=>setDraft(p=>({...p,name:v}))} placeholder={`Enter ${addLabel} name`}/><Field label="Event / details" value={draft.detail} onChange={v=>setDraft(p=>({...p,detail:v}))} placeholder="Related event or context"/><div className="grid gap-3 sm:grid-cols-2"><Field label="Owner" value={draft.owner} onChange={v=>setDraft(p=>({...p,owner:v}))} placeholder="Assign an owner"/><Field label="Date" value={draft.date} onChange={v=>setDraft(p=>({...p,date:v}))} placeholder="Due date / date"/></div><div><label className="mb-1 block text-[11px] font-medium">Priority</label><Select value={draft.priority} onValueChange={v=>setDraft(p=>({...p,priority:v}))}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{["Low","Medium","High","Critical"].map(v=><SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div></div><DialogFooter><Button variant="outline" onClick={()=>setDialog(false)}>Cancel</Button><Button onClick={create}>Create {addLabel}</Button></DialogFooter></DialogContent></Dialog>
    <Dialog open={!!detail} onOpenChange={o=>!o&&setDetail(null)}><DialogContent className="sm:max-w-[500px]"><DialogHeader><DialogTitle>{detail?.name}</DialogTitle><DialogDescription>{detail?.detail}</DialogDescription></DialogHeader>{detail&&<div className="space-y-3 py-2"><div className="grid grid-cols-2 gap-3">{[["Owner",detail.owner],["Date / timing",detail.date],["Priority / value",detail.priority],["Current status",detail.status]].map(([a,b])=><div key={a} className="rounded-lg bg-secondary/60 p-3"><p className="text-[10px] text-muted-foreground">{a}</p><p className="mt-1 text-xs font-semibold">{b}</p></div>)}</div><div><label className="mb-1 block text-[11px] font-medium">Update status</label><Select value={detail.status} onValueChange={v=>updateStatus(detail,v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{["To do","In progress","Done","On track","Review due","Confirmed","Active","Complete","Resolved","Monitoring","In planning","Conflict","Current","Assigned","Preferred","Contracted"].map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div></div>}<DialogFooter><Button variant="outline" onClick={()=>setDetail(null)}>Close</Button></DialogFooter></DialogContent></Dialog>
  </div>;
}

function calendarCells(rows: Row[]) {
  const year = 2026;
  const month = 10; // November
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  return Array.from({ length: cellCount }, (_, index) => {
    const day = index - firstWeekday + 1;
    if (day < 1 || day > daysInMonth) return null;

    const dueTasks = rows.filter(row => {
      const parsed = new Date(`${row.date}, ${year}`);
      return !Number.isNaN(parsed.getTime())
        && parsed.getMonth() === month
        && parsed.getDate() === day;
    });
    return { day, tasks: dueTasks };
  });
}

function Field({label,value,onChange,placeholder}:{label:string;value:string;onChange:(v:string)=>void;placeholder:string}) { return <div><label className="mb-1 block text-[11px] font-medium">{label}</label><Input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="h-9 text-xs"/></div>; }
function Table({headers,rows,onSelect}:{headers:string[];rows:string[][];onSelect:(index:number)=>void}) { return <div className="w-full overflow-x-auto rounded-xl border border-border"><table className="w-full min-w-[760px] border-collapse text-left"><thead><tr className="bg-secondary/65">{headers.map(h=><th key={h} className="px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={`${r[0]}-${i}`} onClick={()=>onSelect(i)} className="cursor-pointer border-t border-border/70 transition hover:bg-secondary/30">{r.map((c,j)=><td key={j} className={`px-3 py-3.5 text-[11px] ${j===0?"font-semibold text-foreground":"text-muted-foreground"}`}>{j===4?<Pill>{c}</Pill>:c}</td>)}</tr>)}{!rows.length&&<tr><td colSpan={headers.length} className="px-4 py-12 text-center text-xs text-muted-foreground">No records match your search or filters.</td></tr>}</tbody></table></div>; }
