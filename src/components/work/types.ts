export type ProjectFocus =
  | "all"
  | "frontend-heavy"
  | "backend-heavy"
  | "full-stack"
  | "devops"
  | "games-web3";

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[];
  focus: ProjectFocus[];
};

export type FocusOption = {
  value: ProjectFocus;
  label: string;
  description: string;
};
