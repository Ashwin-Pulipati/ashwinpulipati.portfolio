"use client";

import { Separator } from "@/components/ui/separator";
import { GradientBullet } from "@/components/gradient-bullet";
import { cn } from "@/lib/utils";

import { OUTSIDE_OF_WORK, TIMELINE_ITEMS } from "./constants";

export const TimelineAndOutsideTile = () => (
  <section
    aria-label="Timeline and outside interests"
    className="surface-soft flex h-full flex-col gap-5 p-5 sm:p-6"
  >
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Timeline
      </p>

      <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
        <ol
          className="relative space-y-5 border-l border-border/70 pl-4"
          aria-label="Career and education timeline"
        >
          {TIMELINE_ITEMS.map((item, index) => {
            const dotColors = ["bg-primary/85", "bg-secondary", "bg-accent"];
            const dotColor = dotColors[index % dotColors.length];

            return (
              <li key={item.period} className="relative pl-2">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-[1.30rem] top-1 inline-flex h-2.5 w-2.5 rounded-full brightness-105 shadow-[0_0_4px_rgba(0,0,0,0.35)]",
                    dotColor
                  )}
                />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/90">
                  {item.period}
                </p>
                <p className="text-md font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-0.5">{item.body}</p>
                {index !== TIMELINE_ITEMS.length - 1 && (
                  <span className="sr-only">Continues to next period</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>

    <Separator className="my-2 opacity-70" />

    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Outside of the editor
      </p>
      <ul className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
        {OUTSIDE_OF_WORK.map((item) => (
          <li key={item} className="flex gap-2">
            <GradientBullet />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
