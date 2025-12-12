"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  useLocalStorage,
  useMedia,
  useCopyToClipboard,
  useTitle,
} from "react-use";
import {
  ArrowRight,
  Briefcase,
  CalendarIcon,
  Check,
  Clock,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Users,
  Send,
  SquarePen,
} from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type OpportunityType = "full-time" | "internship" | "contract" | "open";

type OpportunityOption = {
  id: OpportunityType;
  label: string;
};

const OPPORTUNITY_OPTIONS: readonly OpportunityOption[] = [
  { id: "full-time", label: "Full-time" },
  { id: "internship", label: "Internships" },
  { id: "contract", label: "Contract" },
  { id: "open", label: "Open to discuss" },
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
    value: "Engineering teams, design-driven orgs",
    icon: Users,
  },
  {
    label: "Focus",
    value: "Web, data, and cloud engineering",
    icon: Briefcase,
  },
];

const EMAIL = "ashwinpulipati@gmail.com";

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  roleTitle: string;
  contactLink: string;
  message: string;
};

type ContactFormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function useOpportunitiesContext() {
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);

  const [storedOpportunity, setStoredOpportunity] =
    useLocalStorage<OpportunityType>(
      "portfolio-opportunity-focus",
      "full-time"
    );

  const opportunity = storedOpportunity ?? "full-time";

  const accessibilityNote = useMemo(
    () =>
      reduceMotion
        ? "Animations are reduced based on your system preference."
        : "",
    [reduceMotion]
  );

  return {
    reduceMotion,
    opportunity,
    setOpportunity: setStoredOpportunity,
    accessibilityNote,
  };
}

