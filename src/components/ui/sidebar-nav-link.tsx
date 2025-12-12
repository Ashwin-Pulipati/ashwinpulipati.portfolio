"use client";

import Link from "next/link";
import * as React from "react";

type SidebarNavLinkProps = {
  href: string;
  download?: boolean;
  ariaLabel?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const SidebarNavLink = React.forwardRef<HTMLAnchorElement, SidebarNavLinkProps>(
  function SidebarNavLink(
    { href, download, ariaLabel, children, ...props },
    ref
  ) {
    const ariaProps = ariaLabel ? { "aria-label": ariaLabel } : {};

    if (download) {
      return (
        <a ref={ref} href={href} download {...ariaProps} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link ref={ref} href={href} {...ariaProps} {...props}>
        {children}
      </Link>
    );
  }
);
