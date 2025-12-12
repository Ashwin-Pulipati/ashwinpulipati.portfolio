"use client";

import { useMemo } from "react";
import { useMedia } from "react-use";

export function useExpertise() {
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);

  return useMemo(
    () =>
      reduceMotion
        ? "This page is designed to stay readable and useful even with motion effects reduced."
        : "Subtle gradients and depth highlight the parts of the stack I lean on most for AI-aware, data-heavy products.",
    [reduceMotion]
  );
}
