"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { FocusOption, ProjectFocus } from "./types";
import { FOCUS_OPTIONS } from "./constants";

export function FocusFilter({
  focus,
  activeFocusConfig,
  onChange,
}: {
  readonly focus: ProjectFocus;
  readonly activeFocusConfig: FocusOption;
  readonly onChange: (next: ProjectFocus) => void;
}) {
  return (
    <div
      className="space-y-2 md:text-right"
      aria-label="Filter projects by focus area"
    >
      <div
        className="flex flex-col gap-1 md:items-end"
        role="group"
        aria-labelledby="work-focus-label"
      >
        <p
          id="work-focus-label"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
        >
          Filter by focus
        </p>

        <Select
          value={focus}
          onValueChange={(value) => onChange(value as ProjectFocus)}
        >
          <SelectTrigger className="w-[220px] justify-between text-sm">
            <SelectValue placeholder="All projects" />
          </SelectTrigger>
          <SelectContent>
            {FOCUS_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-sm"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="max-w-xs text-xs text-muted-foreground md:ml-auto">
        {activeFocusConfig.description}
      </p>
    </div>
  );
}
