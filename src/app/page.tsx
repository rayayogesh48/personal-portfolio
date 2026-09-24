import React from "react";
import { AboutSection } from "@/components/sections/about-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
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

      {/* 2. Problem-Solving Case Studies */}
      <CaseStudiesSection />

      {/* 3. Experience */}
      <ExperienceSection />

      {/* 4. Latest Blog Posts */}
      <LatestBlogSection posts={posts} />
    </div>
  );
}
