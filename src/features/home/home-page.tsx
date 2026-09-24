import { AboutSection, ProfileHero } from "./hero-and-about";
import { CaseStudiesSection } from "./case-studies-section";
import { ExperienceSection } from "./experience-section";
import { LatestBlogSection } from "./latest-blog-section";
import { StrengthsSection } from "./strengths-section";
import { CraftSection } from "./craft-section";
import type { BlogSummary, CraftSummary, WorkSummary } from "@/content/types";

export function HomePage({ work, craft, posts }: { work: WorkSummary[]; craft: CraftSummary[]; posts: BlogSummary[] }) {
  return (
    <div className="page-width figma-home">
      <ProfileHero />
      <CaseStudiesSection studies={work} />
      <ExperienceSection />
      <StrengthsSection />
      <AboutSection />
      <CraftSection items={craft} />
      <LatestBlogSection posts={posts} />
    </div>
  );
}
