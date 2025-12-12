"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useCopyToClipboard, useLocalStorage } from "react-use";
import { ArrowRight, Check, Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { EMAIL, OPPORTUNITY_OPTIONS } from "./constants";
import type {
  ContactFormErrors,
  ContactFormState,
  OpportunityType,
} from "./types";
import { OpportunitySelector } from "./opportunity-selector";
import { EmailPreviewDialog } from "./email-preview-dialog";

export function ContactSection({
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
      setFormState({ ...state, [field]: value });
      if (errors[field as keyof ContactFormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const validate = (): boolean => {
    const nextErrors: ContactFormErrors = {};
    if (!state.name.trim()) nextErrors.name = "Name is required.";
    if (!state.email.trim()) nextErrors.email = "Work email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(state.email.trim()))
      nextErrors.email = "Enter a valid email address.";
    if (!state.message.trim()) nextErrors.message = "Message is required.";

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

  const emailBody = useMemo(
    () => buildEmailBody(),
    [
      opportunityLabel,
      state.company,
      state.contactLink,
      state.email,
      state.message,
      state.name,
      state.roleTitle,
    ]
  );

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
              <span className="text-xs text-muted-foreground">(optional)</span>
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

      <EmailPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        emailBody={emailBody}
        submitting={submitting}
        onEdit={() => setPreviewOpen(false)}
        onConfirmSend={handleConfirmSend}
      />
    </>
  );
}
