"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Linkedin} from "lucide-react";
import { useIdle, useMedia } from "react-use";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GradientBullet } from "@/components/gradient-bullet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const PROFILE_TAGS = [
  "Full-Stack Engineer • React / TypeScript",
  "Node.js • Python • SQL • Django / FastAPI",
  "Open to relocation • Remote-friendly",
] as const;

const SKILL_TAGS = [
  "AI-native Platforms & Tooling",
  "Frontend Experience (Next.js, UX)",
  "Backend & APIs (Node, Django, FastAPI)",
  "DevOps Pipelines & Observability",
] as const;

const DAY_TO_DAY = [
  "Translate fuzzy, real-world requirements into clear scopes, technical plans, and delivery milestones.",
  "Build end-to-end features across React/Next.js frontends and Node/Python backends with a strong focus on reliability.",
  "Treat testing, CI/CD, and observability (logs, metrics, traces) as first-class parts of the work, not bolt-ons.",
  "Continuously tighten UX details—accessibility, responsiveness, performance—so the product feels trustworthy and fast.",
] as const;

const TEAMS_EXPECT = [
  "Thoughtful collaboration with PMs, designers, and engineers from RFCs and diagrams to rollouts and post-mortems.",
  "Early visibility into trade-offs and risks, with pragmatic options instead of surprises late in the cycle.",
  "Comfort working across stacks: tuning React performance, debugging APIs, and wiring CI pipelines when needed.",
  "A bias toward ownership: leaving modules, docs, and workflows clearer and more maintainable than I found them.",
] as const;

const OUTSIDE_OF_WORK = [
  "Exploring new stacks through side projects: AI sandboxes, game engines, and domain-focused apps.",
  "Studying real-world system design patterns from SaaS, e-commerce, and infrastructure-heavy products.",
  "Tinkering with dev-tools, CLIs, and small utilities that remove friction for future projects.",
] as const;

const TIMELINE_ITEMS = [
  {
    period: "2024 → Now",
    title: "Software Engineer – Lean Innovation Labs",
    body: "Building and maintaining production-grade systems while reducing UI/UX issues, improving workflows, and contributing to a fast-moving AI-heavy engineering environment.",
  },
  {
    period: "2022 → 2024",
    title: "Master’s in Computer Science – Rowan University",
    body: "Strengthened full-stack fundamentals across algorithms, backend systems, databases, and large-scale application architecture while building multiple personal/portfolio projects.",
  },
  {
    period: "2020 → 2022",
    title: "Full-Stack Web Developer – JS Associates",
    body: "Owned end-to-end development of React and Node.js modules, introduced CI/CD automation, and stabilized production systems through better testing, performance tuning, and debugging.",
  },
] as const;

const AboutAvatar = () => {
  const prefersReducedMotion = useMedia(
    "(prefers-reduced-motion: reduce)",
    false
  );

  return (
    <div className="relative mx-auto h-32 w-32 shrink-0 rounded-3xl bg-card sm:h-36 sm:w-36 md:h-44 md:w-44">
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-3xl bg-linear-to-tr from-primary/70 via-secondary/70 to-accent/70 opacity-70 blur-xl",
          prefersReducedMotion && "blur-md opacity-60"
        )}
      />
      <div className="relative m-[3px] flex h-[calc(100%-6px)] w-[calc(100%-6px)] items-center justify-center overflow-hidden rounded-[1.4rem] bg-card shadow-[0_18px_40px_oklch(0_0_0/_0.18)]">
        <Avatar className="h-full w-full rounded-[1.4rem]">
          <AvatarImage
            src="/real-me.png"
            alt="Portrait of Ashwin Pulipati"
            className="h-full w-full object-cover"
          />
          <AvatarFallback className="rounded-[1.4rem] text-sm font-semibold">
            AP
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

const TagBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge
    variant="outline"
    className="rounded-full border-border/70 bg-card/80 px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-[0_1px_0_oklch(0.98_0_0/0.7),0_5px_5px_oklch(0.7_0_0/0.35)]"
  >
    {children}
  </Badge>
);

