"use client";

import { useMedia } from "react-use";

import { cn } from "@/lib/utils";

import { ExpertiseIntro } from "./expertise-intro";
import { TracksGrid } from "./tracks-grid";
import { ToolsAndCapabilities } from "./tools-and-capabilities";
import { CollaborationNote } from "./collaboration-note";

export default function Expertise() {
  const prefersReducedMotion = useMedia(
    "(prefers-reduced-motion: reduce)",
    false
  );

  return (
    <main
      id="main-content"
      className={cn(
        "space-y-10 md:space-y-12 lg:space-y-14",
        !prefersReducedMotion &&
          "animate-in fade-in slide-in-from-bottom-4 duration-700"
      )}
    >
      <ExpertiseIntro />
      <TracksGrid />
      <ToolsAndCapabilities />
      <CollaborationNote />
    </main>
  );
}
