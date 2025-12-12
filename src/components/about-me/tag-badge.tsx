"use client";

import type React from "react";
import { Badge } from "@/components/ui/badge";

export const TagBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge
    variant="outline"
    className="rounded-full border-border/70 bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-[0_1px_0_oklch(0.98_0_0/0.7),0_5px_5px_oklch(0.7_0_0/0.35)]"
  >
    {children}
  </Badge>
);
