"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import VanillaTilt from "vanilla-tilt";

type RgbTiltCardProps = {
  title: string;
  description: string;
  subtitle?: string;
  imageUrl?: string;
  tags?: string[];
  className?: string;
};

export function RgbTilt3DCard({
  title,
  description,
  subtitle,
  imageUrl,
  tags,
  className,
}: RgbTiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!cardRef.current) return;

    const node = cardRef.current;

    VanillaTilt.init(node, {
      max: 15,
      speed: 400,
      glare: true,
      reverse: true,
      "max-glare": 0.2,
      perspective: 1000,
      scale: 1.02,
      transition: true,
    } as any);

    return () => {
      if (node.vanillaTilt) {
        node.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <article
      ref={cardRef}
      data-tilt
      className={cn("rgb-card rgb-border h-fit", "select-none", className)}
      style={{
        backgroundColor: "var(--card)",
        color: "var(--card-foreground)",
        borderRadius: "var(--rgb-card-border-radius)",
      }}
      aria-label={title}
    >
      <div
        className={cn(
          "rgb-card-image",
          "bg-gradient-to-br from-primary/90 via-secondary/80 to-accent/80"
        )}
        style={
          imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      />

      <div className="rgb-card-description">
        <h3 className="rgb-card-title text-lg font-semibold text-primary">
          {title}
        </h3>

        {subtitle && (
          <p className="mb-1 text-xs md:text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}

        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="mt-3 mb-6 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 bg-muted/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
