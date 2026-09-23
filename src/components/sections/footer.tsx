import React from "react";
import Link from "next/link";
import { aboutData } from "@/data/about";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-graphite py-8 bg-void">
      <div className="max-w-[920px] mx-auto px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-fog">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2">
            <span className="text-paper font-[510]">{aboutData.name}</span>
            <span className="text-ash">•</span>
            <span className="text-ash">{aboutData.role}</span>
          </div>
          <span className="hidden sm:inline text-ash">•</span>
          <span className="text-fog">Have a product problem worth solving? Let’s talk.</span>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            href={`mailto:${aboutData.email}`}
            className="text-mist hover:text-paper transition-colors inline-flex items-center gap-1"
          >
            <span>{aboutData.email}</span>
            <ArrowUpRight className="w-3 h-3 text-ash" />
          </Link>
          {aboutData.socials.linkedin && (
            <a
              href={aboutData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fog hover:text-paper transition-colors inline-flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-ash" />
            </a>
          )}
          {aboutData.socials.github && (
            <a
              href={aboutData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fog hover:text-paper transition-colors inline-flex items-center gap-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-ash" />
            </a>
          )}
          {aboutData.socials.twitter && (
            <a
              href={aboutData.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fog hover:text-paper transition-colors inline-flex items-center gap-1"
            >
              <span>X</span>
              <ArrowUpRight className="w-3 h-3 text-ash" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
