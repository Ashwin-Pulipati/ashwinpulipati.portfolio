"use client";

import { GradientBullet } from "@/components/gradient-bullet";

export const PillarSection = ({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) => (
  <section className="surface-soft flex h-full flex-col gap-3 p-5">
    <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
      {title}
    </h2>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <GradientBullet />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </section>
);
