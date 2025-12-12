"use client";

import { cn } from "@/lib/utils";
import { GradientBullet } from "@/components/gradient-bullet";

import type { ExpertiseTrack } from "./types";
import { TRACK_ICON_STYLES } from "./constants";

export function TrackCard({ track }: { readonly track: ExpertiseTrack }) {
  const Icon = track.icon;

  return (
    <article className="surface-soft flex h-full flex-col gap-3 p-5 md:p-6">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full shrink-0",
              TRACK_ICON_STYLES[track.id]
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-md font-semibold">{track.label}</h2>
            <p className="text-xs text-muted-foreground">{track.subtitle}</p>
          </div>
        </div>
      </header>

      <ul className="mt-2 space-y-2.5 text-sm text-muted-foreground">
        {track.outcomes.map((item) => (
          <li key={item} className="flex gap-2">
            <GradientBullet />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {track.stack.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-border/70 bg-card/80 px-2.5 py-1 text-xs font-medium text-muted-foreground"
          >
            {tool}
          </span>
        ))}
      </div>
    </article>
  );
}
