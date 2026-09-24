import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogSummary } from "@/content/types";

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function ArticleList({ posts }: { posts: BlogSummary[] }) {
  return (
    <div className="article-list">
      {posts.map((post) => (
        <article key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="article-link">
            <div className="article-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.readingTime}</span>
            </div>
            <div className="article-title">
              <h2>{post.title}</h2>
              <ArrowUpRight size={18} aria-hidden="true" />
            </div>
            <p>{post.description}</p>
          </Link>
        </article>
      ))}
      {!posts.length && <p className="empty-state">Articles coming soon.</p>}
    </div>
  );
}
