"use client";

import { Cloud } from "lucide-react";

import { cn } from "@/lib/utils";

import { TOOL_COLOR_MAP, TOOL_ICON_MAP } from "./constants";

export function ToolGroup({
  label,
  items,
}: {
  readonly label: string;
  readonly items: string[];
}) {
  const Icon = TOOL_ICON_MAP[label] ?? Cloud;
  const colorClass = TOOL_COLOR_MAP[label] ?? "text-muted-foreground/80";

  return (
    <section className="surface-soft h-full space-y-3 p-4 md:p-5">
      <header className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <Icon
          className={cn("h-4 w-4 shrink-0", colorClass)}
          aria-hidden="true"
        />
      </header>

      <div className="flex flex-wrap gap-1.5 text-xs">
        {items.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-border/70 bg-card/90 px-2.5 py-1 text-muted-foreground"
          >
            {tool}
          </span>
        ))}
      </div>
    </section>
  );
}
