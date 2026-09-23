import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "acid" | "ghost" | "pill" | "pill-subtle" | "nav";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "ghost", size = "md", href, external, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid-lime disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variantStyles = {
      acid: "bg-acid-lime text-void font-[510] tracking-[-0.011em] rounded-[6px] acid-lime-shadow hover:brightness-110 active:scale-[0.99]",
      ghost:
        "bg-transparent border border-graphite text-mist rounded-[6px] hover:border-acid-lime/50 hover:text-acid-lime hover:bg-acid-lime/[0.04] active:scale-[0.99]",
      pill: "bg-paper text-void font-[510] rounded-[9999px] hover:bg-acid-lime hover:text-void active:scale-[0.99]",
      "pill-subtle":
        "bg-white/[0.05] border border-transparent hover:border-acid-lime/40 text-mist hover:text-acid-lime rounded-[9999px] text-[13px] active:scale-[0.99]",
      nav: "bg-transparent text-mist hover:text-acid-lime text-[13px] font-normal underline-offset-4 hover:underline px-3 py-2",
    };

    const sizeStyles = {
      sm: variant === "pill" || variant === "pill-subtle" ? "px-3 py-1 text-[12px]" : "px-3 py-1.5 text-[13px]",
      md:
        variant === "acid"
          ? "px-4 py-2.5 text-[14px]"
          : variant === "pill"
            ? "px-4 py-2 text-[13px]"
            : "px-3.5 py-2 text-[13px]",
      lg: "px-5 py-3 text-[15px]",
    };

    const combinedClassName = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if (href) {
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClassName}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
