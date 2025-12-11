"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RgbTilt3DCard } from "@/components/ui/rgb-tilt-3d-card";
import { useMedia } from "react-use";

type ProjectFocus =
  | "all"
  | "frontend-heavy"
  | "backend-heavy"
  | "full-stack"
  | "devops"
  | "games-web3";

type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[];
  focus: ProjectFocus[];
};

const PROJECTS: readonly Project[] = [
  {
    id: "lovibe",
    title: "Lovibe – AI-Powered Code Generation Sandbox",
    subtitle: "Secure AI coding environment with event-driven orchestration",
    description:
      "A full-stack AI platform that turns natural language prompts into executable code inside a sandboxed environment, wired with an event-driven backend for multi-step agent workflows.",
    imageUrl: "/lovibe.png",
    liveUrl: "https://lovibe.vercel.app",
    githubUrl: "https://github.com/Ashwin-Pulipati/lovibe",
    tags: [
      "Full-stack",
      "AI",
      "Code execution",
      "tRPC",
      "Prisma",
      "Neon",
      "Clerk",
    ],
    focus: ["full-stack", "backend-heavy", "frontend-heavy", "devops"],
  },
  {
    id: "optipathway",
    title: "OptiPathway – F-1 Visa Timeline Assistant",
    subtitle: "Guided timelines and calculators for F-1 students",
    description:
      "An interactive resource hub for F-1 students that brings timelines, calculators, and guides into a single, accessible interface with centralized state and clear legal disclaimers.",
    imageUrl: "/optipathway.png",
    liveUrl: "https://optipathway.vercel.app",
    githubUrl: "https://github.com/Ashwin-Pulipati/optipathway",
    tags: ["Frontend", "Next.js", "State management", "Accessibility"],
    focus: ["frontend-heavy", "full-stack"],
  },
  {
    id: "pastella",
    title: "Pastella – AI Vibe-Coded Color Palette Generator",
    subtitle: "Gemini-powered palette generation for brand and UI work",
    description:
      "An AI-native workflow that uses Gemini 2.5 Pro to generate, refine, and stabilize color palettes from vibe-based prompts, enforced through a structured JSON schema.",
    imageUrl: "/pastella.png",
    liveUrl: "https://pastella.vercel.app",
    githubUrl: "https://github.com/Ashwin-Pulipati/pastella",
    tags: ["Frontend", "AI", "Design tooling", "Next.js"],
    focus: ["frontend-heavy"],
  },
  {
    id: "skyerix",
    title: "Skyerix – Full-Stack Weather Dashboard",
    subtitle: "Data-heavy weather insights with maps, charts, and caching",
    description:
      "A responsive, data-intensive weather dashboard powered by React Query, custom hooks, and map visualizations, designed to keep complex server state predictable and fast.",
    imageUrl: "/skyerix.png",
    liveUrl: "https://skyerix.vercel.app",
    githubUrl: "https://github.com/Ashwin-Pulipati/skyerix",
    tags: ["Full-stack", "React Query", "Recharts", "Leaflet"],
    focus: ["full-stack", "frontend-heavy", "backend-heavy"],
  },
  {
    id: "veloria",
    title: "Veloria – 2D Adventure JavaScript Game Engine",
    subtitle: "Custom engine built on HTML5 Canvas for smooth 2D play",
    description:
      "A vanilla JavaScript game engine that drives combat, pathfinding, and animation over HTML5 Canvas with an optimized rendering pipeline tuned for a smooth 60fps experience.",
    imageUrl: "/veloria.png",
    liveUrl: "https://ashwin-pulipati.github.io/veloria",
    githubUrl: "https://github.com/Ashwin-Pulipati/veloria",
    tags: ["Game engine", "Canvas", "JavaScript", "Performance"],
    focus: ["games-web3"],
  },
];

const FOCUS_OPTIONS: readonly {
  value: ProjectFocus;
  label: string;
  description: string;
}[] = [
  {
    value: "all",
    label: "All projects",
    description: "Show a curated mix of full-stack, AI, dashboards, and games.",
  },
  {
    value: "frontend-heavy",
    label: "Frontend-heavy",
    description:
      "Projects where UX, React/Next.js, and client flows do the heavy lifting.",
  },
  {
    value: "backend-heavy",
    label: "Backend-heavy",
    description: "Systems focused on orchestration, APIs, and data handling.",
  },
  {
    value: "full-stack",
    label: "Full-stack",
    description: "End-to-end builds where I owned both frontend and backend.",
  },
  {
    value: "devops",
    label: "DevOps / Data",
    description:
      "Work with pipelines, event-driven flows, or infrastructure concerns.",
  },
  {
    value: "games-web3",
    label: "Games & Web3",
    description:
      "Experimental engines and playful, non-traditional interfaces.",
  },
];

