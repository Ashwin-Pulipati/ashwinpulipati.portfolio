"use client";

import { Sparkles } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { OPPORTUNITY_OPTIONS } from "./constants";
import type { OpportunityType } from "./types";

export function OpportunitySelector({
  value,
  onChange,
  reduceMotion,
}: {
  readonly value: OpportunityType;
  readonly onChange: (value: OpportunityType) => void;
  readonly reduceMotion: boolean;
}) {
  return (
    <div className="space-y-3 pt-2">
      <div className="space-y-3">
        <Label>
          Opportunity Type{" "}
          <span className="text-red-500 dark:text-red-400">*</span>
        </Label>

        <RadioGroup
          value={value}
          onValueChange={(val) => onChange(val as OpportunityType)}
          className="grid gap-2 sm:grid-cols-2"
          aria-label="Select opportunity type"
        >
          {OPPORTUNITY_OPTIONS.map((option) => {
            const isActive = option.id === value;
            return (
              <Label
                key={option.id}
                htmlFor={option.id}
                className={cn(
                  "group flex w-full cursor-pointer flex-col items-start gap-1.5 rounded-2xl border px-3 py-2.5 text-left text-xs transition-all hover:bg-card hover:shadow-sm",
                  isActive
                    ? "border-transparent bg-linear-to-tr from-primary/10 via-secondary/12 to-accent/16 shadow-md shadow-primary/20"
                    : "border-border bg-card/50"
                )}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className={cn(
                        "data-[state=checked]:border-primary data-[state=checked]:text-primary",
                        isActive
                          ? "border-primary"
                          : "border-muted-foreground/50"
                      )}
                    />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {option.label}
                    </span>
                  </span>
                </div>
              </Label>
            );
          })}
        </RadioGroup>

        {!reduceMotion && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground/90">
            <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
            <span>
              You can adjust this later. It simply shapes how I read your
              message.
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
