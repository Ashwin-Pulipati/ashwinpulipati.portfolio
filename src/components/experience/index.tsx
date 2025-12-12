"use client";

import { useCallback, useState } from "react";

import { EXPERIENCE_ITEMS } from "./constants";

import { ExperienceSummary } from "./experience-summary";
import { TimelineMiniNav } from "./timeline-mini-nav";
import { ExperienceTimelineRail } from "./experience-timeline-rail";
import { MobileTimelineHint } from "./mobile-timeline-hint";
import { useExperience } from "@/hooks/use-experience";

export default function Experience() {
  const { reduceMotion, isDesktop, summary, connectionNote } =
    useExperience();
  const [activeId, setActiveId] = useState<string>(EXPERIENCE_ITEMS[0]?.id);

  const handleActiveChange = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? prev : id));
  }, []);

  return (
    <main
      id="main-content"
      className="space-y-10 md:space-y-12 lg:space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <ExperienceSummary
        totalRoles={summary.totalRoles}
        timelineSpan={summary.timelineSpan}
        connectionNote={connectionNote}
      />

      <section
        aria-label="Detailed experience timeline"
        className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.5fr)]"
      >
        {isDesktop && (
          <TimelineMiniNav activeId={activeId} onSelect={setActiveId} />
        )}

        <div className="space-y-4">
          {!isDesktop && <MobileTimelineHint />}

          <ExperienceTimelineRail
            activeId={activeId}
            onActiveChange={handleActiveChange}
            reduceMotion={reduceMotion}
          />
        </div>
      </section>
    </main>
  );
}
