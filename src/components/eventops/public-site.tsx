import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  CalendarDays,
  ChartNoAxesCombined,
  Users,
  Wallet,
  Building2,
  Menu,
  X,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  ShieldCheck,
  Workflow,
  Clock3,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * Utsav public website
 * Frontend-only preview. Forms are intentionally demo interactions until
 * the authentication, contact and billing APIs are connected.
 */

const photos = {
  conference:
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1800&q=85",
  wedding:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
  festival:
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=85",
  exhibition:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
  venue:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=85",
};

type PublicNavItem = "Platform" | "Solutions" | "Pricing" | "About" | "Contact";

function Brand() {
  return (
    <Link to="/" className="inline-flex items-center" aria-label="Utsav home">
      <img
        src="/utsav-horizontal-logo-navbar.svg"
        alt="उत्सव — संकल्प से उत्सव तक"
        className="h-14 w-auto max-w-[190px] shrink-0 object-contain"
      />
    </Link>
  );
}

function PublicNav({ active }: { active?: PublicNavItem }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links: { label: PublicNavItem; to: string }[] = [
    { label: "Platform", to: "/features" },
    { label: "Solutions", to: "/solutions" },
    { label: "Pricing", to: "/pricing" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-[70px] max-w-[1320px] items-center justify-between px-5 md:px-8">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`text-[13px] transition-colors hover:text-primary ${
                active === item.label ? "font-semibold text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="px-3 py-2 text-[13px] font-medium text-foreground hover:text-primary">
            Sign in
          </Link>
          <Button asChild size="sm" className="h-10 rounded-sm px-4 text-xs">
            <Link to="/signup">Get started <ArrowUpRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-5 py-4 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {links.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-3 text-sm hover:bg-secondary">
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
              <Button asChild variant="outline" className="rounded-sm"><Link to="/login">Sign in</Link></Button>
              <Button asChild className="rounded-sm"><Link to="/signup">Get started</Link></Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8 md:py-14">
        <div>
          <Brand />
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">
            One considered workspace for planning, coordinating and delivering events.
          </p>
          <p className="mt-5 text-[10px] text-muted-foreground">Built for the people behind every event.</p>
        </div>
        <div>
          <p className="text-xs font-semibold">Platform</p>
          <div className="mt-4 flex flex-col gap-3 text-xs text-muted-foreground">
            <Link to="/features" className="hover:text-primary">Features</Link>
            <Link to="/solutions" className="hover:text-primary">Solutions</Link>
            <Link to="/pricing" className="hover:text-primary">Pricing</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold">Utsav</p>
          <div className="mt-4 flex flex-col gap-3 text-xs text-muted-foreground">
            <Link to="/about" className="hover:text-primary">About</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
            <Link to="/login" className="hover:text-primary">Sign in</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold">Get in touch</p>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Questions about bringing your event operations together?</p>
          <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-primary">Talk to our team <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1320px] flex-wrap justify-between gap-2 px-5 py-4 text-[10px] text-muted-foreground md:px-8">
          <span>© {new Date().getFullYear()} Utsav. All rights reserved.</span>
          <span>Event operations, made clearer.</span>
        </div>
      </div>
    </footer>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-primary">{children}</p>;
}

function Home() {
  const highlights = [
    { icon: CalendarDays, title: "Plan with context", body: "Keep briefs, timelines, milestones and event details connected." },
    { icon: ClipboardList, title: "Organize the work", body: "Give every task an owner, deadline and clear next step." },
    { icon: Users, title: "Align every partner", body: "Coordinate vendors, crew, sponsors and stakeholders together." },
    { icon: ChartNoAxesCombined, title: "Learn after delivery", body: "Understand budgets, execution and outcomes across events." },
  ];

  return (
    <>
      <PublicNav />
      <main>
        <section className="overflow-hidden bg-secondary/50">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-14 md:grid-cols-[0.92fr_1.08fr] md:px-8 md:py-20">
            <div className="relative z-10">
              <Eyebrow>Event operations, brought together</Eyebrow>
              <h1 className="mt-5 max-w-[650px] text-[42px] font-semibold leading-[1.04] tracking-[-1.7px] md:text-[64px]">
                Make every moving part <span className="text-primary">work as one.</span>
              </h1>
              <p className="mt-6 max-w-[540px] text-sm leading-7 text-muted-foreground md:text-base">
                Utsav gives professional event teams one clear place to plan, organize, execute and learn — from the first brief to the final wrap-up.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="h-11 rounded-sm px-5 text-xs"><Link to="/signup">Explore the workspace <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline" className="h-11 rounded-sm px-5 text-xs"><Link to="/features">Explore platform</Link></Button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Built for event teams</span>
                <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> One connected workflow</span>
                <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Clear operational visibility</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-5 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-sm border border-border bg-background p-2 shadow-xl">
                <img src={photos.conference} alt="A professional conference audience in a large event venue" className="h-[300px] w-full object-cover md:h-[440px]" />
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
                  {[["01", "Plan"], ["02", "Coordinate"], ["03", "Deliver"]].map(([number, label]) => (
                    <div key={number} className="border border-white/25 bg-black/55 p-3 text-white backdrop-blur">
                      <p className="text-[9px] text-white/65">{number}</p><p className="mt-1 text-xs font-medium">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -left-5 top-8 hidden max-w-[180px] border border-border bg-background p-4 shadow-lg sm:block">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-[10px] text-muted-foreground">Operations overview</span></div>
                <p className="mt-2 text-xl font-semibold">One view.</p><p className="text-[10px] text-muted-foreground">The whole event, connected.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-[680px]"><Eyebrow>A connected operating system</Eyebrow><h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-[-0.9px] md:text-[44px]">Less chasing updates. More control over the work.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Event delivery depends on dozens of details moving together. Utsav helps teams see what is planned, who owns it and what needs attention.</p></div>
          <div className="mt-10 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, title, body }, i) => (
              <article key={title} className="border-b border-r border-border p-5 md:p-6">
                <span className="grid h-10 w-10 place-items-center rounded-sm bg-secondary text-primary"><Icon className="h-[18px] w-[18px]" /></span>
                <p className="mt-7 text-[10px] text-muted-foreground">0{i + 1}</p><h3 className="mt-1 text-base font-semibold">{title}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-secondary/45">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20">
            <div><Eyebrow>From brief to wrap-up</Eyebrow><h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-[-0.8px] md:text-[42px]">A clearer rhythm for every stage.</h2><p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">Move from planning to execution without losing the context behind decisions, dependencies and responsibilities.</p><Link to="/features" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary">See how the platform works <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="grid grid-cols-2 gap-3">
              {[["01", "Plan", "Briefs, dates and budgets", Workflow], ["02", "Organize", "Tasks, vendors and people", Users], ["03", "Execute", "Live status and decisions", Clock3], ["04", "Analyze", "Reports and learnings", ChartNoAxesCombined]].map(([n, title, body, Icon]) => {
                const StageIcon = Icon as typeof Workflow;
                return <div key={n as string} className="border border-border bg-background p-5"><p className="text-[10px] text-primary">{n as string}</p><StageIcon className="mt-5 h-5 w-5 text-primary" /><h3 className="mt-4 text-sm font-semibold">{title as string}</h3><p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{body as string}</p></div>;
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><Eyebrow>Designed for real event environments</Eyebrow><h2 className="mt-4 text-[32px] font-semibold tracking-[-0.8px] md:text-[42px]">One workspace. Many event formats.</h2></div><Link to="/solutions" className="inline-flex items-center gap-2 text-xs font-semibold text-primary">Explore solutions <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Conferences", photos.conference],
              ["Weddings & celebrations", photos.wedding],
              ["Festivals & live experiences", photos.festival],
              ["Exhibitions & trade shows", photos.exhibition],
            ].map(([title, src]) => <article key={title} className="group relative overflow-hidden bg-foreground"><img src={src} alt={title} loading="lazy" className="h-[250px] w-full object-cover opacity-85 transition duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16"><h3 className="text-sm font-semibold text-white">{title}</h3></div></article>)}
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-6 px-5 py-12 md:px-8 md:py-16">
            <div><Eyebrow>Bring the operation into view</Eyebrow><h2 className="mt-3 max-w-[650px] text-[30px] font-semibold leading-tight md:text-[40px]">Give your team a calmer way to deliver.</h2></div>
            <Button asChild className="h-11 rounded-sm bg-primary px-5 text-xs text-primary-foreground hover:bg-primary/90"><Link to="/signup">Get started <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

export function PublicHome() {
  return <Home />;
}

const pageContent: Record<
  "features" | "solutions" | "about",
  { eyebrow: string; title: string; description: string; items: [string, string, string][] }
> = {
  features: {
    eyebrow: "The Utsav platform",
    title: "The whole operation, in one clear view.",
    description: "A considered set of tools for the people planning, producing and delivering events together.",
    items: [
      ["Event planning", "An end-to-end home for each event, from the early brief through final wrap-up.", "Briefs, timelines, milestones"],
      ["Tasks & run of show", "Give every next step an owner, deadline and place in the bigger plan.", "Assignments, boards, schedules"],
      ["Finance & approvals", "Keep estimates, commitments and actuals connected as plans change.", "Budgets, expenses, approvals"],
      ["Vendor coordination", "A shared source of truth for the partners who make the work possible.", "Directory, contracts, quotations"],
      ["Workforce & resources", "Coordinate people, shifts, venues and equipment with fewer surprises.", "Staffing, availability, bookings"],
      ["Live operations", "Give the team a calm, shared view when the event is in motion.", "Status, incidents, decisions"],
    ],
  },
  solutions: {
    eyebrow: "Solutions for event teams",
    title: "Built around how event people actually work.",
    description: "Flexible workflows for production teams, in-house event teams, experiential agencies, venues and partners.",
    items: [
      ["Event production teams", "Connect schedules, vendors, staffing and show-day operations across a portfolio.", "A reliable production plan"],
      ["In-house event teams", "Bring stakeholders together around a clear brief, budget and timeline.", "Aligned teams and approvals"],
      ["Experiential agencies", "Keep client programs, creative partners and delivery details moving together.", "A repeatable operating rhythm"],
      ["Venues & partners", "Coordinate incoming programs, on-site teams and shared resources.", "Fewer crossed wires"],
    ],
  },
  about: {
    eyebrow: "About Utsav",
    title: "Great events are built by great teams.",
    description: "We believe the operational work deserves tools as thoughtful as the experiences it supports.",
    items: [
      ["Made for the makers", "Event work is full of craft, care and constant coordination. The software should respect all three.", "People before process"],
      ["Clarity over clutter", "A shared picture helps teams make better decisions without adding noise.", "Useful, considered design"],
      ["Better together", "Events happen through relationships between organizers, teams and partners.", "Connected ways of working"],
      ["Always learning", "Each delivery teaches a team something worth carrying forward.", "Continuous improvement"],
    ],
  },
};

export function PublicContentPage({ page }: { page: "features" | "solutions" | "about" }) {
  const content = pageContent[page];
  const icons = [ClipboardList, Wallet, Users, Clock3, Building2, ShieldCheck];
  return (
    <>
      <PublicNav active={page === "features" ? "Platform" : page === "solutions" ? "Solutions" : "About"} />
      <main>
        <section className="bg-secondary/55">
          <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1 className="mt-4 max-w-[780px] text-[38px] font-semibold leading-[1.08] tracking-[-0.9px] md:text-[54px]">{content.title}</h1>
            <p className="mt-5 max-w-[620px] text-sm leading-relaxed text-muted-foreground md:text-base">{content.description}</p>
            {page !== "about" && <Button asChild className="mt-7 h-10 rounded-sm px-5 text-xs"><Link to="/signup">See Utsav in action <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>}
          </div>
        </section>
        <section className="mx-auto max-w-[1320px] px-5 py-12 md:px-8 md:py-16">
          <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {content.items.map(([title, body, detail], i) => {
              const Icon = icons[i % icons.length];
              return <article key={title} className="border-b border-r border-border p-5 md:p-7">
                <span className="grid h-10 w-10 place-items-center rounded-sm bg-secondary text-primary"><Icon className="h-[18px] w-[18px]" /></span>
                <p className="mt-6 text-[10px] text-muted-foreground">0{i + 1}</p>
                <h2 className="mt-1 text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
                <p className="mt-5 border-t border-border pt-3 text-[10px] font-medium">{detail}</p>
              </article>;
            })}
          </div>
        </section>
        <section className="mx-auto max-w-[1320px] px-5 pb-14 md:px-8 md:pb-20">
          <img src={photos.venue} width={1600} height={900} alt="An event team preparing a venue for a live gathering" loading="lazy" className="max-h-[410px] w-full object-cover object-center" />
        </section>
        <section className="bg-foreground text-background">
          <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-5 py-12 md:px-8">
            <div><p className="text-[10px] uppercase tracking-[0.13em] text-background/60">More room to focus</p><h2 className="mt-2 text-2xl font-semibold">Bring the work into view.</h2></div>
            <Button asChild className="h-10 rounded-sm"><Link to="/signup">Get started <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

export function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const plans = [
    { name: "Team", summary: "For a small team finding its rhythm.", monthly: 4999, annual: 3999, features: ["Up to 5 active events", "Shared planning & task lists", "Vendor directory", "Core budget tracking"] },
    { name: "Studio", summary: "For production teams delivering more.", monthly: 14999, annual: 11999, features: ["Unlimited active events", "Team roles & approvals", "Workforce and resources", "Live operations workspace"] },
    { name: "Enterprise", summary: "For complex programs across teams.", monthly: null, annual: null, features: ["Portfolio administration", "Custom onboarding", "Advanced access options", "Dedicated success partner"] },
  ];
  return (
    <>
      <PublicNav active="Pricing" />
      <main>
        <section className="bg-secondary/55">
          <div className="mx-auto max-w-[1320px] px-5 py-14 text-center md:px-8 md:py-20">
            <Eyebrow>Thoughtful plans, clear pricing</Eyebrow>
            <h1 className="mt-3 text-[38px] font-semibold tracking-[-0.8px] md:text-[52px]">A plan for your next chapter.</h1>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">Start with the essentials. Grow into a steadier way to deliver.</p>
            <div className="mt-6 inline-flex items-center gap-1 rounded-sm border border-border bg-background p-1">
              <button type="button" onClick={() => setAnnual(false)} className={`rounded-sm px-4 py-2 text-xs ${!annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>Monthly</button>
              <button type="button" onClick={() => setAnnual(true)} className={`rounded-sm px-4 py-2 text-xs ${annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>Annual · save 20%</button>
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground">Illustrative preview pricing in INR. Final commercial plans are not yet configured.</p>
          </div>
        </section>
        <section className="mx-auto grid max-w-[1320px] gap-0 px-5 py-12 md:grid-cols-3 md:px-8 md:py-16">
          {plans.map((plan, i) => (
            <article key={plan.name} className={`border border-border p-6 md:p-7 ${i === 1 ? "bg-secondary/50" : "bg-background"}`}>
              {i === 1 && <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary">For growing teams</p>}
              <h2 className="text-xl font-semibold">{plan.name}</h2><p className="mt-2 min-h-10 text-xs leading-relaxed text-muted-foreground">{plan.summary}</p>
              <div className="mt-6 min-h-[62px]">
                {plan.monthly === null ? <p className="text-2xl font-semibold">Let’s talk</p> : <><span className="text-[30px] font-semibold tracking-tight">₹{(annual ? plan.annual : plan.monthly)?.toLocaleString("en-IN")}</span><span className="ml-1 text-xs text-muted-foreground">/ month</span></>}
              </div>
              <Button asChild variant={i === 1 ? "default" : "outline"} className="mt-3 h-10 w-full rounded-sm text-xs"><Link to="/contact">{plan.monthly === null ? "Contact sales" : "Discuss this plan"}</Link></Button>
              <div className="mt-7 border-t border-border pt-5"><p className="text-[10px] font-semibold uppercase tracking-wider">Included</p><ul className="mt-4 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-2 text-xs text-muted-foreground"><Check className="h-4 w-4 shrink-0 text-primary" />{feature}</li>)}</ul></div>
            </article>
          ))}
        </section>
        <section className="mx-auto max-w-[900px] px-5 pb-16 text-center"><p className="text-xs text-muted-foreground">Need a different setup? <Link to="/contact" className="font-semibold text-primary">Talk with the Utsav team.</Link></p></section>
      </main>
      <PublicFooter />
    </>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    toast.success("Thanks — your demo enquiry has been captured in this preview.");
  }
  return (
    <>
      <PublicNav active="Contact" />
      <main className="bg-secondary/40">
        <div className="mx-auto grid max-w-[1160px] gap-10 px-5 py-14 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-20">
          <div><Eyebrow>Let’s talk about your workflow</Eyebrow><h1 className="mt-4 text-[40px] font-semibold leading-tight tracking-[-1px] md:text-[52px]">Bring your event operations into focus.</h1><p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Tell us what your team coordinates today and where you need more visibility.</p>
            <div className="mt-9 space-y-5 text-xs text-muted-foreground"><p className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> Contact through the enquiry form</p><p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Built for teams operating across India</p><p className="flex items-center gap-3"><CircleHelp className="h-4 w-4 text-primary" /> Product walkthroughs and team enquiries</p></div>
          </div>
          <form onSubmit={handleSubmit} className="border border-border bg-background p-6 md:p-9">
            <h2 className="text-xl font-semibold">Request a conversation</h2><p className="mt-2 text-xs text-muted-foreground">Share a few details and we’ll understand your requirements.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-medium">Full name<Input required name="name" placeholder="Your name" className="mt-2 rounded-sm" /></label>
              <label className="text-xs font-medium">Work email<Input required type="email" name="email" placeholder="you@company.com" className="mt-2 rounded-sm" /></label>
              <label className="text-xs font-medium">Company / team<Input name="company" placeholder="Organization name" className="mt-2 rounded-sm" /></label>
              <label className="text-xs font-medium">Phone (optional)<Input name="phone" placeholder="+91" className="mt-2 rounded-sm" /></label>
              <label className="text-xs font-medium sm:col-span-2">What do you organize?<Textarea required name="message" placeholder="Conferences, festivals, corporate events..." rows={4} className="mt-2 rounded-sm" /></label>
            </div>
            <Button type="submit" className="mt-6 h-11 w-full rounded-sm text-xs" disabled={submitted}>{submitted ? "Enquiry captured" : "Send enquiry"} <ArrowRight className="ml-2 h-4 w-4" /></Button>
            <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">Preview only: this form does not send data to a server yet.</p>
          </form>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

export function AuthPage({ signup = false }: { signup?: boolean }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.info("Authentication is not connected yet. This is a frontend preview.");
    void navigate({ to: "/" });
  }
  return (
    <main className="grid min-h-screen bg-background md:grid-cols-2">
      <section className="flex flex-col px-6 py-7 md:px-12 md:py-10">
        <Brand />
        <div className="mx-auto my-auto w-full max-w-[420px] py-12">
          <Eyebrow>{signup ? "Create your workspace" : "Welcome back"}</Eyebrow>
          <h1 className="mt-3 text-[34px] font-semibold tracking-[-1px]">{signup ? "Start with a clearer view." : "Sign in to Utsav."}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{signup ? "Set up a sample workspace for your event team." : "Continue to your event operations workspace."}</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {signup && <label className="block text-xs font-medium">Your name<Input required name="name" autoComplete="name" placeholder="Full name" className="mt-2 h-11 rounded-sm" /></label>}
            {signup && <label className="block text-xs font-medium">Organization<Input required name="organization" placeholder="Company or team" className="mt-2 h-11 rounded-sm" /></label>}
            <label className="block text-xs font-medium">Work email<Input required type="email" name="email" autoComplete="email" placeholder="you@company.com" className="mt-2 h-11 rounded-sm" /></label>
            <label className="block text-xs font-medium">Password<div className="relative mt-2"><Input required type={showPassword ? "text" : "password"} name="password" minLength={8} autoComplete={signup ? "new-password" : "current-password"} placeholder="At least 8 characters" className="h-11 rounded-sm pr-20" /><button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-muted-foreground">{showPassword ? "Hide" : "Show"}</button></div></label>
            <Button type="submit" className="h-11 w-full rounded-sm text-xs">{signup ? "Create preview workspace" : "Sign in"} <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">{signup ? "Already have a workspace?" : "New to Utsav?"} <Link to={signup ? "/login" : "/signup"} className="font-semibold text-primary">{signup ? "Sign in" : "Create an account"}</Link></p>
          <p className="mt-7 text-center text-[10px] leading-relaxed text-muted-foreground">Demo interface only. Account creation and sign-in will be enabled when the backend is connected.</p>
        </div>
        <p className="text-[10px] text-muted-foreground">© {new Date().getFullYear()} Utsav</p>
      </section>
      <aside className="relative hidden overflow-hidden bg-foreground md:block">
        <img src={photos.venue} alt="A thoughtfully prepared event venue" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/15" />
        <div className="absolute bottom-14 left-12 right-12 text-white"><Sparkles className="h-6 w-6 text-primary" /><h2 className="mt-5 max-w-lg text-[38px] font-semibold leading-tight">The details make the experience. Keep them connected.</h2><p className="mt-4 max-w-md text-sm leading-6 text-white/70">A shared operational view for the people who bring every event to life.</p></div>
      </aside>
    </main>
  );
}

export function PublicFaqLink() {
  return <Link to="/contact" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"><CircleHelp className="h-4 w-4" /> Questions? Talk to us</Link>;
}
