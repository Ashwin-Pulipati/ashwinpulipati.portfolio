"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

const SCROLL_THRESHOLD = 120;

const Scroller = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const updateScrollPosition = useCallback(() => {
    const y = window.scrollY || window.pageYOffset;
    setIsAtTop(y < SCROLL_THRESHOLD);
    setIsVisible(y > SCROLL_THRESHOLD / 2);
  }, []);

  const scrollTo = useCallback(
    (position: number) => {
      if (prefersReducedMotion) {
        window.scrollTo({ top: position });
      } else {
        window.scrollTo({ top: position, behavior: "smooth" });
      }
    },
    [prefersReducedMotion]
  );

  const handleClick = () => {
    if (isAtTop) {
      scrollTo(document.documentElement.scrollHeight);
    } else {
      scrollTo(0);
    }
  };

  useEffect(() => {
    updateScrollPosition();
    window.addEventListener("scroll", updateScrollPosition, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollPosition);
  }, [updateScrollPosition]);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 md:bottom-7 md:right-7">
      <Button
        type="button"
        variant="default"
        size="icon-lg"
        onClick={handleClick}
        className={`
          pointer-events-auto rounded-full h-12 w-12 md:h-13 md:w-13
          shadow-lg shadow-primary/30
          transition-transform duration-200
          ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
        aria-label={isAtTop ? "Scroll to bottom" : "Scroll to top"}
      >
        {isAtTop ? (
          <ArrowDown size={20} aria-hidden="true" />
        ) : (
          <ArrowUp size={20} aria-hidden="true" />
        )}
      </Button>
    </div>
  );
};

export default Scroller;
