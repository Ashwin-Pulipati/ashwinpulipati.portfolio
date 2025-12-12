"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/nav";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavFooter } from "@/components/sidebar/nav-footer";
import { NavMainSkeleton } from "@/components/sidebar/nav-main-skeleton";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const mappedItems = React.useMemo(
    () =>
      NAV_ITEMS.map((item) => {
        const isItemActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));

        return {
          title: item.label,
          url: item.href,
          icon: item.icon,
          isActive: isItemActive,
          items: item.children?.map((child) => ({
            title: child.label,
            url: child.href,
            isActive: pathname === child.href,
          })),
        };
      }),
    [pathname]
  );
  
  const NAV_FALLBACK = React.useMemo(() => <NavMainSkeleton />, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-4">
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <React.Suspense fallback={NAV_FALLBACK}>
          <NavMain items={mappedItems} />
        </React.Suspense>
      </SidebarContent>

      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
