import React from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Product Design & UX Thoughts | Yogesh Raya",
  description:
    "Articles and practical thoughts on product design, useful design feedback, and solving the right user problems by Yogesh Raya.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-[760px] mx-auto px-6 pt-10 pb-18 sm:pt-14 sm:pb-22">
      {/* Back to home */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[12px] font-mono text-fog hover:text-acid-lime transition-colors mb-6 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 group-hover:text-acid-lime transition-all" />
        <span>Back to Home</span>
      </Link>

      <header className="pb-6 border-b border-graphite mb-7">
        <h1 className="text-[28px] sm:text-[34px] font-[510] tracking-[-0.02em] text-paper mb-2">
          Product Design & UX Thoughts
        </h1>
        <p className="text-[14px] sm:text-[15px] text-fog leading-[1.6]">
          My thoughts on product design, useful feedback, and solving the right problems.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="p-8 border border-graphite rounded-[8px] bg-carbon text-center">
          <p className="text-[14px] text-fog">Articles coming soon.</p>
        </div>
      ) : (
        <div className="divide-y divide-graphite/60">
          {posts.map((post) => (
            <article key={post.slug} className="py-5 first:pt-0 last:pb-0 group">
              <div className="flex items-center gap-2.5 text-[11px] font-mono text-ash mb-1.5">
                <time dateTime={post.date}>{post.date}</time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>

              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-[17px] sm:text-[19px] font-[510] tracking-[-0.01em] text-paper group-hover:text-acid-lime transition-colors mb-1.5 leading-[1.3]">
                  {post.title}
                </h2>
              </Link>

              <p className="text-[13px] sm:text-[14px] leading-[1.55] text-fog">
                {post.description}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
