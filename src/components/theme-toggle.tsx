"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CursorFollow, CursorProvider } from "./ui/shadcn-io/animated-cursor";

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
  onHoverChange?: (label: string | null) => void;
};

const ThemeToggleButton = ({
  id,
  label,
  Icon,
  isActive,
  onSelect,
  onHoverChange,
}: ThemeToggleButtonProps) => (
  <Button
    type="button"
    variant="ghost"
    size="icon-sm"
    onClick={() => onSelect(id)}
    onMouseEnter={() => onHoverChange?.(label)}
    onMouseLeave={() => onHoverChange?.(null)}
    onFocus={() => onHoverChange?.(label)}
    onBlur={() => onHoverChange?.(null)}
    aria-label={`Switch to ${label} theme`}
    role="radio"
    aria-checked={isActive}
    className={cn(
      "cursor-none relative rounded-full transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      isActive
        ? "text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-card/80 hover:shadow-sm"
    )}
  >
    {isActive && (
      <motion.span
        layoutId="theme-pill"
        className="absolute inset-0 -z-10 rounded-full bg-primary/10 shadow-sm"
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      />
    )}
    <motion.span
      animate={{ scale: isActive ? 1.05 : 1 }}
      transition={{ duration: 0.15 }}
      className="relative z-10"
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
    </motion.span>
  </Button>
);

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const currentTheme: ThemeId =
    (theme as ThemeId) || (systemTheme as ThemeId) || "system";

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

    e.preventDefault();
    const index = THEME_OPTIONS.findIndex((opt) => opt.id === currentTheme);
    if (index === -1) return;

    const delta = e.key === "ArrowRight" ? 1 : -1;
    const nextIndex =
      (index + delta + THEME_OPTIONS.length) % THEME_OPTIONS.length;
    setTheme(THEME_OPTIONS[nextIndex].id);
  };

  if (!mounted) {
    return (
      <div
        className="inline-flex items-center gap-1 rounded-full bg-linear-to-r from-muted/70 via-muted/80 to-muted/70 px-1 py-1 border border-border/60 shadow-sm"
        aria-hidden="true"
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-8 w-8 rounded-full bg-muted-foreground/15 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <CursorProvider>
      <div className="relative">
        <div
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-1 py-1",
            "bg-linear-to-r from-background/90 via-card/90 to-background/90",
            "border border-border/50 shadow-sm",
            "backdrop-blur-sm supports-backdrop-filter:bg-card/70"
          )}
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
              onHoverChange={setHoverLabel}
            />
          ))}
        </div>

        {hoverLabel && (
          <CursorFollow align="bottom" sideOffset={18}>
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-full border border-border/60 bg-primary/70 px-2.5 py-1 text-xs font-medium text-foreground shadow-md backdrop-blur-sm"
            >
              {hoverLabel}
            </motion.div>
          </CursorFollow>
        )}
      </div>
    </CursorProvider>
  );
}
