import { strengths } from "@site/profile";
import { Disclosure } from "@/components/ui/disclosure.client";
import { Reveal } from "@/components/motion/portfolio-motion.client";
import { SectionHeading } from "@/components/ui/section-heading";

export function StrengthsSection() {
  return (
    <section className="section strengths-section">
      <Reveal>
        <SectionHeading title="What I Do Best" />
        <div>
          {strengths.map((item, index) => (
            <Disclosure
              key={item.title}
              className="strength"
              title={
                <span className="strength-title">
                  <span className="strength-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{item.title}</strong>
                </span>
              }
            >
              <p>{item.description}</p>
            </Disclosure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
