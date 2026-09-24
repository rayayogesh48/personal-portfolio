import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SectionHeading({
  title,
  index,
  href,
  action,
}: {
  title: string;
  index?: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="section-heading">
      <h2>
        {index && (
          <span className="section-index" aria-hidden="true">
            {index}
          </span>
        )}
        {title}
      </h2>
      {href && (
        <Link className="text-link" href={href}>
          {action}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
