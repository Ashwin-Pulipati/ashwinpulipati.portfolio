"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useMedia } from "react-use";
import {
  Code2,
  Server,
  Cloud,
  Users,
  ArrowRight,
  Palette,
  Database,
  Satellite,
  Blocks,
  Factory,
  Handshake,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { GradientBullet } from "@/components/gradient-bullet";

type TrackId = "product-frontend" | "backend-apis" | "platform-devops";

type ExpertiseTrack = {
  id: TrackId;
  label: string;
  subtitle: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  outcomes: string[];
  stack: string[];
};

const TRACK_ICON_STYLES: Record<TrackId, string> = {
  "product-frontend": "bg-primary/10 text-primary",
  "backend-apis": "bg-emerald-500/10 text-emerald-500",
  "platform-devops": "bg-sky-500/10 text-sky-500",
};

const EXPERTISE_TRACKS: readonly ExpertiseTrack[] = [
  {
    id: "product-frontend",
    label: "AI-native Product Frontend",
    subtitle: "Accessible, data-heavy interfaces that still feel fast",
    icon: Code2,
    outcomes: [
      "Design and ship responsive, component-driven UIs that work across desktop and mobile.",
      "Bake in accessibility, keyboard flows, and sensible empty/error/loading states from day one.",
      "Wire dashboards, admin tools, and AI features so complex flows still feel simple to use.",
    ],
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "shadcn/ui",
      "Tailwind CSS",
      "Framer Motion",
      "TanStack Query",
      "Testing Library",
    ],
  },
  {
    id: "backend-apis",
    label: "Backend, Data & APIs",
    subtitle: "From CRUD to analytics and workflow engines",
    icon: Server,
    outcomes: [
      "Model domains into clear, versioned API contracts that are easy to consume and extend.",
      "Implement business logic, background jobs, and queue-like flows without burying behavior.",
      "Design data models and queries that support reporting, auditability, and future analytics.",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "REST / RPC APIs",
      "PostgreSQL",
      "SQL",
      "Prisma / ORMs",
      "Redis",
      "Background jobs",
    ],
  },
  {
    id: "platform-devops",
    label: "Platform, Observability & Delivery",
    subtitle: "From laptop → staging → production safely",
    icon: Cloud,
    outcomes: [
      "Automate CI/CD so main branches stay healthy and changes ship in small, low-risk slices.",
      "Use feature flags, staged rollouts, and environment parity instead of big-bang deploys.",
      "Add logs, metrics, and traces so issues show up on dashboards before users report them.",
    ],
    stack: [
      "Git & GitHub Flow",
      "GitHub Actions",
      "Docker",
      "Vercel / Edge",
      "AWS basics",
      "Monitoring & logs",
      "Feature flags",
    ],
  },
];

const CAPABILITY_ROWS: readonly {
  title: string;
  items: string[];
}[] = [
  {
    title: "Architecture & Design",
    items: [
      "Turn fuzzy product requirements into small, composable services and UI flows.",
      "Design data models and API boundaries that stay stable as features grow.",
      "Make deliberate trade-offs between performance, complexity, delivery speed, and cost.",
    ],
  },
  {
    title: "Delivery & Quality",
    items: [
      "Add tests where they matter most: critical paths, integrations, and regressions.",
      "Use metrics, logs, and traces to debug production issues without guesswork.",
      "Keep READMEs, runbooks, and onboarding docs current as systems evolve.",
    ],
  },
  {
    title: "Collaboration & Ownership",
    items: [
      "Run lightweight RFCs and design reviews so feedback arrives before build time.",
      "Partner closely with PM, design, and data to keep scope, risks, and impact visible.",
      "Own work past launch: refinements, incidents, and the unglamorous cleanup afterwards.",
    ],
  },
];

