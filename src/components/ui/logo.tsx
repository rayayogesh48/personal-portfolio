import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  name?: string;
  showSubtitle?: boolean;
}

export function Logo({ className, name = "Yogesh Raya", showSubtitle = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 text-paper hover:text-acid-lime transition-colors select-none",
        className
      )}
    >
      {/* Precision Geometric Glyph */}
      <div className="relative flex items-center justify-center w-6 h-6 rounded-[5px] bg-white/[0.06] border border-graphite group-hover:border-acid-lime/50 group-hover:bg-acid-lime/[0.06] transition-all">
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-paper group-hover:text-acid-lime transition-all duration-200 group-hover:scale-105"
        >
          <path
            d="M2.5 13.5L13.5 2.5M2.5 8L8 2.5M8 13.5L13.5 8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="text-[15px] font-[510] tracking-[-0.015em] text-paper group-hover:text-acid-lime transition-colors flex items-center gap-1.5">
          {name}
        </span>
        {showSubtitle && (
          <span className="text-[11px] font-mono text-ash tracking-tight">
            Product Designer
          </span>
        )}
      </div>
    </Link>
  );
}
