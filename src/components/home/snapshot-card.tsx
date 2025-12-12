"use client";

import { Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export const SnapshotCard = () => {
  return (
    <div className="surface-soft relative w-full max-w-full overflow-hidden p-4 sm:p-5">
      <div className="mb-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <Terminal className="h-3 w-3" aria-hidden />
          Snapshot
        </span>
        <Badge
          variant="gradient"
          className="max-w-full text-xs font-medium tracking-normal whitespace-normal wrap-break-word"
        >
          Currently shipping multi-stack, AI-aware products
        </Badge>
      </div>

      <dl className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2 md:gap-4">
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Focus
          </dt>
          <dd className="mt-1 font-medium text-foreground">
            AI-native full-stack & frontend
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Tooling
          </dt>
          <dd className="mt-1 text-sm text-foreground">
            React, Next.js, Node, Python, AWS, CI/CD
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Quality
          </dt>
          <dd className="mt-1 text-sm text-foreground">
            Accessibility, tests, observability
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Collaboration
          </dt>
          <dd className="mt-1 text-sm text-foreground">
            Founders, PMs, designers, and engineers
          </dd>
        </div>
      </dl>
    </div>
  );
};
