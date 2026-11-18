import { useId, useMemo, useState } from "react";
import {
  Activity,
  ArrowDownToLine,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CreditCard,
  FileText,
  GraduationCap,
  Megaphone,
  Pencil,
  Plus,
  Receipt,
  Settings2,
  ShieldCheck,
  Trash2,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AdminTab =
  | "Organizations"
  | "Users"
  | "Events"
  | "Workshops"
  | "Vendors"
  | "Subscriptions"
  | "Payments"
  | "Activity"
  | "Reports"
  | "Content"
  | "Settings";

type AdminRecord = {
  id: string;
  name: string;
  type: string;
  owner: string;
  date: string;
  amount: string;
  status: string;
  detail: string;
};

type AdminField = { key: keyof AdminRecord; label: string };

const tabItems: { value: AdminTab; label: string; icon: LucideIcon }[] = [
  { value: "Organizations", label: "Organizations", icon: Building2 },
  { value: "Users", label: "Users", icon: Users },
  { value: "Events", label: "Events", icon: CalendarDays },
  { value: "Workshops", label: "Workshops", icon: GraduationCap },
  { value: "Vendors", label: "Vendors", icon: BriefcaseBusiness },
  { value: "Subscriptions", label: "Subscriptions", icon: CreditCard },
  { value: "Payments", label: "Payments", icon: Wallet },
  { value: "Activity", label: "Activity", icon: Activity },
  { value: "Reports", label: "Reports", icon: FileText },
  { value: "Content", label: "Content management", icon: Megaphone },
  { value: "Settings", label: "Settings", icon: Settings2 },
];

const columns: Record<Exclude<AdminTab, "Activity" | "Reports" | "Settings">, AdminField[]> = {
  Organizations: [
    { key: "name", label: "Organization" },
    { key: "type", label: "Plan" },
    { key: "amount", label: "Members" },
    { key: "date", label: "Joined" },
    { key: "detail", label: "Location" },
    { key: "status", label: "Status" },
  ],
  Users: [
    { key: "name", label: "User" },
    { key: "type", label: "Role" },
    { key: "detail", label: "Organization" },
    { key: "date", label: "Last active" },
    { key: "owner", label: "Email" },
    { key: "status", label: "Status" },
  ],
  Events: [
    { key: "name", label: "Event" },
    { key: "type", label: "Format" },
    { key: "date", label: "Event date" },
    { key: "detail", label: "Organization" },
    { key: "amount", label: "Budget" },
    { key: "status", label: "Status" },
  ],
  Workshops: [
    { key: "name", label: "Workshop" },
    { key: "type", label: "Category" },
    { key: "date", label: "Date" },
    { key: "detail", label: "Venue" },
    { key: "amount", label: "Registrations" },
    { key: "status", label: "Status" },
  ],
  Vendors: [
    { key: "name", label: "Vendor" },
    { key: "type", label: "Category" },
    { key: "owner", label: "Contact" },
    { key: "detail", label: "Engagement" },
    { key: "amount", label: "Rating" },
    { key: "status", label: "Status" },
  ],
  Subscriptions: [
    { key: "name", label: "Organization" },
    { key: "type", label: "Plan" },
    { key: "detail", label: "Billing cycle" },
    { key: "date", label: "Renewal" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
  ],
  Payments: [
    { key: "name", label: "Reference" },
    { key: "detail", label: "Organization" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
    { key: "type", label: "Method" },
    { key: "status", label: "Status" },
  ],
  Content: [
    { key: "name", label: "Content item" },
    { key: "type", label: "Type" },
    { key: "owner", label: "Owner" },
    { key: "date", label: "Updated" },
    { key: "detail", label: "Channel" },
    { key: "status", label: "Status" },
  ],
};

const initialRecords: Record<Exclude<AdminTab, "Activity" | "Reports" | "Settings">, AdminRecord[]> = {
  Organizations: [
    { id: "org-1", name: "Ahmedabad Cultural Collective", type: "Studio", amount: "24", date: "Nov 2026", detail: "Ahmedabad", status: "Active", owner: "" },
    { id: "org-2", name: "Jaipur Wedding Studio", type: "Enterprise", amount: "68", date: "Sep 2025", detail: "Jaipur", status: "Active", owner: "" },
    { id: "org-3", name: "Mumbai Event Productions", type: "Studio", amount: "16", date: "Jan 2026", detail: "Mumbai", status: "Review due", owner: "" },
    { id: "org-4", name: "Bengaluru Innovation Forum", type: "Team", amount: "9", date: "Mar 2026", detail: "Bengaluru", status: "Active", owner: "" },
    { id: "org-5", name: "Delhi Corporate Experiences", type: "Team", amount: "12", date: "Jun 2026", detail: "Delhi", status: "Active", owner: "" },
  ],
  Users: [
    { id: "user-1", name: "Meera Shah", type: "Workspace admin", detail: "Ahmedabad Cultural Collective", date: "Today, 10:42 AM", owner: "meera.shah@example.com", amount: "", status: "Active" },
    { id: "user-2", name: "Aarav Mehta", type: "Event manager", detail: "Bengaluru Innovation Forum", date: "Today, 9:18 AM", owner: "aarav.mehta@example.com", amount: "", status: "Active" },
    { id: "user-3", name: "Priya Shah", type: "Finance manager", detail: "Mumbai Event Productions", date: "Yesterday", owner: "priya.shah@example.com", amount: "", status: "Active" },
    { id: "user-4", name: "Kabir Nair", type: "Coordinator", detail: "Jaipur Wedding Studio", date: "Nov 15, 2026", owner: "kabir.nair@example.com", amount: "", status: "Invited" },
    { id: "user-5", name: "Ananya Rao", type: "Vendor manager", detail: "Delhi Corporate Experiences", date: "Nov 14, 2026", owner: "ananya.rao@example.com", amount: "", status: "Suspended" },
  ],
  Events: [
    { id: "event-1", name: "Ahmedabad Navratri Nights", type: "Festival", date: "Oct 24, 2026", detail: "Ahmedabad Cultural Collective", amount: "₹2,48,00,000", status: "Completed", owner: "" },
    { id: "event-2", name: "Jaipur Palace Wedding", type: "Wedding", date: "Nov 08, 2026", detail: "Jaipur Wedding Studio", amount: "₹86,50,000", status: "Completed", owner: "" },
    { id: "event-3", name: "Bengaluru Innovation Forum", type: "Conference", date: "Nov 19, 2026", detail: "Bengaluru Innovation Forum", amount: "₹1,24,00,000", status: "Confirmed", owner: "" },
    { id: "event-4", name: "Mumbai Diwali Leadership Summit", type: "Corporate event", date: "Dec 05, 2026", detail: "Mumbai Event Productions", amount: "₹3,10,00,000", status: "At risk", owner: "" },
    { id: "event-5", name: "Delhi University Spring Utsav", type: "College festival", date: "Jan 16, 2027", detail: "Delhi Corporate Experiences", amount: "₹1,74,00,000", status: "In planning", owner: "" },
  ],
  Workshops: [
    { id: "workshop-1", name: "Event Production Masterclass", type: "Professional training", date: "Dec 12, 2026", detail: "Ahmedabad · In person", amount: "24 / 32", status: "Registration open", owner: "Utsav Learning Team" },
    { id: "workshop-2", name: "Wedding Operations Workshop", type: "Wedding planning", date: "Jan 09, 2027", detail: "Mumbai · In person", amount: "0 / 24", status: "Draft", owner: "Utsav Learning Team" },
    { id: "workshop-3", name: "Festival Safety & Crowd Planning", type: "Live events", date: "Jan 22, 2027", detail: "Online", amount: "67 / 100", status: "Registration open", owner: "Utsav Learning Team" },
  ],
  Vendors: [
    { id: "vendor-1", name: "Aangan Hospitality", type: "Catering", date: "12 events", detail: "Preferred partner", amount: "4.9 / 5", status: "Preferred", owner: "Priya Shah" },
    { id: "vendor-2", name: "Rangmanch Productions", type: "AV & Production", date: "8 events", detail: "Production partner", amount: "4.8 / 5", status: "Contracted", owner: "Kabir Nair" },
    { id: "vendor-3", name: "Phool & Patta Studio", type: "Floral & Decor", date: "6 events", detail: "Design partner", amount: "4.7 / 5", status: "Preferred", owner: "Ananya Rao" },
    { id: "vendor-4", name: "Saarthi Guest Travel", type: "Transport", date: "4 events", detail: "Travel partner", amount: "4.6 / 5", status: "Review due", owner: "Rafi Khan" },
  ],
  Subscriptions: [
    { id: "sub-1", name: "Ahmedabad Cultural Collective", type: "Studio", date: "Dec 01, 2026", detail: "Annual", amount: "₹59,988 / year", status: "Active", owner: "" },
    { id: "sub-2", name: "Jaipur Wedding Studio", type: "Enterprise", date: "Dec 15, 2026", detail: "Annual", amount: "₹1,79,988 / year", status: "Active", owner: "" },
    { id: "sub-3", name: "Mumbai Event Productions", type: "Studio", date: "Nov 28, 2026", detail: "Monthly", amount: "₹4,999 / month", status: "Payment due", owner: "" },
    { id: "sub-4", name: "Bengaluru Innovation Forum", type: "Team", date: "Jan 04, 2027", detail: "Annual", amount: "₹29,988 / year", status: "Active", owner: "" },
  ],
  Payments: [
    { id: "pay-1", name: "UTS-2026-1048", type: "UPI", date: "Nov 17, 2026", detail: "Ahmedabad Cultural Collective", amount: "₹4,999", status: "Paid", owner: "" },
    { id: "pay-2", name: "UTS-2026-1047", type: "Bank transfer", date: "Nov 16, 2026", detail: "Jaipur Wedding Studio", amount: "₹14,999", status: "Paid", owner: "" },
    { id: "pay-3", name: "UTS-2026-1046", type: "UPI", date: "Nov 15, 2026", detail: "Mumbai Event Productions", amount: "₹4,999", status: "Pending", owner: "" },
    { id: "pay-4", name: "UTS-2026-1045", type: "Bank transfer", date: "Nov 12, 2026", detail: "Bengaluru Innovation Forum", amount: "₹29,988", status: "Paid", owner: "" },
  ],
  Content: [
    { id: "content-1", name: "Homepage hero message", type: "Website banner", date: "Nov 16, 2026", detail: "Public website", amount: "", status: "Published", owner: "Utsav team" },
    { id: "content-2", name: "Workshop registration guide", type: "Help article", date: "Nov 14, 2026", detail: "Help centre", amount: "", status: "Draft", owner: "Utsav team" },
    { id: "content-3", name: "Platform feature overview", type: "Product page", date: "Nov 12, 2026", detail: "Public website", amount: "", status: "Review", owner: "Marketing" },
  ],
};

const tabNouns: Record<AdminTab, string> = {
  Organizations: "organization",
  Users: "user",
  Events: "event",
  Workshops: "workshop",
  Vendors: "vendor",
  Subscriptions: "subscription",
  Payments: "payment",
  Activity: "activity item",
  Reports: "report",
  Content: "content item",
  Settings: "setting",
};

const initialActivity = [
  { id: "activity-1", title: "New organization added", detail: "Ahmedabad Cultural Collective was provisioned in the demo workspace.", time: "12 min ago", actor: "Platform admin" },
  { id: "activity-2", title: "Subscription payment received", detail: "₹14,999 received from Jaipur Wedding Studio.", time: "48 min ago", actor: "Billing demo" },
  { id: "activity-3", title: "Workshop updated", detail: "Festival Safety & Crowd Planning registration is open.", time: "2 hrs ago", actor: "Utsav Learning Team" },
  { id: "activity-4", title: "Content sent for review", detail: "Platform feature overview is waiting for review.", time: "Yesterday", actor: "Marketing" },
];

const statusClass = (status: string) => {
  const value = status.toLowerCase();
  if (["active", "paid", "published", "preferred", "completed", "confirmed", "registration open"].includes(value)) {
    return "border-emerald-700/15 bg-emerald-700/10 text-emerald-800";
  }
  if (["at risk", "review due", "payment due", "pending", "review"].includes(value)) {
    return "border-amber-700/15 bg-amber-700/10 text-amber-800";
  }
  if (["suspended", "cancelled"].includes(value)) {
    return "border-rose-700/15 bg-rose-700/10 text-rose-800";
  }
  return "border-border bg-secondary text-muted-foreground";
};

function isTableTab(value: AdminTab): value is keyof typeof columns {
  return Object.prototype.hasOwnProperty.call(columns, value);
}

const emptyDraft = (): Omit<AdminRecord, "id"> => ({
  name: "",
  type: "",
  owner: "",
  date: "",
  amount: "",
  status: "Active",
  detail: "",
});

export function AdminPage({ search }: { search: string }) {
  const [tab, setTab] = useState<AdminTab>("Organizations");
  const [records, setRecords] = useState(initialRecords);
  const [activity, setActivity] = useState(initialActivity);
  const [filter, setFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<AdminRecord, "id">>(emptyDraft());
  const [settings, setSettings] = useState({ maintenance: false, newOrgAlerts: true, paymentAlerts: true, weeklyDigest: false });

  const tableTabs = Object.keys(columns) as (keyof typeof columns)[];
  const currentRows = tableTabs.includes(tab as keyof typeof columns)
    ? records[tab as keyof typeof columns]
    : [];
  const filteredRows = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return currentRows.filter((row) => {
      const matchesSearch = !needle || Object.values(row).join(" ").toLowerCase().includes(needle);
      const matchesFilter = filter === "All" || row.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [currentRows, filter, search]);

  const activeOrganizations = records.Organizations.filter((row) => row.status === "Active").length;
  const activeUsers = records.Users.filter((row) => row.status === "Active").length;
  const activeSubscriptions = records.Subscriptions.filter((row) => row.status === "Active").length;
  const paidRecords = records.Payments.filter((row) => row.status === "Paid");
  const collectedPayments = paidRecords.reduce((total, row) => total + Number(row.amount.replace(/[^0-9]/g, "")), 0);
  const formattedCollections = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(collectedPayments);

  function addActivity(title: string, detail: string) {
    setActivity((items) => [
      { id: `activity-${Date.now()}`, title, detail, time: "Just now", actor: "Platform admin" },
      ...items,
    ]);
  }

  function openCreate() {
    setEditingId(null);
    setDraft(emptyDraft());
    setDialogOpen(true);
  }

  function openEdit(row: AdminRecord) {
    setEditingId(row.id);
    const { id: _id, ...values } = row;
    setDraft(values);
    setDialogOpen(true);
  }

  function saveRecord() {
    if (!isTableTab(tab)) return;
    if (!draft.name.trim()) {
      toast.error("Add a name before saving this record.");
      return;
    }
    const record: AdminRecord = { ...draft, id: editingId ?? `${tab.toLowerCase()}-${Date.now()}` };
    setRecords((current) => ({
      ...current,
      [tab]: editingId
        ? current[tab as keyof typeof columns].map((row) => row.id === editingId ? record : row)
        : [record, ...current[tab as keyof typeof columns]],
    }));
    addActivity(`${tabNouns[tab]} ${editingId ? "updated" : "created"}`, `${record.name} ${editingId ? "was updated" : "was added"} in the demo admin workspace.`);
    toast.success(`${tabNouns[tab]} ${editingId ? "updated" : "added"} in this demo session.`);
    setDialogOpen(false);
  }

  function deleteRecord(row: AdminRecord) {
    if (!isTableTab(tab)) return;
    if (!window.confirm(`Delete "${row.name}" from this demo session?`)) return;
    setRecords((current) => ({
      ...current,
      [tab]: current[tab as keyof typeof columns].filter((item) => item.id !== row.id),
    }));
    addActivity(`${tab.slice(0, -1)} removed`, `${row.name} was removed from the demo admin workspace.`);
    toast.success("Record removed from this demo session.");
  }

  function exportRows(rows: AdminRecord[], headers: AdminField[], filename: string) {
    const csv = [
      headers.map((field) => field.label),
      ...rows.map((row) => headers.map((field) => row[field.key])),
    ]
      .map((line) => line.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success("CSV export downloaded.");
  }

  function handleTabChange(value: string) {
    setTab(value as AdminTab);
    setFilter("All");
  }

  const activeConfig = tableTabs.includes(tab as keyof typeof columns)
    ? columns[tab as keyof typeof columns]
    : [];
  const statusOptions = Array.from(new Set(currentRows.map((row) => row.status)));
  const showTable = tableTabs.includes(tab as keyof typeof columns);

  return (
    <div className="space-y-7">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">Platform administration · Demo environment</p>
          <h1 className="text-[26px] font-semibold tracking-[-0.6px] md:text-[30px]">A view across every team.</h1>
          <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">Manage organizations, users, events, workshops, vendors, subscriptions and platform content from one workspace.</p>
        </div>
        <div className="flex items-center gap-2">
          {showTable && <Button className="h-9 rounded-sm text-xs" onClick={openCreate}><Plus className="mr-1.5 h-3.5 w-3.5" /> Add {tabNouns[tab]}</Button>}
        </div>
      </div>

      <div className="grid gap-3 border-y border-border py-5 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMetric icon={Building2} label="Organizations" value={String(records.Organizations.length)} note={`${activeOrganizations} active`} />
        <AdminMetric icon={Users} label="Active users" value={String(activeUsers)} note={`${records.Users.length} sample accounts`} />
        <AdminMetric icon={CreditCard} label="Subscriptions" value={String(records.Subscriptions.length)} note={`${activeSubscriptions} active`} />
        <AdminMetric icon={Wallet} label="Paid transactions" value={String(paidRecords.length)} note={`${formattedCollections} collected in demo` } />
      </div>

      <div className="space-y-4">
        <div className="overflow-x-auto pb-1">
          <Tabs value={tab} onValueChange={handleTabChange}>
            <TabsList className="h-auto w-max min-w-full justify-start gap-1 rounded-lg bg-secondary/70 p-1">
              {tabItems.map(({ value, label, icon: Icon }) => (
                <TabsTrigger key={value} value={value} className="h-9 gap-1.5 px-3 text-[11px]">
                  <Icon className="h-3.5 w-3.5" />{label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {showTable && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold">{tab} directory</h2>
              <p className="mt-1 text-[10px] text-muted-foreground">{filteredRows.length} of {currentRows.length} records · Sample workspace data</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="h-9 w-[150px] text-xs"><SelectValue placeholder="Filter status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All statuses</SelectItem>
                  {statusOptions.map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-9 text-xs" onClick={() => exportRows(filteredRows, activeConfig, `utsav-${tab.toLowerCase()}.csv`)}>
                <ArrowDownToLine className="mr-1.5 h-3.5 w-3.5" /> Export CSV
              </Button>
            </div>
          </div>
        )}

        {showTable && (
          <div className="overflow-x-auto rounded-xl border border-border/80 bg-card">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead><tr className="bg-secondary/60">{activeConfig.map((field) => <th key={field.key} className="px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">{field.label}</th>)}<th className="px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Actions</th></tr></thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="border-t border-border/70 transition-colors hover:bg-secondary/25">
                    {activeConfig.map((field) => (
                      <td key={field.key} className={`px-3 py-3.5 text-[11px] ${field.key === "name" ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                        {field.key === "status" ? <Badge variant="outline" className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${statusClass(row.status)}`}>{row.status}</Badge> : row[field.key] || "—"}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Edit ${row.name}`} onClick={() => openEdit(row)}><Pencil className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" aria-label={`Delete ${row.name}`} onClick={() => deleteRecord(row)}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && <tr><td colSpan={activeConfig.length + 1} className="px-4 py-12 text-center text-xs text-muted-foreground">No records match the current search and filter.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Activity" && <ActivityPanel activity={activity} search={search} />}
        {tab === "Reports" && <ReportsPanel records={records} onExport={exportRows} />}
        {tab === "Content" && <ContentPanel records={records.Content.filter((row) => !search.trim() || Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase()))} onEdit={openEdit} onCreate={openCreate} onDelete={deleteRecord} />}
        {tab === "Settings" && <SettingsPanel settings={settings} onChange={setSettings} />}
      </div>

      <p className="flex items-center gap-2 text-[10px] text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" /> Sample platform data · Admin controls are simulated and are not security boundaries. Changes reset on refresh.</p>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle>{editingId ? `Edit ${tabNouns[tab]}` : `Add ${tabNouns[tab]}`}</DialogTitle>
            <DialogDescription>Changes apply to this local demo session only. No server data is changed.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2 sm:grid-cols-2">
            <AdminFieldInput className="sm:col-span-2" label="Name / title" value={draft.name} onChange={(value) => setDraft((current) => ({ ...current, name: value }))} placeholder="Enter a name" />
            <AdminFieldInput label="Category / role / plan" value={draft.type} onChange={(value) => setDraft((current) => ({ ...current, type: value }))} placeholder="e.g. Studio, Admin, Festival" />
            <AdminFieldInput label="Owner / contact / email" value={draft.owner} onChange={(value) => setDraft((current) => ({ ...current, owner: value }))} placeholder="Contact or owner" />
            <AdminFieldInput label="Date / renewal" value={draft.date} onChange={(value) => setDraft((current) => ({ ...current, date: value }))} placeholder="e.g. Dec 10, 2026" />
            <AdminFieldInput label="Amount / count / members" value={draft.amount} onChange={(value) => setDraft((current) => ({ ...current, amount: value }))} placeholder="Use ₹ for currency" />
            <AdminFieldInput className="sm:col-span-2" label="Organization / venue / detail" value={draft.detail} onChange={(value) => setDraft((current) => ({ ...current, detail: value }))} placeholder="Add relevant context" />
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-[11px] font-medium">Status</label>
              <Select value={draft.status} onValueChange={(value) => setDraft((current) => ({ ...current, status: value }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Active", "Invited", "Suspended", "Completed", "Confirmed", "At risk", "In planning", "Draft", "Registration open", "Preferred", "Contracted", "Review due", "Payment due", "Paid", "Pending", "Published", "Review"].map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveRecord}>{editingId ? "Save changes" : "Create record"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AdminMetric({ icon: Icon, label, value, note }: { icon: LucideIcon; label: string; value: string; note: string }) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-4 shadow-[0_2px_12px_rgba(38,32,24,0.035)]">
      <div className="flex items-center justify-between gap-2"><span className="text-[11px] font-medium text-muted-foreground">{label}</span><span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-muted-foreground"><Icon className="h-4 w-4" /></span></div>
      <strong className="mt-3 block text-[25px] font-semibold tracking-[-0.8px]">{value}</strong>
      <span className="text-[10px] text-muted-foreground">{note}</span>
    </div>
  );
}

function AdminFieldInput({ label, value, onChange, placeholder, className = "" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; className?: string }) {
  const inputId = useId();
  return <div className={className}><label htmlFor={inputId} className="mb-1.5 block text-[11px] font-medium">{label}</label><Input id={inputId} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-9 text-xs" /></div>;
}

function ActivityPanel({ activity, search }: { activity: typeof initialActivity; search: string }) {
  const filtered = activity.filter((item) => `${item.title} ${item.detail} ${item.actor}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5">
      <div className="mb-4"><h2 className="text-sm font-semibold">Platform activity</h2><p className="mt-1 text-[10px] text-muted-foreground">Recent simulated administrative activity.</p></div>
      <div className="divide-y divide-border/70">
        {filtered.map((item) => <div key={item.id} className="flex gap-3 py-4 first:pt-1"><span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary"><Activity className="h-4 w-4" /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs font-semibold">{item.title}</p><span className="text-[10px] text-muted-foreground">{item.time}</span></div><p className="mt-1 text-[11px] text-muted-foreground">{item.detail}</p><p className="mt-1 text-[10px] text-muted-foreground">By {item.actor}</p></div></div>)}
        {filtered.length === 0 && <p className="py-10 text-center text-xs text-muted-foreground">No activity matches your search.</p>}
      </div>
    </div>
  );
}

function ReportsPanel({ records, onExport }: { records: typeof initialRecords; onExport: (rows: AdminRecord[], headers: AdminField[], filename: string) => void }) {
  const reportCards = [
    { title: "Organization directory", detail: "Plans, member counts and organization status.", tab: "Organizations" as const, icon: Building2 },
    { title: "User access register", detail: "Workspace roles, invitations and account status.", tab: "Users" as const, icon: Users },
    { title: "Event portfolio", detail: "Event formats, budgets, owners and delivery status.", tab: "Events" as const, icon: CalendarDays },
    { title: "Subscription register", detail: "Plans, renewals, billing cycles and amounts.", tab: "Subscriptions" as const, icon: CreditCard },
    { title: "Payment register", detail: "Transaction references, amounts and collection status.", tab: "Payments" as const, icon: Receipt },
    { title: "Vendor directory", detail: "Partner categories, engagement and review status.", tab: "Vendors" as const, icon: BriefcaseBusiness },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {reportCards.map(({ title, detail, tab, icon: Icon }) => <div key={title} className="rounded-xl border border-border/80 bg-card p-4"><span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-primary"><Icon className="h-4 w-4" /></span><h3 className="mt-3 text-sm font-semibold">{title}</h3><p className="mt-1 min-h-8 text-[11px] leading-relaxed text-muted-foreground">{detail}</p><Button variant="outline" size="sm" className="mt-4 h-8 text-[10px]" onClick={() => onExport(records[tab], columns[tab], `utsav-${tab.toLowerCase()}-report.csv`)}><ArrowDownToLine className="mr-1.5 h-3.5 w-3.5" />Download CSV</Button></div>)}
    </div>
  );
}

function ContentPanel({ records, onEdit, onCreate, onDelete }: { records: AdminRecord[]; onEdit: (row: AdminRecord) => void; onCreate: () => void; onDelete: (row: AdminRecord) => void }) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-sm font-semibold">Content management</h2><p className="mt-1 text-[10px] text-muted-foreground">Review demo website and help-centre content records.</p></div><Button size="sm" className="h-8 text-[10px]" onClick={onCreate}><Plus className="mr-1 h-3.5 w-3.5" />Add content</Button></div>
      <div className="divide-y divide-border/70">{records.map((row) => <div key={row.id} className="flex flex-wrap items-center gap-3 py-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-primary"><BookOpen className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{row.name}</p><p className="mt-1 text-[10px] text-muted-foreground">{row.type} · {row.detail} · Updated {row.date}</p></div><Badge variant="outline" className={`text-[10px] ${statusClass(row.status)}`}>{row.status}</Badge><div className="flex items-center gap-1"><Button size="sm" variant="outline" className="h-8 text-[10px]" onClick={() => onEdit(row)}><Pencil className="mr-1 h-3 w-3" />Edit</Button><Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" aria-label={`Delete ${row.name}`} onClick={() => onDelete(row)}><Trash2 className="h-3.5 w-3.5" /></Button></div></div>)}{records.length === 0 && <p className="py-10 text-center text-xs text-muted-foreground">No content records match your search.</p>}</div>
    </div>
  );
}

function SettingsPanel({ settings, onChange }: { settings: { maintenance: boolean; newOrgAlerts: boolean; paymentAlerts: boolean; weeklyDigest: boolean }; onChange: (next: { maintenance: boolean; newOrgAlerts: boolean; paymentAlerts: boolean; weeklyDigest: boolean }) => void }) {
  const groups = [
    { key: "maintenance" as const, title: "Maintenance mode", description: "Store a local maintenance-mode preference for this demo session." },
    { key: "newOrgAlerts" as const, title: "New organization alerts", description: "Store a local preference for new-organization alerts." },
    { key: "paymentAlerts" as const, title: "Payment notifications", description: "Store a local preference for payment notifications." },
    { key: "weeklyDigest" as const, title: "Weekly platform digest", description: "Store a local preference for a weekly platform digest." },
  ];
  return (
    <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5">
      <div className="mb-4"><h2 className="text-sm font-semibold">Platform settings</h2><p className="mt-1 text-[10px] text-muted-foreground">Local demonstration controls only. These switches do not change production settings.</p></div>
      <div className="divide-y divide-border/70">{groups.map((item) => <div key={item.key} className="flex items-center justify-between gap-4 py-4 first:pt-1"><div><p className="text-xs font-semibold">{item.title}</p><p className="mt-1 max-w-xl text-[10px] leading-relaxed text-muted-foreground">{item.description}</p></div><Switch checked={settings[item.key]} onCheckedChange={(checked) => { onChange({ ...settings, [item.key]: checked }); toast.success(`${item.title} ${checked ? "enabled" : "disabled"} in this demo.`); }} /></div>)}</div>
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-secondary/60 p-3 text-[10px] leading-relaxed text-muted-foreground"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />Platform configuration is simulated in browser state and resets on refresh. No security, billing or notification service is connected.</div>
    </div>
  );
}
