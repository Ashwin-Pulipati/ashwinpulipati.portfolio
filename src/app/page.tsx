"use client";

import Link from "next/link";
import { ArrowRight, FileText, Terminal } from "lucide-react";
import { useIdle, useMedia } from "react-use";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const HERO_TAGS = [
  "AI Platforms",
  "Real-Estate & E-commerce",
  "DevOps Pipelines",
  "Mobile & Web",
  "Games & Web3",
] as const;

const GradientBullet = () => (
  <span
    className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-linear-to-tr from-primary via-secondary to-accent shadow-[0_0_4px_rgba(0,0,0,0.25)]"
    aria-hidden="true"
  />
);

const HomeSection = () => {
  const isDesktop = useMedia("(min-width: 1024px)", false);
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);
  const isIdle = useIdle(25_000);

  const primaryCtaLabel = isIdle ? "Jump back into my work" : "Explore my work";

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className={cn(
        "relative mx-auto flex w-full max-w-7xl flex-col gap-8 pb-12 pt-4",
        "lg:min-h-[70vh] lg:flex-row lg:items-center lg:gap-10"
      )}
    >
      {/* LEFT COLUMN */}
      <div className="flex w-full flex-1 flex-col gap-6 max-w-full">
        <Badge
          variant="outline"
          className={cn(
            "inline-flex max-w-full items-center gap-2 rounded-full border-border/70 bg-card/80 px-3 py-1",
            "text-[11px] font-medium tracking-[0.16em] uppercase text-muted-foreground",
            !reduceMotion && ""
          )}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full dark:bg-emerald-400 bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full dark:bg-emerald-500 bg-emerald-600" />
          </span>
          <span className="truncate sm:whitespace-normal">
            Available for hire
          </span>
        </Badge>

        <div className="space-y-3 max-w-full">
          <h1
            id="home-heading"
            className="text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl"
          >
            <span className="block text-gradient">If it runs on code,</span>
            <span className="block text-foreground">
              I design, build, and ship it.
            </span>
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            I&apos;m Ashwin Pulipati, a full-stack engineer who moves
            comfortably across web apps, AI workflows, DevOps pipelines, mobile
            experiences, and even game engines. From real-estate and e-commerce
            backends to AI-powered tools and weather dashboards, I focus on
            shipping systems that are reliable, maintainable, and actually used.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-3 w-full md:flex-row md:items-center md:w-auto">
          <Button
            asChild
            jellyTone="gradient"
            size={isDesktop ? "lg" : "default"}
            aria-label="View Ashwin's selected work"
            className="w-full md:w-auto"
          >
            <Link href="/work">
              <span className="flex items-center justify-center gap-2">
                <span>{primaryCtaLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </Button>

          <Button
            asChild
            jellyTone="ghost"
            size={isDesktop ? "lg" : "default"}
            aria-label="Open Ashwin's résumé"
            className="w-full md:w-auto"
          >
            <Link href="/resume">
              <span className="flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" aria-hidden />
                <span>View résumé</span>
              </span>
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-muted-foreground">
          {HERO_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-border/70 bg-card/80 px-3 py-1 font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <aside className="flex w-full max-w-full flex-1 flex-col gap-4 lg:max-w-lg">
        <div className="surface-soft relative w-full max-w-full overflow-hidden p-4 sm:p-5">
          <div className="mb-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <Terminal className="h-3 w-3" aria-hidden />
              Snapshot
            </span>
            <Badge
              variant="gradient"
              className="max-w-full text-[11px] font-medium tracking-normal"
            >
              Currently shipping multi-stack, AI-aware products
            </Badge>
          </div>

          <dl className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2 md:gap-4">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Focus
              </dt>
              <dd className="mt-1 font-medium text-foreground">
                AI-native full-stack & frontend
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Tooling
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                React, Next.js, Node, Python, AWS, CI/CD
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Quality
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                Accessibility, tests, observability
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Collaboration
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                Founders, PMs, designers, and engineers
              </dd>
            </div>
          </dl>
        </div>

        <div className="surface-soft flex w-full max-w-full flex-col gap-3 p-4 text-xs text-muted-foreground sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
            How I like to work
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <GradientBullet />
              <span>
                Start from real constraints, then choose the right stack across
                web, mobile, data, and infra.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <GradientBullet />
              <span>
                Treat AI, automation, and observability as first-class features,
                not afterthoughts.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <GradientBullet />
              <span>
                Ship iteratively with automated checks, clean git history, and
                lightweight documentation.
              </span>
            </li>
          </ul>

          <div className="pt-1 text-[11px] text-muted-foreground">
            <Link
              href="/about-me"
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              Learn more about how I work
            </Link>{" "}
            ·{" "}
            <Link
              href="/expertise"
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              See the full stack I work in
            </Link>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default HomeSection;