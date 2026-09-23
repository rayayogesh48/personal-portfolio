import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

interface LatestBlogSectionProps {
  posts: BlogPost[];
}

export function LatestBlogSection({ posts }: LatestBlogSectionProps) {
  const latestPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="py-14 sm:py-18">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
        <div>
          <div className="text-[11px] font-mono text-ash uppercase tracking-wider mb-1.5">
            WRITING & NOTES
          </div>
          <h2 className="text-[24px] sm:text-[28px] font-[510] tracking-[-0.015em] text-paper">
            Latest Articles
          </h2>
          <p className="text-[14px] text-fog mt-1 max-w-xl">
            My thoughts on product design, useful feedback, and solving the right problems.
          </p>
        </div>

        {posts.length > 0 && (
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-[12px] font-[510] text-mist hover:text-paper transition-colors group shrink-0"
          >
            <span>View All Posts</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ash group-hover:text-paper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        )}
      </div>

      {latestPosts.length === 0 ? (
        <div className="p-8 border border-graphite rounded-[8px] bg-carbon text-center">
          <p className="text-[14px] text-fog">Articles coming soon.</p>
        </div>
      ) : (
        <div className="divide-y divide-graphite/60">
          {latestPosts.map((post) => (
            <article key={post.slug} className="py-5 first:pt-0 last:pb-0 group">
              <div className="flex items-center gap-2.5 text-[11px] font-mono text-ash mb-1.5">
                <time dateTime={post.date}>{post.date}</time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>

              <Link href={`/blog/${post.slug}`} className="block">
                <h3 className="text-[17px] sm:text-[18px] font-[510] tracking-[-0.01em] text-paper group-hover:text-mist transition-colors mb-1.5 leading-[1.3]">
                  {post.title}
                </h3>
              </Link>

              <p className="text-[13px] sm:text-[14px] leading-[1.55] text-fog max-w-2xl">
                {post.description}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
