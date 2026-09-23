import React from "react";
import { aboutData } from "@/data/about";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-14 sm:py-18 border-b border-graphite">
      <div className="max-w-[720px]">
        {/* Role & Category */}
        <div className="text-[12px] font-mono text-ash uppercase tracking-wider mb-3">
          {aboutData.name} · {aboutData.role}
        </div>

        {/* H1 Headline from brief */}
        <h1 className="text-[32px] sm:text-[40px] md:text-[44px] font-[510] leading-[1.1] tracking-[-0.022em] text-paper mb-5">
          {aboutData.headline}
        </h1>

        {/* Short introduction */}
        <p className="text-[16px] sm:text-[18px] leading-[1.6] text-mist font-normal mb-4">
          {aboutData.intro}
        </p>

        {/* Approach to design & development */}
        <p className="text-[14px] sm:text-[15px] leading-[1.65] text-fog font-normal mb-7">
          {aboutData.approach}
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Button href="#case-studies" variant="acid" size="md" className="flex items-center gap-2">
            <span>View Case Studies</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </Button>

          <Button href={`mailto:${aboutData.email}`} variant="ghost" size="md" className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-ash" />
            <span>Have a problem to solve? Let’s talk</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
