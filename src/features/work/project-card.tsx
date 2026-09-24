import Link from "next/link";
import type { WorkSummary } from "@/content/types";
import { ProjectGallery } from "@/components/media/image-gallery.client";
import { Reveal } from "@/components/motion/portfolio-motion.client";
import { FigmaIcon } from "@/components/ui/figma-icon";
import styles from "./project-card.module.css";

export function ProjectCard({
  study,
  index = 0,
  compact = false,
}: {
  study: WorkSummary;
  index?: number;
  compact?: boolean;
}) {
  const images = study.gallery ?? (study.cover ? [study.cover] : []);
  const href = `/work/${study.slug}`;

  return (
    <Reveal>
      <article
        className={`project-card ${styles.card} ${compact ? "project-card-figma" : ""}`}
        data-figma-node="1352:6701"
      >
        {images.length ? (
          <ProjectGallery images={images} title={study.title} variant="figma" />
        ) : (
          <div className={`project-title-cover ${styles.fallback}`} aria-hidden="true">
            <span className={styles.fallbackTop}>Selected project / {String(index + 1).padStart(2, "0")}</span>
            <span className={styles.fallbackTitle}>{study.title.split(" — ")[0]}</span>
            <span className={styles.fallbackTag}>{study.tags[0]}</span>
          </div>
        )}
        <div className={`project-description ${styles.footer}`}>
          <div className={`project-title ${styles.titleRow}`}>
            <h3><Link href={href}>{study.title}</Link></h3>
            <Link href={href} className={styles.linkIcon} aria-label={`View ${study.title} case study`}>
              <FigmaIcon name="caseStudyLink" />
            </Link>
          </div>
          <p className={styles.summary}>{study.summary}</p>
        </div>
      </article>
    </Reveal>
  );
}
