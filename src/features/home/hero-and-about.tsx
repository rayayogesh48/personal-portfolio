import Link from "next/link";
import { aboutData, principles } from "@site/profile";
import { CopyEmail } from "@/components/site/copy-email.client";
import { Reveal } from "@/components/motion/portfolio-motion.client";
import { SectionHeading } from "@/components/ui/section-heading";
import { FigmaIcon } from "@/components/ui/figma-icon";

export function ProfileHero() {
  return (
    <section
      className="profile-hero"
      aria-labelledby="profile-name"
      data-figma-node="1351:6158"
    >
      <div className="profile-cover" aria-hidden="true">
        <img
          src="/images/figma/60451.png"
          width={734}
          height={286}
          alt=""
          className="figma-banner"
          fetchPriority="high"
        />
      </div>
      <Reveal>
        <div className="profile-avatar">
          {aboutData.portrait ? (
            <img
              src={aboutData.portrait}
              alt="Yogesh Raya"
              width={80}
              height={80}
            />
          ) : (
            <span aria-label="Yogesh Raya initials">yr.</span>
          )}
        </div>
        <div className="profile-identity">
          <div>
            <h1 id="profile-name">{aboutData.name}</h1>
            <p className="profile-role">{aboutData.role}</p>
          </div>
        </div>
        <p className="profile-intro">{aboutData.intro}</p>
        {aboutData.email && (
          <div className="profile-email">
            <CopyEmail email={aboutData.email} compact />
          </div>
        )}
        <div className="actions">
          <Link className="button figma-button" href="#case-studies">
            View work
            <FigmaIcon name="external" />
          </Link>
          {aboutData.resume && (
            <a className="button figma-button" href={aboutData.resume} download>
              Download CV
              <FigmaIcon name="download" />
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="section home-about"
      data-figma-node="1351:6551"
    >
      <Reveal>
        <img
          className="about-spark"
          src="/images/figma/493a9.png"
          alt=""
          aria-hidden="true"
          width={220}
          height={220}
          loading="lazy"
        />
        <SectionHeading title="About me" />
        <p className="body-copy">{aboutData.approach}</p>
        <ul className="principles">
          {principles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link className="button figma-button" href="/about">
          Read full story
          <FigmaIcon name="external" />
        </Link>
      </Reveal>
    </section>
  );
}