const TOOL_GROUPS: readonly {
  label: string;
  items: string[];
}[] = [
  {
    label: "Frontend & DX",
    items: [
      "TypeScript",
      "React / Next.js",
      "shadcn/ui",
      "Tailwind",
      "Framer Motion",
      "Storybook",
    ],
  },
  {
    label: "Backend, Data & Analytics",
    items: [
      "Node.js",
      "REST / RPC APIs",
      "PostgreSQL",
      "SQL",
      "Prisma / ORMs",
      "Redis / caching",
    ],
  },
  {
    label: "Platform, Observability & Workflow",
    items: [
      "GitHub Actions",
      "CI pipelines",
      "Docker",
      "Vercel / Edge",
      "Monitoring & alerts",
      "Feature flags",
    ],
  },
];


const TOOL_ICON_MAP: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  "Frontend & DX": Palette,
  "Backend, Data & Analytics": Database,
  "Platform, Observability & Workflow": Satellite,
};

const TOOL_COLOR_MAP: Record<string, string> = {
  "Frontend & DX": "text-primary",
  "Backend, Data & Analytics": "text-emerald-500 dark:text-emerald-400",
  "Platform, Observability & Workflow": "text-sky-500 dark:text-sky-400",
};

const CAPABILITY_ICON_MAP: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  "Architecture & Design": Blocks,
  "Delivery & Quality": Factory,
  "Collaboration & Ownership": Handshake,
};

const CAPABILITY_COLOR_MAP: Record<string, string> = {
  "Architecture & Design": "text-violet-500 dark:text-violet-400",
  "Delivery & Quality": "text-amber-500 dark:text-amber-400",
  "Collaboration & Ownership": "text-pink-500 dark:text-pink-400",
};

function useExpertiseIntroLabel() {
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);
  return useMemo(
    () =>
      reduceMotion
        ? "This page is designed to stay readable and useful even with motion effects reduced."
        : "Subtle gradients and depth highlight the parts of the stack I lean on most for AI-aware, data-heavy products.",
    [reduceMotion]
  );
}

