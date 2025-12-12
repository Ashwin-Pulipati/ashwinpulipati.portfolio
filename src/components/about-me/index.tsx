"use client";

import { useIdle, useMedia } from "react-use";

import { cn } from "@/lib/utils";

import { AboutAvailabilityBadge } from "./about-availability-badge";
import { IntroTile } from "./intro-tile";
import { CenterHeroTile } from "./center-hero-tile";
import { TimelineAndOutsideTile } from "./timeline-and-outside-tile";
import { PillarSection } from "./pillar-section";
import { DAY_TO_DAY, TEAMS_EXPECT } from "./constants";

export const AboutMe = () => {
  const isIdle = useIdle(30_000);
  const prefersReducedMotion = useMedia(
    "(prefers-reduced-motion: reduce)",
    false
  );
  const ctaLabel = isIdle ? "Jump back into my résumé" : "View résumé";

  return (
    <main
      className={cn(
        "mx-auto w-full max-w-7xl px-4 pb-16 pt-6 space-y-6",
        !prefersReducedMotion &&
          "animate-in fade-in slide-in-from-bottom-4 duration-700"
      )}
      aria-label="About Ashwin Pulipati"
    >
      <AboutAvailabilityBadge prefersReducedMotion={prefersReducedMotion} />

      <div
        className={cn(
          "grid gap-4",
          "lg:grid-cols-2",
          "xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.5fr)_minmax(0,1.1fr)]",
          "xl:items-stretch"
        )}
      >
        <IntroTile />
        <CenterHeroTile ctaLabel={ctaLabel} />
        <TimelineAndOutsideTile />
      </div>

      <div
        aria-label="How I work and what teams can expect"
        className="grid gap-4 md:grid-cols-2"
      >
        <PillarSection title="How I work day-to-day" items={DAY_TO_DAY} />
        <PillarSection title="What teams can expect" items={TEAMS_EXPECT} />
      </div>
    </main>
  );
};

export default AboutMe;
