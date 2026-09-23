import React from "react";
import Link from "next/link";
import { experiences } from "@/data/experience";
import { ArrowUpRight } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-14 sm:py-18 border-b border-graphite">
      {/* Section Header */}
      <div className="mb-7">
        <div className="text-[11px] font-mono text-ash uppercase tracking-wider mb-1.5">
          CAREER HISTORY
        </div>
        <h2 className="text-[24px] sm:text-[28px] font-[510] tracking-[-0.015em] text-paper">
          Experience
        </h2>
        <p className="text-[14px] text-fog mt-1 max-w-xl">
          Where I’ve contributed and the product challenges I’ve worked on.
        </p>
      </div>

      {/* Chronological list, latest first */}
      <div className="divide-y divide-graphite/60">
        {experiences.map((exp, index) => (
          <div key={index} className="py-5 first:pt-0 last:pb-0 group">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
              <div className="flex items-baseline gap-2">
                <h3 className="text-[16px] sm:text-[17px] font-[510] text-paper group-hover:text-acid-lime transition-colors">
                  {exp.role}
                </h3>
                <span className="text-ash font-normal text-[13px]">at</span>
                <span className="text-mist font-medium text-[15px]">{exp.company}</span>
              </div>
              <div className="text-[12px] font-mono text-ash">
                {exp.period}
              </div>
            </div>

            {/* Responsibilities / contributions */}
            <div className="space-y-1 max-w-2xl">
              {exp.contributions.map((c, i) => (
                <p key={i} className="text-[13px] sm:text-[14px] leading-[1.55] text-fog">
                  {c}
                </p>
              ))}
            </div>

            {/* Link to relevant case study */}
            {exp.caseStudySlug && (
              <div className="mt-2.5">
                <Link
                  href={`/work/${exp.caseStudySlug}`}
                  className="inline-flex items-center gap-1 text-[12px] font-mono text-mist hover:text-acid-lime transition-colors group/link"
                >
                  <span>↳ View related case study</span>
                  <ArrowUpRight className="w-3 h-3 text-ash group-hover/link:text-acid-lime group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
