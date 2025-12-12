"use client";

import { cn } from "@/lib/utils";
import { GradientBullet } from "@/components/gradient-bullet";
import { Blocks } from "lucide-react";

import { CAPABILITY_COLOR_MAP, CAPABILITY_ICON_MAP } from "./constants";

export function CapabilityCard({
  title,
  items,
}: {
  readonly title: string;
  readonly items: string[];
}) {
  const Icon = CAPABILITY_ICON_MAP[title] ?? Blocks;
  const colorClass = CAPABILITY_COLOR_MAP[title] ?? "text-muted-foreground";

  return (
    <section className="surface-soft h-full space-y-3 p-5">
      <header className="flex items-center gap-2">
        <Icon className={cn("h-4 w-4", colorClass)} aria-hidden="true" />
        <h3 className="text-sm font-semibold text-muted-foreground/90">
          {title}
        </h3>
      </header>

      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <GradientBullet />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
