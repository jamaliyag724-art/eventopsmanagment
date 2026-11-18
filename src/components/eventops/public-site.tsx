import { useEffect, useRef, useState, type FormEvent, type ReactNode, type RefObject } from "react";
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
  Handshake,
  Utensils,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Utsav public website
 * Frontend-only preview. Forms are intentionally demo interactions until
 * the authentication, contact and billing APIs are connected.
 */

const photos = {
  conference: "/utsav-conference.webp",
  wedding: "/utsav-wedding.webp",
  festival: "/utsav-festival.webp",
  exhibition: "/utsav-exhibition.webp",
  venue: "/utsav-venue.webp",
};

const heroSlides = [
  { image: photos.conference, label: "Conferences & summits", alt: "Professional conference in India" },
  { image: photos.wedding, label: "Weddings & celebrations", alt: "Indian wedding celebration venue" },
  { image: photos.festival, label: "Festivals & live experiences", alt: "Indian college festival and live event" },
  { image: photos.exhibition, label: "Exhibitions & trade shows", alt: "Business exhibition in India" },
  { image: photos.venue, label: "Venues & gatherings", alt: "Professionally arranged event venue" },
];

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
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
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
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login" className="px-3 py-2 text-[13px] font-medium text-foreground hover:text-primary">
            Sign in
          </Link>
          <Button asChild size="sm" className="h-10 rounded-sm px-4 text-xs">
            <Link to="/signup">Get started <ArrowUpRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Mobile navigation">
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

function usePublicReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-utsav-reveal]"));
    if (!sections.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("utsav-reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("utsav-reveal-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -42px 0px" });

    sections.forEach((section, index) => {
      section.classList.add("utsav-reveal");
      section.style.setProperty("--utsav-reveal-delay", `${(index % 3) * 75}ms`);
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [rootRef]);
}

function WelcomeExperience() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
  let alreadySeen = false;

  try {
    alreadySeen =
      window.sessionStorage.getItem("utsav-welcome-seen") === "1";
  } catch {
    // Storage unavailable; continue with the welcome experience.
  }

  if (!alreadySeen) {
    const timer = window.setTimeout(() => setOpen(true), 420);
    return () => window.clearTimeout(timer);
  }

  return undefined;
}, []);

  function closeWelcome() {
    setOpen(false);
    try {
      window.sessionStorage.setItem("utsav-welcome-seen", "1");
    } catch {
      // The dialog still closes; storage is only used to avoid repeating the intro in this tab.
    }
  }

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => { if (!nextOpen) closeWelcome(); }}>
      <DialogContent className="utsav-welcome-dialog max-w-[560px] overflow-hidden rounded-[18px] border border-[#d7bd99] bg-[#f7f1e7] p-0 text-[#28251f] shadow-[0_30px_100px_rgba(0,0,0,.38)]">
        <div className="utsav-welcome-pattern relative px-7 pb-8 pt-9 text-center sm:px-12 sm:pb-10 sm:pt-11">
          <div className="utsav-welcome-aura" aria-hidden="true" />
          <div className="utsav-welcome-mark mx-auto mb-5" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="h-full w-full" fill="none">
              <circle cx="60" cy="60" r="48" stroke="#b77a42" strokeOpacity=".45" strokeWidth="1.2" />
              <circle cx="60" cy="60" r="36" stroke="#8d3d32" strokeOpacity=".55" strokeDasharray="2.5 4" />
              {Array.from({ length: 8 }, (_, index) => (
                <path key={index} d="M60 17 C48 31 48 43 60 51 C72 43 72 31 60 17Z" fill="#c58a4d" fillOpacity=".18" stroke="#a65a38" strokeWidth="1.2" transform={`rotate(${index * 45} 60 60)`} />
              ))}
              <path d="M60 42 C48 53 48 67 60 78 C72 67 72 53 60 42Z" fill="#a64e37" fillOpacity=".2" stroke="#8f3b32" strokeWidth="1.8" />
              <circle cx="60" cy="60" r="7" fill="#b77a42" />
              <path d="M60 53 L60 67 M53 60 L67 60" stroke="#fff8eb" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="utsav-dandiya utsav-dandiya-one" />
            <span className="utsav-dandiya utsav-dandiya-two" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#a64e37]">संकल्प से उत्सव तक · From vision to celebration</p>
          <DialogHeader className="mt-3 items-center space-y-3">
            <DialogTitle className="utsav-display-font text-[36px] font-semibold leading-tight tracking-[-.04em] text-[#29241f] sm:text-[43px]">
              नमस्ते! <span className="block text-[25px] font-medium tracking-[-.02em] sm:text-[29px]">Utsav mein aapka swagat hai.</span>
            </DialogTitle>
            <DialogDescription className="max-w-[390px] text-[13px] leading-6 text-[#6c6257] sm:text-sm">
              Har event ek idea se shuru hota hai. Plan, people aur possibilities ko ek jagah laayein — aur har detail ko banayein memorable.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={closeWelcome} className="utsav-welcome-primary inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#a94f35] px-6 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#91432f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a94f35] focus-visible:ring-offset-2">
              Explore Utsav <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/features" onClick={closeWelcome} className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#cdb99d] bg-white/55 px-6 text-xs font-semibold text-[#51463b] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a94f35] focus-visible:ring-offset-2">
              Discover the platform
            </Link>
          </div>
          <p className="mt-5 text-[9px] font-medium uppercase tracking-[.18em] text-[#938575]">Plan · Coordinate · Celebrate</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8 md:py-14">
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
          <p className="text-xs font-semibold">Find us & partner with us</p>
          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span><strong className="font-semibold text-foreground">India · Nationwide</strong><br />Built for event teams across India.</span></p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Venues, production teams, hospitality and brand sponsors — let’s bring the right people together.</p>
          <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-primary">Partnership enquiries <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1320px] flex-wrap justify-between gap-2 px-5 py-4 text-[10px] text-muted-foreground md:px-8">
          <span>© {new Date().getFullYear()} Utsav. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
            <Link to="/terms" className="hover:text-primary">Terms</Link>
            <Link to="/cookies" className="hover:text-primary">Cookies</Link>
            <span>Event operations, made clearer.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-primary">{children}</p>;
}

