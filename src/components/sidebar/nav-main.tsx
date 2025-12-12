"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type NavMainItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    isActive?: boolean;
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
  try {
    const url = new URL(href, "http://localhost");
    const focusParam = url.searchParams.get("focus");
    return normalizeFocusParam(focusParam);
  } catch {
    return "all";
  }
}

export function NavMain({ items }: { readonly items: NavMainItem[] }) {
  const { state, setOpen } = useSidebar();
  const router = useRouter();
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
        <SidebarGroupLabel className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
          Navigation
        </SidebarGroupLabel>

        <SidebarMenu className="mt-1.5 space-y-0.5">
          {items.map((item) => {
            const hasChildren = item.items && item.items.length > 0;
            const Icon = item.icon;

            const basePath = item.url.split("?")[0];
            const isOnThisPath = pathname === basePath;

            let anyChildActive = false;

            if (hasChildren && isOnThisPath) {
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
                              : "text-muted-foreground"
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "text-md",
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
                      onClick={(e) => {
                        if (state === "collapsed") {
                          e.preventDefault();
                          setOpen(true);
                          setTimeout(() => {
                            router.push(item.url);
                          }, 150);
                        }
                      }}
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
                              : "text-muted-foreground"
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "text-md", 
                          itemIsActive && "font-semibold"
                        )}
                      >
                        {item.title}
                      </span>
                      <ChevronRight
                        aria-hidden="true"
                        className={cn(
                          "ml-auto size-4 text-muted-foreground",
                          "transition-transform duration-200",
                          "group-data-[state=open]/collapsible:rotate-90"
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub className="mt-1">
                      {item.items?.map((subItem) => {
                        const childBasePath = subItem.url.split("?")[0];
                        let subIsActive = false;

                        if (basePath === "/work") {
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
                                <span className="text-sm">{subItem.title}</span>{" "}
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