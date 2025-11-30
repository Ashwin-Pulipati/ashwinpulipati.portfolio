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
          "bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground shadow-md hover:opacity-95 hover:shadow-lg active:scale-[0.985]",

        soft: "surface-soft text-foreground hover:shadow-md active:shadow-sm",

        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/40",

        outline:
          "border border-border bg-background/80 text-foreground shadow-xs hover:bg-muted/80 dark:bg-background/60",

        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",

        ghost:
          "bg-transparent text-foreground/80 hover:bg-muted/60 hover:text-foreground",

        link: "text-primary underline-offset-4 hover:underline hover:text-primary/90 shadow-none px-0",

        jelly: "relative inline-flex rounded-full",
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

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
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

type JellyButtonProps = Omit<ButtonProps, "variant" | "asChild">;

function JellyButton({
  children,
  size = "default",
  className,
  disabled,
  type,
  ...rest
}: JellyButtonProps) {
  const sizeKey = (size ?? "default") as ButtonSize;
  const frontSize = jellySizeClasses[sizeKey] ?? jellySizeClasses.default;
  const isDisabled = !!disabled;

  return (
    <motion.button
      {...(rest as any)}
      disabled={isDisabled}
      type={type ?? "button"}
      role={rest.role ?? "button"}
      className={cn(
        "relative inline-flex  select-none border-0 bg-transparent p-0",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      whileHover={!isDisabled ? { filter: "brightness(1.04)" } : undefined}
      transition={{ duration: 0.22, ease: [0.3, 0.7, 0.4, 1.0] }}
    >
      <motion.span
        className="
          absolute inset-0 rounded-full
          bg-primary/40
        "
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

      <span
        className="
          absolute inset-0 rounded-full
          bg-gradient-to-b from-primary via-primary/90 to-primary/80
        "
        aria-hidden="true"
      />

      <motion.span
        className={cn(
          "relative block rounded-full font-medium text-primary-foreground",
          "bg-gradient-to-tr from-primary via-secondary to-accent",
          "shadow-md shadow-primary/30",
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
  ...props
}: ButtonProps) {
  const resolvedSize = size ?? "default";

  if (variant === "jelly") {
    return <JellyButton {...props} size={resolvedSize} className={className} />;
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
