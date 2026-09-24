import { ArticleList } from "./article-list";
import type { BlogSummary } from "@/content/types";

export function BlogCollection({ posts }: { posts: BlogSummary[] }) {
  return (
    <div className="page-width subpage">
      <header className="page-heading">
        <span className="eyebrow">Notes from the process</span>
        <h1>Writing</h1>
        <p>
          My thoughts on product design, useful feedback, and solving the right
          problems.
        </p>
      </header>
      <ArticleList posts={posts} />
    </div>
  );
}
