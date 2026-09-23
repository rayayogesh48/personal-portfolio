import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  shortcut?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, shortcut, type = "text", ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3.5 text-fog pointer-events-none flex items-center">
            {icon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.14] text-mist placeholder:text-ash text-[14px] rounded-[6px] py-2.5 px-3.5 transition-colors duration-150 focus:outline-none focus:border-mist focus:ring-0",
            icon && "pl-10",
            shortcut && "pr-12",
            className
          )}
          {...props}
        />
        {shortcut && (
          <span className="absolute right-3 text-[11px] font-mono text-ash bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded-[3px] select-none pointer-events-none">
            {shortcut}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

