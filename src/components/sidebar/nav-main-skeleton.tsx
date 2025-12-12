"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

export function NavMainSkeleton() {
  return (
    <nav aria-label="Primary navigation loading" aria-busy="true">
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
          <Skeleton className="h-3 w-24" />
        </SidebarGroupLabel>

        <SidebarMenu className="mt-1.5 space-y-0.5">
          {/* Item 1 */}
          <div className="flex items-center gap-2 rounded-md px-2 py-2">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-4 w-28" />
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-2 rounded-md px-2 py-2">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Item 3 (expanded) */}
          <div className="flex items-center gap-2 rounded-md px-2 py-2">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="ml-auto h-4 w-4 rounded-sm" />
          </div>
          <div className="mt-1 space-y-1 pl-8 pr-2">
            <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
              <Skeleton className="h-3.5 w-28" />
            </div>
            <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
              <Skeleton className="h-3.5 w-24" />
            </div>
            <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
              <Skeleton className="h-3.5 w-20" />
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-2 rounded-md px-2 py-2">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Item 5 (collapsed style, with chevron placeholder) */}
          <div className="flex items-center gap-2 rounded-md px-2 py-2">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-4 w-26" />
            <Skeleton className="ml-auto h-4 w-4 rounded-sm" />
          </div>
        </SidebarMenu>
      </SidebarGroup>
    </nav>
  );
}
