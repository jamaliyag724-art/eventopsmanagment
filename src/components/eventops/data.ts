import {
  Activity, BarChart3, BriefcaseBusiness, CalendarDays, ClipboardList, GraduationCap,
  ContactRound, FileText, Handshake, Landmark, LayoutDashboard,
  Settings2, Sparkles, Wallet, type LucideIcon,
} from "lucide-react";

export type ModuleItem = { label: string; slug: string; icon: LucideIcon };
export const modules: ModuleItem[] = [
  { label: "Overview", slug: "overview", icon: LayoutDashboard },
  { label: "Events", slug: "events", icon: CalendarDays },
  { label: "Planning & Tasks", slug: "planning", icon: ClipboardList },
  { label: "Workshops", slug: "workshops", icon: GraduationCap },
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

export const events = [
  { name: "Ahmedabad Navratri Nights", type: "Festival", coverImageKey: "navratri", date: "Oct 24, 2026", venue: "Riverfront Grounds · Ahmedabad", status: "Completed", budget: "₹2,48,00,000", progress: 100 },
  { name: "Jaipur Palace Wedding", type: "Wedding", coverImageKey: "wedding", date: "Nov 08, 2026", venue: "Rambagh Palace · Jaipur", status: "Completed", budget: "₹86,50,000", progress: 100 },
  { name: "Bengaluru Innovation Forum", type: "Conference", coverImageKey: "conference", date: "Nov 19, 2026", venue: "KTPO Convention Centre · Bengaluru", status: "Confirmed", budget: "₹1,24,00,000", progress: 91 },
  { name: "Mumbai Diwali Leadership Summit", type: "Corporate event", coverImageKey: "diwali", date: "Dec 05, 2026", venue: "Jio World Convention Centre · Mumbai", status: "At risk", budget: "₹3,10,00,000", progress: 36 },
  { name: "Delhi University Spring Utsav", type: "College festival", coverImageKey: "college-fest", date: "Jan 16, 2027", venue: "North Campus · Delhi", status: "In planning", budget: "₹1,74,00,000", progress: 24 },
];

export const tasks = [
  { title: "Finalize speaker presentation materials", event: "Bengaluru Innovation Forum", owner: "Meera Shah", due: "Nov 16", status: "In progress", priority: "High" },
  { title: "Confirm final guest arrangements", event: "Bengaluru Innovation Forum", owner: "Aarav Mehta", due: "Nov 17", status: "To do", priority: "Medium" },
  { title: "Resolve lighting and production risks", event: "Mumbai Diwali Leadership Summit", owner: "Dev Shah", due: "Nov 18", status: "In progress", priority: "High" },
  { title: "Submit sponsor activation plan", event: "Bengaluru Innovation Forum", owner: "Arjun Patel", due: "Nov 19", status: "Done", priority: "Low" },
  { title: "Complete initial event timeline", event: "Delhi University Spring Utsav", owner: "Meera Shah", due: "Nov 20", status: "To do", priority: "Medium" },
];

export const workshops = [
  { name: "Event Production Masterclass", category: "Professional training", date: "Dec 12, 2026", venue: "Ahmedabad · In person", status: "Registration open", capacity: "32 seats", organizer: "Utsav Learning Team", schedule: "10:00 AM – 4:00 PM IST", registered: 24 },
  { name: "Wedding Operations Workshop", category: "Wedding planning", date: "Jan 09, 2027", venue: "Mumbai · In person", status: "Draft", capacity: "24 seats", organizer: "Utsav Learning Team", schedule: "9:30 AM – 3:30 PM IST", registered: 0 },
  { name: "Festival Safety & Crowd Planning", category: "Live events", date: "Jan 22, 2027", venue: "Online", status: "Registration open", capacity: "100 seats", organizer: "Utsav Learning Team", schedule: "11:00 AM – 1:00 PM IST", registered: 67 },
];

export const vendors = [
  { name: "Aangan Hospitality", category: "Catering", contact: "Priya Shah", rating: "4.9", events: "12 events", status: "Preferred" },
  { name: "Rangmanch Productions", category: "AV & Production", contact: "Kabir Nair", rating: "4.8", events: "8 events", status: "Contracted" },
  { name: "Phool & Patta Studio", category: "Floral & Decor", contact: "Ananya Rao", rating: "4.7", events: "6 events", status: "Preferred" },
  { name: "Saarthi Guest Travel", category: "Transport", contact: "Rafi Khan", rating: "4.6", events: "4 events", status: "Review due" },
  { name: "Studio Diya", category: "Photography", contact: "Nisha Desai", rating: "4.9", events: "9 events", status: "Contracted" },
];

export const activities = [
  { who: "Meera Shah", action: "updated the speaker presentation materials", event: "Bengaluru Innovation Forum", time: "12 min ago", initials: "MS" },
  { who: "Dev Shah", action: "flagged 2 production risks", event: "Mumbai Diwali Leadership Summit", time: "48 min ago", initials: "DS" },
  { who: "Aarav Mehta", action: "updated the guest arrangements", event: "Bengaluru Innovation Forum", time: "2 hrs ago", initials: "AM" },
  { who: "Arjun Patel", action: "completed a sponsor deliverable", event: "Bengaluru Innovation Forum", time: "Yesterday", initials: "AP" },
];

export const budgetSeries = [
  { month: "Jun", planned: 38, actual: 31 }, { month: "Jul", planned: 46, actual: 42 },
  { month: "Aug", planned: 54, actual: 49 }, { month: "Sep", planned: 69, actual: 62 },
  { month: "Oct", planned: 78, actual: 73 }, { month: "Nov", planned: 92, actual: 85 },
];

export const moduleDescriptions: Record<string, string> = {
  events: "Every detail, in one place.",
  workshops: "Plan professional workshops, manage registrations and coordinate delivery.",
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

export const moduleIcons = { CalendarDays, ClipboardList, BriefcaseBusiness, Wallet, ContactRound, Handshake, Landmark, Activity, Sparkles, BarChart3, FileText, Settings2 };