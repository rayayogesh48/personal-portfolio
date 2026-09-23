import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "showcase" | "subtle" | "elevated";
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "showcase", hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "transition-all duration-200",
          variant === "showcase" &&
            "bg-carbon rounded-[12px] p-6 shadow-subtle",
          variant === "subtle" &&
            "bg-white/[0.02] rounded-[6px] p-3 shadow-sm border border-graphite/40",
          variant === "elevated" &&
            "bg-obsidian rounded-[12px] p-6 border border-graphite",
          hoverable &&
            "hover:border-smoke hover:bg-carbon/90 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

