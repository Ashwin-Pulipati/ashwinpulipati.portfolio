"use client";

import { Settings2 } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import ThemeToggle from "../theme-toggle";

export function NavFooter() {
  // UPDATED: Destructure isMobile from the hook
  const { state, setOpen, isMobile } = useSidebar();

  // UPDATED: Logic change
  // We only want the "collapsed" (icon-only) view if:
  // 1. The state is actually collapsed
  // 2. AND we are NOT on mobile.
  // (On mobile, the sidebar is a drawer, so it should always look "expanded")
  const isCollapsed = state === "collapsed" && !isMobile;

  if (isCollapsed) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            tooltip="Theme and appearance"
            className="justify-center"
            aria-label="Open sidebar and theme settings"
            onClick={() => setOpen(true)}
          >
            <Settings2 aria-hidden="true" className="text-muted-foreground" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu aria-label="Theme and status">
      <SidebarMenuItem>
        <div className="flex w-full flex-col gap-1.5 px-3 py-2">
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80 px-0 h-auto pb-2.5">
            Theme
          </SidebarGroupLabel>
          <ThemeToggle />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
