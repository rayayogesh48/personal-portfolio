import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { MarkdownContent } from "@/components/markdown-content";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | Yogesh Raya`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-[760px] mx-auto px-6 pt-10 pb-18 sm:pt-14 sm:pb-22">
      {/* Back to Blog link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-[12px] font-mono text-fog hover:text-acid-lime transition-colors mb-6 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 group-hover:text-acid-lime transition-all" />
        <span>Back to Blog</span>
      </Link>

      {/* Header */}
      <header className="pb-6 border-b border-graphite mb-7">
        <div className="flex items-center gap-2.5 text-[11px] font-mono text-ash mb-3">
          <time dateTime={post.date}>{post.date}</time>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="text-[28px] sm:text-[34px] md:text-[38px] font-[510] tracking-[-0.02em] text-paper leading-[1.12] mb-3">
          {post.title}
        </h1>

        <p className="text-[15px] sm:text-[16px] text-fog leading-[1.6] font-normal">
          {post.description}
        </p>

        {/* Optional Cover Image */}
        {post.cover && (
          <div className="mt-6 rounded-[8px] overflow-hidden border border-graphite bg-[#0c0d0e]">
            <img
              src={post.cover}
              alt={post.coverAlt || post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </header>

      {/* Readable Markdown Body */}
      <div className="w-full">
        <MarkdownContent content={post.content} />
      </div>

      {/* Footer Navigation */}
      <div className="mt-12 pt-6 border-t border-graphite flex items-center justify-between text-[13px]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-mist hover:text-acid-lime transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to all articles</span>
        </Link>
        <Link
          href="/"
          className="text-fog hover:text-acid-lime transition-colors"
        >
          Home
        </Link>
      </div>
    </article>
  );
}
