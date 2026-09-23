import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "pulse-green" | "coral-red" | "iris-violet" | "lavender" | "teal";
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", dot = false, children, ...props }, ref) => {
    const dotColors = {
      neutral: "bg-fog",
      "pulse-green": "bg-pulse-green",
      "coral-red": "bg-coral-red",
      "iris-violet": "bg-iris-violet",
      lavender: "bg-lavender",
      teal: "bg-signal-teal",
    };

    const variantStyles = {
      neutral: "bg-white/[0.05] text-fog border-transparent",
      "pulse-green": "bg-[rgba(39,166,68,0.12)] text-[#4ade80] border-[rgba(39,166,68,0.3)]",
      "coral-red": "bg-[rgba(235,87,87,0.12)] text-[#f87171] border-[rgba(235,87,87,0.3)]",
      "iris-violet": "bg-[rgba(99,102,241,0.12)] text-[#a5b4fc] border-[rgba(99,102,241,0.3)]",
      lavender: "bg-[rgba(139,92,246,0.12)] text-[#c4b5fd] border-[rgba(139,92,246,0.3)]",
      teal: "bg-[rgba(2,184,204,0.12)] text-[#38bdf8] border-[rgba(2,184,204,0.3)]",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-[4px] border text-[12px] font-normal tracking-tight font-mono select-none",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {dot && (
          <span className={cn("inline-block w-1.5 h-1.5 rounded-full", dotColors[variant])} />
        )}
        <span>{children}</span>
      </span>
    );
  }
);

Badge.displayName = "Badge";

