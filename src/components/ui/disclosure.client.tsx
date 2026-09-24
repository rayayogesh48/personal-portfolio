"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export function Disclosure({
  title,
  children,
  className = "",
  indicator,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  indicator?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const id = useId();
  const reduced = useReducedMotion();
  return (
    <div className={`disclosure ${className}`}>
      <button
        type="button"
        className="disclosure-trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={(event) => {
          setKeyboard(event.detail === 0);
          setOpen(!open);
        }}
      >
        <span className="disclosure-title">{title}</span>
        <span
          className={open ? "chevron is-open" : "chevron"}
          aria-hidden="true"
        >
          {indicator ?? <ChevronDown size={18} />}
        </span>
      </button>
      <div id={id}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: reduced || keyboard ? 0 : 0.22,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="disclosure-body"
            >
              <div className="disclosure-content">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
