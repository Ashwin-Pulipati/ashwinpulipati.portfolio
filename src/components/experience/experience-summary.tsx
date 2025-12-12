"use client";

import { ArrowRight, Globe2, Sparkles } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ExperienceSummary({
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
            "text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          )}
        >
          <span className="inline-flex h-1.5 w-10 rounded-full bg-linear-to-r from-primary via-secondary to-accent" />
          <span>Experience</span>
        </Badge>

        <h1 className="text-balance text-3xl font-semibold leading-snug">
          A timeline that blends{" "}
          <span className="text-gradient text-gradient-small font-bold">
            product thinking, engineering depth, and real-world constraints.
          </span>
        </h1>

        <p className="max-w-2xl text-md leading-relaxed text-muted-foreground">
          These roles show how I move from individual contributor work to owning
          flows end-to-end: talking to users, building the systems underneath,
          and keeping delivery predictable.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="surface-soft space-y-1 rounded-2xl border border-border/70 p-3.5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Timeline span
          </p>
          <p className="text-sm font-semibold">{timelineSpan}</p>
          <p className="text-xs text-muted-foreground">
            From early full-stack client work to AI-heavy products and grad
            research.
          </p>
        </div>

        <div className="surface-soft space-y-1 rounded-2xl border border-border/70 p-3.5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Experience focus
          </p>
          <p className="text-sm font-semibold">
            {totalRoles} roles · Full-stack · Product · Academic
          </p>
          <p className="text-xs text-muted-foreground">
            A mix of engineering, product discovery, and computer science
            fundamentals.
          </p>
        </div>

        <div className="surface-soft space-y-1 rounded-2xl border border-border/70 p-3.5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Collaboration style
          </p>
          <p className="flex items-center gap-1 text-sm font-medium">
            <Globe2 className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Distributed · Product-led</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Comfortable with async updates, design reviews, and tight feedback
            loops.
          </p>
        </div>
      </div>

      <div className="surface-soft flex flex-col gap-2 rounded-2xl border border-border/70 p-3.5 md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground/90">
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
