"use client";

import { useTitle } from "react-use";

import { Separator } from "@/components/ui/separator";

import { OpportunitiesIntro } from "./opportunities-intro";
import { QuickFactsInline } from "./quick-facts-inline";
import { DirectContacts } from "./direct-contacts";
import { CalendlyBlock } from "./calendly-block";
import { ContactSection } from "./contact-section";
import { useOpportunities } from "@/hooks/use-opportunities";

export default function HireMe() {
  const { reduceMotion, opportunity, setOpportunity, accessibilityNote } =
    useOpportunities();

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
