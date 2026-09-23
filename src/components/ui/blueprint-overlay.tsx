"use client";

import React, { useState } from "react";
import { useBlueprint } from "@/context/blueprint-context";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, X, Info, CheckCircle2, ShieldCheck, Eye, Layers } from "lucide-react";

interface UXAnnotation {
  id: string;
  title: string;
  principle: string;
  metric: string;
  rationale: string;
  topPct: number;
  leftPct: number;
}

const annotations: UXAnnotation[] = [
  {
    id: "fitts",
    title: "Fitts’s Law & Hit Targets",
    principle: "Motor Control & Speed",
    metric: "Min 44 × 44px target boundaries",
    rationale:
      "All critical conversion actions (Case Studies, Email, Command Palette) feature a minimum 44px touch-box and high contrast ratios to reduce selection acquisition time.",
    topPct: 22,
    leftPct: 8,
  },
  {
    id: "wcag",
    title: "WCAG 2.1 AAA Contrast",
    principle: "Visual Accessibility",
    metric: "14.2:1 against #08090a substrate",
    rationale:
      "Headings use #ffffff (21:1 ratio) and body text uses #d0d6e0 (14.2:1), ensuring fatigue-free readability under diverse lighting conditions without straining users.",
    topPct: 38,
    leftPct: 75,
  },
  {
    id: "progressive",
    title: "Progressive Disclosure",
    principle: "Cognitive Load Reduction",
    metric: "8 form fields eliminated upfront",
    rationale:
      "Complex workflows default to context-aware presets. Advanced overrides (variables, region rules) are progressively disclosed only when explicitly requested.",
    topPct: 58,
    leftPct: 15,
  },
  {
    id: "millers",
    title: "Miller’s Law & Chunking",
    principle: "Working Memory",
    metric: "3 primary visual groups max",
    rationale:
      "Sections avoid dense multi-column noise. Every screen organizes information into no more than 3 distinct visual tiers: Title, Problem Statement, and Action.",
    topPct: 78,
    leftPct: 70,
  },
];

export function BlueprintOverlay() {
  const { isBlueprintActive, toggleBlueprint } = useBlueprint();
  const [activeAnnotation, setActiveAnnotation] = useState<UXAnnotation | null>(null);

  return (
    <>
      {/* 8px Baseline Grid & Annotation Layer */}
      <AnimatePresence>
        {isBlueprintActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pointer-events-none"
          >
            {/* 8px Grid Background */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #e4f222 1px, transparent 1px), linear-gradient(to bottom, #e4f222 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            />

            {/* Viewport Dimension HUD (Top Right) */}
            <div className="absolute top-16 right-6 px-3 py-1.5 rounded-[6px] bg-carbon/90 border border-acid-lime/40 text-[11px] font-mono text-acid-lime shadow-lg pointer-events-auto flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-acid-lime animate-pulse" />
              <span>UX BLUEPRINT MODE: ACTIVE</span>
              <span className="text-ash">|</span>
              <span className="text-fog">8pt Baseline Grid</span>
            </div>

            {/* Clickable UX Annotation Chips */}
            {annotations.map((ann) => (
              <div
                key={ann.id}
                className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${ann.topPct}%`, left: `${ann.leftPct}%` }}
              >
                <button
                  type="button"
                  onClick={() => setActiveAnnotation(ann)}
                  className="group flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-carbon/95 border border-acid-lime/60 text-paper text-[11px] font-mono shadow-xl hover:border-acid-lime hover:scale-105 transition-all cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-acid-lime animate-ping" />
                  <span className="font-semibold text-acid-lime">UX NOTE:</span>
                  <span className="truncate max-w-[130px] sm:max-w-none">{ann.principle}</span>
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Blueprint Mode Toggle Pill (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-50 select-none">
        <button
          type="button"
          onClick={toggleBlueprint}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-200 shadow-xl text-[12.5px] font-[510] cursor-pointer ${
            isBlueprintActive
              ? "bg-acid-lime text-void border-acid-lime shadow-[0_0_20px_rgba(228,242,34,0.3)] scale-105"
              : "bg-carbon/90 backdrop-blur-md border-graphite text-mist hover:border-acid-lime/50 hover:text-acid-lime"
          }`}
          title="Toggle UX Blueprint & Architecture Annotations"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{isBlueprintActive ? "Blueprint Mode: ON" : "UX Blueprint Mode"}</span>
          {isBlueprintActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-void animate-pulse" />
          )}
        </button>
      </div>

      {/* Annotation Detail Modal */}
      <AnimatePresence>
        {activeAnnotation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/70 backdrop-blur-xs select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              className="relative w-full max-w-[460px] bg-carbon border border-acid-lime/40 rounded-[12px] p-6 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveAnnotation(null)}
                className="absolute top-4 right-4 p-1 rounded-[4px] text-ash hover:text-paper hover:bg-white/[0.05] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[11px] font-mono text-acid-lime uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{activeAnnotation.principle}</span>
              </div>

              <h3 className="text-[19px] font-[510] text-paper mb-1">
                {activeAnnotation.title}
              </h3>

              <div className="inline-block px-2 py-0.5 rounded-[4px] bg-acid-lime/10 border border-acid-lime/20 text-acid-lime text-[11px] font-mono mb-4">
                {activeAnnotation.metric}
              </div>

              <p className="text-[14px] leading-[1.65] text-mist mb-6 font-normal">
                {activeAnnotation.rationale}
              </p>

              <button
                type="button"
                onClick={() => setActiveAnnotation(null)}
                className="w-full py-2 px-4 rounded-[6px] bg-white/[0.06] border border-graphite hover:border-acid-lime/50 text-paper text-[13px] font-[510] transition-colors"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
