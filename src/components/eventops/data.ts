
import {
  Activity,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  ContactRound,
  FileText,
  Handshake,
  Landmark,
  LayoutDashboard,
  Settings2,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type ModuleItem = {
  label: string;
  slug: string;
  icon: LucideIcon;
};

export const modules: ModuleItem[] = [
  { label: "Overview", slug: "overview", icon: LayoutDashboard },
  { label: "Events", slug: "events", icon: CalendarDays },
  { label: "Planning & Tasks", slug: "planning", icon: ClipboardList },
  { label: "Vendors", slug: "vendors", icon: BriefcaseBusiness },
  { label: "Finance", slug: "finance", icon: Wallet },
  { label: "Workforce", slug: "workforce", icon: ContactRound },
  { label: "Sponsors", slug: "sponsors", icon: Handshake },
  { label: "Venues & Resources", slug: "venues", icon: Landmark },
  { label: "Live Operations", slug: "live-operations", icon: Activity },
  { label: "AI Intelligence", slug: "intelligence", icon: Sparkles },
  { label: "Analytics & Reports", slug: "analytics", icon: BarChart3 },
  { label: "Documents", slug: "documents", icon: FileText },
  { label: "Settings", slug: "settings", icon: Settings2 },
];

// Demo events
export const events = [
  {
    name: "Northstar Product Summit",
    type: "Conference",
    date: "Oct 24, 2026",
    venue: "Pier 27 · San Francisco",
    status: "Completed",
    budget: "$248,000",
    progress: 100,
  },
  {
    name: "Fieldnotes Founders Dinner",
    type: "Gala dinner",
    date: "Nov 08, 2026",
    venue: "The Foundry · New York",
    status: "Completed",
    budget: "$86,500",
    progress: 100,
  },
  {
    name: "Goodwood Partner Forum",
    type: "Partner forum",
    date: "Nov 19, 2026",
    venue: "The Hoxton · London",
    status: "Confirmed",
    budget: "$124,000",
    progress: 91,
  },
  {
    name: "Common Ground Festival",
    type: "Public festival",
    date: "Dec 05, 2026",
    venue: "Crissy Field · San Francisco",
    status: "At risk",
    budget: "$310,000",
    progress: 36,
  },
  {
    name: "Morrow Annual Meeting",
    type: "Company meeting",
    date: "Jan 16, 2027",
    venue: "The Glasshouse · New York",
    status: "In planning",
    budget: "$174,000",
    progress: 24,
  },
];

// Demo tasks
export const tasks = [
  {
    title: "Finalize speaker presentation materials",
    event: "Goodwood Partner Forum",
    owner: "Maya Chen",
    due: "Nov 16",
    status: "In progress",
    priority: "High",
  },
  {
    title: "Confirm final guest arrangements",
    event: "Goodwood Partner Forum",
    owner: "Alex Morgan",
    due: "Nov 17",
    status: "To do",
    priority: "Medium",
  },
  {
    title: "Resolve lighting and production risks",
    event: "Common Ground Festival",
    owner: "Jordan Lee",
    due: "Nov 18",
    status: "In progress",
    priority: "High",
  },
  {
    title: "Submit sponsor activation plan",
    event: "Goodwood Partner Forum",
    owner: "Sam Rivera",
    due: "Nov 19",
    status: "Done",
    priority: "Low",
  },
  {
    title: "Complete initial event timeline",
    event: "Morrow Annual Meeting",
    owner: "Maya Chen",
    due: "Nov 20",
    status: "To do",
    priority: "Medium",
  },
];

// Demo vendors
export const vendors = [
  {
    name: "Gather & Grain",
    category: "Catering",
    contact: "Lena Morris",
    rating: "4.9",
    events: "12 events",
    status: "Preferred",
  },
  {
    name: "Northline Production",
    category: "AV & Production",
    contact: "Theo James",
    rating: "4.8",
    events: "8 events",
    status: "Contracted",
  },
  {
    name: "Petal & Stem Studio",
    category: "Floral & Decor",
    contact: "Camille Reed",
    rating: "4.7",
    events: "6 events",
    status: "Preferred",
  },
  {
    name: "Goodway Guest Travel",
    category: "Transport",
    contact: "Rafi Khan",
    rating: "4.6",
    events: "4 events",
    status: "Review due",
  },
  {
    name: "Studio Lantern",
    category: "Photography",
    contact: "Nina Park",
    rating: "4.9",
    events: "9 events",
    status: "Contracted",
  },
];

// Demo activity feed
export const activities = [
  {
    who: "Maya Chen",
    action: "updated the speaker presentation materials",
    event: "Goodwood Partner Forum",
    time: "12 min ago",
    initials: "MC",
  },
  {
    who: "Jordan Lee",
    action: "flagged 2 production risks",
    event: "Common Ground Festival",
    time: "48 min ago",
    initials: "JL",
  },
  {
    who: "Alex Morgan",
    action: "updated the guest arrangements",
    event: "Goodwood Partner Forum",
    time: "2 hrs ago",
    initials: "AM",
  },
  {
    who: "Sam Rivera",
    action: "completed a sponsor deliverable",
    event: "Goodwood Partner Forum",
    time: "Yesterday",
    initials: "SR",
  },
];

// Budget values are in thousands of USD ($K).
export const budgetSeries = [
  { month: "Jun", planned: 38, actual: 31 },
  { month: "Jul", planned: 46, actual: 42 },
  { month: "Aug", planned: 54, actual: 49 },
  { month: "Sep", planned: 69, actual: 62 },
  { month: "Oct", planned: 78, actual: 73 },
  { month: "Nov", planned: 92, actual: 85 },
];

// Module descriptions
export const moduleDescriptions: Record<string, string> = {
  events: "Every detail, in one place.",
  planning: "Turn the run of show into a plan the whole team can trust.",
  vendors: "Build a better bench of partners and keep every commitment visible.",
  finance: "See the whole picture, from the first estimate to final reconciliation.",
  workforce: "The right people, in the right place, at the right time.",
  sponsors: "Deliver every partnership promise with confidence.",
  venues: "Make every venue, space and resource work harder.",
  "live-operations": "A calm, shared view of what is happening right now.",
  intelligence: "Useful signals from the work already in motion.",
  analytics: "A clearer view of performance across your portfolio.",
  documents: "The latest version, exactly where your team expects it.",
  settings: "Your organization, team, and working preferences.",
};

// Module icon references
export const moduleIcons = {
  CalendarDays,
  ClipboardList,
  BriefcaseBusiness,
  Wallet,
  ContactRound,
  Handshake,
  Landmark,
  Activity,
  Sparkles,
  BarChart3,
  FileText,
  Settings2,
};
