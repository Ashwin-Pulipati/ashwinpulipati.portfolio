"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { useMedia, useWindowScroll } from "react-use";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SCROLL_THRESHOLD = 160;

const Scroller = () => {
  const { y } = useWindowScroll();
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);

  const isAtTop = y < SCROLL_THRESHOLD;
  const isVisible = y > SCROLL_THRESHOLD / 2;

  const scrollToPosition = (position: number) => {
    window.scrollTo({
      top: position,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const handleClick = () => {
    if (isAtTop) {
      scrollToPosition(document.documentElement.scrollHeight);
    } else {
      scrollToPosition(0);
    }
  };

  const baseVisibilityClasses = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-4 pointer-events-none";

  const animatedVisibilityClasses = reduceMotion
    ? isVisible
      ? "opacity-100"
      : "opacity-0 pointer-events-none"
    : baseVisibilityClasses;

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 md:bottom-7 md:right-7">
      <TooltipProvider delayDuration={120}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="accent"
              jellyTone="accent"
              size="icon-lg"
              onClick={handleClick}
              className={[
                "pointer-events-auto",
                "transition-transform duration-200",
                animatedVisibilityClasses,
              ].join(" ")}
              aria-label={isAtTop ? "Scroll to bottom" : "Scroll to top"}
            >
              {isAtTop ? (
                <ArrowDown className="h-5 w-5" aria-hidden="true" />
              ) : (
                <ArrowUp className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="text-xs">
            <p>{isAtTop ? "Jump to bottom" : "Back to top"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Scroller;
