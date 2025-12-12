"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const AboutAvailabilityBadge = ({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) => {
  return (
    <div className="flex items-center justify-start">
      <Badge
        variant="outline"
        className={cn(
          "inline-flex max-w-full items-center gap-2 rounded-full border-border/70 bg-card/80 px-3 py-1",
          "text-xs font-medium tracking-widest uppercase text-muted-foreground"
        )}
        role="status"
        aria-label="Open to relocation and remote-friendly roles"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          {!prefersReducedMotion && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70 animate-ping dark:bg-emerald-400" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-500" />
        </span>
        <span className="truncate">Open to relocation & Remote</span>
      </Badge>
    </div>
  );
};
