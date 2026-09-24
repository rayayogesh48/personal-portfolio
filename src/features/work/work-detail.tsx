import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/markdown/markdown";
import { ProjectGallery } from "@/components/media/image-gallery.client";
import type { WorkEntry } from "@/content/types";

export function WorkDetail({ study }: { study: WorkEntry }) {
  const images =
    study.gallery ?? (study.cover ? [study.cover] : []);
  return (
    <article className="page-width subpage">
      <Link href="/work" className="text-link back-link">
        <ArrowLeft size={15} />
        Back to Work
      </Link>
      <header className="page-heading article-heading">
        <span className="eyebrow">
          {study.kind === "showcase" ? "Project showcase" : "Case study"}
        </span>
        <h1>{study.title}</h1>
        <p>{study.summary}</p>
        <div className="detail-metadata">
          <div>
            <span className="eyebrow">Role</span>
            {study.role}
          </div>
          <div>
            <span className="eyebrow">Focus</span>
            {study.timeline}
          </div>
        </div>
        {images.length > 0 && (
          <ProjectGallery images={images} title={study.title} />
        )}
      </header>
      <MarkdownContent content={study.content.replace(/^#\s+[^\n]+\n/, "")} />
      <div className="article-footer">
        <Link href="/work" className="text-link">
          <ArrowLeft size={15} />
          Back to Work
        </Link>
        <Link href="/blog" className="text-link">
          Explore my writing
        </Link>
      </div>
    </article>
  );
}
