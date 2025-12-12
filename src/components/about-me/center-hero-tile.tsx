"use client";

import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { SidebarNavLink } from "@/components/ui/sidebar-nav-link";
import { NAV_ITEMS } from "@/config/nav";

import { AboutAvatar } from "./about-avatar";
import { TagBadge } from "./tag-badge";
import { SKILL_TAGS } from "./constants";

export const CenterHeroTile = ({ ctaLabel }: { ctaLabel: string }) => {
  const resumeItem = useMemo(
    () => NAV_ITEMS.find((i) => i.label === "Resume"),
    []
  );

  return (
    <section
      aria-label="Profile and primary actions"
      className="surface-soft relative flex h-full flex-col items-center overflow-hidden p-5 sm:p-6 xl:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-40 opacity-70 blur-3xl"
      >
        <div className="mx-auto h-full max-w-md rounded-full bg-[radial-gradient(circle_at_top,_theme(colors.primary/40),transparent_55%),radial-gradient(circle_at_bottom,_theme(colors.secondary/40),transparent_55%)] dark:opacity-80" />
      </div>

      <div className="relative flex flex-col items-center gap-4 text-center">
        <AboutAvatar />

        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold text-foreground">
            Ashwin Pulipati
          </h2>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Full-Stack Software Engineer
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 pt-1">
          {SKILL_TAGS.map((tag) => (
            <TagBadge key={tag}>{tag}</TagBadge>
          ))}
        </div>
      </div>

      <div className="relative mt-4 flex w-full flex-1 flex-col justify-between">
        <span className="hidden text-center text-xs text-muted-foreground sm:block">
          From AI-powered sandboxes to dashboards and engines, I enjoy owning
          the path from idea to production.
        </span>

        <div className="mt-6 flex w-full flex-col gap-4">
          <Button
            asChild
            jellyTone="gradient"
            size="lg"
            className="w-full justify-center text-sm"
            aria-label="Open résumé"
          >
            <SidebarNavLink
              href={resumeItem?.href ?? "/resume"}
              download={resumeItem?.download}
              className="flex items-center justify-center gap-2"
              ariaLabel={resumeItem?.ariaLabel ?? "Open résumé"}
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </SidebarNavLink>
          </Button>

          <div className="flex w-full items-center justify-center gap-4">
            <Button
              asChild
              jellyTone="ghost"
              size="sm"
              aria-label="Open Ashwin's GitHub profile in a new tab"
              className="w-full max-w-40 justify-center text-xs sm:text-sm"
            >
              <Link
                href="https://github.com/Ashwin-Pulipati"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-2"
              >
                <Github
                  className="h-4 w-4 text-zinc-600 dark:text-zinc-400"
                  aria-hidden="true"
                />
                <span>GitHub</span>
              </Link>
            </Button>

            <Button
              asChild
              jellyTone="ghost"
              size="sm"
              aria-label="Open Ashwin's LinkedIn profile in a new tab"
              className="w-full max-w-40 justify-center text-xs sm:text-sm"
            >
              <Link
                href="https://www.linkedin.com/in/ashwinpulipati/"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-2"
              >
                <Linkedin
                  className="h-4 w-4 text-blue-500 dark:text-blue-400"
                  aria-hidden="true"
                />
                <span>LinkedIn</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
