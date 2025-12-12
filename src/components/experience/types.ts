export type ExperienceTenure = "current" | "past";

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  tenure: ExperienceTenure;
  focus: string;
  stack: string[];
  impactHighlights: string[];
};
