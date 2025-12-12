"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useMedia } from "react-use";

import { cn } from "@/lib/utils";

import { PROJECTS, FOCUS_OPTIONS } from "./constants";
import type { ProjectFocus } from "./types";
import { normalizeFocusParam } from "./utils";
import { WorkHeader } from "./work-header";
import { FocusFilter } from "./focus-filter";
import { ProjectGallery } from "./project-gallery";

export default function Work() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const focus = normalizeFocusParam(searchParams.get("focus"));

  const activeFocusConfig = useMemo(
    () => FOCUS_OPTIONS.find((o) => o.value === focus) ?? FOCUS_OPTIONS[0],
    [focus]
  );

  const filteredProjects = useMemo(() => {
    if (focus === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.focus.includes(focus));
  }, [focus]);

  const handleFocusChange = (next: ProjectFocus) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") params.delete("focus");
    else params.set("focus", next);

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(nextUrl, { scroll: false });
  };

  const totalProjects = PROJECTS.length;
  const visibleCount = filteredProjects.length;

  const prefersReducedMotion = useMedia(
    "(prefers-reduced-motion: reduce)",
    false
  );

  return (
    <main
      id="main-content"
      className={cn(
        "space-y-8 md:space-y-10 lg:space-y-12",
        !prefersReducedMotion &&
          "animate-in fade-in slide-in-from-bottom-4 duration-700"
      )}
      aria-labelledby="work-heading"
    >
      <section className="space-y-4 md:space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <WorkHeader />
          <FocusFilter
            focus={focus}
            activeFocusConfig={activeFocusConfig}
            onChange={handleFocusChange}
          />
        </div>

        <p
          className="text-xs text-muted-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          Showing {visibleCount} of {totalProjects} projects
          {focus !== "all" ? ` for “${activeFocusConfig.label}”.` : "."}
        </p>
      </section>

      <ProjectGallery projects={filteredProjects} />
    </main>
  );
}
