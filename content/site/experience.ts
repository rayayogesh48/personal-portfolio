export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  contributions: string[];
  caseStudySlug?: string;
}

export const experiences: ExperienceItem[] = [
  {
    company: "Bytecare Technology",
    role: "Product Designer",
    period: "2023 — Present",
    location: "Nepal",
    contributions: [
      "Leading product design for mobile and web applications, including business accounting, fleet tracking, and operations dashboards.",
      "Transforming complex multi-step data entry tasks into intuitive, progressive user flows that reduce onboarding friction.",
    ],
    caseStudySlug: "briz-mobile-workflow",
  },
  {
    company: "Design & Product Consulting",
    role: "Product & UI Designer",
    period: "2021 — 2023",
    location: "Remote",
    contributions: [
      "Partnered with startups and small teams to design responsive web dashboards, property management tools, and client websites.",
      "Established scalable design tokens, component libraries, and interactive prototypes for developer handoff.",
    ],
    caseStudySlug: "property-management-dashboard",
  },
  {
    company: "Digital Product Studio",
    role: "UI/UX Designer",
    period: "2019 — 2021",
    location: "Nepal",
    contributions: [
      "Designed user flows, wireframes, and design specs for client web platforms, focusing on clear hierarchy and readability.",
      "Conducted user testing sessions to identify friction in navigation and simplify key conversion actions.",
    ],
  },
];
