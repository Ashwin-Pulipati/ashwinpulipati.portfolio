"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { useIdle, useMedia } from "react-use";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type NavMainItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean; // ignored now in favor of URL-based active state
  items?: {
    title: string;
    url: string;
    isActive?: boolean; // ignored as well
  }[];
};

type ProjectFocus =
  | "all"
  | "frontend-heavy"
  | "backend-heavy"
  | "full-stack"
  | "devops"
  | "games-web3";

function normalizeFocusParam(value: string | null): ProjectFocus {
  const allowed: ProjectFocus[] = [
    "all",
    "frontend-heavy",
    "backend-heavy",
    "full-stack",
    "devops",
    "games-web3",
  ];
  if (value && allowed.includes(value as ProjectFocus)) {
    return value as ProjectFocus;
  }
  return "all";
}

function getFocusFromHref(href: string): ProjectFocus {
  // Support URLs like "/work" and "/work?focus=backend-heavy"
  try {
    const url = new URL(href, "http://localhost");
    const focusParam = url.searchParams.get("focus");
    return normalizeFocusParam(focusParam);
  } catch {
    return "all";
  }
}

export function NavMain({ items }: { readonly items: NavMainItem[] }) {
  const prefersReducedMotion = useMedia(
    "(prefers-reduced-motion: reduce)",
    false
  );
  const isIdle = useIdle(60_000);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFocus = normalizeFocusParam(searchParams.get("focus"));

  return (
    <nav aria-label="Primary navigation">
      <SidebarGroup
        className={cn(
          prefersReducedMotion
            ? ""
            : "overflow-hidden transition-opacity duration-150",
          isIdle && "opacity-95"
        )}
      >
        <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
          Navigation
        </SidebarGroupLabel>

        <SidebarMenu className="mt-1.5 space-y-0.5">
          {items.map((item) => {
            const hasChildren = item.items && item.items.length > 0;
            const Icon = item.icon;

            // Top-level active: path match OR any child active
            const basePath = item.url.split("?")[0];
            const isOnThisPath = pathname === basePath;

            let anyChildActive = false;

            if (hasChildren && isOnThisPath) {
              // Special handling for /work children based on ?focus=
              if (basePath === "/work") {
                anyChildActive = item.items!.some((subItem) => {
                  const subFocus = getFocusFromHref(subItem.url);
                  return subFocus === currentFocus;
                });
              } else {
                anyChildActive = item.items!.some((subItem) => {
                  const childBasePath = subItem.url.split("?")[0];
                  return pathname === childBasePath;
                });
              }
            }

            const itemIsActive = isOnThisPath || anyChildActive;

            if (!hasChildren) {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={itemIsActive}
                    className={cn(
                      "aria-[current=page]:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    )}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-2"
                      aria-current={itemIsActive ? "page" : undefined}
                    >
                      {Icon && (
                        <Icon
                          aria-hidden="true"
                          className={cn(
                            "size-5",
                            itemIsActive
                              ? "text-sidebar-accent-foreground"
                              : "text-muted-background"
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          itemIsActive && "font-semibold"
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }

            // Items with children (e.g., Work)
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={itemIsActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={itemIsActive}
                      className={cn(
                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      )}
                    >
                      {Icon && (
                        <Icon
                          aria-hidden="true"
                          className={cn(
                            "size-5",
                            itemIsActive
                              ? "text-sidebar-accent-foreground"
                              : "text-muted-background"
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          itemIsActive && "font-semibold"
                        )}
                      >
                        {item.title}
                      </span>
                      <ChevronRight
                        aria-hidden="true"
                        className={cn(
                          "ml-auto size-4 text-muted-background",
                          "transition-transform duration-200",
                          "group-data-[state=open]/collapsible:rotate-90"
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub className="mt-1">
                      {item.items?.map((subItem) => {
                        // Child active logic
                        const childBasePath = subItem.url.split("?")[0];

                        let subIsActive = false;

                        if (basePath === "/work") {
                          // Match on focus bucket
                          const subFocus = getFocusFromHref(subItem.url);
                          subIsActive =
                            pathname === "/work" && subFocus === currentFocus;
                        } else {
                          subIsActive = pathname === childBasePath;
                        }

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={subIsActive}
                              className={cn(
                                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                              )}
                            >
                              <Link
                                href={subItem.url}
                                aria-current={subIsActive ? "page" : undefined}
                                className="flex items-center gap-2"
                              >
                                <span className="text-xs">{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </nav>
  );
}