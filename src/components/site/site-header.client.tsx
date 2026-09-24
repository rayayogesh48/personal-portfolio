"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { destinations } from "@/config/navigation";

export function SiteHeader({ contactHref, resume }: { contactHref: string; resume?: string }) {
  const path = usePathname();
  const current = destinations.find((item) => item.href !== "/" && path.startsWith(item.href));
  return (
      <header className="utility-header page-width">
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          <Link href="/" aria-label="Yogesh Raya, home">
            <FigmaIcon name="headerHome" />
            <span>Home</span>
          </Link>
          {current && (
            <>
              <ChevronRight size={13} aria-hidden="true" />
              <Link
                href={current.href}
                aria-current={path === current.href ? "page" : undefined}
              >
                {current.label}
              </Link>
              {path !== current.href && (
                <span className="muted breadcrumb-detail">/ Detail</span>
              )}
            </>
          )}
        </nav>
        <div className="utility-actions">
          <a
            href={contactHref}
          >
            Contact Me
          </a>
          {resume && (
            <a href={resume} download>
              My CV
            </a>
          )}
        </div>
      </header>
  );
}
