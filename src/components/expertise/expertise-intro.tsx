"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useExpertise } from "@/hooks/use-expertise";

export function ExpertiseIntro() {
  const label = useExpertise();

  return (
    <section
      aria-labelledby="expertise-heading"
      className="space-y-5 md:space-y-6"
    >
      <header className="flex flex-col gap-3 lg:flex-row md:items-start lg:items-end md:justify-between">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className={cn(
              "inline-flex max-w-full items-center gap-2 rounded-full border-border/70 bg-card/80 px-3 py-1",
              "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
            )}
          >
            <span className="inline-flex h-1.5 w-10 rounded-full bg-linear-to-r from-primary via-secondary to-accent" />
            <span>Skillset</span>
          </Badge>

          <h1
            id="expertise-heading"
            className="text-balance text-3xl font-semibold leading-snug"
          >
            I work across the stack, but I’m most useful where{" "}
            <span className="text-gradient text-gradient-small font-bold">
              product, data, and reliability overlap.
            </span>
          </h1>

          <p className="max-w-2xl text-md leading-relaxed text-muted-foreground">
            This page is a map of how I like to contribute: building UIs people
            actually enjoy using, wiring the APIs and data underneath them, and
            keeping the whole system observable and shippable.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1 md:pt-4 lg:pt-0">
          <Button
            jellyTone="primary"
            size="sm"
            asChild
            className="w-full md:w-auto"
          >
            <Link
              href="/work"
              aria-label="View projects that use these skills"
              className="flex items-center justify-center gap-2"
            >
              <span className="text-xs md:text-sm">See this in action</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>

          <Button
            jellyTone="ghost"
            size="sm"
            asChild
            className="w-full md:w-auto"
          >
            <Link
              href="/hire-me"
              aria-label="Work together on your product"
              className="flex items-center gap-2 justify-center"
            >
              <span className="text-xs md:text-sm">
                Hire me for your next build
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </header>

      <p className="text-xs text-muted-foreground/90">{label}</p>
    </section>
  );
}
