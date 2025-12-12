"use client";

import { EXPERTISE_TRACKS } from "./constants";
import { TrackCard } from "./track-card";

export function TracksGrid() {
  return (
    <section
      aria-label="Core tracks of expertise"
      className="space-y-4 md:space-y-5"
    >
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {EXPERTISE_TRACKS.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </section>
  );
}
