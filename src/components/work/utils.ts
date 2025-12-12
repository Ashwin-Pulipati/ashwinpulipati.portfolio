import { FOCUS_OPTIONS } from "./constants";
import type { ProjectFocus } from "./types";

export function normalizeFocusParam(value: string | null): ProjectFocus {
  const allowedValues = FOCUS_OPTIONS.map((o) => o.value);
  if (value && allowedValues.includes(value as ProjectFocus))
    return value as ProjectFocus;
  return "all";
}
