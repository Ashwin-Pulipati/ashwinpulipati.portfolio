import type { ExperienceItem } from "./types";

export const EXPERIENCE_ITEMS: readonly ExperienceItem[] = [
  {
    id: "lean-se",
    company: "Lean Innovation Labs",
    role: "Software Engineer",
    period: "Oct 2024 — Present",
    location: "USA · Remote-first",
    tenure: "current",
    focus:
      "Building production-grade features for AI-heavy products with a strong focus on UX stability and delivery speed.",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "Ant Design", "CI/CD"],
    impactHighlights: [
      "Shipped usability features like resizable panels and fast reset actions that reduced task-related clicks and smoothed daily workflows.",
      "Eliminated critical UI/UX issues by customizing design-system components instead of rewriting them, improving stability in production.",
      "Replaced manual Excel workflows by rapidly shipping targeted tools that saved hours of repetitive work per week.",
    ],
  },
  {
    id: "phygtl-pm",
    company: "Phygtl",
    role: "Product Manager Intern",
    period: "Feb 2025 — Mar 2025",
    location: "USA · Student-focused product",
    tenure: "past",
    focus:
      "Discovering UX friction, structuring feedback from thousands of users, and turning it into precise, high-impact changes.",
    stack: ["UX research", "Surveys", "SSO onboarding", "Analytics"],
    impactHighlights: [
      "Ran UX surveys and analyzed responses from thousands of users to pinpoint validation and tooltip issues that created unnecessary support load.",
      "Shadowed onboarding sessions to map real friction points in SSO setup, then drove changes that improved activation speed.",
      "Reframed navigation and “getting started” flows so new users had a clearer first-run experience and lower drop-off.",
    ],
  },
  {
    id: "js-associates",
    company: "JS Associates",
    role: "Full-Stack Web Developer",
    period: "May 2020 — May 2022",
    location: "India · Client projects",
    tenure: "past",
    focus:
      "Owning end-to-end feature work across React frontends and Node backends for revenue-critical flows and internal tooling.",
    stack: ["React", "Node.js", "REST APIs", "SQL", "GitHub Actions"],
    impactHighlights: [
      "Owned the development of a new e-commerce checkout flow, tuning both frontend and backend to cut page load time and friction.",
      "Built and rolled out a shared React component library that sped up feature delivery and made UI behavior more predictable.",
      "Helped stabilize production systems by resolving Node.js deadlocks and adding a reliable E2E testing layer around critical flows.",
    ],
  },
  {
    id: "rowan-ms",
    company: "Rowan University",
    role: "M.S. Computer Science",
    period: "Aug 2022 — May 2024",
    location: "Glassboro, NJ · Graduate program",
    tenure: "past",
    focus:
      "Deepening fundamentals in algorithms, systems, and data, while turning coursework projects into production-minded builds.",
    stack: ["Algorithms", "Databases", "Distributed systems", "Python", "SQL"],
    impactHighlights: [
      "Used academic projects as a playground for real architectures rather than throwaway demos, focusing on maintainability and observability.",
      "Explored full-stack patterns that now show up in portfolio work, from dashboards and AI tools to data-heavy backends.",
      "Collaborated with peers from varied backgrounds, mirroring the cross-functional dynamics of real engineering teams.",
    ],
  },
] as const;