function normalizeFocusParam(value: string | null): ProjectFocus {
  const allowedValues = FOCUS_OPTIONS.map((o) => o.value);
  if (value && allowedValues.includes(value as ProjectFocus)) {
    return value as ProjectFocus;
  }
  return "all";
}

export default function WorkPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const focus = normalizeFocusParam(searchParams.get("focus"));

  const activeFocusConfig = useMemo(
    () => FOCUS_OPTIONS.find((o) => o.value === focus) ?? FOCUS_OPTIONS[0],
    [focus]
  );

  const filteredProjects = useMemo(() => {
    if (focus === "all") return PROJECTS;
    return PROJECTS.filter((project) => project.focus.includes(focus));
  }, [focus]);

  const handleFocusChange = (next: ProjectFocus) => {
    const params = new URLSearchParams(searchParams.toString());

    if (next === "all") {
      params.delete("focus");
    } else {
      params.set("focus", next);
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(nextUrl, { scroll: false });
  };

  const totalProjects = PROJECTS.length;
  const visibleCount = filteredProjects.length;
  
  const prefersReducedMotion = useMedia(
    "(prefers-reduced-motion: reduce)",
    false
  );

  return (
    <main
      id="main-content"
      className={cn("space-y-8 md:space-y-10 lg:space-y-12",
        !prefersReducedMotion &&
        "animate-in fade-in slide-in-from-bottom-4 duration-700")}
      aria-labelledby="work-heading"
    >
      <section className="space-y-4 md:space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className={cn(
                "inline-flex max-w-full items-center gap-2 rounded-full border-border/70 bg-card/80 px-3 py-1",
                "text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
              )}
            >
              <span className="inline-flex h-1.5 w-10 rounded-full bg-linear-to-r from-primary via-secondary to-accent" />
              <span>Selected work</span>
            </Badge>
            <h1
              id="work-heading"
              className="text-balance text-2xl font-semibold leading-snug md:text-3xl"
            >
              A small set of projects that show how I{" "}
              <span className="text-gradient text-gradient-small font-bold">
                design, build, and ship across the stack.
              </span>
            </h1>
            <p
              id="work-intro"
              className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base"
            >
              These projects span AI sandboxes, timelines, dashboards, and a
              custom game engine. They’re representative of the kinds of systems
              I like to own end-to-end: user-facing, data-heavy, and grounded in
              real constraints.
            </p>
          </div>

          <div
            className="space-y-2 md:text-right"
            aria-label="Filter projects by focus area"
          >
            <div
              className="flex flex-col gap-1 md:items-end"
              role="group"
              aria-labelledby="work-focus-label"
            >
              <p
                id="work-focus-label"
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
              >
                Filter by focus
              </p>
              <Select
                value={focus}
                onValueChange={(value) =>
                  handleFocusChange(value as ProjectFocus)
                }
              >
                <SelectTrigger className="w-[220px] justify-between text-xs md:text-sm">
                  <SelectValue placeholder="All projects" />
                </SelectTrigger>
                <SelectContent>
                  {FOCUS_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-xs md:text-sm"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="max-w-xs text-[11px] text-muted-foreground md:ml-auto">
              {activeFocusConfig.description}
            </p>
          </div>
        </div>

        <p
          className="text-[11px] text-muted-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          Showing {visibleCount} of {totalProjects} projects
          {focus !== "all" ? ` for “${activeFocusConfig.label}”.` : "."}
        </p>
      </section>

      <section
        aria-label="Project gallery"
        aria-describedby="work-intro"
        className="grid gap-8 lg:gap-12 md:grid-cols-2 xl:grid-cols-3"
      >
        {filteredProjects.map((project) => (
          <RgbTilt3DCard
            key={project.id}
            title={project.title}
            subtitle={project.subtitle}
            description={project.description}
            imageUrl={project.imageUrl}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
            tags={project.tags}
          />
        ))}

        {filteredProjects.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No projects match this filter yet.
          </p>
        )}
      </section>
    </main>
  );
}