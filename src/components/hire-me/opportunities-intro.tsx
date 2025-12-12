"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function OpportunitiesIntro({
  accessibilityNote,
}: {
  readonly accessibilityNote: string;
}) {
  return (
    <section
      aria-labelledby="opportunities-heading"
      className="space-y-4 md:space-y-5"
    >
      <header className="space-y-3">
        <Badge
          variant="outline"
          className={cn(
            "inline-flex max-w-full items-center gap-2 rounded-full border-border/70 bg-card/80 px-3 py-1",
            "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
          )}
        >
          <span className="inline-flex h-1.5 w-10 rounded-full bg-linear-to-r from-primary via-secondary to-accent" />
          <span>Working Together</span>
        </Badge>

        <h1
          id="opportunities-heading"
          className="text-balance text-3xl font-semibold leading-snug"
        >
          I&apos;m looking for teams where{" "}
          <span className="text-gradient font-bold">
            shipping, quality, and learning
          </span>{" "}
          actually matter.
        </h1>

        <p className="max-w-2xl text-md leading-relaxed text-muted-foreground">
          I enjoy working on products that feel great to use, respect real-world
          constraints, and are built with solid engineering foundations. This
          page is for the people who might want me on their team.
        </p>
      </header>

      {accessibilityNote && (
        <p className="text-xs text-muted-foreground/90">{accessibilityNote}</p>
      )}
    </section>
  );
}
