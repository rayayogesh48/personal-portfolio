import Link from "next/link";
import type { BlogSummary } from "@/content/types";
import { ArticleList } from "@/features/blog/article-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/portfolio-motion.client";
import { FigmaIcon } from "@/components/ui/figma-icon";

export function LatestBlogSection({ posts }: { posts: BlogSummary[] }) {
  return (
    <section id="blog" className="section">
      <Reveal>
        <SectionHeading title="Writing" />
        <ArticleList posts={posts.slice(0, 3)} />
        <Link href="/blog" className="button figma-button section-action">
          All Articles
          <FigmaIcon name="external" />
        </Link>
      </Reveal>
    </section>
  );
}
