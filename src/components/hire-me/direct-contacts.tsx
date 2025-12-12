"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EMAIL } from "./constants";

export function DirectContacts() {
  return (
    <section aria-label="Direct contacts" className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Find me elsewhere
        </h2>
        <p className="mt-1 max-w-xl text-xs text-muted-foreground">
          Prefer not to use the form? Use any of these and include a link to the
          role or project.
        </p>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-4">
        <Button jellyTone="ghost" size="lg" className="w-fit md:w-auto" asChild>
          <a href={`mailto:${EMAIL}`}>
            <span className="flex items-center justify-center gap-2 text-sm">
              <Mail
                className="h-4 w-4 shrink-0 text-rose-500 dark:text-rose-400"
                aria-hidden="true"
              />
              <span>Email</span>
            </span>
          </a>
        </Button>

        <Button jellyTone="ghost" size="lg" className="w-fit md:w-auto" asChild>
          <Link
            href="https://www.linkedin.com/in/ashwinpulipati/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="flex items-center justify-center gap-2 text-sm">
              <Linkedin
                className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400"
                aria-hidden="true"
              />
              <span>LinkedIn</span>
            </span>
          </Link>
        </Button>

        <Button jellyTone="ghost" size="lg" className="w-fit md:w-auto" asChild>
          <Link
            href="https://github.com/Ashwin-Pulipati"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="flex items-center justify-center gap-2 text-sm">
              <Github
                className="h-4 w-4 shrink-0 text-zinc-600 dark:text-zinc-400"
                aria-hidden="true"
              />
              <span>GitHub</span>
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