function TrackCard({ track }: { readonly track: ExpertiseTrack }) {
  const Icon = track.icon;

  return (
    <article className="surface-soft flex h-full flex-col gap-3 p-5 md:p-6">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full shrink-0",
              TRACK_ICON_STYLES[track.id]
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold md:text-base">
              {track.label}
            </h2>
            <p className="text-xs text-muted-foreground md:text-[13px]">
              {track.subtitle}
            </p>
          </div>
        </div>
      </header>

      <ul className="mt-2 space-y-2.5 text-xs text-muted-foreground md:text-[13px]">
        {track.outcomes.map((item) => (
          <li key={item} className="flex gap-2">
            <GradientBullet />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {track.stack.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-border/70 bg-card/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
          >
            {tool}
          </span>
        ))}
      </div>
    </article>
  );
}

function CapabilityCard({
  title,
  items,
}: {
  readonly title: string;
  readonly items: string[];
}) {
  const Icon = CAPABILITY_ICON_MAP[title] ?? Blocks;
  const colorClass = CAPABILITY_COLOR_MAP[title] ?? "text-muted-foreground";

  return (
    <section className="surface-soft h-full space-y-3 p-5">
      <header className="flex items-center gap-2">
        <Icon className={cn("h-4 w-4", colorClass)} aria-hidden="true" />
        <h3 className="text-sm font-semibold text-muted-foreground/90">
          {title}
        </h3>
      </header>
      <ul className="space-y-2 text-xs text-muted-foreground md:text-[13px]">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <GradientBullet />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ToolGroup({
  label,
  items,
}: {
  readonly label: string;
  readonly items: string[];
}) {
  const Icon = TOOL_ICON_MAP[label] ?? Cloud;
  const colorClass = TOOL_COLOR_MAP[label] ?? "text-muted-foreground/80";

  return (
    <section className="surface-soft h-full space-y-3 p-4 md:p-5">
      <header className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <Icon className={cn("h-4 w-4 shrink-0", colorClass)} aria-hidden="true" />
      </header>
      <div className="flex flex-wrap gap-1.5 text-[11px] md:text-xs">
        {items.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-border/70 bg-card/90 px-2.5 py-1 text-muted-foreground"
          >
            {tool}
          </span>
        ))}
      </div>
    </section>
  );
}

function ExpertiseIntro() {
  const label = useExpertiseIntroLabel();

  return (
    <section
      aria-labelledby="expertise-heading"
      className="space-y-5 md:space-y-6"
    >
      <header className="flex flex-col gap-3 lg:flex-row md:items-start lg:items-end md:justify-between">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className={cn(
              "inline-flex max-w-full items-center gap-2 rounded-full border-border/70 bg-card/80 px-3 py-1",
              "text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
            )}
          >
            <span className="inline-flex h-1.5 w-10 rounded-full bg-linear-to-r from-primary via-secondary to-accent" />
            <span>Skillset</span>
          </Badge>
          <h1
            id="expertise-heading"
            className="text-balance text-2xl font-semibold leading-snug md:text-3xl"
          >
            I work across the stack, but I’m most useful where{" "}
            <span className="text-gradient text-gradient-small font-bold">
              product, data, and reliability overlap.
            </span>
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            This page is a map of how I like to contribute: building UIs people
            actually enjoy using, wiring the APIs and data underneath them, and
            keeping the whole system observable and shippable.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-1 md:pt-4 lg:pt-0">
          <Button
            jellyTone="primary"
            size="sm"
            asChild
            className="w-full md:w-auto"
          >
            <Link
              href="/work"
              aria-label="View projects that use these skills"
              className="flex items-center justify-center gap-2"
            >
              <span className="text-xs md:text-sm">See this in action</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            jellyTone="ghost"
            size="sm"
            asChild
            className="w-full md:w-auto"
          >
            <Link href="/hire-me" aria-label="Work together on your product">
              <span className="text-xs md:text-sm">
                Hire me for your next build
              </span>
            </Link>
          </Button>
        </div>
      </header>
      <p className="text-[11px] text-muted-foreground/90">{label}</p>
    </section>
  );
}

function TracksGrid() {
  return (
    <section
      aria-label="Core tracks of expertise"
      className="space-y-4 md:space-y-5"
    >
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {EXPERTISE_TRACKS.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </section>
  );
}

function ToolsAndCapabilities() {
  return (
    <section
      aria-label="Tools and capabilities"
      className="space-y-8 md:space-y-10"
    >
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Tooling I’m comfortable owning
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TOOL_GROUPS.map((group) => (
            <ToolGroup
              key={group.label}
              label={group.label}
              items={group.items}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          How that expertise shows up on teams
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITY_ROWS.map((row) => (
            <CapabilityCard
              key={row.title}
              title={row.title}
              items={row.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollaborationNote() {
  return (
    <section
      aria-label="Collaboration preferences"
      className="surface-soft mt-4 flex flex-col gap-3 p-5 xl:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-center gap-3">
        <Users
          className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0"
          aria-hidden="true"
        />
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">
            Where I’ve been most effective
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground md:text-[13px]">
            Cross-functional teams that care about clean UX, stable APIs,
            observability, and a steady delivery rhythm more than flashy
            rewrites.
          </p>
        </div>
      </div>
      <Button jellyTone="ghost" size="sm" asChild className="w-full md:w-auto">
        <Link href="/experience" aria-label="View detailed experience timeline">
          <span className="text-xs md:text-sm">View experience timeline</span>
        </Link>
      </Button>
    </section>
  );
}

export default function ExpertisePage() {
  const prefersReducedMotion = useMedia(
    "(prefers-reduced-motion: reduce)",
    false
  );
  return (
    <main
      id="main-content"
      className={cn("space-y-10 md:space-y-12 lg:space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700", !prefersReducedMotion &&
        "animate-in fade-in slide-in-from-bottom-4 duration-700")}
    >
      <ExpertiseIntro />
      <TracksGrid />
      <ToolsAndCapabilities />
      <CollaborationNote />
    </main>
  );
}
