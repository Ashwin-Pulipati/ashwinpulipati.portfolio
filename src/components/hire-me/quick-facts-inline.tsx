"use client";

import { cn } from "@/lib/utils";
import { QUICK_FACTS } from "./constants";

export function QuickFactsInline() {
  const factStyles: Record<string, { bg: string; icon: string }> = {
    Location: {
      bg: "bg-emerald-500/10 dark:bg-emerald-500/25",
      icon: "text-emerald-500 dark:text-emerald-400",
    },
    "Time zone": {
      bg: "bg-sky-500/10 dark:bg-sky-500/25",
      icon: "text-sky-500 dark:text-sky-400",
    },
    Collaboration: {
      bg: "bg-purple-500/10 dark:bg-purple-500/25",
      icon: "text-purple-500 dark:text-purple-400",
    },
    Focus: {
      bg: "bg-amber-500/10 dark:bg-amber-500/25",
      icon: "text-amber-500 dark:text-amber-400",
    },
  };

  return (
    <section aria-label="At a glance" className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        LOGISTICS
      </h2>

      <div className="space-y-3">
        {QUICK_FACTS.map((fact) => {
          const Icon = fact.icon;
          const styles = factStyles[fact.label] ?? {
            bg: "bg-primary/12",
            icon: "text-primary",
          };

          return (
            <div
              key={fact.label}
              className="flex max-w-xs items-start gap-3 rounded-2xl border border-border/60 bg-card/60 p-3"
            >
              <span
                className={cn(
                  "mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-2xl",
                  styles.bg
                )}
              >
                <Icon
                  className={cn("h-4 w-4 shrink-0", styles.icon)}
                  aria-hidden="true"
                />
              </span>

              <div className="space-y-0.5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {fact.label}
                </p>
                <p className="text-sm text-foreground">{fact.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
