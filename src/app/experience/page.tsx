"use client";

import {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
  Fragment,
} from "react";
import { useIdle, useIntersection, useMedia, useNetworkState } from "react-use";
import {
  ArrowRight,
  Building2,
  Clock,
  Globe2,
  Sparkles,
  Target,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type React from "react";
import { GradientBullet } from "@/components/gradient-bullet";
import Link from "next/link";

type ExperienceTenure = "current" | "past";

type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  tenure: ExperienceTenure;
  focus: string;
  stack: string[];
  impactHighlights: string[];
};

const EXPERIENCE_ITEMS: readonly ExperienceItem[] = [
  {
    id: "lean-se",
    company: "Lean Innovation Labs",
    role: "Software Engineer",
    period: "Oct 2024 — Present",
    location: "USA · Remote-first",
    tenure: "current",
    focus:
      "Building production-grade features for AI-heavy products with a strong focus on UX stability and delivery speed.",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "Ant Design", "CI/CD"],
    impactHighlights: [
      "Shipped usability features like resizable panels and fast reset actions that reduced task-related clicks and smoothed daily workflows.",
      "Eliminated critical UI/UX issues by customizing design-system components instead of rewriting them, improving stability in production.",
      "Replaced manual Excel workflows by rapidly shipping targeted tools that saved hours of repetitive work per week.",
    ],
  },
  {
    id: "phygtl-pm",
    company: "Phygtl",
    role: "Product Manager Intern",
    period: "Feb 2025 — Mar 2025",
    location: "USA · Student-focused product",
    tenure: "past",
    focus:
      "Discovering UX friction, structuring feedback from thousands of users, and turning it into precise, high-impact changes.",
    stack: ["UX research", "Surveys", "SSO onboarding", "Analytics"],
    impactHighlights: [
      "Ran UX surveys and analyzed responses from thousands of users to pinpoint validation and tooltip issues that created unnecessary support load.",
      "Shadowed onboarding sessions to map real friction points in SSO setup, then drove changes that improved activation speed.",
      "Reframed navigation and “getting started” flows so new users had a clearer first-run experience and lower drop-off.",
    ],
  },
  {
    id: "js-associates",
    company: "JS Associates",
    role: "Full-Stack Web Developer",
    period: "May 2020 — May 2022",
    location: "India · Client projects",
    tenure: "past",
    focus:
      "Owning end-to-end feature work across React frontends and Node backends for revenue-critical flows and internal tooling.",
    stack: ["React", "Node.js", "REST APIs", "SQL", "GitHub Actions"],
    impactHighlights: [
      "Owned the development of a new e-commerce checkout flow, tuning both frontend and backend to cut page load time and friction.",
      "Built and rolled out a shared React component library that sped up feature delivery and made UI behavior more predictable.",
      "Helped stabilize production systems by resolving Node.js deadlocks and adding a reliable E2E testing layer around critical flows.",
    ],
  },
  {
    id: "rowan-ms",
    company: "Rowan University",
    role: "M.S. Computer Science",
    period: "Aug 2022 — May 2024",
    location: "Glassboro, NJ · Graduate program",
    tenure: "past",
    focus:
      "Deepening fundamentals in algorithms, systems, and data, while turning coursework projects into production-minded builds.",
    stack: ["Algorithms", "Databases", "Distributed systems", "Python", "SQL"],
    impactHighlights: [
      "Used academic projects as a playground for real architectures rather than throwaway demos, focusing on maintainability and observability.",
      "Explored full-stack patterns that now show up in portfolio work, from dashboards and AI tools to data-heavy backends.",
      "Collaborated with peers from varied backgrounds, mirroring the cross-functional dynamics of real engineering teams.",
    ],
  },
];

const TIMELINE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
};

const DOT_VARIANTS: Variants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: {
    scale: 1.1,
    opacity: 1,
    boxShadow: "0 0 0 4px rgba(147, 197, 253, 0.25)",
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

function useExperienceContext() {
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);
  const isDesktop = useMedia("(min-width: 900px)", false);
  const { online } = useNetworkState();
  const isIdle = useIdle(60_000);

  const summary = useMemo(() => {
    const totalRoles = EXPERIENCE_ITEMS.length;
    const currentRoles = EXPERIENCE_ITEMS.filter(
      (item) => item.tenure === "current"
    ).length;

    return {
      totalRoles,
      currentRoles,
      timelineSpan: "2020 → Present",
    };
  }, []);

  const connectionNote = useMemo(() => {
    if (online === false) {
      return "You appear to be offline. This page stays fully readable and keyboard-accessible.";
    }
    if (isIdle) {
      return "You’ve been idle for a bit. Your place on the timeline is preserved.";
    }
    return "Scroll or use the timeline to see how I grow roles over time instead of just changing titles.";
  }, [online, isIdle]);

  return {
    reduceMotion,
    isDesktop,
    summary,
    connectionNote,
  };
}

