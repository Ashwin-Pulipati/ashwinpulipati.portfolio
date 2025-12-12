"use client";

import { PROFILE_TAGS } from "./constants";

export const IntroTile = () => (
  <section
    aria-label="High-level overview"
    className="surface-soft flex h-full flex-col justify-between gap-6 p-5 sm:p-6"
  >
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        At a glance
      </p>
      <h1 className="text-2xl font-semibold leading-snug text-foreground">
        A product-minded engineer who bridges UX, systems, and delivery.
      </h1>
      <p className="text-md leading-relaxed text-muted-foreground">
        Translate fuzzy, real-world requirements into clear scopes, technical
        plans, and delivery milestones. Build end-to-end features across
        React/Next.js frontends and Node/Python backends with a strong focus on
        reliability.
      </p>
    </div>

    <div className="space-y-2 text-xs text-muted-foreground">
      {PROFILE_TAGS.map((tag) => (
        <p key={tag}>{tag}</p>
      ))}
    </div>
  </section>
);
