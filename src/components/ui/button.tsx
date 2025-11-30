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
          "bg-linear-to-br from-primary via-secondary to-accent text-primary-foreground shadow-md hover:opacity-95 hover:shadow-lg active:scale-[0.985]",

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
    /**
     * If set, renders this button in 3D “jelly” style,
     * with color palette based on the provided tone.
     */
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
  primary:
    "bg-linear-to-tr from-primary via-secondary to-accent text-primary-foreground",
  gradient:
    "bg-linear-to-tr from-primary via-secondary to-accent text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  ghost: "bg-background text-foreground border border-border/70 shadow-sm",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  outline: "bg-background text-foreground border border-border/70",
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

  const baseGlow =
    tone === "ghost" || tone === "outline"
      ? "bg-primary/20"
      : tone === "accent"
      ? "bg-accent/25"
      : "bg-primary/35";

  const midLayer =
    tone === "ghost" || tone === "outline"
      ? "bg-background"
      : tone === "accent"
      ? "bg-accent"
      : "bg-linear-to-b from-primary via-primary/90 to-primary/80";

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
      transition={{ duration: 0.22, ease: [0.3, 0.7, 0.4, 1.0] }}
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
          "relative block rounded-full font-medium shadow-md",
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