function OpportunitySelector({
  value,
  onChange,
  reduceMotion,
}: {
  readonly value: OpportunityType;
  readonly onChange: (value: OpportunityType) => void;
  readonly reduceMotion: boolean;
}) {
  return (
    <div className="space-y-3 pt-2">
      <div className="space-y-3">
        <Label>
          Opportunity Type{" "}
          <span className="text-red-500 dark:text-red-400">*</span>
        </Label>

        <RadioGroup
          value={value}
          onValueChange={(val) => onChange(val as OpportunityType)}
          className="grid gap-2 sm:grid-cols-2"
          aria-label="Select opportunity type"
        >
          {OPPORTUNITY_OPTIONS.map((option) => {
            const isActive = option.id === value;
            return (
              <Label
                key={option.id}
                htmlFor={option.id}
                className={cn(
                  "group flex w-full cursor-pointer flex-col items-start gap-1.5 rounded-2xl border px-3 py-2.5 text-left text-xs transition-all hover:bg-card hover:shadow-sm",
                  isActive
                    ? "border-transparent bg-linear-to-tr from-primary/10 via-secondary/12 to-accent/16 shadow-md shadow-primary/20"
                    : "border-border bg-card/50"
                )}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className={cn(
                        "data-[state=checked]:border-primary data-[state=checked]:text-primary",
                        isActive
                          ? "border-primary"
                          : "border-muted-foreground/50"
                      )}
                    />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {option.label}
                    </span>
                  </span>
                </div>
              </Label>
            );
          })}
        </RadioGroup>

        {!reduceMotion && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground/90">
            <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
            <span>
              You can adjust this later. It simply shapes how I read your
              message.
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

function ContactSection({
  opportunity,
  setOpportunity,
  reduceMotion,
}: {
  readonly opportunity: OpportunityType;
  readonly setOpportunity: (val: OpportunityType) => void;
  readonly reduceMotion: boolean;
}) {
  const [formState, setFormState] = useLocalStorage<ContactFormState>(
    "hire-me-contact-form",
    {
      name: "",
      email: "",
      company: "",
      roleTitle: "",
      contactLink: "",
      message: "",
    }
  );

  const [{ value: clipboardValue }, copyToClipboard] = useCopyToClipboard();
  const [justCopied, setJustCopied] = useState(false);

  const state: ContactFormState = formState ?? {
    name: "",
    email: "",
    company: "",
    roleTitle: "",
    contactLink: "",
    message: "",
  };

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const opportunityLabel =
    OPPORTUNITY_OPTIONS.find((o) => o.id === opportunity)?.label ?? "a role";

  const handleFieldChange =
    (field: keyof ContactFormState) =>
    (value: string): void => {
      setFormState({
        ...state,
        [field]: value,
      });
      if (errors[field as keyof ContactFormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const validate = (): boolean => {
    const nextErrors: ContactFormErrors = {};
    if (!state.name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!state.email.trim()) {
      nextErrors.email = "Work email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(state.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!state.message.trim()) {
      nextErrors.message = "Message is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildEmailBody = (): string => {
    const lines: string[] = [];
    const subject = `Opportunity for ${opportunityLabel} (${
      state.roleTitle || "Software Engineering"
    })`;

    const mainMessage = state.message.trim()
      ? state.message.trim()
      : "We are exploring an opportunity that looks aligned with your background.";

    lines.push(`To: ${EMAIL}`);
    lines.push("");
    lines.push(`Subject: ${subject}`);
    lines.push("");
    lines.push("Hi Ashwin,");
    lines.push("");
    lines.push(mainMessage);
    lines.push("");
    if (state.company || state.roleTitle || state.contactLink) {
      lines.push("Role context:");
      if (state.company) lines.push(`• Company / team: ${state.company}`);
      if (state.roleTitle) lines.push(`• Role title: ${state.roleTitle}`);
      if (state.contactLink)
        lines.push(`• Link / reference: ${state.contactLink}`);
      lines.push("");
    }
    lines.push("Best,");
    lines.push(state.name || "Hiring manager");
    if (state.email) lines.push(state.email);

    return lines.join("\n");
  };

  const handleCopyOnly = () => {
    if (!validate()) {
      toast.error("Please fill in the required fields first.");
      return;
    }
    const payload = buildEmailBody();
    copyToClipboard(payload);
    setJustCopied(true);
    toast.success("Message copied to clipboard");
    setTimeout(() => setJustCopied(false), 2000);
  };

  const handleOpenPreview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setPreviewOpen(true);
  };

  const handleConfirmSend = async () => {
    if (submitting) return;
    setSubmitting(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    const subject = `Opportunity for ${opportunityLabel} (${
      state.roleTitle || "Software Engineering"
    })`;

    const messageForTemplate = state.message.trim()
      ? state.message.trim()
      : "We are exploring an opportunity that looks aligned with your background.";

    if (!serviceId || !templateId || !publicKey) {
      const payload = buildEmailBody();
      copyToClipboard(payload);
      toast.info("Email service not configured. Message copied to clipboard.");
      setSubmitting(false);
      setPreviewOpen(false);
      return;
    }

    const templateParams = {
      subject,
      to_name: "Ashwin",
      from_name: state.name,
      from_email: state.email,
      phone_number: "",
      role_context: "",
      company: state.company || "",
      role_title: state.roleTitle || "",
      opportunity_type: opportunityLabel,
      role_link: state.contactLink || "",
      message: messageForTemplate,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      toast.success("Message sent successfully!");
      setPreviewOpen(false);
    } catch {
      const payload = buildEmailBody();
      copyToClipboard(payload);
      toast.error("Failed to send. Message copied to clipboard instead.");
      setPreviewOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section
        aria-labelledby="contact-form-heading"
        className="surface-soft space-y-4 p-5 md:p-6"
      >
        <header className="space-y-1">
          <h2
            id="contact-form-heading"
            className="text-lg font-semibold leading-snug"
          >
            Contact form
          </h2>
          <p className="text-sm text-muted-foreground">
            Fill this in to generate a ready-to-send email.
          </p>
        </header>

        <form onSubmit={handleOpenPreview} className="space-y-4" noValidate>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="contact-name">
                Your name{" "}
                <span className="text-red-500 dark:text-red-400">*</span>
              </Label>
              <Input
                id="contact-name"
                name="contact-name"
                autoComplete="name"
                placeholder="Your name"
                value={state.name}
                onChange={(e) => handleFieldChange("name")(e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
              />
              {errors.name && (
                <p id="contact-name-error" className="text-xs text-destructive">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="work-email">
                Work email{" "}
                <span className="text-red-500 dark:text-red-400">*</span>
              </Label>
              <Input
                id="work-email"
                name="work-email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                value={state.email}
                onChange={(e) => handleFieldChange("email")(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "work-email-error" : undefined}
              />
              {errors.email && (
                <p id="work-email-error" className="text-xs text-destructive">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="company">Company / team</Label>
              <Input
                id="company"
                name="company"
                placeholder="Org, product area, or team"
                value={state.company}
                onChange={(e) => handleFieldChange("company")(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="role-title">Role title</Label>
              <Input
                id="role-title"
                name="role-title"
                placeholder="Software Engineer, etc."
                value={state.roleTitle}
                onChange={(e) => handleFieldChange("roleTitle")(e.target.value)}
              />
            </div>
          </div>

          <OpportunitySelector
            value={opportunity}
            onChange={setOpportunity}
            reduceMotion={reduceMotion}
          />

          <div className="space-y-1.5">
            <Label htmlFor="contact-link">
              Role link or reference{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>{" "}
              {/* Fluid text-xs */}
            </Label>
            <Input
              id="contact-link"
              name="contact-link"
              placeholder="Job posting URL, internal req ID, or brief label"
              value={state.contactLink}
              onChange={(e) => handleFieldChange("contactLink")(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">
              Message <span className="text-red-500 dark:text-red-400">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Share a quick summary of the role, team, and what you are looking for..."
              value={state.message}
              onChange={(e) => handleFieldChange("message")(e.target.value)}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-wrap xl:flex-nowrap">
              <Button
                type="button"
                variant="outline"
                size="lg"
                jellyTone="outline"
                onClick={handleCopyOnly}
                className="w-full sm:w-auto"
              >
                <span className="flex items-center gap-2 justify-center">
                  {justCopied ? (
                    <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <span>{justCopied ? "Copied" : "Copy to Clipboard"}</span>
                </span>
              </Button>

              <Button
                type="submit"
                jellyTone="primary"
                size="lg"
                disabled={submitting}
                className="w-full sm:w-auto"
              >
                <span className="flex items-center gap-2 justify-center">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Preview &amp; Send</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </span>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Or email me directly at{" "}
              <Link
                href="/about-me"
                className="font-semibold underline-offset-4 hover:text-foreground hover:underline"
              >
                {EMAIL}
              </Link>
            </p>
          </div>
        </form>
      </section>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="surface-soft max-w-[min(95vw,40rem)] rounded-2xl border border-border/70 p-4 md:p-6">
          <DialogHeader className="mt-10 md:mt-0">
            <DialogTitle className="text-lg">
              {" "}
              {/* Fluid text-lg */}
              Preview email before sending
            </DialogTitle>
            <DialogDescription className="text-sm">
              {" "}
              {/* Fluid text-sm */}
              This is the message that will be sent via EmailJS.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 rounded-2xl border border-border/60 bg-card/70 p-6 text-sm">
            {" "}
            {/* Fluid text-sm */}
            <pre className="whitespace-pre-wrap wrap-break-word font-sans">
              {buildEmailBody()}
            </pre>
          </div>

          <DialogFooter className="flex flex-col gap-4 pt-2 sm:flex-row sm:justify-between">
            <Button
              type="button"
              jellyTone="ghost"
              size="sm"
              onClick={() => setPreviewOpen(false)}
            >
              <span className="flex items-center justify-center gap-2">
                Edit
                <SquarePen className="h-4 w-4 shrink-0" />
              </span>
            </Button>
            <Button
              type="button"
              jellyTone="primary"
              size="sm"
              onClick={handleConfirmSend}
              disabled={submitting}
            >
              <span className="flex items-center justify-center gap-2">
                {submitting ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4 shrink-0 rotate-12" />
              </span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function OpportunitiesIntro({
  accessibilityNote,
}: {
  readonly accessibilityNote: string;
}) {
  return (
    <section
      aria-labelledby="opportunities-heading"
      className="space-y-4 md:space-y-5"
    >
      <header className="space-y-3">
        <Badge
          variant="outline"
          className={cn(
            "inline-flex max-w-full items-center gap-2 rounded-full border-border/70 bg-card/80 px-3 py-1",
            "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
          )}
        >
          <span className="inline-flex h-1.5 w-10 rounded-full bg-linear-to-r from-primary via-secondary to-accent" />
          <span>Working Together</span>
        </Badge>
        <h1
          id="opportunities-heading"
          className="text-balance text-3xl font-semibold leading-snug"
        >
          I&apos;m looking for teams where{" "}
          <span className="text-gradient font-bold">
            shipping, quality, and learning
          </span>{" "}
          actually matter.
        </h1>
        <p className="max-w-2xl text-md leading-relaxed text-muted-foreground">
          {" "}
          {/* Fluid text-md */}I enjoy working on products that feel great to
          use, respect real-world constraints, and are built with solid
          engineering foundations. This page is for the people who might want me
          on their team.
        </p>
      </header>
      {accessibilityNote && (
        <p className="text-xs text-muted-foreground/90">
          {" "}
          {/* Fluid text-xs */}
          {accessibilityNote}
        </p>
      )}
    </section>
  );
}

function QuickFactsInline() {
  const factStyles: Record<string, { bg: string; icon: string }> = {
    Location: {
      bg: "bg-emerald-500/10 dark:bg-emerald-500/25",
      icon: "text-emerald-500 dark:text-emerald-400",
    },
    "Time zone": {
      bg: "bg-sky-500/10 dark:bg-sky-500/25",
      icon: "text-sky-500 dark:text-sky-400",
    },
    Collaboration: {
      bg: "bg-purple-500/10 dark:bg-purple-500/25",
      icon: "text-purple-500 dark:text-purple-400",
    },
    Focus: {
      bg: "bg-amber-500/10 dark:bg-amber-500/25",
      icon: "text-amber-500 dark:text-amber-400",
    },
  };

  return (
    <section aria-label="At a glance" className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {" "}
        {/* Fluid text-sm */}
        LOGISTICS
      </h2>
      <div className="space-y-3">
        {QUICK_FACTS.map((fact) => {
          const Icon = fact.icon;
          const styles = factStyles[fact.label] ?? {
            bg: "bg-primary/12",
            icon: "text-primary",
          };

          return (
            <div
              key={fact.label}
              className="flex max-w-xs items-start gap-3 rounded-2xl border border-border/60 bg-card/60 p-3"
            >
              <span
                className={cn(
                  "mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-2xl",
                  styles.bg
                )}
              >
                <Icon
                  className={cn("h-4 w-4 shrink-0", styles.icon)}
                  aria-hidden="true"
                />
              </span>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {" "}
                  {/* Fluid text-xs */}
                  {fact.label}
                </p>
                <p className="text-sm text-foreground">{fact.value}</p>{" "}
                {/* Fluid text-sm */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DirectContacts() {
  return (
    <section aria-label="Direct contacts" className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {" "}
          {/* Fluid text-sm */}
          Find me elsewhere
        </h2>
        <p className="mt-1 max-w-xl text-xs text-muted-foreground">
          {" "}
          {/* Fluid text-xs */}
          Prefer not to use the form? Use any of these and include a link to the
          role or project.
        </p>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-4">
        <Button jellyTone="ghost" size="lg" className="w-fit md:w-auto" asChild>
          <a href={`mailto:${EMAIL}`}>
            <span className="flex items-center justify-center gap-2 text-sm">
              {" "}
              {/* Fluid text-sm */}
              <Mail
                className="h-4 w-4 shrink-0 text-rose-500 dark:text-rose-400"
                aria-hidden="true"
              />
              <span>Email</span>
            </span>
          </a>
        </Button>

        <Button jellyTone="ghost" size="lg" className="w-fit md:w-auto" asChild>
          <Link
            href="https://www.linkedin.com/in/ashwinpulipati/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="flex items-center justify-center gap-2 text-sm">
              {" "}
              {/* Fluid text-sm */}
              <Linkedin
                className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400"
                aria-hidden="true"
              />
              <span>LinkedIn</span>
            </span>
          </Link>
        </Button>

        <Button jellyTone="ghost" size="lg" className="w-fit md:w-auto" asChild>
          <Link
            href="https://github.com/Ashwin-Pulipati"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="flex items-center justify-center gap-2 text-sm">
              {" "}
              {/* Fluid text-sm */}
              <Github
                className="h-4 w-4 shrink-0 text-zinc-600 dark:text-zinc-400"
                aria-hidden="true"
              />
              <span>GitHub</span>
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}

function CalendlyBlock() {
  return (
    <section aria-label="Calendly booking" className="space-y-2">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {" "}
        {/* Fluid text-sm */}
        Ready to chat?
      </h2>
      <p className="max-w-xl text-xs text-muted-foreground">
        {" "}
        {/* Fluid text-xs */}
        If you already know this is a serious fit, you can book a short call
        directly.
      </p>
      <Button jellyTone="accent" size="lg" asChild>
        <Link
          href="https://www.linkedin.com/in/ashwinpulipati/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span className="flex items-center gap-2 text-sm">
            {" "}
            {/* Fluid text-sm */}
            <CalendarIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Book a 20-minute intro call</span>
          </span>
        </Link>
      </Button>
    </section>
  );
}

export default function HireMePage() {
  const { reduceMotion, opportunity, setOpportunity, accessibilityNote } =
    useOpportunitiesContext();

  useTitle("Work with Ashwin – Opportunities");

  return (
    <main
      id="main-content"
      className="space-y-8 md:space-y-10 lg:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <section
        aria-label="Fit at a glance and how to reach out"
        className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
      >
        <div className="space-y-6 md:space-y-7">
          <OpportunitiesIntro accessibilityNote={accessibilityNote} />

          <Separator className="bg-border/60" />

          <QuickFactsInline />

          <Separator className="bg-border/60" />

          <DirectContacts />

          <Separator className="bg-border/60" />

          <CalendlyBlock />
        </div>

        <div className="space-y-4">
          <ContactSection
            opportunity={opportunity}
            setOpportunity={setOpportunity}
            reduceMotion={reduceMotion}
          />
        </div>
      </section>
    </main>
  );
}