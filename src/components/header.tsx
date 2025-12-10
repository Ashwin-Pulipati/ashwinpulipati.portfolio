"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWindowScroll, useMedia, useIdle, useNetworkState } from "react-use";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { FileDown, Handshake, Sparkles } from "lucide-react";

const HeaderLogo = ({ hideText = false }: { hideText?: boolean }) => (
  <div className="flex items-center gap-2 md:gap-3">
    <div className="relative h-10 w-10 md:h-20 md:w-20 shrink-0">
      <Image
        src="/logo.png"
        alt="Ashwin Pulipati logo"
        fill
        priority
        sizes="(max-width: 768px) 40px, 80px"
        className="object-contain"
      />
    </div>
    {!hideText && (
      <div className="flex flex-col leading-tight">
        <span className="font-display text-xl md:text-4xl font-semibold text-gradient pl-0.5">
          Ashwin Pulipati
        </span>
        <span className="font-mono text-[7.5px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          If It Runs on Code, I Build It.
        </span>
      </div>
    )}
  </div>
);

const Header = () => {
  const pathname = usePathname();
  const { y } = useWindowScroll();
  const isScrolled = y > 4;

  const prefersReducedMotion = useMedia(
    "(prefers-reduced-motion: reduce)",
    false
  );
  const isIdle = useIdle(60_000);
  const { online } = useNetworkState();

  const isActive = (href: string) => pathname.startsWith(href);
  const isResumeActive = isActive("/resume");
  const isHireMeActive = isActive("/hire-me");

  const headerTransition = prefersReducedMotion
    ? ""
    : "transition-[box-shadow,background-color,border-color] duration-300";

  const ctaShellClasses = cn(
    "hidden md:flex items-center gap-4",
    isIdle && "opacity-90"
  );

  const { state: sidebarState } = useSidebar();
  const isSidebarExpanded = sidebarState === "expanded";

  const isMdOnly = useMedia(
    "(min-width: 768px) and (max-width: 1023px)",
    false
  );

  const hideLogoText = isMdOnly && isSidebarExpanded;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary z-50"
      >
        Skip to main content
      </a>

      {!online && (
        <p aria-live="polite" className="sr-only">
          You are currently offline. Some actions may not work until your
          connection is restored.
        </p>
      )}

      <header
        role="banner"
        className={cn(
          "sticky top-0 z-40 w-full border-b overflow-hidden",
          "bg-linear-to-r from-background via-background/95 to-background",
          "backdrop-blur supports-backdrop-filter:bg-background/80",
          headerTransition,
          isScrolled ? "border-border/80 shadow-sm" : "border-border/60"
        )}
      >
        <div className="h-px w-full bg-linear-to-r from-primary/65 via-secondary/60 to-accent/65" />

        <div className="px-4">
          <div className="mx-auto flex h-14 md:h-24 max-w-7xl items-center justify-between">
            <Link
              href="/"
              aria-label="Go to home"
              className="flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <HeaderLogo hideText={hideLogoText} />
            </Link>

            <div className="flex items-center gap-3">
              <nav aria-label="Primary actions" className={ctaShellClasses}>
                {/* Resume Button */}
                <Button
                  asChild
                  variant="outline"
                  jellyTone="ghost"
                  size="sm"
                  className={cn(
                    "tracking-[0.12em] uppercase text-xs md:text-sm flex items-center gap-2",
                    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isResumeActive && "bg-muted/60 border-border/80"
                  )}
                >
                  <Link
                    href="/resume"
                    aria-current={isResumeActive ? "page" : undefined}
                    className="flex items-center gap-2"
                  >
                    <FileDown className="h-4 w-4" aria-hidden="true" />
                    <span>Resume</span>
                  </Link>
                </Button>

                {/* Hire Me Button */}
                <Button
                  asChild
                  jellyTone="gradient"
                  size="sm"
                  className={cn(
                    "tracking-[0.12em] uppercase text-xs md:text-sm flex items-center gap-2",
                    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isHireMeActive && "brightness-105"
                  )}
                >
                  <Link
                    href="/hire-me"
                    aria-current={isHireMeActive ? "page" : undefined}
                    className="flex items-center gap-2"
                  >
                    <Handshake className="h-4 w-4" aria-hidden="true" />
                    <span>Hire Me</span>
                  </Link>
                </Button>
              </nav>

              <div className="md:hidden pt-2.5">
                <SidebarTrigger />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;