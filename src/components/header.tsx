"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMedia, useWindowScroll } from "react-use";
import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import ThemeToggle from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  children?: ReadonlyArray<NavChild>;
};

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about-me" },
  { label: "Expertise", href: "/expertise" },
  {
    label: "Work",
    href: "/work",
    children: [
      { label: "Featured Work", href: "/work/featured" },
      { label: "Case Studies", href: "/work/case-studies" },
      { label: "Open Source", href: "/work/open-source" },
    ],
  },
  { label: "Experience", href: "/experience" },
  { label: "Resume", href: "/resume" },
  { label: "Hire Me", href: "/hire-me" },
];

const HeaderLogo = () => (
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
    <div className="flex flex-col leading-tight">
      <span className="font-display text-xl md:text-4xl font-semibold text-gradient pl-0.5">
        Ashwin Pulipati
      </span>
      <span className="font-mono text-[7.5px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        If It Runs on Code, I Build It.
      </span>
    </div>
  </div>
);

type NavLinkProps = {
  item: NavItem;
  isActive: boolean;
  reduceMotion: boolean;
};

const NavLink = ({ item, isActive, reduceMotion }: NavLinkProps) => (
  <Link
    href={item.href}
    aria-current={isActive ? "page" : undefined}
    className="focus-visible:outline-none"
  >
    <span
      className={cn(
        "relative inline-flex items-center rounded-full px-3.5 py-1.5 text-xs md:text-sm font-medium transition-all border border-transparent",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-card/80 hover:shadow-sm hover:border-border/70"
      )}
    >
      {isActive &&
        (reduceMotion ? (
          <span className="absolute inset-0 -z-10 rounded-full bg-linear-to-tr from-primary via-secondary to-accent shadow-md shadow-primary/25" />
        ) : (
          <motion.span
            layoutId="nav-pill"
            className="absolute inset-0 -z-10 rounded-full bg-linear-to-tr from-primary via-secondary to-accent shadow-md shadow-primary/25"
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 26,
            }}
          />
        ))}
      <span className="relative z-10 tracking-[0.12em]">{item.label}</span>
    </span>
  </Link>
);

type NavWorkDropdownProps = {
  item: NavItem;
  isActive: boolean;
  reduceMotion: boolean;
};

const NavWorkDropdown = ({
  item,
  isActive,
  reduceMotion,
}: NavWorkDropdownProps) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={isActive}
          className="focus-visible:outline-none"
        >
          <span
            className={cn(
              "relative inline-flex items-center rounded-full px-3.5 py-1.5 text-xs md:text-sm font-medium transition-all border border-transparent",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-card/80 hover:shadow-sm hover:border-border/70"
            )}
          >
            {isActive &&
              (reduceMotion ? (
                <span className="absolute inset-0 -z-10 rounded-full bg-linear-to-tr from-primary via-secondary to-accent shadow-md shadow-primary/25" />
              ) : (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-linear-to-tr from-primary via-secondary to-accent shadow-md shadow-primary/25"
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 26,
                  }}
                />
              ))}

            <span className="relative z-10 flex items-center gap-1 tracking-[0.12em]">
              <span>{item.label}</span>
              {hasChildren && (
                <ChevronDown
                  className="h-3 w-3 opacity-80"
                  aria-hidden="true"
                />
              )}
            </span>
          </span>
        </button>
      </DropdownMenuTrigger>

      {hasChildren && (
        <DropdownMenuContent
          align="start"
          sideOffset={10}
          className="min-w-[12rem] rounded-xl border border-border/60 bg-card/95 shadow-lg backdrop-blur-sm"
        >
          <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
            Work
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border/60" />
          {item.children!.map((child) => (
            <DropdownMenuItem
              key={child.href}
              asChild
              className="cursor-pointer text-sm"
            >
              <Link href={child.href} className="flex w-full items-center">
                <span>{child.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

type MobileNavLinkProps = {
  item: NavItem;
  isActive: boolean;
  onNavigate: () => void;
};

const MobileNavLink = ({ item, isActive, onNavigate }: MobileNavLinkProps) => (
  <Link
    href={item.href}
    onClick={onNavigate}
    aria-current={isActive ? "page" : undefined}
  >
    <span
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-linear-to-tr from-primary via-secondary to-accent text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      )}
    >
      <span>{item.label}</span>
    </span>
  </Link>
);

const MobileMenu = ({
  items,
  isActive,
}: {
  items: ReadonlyArray<NavItem>;
  isActive: (href: string) => boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          jellyTone="ghost"
          size="icon-sm"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col gap-4 pt-6"
        aria-label="Mobile navigation"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="mt-8 flex items-center gap-2">
            <span className="relative inline-block h-10 w-10">
              <Image
                src="/logo.png"
                alt="Ashwin Pulipati logo"
                fill
                className="object-contain"
              />
            </span>
            <span className="font-display text-2xl font-semibold text-gradient pl-0.5">
              Ashwin Pulipati
            </span>
          </SheetTitle>
          <SheetDescription className="text-center text-xs">
            If It Runs on Code, I Build It.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-2 flex flex-col gap-1 px-2">
          {items.map((item) => (
            <MobileNavLink
              key={item.href}
              item={item}
              isActive={isActive(item.href)}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </div>
        <div className="mt-4 border-t border-border/60 pt-4 pl-2">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Theme
          </span>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Header = () => {
  const pathname = usePathname();
  const { y } = useWindowScroll();
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);
  const isScrolled = y > 4;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary z-50"
      >
        Skip to main content
      </a>
      <header
        role="banner"
        className={cn(
          "sticky top-0 z-40 w-full border-b",
          "bg-linear-to-r from-background via-background/95 to-background",
          "backdrop-blur supports-backdrop-filter:bg-background/80",
          isScrolled ? "border-border/80 shadow-sm" : "border-border/60"
        )}
      >
        <div className="h-px w-full bg-linear-to-r from-primary/60 via-secondary/55 to-accent/60" />
        <div className="px-4">
          <div className="mx-auto flex h-14 md:h-24 max-w-7xl items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="Go to home"
              className="flex items-center gap-1 md:gap-3"
            >
              <HeaderLogo />
            </Link>
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-2 md:flex"
            >
              {NAV_ITEMS.map((item) =>
                item.label === "Work" && item.children ? (
                  <NavWorkDropdown
                    key={item.href}
                    item={item}
                    isActive={isActive("/work")}
                    reduceMotion={reduceMotion}
                  />
                ) : (
                  <NavLink
                    key={item.href}
                    item={item}
                    isActive={isActive(item.href)}
                    reduceMotion={reduceMotion}
                  />
                )
              )}
            </nav>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex">
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-2 md:hidden">
                <MobileMenu items={NAV_ITEMS} isActive={isActive} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;