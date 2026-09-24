import { aboutData } from "@site/profile";
import { FigmaIcon } from "@/components/ui/figma-icon";

export function Footer() {
  return (
    <footer className="footer page-width" data-figma-node="1351:6628">
      <div className="footer-location">
        <FigmaIcon name="location" />
        <span>Based in Nepal.</span>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Yogesh Raya</p>
        <div>
          {aboutData.email && (
            <a
              href={`mailto:${aboutData.email}`}
              aria-label="Email Yogesh Raya"
            >
              <FigmaIcon name="email" />
            </a>
          )}
          {aboutData.socials.linkedin && (
            <a
              href={aboutData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Yogesh Raya on LinkedIn"
            >
              <FigmaIcon name="linkedin" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
