import React from "react";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Case Studies & Selected Work | Yogesh Raya",
  description:
    "Explore in-depth product design case studies, UX architectures, and shipped solutions by Yogesh Raya.",
};

export default function WorkIndexPage() {
  return (
    <div className="max-w-[920px] mx-auto px-6 pt-10 pb-18 sm:pt-14 sm:pb-22">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[12px] font-mono text-fog hover:text-paper transition-colors mb-6 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Home</span>
      </Link>

      <header className="pb-6 border-b border-graphite mb-8">
        <div className="text-[11px] font-mono text-ash uppercase tracking-wider mb-1.5">
          PORTFOLIO ARCHIVE
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-[510] tracking-[-0.02em] text-paper mb-2">
          Case Studies & Selected Work
        </h1>
        <p className="text-[14px] sm:text-[15px] text-fog leading-[1.6] max-w-xl">
          The problems, decisions, and trade-offs behind my product design work across web and mobile.
        </p>
      </header>

      {/* Grid of all Case Studies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((study) => (
          <Link
            key={study.slug}
            href={`/work/${study.slug}`}
            className="group block h-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mist rounded-[10px]"
          >
            <Card
              variant="showcase"
              className="h-full flex flex-col justify-between border border-graphite hover:border-smoke hover:bg-white/[0.015] transition-all duration-200 p-0 overflow-hidden rounded-[10px]"
            >
              {/* 1. Image */}
              {study.coverImage && (
                <div className="relative w-full aspect-[16/10] border-b border-graphite/80 bg-[#0c0d0e] overflow-hidden">
                  <img
                    src={study.coverImage}
                    alt={study.coverAlt || study.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon/30 via-transparent to-transparent opacity-60" />
                </div>
              )}

              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* 2. Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-[4px] bg-white/[0.04] text-ash border border-white/[0.05] group-hover:border-white/[0.08] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 3. Title */}
                  <h3 className="text-[18px] sm:text-[19px] font-[510] tracking-[-0.015em] text-paper group-hover:text-acid-lime transition-colors mb-2.5 leading-[1.3]">
                    {study.title}
                  </h3>

                  {/* 4. Short Description */}
                  <p className="text-[13.5px] leading-[1.6] text-fog mb-6 line-clamp-3">
                    {study.problem}
                  </p>
                </div>

                {/* 5. CTA: Read Case Study */}
                <div className="pt-3.5 border-t border-graphite/60 flex items-center justify-between text-[13px] font-[510] text-mist group-hover:text-paper transition-colors">
                  <span className="flex items-center gap-1.5">
                    <span>Read case study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:text-acid-lime group-hover:translate-x-1 transition-all" />
                  </span>
                  <span className="text-[11px] font-mono text-ash font-normal">
                    {study.timeline}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
