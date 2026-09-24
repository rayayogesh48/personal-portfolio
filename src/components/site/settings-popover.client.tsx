"use client";

import { Check, Monitor, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { RefObject } from "react";
import { useTheme } from "@/components/theme/theme-provider.client";

export function SettingsPopover({ open, keyboard, reduced, panelRef, onClose }: {
  open: boolean;
  keyboard: boolean;
  reduced: boolean | null;
  panelRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}) {
  const { theme, setTheme } = useTheme();
  return (
        <AnimatePresence>
          {open && (
            <motion.div
              ref={panelRef}
              id="portfolio-settings"
              role="dialog"
              aria-label="Settings"
              className="settings-panel"
              initial={{
                opacity: 0,
                y: reduced ? 0 : 6,
                scale: reduced ? 1 : 0.98,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduced ? 0 : 4 }}
              transition={{ duration: keyboard || reduced ? 0 : 0.16 }}
            >
              <div className="settings-heading">
                <strong>Make yourself at home</strong>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Close settings"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <X size={16} />
                </button>
              </div>
              <fieldset>
                <legend>Appearance</legend>
                <div className="theme-options">
                  {(
                    [
                      { value: "system", label: "System", icon: Monitor },
                      { value: "light", label: "Light", icon: Sun },
                      { value: "dark", label: "Dark", icon: Moon },
                    ] as const
                  ).map(({ value, label, icon: Icon }) => (
                    <button
                      type="button"
                      key={value}
                      aria-pressed={theme === value}
                      onClick={() => setTheme(value)}
                    >
                      <Icon size={17} aria-hidden="true" />
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>Language</legend>
                <div className="language-row">
                  <span>English</span>
                  <Check size={15} aria-label="Selected" />
                </div>
                <div className="language-row muted">
                  <span>Nepali</span>
                  <span className="tiny">Coming soon</span>
                </div>
              </fieldset>
            </motion.div>
          )}
        </AnimatePresence>
  );
}
