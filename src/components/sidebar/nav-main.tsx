"use client";

import * as React from "react";
import Link from "next/link";
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
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    isActive?: boolean;
  }[];
};

export function NavMain({ items }: { readonly items: NavMainItem[] }) {
  const prefersReducedMotion = useMedia(
    "(prefers-reduced-motion: reduce)",
    false
  );
  const isIdle = useIdle(60_000);

  return (
    <nav aria-label="Primary navigation">
      <SidebarGroup
        className={cn(
          prefersReducedMotion
            ? ""
            : "transition-opacity duration-150 overflow-hidden",
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

            if (!hasChildren) {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={item.isActive}
                    className={cn(
                      "aria-[current=page]:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    )}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-2"
                      aria-current={item.isActive ? "page" : undefined}
                    >
                      {Icon && (
                        <Icon
                          aria-hidden="true"
                          className={cn(
                            "size-5",
                            item.isActive
                              ? "text-sidebar-accent-foreground"
                              : "text-muted-background"
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          item.isActive && "font-semibold"
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
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.isActive}
                      className={cn(
                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      )}
                    >
                      {Icon && (
                        <Icon
                          aria-hidden="true"
                          className={cn(
                            "size-5",
                            item.isActive
                              ? "text-sidebar-accent-foreground"
                              : "text-muted-background"
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          item.isActive && "font-semibold"
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
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.isActive}
                            className={cn(
                              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            )}
                          >
                            <Link
                              href={subItem.url}
                              aria-current={
                                subItem.isActive ? "page" : undefined
                              }
                              className="flex items-center gap-2"
                            >
                              <span className="text-xs">{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
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