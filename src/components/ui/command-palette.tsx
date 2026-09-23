"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useBlueprint } from "@/context/blueprint-context";
import {
  Search,
  ArrowRight,
  FolderKanban,
  FileText,
  Compass,
  Sliders,
  Mail,
  ExternalLink,
  Check,
  CornerDownLeft,
} from "lucide-react";

interface CommandItem {
  id: string;
  category: "Navigation" | "Case Studies" | "Interactive Tools" | "Quick Actions";
  label: string;
  sublabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const { isCommandPaletteOpen, setCommandPaletteOpen, isBlueprintActive, toggleBlueprint } =
    useBlueprint();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  const allItems: CommandItem[] = useMemo(
    () => [
      // Case Studies
      {
        id: "cs-property",
        category: "Case Studies",
        label: "Property Management Dashboard",
        sublabel: "Dashboard UX & Maintenance Triage",
        icon: FolderKanban,
        action: () => {
          setCommandPaletteOpen(false);
          router.push("/work/property-management-dashboard");
        },
      },
      {
        id: "cs-briz",
        category: "Case Studies",
        label: "Briz — Simplifying Invoicing",
        sublabel: "Mobile Workflow & Rapid Billing",
        icon: FolderKanban,
        action: () => {
          setCommandPaletteOpen(false);
          router.push("/work/briz-mobile-workflow");
        },
      },
      {
        id: "cs-sync",
        category: "Case Studies",
        label: "Real-Time Collaborative Canvas",
        sublabel: "Presence & State Synchronization",
        icon: FolderKanban,
        action: () => {
          setCommandPaletteOpen(false);
          router.push("/work/sync-engine-crdt");
        },
      },
      // Interactive Tools
      {
        id: "tool-blueprint",
        category: "Interactive Tools",
        label: isBlueprintActive ? "Turn Off UX Blueprint Mode" : "Activate UX Blueprint Mode",
        sublabel: "Toggle 8px grid baseline & design decision annotations",
        icon: Sliders,
        action: () => {
          toggleBlueprint();
          setCommandPaletteOpen(false);
        },
      },
      {
        id: "tool-friction",
        category: "Interactive Tools",
        label: "Inspect Before vs. After Friction Flow",
        sublabel: "Interactive multi-step vs. streamlined comparison",
        icon: Sliders,
        action: () => {
          setCommandPaletteOpen(false);
          router.push("/#friction-inspector");
        },
      },
      {
        id: "tool-tokens",
        category: "Interactive Tools",
        label: "Open Design System State Lab",
        sublabel: "Test component states & density controls",
        icon: Sliders,
        action: () => {
          setCommandPaletteOpen(false);
          router.push("/#design-system-lab");
        },
      },
      // Navigation
      {
        id: "nav-about",
        category: "Navigation",
        label: "About Me",
        sublabel: "Introduction & Product Design Philosophy",
        icon: Compass,
        action: () => {
          setCommandPaletteOpen(false);
          router.push("/#about");
        },
      },
      {
        id: "nav-work-archive",
        category: "Navigation",
        label: "All Case Studies Archive",
        sublabel: "Full archive of shipped design systems",
        icon: Compass,
        action: () => {
          setCommandPaletteOpen(false);
          router.push("/work");
        },
      },
      {
        id: "nav-experience",
        category: "Navigation",
        label: "Career Experience",
        sublabel: "Bytecare Technology & Consulting Roles",
        icon: Compass,
        action: () => {
          setCommandPaletteOpen(false);
          router.push("/#experience");
        },
      },
      {
        id: "nav-blog",
        category: "Navigation",
        label: "Articles & Notes",
        sublabel: "UX thoughts & design critique essays",
        icon: FileText,
        action: () => {
          setCommandPaletteOpen(false);
          router.push("/blog");
        },
      },
      // Quick Actions
      {
        id: "act-copy-email",
        category: "Quick Actions",
        label: copiedEmail ? "Email Copied!" : "Copy Email to Clipboard",
        sublabel: "yogesh@example.com",
        icon: copiedEmail ? Check : Mail,
        action: () => {
          navigator.clipboard.writeText("yogesh@example.com");
          setCopiedEmail(true);
          setTimeout(() => {
            setCopiedEmail(false);
            setCommandPaletteOpen(false);
          }, 600);
        },
      },
      {
        id: "act-linkedin",
        category: "Quick Actions",
        label: "Open LinkedIn Profile",
        sublabel: "linkedin.com/in/yogeshraya01",
        icon: ExternalLink,
        action: () => {
          window.open("https://www.linkedin.com/in/yogeshraya01/", "_blank");
          setCommandPaletteOpen(false);
        },
      },
    ],
    [router, setCommandPaletteOpen, isBlueprintActive, toggleBlueprint, copiedEmail]
  );

  // Filter items
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.sublabel && item.sublabel.toLowerCase().includes(q))
    );
  }, [allItems, query]);

  // Arrow key navigation
  useEffect(() => {
    const handleKeyNavigation = (e: KeyboardEvent) => {
      if (!isCommandPaletteOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyNavigation);
    return () => window.removeEventListener("keydown", handleKeyNavigation);
  }, [isCommandPaletteOpen, filteredItems, selectedIndex]);

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="fixed inset-0 bg-void/80 backdrop-blur-sm"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="relative w-full max-w-[620px] bg-carbon border border-graphite rounded-[12px] shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 h-13 border-b border-graphite gap-3 bg-void/50">
              <Search className="w-4 h-4 text-ash shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search case studies..."
                className="w-full bg-transparent text-[14px] text-paper placeholder-ash focus:outline-none"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-ash bg-white/[0.04] border border-graphite rounded-[4px]">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Results List */}
            <div className="p-2 overflow-y-auto divide-y divide-graphite/40">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-[13px] text-fog">
                  No matching commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="space-y-0.5">
                  {filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] text-left transition-all ${
                          isSelected
                            ? "bg-white/[0.06] text-paper border border-white/[0.08]"
                            : "text-mist hover:text-paper border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 truncate pr-2">
                          <div
                            className={`p-1.5 rounded-[6px] border ${
                              isSelected
                                ? "bg-acid-lime/10 border-acid-lime/40 text-acid-lime"
                                : "bg-white/[0.02] border-graphite text-ash"
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <div className="text-[13.5px] font-[510] leading-snug flex items-center gap-2">
                              <span>{item.label}</span>
                              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-[3px] bg-white/[0.03] text-ash border border-white/[0.05]">
                                {item.category}
                              </span>
                            </div>
                            {item.sublabel && (
                              <div className="text-[11.5px] text-fog truncate mt-0.5 font-normal">
                                {item.sublabel}
                              </div>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <div className="flex items-center gap-1 shrink-0 text-ash text-[11px] font-mono">
                            <CornerDownLeft className="w-3 h-3 text-acid-lime" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Shortcut Bar */}
            <div className="h-9 px-4 bg-void/60 border-t border-graphite/70 flex items-center justify-between text-[11px] font-mono text-ash">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 bg-white/[0.04] border border-graphite rounded">↑</kbd>
                  <kbd className="px-1 bg-white/[0.04] border border-graphite rounded">↓</kbd> to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 bg-white/[0.04] border border-graphite rounded">↵</kbd> to select
                </span>
              </div>
              <div>Linear Command Palette</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
