import type { LucideIcon } from "lucide-react";
import {
  Home,
  User,
  Sparkles,
  FolderKanban,
  BriefcaseBusiness,
} from "lucide-react";

export type NavChild = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  ariaLabel?: string;
  children?: ReadonlyArray<NavChild>;
  priority?: "primary" | "secondary";
};

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    ariaLabel: "Go to home section",
    priority: "primary",
  },
  {
    label: "About Me",
    href: "/about-me",
    icon: User,
    ariaLabel: "Learn more about Ashwin Pulipati",
    priority: "secondary",
  },
  {
    label: "Expertise",
    href: "/expertise",
    icon: Sparkles,
    ariaLabel: "View areas of technical expertise",
    priority: "secondary",
  },
  {
    label: "Work",
    href: "/work",
    icon: FolderKanban,
    ariaLabel: "Browse work and case studies",
    priority: "primary",
    children: [
      {
        label: "Featured Work",
        href: "/work/featured",
        ariaLabel: "View featured work",
      },
      {
        label: "Case Studies",
        href: "/work/case-studies",
        ariaLabel: "View detailed case studies",
      },
      {
        label: "Open Source",
        href: "/work/open-source",
        ariaLabel: "View open source contributions",
      },
    ],
  },
  {
    label: "Experience",
    href: "/experience",
    icon: BriefcaseBusiness,
    ariaLabel: "View professional experience",
    priority: "secondary",
  },
] as const;
