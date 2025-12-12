"use client";

import { useMemo } from "react";
import { useLocalStorage, useMedia } from "react-use";

import type { OpportunityType } from "@/components/hire-me/types";

export function useOpportunities() {
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);

  const [storedOpportunity, setStoredOpportunity] =
    useLocalStorage<OpportunityType>(
      "portfolio-opportunity-focus",
      "full-time"
    );

  const opportunity = storedOpportunity ?? "full-time";

  const accessibilityNote = useMemo(
    () =>
      reduceMotion
        ? "Animations are reduced based on your system preference."
        : "",
    [reduceMotion]
  );

  return {
    reduceMotion,
    opportunity,
    setOpportunity: setStoredOpportunity,
    accessibilityNote,
  };
}
