
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity, ArrowRight, ArrowUpRight, Check, ClipboardCheck,
  Landmark, Menu, ShieldCheck, UsersRound, Wallet, X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const publicLinks = [
  { label: "Platform", to: "/features" as const },
  { label: "Solutions", to: "/solutions" as const },
  { label: "Pricing", to: "/pricing" as const },
  { label: "About", to: "/about" as const },
];

const eventTypes = [
  { title: "Conferences & summits", text: "Speaker schedules, sponsors, registrations, production teams and multi-track programmes.", image: "/images/utsav-conference.jpg", tag: "Business events" },
  { title: "Weddings & celebrations", text: "Coordinate venues, décor, hospitality, vendors and every family-facing detail.", image: "/images/utsav-wedding.jpg", tag: "Social celebrations" },
  { title: "College fests & festivals", text: "Keep stages, artists, volunteers, permissions and live operations in sync.", image: "/images/utsav-festival.jpg", tag: "Live experiences" },
  { title: "Exhibitions & trade shows", text: "Manage exhibitors, floor plans, build schedules, logistics and partner teams.", image: "/images/utsav-exhibition.jpg", tag: "Exhibitions" },
];

function PublicNav({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e8ddca] bg-[#fbf8f1]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-2" aria-label="Utsav home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#7c2636] text-xl font-bold text-[#fff8e9]">उ</span>
          <span className="leading-tight">
            <span className="block text-[19px] font-bold tracking-tight text-[#7c2636]">Utsav</span>
            <span className="block text-[9px] font-medium tracking-[0.16em] text-[#947b57]">EVENT OPERATIONS</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-9 md:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={active === link.label ? "page" : undefined}
              className={`text-[13px] font-semibold transition-colors hover:text-[#a64f32] ${
                active === link.label ? "text-[#7c2636]" : "text-[#625c52]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link to="/login" className="text-[13px] font-semibold text-[#625c52] hover:text-[#7c2636]">
            Sign in
          </Link>
          <Button asChild className="h-10 rounded-full bg-[#a64f32] px-5 text-[13px] font-semibold text-white shadow-sm hover:bg-[#873e2b]">
            <Link to="/signup">Book a walkthrough <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-[#e8ddca] bg-[#fbf8f1] px-5 py-4 md:hidden">
          <nav className="mx-auto grid max-w-[1440px] gap-1">
            {publicLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-[#625c52] hover:bg-[#f0e8d9]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-3 border-t border-[#e8ddca] pt-4">
              <Button asChild variant="outline" className="flex-1 rounded-full">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild className="flex-1 rounded-full bg-[#a64f32]">
                <Link to="/signup">Book a walkthrough</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="bg-[#241f1c] text-[#f7f0e4]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-12">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#a64f32] text-xl font-bold">उ</span>
            <span className="text-xl font-bold">Utsav</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#c9bdae]">
            The operating system for the people who bring India’s events to life.
          </p>
          <p className="mt-5 text-xs tracking-wide text-[#b18b62]">
            PLAN WITH PURPOSE. DELIVER WITH CONFIDENCE.
          </p>
        </div>
        <FooterGroup title="Explore" links={[["Platform", "/features"], ["Solutions", "/solutions"], ["Pricing", "/pricing"]]} />
        <FooterGroup title="Utsav" links={[["Our story", "/about"], ["Contact", "/contact"]]} />
        <FooterGroup title="Get started" links={[["Sign in", "/login"], ["Create workspace", "/signup"], ["Demo workspace", "/app"]]} />
        <div className="border-t border-white/15 pt-5 text-xs text-[#b9aa98] md:col-span-4">
          © 2026 Utsav. Built for event teams across India.
          <span className="float-right">Prototype experience</span>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#d9b889]">{title}</h3>
      <div className="grid gap-3">
        {links.map(([label, path]) => (
          <Link key={path} to={path as never} className="text-sm text-[#c9bdae] transition-colors hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[650px] rounded-2xl border border-white/60 bg-[#fffaf1] p-3 shadow-[0_30px_90px_rgba(30,20,12,0.28)] sm:p-4">
      <div className="flex items-center justify-between border-b border-[#eadfce] pb-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#7c2636] text-xs font-bold text-white">उ</span>
          <div>
            <p className="text-[10px] font-bold text-[#302923]">Aarambh Events</p>
            <p className="text-[8px] text-[#8d8172]">Ahmedabad · Workspace</p>
          </div>
        </div>
        <span className="rounded-full bg-[#f1e8d8] px-3 py-1 text-[8px] font-semibold text-[#806d54]">LIVE OVERVIEW</span>
      </div>

      <div className="grid grid-cols-[100px_1fr] gap-3 pt-3 sm:grid-cols-[130px_1fr] sm:gap-4">
        <aside className="space-y-2 border-r border-[#eadfce] pr-2">
          <p className="px-1 text-[7px] font-bold uppercase tracking-widest text-[#a18e77]">Workspace</p>
          {["Overview", "Events", "Planning", "Vendors", "Finance", "Crew"].map((s, i) => (
            <div key={s} className={`rounded-md px-2 py-2 text-[8px] font-semibold ${i === 0 ? "bg-[#7c2636] text-white" : "text-[#75695b]"}`}>
              {s}
            </div>
          ))}
        </aside>

        <div className="min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[8px] text-[#9b8b78]">MONDAY, 16 NOVEMBER</p>
              <h3 className="mt-1 text-[13px] font-bold text-[#302923] sm:text-base">Your events, in rhythm.</h3>
            </div>
            <span className="rounded-full bg-[#a64f32] px-2.5 py-1 text-[7px] font-bold text-white">+ New event</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[["Active events", "08"], ["Open tasks", "124"], ["Committed budget", "₹48.6L"]].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-[#eadfce] bg-white/70 p-2">
                <p className="text-[7px] text-[#8d8172]">{k}</p>
                <p className="mt-1 text-[12px] font-bold text-[#302923] sm:text-sm">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-[#eadfce] bg-white/70 p-2.5">
            <div className="mb-2 flex justify-between">
              <p className="text-[8px] font-bold text-[#302923]">Upcoming programmes</p>
              <p className="text-[7px] font-semibold text-[#a64f32]">View all →</p>
            </div>
            {[["India Growth Forum", "Ahmedabad", "22 Nov", 82], ["Satrang Campus Fest", "Pune", "29 Nov", 63], ["The Courtyard Wedding", "Jaipur", "06 Dec", 91]].map(([n, c, d, p]) => (
              <div key={n as string} className="flex items-center gap-2 border-t border-[#f0e8dc] py-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[8px] font-semibold text-[#3b332b]">{n}</p>
                  <p className="text-[7px] text-[#988a79]">{c} · {d}</p>
                </div>
                <div className="h-1.5 w-12 rounded-full bg-[#eee5d8]">
                  <div className="h-1.5 rounded-full bg-[#a64f32]" style={{ width: `${p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const pillars = [
    [ClipboardCheck, "Plan every detail", "Briefs, schedules, task owners and dependencies stay connected."],
    [Wallet, "Keep budgets in view", "Track estimates, commitments, vendor payments and approvals."],
    [UsersRound, "Align every partner", "Bring internal teams, agencies, venues and vendors onto one plan."],
    [Activity, "Stay in control on event day", "Run sheets, crew updates and issue tracking in one live workspace."],
  ] as const;

  return (
    <>
      <PublicNav />
      <main className="bg-[#fbf8f1] text-[#2b2925]">
        <section className="relative isolate overflow-hidden bg-[#241f1c] text-[#fff8ec]">
          <img src="/images/utsav-conference.jpg" alt="A large conference in India with event production crew and audience" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#211a18]/95 via-[#2c211c]/80 to-[#2c211c]/30" />
          <div className="mx-auto grid min-h-[690px] max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-[0.92fr_1.08fr] lg:px-12">
            <div className="max-w-[610px]">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e6c89b]/35 bg-black/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f0d2a4]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e7b96f]" />
                Made for India’s event teams
              </p>
              <h1 className="text-[42px] font-semibold leading-[1.06] tracking-[-1.8px] sm:text-[54px] lg:text-[64px]">
                Every detail in place.<br />
                <span className="font-serif italic font-medium text-[#e7bd83]">Every moment</span> unforgettable.
              </h1>
              <p className="mt-6 max-w-[510px] text-[15px] leading-7 text-white/75">
                From grand celebrations and college festivals to conferences and exhibitions, Utsav brings your people, plans, partners and budgets into one clear operating space.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="h-12 rounded-full bg-[#d17a4b] px-7 text-sm font-bold text-white hover:bg-[#b9633a]">
                  <Link to="/signup">Explore Utsav <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-full border-white/40 bg-white/5 px-7 text-sm font-semibold text-white hover:bg-white/15">
                  <Link to="/features">Discover the platform</Link>
                </Button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-semibold tracking-wide text-white/65">
                <span>✓ Built around real event workflows</span>
                <span>✓ One connected workspace</span>
              </div>
            </div>
            <div className="hidden md:block"><DashboardPreview /></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7c2636] via-[#d17a4b] to-[#d5b47b]" />
        </section>

        <section className="border-b border-[#e7dccb] bg-[#f2eadc]">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 px-5 py-6 text-center sm:grid-cols-4 sm:px-8 lg:px-12">
            {[["01", "Plan with clarity"], ["02", "Coordinate with ease"], ["03", "Deliver in control"], ["04", "Learn and improve"]].map(([n, t]) => (
              <div key={n} className="flex items-center justify-center gap-3">
                <span className="font-serif text-xl italic text-[#a64f32]">{n}</span>
                <span className="text-xs font-bold text-[#5e5549]">{t}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a64f32]">The Utsav way</p>
              <h2 className="mt-4 max-w-md font-serif text-[36px] leading-tight text-[#332b25] sm:text-[44px]">
                The work behind a memorable event deserves a better system.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#70675c]">
                Indian events bring together many moving parts. Utsav gives every stakeholder a shared view—from the first brief to the final wrap-up.
              </p>
            </div>
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {pillars.map(([Icon, title, body], i) => (
                <article key={title} className="border-t border-[#dfd2bf] pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f0e4d2] text-[#a64f32]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-[#a88b68]">0{i + 1}</p>
                  <h3 className="mt-2 text-base font-bold text-[#332b25]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#756b5f]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f1e8d9] py-20 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a64f32]">One platform. Many formats.</p>
                <h2 className="mt-3 max-w-2xl font-serif text-[36px] leading-tight text-[#332b25] sm:text-[44px]">
                  Every kind of gathering has its own rhythm.
                </h2>
              </div>
              <Link to="/solutions" className="text-sm font-bold text-[#8e3e2d] hover:underline">
                Find your workflow <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {eventTypes.map((item, i) => (
                <article key={item.title} className="group overflow-hidden rounded-2xl border border-[#e2d5c3] bg-[#fffaf2] shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-[#fff8ed]/95 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[#7c2636]">{item.tag}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-[#b18b62]">0{i + 1}</p>
                    <h3 className="mt-2 text-base font-bold text-[#352d26]">{item.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-[#756b5f]">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-24">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a64f32]">From brief to baraat, and beyond</p>
            <h2 className="mt-3 max-w-lg font-serif text-[36px] leading-tight text-[#332b25] sm:text-[44px]">
              One connected journey. No detail left behind.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#756b5f]">
              Keep decisions, ownership and updates connected as your event moves from planning into execution.
            </p>
            <Button asChild variant="outline" className="mt-7 h-11 rounded-full border-[#c9b69c] px-6 text-sm font-bold text-[#7c2636] hover:bg-[#f2eadc]">
              <Link to="/features">See how Utsav works <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 border-l border-t border-[#dfd2bf]">
            {[["01", "Shape", "Capture the brief, goals and experience."], ["02", "Plan", "Bring teams, vendors and budgets together."], ["03", "Deliver", "Run show-day operations with confidence."], ["04", "Review", "Close the loop with reports and insights."]].map(([n, t, b]) => (
              <div key={n} className="border-b border-r border-[#dfd2bf] p-5 sm:p-7">
                <span className="font-serif text-2xl italic text-[#a64f32]">{n}</span>
                <h3 className="mt-8 text-lg font-bold text-[#352d26]">{t}</h3>
                <p className="mt-2 text-xs leading-6 text-[#756b5f]">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#762b3a] text-[#fff7ea]">
          <div className="absolute -right-20 -top-28 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -right-8 -top-16 h-72 w-72 rounded-full border border-white/10" />
          <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-20">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e9c89e]">Designed for the people behind the scenes</p>
              <h2 className="mt-4 max-w-md font-serif text-[36px] leading-tight sm:text-[42px]">Less chasing. More creating.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[["A shared picture", "Everyone works from the same plan and the latest update."], ["Clear ownership", "Know who is responsible for the next move."], ["Fewer surprises", "Spot dependencies, costs and delays earlier."], ["Stronger every time", "Turn every event’s learnings into your next advantage."]].map(([t, b]) => (
                <div key={t} className="border-t border-white/25 pt-4">
                  <h3 className="text-sm font-bold">{t}</h3>
                  <p className="mt-2 text-xs leading-6 text-white/75">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid items-center gap-8 rounded-3xl bg-[#f1e8d9] p-7 sm:p-10 md:grid-cols-[1fr_auto] md:p-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a64f32]">Bring your next event into focus</p>
              <h2 className="mt-3 max-w-2xl font-serif text-[34px] leading-tight text-[#332b25] sm:text-[42px]">
                Give your team the space to deliver its best work.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#756b5f]">
                See how one connected workspace can support the way your event team operates.
              </p>
            </div>
            <Button asChild className="h-12 rounded-full bg-[#a64f32] px-7 font-bold text-white hover:bg-[#873e2b]">
              <Link to="/signup">Get started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

type ContentPageProps = {
  title?: string;
  eyebrow?: string;
  description?: string;
  children?: React.ReactNode;
};

export function PublicContentPage({
  title = "A more connected way to work",
  eyebrow = "THE UTSAV PLATFORM",
  description = "Bring your event teams, plans, partners and operations together in one workspace.",
  children,
}: ContentPageProps) {
  return (
    <>
      <PublicNav />
      <main className="min-h-[65vh] bg-[#fbf8f1] px-5 py-20 text-[#332b25] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a64f32]">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#756b5f]">{description}</p>
          {children && <div className="mt-12">{children}</div>}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

export function PricingPage() {
  const features = [
    "Event planning and task management",
    "Vendor and partner coordination",
    "Budget and expense tracking",
    "Team and workforce management",
    "Live event operations",
    "Reports and operational insights",
  ];

  return (
    <>
      <PublicNav active="Pricing" />
      <main className="bg-[#fbf8f1] px-5 py-20 text-[#332b25] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a64f32]">Simple and transparent</p>
            <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">A plan that fits your event team.</h1>
            <p className="mt-5 text-base leading-7 text-[#756b5f]">
              Choose a workspace that supports the way your team plans and delivers events.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-[#e2d5c3] bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#a64f32]">Essential</p>
              <h2 className="mt-4 text-2xl font-bold">For growing teams</h2>
              <p className="mt-3 text-sm leading-6 text-[#756b5f]">
                A structured workspace for teams managing smaller event portfolios.
              </p>
              <div className="mt-7 text-3xl font-bold">Let's talk</div>
              <p className="mt-1 text-xs text-[#8c8175]">Pricing based on team requirements</p>
              <Button asChild className="mt-7 h-11 w-full rounded-full bg-[#a64f32] text-white hover:bg-[#873e2b]">
                <Link to="/contact">Discuss your needs</Link>
              </Button>
            </article>

            <article className="relative rounded-3xl border-2 border-[#7c2636] bg-[#f2eadc] p-8">
              <span className="absolute right-6 top-6 rounded-full bg-[#7c2636] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                For growing operations
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-[#a64f32]">Professional</p>
              <h2 className="mt-4 text-2xl font-bold">For established teams</h2>
              <p className="mt-3 text-sm leading-6 text-[#756b5f]">
                More control across multiple events, departments, partners and workflows.
              </p>
              <div className="mt-7 text-3xl font-bold">Custom</div>
              <p className="mt-1 text-xs text-[#8c8175]">Talk to us for a tailored plan</p>
              <Button asChild className="mt-7 h-11 w-full rounded-full bg-[#7c2636] text-white hover:bg-[#62202d]">
                <Link to="/contact">Request a consultation</Link>
              </Button>
            </article>
          </div>

          <div className="mt-14 rounded-2xl border border-[#e2d5c3] bg-white p-7">
            <h2 className="text-xl font-bold">Included capabilities</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(feature => (
                <div key={feature} className="flex items-start gap-3 text-sm text-[#62594e]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#a64f32]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

export function PublicFaqLink() {
  return (
    <Link to="/contact" className="font-semibold text-[#a64f32] hover:underline">
      Contact our team <ArrowUpRight className="ml-1 inline h-4 w-4" />
    </Link>
  );
}

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please complete all required fields.");
      return;
    }

    toast.success("Demo form submitted. Backend integration will be added later.");
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
  }

  return (
    <>
      <PublicNav />
      <main className="bg-[#fbf8f1] px-5 py-20 text-[#332b25] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a64f32]">Let's connect</p>
            <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">Let's bring your next event together.</h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#756b5f]">
              Tell us about your team and the events you manage. We'll help you understand how Utsav can fit your workflow.
            </p>
            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#a64f32]" />
                <span className="text-sm text-[#62594e]">A workspace built around your operations</span>
              </div>
              <div className="flex items-center gap-3">
                <UsersRound className="h-5 w-5 text-[#a64f32]" />
                <span className="text-sm text-[#62594e]">Designed for teams and event partners</span>
              </div>
              <div className="flex items-center gap-3">
                <Landmark className="h-5 w-5 text-[#a64f32]" />
                <span className="text-sm text-[#62594e]">Made for the diversity of Indian events</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl border border-[#e2d5c3] bg-white p-6 shadow-sm sm:p-9">
            <h2 className="text-xl font-bold">Tell us about your requirements</h2>
            <p className="mt-2 text-xs text-[#8c8175]">Fields marked * are required.</p>

            <div className="mt-7 grid gap-5">
              <label className="grid gap-2 text-sm font-semibold">
                Your name *
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Work email *
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Company or team
                <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="Your organisation" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                What do you need help with? *
                <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us about your events and team..." rows={5} required />
              </label>
              <Button type="submit" className="h-12 rounded-full bg-[#a64f32] font-bold text-white hover:bg-[#873e2b]">
                Submit enquiry <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-center text-[10px] text-[#8c8175]">
                Demo form only. Enquiries are not yet stored or emailed.
              </p>
            </div>
          </form>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

export function AuthPage({ mode = "login" }: { mode?: "login" | "signup" }) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !password.trim() || (isSignup && !name.trim())) {
      toast.error("Please complete the required fields.");
      return;
    }

    toast.info("Authentication is not connected yet. Backend integration will be added later.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f2eadc] px-5 py-12">
      <div className="grid w-full max-w-[980px] overflow-hidden rounded-3xl border border-[#e2d5c3] bg-[#fffaf2] shadow-xl md:grid-cols-2">
        <section className="relative hidden min-h-[600px] flex-col justify-between overflow-hidden bg-[#762b3a] p-10 text-white md:flex">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#d17a4b] text-xl font-bold">उ</span>
              <span className="text-xl font-bold">Utsav</span>
            </Link>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e9c89e]">From vision to celebration</p>
            <h1 className="mt-5 font-serif text-5xl leading-tight">
              Bring every moving part into one place.
            </h1>
            <p className="mt-5 text-sm leading-7 text-white/75">
              Plan, organise, coordinate and deliver events with a shared operational view.
            </p>
          </div>
          <p className="text-xs text-white/60">Utsav · Event Operations</p>
        </section>

        <section className="flex items-center p-7 sm:p-10">
          <div className="w-full">
            <Link to="/" className="text-sm font-semibold text-[#a64f32] hover:underline">
              ← Back to Utsav
            </Link>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-[#a64f32]">
              {isSignup ? "Create your workspace" : "Welcome back"}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#332b25]">
              {isSignup ? "Get started with Utsav" : "Sign in to your workspace"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#756b5f]">
              {isSignup ? "Set up your team workspace and bring your events together." : "Continue where your event team left off."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              {isSignup && (
                <label className="grid gap-2 text-sm font-semibold">
                  Your name
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required />
                </label>
              )}
              <label className="grid gap-2 text-sm font-semibold">
                Email address
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Password
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
              </label>
              <Button type="submit" className="mt-2 h-12 rounded-full bg-[#a64f32] font-bold text-white hover:bg-[#873e2b]">
                {isSignup ? "Create account" : "Sign in"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <p className="mt-7 text-center text-xs text-[#756b5f]">
              {isSignup ? "Already have a workspace?" : "New to Utsav?"}{" "}
              <button
                type="button"
                onClick={() => navigate({ to: isSignup ? "/login" : "/signup" })}
                className="font-bold text-[#a64f32] hover:underline"
              >
                {isSignup ? "Sign in" : "Create an account"}
              </button>
            </p>
            <p className="mt-5 text-center text-[10px] text-[#9b8b78]">
              Demo interface · Authentication will be connected in the backend phase.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
