import type { LucideIcon } from "lucide-react";
import {
  Home,
  User,
  FolderKanban,
  BriefcaseBusiness,
  ToolCase,
  Handshake,
  FileDown,
} from "lucide-react";

export type NavChild = {
  label: string;
  href: string;
  ariaLabel?: string;
  download?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  ariaLabel?: string;
  children?: ReadonlyArray<NavChild>;
  priority?: "primary" | "secondary";
  download?: boolean;
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
    icon: ToolCase,
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
        label: "All Projects",
        href: "/work",
        ariaLabel: "View all selected projects",
      },
      {
        label: "Frontend-heavy",
        href: "/work?focus=frontend-heavy",
        ariaLabel: "View frontend-heavy projects",
      },
      {
        label: "Backend-heavy",
        href: "/work?focus=backend-heavy",
        ariaLabel: "View backend-heavy projects",
      },
      {
        label: "Full-stack",
        href: "/work?focus=full-stack",
        ariaLabel: "View full-stack projects",
      },
      {
        label: "DevOps / Data",
        href: "/work?focus=devops",
        ariaLabel: "View DevOps and data projects",
      },
      {
        label: "Games & Web3",
        href: "/work?focus=games-web3",
        ariaLabel: "View game and Web3 experiments",
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
  
  {
    label: "Resume",
    href: "/Ashwin_Pulipati_Resume.pdf",
    icon: FileDown,
    ariaLabel: "Download resume as PDF",
    priority: "secondary",
    download: true,
  },

  {
    label: "Hire Me",
    href: "/hire-me",
    icon: Handshake,
    ariaLabel: "Contact me for opportunities",
    priority: "primary",
  },
] as const;
