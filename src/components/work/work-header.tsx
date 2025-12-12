"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function WorkHeader() {
  return (
    <div className="space-y-2">
      <Badge
        variant="outline"
        className={cn(
          "inline-flex max-w-full items-center gap-2 rounded-full border-border/70 bg-card/80 px-3 py-1",
          "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
        )}
      >
        <span className="inline-flex h-1.5 w-10 rounded-full bg-linear-to-r from-primary via-secondary to-accent" />
        <span>Selected work</span>
      </Badge>

      <h1
        id="work-heading"
        className="text-balance text-3xl font-semibold leading-snug"
      >
        A small set of projects that show how I{" "}
        <span className="text-gradient text-gradient-small font-bold">
          design, build, and ship across the stack.
        </span>
      </h1>

      <p
        id="work-intro"
        className="max-w-2xl text-md leading-relaxed text-muted-foreground"
      >
        These projects span AI sandboxes, timelines, dashboards, and a custom
        game engine. They’re representative of the kinds of systems I like to
        own end-to-end: user-facing, data-heavy, and grounded in real
        constraints.
      </p>
    </div>
  );
}
