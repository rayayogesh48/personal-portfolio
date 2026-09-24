import { SiteHeader } from "@/components/site/site-header.client";
import { FloatingDock } from "@/components/site/floating-dock.client";
import { aboutData } from "@site/profile";

export function Navbar() {
  const contactHref = aboutData.email ? `mailto:${aboutData.email}` : aboutData.socials.linkedin ?? "/about#contact";
  return <><SiteHeader contactHref={contactHref} resume={aboutData.resume} /><FloatingDock /></>;
}
