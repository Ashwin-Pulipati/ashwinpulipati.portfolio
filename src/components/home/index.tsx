"use client";

import { useMemo } from "react";
import { useIdle, useMedia } from "react-use";

import { NAV_ITEMS } from "@/config/nav";
import { cn } from "@/lib/utils";

import { HeroHeader } from "./hero-header";
import { HeroCta } from "./hero-cta";
import { HeroTags } from "./hero-tags";
import { SnapshotCard } from "./snapshot-card";
import { HowIWorkCard } from "./how-i-work-card";

const HERO_TAGS = [
  "AI Platforms",
  "Real-Estate & E-commerce",
  "DevOps Pipelines",
  "Mobile & Web",
  "Games & Web3",
] as const;

export const Home = () => {
  const isDesktop = useMedia("(min-width: 1280px)", false);
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);
  const isIdle = useIdle(25_000);

  const primaryCtaLabel = isIdle ? "Jump back into my work" : "Explore my work";

  const resumeItem = useMemo(
    () => NAV_ITEMS.find((i) => i.label === "Resume"),
    []
  );

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className={cn(
        "relative mx-auto flex w-full max-w-7xl flex-col gap-8 pb-12 pt-4",
        "xl:min-h-[70vh] xl:flex-row xl:items-center xl:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700"
      )}
    >
      <div className="flex w-full flex-1 flex-col gap-6 max-w-full">
        <HeroHeader reduceMotion={reduceMotion} />

        <HeroCta
          isDesktop={isDesktop}
          primaryCtaLabel={primaryCtaLabel}
          resumeItem={{
            href: resumeItem?.href ?? "/resume",
            download: resumeItem?.download,
            ariaLabel: resumeItem?.ariaLabel ?? "Download Ashwin's résumé",
          }}
        />

        <HeroTags tags={HERO_TAGS} />
      </div>

      <aside className="flex w-full max-w-full flex-1 flex-col gap-4 xl:max-w-lg">
        <SnapshotCard />
        <HowIWorkCard />
      </aside>
    </section>
  );
};

export default Home;
