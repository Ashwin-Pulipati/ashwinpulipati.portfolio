import {
  Code2,
  Server,
  Cloud,
  Palette,
  Database,
  Satellite,
  Blocks,
  Factory,
  Handshake,
} from "lucide-react";

import type { TrackId, ExpertiseTrack } from "./types";

export const TRACK_ICON_STYLES: Record<TrackId, string> = {
  "product-frontend": "bg-primary/10 text-primary",
  "backend-apis": "bg-emerald-500/10 text-emerald-500",
  "platform-devops": "bg-sky-500/10 text-sky-500",
};

export const EXPERTISE_TRACKS: readonly ExpertiseTrack[] = [
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
] as const;

export const CAPABILITY_ROWS: readonly { title: string; items: string[] }[] = [
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
] as const;

export const TOOL_GROUPS: readonly { label: string; items: string[] }[] = [
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
] as const;

export const TOOL_ICON_MAP: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  "Frontend & DX": Palette,
  "Backend, Data & Analytics": Database,
  "Platform, Observability & Workflow": Satellite,
};

export const TOOL_COLOR_MAP: Record<string, string> = {
  "Frontend & DX": "text-primary",
  "Backend, Data & Analytics": "text-emerald-500 dark:text-emerald-400",
  "Platform, Observability & Workflow": "text-sky-500 dark:text-sky-400",
};

export const CAPABILITY_ICON_MAP: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  "Architecture & Design": Blocks,
  "Delivery & Quality": Factory,
  "Collaboration & Ownership": Handshake,
};

export const CAPABILITY_COLOR_MAP: Record<string, string> = {
  "Architecture & Design": "text-violet-500 dark:text-violet-400",
  "Delivery & Quality": "text-amber-500 dark:text-amber-400",
  "Collaboration & Ownership": "text-pink-500 dark:text-pink-400",
};
