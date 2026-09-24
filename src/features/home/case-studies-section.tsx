import Link from "next/link";
import type { WorkSummary } from "@/content/types";
import { ProjectCard } from "@/features/work/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { FigmaIcon } from "@/components/ui/figma-icon";

export function CaseStudiesSection({ studies }: { studies: WorkSummary[] }) {
  const featured = studies.filter((study) => study.featuredOrder !== undefined);
  return (
    <section id="case-studies" className="section" data-figma-node="1351:6215">
      <SectionHeading title="My Work" />
      <div className="project-list">
        {featured.map((study, index) => (
          <ProjectCard study={study} index={index} key={study.slug} compact />
        ))}
      </div>
      {!featured.length && (
        <p className="empty-state">Selected projects will appear here.</p>
      )}
      <Link href="/work" className="button figma-button section-action">
        See All Projects
        <FigmaIcon name="external" />
      </Link>
    </section>
  );
}
