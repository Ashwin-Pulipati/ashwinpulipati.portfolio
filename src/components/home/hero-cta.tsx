"use client";

import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarNavLink } from "@/components/ui/sidebar-nav-link";

type ResumeItem = {
  href: string;
  download?: boolean;
  ariaLabel: string;
};

type HeroCtaProps = {
  isDesktop: boolean;
  primaryCtaLabel: string;
  resumeItem: ResumeItem;
};

export const HeroCta = ({
  isDesktop,
  primaryCtaLabel,
  resumeItem,
}: HeroCtaProps) => {
  return (
    <div className="flex flex-col gap-4 md:gap-3 w-full md:flex-row md:items-center md:w-auto">
      <Button
        asChild
        jellyTone="gradient"
        size={isDesktop ? "lg" : "default"}
        aria-label="View Ashwin's selected work"
        className="w-full md:w-auto"
      >
        <Link href="/work">
          <span className="flex items-center justify-center gap-2">
            <span>{primaryCtaLabel}</span>
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Link>
      </Button>

      <Button
        asChild
        jellyTone="ghost"
        size={isDesktop ? "lg" : "default"}
        aria-label="Download Ashwin's résumé"
        className="w-full md:w-auto"
      >
        <SidebarNavLink
          href={resumeItem.href}
          download={resumeItem.download}
          ariaLabel={resumeItem.ariaLabel}
          className="flex items-center justify-center gap-2"
        >
          <FileDown className="h-4 w-4 shrink-0" aria-hidden />
          <span>{resumeItem.download ? "Download résumé" : "View résumé"}</span>
        </SidebarNavLink>
      </Button>
    </div>
  );
};
