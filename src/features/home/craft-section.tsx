import Link from "next/link";
import type { CraftSummary } from "@/content/types";
import { CraftCollection } from "@/features/craft/craft-collection.client";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/portfolio-motion.client";
import { FigmaIcon } from "@/components/ui/figma-icon";

export function CraftSection({ items }: { items: CraftSummary[] }) {
  return (
    <section id="craft" className="section" data-figma-node="1351:6575">
      <Reveal>
        <SectionHeading title="Craft" />
        <CraftCollection items={items} preview />
        <Link href="/craft" className="button figma-button section-action">
          See my Craft
          <FigmaIcon name="external" />
        </Link>
      </Reveal>
    </section>
  );
}
