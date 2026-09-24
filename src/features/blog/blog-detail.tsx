import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/markdown/markdown";
import { formatDate } from "@/features/blog/article-list";
import type { BlogEntry } from "@/content/types";

export function BlogDetail({ post }: { post: BlogEntry }) {
  return (
    <article className="page-width subpage">
      <Link href="/blog" className="text-link back-link">
        <ArrowLeft size={15} />
        Back to Blog
      </Link>
      <header className="page-heading article-heading">
        <div className="article-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime}</span>
        </div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <Link href="/about" className="author-link">
          <span className="author-avatar" aria-hidden="true">
            yr.
          </span>
          Yogesh Raya<span className="muted">Product Designer</span>
        </Link>
        {post.cover && (
          <img
            className="article-cover"
            src={post.cover}
            alt={post.coverAlt || post.title}
            width={800}
            height={400}
          />
        )}
      </header>
      <MarkdownContent content={post.content} />
      <div className="article-footer">
        <Link href="/blog" className="text-link">
          <ArrowLeft size={15} />
          Back to Blog
        </Link>
        <Link href="/work" className="text-link">
          Explore my work
        </Link>
      </div>
    </article>
  );
}
