"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { useMedia } from "react-use";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

const THEME_OPTIONS = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
] as const;

type ThemeId = (typeof THEME_OPTIONS)[number]["id"];

type ThemeToggleButtonProps = {
  id: ThemeId;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
  onSelect: (id: ThemeId) => void;
  reduceMotion: boolean;
};

const ThemeToggleButton = ({
  id,
  label,
  Icon,
  isActive,
  onSelect,
  reduceMotion,
}: ThemeToggleButtonProps) => {
  const commonProps = {
    type: "button" as const,
    size: "icon-sm" as const,
    onClick: () => onSelect(id),
    "aria-label": `Switch to ${label} theme`,
    role: "radio" as const,
    "aria-checked": isActive,
    className: "rounded-full",
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {reduceMotion ? (
          <Button
            {...commonProps}
            variant={isActive ? "gradient" : "ghost"}
            className={
              isActive
                ? "rounded-full shadow-md shadow-primary/30"
                : "rounded-full text-muted-foreground hover:bg-card/70 hover:text-foreground"
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button {...commonProps} jellyTone={isActive ? "gradient" : "ghost"}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </TooltipTrigger>

      <TooltipContent
        side="bottom"
        className="rounded-full text-xs font-medium"
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
};

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)", false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-3" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-7 w-7 rounded-full bg-muted-foreground/15 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const currentTheme: ThemeId =
    (theme as ThemeId) || (systemTheme as ThemeId) || "system";

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();

    const index = THEME_OPTIONS.findIndex((opt) => opt.id === currentTheme);
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const nextIndex =
      (index + delta + THEME_OPTIONS.length) % THEME_OPTIONS.length;

    setTheme(THEME_OPTIONS[nextIndex].id);
  };

  return (
    <TooltipProvider delayDuration={120}>
      <div
        className="inline-flex items-center gap-3"
        role="radiogroup"
        aria-label="Theme selection"
        onKeyDown={handleKeyDown}
      >
        {THEME_OPTIONS.map(({ id, label, icon }) => (
          <ThemeToggleButton
            key={id}
            id={id}
            label={label}
            Icon={icon}
            isActive={currentTheme === id}
            onSelect={(value) => setTheme(value)}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </TooltipProvider>
  );
}
