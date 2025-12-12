"use client";

import { Clock } from "lucide-react";

export function MobileTimelineHint() {
  return (
    <div className="surface-soft flex items-center justify-between gap-2 rounded-2xl border border-border/70 p-3 text-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Scroll through the roles below
      </p>
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/90">
        <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>Timeline adapts as you scroll</span>
      </span>
    </div>
  );
}
