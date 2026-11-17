import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicFooter } from "@/components/eventops/public-site";

type LegalPageKind = "privacy" | "terms" | "cookies";

const pageContent: Record<LegalPageKind, { title: string; summary: string; sections: [string, string][] }> = {
  privacy: {
    title: "Privacy policy",
    summary: "A draft outline of the privacy information Utsav should publish before accepting real user data.",
    sections: [
      ["Who is responsible", "The legal entity operating Utsav and its privacy contact have not yet been provided. This draft does not identify a data controller."],
      ["Information and purpose", "The information Utsav collects, why it is collected, how long it is kept, and the lawful basis for each use must be documented and confirmed before this policy is used."],
      ["Sharing and service providers", "Any service providers, data recipients, international transfers, and safeguards must be listed by the Utsav operator before launch."],
      ["Your choices and rights", "The process for access, correction, deletion, objections, and complaints must be confirmed for the jurisdictions where Utsav operates."],
      ["Contact", "A verified privacy contact address is not configured. Please contact the Utsav team through the enquiry form for product questions."],
    ],
  },
  terms: {
    title: "Terms of service",
    summary: "A draft outline only. Final service terms and the contracting entity are not yet confirmed.",
    sections: [
      ["Using Utsav", "The permitted use of the service, account requirements, and customer responsibilities must be confirmed by the Utsav operator."],
      ["Plans and billing", "Plan limits, fees, billing, renewals, taxes, and cancellation terms are not final. Preview pricing is illustrative only and is not an offer."],
      ["Customer content", "The rights, responsibilities, retention, and handling rules for event plans and other customer content must be documented before launch."],
      ["Availability and support", "Availability commitments, support coverage, service changes, and termination rules have not yet been set out."],
      ["Legal terms and contact", "Governing law, dispute handling, and the legal entity's verified contact details require review and confirmation."],
    ],
  },
  cookies: {
    title: "Cookie policy",
    summary: "A draft outline. Confirm the production site's cookies and consent requirements before publishing this policy.",
    sections: [
      ["What cookies are used", "The production cookie inventory and the purpose of each cookie have not yet been documented."],
      ["Essential storage", "Any storage needed for sign-in, security, or core service functions must be identified and described in the final policy."],
      ["Analytics and preferences", "Analytics, advertising, and preference technologies should only be described after the production configuration and consent controls are confirmed."],
      ["Managing your choices", "The available browser and consent controls must be documented once they are configured for the live service."],
      ["Updates and contact", "This draft needs review by the Utsav operator and legal counsel before it is used for a live service."],
    ],
  },
};

export function LegalPage({ kind }: { kind: LegalPageKind }) {
  const content = pageContent[kind];
  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-[70px] max-w-[1320px] items-center justify-between px-5 md:px-8">
          <Link to="/" aria-label="Utsav home"><img src="/utsav-horizontal-logo-navbar.svg" alt="Utsav" className="h-11 w-auto" /></Link>
          <Button asChild variant="outline" size="sm"><Link to="/contact">Contact</Link></Button>
        </div>
      </header>
      <main className="min-h-[65vh] bg-secondary/35">
        <section className="utsav-jaali-pattern border-b border-border">
          <div className="mx-auto max-w-[960px] px-5 py-14 md:px-8 md:py-20">
            <p className="eyebrow">Utsav · Legal information</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">{content.title}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">{content.summary}</p>
            <p className="mt-6 inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-medium text-primary">Draft placeholder · Requires confirmation and legal review before publication</p>
          </div>
        </section>
        <div className="mx-auto max-w-[960px] px-5 py-10 md:px-8 md:py-14">
          {content.sections.map(([title, body], index) => (
            <section key={title} className="grid gap-3 border-b border-border py-6 first:pt-0 md:grid-cols-[220px_1fr] md:gap-8">
              <h2 className="text-sm font-semibold"><span className="mr-3 text-xs font-normal text-primary">0{index + 1}</span>{title}</h2>
              <p className="text-sm leading-7 text-muted-foreground">{body}</p>
            </section>
          ))}
          <Button asChild className="mt-8"><Link to="/contact">Contact Utsav <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}