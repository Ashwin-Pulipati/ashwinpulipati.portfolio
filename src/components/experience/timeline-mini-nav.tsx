"use client";

import { useCallback } from "react";
import { Terminal } from "lucide-react";

import { cn } from "@/lib/utils";
import { GradientBullet } from "@/components/gradient-bullet";

import { EXPERIENCE_ITEMS } from "./constants";

export function TimelineMiniNav({
  activeId,
  onSelect,
}: {
  readonly activeId: string;
  readonly onSelect: (id: string) => void;
}) {
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
      className="surface-soft sticky top-24 hidden h-fit flex-col gap-2 rounded-2xl border border-border/70 p-6 text-sm md:flex"
    >
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        <Terminal className="h-3 w-3 shrink-0" aria-hidden />
        Snapshot
      </span>

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
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    {item.company}
                  </span>
                  <span className="text-xs text-muted-foreground/90">
                    {item.role}
                  </span>
                </span>

                <span className="ml-2 mb-1.5 inline-flex h-2.5 w-2.5 items-center justify-center">
                  {isActive ? (
                    <GradientBullet />
                  ) : (
                    <span className="w-1.5 h-1.5 bg-muted-foreground/70 rounded-full shrink-0 brightness-105" />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
