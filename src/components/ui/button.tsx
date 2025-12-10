"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "transition-all duration-150",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
    "shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "aria-invalid:ring-2 aria-invalid:ring-destructive/30 aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow focus-visible:shadow-md",
        gradient:
          "bg-linear-to-tr from-primary via-secondary to-accent text-primary-foreground shadow-md hover:opacity-95 hover:shadow-lg active:scale-[0.985]",
        soft: "surface-soft text-foreground hover:shadow-md active:shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/40",
        outline:
          "border border-border bg-background/80 text-foreground shadow-xs hover:bg-muted/80 dark:bg-background/60",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        accent: "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90",
        ghost:
          "bg-transparent text-foreground/80 hover:bg-muted/60 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/90 shadow-none px-0",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4 text-base",
        icon: "size-9 rounded-full",
        "icon-sm": "size-8 rounded-full",
        "icon-lg": "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type JellyTone =
  | "primary"
  | "ghost"
  | "secondary"
  | "destructive"
  | "outline"
  | "gradient"
  | "accent";

type ButtonProps = React.ComponentProps<"button"> &
  ButtonVariants & {
    asChild?: boolean;
    jellyTone?: JellyTone;
  };

type ButtonSize = NonNullable<ButtonProps["size"]> | "default";

const jellySizeClasses: Record<ButtonSize, string> = {
  default: "px-7 py-3 text-sm md:px-8 md:text-sm",
  sm: "px-5 py-2 text-xs",
  lg: "px-9 py-3.5 text-base md:px-10 md:text-base",
  icon: "px-4 py-3 text-sm",
  "icon-sm": "px-3.5 py-2.5 text-xs",
  "icon-lg": "px-4.5 py-3.5 text-base",
};

const jellyFrontToneClasses: Record<JellyTone, string> = {
  primary: "bg-primary text-primary-foreground",
  gradient:
    "bg-linear-to-tr from-primary via-secondary to-accent text-primary-foreground",
  accent: "bg-accent text-accent-foreground shadow-none!",
  ghost: "bg-background text-foreground border border-border shadow-none!",
  secondary: "bg-secondary text-secondary-foreground shadow-none!",
  destructive: "bg-destructive text-destructive-foreground",
  outline: "bg-background text-foreground border border-border shadow-none!",
};

type JellyButtonProps = Omit<ButtonProps, "asChild" | "variant"> & {
  jellyTone: JellyTone;
};

