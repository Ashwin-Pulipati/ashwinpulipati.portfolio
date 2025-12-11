"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useIdle, useLocalStorage, useMedia, useNetworkState } from "react-use";

import {
  ArrowRight,
  Briefcase,
  CalendarIcon,
  Clock,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type OpportunityType = "full-time" | "internship" | "contract" | "open";

type OpportunityOption = {
  id: OpportunityType;
  label: string;
  description: string;
  badge?: string;
};

const OPPORTUNITY_OPTIONS: readonly OpportunityOption[] = [
  {
    id: "full-time",
    label: "Full-time roles",
    description:
      "Backend, frontend, or full-stack roles where I grow with the team.",
    badge: "Common",
  },
  {
    id: "internship",
    label: "Internships",
    description:
      "Summer or co-op roles with strong mentorship and real product work.",
    badge: "Early career",
  },
  {
    id: "contract",
    label: "Contract positions",
    description:
      "Short- or mid-term engineering work with clear scope and ownership.",
    badge: "Scoped",
  },
  {
    id: "open",
    label: "Open to discuss",
    description:
      "You have something different in mind and want to explore the fit.",
    badge: "Flexible",
  },
];

type QuickFact = {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const QUICK_FACTS: readonly QuickFact[] = [
  {
    label: "Location",
    value: "USA · Open to relocation and remote",
    icon: MapPin,
  },
  {
    label: "Time zone",
    value: "US Eastern · Flexible overlap",
    icon: Clock,
  },
  {
    label: "Collaboration",
    value: "Engineering teams, design-driven orgs, and data-first products",
    icon: Users,
  },
  {
    label: "Focus",
    value: "Software engineering across web, data, and cloud",
    icon: Briefcase,
  },
];

function useOpportunitiesContext() {
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);
  const { online } = useNetworkState();
  const isIdle = useIdle(90_000);
  const [storedOpportunity, setStoredOpportunity] =
    useLocalStorage<OpportunityType>(
      "portfolio-opportunity-focus",
      "full-time"
    );

  const opportunity = storedOpportunity ?? "full-time";

  const accessibilityNote = useMemo(
    () =>
      reduceMotion
        ? "Animations are reduced based on your system preference. All information and actions remain fully available."
        : "Subtle gradients and depth help highlight actions without relying only on color.",
    [reduceMotion]
  );

  const connectionNote = useMemo(() => {
    if (online === false) {
      return "You appear to be offline. You can draft a message here and copy it into your email client once you are connected.";
    }
    if (isIdle) {
      return "Your notes stay on this page until you refresh, so you can take your time refining them.";
    }
    return "A short, honest snapshot of what you are hiring for is more useful than a perfect brief.";
  }, [online, isIdle]);

  return {
    reduceMotion,
    opportunity,
    setOpportunity: setStoredOpportunity,
    accessibilityNote,
    connectionNote,
  };
}

function QuickFactCard({ fact }: { fact: QuickFact }) {
  const Icon = fact.icon;
  return (
    <div className="surface-soft flex items-start gap-3 p-4">
      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-linear-to-tr from-primary/12 via-secondary/12 to-accent/18 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="space-y-0.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {fact.label}
        </p>
        <p className="text-sm text-foreground">{fact.value}</p>
      </div>
    </div>
  );
}

function ContactNote({
  opportunity,
  draftValue,
  onDraftChange,
}: {
  opportunity: OpportunityType;
  draftValue: string;
  onDraftChange: (value: string) => void;
}) {
  const draftTemplate = useMemo(() => {
    if (opportunity === "full-time") {
      return "We are exploring a full-time role focused on...";
    }
    if (opportunity === "internship") {
      return "We are considering an internship opportunity where you would work on...";
    }
    if (opportunity === "contract") {
      return "We are interested in a contract position centered around...";
    }
    return "We would like to explore where your experience and our needs might intersect...";
  }, [opportunity]);

  const helperText =
    draftValue.trim().length > 0
      ? "You can refine this note here and then copy it into your email or ATS message."
      : "Two or three sentences are more than enough; clarity matters more than length.";

  return (
    <div className="surface-soft p-4 space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Draft your note
      </p>
      <p className="text-xs md:text-[13px] text-muted-foreground">
        This is a space to sketch what you are hiring for. You can copy it into
        your email client or ATS message.
      </p>
      <Textarea
        rows={4}
        placeholder={draftTemplate}
        value={draftValue}
        onChange={(e) => onDraftChange(e.target.value)}
        aria-label="Draft message about the opportunity"
      />
      <p className="text-[11px] text-muted-foreground/90">{helperText}</p>
    </div>
  );
}

function OpportunitySelector({
  value,
  onChange,
  reduceMotion,
}: {
  value: OpportunityType;
  onChange: (value: OpportunityType) => void;
  reduceMotion: boolean;
}) {
  return (
    <section className="surface-soft p-5 md:p-6 space-y-3">
      <div className="space-y-1.5">
        <Label>
          Opportunity Type{" "}
          <span className="text-xs text-muted-foreground">(optional)</span>
        </Label>
        <fieldset className="space-y-3" aria-label="Select collaboration type">
          <div className="grid gap-2 sm:grid-cols-2">
            {OPPORTUNITY_OPTIONS.map((option) => {
              const isActive = option.id === value;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onChange(option.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "group flex w-full flex-col items-start gap-2 rounded-2xl border px-3.5 py-3 text-left text-xs transition-all",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "border-transparent bg-linear-to-tr from-primary/10 via-secondary/12 to-accent/16 shadow-md shadow-primary/20"
                      : "border-border bg-card/80 hover:bg-card hover:shadow-sm"
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex h-2.5 w-2.5 rounded-full border",
                          isActive
                            ? "border-transparent bg-linear-to-tr from-primary via-secondary to-accent shadow-[0_0_16px_rgba(0,0,0,0.16)]"
                            : "border-muted-foreground/50 bg-background"
                        )}
                        aria-hidden="true"
                      />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {option.label}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]",
                        isActive
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {option.badge ?? "Option"}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground group-hover:text-muted-foreground/90">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
          {!reduceMotion && (
            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground/90">
              <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
              <span>
                You can adjust this later. It simply shapes how I read your
                message.
              </span>
            </p>
          )}
        </fieldset>
      </div>
    </section>
  );
}

function ContactSection({ opportunity }: { opportunity: OpportunityType }) {
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState("");
  const contactEmail = "ashwin@careeremail.net";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 450);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `To: ${contactEmail}\n\nSubject: Opportunity for ${opportunity} role\n\n${
          draft || ""
        }`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <section
        aria-labelledby="contact-form-heading"
        className="surface-soft p-5 md:p-6 space-y-4"
      >
        <header className="space-y-1">
          <h2
            id="contact-form-heading"
            className="text-base md:text-lg font-semibold leading-snug"
          >
            Contact form
          </h2>
          <p className="text-xs md:text-[13px] text-muted-foreground">
            Fill this in to generate a ready-to-send email. Your message is also
            copied to your clipboard so you can paste it into any ATS or chat.
          </p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="contact-name">Your name</Label>
              <Input
                id="contact-name"
                name="contact-name"
                autoComplete="name"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="work-email">Work email</Label>
              <Input
                id="work-email"
                name="work-email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="company">Company / team</Label>
              <Input
                id="company"
                name="company"
                placeholder="Org, product area, or team"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="role-title">Role title</Label>
              <Input
                id="role-title"
                name="role-title"
                placeholder="Software Engineer, Frontend, etc."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-link">
              Role link or reference{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="contact-link"
              name="contact-link"
              placeholder="Job posting URL, internal req ID, or brief label"
            />
          </div>
          <ContactNote
            opportunity={opportunity}
            draftValue={draft}
            onDraftChange={setDraft}
          />
          <div className="space-y-1.5">
            <Label htmlFor="message">
              Message{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Share a quick summary of the role, team, and what you are looking for..."
            />
            <p className="text-[11px] text-muted-foreground/90">
              If you leave this empty, I&apos;ll use the drafted role context
              above instead.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-1 md:flex-row md:items-center md:justify-between">
            <Button
              type="submit"
              jellyTone="primary"
              size="lg"
              onClick={handleCopy}
            >
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>
                  {copied ? "Copied & opening email..." : "Send via email"}
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Button>
            <p className="max-w-md text-[11px] text-muted-foreground">
              Or email me directly at{" "}
              <span className="font-mono text-foreground">
                ashwinpulipati@gmail.com
              </span>{" "}
              with a link to the role and this page.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

function OpportunitiesIntro({
  accessibilityNote,
}: {
  accessibilityNote: string;
}) {
  return (
    <section
      aria-labelledby="opportunities-heading"
      className="space-y-4 md:space-y-6"
    >
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-card/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span className="inline-flex h-1.5 w-10 rounded-full bg-linear-to-r from-primary via-secondary to-accent" />
          <span>Working together</span>
        </div>
        <h1
          id="opportunities-heading"
          className="text-balance text-2xl md:text-3xl font-semibold leading-snug"
        >
          I&apos;m looking for teams where{" "}
          <span className="text-gradient-small font-bold">
            shipping, quality, and learning
          </span>{" "}
          actually matter.
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
          I enjoy working on products that feel great to use, respect real-world
          constraints, and are built with solid engineering foundations. This
          page is for the people who might want me on their team.
        </p>
      </header>
      <p className="text-[11px] text-muted-foreground/90">
        {accessibilityNote}
      </p>
    </section>
  );
}

function FitSummary() {
  return (
    <section
      aria-label="How I usually fit into engineering teams"
      className="space-y-4"
    >
      <div className="surface-soft p-5 md:p-6 space-y-3">
        <h2 className="text-base font-semibold leading-snug">
          Direct contacts
        </h2>
        <div className="space-y-2 text-xs md:text-[13px] text-muted-foreground">
          <p>
            Prefer not to use the form? Use any of these and include a link to
            the role or project.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button jellyTone="ghost" size="lg" asChild>
            <a href={`mailto:sadsfdsg@fghnggf`}>
              <span className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Email: sfdsghsg@hjnhnfgdbdfsgv</span>
              </span>
            </a>
          </Button>

          <Button jellyTone="ghost" size="lg" asChild>
            <Link
              href={"https://www.linkedin.com/in/ashwinpulipati/"}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="flex items-center gap-2 text-sm">
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                <span>Message me on LinkedIn</span>
              </span>
            </Link>
          </Button>

          <Button jellyTone="ghost" size="lg" asChild>
            <Link
              href={"https://www.linkedin.com/in/ashwinpulipati/"}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="flex items-center gap-2 text-sm">
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>View GitHub / social</span>
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function HireMePage() {
  const {
    reduceMotion,
    opportunity,
    setOpportunity,
    accessibilityNote,
    connectionNote,
  } = useOpportunitiesContext();

  return (
    <main id="main-content" className="space-y-10 md:space-y-12 lg:space-y-14">
      <OpportunitiesIntro accessibilityNote={accessibilityNote} />
      <section
        aria-label="Fit at a glance and how to reach out"
        className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]"
      >
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {QUICK_FACTS.map((fact) => (
              <QuickFactCard key={fact.label} fact={fact} />
            ))}
          </div>
          <FitSummary />
          <section aria-label="Other ways to reach me" className="space-y-4">
            <div className="surface-soft p-5 md:p-6 space-y-3">
              <h2 className="text-base font-semibold leading-snug">
                Calendly (bonus)
              </h2>
              <p className="text-xs md:text-[13px] text-muted-foreground">
                If you already know this is a serious fit, you can book a short
                call directly.
              </p>
              <Button jellyTone="accent" size="lg" asChild>
                <Link
                  href={"https://www.linkedin.com/in/ashwinpulipati/"}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                    <span>Book a 20-minute intro call</span>
                  </span>
                </Link>
              </Button>
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <OpportunitySelector
            value={opportunity}
            onChange={setOpportunity}
            reduceMotion={reduceMotion}
          />
          <ContactSection opportunity={opportunity} />
        </div>
      </section>
    </main>
  );
}
