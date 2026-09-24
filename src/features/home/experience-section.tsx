import Link from "next/link";
import { experiences } from "@site/experience";
import { Disclosure } from "@/components/ui/disclosure.client";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/portfolio-motion.client";
import { FigmaIcon } from "@/components/ui/figma-icon";

export function ExperienceSection() {
  return (
    <section id="experience" className="section" data-figma-node="1351:6339">
      <Reveal>
        <SectionHeading title="Experience" />
        <div className="experience-list">
          {experiences.map((item) => (
            <Disclosure
              key={item.company}
              indicator={<FigmaIcon name="chevron" />}
              title={
                <span className="experience-title">
                  <span className="company-mark" aria-hidden="true">
                    {item.company.charAt(0)}
                  </span>
                  <span className="experience-copy">
                    <span className="experience-role">
                      <strong>{item.company}</strong>
                      <span className="small muted">– {item.role}</span>
                    </span>
                    <span className="experience-meta">
                      <span>{item.period}</span>
                      {item.location && (
                        <>
                          <span
                            aria-hidden="true"
                            className="experience-separator"
                          />
                          <span>{item.location}</span>
                        </>
                      )}
                    </span>
                  </span>
                </span>
              }
            >
              <ul>
                {item.contributions.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
              {item.caseStudySlug && (
                <Link
                  href={`/work/${item.caseStudySlug}`}
                  className="text-link"
                >
                  Explore the work
                  <FigmaIcon name="project" />
                </Link>
              )}
            </Disclosure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
