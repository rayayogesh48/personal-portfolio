"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Mail } from "lucide-react";

export function CopyEmail({
  email,
  compact = false,
}: {
  email: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"copied" | "failed" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(null), 5000);
  }, [email]);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target;
      if (
        event.key.toLowerCase() !== "m" ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.repeat ||
        event.defaultPrevented
      )
        return;
      if (
        target instanceof HTMLElement &&
        (target.closest("input, textarea, select, [role='textbox']") ||
          target.isContentEditable)
      )
        return;
      event.preventDefault();
      void copy();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(timer.current);
    };
  }, [copy]);
  return (
    <>
      {compact ? (
        <span className="copy-email-prompt">
          Press{" "}
          <button
            type="button"
            onClick={copy}
            aria-label="Copy Email"
            aria-keyshortcuts="m"
          >
            <kbd>M</kbd>
          </button>{" "}
          to copy my email
        </span>
      ) : (
        <button
          type="button"
          className="button secondary"
          onClick={copy}
          aria-keyshortcuts="m"
        >
          <Copy size={15} aria-hidden="true" />
          Copy Email<kbd>M</kbd>
        </button>
      )}
      <AnimatePresence>
        {status && (
          <motion.div
            className="toast"
            role="status"
            key={status}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
          >
            {status === "copied" ? (
              <>
                <Check size={16} />
                Email copied
              </>
            ) : (
              <>
                <Mail size={16} />
                <span>
                  Couldn’t copy. <a href={`mailto:${email}`}>{email}</a>
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
