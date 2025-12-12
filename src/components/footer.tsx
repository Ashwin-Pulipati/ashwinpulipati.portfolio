"use client";

import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { useMedia } from "react-use";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NAV_ITEMS } from "@/config/nav";

import { SidebarNavLink } from "@/components/ui/sidebar-nav-link";
import { cn } from "@/lib/utils";

const Footer = () => {
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="mt-10 border-t border-border/70 bg-linear-to-r from-background via-background/95 to-background"
    >
      {!reduceMotion && (
        <div className="h-px w-full bg-linear-to-r from-primary/55 via-secondary/45 to-accent/55" />
      )}

      <div className="mx-auto max-w-7xl px-4 py-6 space-y-4">
        <div className="flex flex-col items-center gap-4 xl:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center gap-1 xl:items-start">
            <Link
              href="/"
              aria-label="Back to home"
              className="w-fit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="font-display text-2xl font-semibold text-gradient leading-tight pl-0.5">
                Ashwin Pulipati
              </span>
            </Link>
            <span className="text-xs text-muted-foreground text-center md:text-left">
              &copy; {year} Made with 🫶🏻 by Ashwin Pulipati
            </span>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-col lg:flex-row items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground text-center"
          >
            {NAV_ITEMS.map((item) => {
              const commonClassName = cn(
                "group relative inline-flex items-center justify-center rounded-full px-2 py-0.5",
                "transition-colors hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              );

              const content = (
                <span className="relative inline-block tracking-[0.08em] uppercase">
                  {item.label}
                  <span
                    className="
          pointer-events-none
          absolute left-0 -bottom-0.5 h-0.5 w-full
          origin-left scale-x-0
          bg-linear-to-r from-primary via-secondary to-accent
          transition-transform duration-300 ease-out
          group-hover:scale-x-100
          motion-reduce:scale-x-100 motion-reduce:bg-muted-foreground
        "
                  />
                </span>
              );

              return (
                <SidebarNavLink
                  key={item.href}
                  href={item.href}
                  download={item.download}
                  ariaLabel={item.ariaLabel}
                  className={commonClassName}
                >
                  {content}
                </SidebarNavLink>
              );
            })}
          </nav>

          <TooltipProvider delayDuration={120}>
            <div className="flex items-center gap-3 md:justify-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    jellyTone="ghost"
                    size="sm"
                    asChild
                    aria-label="Hire Ashwin"
                  >
                    <Link href="/hire-me">
                      <span className="flex items-center gap-1 text-xs">
                        <span>Let&apos;s work together</span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 shrink-0"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  <p>Open to roles & collaborations</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    jellyTone="ghost"
                    size="icon-sm"
                    asChild
                    aria-label="Open Ashwin's GitHub profile in a new tab"
                  >
                    <Link
                      href="https://github.com/Ashwin-Pulipati/ashwinpulipati.portfolio"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Github
                        className="h-4 w-4 text-zinc-600 dark:text-zinc-400 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  <p>Ashwin&apos;s GitHub</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    jellyTone="ghost"
                    size="icon-sm"
                    asChild
                    aria-label="Open Ashwin's LinkedIn profile in a new tab"
                  >
                    <Link
                      href="https://www.linkedin.com/in/ashwinpulipati/"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Linkedin
                        className="h-4 w-4 text-blue-500 dark:text-blue-400 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  <p>Ashwin&apos;s LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
