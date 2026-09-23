export interface CaseStudyMeta {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  problem: string;
  coverImage?: string;
  coverAlt?: string;
  tags: string[];
}

export const caseStudies: CaseStudyMeta[] = [
  {
    slug: "property-management-dashboard",
    title: "Property Management Dashboard",
    role: "Product Designer",
    timeline: "Design & UX Architecture",
    problem:
      "Property managers struggled to track unit maintenance, upcoming lease renewals, and tenant requests across fragmented spreadsheets and legacy portals.",
    coverImage: "/images/case-studies/agent-mesh.svg",
    coverAlt: "Clean dashboard interface prioritizing unit status, tenant tickets, and financial summaries",
    tags: ["Product Design", "Dashboard UX", "Information Architecture"],
  },
  {
    slug: "briz-mobile-workflow",
    title: "Briz — Simplifying Invoicing & Daily Tasks",
    role: "Product Designer · Bytecare Technology",
    timeline: "Product Design & Prototyping",
    problem:
      "Small business owners found multi-item invoicing and transaction tracking on mobile clumsy and slow, leading to billing mistakes and delayed customer payments.",
    coverImage: "/images/case-studies/sync-engine.svg",
    coverAlt: "Mobile user flows showing progressive invoice creation and instant receipt delivery",
    tags: ["Mobile UX", "User Research", "Interaction Design"],
  },
  {
    slug: "sync-engine-crdt",
    title: "Real-Time Collaborative Document Canvas",
    role: "Product Designer",
    timeline: "Interaction Architecture",
    problem:
      "Distributed team members experienced confusing interface states, blocking saving spinners, and lost edits during concurrent collaborative sessions.",
    coverImage: "/images/case-studies/sync-engine.svg",
    coverAlt: "Collaborative editing interface highlighting presence indicators and conflict-free status",
    tags: ["Collaborative UX", "State Feedback", "Product Design"],
  },
];
