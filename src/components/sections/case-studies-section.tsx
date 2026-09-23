import React from "react";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CaseStudiesSection() {
  // Show only 2 featured case studies on the home page
  const featuredStudies = caseStudies.slice(0, 2);

  return (
    <section id="case-studies" className="py-14 sm:py-18 border-b border-graphite">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-[11px] font-mono text-ash uppercase tracking-wider mb-1.5">
            SELECTED WORK
          </div>
          <h2 className="text-[24px] sm:text-[28px] font-[510] tracking-[-0.015em] text-paper">
            Problem-Solving Case Studies
          </h2>
          <p className="text-[14px] text-fog mt-1 max-w-xl">
            The problems, decisions, and trade-offs behind my product design work.
          </p>
        </div>

        {/* View All CTA (Header) */}
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-[13px] font-[510] text-mist hover:text-acid-lime transition-colors group shrink-0"
        >
          <span>View all work</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid of exactly 2 Case Studies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {featuredStudies.map((study) => (
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

      {/* View All CTA (Bottom Action Bar) */}
      <div className="flex items-center justify-center pt-2">
        <Button
          href="/work"
          variant="ghost"
          size="md"
          className="w-full sm:w-auto flex items-center justify-center gap-2 group text-[13.5px]"
        >
          <span>View all case studies ({caseStudies.length})</span>
          <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </section>
  );
}