function JellyButton({
  children,
  size = "default",
  className,
  disabled,
  type,
  jellyTone,
  ...rest
}: JellyButtonProps) {
  const sizeKey = (size ?? "default") as ButtonSize;
  const frontSize = jellySizeClasses[sizeKey] ?? jellySizeClasses.default;
  const isDisabled = !!disabled;

  const tone = jellyTone ?? "primary";
  const frontToneClasses =
    jellyFrontToneClasses[tone] ?? jellyFrontToneClasses.primary;

  const baseGlowMap: Record<JellyTone, string> = {
    ghost: "bg-foreground/6 dark:bg-foreground/15",
    outline: "bg-foreground/6 dark:bg-foreground/15",
    accent: "bg-accent/25 dark:bg-accent/20",
    primary: "bg-primary/35 dark:bg-primary/25",
    gradient:
      "bg-gradient-to-tr from-primary/35 via-secondary/35 to-accent/35 dark:from-primary/20 dark:via-secondary/20 dark:to-accent/20",
    secondary: "bg-secondary/35 dark:bg-secondary/12",
    destructive: "bg-primary/35 dark:bg-primary/15",
  };

  const midLayerMap: Record<JellyTone, string> = {
    ghost:
      "bg-[linear-gradient(to_left,oklch(0.68_0.015_95)_0%,oklch(0.82_0.015_95)_8%,oklch(0.82_0.015_95)_92%,oklch(0.68_0.015_95)_100%)] dark:bg-[linear-gradient(to_left,oklch(0.54_0.015_95)_0%,oklch(0.68_0.015_95)_8%,oklch(0.68_0.015_95)_92%,oklch(0.54_0.015_95)_100%)] brightness-105",
    outline:
      "bg-[linear-gradient(to_left,oklch(0.68_0.015_95)_0%,oklch(0.82_0.015_95)_8%,oklch(0.82_0.015_95)_92%,oklch(0.68_0.015_95)_100%)] dark:bg-[linear-gradient(to_left,oklch(0.54_0.015_95)_0%,oklch(0.68_0.015_95)_8%,oklch(0.68_0.015_95)_92%,oklch(0.54_0.015_95)_100%)] brightness-105",
    accent:
      "bg-[linear-gradient(to_left,oklch(0.45_0.12_190)_0%,oklch(0.62_0.12_190)_8%,oklch(0.62_0.12_190)_92%,oklch(0.45_0.12_190)_100%)] dark:bg-[linear-gradient(to_left,oklch(0.34_0.12_190)_0%,oklch(0.50_0.12_190)_8%,oklch(0.50_0.12_190)_92%,oklch(0.34_0.12_190)_100%)] brightness-105",
    primary:
      "bg-[linear-gradient(to_left,oklch(0.40_0.22_20)_0%,oklch(0.55_0.22_20)_8%,oklch(0.55_0.22_20)_92%,oklch(0.40_0.22_20)_100%)] dark:bg-[linear-gradient(to_left,oklch(0.46_0.22_20)_0%,oklch(0.60_0.22_20)_8%,oklch(0.60_0.22_20)_92%,oklch(0.46_0.22_20)_100%)] brightness-105",
    gradient:
      "bg-gradient-to-tr from-[oklch(0.55_0.22_20)] via-[oklch(0.52_0.16_300)] to-[oklch(0.62_0.12_190)] dark:bg-gradient-to-tr from-[oklch(0.42_0.22_20)] via-[oklch(0.39_0.16_300)] to-[oklch(0.49_0.12_190)] brightness-105",
    secondary:
      "bg-[linear-gradient(to_left,oklch(0.38_0.16_300)_0%,oklch(0.54_0.16_300)_8%,oklch(0.54_0.16_300)_92%,oklch(0.38_0.16_300)_100%)] dark:bg-[linear-gradient(to_left,oklch(0.27_0.16_300)_0%,oklch(0.42_0.16_300)_8%,oklch(0.42_0.16_300)_92%,oklch(0.27_0.16_300)_100%)] brightness-105",
    destructive:
      "bg-[linear-gradient(to_left,oklch(0.36_0.21_28)_0%,oklch(0.52_0.21_28)_8%,oklch(0.52_0.21_28)_92%,oklch(0.36_0.21_28)_100%)] dark:bg-[linear-gradient(to_left,oklch(0.26_0.21_28)_0%,oklch(0.42_0.21_28)_8%,oklch(0.42_0.21_28)_92%,oklch(0.26_0.21_28)_100%)] brightness-105",
  };

  const baseGlow = baseGlowMap[tone];
  const midLayer = midLayerMap[tone];


  return (
    <motion.button
      {...(rest as any)}
      disabled={isDisabled}
      type={type ?? "button"}
      role={rest.role ?? "button"}
      className={cn(
        "relative inline-flex select-none border-0 bg-transparent p-0",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      whileHover={!isDisabled ? { filter: "brightness(1.04)" } : undefined}
      transition={{ duration: 0.22, ease: [0.3, 0.7, 0.4, 1] }}
    >
      {/* Bottom jelly shadow */}
      <motion.span
        className={cn("absolute inset-0 rounded-full", baseGlow)}
        initial={{ y: 4 }}
        whileHover={
          !isDisabled
            ? {
                y: 6,
                transition: {
                  duration: 0.24,
                  ease: [0.3, 0.7, 0.4, 1.5],
                },
              }
            : undefined
        }
        whileTap={
          !isDisabled
            ? {
                y: 3,
                transition: { duration: 0.05 },
              }
            : undefined
        }
        aria-hidden="true"
      />

      {/* Mid layer */}
      <span
        className={cn("absolute inset-0 rounded-full", midLayer)}
        aria-hidden="true"
      />

      {/* Front pill */}
      <motion.span
        className={cn(
          "relative block rounded-full font-medium shadow-md w-full",
          "shadow-primary/25",
          frontToneClasses,
          frontSize
        )}
        initial={{ y: -4 }}
        whileHover={
          !isDisabled
            ? {
                y: -6,
                transition: {
                  duration: 0.24,
                  ease: [0.3, 0.7, 0.4, 1.5],
                },
              }
            : undefined
        }
        whileTap={
          !isDisabled
            ? {
                y: -2,
                transition: { duration: 0.05 },
              }
            : undefined
        }
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  jellyTone,
  ...props
}: ButtonProps) {
  const resolvedSize = size ?? "default";

  // If jellyTone is provided → render 3D jelly version in the chosen tone
  if (jellyTone) {
    return (
      <JellyButton
        {...props}
        size={resolvedSize}
        className={className}
        jellyTone={jellyTone}
      />
    );
  }

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size: resolvedSize,
          className,
        })
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