function Home() {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const mainRef = useRef<HTMLElement>(null);
  usePublicReveal(mainRef);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const highlights = [
    { icon: CalendarDays, title: "Plan with context", body: "Keep briefs, timelines, milestones and event details connected." },
    { icon: ClipboardList, title: "Organize the work", body: "Give every task an owner, deadline and clear next step." },
    { icon: Users, title: "Align every partner", body: "Coordinate vendors, crew, sponsors and stakeholders together." },
    { icon: ChartNoAxesCombined, title: "Learn after delivery", body: "Understand budgets, execution and outcomes across events." },
  ];

  return (
    <>
      <div className="utsav-public">
      <WelcomeExperience />
      <PublicNav />
      <main ref={mainRef} className="utsav-public-main">
        <section data-utsav-reveal className="relative isolate overflow-hidden bg-[#f3eee3]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0 22px, rgba(139,91,54,.12) 22px 23px, transparent 23px 45px), repeating-linear-gradient(-45deg, transparent 0 22px, rgba(139,91,54,.09) 22px 23px, transparent 23px 45px)",
              maskImage: "linear-gradient(90deg, black, transparent 62%)",
            }}
          />
          <div className="pointer-events-none absolute -right-24 -top-28 -z-10 h-[420px] w-[420px] rounded-full border border-[#b88b5a]/20" />
          <div className="pointer-events-none absolute -right-12 -top-16 -z-10 h-[300px] w-[300px] rounded-full border border-[#b88b5a]/20" />
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:py-20">
            <div className="relative z-10">
              <Eyebrow>संकल्प से उत्सव तक · Rooted in India. Built for every gathering.</Eyebrow>
              <h1 className="mt-5 max-w-[650px] text-[42px] font-semibold leading-[1.04] tracking-[-1.7px] sm:text-[50px] md:text-[56px] lg:text-[64px]">
                Har event ka har detail, <span className="text-primary">ek hi jagah.</span>
              </h1>
              <p className="mt-6 max-w-[540px] text-sm leading-7 text-muted-foreground md:text-base">
                Plan with clarity. Coordinate with confidence. Utsav brings your people, partners, budgets and run-of-show together — taaki aap har moment par focus kar sakein.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.04em] text-[#87603f]">
                <span className="h-px w-7 bg-[#b16a45]" />
                Boardrooms se baraat tak · conventions se celebrations tak
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="h-11 rounded-sm px-5 text-xs"><Link to="/signup">Apna Utsav shuru karein <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline" className="h-11 rounded-sm px-5 text-xs"><Link to="/features">Platform dekhein</Link></Button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Built for event teams</span>
                <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> One connected workflow</span>
                <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Clear operational visibility</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-5 rounded-full bg-primary/10 blur-3xl" />
              <div
                className="relative overflow-hidden rounded-sm border border-[#b88b5a]/45 bg-[#fffaf1] p-2 shadow-[0_22px_55px_rgba(75,49,29,0.18)]"
                aria-label="A rotating showcase of Indian event formats"
              >
                <div className="relative h-[300px] overflow-hidden bg-[#e8dfd1] sm:h-[360px] md:h-[400px] lg:h-[440px]">
                  {heroSlides.map((slide, index) => (
                    <img
                      key={slide.label}
                      src={slide.image}
                      alt={slide.alt}
                      width={1280}
                      height={720}
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                        activeHeroSlide === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211b17]/65 via-transparent to-[#211b17]/10" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 md:bottom-7 md:left-7 md:right-7">
                    <div className="min-w-0 text-white">
                      <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/75">Made for every gathering</p>
                      <p className="mt-1 text-base font-semibold tracking-tight md:text-xl">
                        {heroSlides[activeHeroSlide]?.label ?? "Conferences & summits"}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5" aria-label="Hero slideshow controls">
                      {heroSlides.map((slide, index) => (
                        <button
                          key={slide.label}
                          type="button"
                          onClick={() => setActiveHeroSlide(index)}
                          aria-label={`Show ${slide.label}`}
                          aria-current={activeHeroSlide === index ? "true" : undefined}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            activeHeroSlide === index ? "w-7 bg-white" : "w-1.5 bg-white/55 hover:bg-white/85"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {[["01", "Plan"], ["02", "Coordinate"], ["03", "Deliver"]].map(([number, label]) => (
                    <div key={number} className="border border-[#e8d4b7]/60 bg-[#f3eee3] px-3 py-2.5">
                      <p className="text-[9px] text-[#87603f]">{number}</p>
                      <p className="mt-1 text-xs font-semibold text-[#342a22]">{label}</p>
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

        <section data-utsav-reveal className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
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

        <section data-utsav-reveal className="bg-secondary/45">
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

        <section data-utsav-reveal className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><Eyebrow>Designed for real event environments</Eyebrow><h2 className="mt-4 text-[32px] font-semibold tracking-[-0.8px] md:text-[42px]">One workspace. Many event formats.</h2></div><Link to="/solutions" className="inline-flex items-center gap-2 text-xs font-semibold text-primary">Explore solutions <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Conferences", photos.conference],
              ["Weddings & celebrations", photos.wedding],
              ["Festivals & live experiences", photos.festival],
              ["Exhibitions & trade shows", photos.exhibition],
            ].map(([title, src]) => <article key={title} className="group relative overflow-hidden border border-[#b88b5a]/25 bg-[#eee4d4]"><img src={src} alt={`${title} in India`} width={1280} height={720} loading="lazy" decoding="async" className="h-[250px] w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#211b17]/90 via-[#211b17]/25 to-transparent p-5 pt-16"><h3 className="text-sm font-semibold text-white">{title}</h3></div></article>)}
          </div>
        </section>


        <section data-utsav-reveal className="utsav-partner-section border-y border-[#e2d2bc] bg-[#f6f0e5]">
          <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-18">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <Eyebrow>Saath milkar · Better together</Eyebrow>
                <h2 className="utsav-display-font mt-4 max-w-[560px] text-[32px] font-semibold leading-tight tracking-[-.04em] md:text-[43px]">Every great event is an <span className="text-primary">ecosystem.</span></h2>
                <p className="mt-4 max-w-[470px] text-sm leading-7 text-muted-foreground">Utsav helps organizers coordinate the people and partners behind the experience — from the first brief to show day.</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
                {[
                  { icon: Building2, title: "Venues & spaces" },
                  { icon: Workflow, title: "Production & AV" },
                  { icon: Utensils, title: "Hospitality" },
                  { icon: Truck, title: "Travel & logistics" },
                  { icon: Handshake, title: "Sponsors & brands" },
                ].map(({ icon: Icon, title }) => (
                  <div key={title} className="utsav-partner-chip flex min-h-[112px] flex-col justify-between border border-[#e1cfb5] bg-[#fbf8f1] p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_12px_28px_rgba(78,54,32,.08)]">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-[11px] font-semibold leading-snug text-foreground">{title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-3 border-t border-[#e1cfb5] pt-5 text-[10px] leading-5 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>Partner categories Utsav is designed to coordinate — not a list of confirmed sponsor endorsements.</span>
              <Link to="/contact" className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary">Become a Utsav partner <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
        </section>

        <section data-utsav-reveal className="bg-foreground text-background">
          <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-6 px-5 py-12 md:px-8 md:py-16">
            <div><Eyebrow>Bring the operation into view</Eyebrow><h2 className="mt-3 max-w-[650px] text-[30px] font-semibold leading-tight md:text-[40px]">Give your team a calmer way to deliver.</h2></div>
            <Button asChild className="h-11 rounded-sm bg-primary px-5 text-xs text-primary-foreground hover:bg-primary/90"><Link to="/signup">Get started <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </section>
      </main>
      <PublicFooter />
      </div>
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
    eyebrow: "Utsav platform · काम ko banayein simple",
    title: "Har detail, in one clear view.",
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
    eyebrow: "Solutions · Har team ke liye",
    title: "Har team ka apna rhythm. One connected workflow.",
    description: "Flexible workflows for production teams, in-house event teams, experiential agencies, venues and partners.",
    items: [
      ["Event production teams", "Connect schedules, vendors, staffing and show-day operations across a portfolio.", "A reliable production plan"],
      ["In-house event teams", "Bring stakeholders together around a clear brief, budget and timeline.", "Aligned teams and approvals"],
      ["Experiential agencies", "Keep client programs, creative partners and delivery details moving together.", "A repeatable operating rhythm"],
      ["Venues & partners", "Coordinate incoming programs, on-site teams and shared resources.", "Fewer crossed wires"],
    ],
  },
  about: {
    eyebrow: "About Utsav · Hamari soch",
    title: "Har yaadgaar event ke peeche, ek thoughtful team.",
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
  const mainRef = useRef<HTMLElement>(null);
  usePublicReveal(mainRef);
  const icons = [ClipboardList, Wallet, Users, Clock3, Building2, ShieldCheck];
  return (
    <>
      <div className="utsav-public">
      <PublicNav active={page === "features" ? "Platform" : page === "solutions" ? "Solutions" : "About"} />
      <main ref={mainRef} className="utsav-public-main">
        <section data-utsav-reveal className="relative overflow-hidden bg-[#f3eee3]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full border border-[#b88b5a]/20" />
          <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1 className="mt-4 max-w-[780px] text-[38px] font-semibold leading-[1.08] tracking-[-0.9px] md:text-[54px]">{content.title}</h1>
            <p className="mt-5 max-w-[620px] text-sm leading-relaxed text-muted-foreground md:text-base">{content.description}</p>
            {page !== "about" && <Button asChild className="mt-7 h-10 rounded-sm px-5 text-xs"><Link to="/signup">See Utsav in action <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>}
          </div>
        </section>
        <section data-utsav-reveal className="mx-auto max-w-[1320px] px-5 py-12 md:px-8 md:py-16">
          <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {content.items.map(([title, body, detail], i) => {
              const Icon = icons[i % icons.length] ?? ClipboardList;
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
        <section data-utsav-reveal className="mx-auto max-w-[1320px] px-5 pb-14 md:px-8 md:pb-20">
          <img src={photos.venue} width={1600} height={900} alt="An event team preparing a venue for a live gathering" loading="lazy" decoding="async" className="max-h-[410px] w-full object-cover object-center" />
        </section>
        <section data-utsav-reveal className="bg-foreground text-background">
          <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-5 py-12 md:px-8">
            <div><p className="text-[10px] uppercase tracking-[0.13em] text-background/60">More room to focus</p><h2 className="mt-2 text-2xl font-semibold">Bring the work into view.</h2></div>
            <Button asChild className="h-10 rounded-sm"><Link to="/signup">Get started <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </section>
      </main>
      <PublicFooter />
      </div>
    </>
  );
}

export function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const mainRef = useRef<HTMLElement>(null);
  usePublicReveal(mainRef);
  const plans = [
    { name: "Team", summary: "For a small team finding its rhythm.", monthly: 4999, annual: 3999, features: ["Up to 5 active events", "Shared planning & task lists", "Vendor directory", "Core budget tracking"] },
    { name: "Studio", summary: "For production teams delivering more.", monthly: 14999, annual: 11999, features: ["Unlimited active events", "Team roles & approvals", "Workforce and resources", "Live operations workspace"] },
    { name: "Enterprise", summary: "For complex programs across teams.", monthly: null, annual: null, features: ["Portfolio administration", "Custom onboarding", "Advanced access options", "Dedicated success partner"] },
  ];
  return (
    <>
      <div className="utsav-public">
      <PublicNav active="Pricing" />
      <main ref={mainRef} className="utsav-public-main">
        <section data-utsav-reveal className="bg-secondary/55">
          <div className="mx-auto max-w-[1320px] px-5 py-14 text-center md:px-8 md:py-20">
            <Eyebrow>Soch badi. Plan simple.</Eyebrow>
            <h1 className="utsav-display-font mt-3 text-[40px] font-semibold tracking-[-0.04em] md:text-[56px]">A plan for every kind of उत्सव.</h1>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">Start with the essentials. Grow into a steadier way to deliver.</p>
            <div className="mt-6 inline-flex items-center gap-1 rounded-sm border border-border bg-background p-1">
              <button type="button" onClick={() => setAnnual(false)} className={`rounded-sm px-4 py-2 text-xs ${!annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>Monthly</button>
              <button type="button" onClick={() => setAnnual(true)} className={`rounded-sm px-4 py-2 text-xs ${annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>Annual · save 20%</button>
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground">Illustrative preview pricing in INR. Final commercial plans are not yet configured.</p>
          </div>
        </section>
        <section data-utsav-reveal className="mx-auto grid max-w-[1320px] gap-0 px-5 py-12 md:grid-cols-3 md:px-8 md:py-16">
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
        <section data-utsav-reveal className="mx-auto max-w-[900px] px-5 pb-16 text-center"><p className="text-xs text-muted-foreground">Need a different setup? <Link to="/contact" className="font-semibold text-primary">Talk with the Utsav team.</Link></p></section>
      </main>
      <PublicFooter />
      </div>
    </>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  usePublicReveal(mainRef);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    toast.success("Thanks — your demo enquiry has been captured in this preview.");
  }
  return (
    <>
      <div className="utsav-public">
      <PublicNav active="Contact" />
      <main ref={mainRef} className="utsav-public-main bg-secondary/40">
        <div data-utsav-reveal className="mx-auto grid max-w-[1160px] gap-10 px-5 py-14 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-20">
          <div><Eyebrow>Let’s talk about your workflow</Eyebrow><h1 className="utsav-display-font mt-4 text-[42px] font-semibold leading-tight tracking-[-.04em] md:text-[54px]">Baat shuru karein. Let’s bring your events into focus.</h1><p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Tell us what your team coordinates today and where you need more visibility.</p>
            <div className="mt-9 space-y-5 text-xs text-muted-foreground"><p className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> Contact through the enquiry form</p><p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> India · supporting event teams nationwide</p><p className="flex items-center gap-3"><Handshake className="h-4 w-4 text-primary" /> Sponsor, venue and ecosystem partnerships</p><p className="flex items-center gap-3"><CircleHelp className="h-4 w-4 text-primary" /> Product walkthroughs and team enquiries</p></div>
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
      </div>
    </>
  );
}

export function AuthPage({ signup = false }: { signup?: boolean }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  usePublicReveal(mainRef);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.info("Authentication is not connected yet. This is a frontend preview.");
    void navigate({ to: "/" });
  }
  return (
    <main ref={mainRef} className="utsav-public utsav-public-main grid min-h-screen bg-background md:grid-cols-2">
      <section data-utsav-reveal className="flex flex-col px-6 py-7 md:px-12 md:py-10">
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
      <aside data-utsav-reveal className="relative hidden overflow-hidden bg-foreground md:block">
        <img src={photos.venue} width={1600} height={900} alt="A thoughtfully prepared event venue" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/15" />
        <div className="absolute bottom-14 left-12 right-12 text-white"><Sparkles className="h-6 w-6 text-primary" /><h2 className="mt-5 max-w-lg text-[38px] font-semibold leading-tight">The details make the experience. Keep them connected.</h2><p className="mt-4 max-w-md text-sm leading-6 text-white/70">A shared operational view for the people who bring every event to life.</p></div>
      </aside>
    </main>
  );
}

export function PublicFaqLink() {
  return <Link to="/contact" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"><CircleHelp className="h-4 w-4" /> Questions? Talk to us</Link>;
}
