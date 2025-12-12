"use client";

import { useMedia } from "react-use";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const AboutAvatar = () => {
  const prefersReducedMotion = useMedia(
    "(prefers-reduced-motion: reduce)",
    false
  );

  return (
    <div className="relative mx-auto h-32 w-32 shrink-0 rounded-3xl bg-card sm:h-36 sm:w-36 md:h-44 md:w-44">
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-3xl bg-linear-to-tr from-primary/70 via-secondary/70 to-accent/70 opacity-70 blur-xl",
          prefersReducedMotion && "blur-md opacity-60"
        )}
      />
      <div className="relative m-[3px] flex h-[calc(100%-6px)] w-[calc(100%-6px)] items-center justify-center overflow-hidden rounded-[1.4rem] bg-card shadow-[0_18px_40px_oklch(0_0_0/_0.18)]">
        <Avatar className="h-full w-full rounded-[1.4rem]">
          <AvatarImage
            src="/real-me.png"
            alt="Portrait of Ashwin Pulipati"
            className="h-full w-full object-cover"
          />
          <AvatarFallback className="rounded-[1.4rem] text-sm font-semibold">
            AP
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
