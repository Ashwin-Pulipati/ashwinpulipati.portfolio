import { Briefcase, Clock, MapPin, Users } from "lucide-react";
import type { OpportunityOption, QuickFact } from "./types";

export const OPPORTUNITY_OPTIONS: readonly OpportunityOption[] = [
  { id: "full-time", label: "Full-time" },
  { id: "internship", label: "Internships" },
  { id: "contract", label: "Contract" },
  { id: "open", label: "Open to discuss" },
] as const;

export const QUICK_FACTS: readonly QuickFact[] = [
  {
    label: "Location",
    value: "USA · Open to relocation and remote",
    icon: MapPin,
  },
  { label: "Time zone", value: "US Eastern · Flexible overlap", icon: Clock },
  {
    label: "Collaboration",
    value: "Engineering teams, design-driven orgs",
    icon: Users,
  },
  {
    label: "Focus",
    value: "Web, data, and cloud engineering",
    icon: Briefcase,
  },
] as const;

export const EMAIL = "ashwinpulipati@gmail.com";
