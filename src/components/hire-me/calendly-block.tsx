"use client";

import Link from "next/link";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CalendlyBlock() {
  return (
    <section aria-label="Calendly booking" className="space-y-2">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Ready to chat?
      </h2>
      <p className="max-w-xl text-xs text-muted-foreground">
        If you already know this is a serious fit, you can book a short call
        directly.
      </p>

      <Button jellyTone="accent" size="lg" asChild>
        <Link
          href="https://www.linkedin.com/in/ashwinpulipati/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span className="flex items-center gap-2 text-sm">
            <CalendarIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Book a 20-minute intro call</span>
          </span>
        </Link>
      </Button>
    </section>
  );
}
