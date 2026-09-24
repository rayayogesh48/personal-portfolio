"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { destinations } from "@/config/navigation";
import { SettingsPopover } from "./settings-popover.client";

export function FloatingDock() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLButtonElement>("button")?.focus();
    function close() {
      setOpen(false);
      trigger.current?.focus({ preventScroll: true });
    }
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }
    function outside(event: PointerEvent) {
      if (!dock.current?.contains(event.target as Node)) {
        close();
        // Restore focus after the pointer's native focus action has completed.
        requestAnimationFrame(() =>
          trigger.current?.focus({ preventScroll: true }),
        );
      }
    }
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <>
      <div className="dock-fade" aria-hidden="true" />
      <div
        className="dock-anchor"
        ref={dock}
        onBlur={(event) => {
          if (open && !event.currentTarget.contains(event.relatedTarget))
            setOpen(false);
        }}
      >
        <SettingsPopover
          open={open}
          keyboard={keyboard}
          reduced={reduced}
          panelRef={panel}
          onClose={() => { setOpen(false); trigger.current?.focus(); }}
        />
        <nav className="dock" aria-label="Main navigation">
          <LayoutGroup id="portfolio-dock">
            {destinations.map(({ href, label, icon }) => {
              const active =
                href === "/" ? path === "/" : path.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  aria-current={active ? "page" : undefined}
                  className={`dock-item ${active ? "active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {active && (
                    <motion.span
                      className="dock-active"
                      layoutId="active-page"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 280, damping: 30 }
                      }
                    />
                  )}
                  {icon ? (
                    <FigmaIcon name={icon} />
                  ) : (
                    <BookOpen size={18} strokeWidth={1.5} aria-hidden="true" />
                  )}
                  {active && (
                    <span className="dock-active-label" aria-hidden="true">
                      {label}
                    </span>
                  )}
                  <span className="dock-tooltip" aria-hidden="true">
                    {label}
                  </span>
                </Link>
              );
            })}
          </LayoutGroup>
          <span className="dock-divider" />
          <Link
            href="/about#contact"
            className="dock-item"
            aria-label="Contact"
            onClick={() => setOpen(false)}
          >
            <FigmaIcon name="contact" />
            <span className="dock-tooltip" aria-hidden="true">
              Contact
            </span>
          </Link>
          <span className="dock-divider" />
          <button
            type="button"
            ref={trigger}
            className={`dock-item ${open ? "active" : ""}`}
            aria-label="Settings"
            aria-expanded={open}
            aria-controls="portfolio-settings"
            aria-haspopup="dialog"
            onClick={(event) => {
              setKeyboard(event.detail === 0);
              setOpen(!open);
            }}
          >
            <FigmaIcon name="settings" />
            <span className="dock-tooltip" aria-hidden="true">
              Settings
            </span>
          </button>
        </nav>
      </div>
    </>
  );
}