const PillarSection = ({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) => (
  <section className="surface-soft flex h-full flex-col gap-3 p-5">
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
      {title}
    </h2>
    <ul className="space-y-2 text-sm text-muted-foreground md:text-[13px]">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <GradientBullet />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </section>
);

const IntroTile = () => (
  <section
    aria-label="High-level overview"
    className="surface-soft flex h-full flex-col justify-between gap-6 p-5 sm:p-6"
  >
    <div className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        At a glance
      </p>
      <h1 className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
        A product-minded engineer who bridges UX, systems, and delivery.
      </h1>
      <p className="text-sm leading-relaxed text-muted-foreground">
        I work across the stack from React/Next.js frontends to Node, Django,
        and FastAPI backends to ship features that are usable, observable, and
        production-ready. Recent work includes AI-powered tools, F-1 visa
        timelines, weather dashboards, and custom engines that keep performance
        and user experience tightly aligned.
      </p>
    </div>

    <div className="space-y-2 text-[11px] text-muted-foreground">
      {PROFILE_TAGS.map((tag) => (
        <p key={tag}>{tag}</p>
      ))}
    </div>
  </section>
);

const CenterHeroTile = ({ ctaLabel }: { ctaLabel: string }) => (
  <section
    aria-label="Profile and primary actions"
    className="surface-soft relative flex h-full flex-col items-center overflow-hidden p-5 sm:p-6 xl:p-8"
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-40 opacity-70 blur-3xl"
    >
      <div className="mx-auto h-full max-w-md rounded-full bg-[radial-gradient(circle_at_top,_theme(colors.primary/40),transparent_55%),radial-gradient(circle_at_bottom,_theme(colors.secondary/40),transparent_55%)] dark:opacity-80" />
    </div>

    <div className="relative flex flex-col items-center gap-4 text-center">
      <AboutAvatar />

      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          Ashwin Pulipati
        </h2>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Full-Stack Software Engineer
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 pt-1">
        {SKILL_TAGS.map((tag) => (
          <TagBadge key={tag}>{tag}</TagBadge>
        ))}
      </div>
    </div>

    <div className="relative mt-4 flex w-full flex-1 flex-col justify-between">
      <span className="hidden text-center text-xs text-muted-foreground sm:block">
        From AI-powered sandboxes to dashboards and engines, I enjoy owning the
        path from idea to production.
      </span>

      <div className="mt-6 flex w-full flex-col gap-4">
        <Button
          asChild
          jellyTone="gradient"
          size="lg"
          className="w-full justify-center text-sm"
          aria-label="Open résumé"
        >
          <Link href="/resume">
            <span className="flex items-center justify-center gap-2">
              <span>{ctaLabel}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </Button>

        <div className="flex w-full items-center justify-center gap-4">
          <Button
            asChild
            jellyTone="ghost"
            size="sm"
            aria-label="Open Ashwin's GitHub profile in a new tab"
            className="w-full max-w-40 justify-center text-xs sm:text-sm"
          >
            <Link
              href="https://github.com/Ashwin-Pulipati"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center gap-2"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              <span>GitHub</span>
            </Link>
          </Button>

          <Button
            asChild
            jellyTone="ghost"
            size="sm"
            aria-label="Open Ashwin's LinkedIn profile in a new tab"
            className="w-full max-w-40 justify-center text-xs sm:text-sm"
          >
            <Link
              href="https://www.linkedin.com/in/ashwinpulipati/"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center gap-2"
            >
              <Linkedin
                className="h-4 w-4 text-blue-800 dark:text-blue-500"
                aria-hidden="true"
              />
              <span>LinkedIn</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const TimelineAndOutsideTile = () => (
  <section
    aria-label="Timeline and outside interests"
    className="surface-soft flex h-full flex-col gap-5 p-5 sm:p-6"
  >
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Timeline
      </p>
      <div className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
        <ol
          className="relative space-y-5 border-l border-border/70 pl-4"
          aria-label="Career and education timeline"
        >
          {TIMELINE_ITEMS.map((item, index) => {
            const dotColors = ["bg-primary/85", "bg-secondary", "bg-accent"];
            const dotColor = dotColors[index % dotColors.length];

            return (
              <li key={item.period} className="relative pl-2">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-[1.30rem] top-1 inline-flex h-2.5 w-2.5 rounded-full brightness-105 shadow-[0_0_4px_rgba(0,0,0,0.35)]",
                    dotColor
                  )}
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/90">
                  {item.period}
                </p>
                <p className="font-semibold text-foreground/90">{item.title}</p>
                <p className="mt-0.5">{item.body}</p>
                {index !== TIMELINE_ITEMS.length - 1 && (
                  <span className="sr-only">Continues to next period</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>

    <Separator className="my-2 opacity-70" />

    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Outside of the editor
      </p>
      <ul className="space-y-1.5 text-[13px] leading-relaxed text-muted-foreground">
        {OUTSIDE_OF_WORK.map((item) => (
          <li key={item} className="flex gap-2">
            <GradientBullet />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const AboutPage = () => {
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
      <div className="flex items-center justify-start">
        <Badge
          variant="outline"
          className={cn(
            "inline-flex max-w-full items-center gap-2 rounded-full border-border/70 bg-card/80 px-3 py-1",
            "text-[11px] font-medium tracking-widest uppercase text-muted-foreground"
          )}
          role="status"
          aria-label="Open to relocation and remote-friendly roles"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            {!prefersReducedMotion && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70 animate-ping dark:bg-emerald-400" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-500" />
          </span>
          <span className="truncate">Open to relocation & Remote</span>
        </Badge>
      </div>

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

export default AboutPage;