type TimelineItemCardProps = {
  readonly item: ExperienceItem;
  readonly isActive: boolean;
  readonly onInView: (id: string) => void;
  readonly reduceMotion: boolean;
};

function TimelineItemCard({
  item,
  isActive,
  onInView,
  reduceMotion,
}: TimelineItemCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const intersection = useIntersection(
    ref as unknown as React.RefObject<HTMLElement>,
    {
      root: null,
      rootMargin: "0px 0px -55% 0px",
      threshold: 0.3,
    }
  );

  useEffect(() => {
    if (intersection?.isIntersecting) {
      onInView(item.id);
    }
  }, [intersection, item.id, onInView]);

  return (
    <li className="relative" aria-labelledby={`experience-${item.id}-heading`}>
      <motion.div
        ref={ref}
        variants={reduceMotion ? {} : TIMELINE_VARIANTS}
        initial={reduceMotion ? undefined : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.35 }}
        className="relative pl-10"
      >
        <div
          className="absolute left-[0.85rem] top-0 h-full w-px bg-border/70"
          aria-hidden="true"
        />
        <motion.div
          variants={DOT_VARIANTS}
          animate={isActive ? "active" : "inactive"}
          className={cn(
            "absolute left-[0.35rem] top-6 flex h-4 w-4 items-center justify-center rounded-full border border-background",
            "bg-linear-to-tr from-primary/85 via-secondary/80 to-accent/75"
          )}
          aria-hidden="true"
        />
        <article
          id={`experience-${item.id}`}
          className={cn(
            "surface-soft rounded-2xl border border-border/70 p-4 md:p-5",
            isActive &&
              "border-transparent bg-linear-to-tr from-primary/10 via-secondary/12 to-accent/16 shadow-md shadow-primary/20"
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <h2
                id={`experience-${item.id}-heading`}
                className="text-sm font-semibold leading-snug md:text-base"
              >
                {item.role}
              </h2>
              <p className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground md:text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{item.company}</span>
                </span>
                <span aria-hidden="true" className="text-muted-foreground/60">
                  •
                </span>
                <span>{item.location}</span>
              </p>
            </div>
            <Badge
              variant={item.tenure === "current" ? "outline" : "secondary"}
              className={cn(
                "rounded-full border-border/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                item.tenure === "current"
                  ? "bg-linear-to-tr from-primary/10 via-secondary/10 to-accent/16 text-primary"
                  : "text-foreground bg-secondary/25"
              )}
            >
              {item.tenure === "current" ? "Current" : "Previous"}
            </Badge>
          </div>

          <p className="mt-2 text-xs text-muted-foreground md:text-[13px]">
            {item.focus}
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/70 bg-card/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-3 space-y-1.5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground/90">
              <Target className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>Selected ways I added value</span>
            </p>
            <ul className="space-y-1.5 text-xs text-muted-foreground md:text-[13px]">
              {item.impactHighlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/70"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground/90">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{item.period}</span>
            </span>
          </div>
        </article>
      </motion.div>
    </li>
  );
}

type TimelineRailProps = {
  readonly activeId: string;
  readonly onActiveChange: (id: string) => void;
  readonly reduceMotion: boolean;
};

function ExperienceTimelineRail({
  activeId,
  onActiveChange,
  reduceMotion,
}: TimelineRailProps) {
  return (
    <section
      aria-label="Experience timeline"
      className="relative mt-2"
    >
      <ol className="space-y-6">
        {EXPERIENCE_ITEMS.map((item, index) => (
          <Fragment key={item.id}>
            <TimelineItemCard
              item={item}
              isActive={item.id === activeId}
              onInView={onActiveChange}
              reduceMotion={reduceMotion}
            />
            {index === EXPERIENCE_ITEMS.length - 1 ? null : (
              <span className="sr-only">Continues to next role</span>
            )}
          </Fragment>
        ))}
      </ol>
    </section>
  );
}

type TimelineMiniNavProps = {
  readonly activeId: string;
  readonly onSelect: (id: string) => void;
};

function TimelineMiniNav({ activeId, onSelect }: TimelineMiniNavProps) {
  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id);
      const el = document.getElementById(`experience-${id}`);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offset = window.innerHeight * 0.22;
      const top = rect.top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [onSelect]
  );

  return (
    <nav
      aria-label="Quick timeline navigation"
      className="surface-soft sticky top-24 hidden h-fit flex-col gap-2 rounded-2xl border border-border/70 p-6 text-xs md:flex"
    >
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Snapshot timeline
      </p>
      <ol className="space-y-1.5">
        {EXPERIENCE_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleSelect(item.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "bg-linear-to-tr from-primary/12 via-secondary/12 to-accent/18 text-foreground"
                    : "bg-card/40 text-muted-foreground hover:bg-card/80"
                )}
                aria-current={isActive ? "step" : undefined}
              >
                <span className="flex flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                    {item.company}
                  </span>
                  <span className="text-[11px] text-muted-foreground/90">
                    {item.role}
                  </span>
                </span>
                <span className="ml-2 mb-1.5 inline-flex h-2.5 w-2.5 items-center justify-center">
                  <GradientBullet />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function ExperienceSummary({
  totalRoles,
  timelineSpan,
  connectionNote,
}: {
  readonly totalRoles: number;
  readonly timelineSpan: string;
  readonly connectionNote: string;
}) {
  return (
    <section
      aria-label="Experience overview"
      className="space-y-5 md:space-y-6"
    >
      <header className="space-y-3">
        <Badge
          variant="outline"
          className={cn(
            "inline-flex max-w-full items-center gap-2 rounded-full border-border/70 bg-card/80 px-3 py-1",
            "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          )}
        >
          <span className="inline-flex h-1.5 w-10 rounded-full bg-linear-to-r from-primary via-secondary to-accent" />
          <span>Experience</span>
        </Badge>
        <h1 className="text-balance text-2xl font-semibold leading-snug md:text-3xl">
          A timeline that blends{" "}
          <span className="text-gradient text-gradient-small font-bold">
            product thinking, engineering depth, and real-world constraints.
          </span>
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          These roles show how I move from individual contributor work to owning
          flows end-to-end: talking to users, building the systems underneath,
          and keeping delivery predictable.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="surface-soft space-y-1 rounded-2xl border border-border/70 p-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Timeline span
          </p>
          <p className="text-sm font-semibold">{timelineSpan}</p>
          <p className="text-[11px] text-muted-foreground">
            From early full-stack client work to AI-heavy products and grad
            research.
          </p>
        </div>
        <div className="surface-soft space-y-1 rounded-2xl border border-border/70 p-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Experience focus
          </p>
          <p className="text-sm font-semibold">
            {totalRoles} roles · Full-stack · Product · Academic
          </p>
          <p className="text-[11px] text-muted-foreground">
            A mix of engineering, product discovery, and computer science
            fundamentals.
          </p>
        </div>
        <div className="surface-soft space-y-1 rounded-2xl border border-border/70 p-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Collaboration style
          </p>
          <p className="flex items-center gap-1 text-sm font-medium">
            <Globe2 className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Distributed · Product-led</span>
          </p>
          <p className="text-[11px] text-muted-foreground">
            Comfortable with async updates, design reviews, and tight feedback
            loops.
          </p>
        </div>
      </div>

      <div className="surface-soft flex flex-col gap-2 rounded-2xl border border-border/70 p-3.5 md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground/90">
          <Sparkles
            className="h-3.5 w-3.5 text-primary shrink-0"
            aria-hidden="true"
          />
          <span>{connectionNote}</span>
        </p>
        <Button
          asChild
          jellyTone="ghost"
          size="sm"
          aria-label="Navigate to hire me page to discuss collaboration"
          className="w-full md:w-auto"
        >
          <Link
            href="/hire-me"
            className="flex items-center gap-1 justify-center"
          >
            <span className="text-xs">Discuss opportunities</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default function ExperiencePage() {
  const { reduceMotion, isDesktop, summary, connectionNote } =
    useExperienceContext();
  const [activeId, setActiveId] = useState<string>(EXPERIENCE_ITEMS[0]?.id);

  const handleActiveChange = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? prev : id));
  }, []);

  return (
    <main id="main-content" className="space-y-10 md:space-y-12 lg:space-y-14">
      <ExperienceSummary
        totalRoles={summary.totalRoles}
        timelineSpan={summary.timelineSpan}
        connectionNote={connectionNote}
      />

      <section
        aria-label="Detailed experience timeline"
        className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.5fr)]"
      >
        {isDesktop && (
          <TimelineMiniNav activeId={activeId} onSelect={setActiveId} />
        )}

        <div className="space-y-4">
          {!isDesktop && (
            <div className="surface-soft flex items-center justify-between gap-2 rounded-2xl border border-border/70 p-3 text-xs">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Scroll through the roles below
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/90">
                <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Timeline adapts as you scroll</span>
              </span>
            </div>
          )}

          <ExperienceTimelineRail
            activeId={activeId}
            onActiveChange={handleActiveChange}
            reduceMotion={reduceMotion}
          />
        </div>
      </section>
    </main>
  );
}