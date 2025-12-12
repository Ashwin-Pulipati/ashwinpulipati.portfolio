"use client";

import { CAPABILITY_ROWS, TOOL_GROUPS } from "./constants";
import { CapabilityCard } from "./capability-card";
import { ToolGroup } from "./tool-group";

export function ToolsAndCapabilities() {
  return (
    <section
      aria-label="Tools and capabilities"
      className="space-y-8 md:space-y-10"
    >
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Tooling I’m comfortable owning
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TOOL_GROUPS.map((group) => (
            <ToolGroup
              key={group.label}
              label={group.label}
              items={group.items}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          How that expertise shows up on teams
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITY_ROWS.map((row) => (
            <CapabilityCard
              key={row.title}
              title={row.title}
              items={row.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
