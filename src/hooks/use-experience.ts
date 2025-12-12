"use client";

import { useIdle, useMedia, useNetworkState } from "react-use";
import { useMemo } from "react";
import { EXPERIENCE_ITEMS } from "@/components/experience/constants";


export function useExperience() {
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);
  const isDesktop = useMedia("(min-width: 900px)", false);
  const { online } = useNetworkState();
  const isIdle = useIdle(60_000);

  const summary = useMemo(() => {
    const totalRoles = EXPERIENCE_ITEMS.length;
    const currentRoles = EXPERIENCE_ITEMS.filter(
      (i) => i.tenure === "current"
    ).length;

    return {
      totalRoles,
      currentRoles,
      timelineSpan: "2020 → Present",
    };
  }, []);

  const connectionNote = useMemo(() => {
    if (online === false) {
      return "You appear to be offline. This page stays fully readable and keyboard-accessible.";
    }
    if (isIdle) {
      return "You’ve been idle for a bit. Your place on the timeline is preserved.";
    }
    return "Scroll or use the timeline to see how I grow roles over time instead of just changing titles.";
  }, [online, isIdle]);

  return { reduceMotion, isDesktop, summary, connectionNote };
}
