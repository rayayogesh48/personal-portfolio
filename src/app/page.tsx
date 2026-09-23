import React from "react";
import { AboutSection } from "@/components/sections/about-section";
import { FrictionInspector } from "@/components/sections/friction-inspector";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { DesignSystemWorkbench } from "@/components/sections/design-system-workbench";
import { ExperienceSection } from "@/components/sections/experience-section";
import { LatestBlogSection } from "@/components/sections/latest-blog-section";
import { getAllPosts } from "@/lib/content";

export const metadata = {
  title: "Yogesh Raya | Product Designer in Nepal",
  description:
    "Explore Yogesh Raya’s product design portfolio: UX case studies, client projects, website designs, and practical thoughts on solving user problems.",
};

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-[920px] mx-auto px-6">
      {/* 1. About Me */}
      <AboutSection />

      {/* 2. Interactive UX Experiment: Friction Inspector */}
      <FrictionInspector />

      {/* 3. Problem-Solving Case Studies */}
      <CaseStudiesSection />

      {/* 4. Interactive Micro-Workbench: Token & State Lab */}
      <DesignSystemWorkbench />

      {/* 5. Experience */}
      <ExperienceSection />

      {/* 6. Latest Blog Posts */}
      <LatestBlogSection posts={posts} />
    </div>
  );
}
