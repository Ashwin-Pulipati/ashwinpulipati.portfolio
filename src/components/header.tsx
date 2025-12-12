"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIdle, useMedia, useNetworkState, useWindowScroll } from "react-use";

import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { SidebarNavLink } from "@/components/ui/sidebar-nav-link";
import { NAV_ITEMS } from "@/config/nav";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

const HeaderLogo = ({ hideText = false }: { hideText?: boolean }) => (
  <div className="flex items-center gap-2 md:gap-3">
    <div className="relative h-10 w-10 md:h-19 md:w-19 shrink-0">
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
        <span className="font-mono text-[7.5px] md:text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
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

  const headerLinks = useMemo(() => {
    const wanted = new Set(["Resume", "Hire Me"]);
    return NAV_ITEMS.filter((i) => wanted.has(i.label));
  }, []);

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
                {headerLinks.map((item) => {
                  const Icon = item.icon;

                  const isActive = item.download
                    ? false
                    : pathname.startsWith(item.href);

                  const isHireMe = item.label === "Hire Me";

                  return (
                    <Button
                      key={item.href}
                      asChild
                      variant={isHireMe ? undefined : "outline"}
                      jellyTone={isHireMe ? "gradient" : "ghost"}
                      size="sm"
                      className={cn(
                        "tracking-[0.12em] uppercase text-sm flex items-center gap-2",
                        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        isActive &&
                          !item.download &&
                          "bg-muted/60 border-border/80",
                        isHireMe && isActive && "brightness-105"
                      )}
                    >
                      <SidebarNavLink
                        href={item.href}
                        download={item.download}
                        className="flex items-center gap-2"
                        ariaLabel={item.ariaLabel ?? item.label}
                        aria-current={
                          !item.download && isActive ? "page" : undefined
                        }
                      >
                        {Icon && (
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span>{item.label}</span>
                      </SidebarNavLink>
                    </Button>
                  );
                })}
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
