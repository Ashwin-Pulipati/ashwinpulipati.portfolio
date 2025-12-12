import type { Variants } from "framer-motion";

export const TIMELINE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
};

export const DOT_VARIANTS: Variants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: {
    scale: 1.1,
    opacity: 1,
    boxShadow: "0 0 0 4px rgba(147, 197, 253, 0.25)",
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};
