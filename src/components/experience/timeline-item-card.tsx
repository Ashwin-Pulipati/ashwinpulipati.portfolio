"use client";

import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import type React from "react";
import { motion } from "framer-motion";
import { Building2, Clock, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GradientBullet } from "@/components/gradient-bullet";

import type { ExperienceItem } from "./types";
import { DOT_VARIANTS, TIMELINE_VARIANTS } from "./motion";

export function TimelineItemCard({
  item,
  isActive,
  onInView,
  reduceMotion,
}: {
  readonly item: ExperienceItem;
  readonly isActive: boolean;
  readonly onInView: (id: string) => void;
  readonly reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const intersection = useIntersection(
    ref as unknown as React.RefObject<HTMLElement>,
    {
      root: null,
      rootMargin: "0px 0px -55% 0px",
      threshold: 0.3,
    }
  );

  useEffect(() => {
    if (intersection?.isIntersecting) onInView(item.id);
  }, [intersection, item.id, onInView]);

  return (
    <li className="relative" aria-labelledby={`experience-${item.id}-heading`}>
      <motion.div
        ref={ref}
        variants={reduceMotion ? {} : TIMELINE_VARIANTS}
        initial={reduceMotion ? undefined : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.35 }}
        className="relative pl-10"
      >
        <div
          className="absolute left-[0.85rem] top-0 h-full w-px bg-border/70"
          aria-hidden="true"
        />

        <motion.div
          variants={DOT_VARIANTS}
          animate={isActive ? "active" : "inactive"}
          className={cn(
            "absolute left-[0.37rem] top-6 flex h-4 w-4 items-center justify-center rounded-full border border-background",
            "bg-linear-to-tr from-primary/85 via-secondary/80 to-accent/75"
          )}
          aria-hidden="true"
        />

        <article
          id={`experience-${item.id}`}
          className={cn(
            "surface-soft rounded-2xl border border-border/70 p-4 md:p-5",
            isActive &&
              "border-transparent bg-linear-to-tr from-primary/10 via-secondary/12 to-accent/16 shadow-md shadow-primary/20"
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <h2
                id={`experience-${item.id}-heading`}
                className="text-lg font-semibold leading-snug"
              >
                {item.role}
              </h2>

              <p className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{item.company}</span>
                </span>
                <span aria-hidden="true" className="text-muted-foreground/60">
                  •
                </span>
                <span>{item.location}</span>
              </p>
            </div>

            <Badge
              variant={item.tenure === "current" ? "outline" : "secondary"}
              className={cn(
                "rounded-full border-border/70 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
                item.tenure === "current"
                  ? "bg-linear-to-tr from-primary/10 via-secondary/10 to-accent/16 text-primary"
                  : "text-foreground bg-secondary/25"
              )}
            >
              {item.tenure === "current" ? "Current" : "Previous"}
            </Badge>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">{item.focus}</p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/70 bg-card/80 px-2 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-3 space-y-1.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/90">
              <Target className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>Selected ways I added value</span>
            </p>

            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {item.impactHighlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  {isActive ? (
                    <GradientBullet />
                  ) : (
                    <span className="mt-1.5 w-1.5 h-1.5 bg-muted-foreground/70 rounded-full shrink-0 brightness-105" />
                  )}
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground/90">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{item.period}</span>
            </span>
          </div>
        </article>
      </motion.div>
    </li>
  );
}
