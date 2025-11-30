"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import ThemeToggle from "./theme-toggle";
import { cn } from "@/lib/utils";
import { Cursor, CursorProvider } from "./ui/shadcn-io/animated-cursor";

const HeaderCursorRegion = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    <CursorProvider>
      <Cursor variant="solid" className="text-primary" />
      {children}
    </CursorProvider>
  </div>
);

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Home", href: "/" },
  { label: "Expertise", href: "/expertise" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Hire Me", href: "/hire-me" },
];

const HeaderLogo = () => (
    <div className="flex items-center gap-2 md:gap-3 cursor-none">
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
      <div className="flex flex-col leading-tight">
        <span className="font-display text-xl md:text-4xl font-semibold text-gradient pl-0.5">
          Ashwin Pulipati
        </span>
        <span className="font-mono text-[10px] md:text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          If It Runs on Code, I Build It.
        </span>
      </div>
    </div>
);

type NavLinkProps = {
  item: NavItem;
  isActive: boolean;
  onSelect: (href: string) => void;
};

const NavLink = ({ item, isActive, onSelect }: NavLinkProps) => (
  <Link
    href={item.href}
    onClick={() => onSelect(item.href)}
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "cursor-none relative inline-flex items-center rounded-full px-3.5 py-1.5 text-xs md:text-sm font-medium transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      isActive
        ? "text-primary-foreground"
        : "text-muted-foreground hover:text-foreground hover:bg-card/80 hover:shadow-sm"
    )}
  >
    {isActive && (
      <motion.span
        layoutId="nav-pill"
        className="absolute inset-0 -z-10 rounded-full bg-linear-to-tr from-primary via-secondary to-accent shadow-md shadow-primary/25"
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 26,
        }}
      />
    )}
    <span className="relative z-10 tracking-[0.12em] uppercase">
      {item.label}
    </span>
  </Link>
);

const Header = () => {
  const pathname = usePathname();
  const [selectedHref, setSelectedHref] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (selectedHref) return selectedHref === href;
    if (href === "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-primary z-50"
      >
        Skip to main content
      </a>
      <HeaderCursorRegion>
        <header
          role="banner"
          className={cn(
            "sticky top-0 z-40 w-full border-b border-border/60",
            "bg-linear-to-r from-background via-background/95 to-background",
            "backdrop-blur supports-backdrop-filter:bg-background/80"
          )}
        >
          <div className="h-px w-full bg-linear-to-r from-primary/60 via-secondary/50 to-accent/60" />

          <div className="px-4">
            <div className="mx-auto flex h-14 md:h-24 max-w-7xl items-center justify-between gap-4">
              <Link
                href="/"
                aria-label="Go to home"
                onClick={() => setSelectedHref("/")}
                className="flex items-center gap-1 md:gap-3"
              >
                <HeaderLogo />
              </Link>

              <nav
                aria-label="Main navigation"
                className="hidden md:flex items-center gap-2"
              >
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    isActive={isActive(item.href)}
                    onSelect={setSelectedHref}
                  />
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>
      </HeaderCursorRegion>
    </>
  );
};

export default Header;
