import type { FocusOption, Project } from "./types";

export const PROJECTS: readonly Project[] = [
  {
    id: "lovibe",
    title: "Lovibe – AI-Powered Code Generation Sandbox",
    subtitle: "Secure AI coding environment with event-driven orchestration",
    description:
      "A full-stack AI platform that turns natural language prompts into executable code inside a sandboxed environment, wired with an event-driven backend for multi-step agent workflows.",
    imageUrl: "/lovibe.png",
    liveUrl: "https://lovibe.vercel.app",
    githubUrl: "https://github.com/Ashwin-Pulipati/lovibe",
    tags: [
      "Full-stack",
      "AI",
      "Code execution",
      "tRPC",
      "Prisma",
      "Neon",
      "Clerk",
    ],
    focus: ["full-stack", "backend-heavy", "frontend-heavy", "devops"],
  },
  {
    id: "optipathway",
    title: "OptiPathway – F-1 Visa Timeline Assistant",
    subtitle: "Guided timelines and calculators for F-1 students",
    description:
      "An interactive resource hub for F-1 students that brings timelines, calculators, and guides into a single, accessible interface with centralized state and clear legal disclaimers.",
    imageUrl: "/optipathway.png",
    liveUrl: "https://optipathway.vercel.app",
    githubUrl: "https://github.com/Ashwin-Pulipati/optipathway",
    tags: ["Frontend", "Next.js", "State management", "Accessibility"],
    focus: ["frontend-heavy", "full-stack"],
  },
  {
    id: "pastella",
    title: "Pastella – AI Vibe-Coded Color Palette Generator",
    subtitle: "Gemini-powered palette generation for brand and UI work",
    description:
      "An AI-native workflow that uses Gemini 2.5 Pro to generate, refine, and stabilize color palettes from vibe-based prompts, enforced through a structured JSON schema.",
    imageUrl: "/pastella.png",
    liveUrl: "https://pastella.vercel.app",
    githubUrl: "https://github.com/Ashwin-Pulipati/pastella",
    tags: ["Frontend", "AI", "Design tooling", "Next.js"],
    focus: ["frontend-heavy"],
  },
  {
    id: "skyerix",
    title: "Skyerix – Full-Stack Weather Dashboard",
    subtitle: "Data-heavy weather insights with maps, charts, and caching",
    description:
      "A responsive, data-intensive weather dashboard powered by React Query, custom hooks, and map visualizations, designed to keep complex server state predictable and fast.",
    imageUrl: "/skyerix.png",
    liveUrl: "https://skyerix.vercel.app",
    githubUrl: "https://github.com/Ashwin-Pulipati/skyerix",
    tags: ["Full-stack", "React Query", "Recharts", "Leaflet"],
    focus: ["full-stack", "frontend-heavy", "backend-heavy"],
  },
  {
    id: "veloria",
    title: "Veloria – 2D Adventure JavaScript Game Engine",
    subtitle: "Custom engine built on HTML5 Canvas for smooth 2D play",
    description:
      "A vanilla JavaScript game engine that drives combat, pathfinding, and animation over HTML5 Canvas with an optimized rendering pipeline tuned for a smooth 60fps experience.",
    imageUrl: "/veloria.png",
    liveUrl: "https://ashwin-pulipati.github.io/veloria",
    githubUrl: "https://github.com/Ashwin-Pulipati/veloria",
    tags: ["Game engine", "Canvas", "JavaScript", "Performance"],
    focus: ["games-web3"],
  },
] as const;

export const FOCUS_OPTIONS: readonly FocusOption[] = [
  {
    value: "all",
    label: "All projects",
    description: "Show a curated mix of full-stack, AI, dashboards, and games.",
  },
  {
    value: "frontend-heavy",
    label: "Frontend-heavy",
    description:
      "Projects where UX, React/Next.js, and client flows do the heavy lifting.",
  },
  {
    value: "backend-heavy",
    label: "Backend-heavy",
    description: "Systems focused on orchestration, APIs, and data handling.",
  },
  {
    value: "full-stack",
    label: "Full-stack",
    description: "End-to-end builds where I owned both frontend and backend.",
  },
  {
    value: "devops",
    label: "DevOps / Data",
    description:
      "Work with pipelines, event-driven flows, or infrastructure concerns.",
  },
  {
    value: "games-web3",
    label: "Games & Web3",
    description:
      "Experimental engines and playful, non-traditional interfaces.",
  },
] as const;
