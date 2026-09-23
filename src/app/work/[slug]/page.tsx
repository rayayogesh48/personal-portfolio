import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import { getCaseStudyContent } from "@/lib/content";
import { MarkdownContent } from "@/components/markdown-content";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${study.title} | Yogesh Raya`,
    description: study.problem,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  const studyContent = getCaseStudyContent(slug);

  if (!study || !studyContent) {
    notFound();
  }

  return (
    <article className="max-w-[760px] mx-auto px-6 pt-10 pb-18 sm:pt-14 sm:pb-22">
      {/* Back to Case Studies link */}
      <Link
        href="/#case-studies"
        className="inline-flex items-center gap-1.5 text-[12px] font-mono text-fog hover:text-acid-lime transition-colors mb-6 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 group-hover:text-acid-lime transition-all" />
        <span>Back to Case Studies</span>
      </Link>

      {/* Case Study Header */}
      <header className="pb-6 border-b border-graphite mb-7">
        <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono text-ash mb-3">
          <span>{study.role}</span>
          <span>•</span>
          <span>{study.timeline}</span>
        </div>

        <h1 className="text-[28px] sm:text-[34px] md:text-[38px] font-[510] tracking-[-0.02em] text-paper leading-[1.12] mb-4">
          {study.title}
        </h1>

        <div className="p-4 rounded-[8px] bg-carbon border border-graphite mb-6">
          <div className="text-[11px] font-mono text-ash uppercase tracking-wider mb-1">
            Core Problem
          </div>
          <p className="text-[14px] sm:text-[15px] text-mist leading-[1.6]">
            {study.problem}
          </p>
        </div>

        {/* Cover illustration / architecture screenshot */}
        {study.coverImage && (
          <div className="rounded-[8px] overflow-hidden border border-graphite bg-[#0c0d0e]">
            <img
              src={study.coverImage}
              alt={study.coverAlt || study.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </header>

      {/* Full Problem-Solving Story */}
      <div className="w-full">
        <MarkdownContent content={studyContent.content} />
      </div>

      {/* Footer Navigation */}
      <div className="mt-12 pt-6 border-t border-graphite flex items-center justify-between text-[13px]">
        <Link
          href="/#case-studies"
          className="inline-flex items-center gap-1.5 text-mist hover:text-acid-lime transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Case Studies</span>
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
