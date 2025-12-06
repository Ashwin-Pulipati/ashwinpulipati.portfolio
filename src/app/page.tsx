"use client";

import Link from "next/link";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { useIdle, useMedia, useWindowSize } from "react-use";

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

const ECOSYSTEM_SECTIONS = [
  {
    title: "Frontend",
    items: [
      "React, Next.js, TypeScript, modern SPA/MPA patterns",
      "Tailwind CSS, Shadcn/UI, responsive layouts",
      "Form systems with React Hook Form and Zod",
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      "Node.js services and REST APIs for real-estate & e-commerce",
      "Python backends with FastAPI and Django",
      "Prisma, SQLAlchemy, and structured background jobs",
    ],
  },
  {
    title: "AI & Automation",
    items: [
      "GPT-4, Gemini 2.5 Pro, AI-native workflows",
      "Code-generation sandboxes and agents that talk to real data",
      "Event-driven systems and orchestration with tools like Inngest",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS (EC2, RDS, S3, Cognito, API Gateway, CloudWatch)",
      "Docker, GitHub Actions, CI/CD, environment promotion",
      "Kubernetes, ArgoCD, Terraform, production-ready pipelines",
    ],
  },
  {
    title: "Data & Persistence",
    items: [
      "PostgreSQL, Neon, relational modeling for apps & analytics",
      "Caching and background processing patterns",
      "Practical SQL for dashboards, search, and reporting",
    ],
  },
  {
    title: "Mobile, Games & Web3",
    items: [
      "React Native apps backed by FastAPI & AWS",
      "HTML5 Canvas engines and gameplay systems",
      "NFT / Web3-style interfaces and experimental UIs",
    ],
  },
] as const;

const describeDeviceProfile = (width: number | null): string => {
  if (!width) return "Adaptive layout across devices.";
  if (width < 640) return "Tuned for one-hand mobile browsing.";
  if (width < 1024) return "Comfortable on tablets & small laptops.";
  return "Designed for focused widescreen work.";
};

const HomeSection = () => {
  const isDesktop = useMedia("(min-width: 1024px)", false);
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);
  const { width } = useWindowSize();
  const isIdle = useIdle(25000);

  const deviceProfile = describeDeviceProfile(width || null);
  const primaryCtaLabel = isIdle ? "Jump back into my work" : "Explore my work";

  return (
    <>
      <section
        id="home"
        aria-labelledby="home-heading"
        className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col gap-8 px-4 pb-12 pt-6 lg:flex-row lg:items-center lg:gap-10"
      >
        <div className="flex flex-1 flex-col gap-6">
          <Badge
            variant="outline"
            className={cn(
              "inline-flex max-w-max items-center gap-2 rounded-full border-border/70 bg-card/80 px-3 py-1 text-[11px] font-medium tracking-[0.16em] uppercase text-muted-foreground",
              !reduceMotion && ""
            )}
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-tr from-primary via-secondary to-accent text-[10px] text-primary-foreground shadow-sm">
              <Sparkles className="h-3 w-3" aria-hidden />
            </span>
            <span>Engineering portfolio</span>
          </Badge>

          <div className="space-y-3">
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
              comfortably across web apps, AI workflows, DevOps pipelines,
              mobile experiences, and even game engines. From real-estate and
              e-commerce backends to AI-powered tools and weather dashboards, I
              focus on shipping systems that are reliable, maintainable, and
              actually used.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              jellyTone="primary"
              size={isDesktop ? "lg" : "default"}
              aria-label="View Ashwin's selected work"
            >
              <Link href="/work">
                <span className="flex items-center gap-2">
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
            >
              <Link href="/resume">
                <span className="flex items-center gap-2">
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

        <aside className="flex flex-1 flex-col gap-4 lg:max-w-lg">
          <div className="surface-soft relative overflow-hidden p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Snapshot
              </span>
              <Badge
                variant="gradient"
                className="text-[11px] tracking-normal font-medium"
              >
                Currently shipping multi-stack, AI-aware products
              </Badge>
            </div>

            <dl className="grid grid-cols-2 gap-3 text-sm md:gap-4">
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

            <p className="mt-4 text-[11px] text-muted-foreground">
              {deviceProfile}
            </p>
          </div>

          <div className="surface-soft flex flex-col gap-3 p-4 text-xs text-muted-foreground sm:p-5">
            <p className="text-[11px] uppercase tracking-[0.16em]">
              How I like to work
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <GradientBullet />
                <span>
                  Start from real constraints, then choose the right stack
                  across web, mobile, data, and infra.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <GradientBullet />
                <span>
                  Treat AI, automation, and observability as first-class
                  features, not afterthoughts.
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
          </div>
        </aside>
      </section>

      <section
        aria-labelledby="ecosystem-heading"
        className="mx-auto max-w-7xl px-4 pb-14"
      >
        <div className="surface-soft space-y-5 p-5 sm:p-6 lg:p-7">
          <header className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Ecosystem I work in
              </p>
              <h2
                id="ecosystem-heading"
                className="text-lg font-semibold leading-snug sm:text-xl"
              >
                From browser to cloud, with AI, DevOps, and experiments in the
                loop.
              </h2>
            </div>
            <Badge
              variant="gradient"
              className="text-[11px] uppercase tracking-[0.16em]"
            >
              Multi-stack engineer
            </Badge>
          </header>

          <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2 lg:grid-cols-3">
            {ECOSYSTEM_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <GradientBullet />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSection;
