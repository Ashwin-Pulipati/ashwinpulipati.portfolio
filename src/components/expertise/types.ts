export type TrackId = "product-frontend" | "backend-apis" | "platform-devops";

export type ExpertiseTrack = {
  id: TrackId;
  label: string;
  subtitle: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  outcomes: string[];
  stack: string[];
};
