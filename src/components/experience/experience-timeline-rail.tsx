"use client";

import { Fragment } from "react";

import { EXPERIENCE_ITEMS } from "./constants";
import { TimelineItemCard } from "./timeline-item-card";

export function ExperienceTimelineRail({
  activeId,
  onActiveChange,
  reduceMotion,
}: {
  readonly activeId: string;
  readonly onActiveChange: (id: string) => void;
  readonly reduceMotion: boolean;
}) {
  return (
    <section aria-label="Experience timeline" className="relative mt-2">
      <ol className="space-y-6">
        {EXPERIENCE_ITEMS.map((item, index) => (
          <Fragment key={item.id}>
            <TimelineItemCard
              item={item}
              isActive={item.id === activeId}
              onInView={onActiveChange}
              reduceMotion={reduceMotion}
            />
            {index === EXPERIENCE_ITEMS.length - 1 ? null : (
              <span className="sr-only">Continues to next role</span>
            )}
          </Fragment>
        ))}
      </ol>
    </section>
  );
}
