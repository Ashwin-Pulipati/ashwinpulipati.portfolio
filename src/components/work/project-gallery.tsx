"use client";

import { RgbTilt3DCard } from "@/components/ui/rgb-tilt-3d-card";
import type { Project } from "./types";

export function ProjectGallery({
  projects,
}: {
  readonly projects: readonly Project[];
}) {
  return (
    <section
      aria-label="Project gallery"
      aria-describedby="work-intro"
      className="grid gap-8 lg:gap-12 md:grid-cols-2 xl:grid-cols-3"
    >
      {projects.map((project) => (
        <RgbTilt3DCard
          key={project.id}
          title={project.title}
          subtitle={project.subtitle}
          description={project.description}
          imageUrl={project.imageUrl}
          liveUrl={project.liveUrl}
          githubUrl={project.githubUrl}
          tags={project.tags}
        />
      ))}

      {projects.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No projects match this filter yet.
        </p>
      )}
    </section>
  );
}
