import React from "react";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-14 sm:py-18 border-b border-graphite">
      {/* Section Header */}
      <div className="mb-7">
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

      {/* Grid of up to 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {caseStudies.map((study) => (
          <Card
            key={study.slug}
            variant="showcase"
            className="flex flex-col justify-between border border-graphite hover:border-smoke transition-all duration-150 p-0 overflow-hidden"
          >
            {/* Visual Cover / Wireframe Diagram */}
            {study.coverImage && (
              <div className="relative w-full aspect-[16/9] border-b border-graphite bg-[#0c0d0e] overflow-hidden">
                <img
                  src={study.coverImage}
                  alt={study.coverAlt || study.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                {/* Role & Timeline */}
                <div className="flex items-center justify-between text-[11px] font-mono text-ash mb-2">
                  <span>{study.role}</span>
                  <span>{study.timeline}</span>
                </div>

                {/* Project Title */}
                <h3 className="text-[17px] sm:text-[18px] font-[510] tracking-[-0.01em] text-paper mb-2 leading-[1.3]">
                  {study.title}
                </h3>

                {/* Short Problem Statement */}
                <p className="text-[13px] leading-[1.55] text-fog mb-5">
                  {study.problem}
                </p>
              </div>

              {/* Read Case Study Link & Tags */}
              <div className="pt-3.5 border-t border-graphite/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-[4px] bg-white/[0.03] text-ash border border-white/[0.04]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/work/${study.slug}`}
                  className="inline-flex items-center gap-1 text-[12px] font-[510] text-mist hover:text-paper transition-colors group ml-2"
                >
                  <span>Read Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ash group-hover:text-paper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
