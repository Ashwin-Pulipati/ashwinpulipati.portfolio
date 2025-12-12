"use client";

import { Badge } from "@/components/ui/badge";

type HeroTagsProps = {
  tags: readonly string[];
};

export const HeroTags = ({ tags }: HeroTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2 pt-1 text-xs text-muted-foreground">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="border-border/70 bg-card/80 px-3 py-1 font-normal"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};
