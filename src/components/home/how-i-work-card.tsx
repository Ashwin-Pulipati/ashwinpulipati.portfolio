"use client";

import Link from "next/link";

import { GradientBullet } from "@/components/gradient-bullet";

export const HowIWorkCard = () => {
  return (
    <div className="surface-soft flex w-full max-w-full flex-col gap-3 p-4 text-xs text-muted-foreground sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em]">
        How I like to work
      </p>

      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex items-start gap-2">
          <GradientBullet />
          <span>
            Start from real constraints, then choose the right stack across web,
            mobile, data, and infra.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <GradientBullet />
          <span>
            Treat AI, automation, and observability as first-class features, not
            afterthoughts.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <GradientBullet />
          <span>
            Ship iteratively with automated checks, clean git history, and
            lightweight documentation.
          </span>
        </li>
      </ul>

      <div className="pt-1 text-xs text-muted-foreground">
        <Link
          href="/about-me"
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          Learn more about how I work
        </Link>{" "}
        ·{" "}
        <Link
          href="/expertise"
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          See the full stack I work in
        </Link>
      </div>
    </div>
  );
};
