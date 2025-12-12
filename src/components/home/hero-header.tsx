"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type HeroHeaderProps = {
  reduceMotion: boolean;
};

export const HeroHeader = ({ reduceMotion }: HeroHeaderProps) => {
  return (
    <>
      <Badge
        variant="outline"
        className={cn(
          "inline-flex max-w-full items-center gap-2 rounded-full border-border/70 bg-card/80 px-3 py-1",
          "text-xs font-medium tracking-[0.16em] uppercase text-muted-foreground",
          !reduceMotion && ""
        )}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full dark:bg-emerald-400 bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full dark:bg-emerald-500 bg-emerald-600" />
        </span>
        <span className="truncate sm:whitespace-normal">
          Available for hire
        </span>
      </Badge>

      <div className="space-y-3 max-w-full">
        <h1
          id="home-heading"
          className="text-balance text-4xl sm:text-5xl font-semibold leading-tight"
        >
          <span className="block text-gradient">If it runs on code,</span>
          <span className="block text-foreground">
            I design, build, and ship it.
          </span>
        </h1>

        <p className="max-w-xl text-md leading-relaxed text-muted-foreground">
          I&apos;m Ashwin Pulipati, a full-stack engineer who moves comfortably
          across web apps, AI workflows, DevOps pipelines, mobile experiences,
          and even game engines. From real-estate and e-commerce backends to
          AI-powered tools and weather dashboards, I focus on shipping systems
          that are reliable, maintainable, and actually used.
        </p>
      </div>
    </>
  );
};
