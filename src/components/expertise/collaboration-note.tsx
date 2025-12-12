"use client";

import Link from "next/link";
import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CollaborationNote() {
  return (
    <section
      aria-label="Collaboration preferences"
      className="surface-soft mt-4 flex flex-col gap-3 p-5 xl:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-center gap-3">
        <Users
          className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0"
          aria-hidden="true"
        />
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">
            Where I’ve been most effective
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Cross-functional teams that care about clean UX, stable APIs,
            observability, and a steady delivery rhythm more than flashy
            rewrites.
          </p>
        </div>
      </div>

      <Button jellyTone="ghost" size="sm" asChild className="w-full md:w-auto">
        <Link href="/experience" aria-label="View detailed experience timeline">
          <span className="text-xs md:text-sm">View experience timeline</span>
        </Link>
      </Button>
    </section>
  );
}
