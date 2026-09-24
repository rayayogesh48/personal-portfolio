import { ProjectCard } from "./project-card";
import type { WorkSummary } from "@/content/types";

export function WorkCollection({ publishedStudies }: { publishedStudies: WorkSummary[] }) {
  return (
    <div className="page-width subpage">
      <header className="page-heading">
        <span className="eyebrow">Problems, decisions & details</span>
        <h1>
          My Work
          <span className="heading-count">
            {String(publishedStudies.length).padStart(2, "0")}
          </span>
        </h1>
        <p>
          Selected client projects and website designs, with a focus on clarity,
          usability, and visual craft.
        </p>
      </header>
      <div className="project-list">
        {publishedStudies.map((study, index) => (
          <ProjectCard key={study.slug} study={study} index={index} />
        ))}
      </div>
      {!publishedStudies.length && (
        <p className="empty-state">Selected projects will appear here.</p>
      )}
    </div>
  );
}
