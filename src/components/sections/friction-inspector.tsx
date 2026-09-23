"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  ChevronRight,
  Info,
  SlidersHorizontal,
} from "lucide-react";

export function FrictionInspector() {
  const [mode, setMode] = useState<"legacy" | "redesigned">("redesigned");
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      title: "Context-Aware Smart Defaults",
      metric: "Eliminated 6 manual dropdowns",
      desc: "Instead of forcing users to specify server environments, port offsets, and replica pools upfront, the system auto-detects standard project runtimes and prepares the optimal configuration.",
    },
    {
      title: "Progressive Disclosure",
      metric: "Cognitive load reduced by 72%",
      desc: "Advanced routing rules and custom environment variables remain safely behind an optional drawer. 88% of users deploy with zero overrides.",
    },
    {
      title: "Inline High-Contrast Validation",
      metric: "Zero post-submit error surprises",
      desc: "Validation occurs in-flight next to the input rather than failing 3 levels deep after clicking submit.",
    },
  ];

  return (
    <section id="friction-inspector" className="py-14 sm:py-18 border-b border-graphite">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
        <div>
          <div className="text-[11px] font-mono text-ash uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-acid-lime" />
            <span>INTERACTIVE UX EXPERIMENT</span>
          </div>
          <h2 className="text-[24px] sm:text-[28px] font-[510] tracking-[-0.015em] text-paper">
            Friction Inspector: Before vs. After
          </h2>
          <p className="text-[14px] text-fog mt-1 max-w-xl">
            Toggle between the legacy multi-step configuration and the redesigned linear flow to inspect the decisions that cut task completion from 4 minutes to 35 seconds.
          </p>
        </div>

        {/* Mode Switcher Toggle */}
        <div className="flex items-center p-1 rounded-[8px] bg-carbon border border-graphite shrink-0">
          <button
            type="button"
            onClick={() => setMode("legacy")}
            className={`px-3 py-1.5 text-[12.5px] font-[510] rounded-[6px] transition-all cursor-pointer ${
              mode === "legacy"
                ? "bg-coral-red/15 text-coral-red border border-coral-red/30 shadow-xs"
                : "text-fog hover:text-paper"
            }`}
          >
            Legacy Flow (4m 12s)
          </button>
          <button
            type="button"
            onClick={() => setMode("redesigned")}
            className={`px-3 py-1.5 text-[12.5px] font-[510] rounded-[6px] transition-all cursor-pointer ${
              mode === "redesigned"
                ? "bg-acid-lime/15 text-acid-lime border border-acid-lime/30 shadow-xs"
                : "text-fog hover:text-paper"
            }`}
          >
            Redesigned Flow (35s)
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <Card
        variant="showcase"
        className="border border-graphite p-6 sm:p-8 rounded-[12px] bg-carbon/90 overflow-hidden relative"
      >
        <AnimatePresence mode="wait">
          {mode === "legacy" ? (
            /* LEGACY CLUTTERED FLOW */
            <motion.div
              key="legacy"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Problem banner */}
              <div className="p-3.5 rounded-[8px] bg-coral-red/10 border border-coral-red/30 flex items-center justify-between text-[13px] text-coral-red">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    High friction: 9 required form inputs, no smart defaults, delayed error banners.
                  </span>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider hidden sm:block">
                  Avg Time: 4m 12s
                </div>
              </div>

              {/* Cluttered UI Simulation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5 rounded-[8px] bg-void/70 border border-graphite/80 text-[12px] opacity-80 select-none">
                <div className="space-y-1">
                  <label className="text-fog">Server Region *</label>
                  <div className="p-2 rounded bg-carbon border border-coral-red/50 text-mist">
                    Select datacenter (Required)
                  </div>
                  <span className="text-[10px] text-coral-red">Error: Field cannot be empty</span>
                </div>

                <div className="space-y-1">
                  <label className="text-fog">Worker Pool Allocation *</label>
                  <div className="p-2 rounded bg-carbon border border-graphite text-mist">
                    Default: Unset
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-fog">Autoscale Metric *</label>
                  <div className="p-2 rounded bg-carbon border border-graphite text-mist">
                    Select heuristic...
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-fog">Environment Override JSON</label>
                  <div className="p-2 rounded bg-carbon border border-graphite text-ash font-mono">
                    {`{"CLUSTER_PORT": 8080, "AFFINITY": "ANY"}`}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-fog">Health Check Timeout (ms)</label>
                  <div className="p-2 rounded bg-carbon border border-graphite text-mist">5000</div>
                </div>
              </div>

              {/* Cognitive Assessment */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono text-fog pt-2 border-t border-graphite/60">
                <span>🔴 14 Cognitive Decision Points</span>
                <span>🔴 88% users paused on non-mandatory fields</span>
                <button
                  type="button"
                  onClick={() => setMode("redesigned")}
                  className="text-acid-lime hover:underline cursor-pointer font-sans"
                >
                  Switch to Redesigned Flow →
                </button>
              </div>
            </motion.div>
          ) : (
            /* REDESIGNED CONTEXTUAL FLOW */
            <motion.div
              key="redesigned"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Solution banner */}
              <div className="p-3.5 rounded-[8px] bg-pulse-green/10 border border-pulse-green/30 flex items-center justify-between text-[13px] text-pulse-green">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    Streamlined: Context auto-detected, 1-click confirmation, progressive disclosure.
                  </span>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider hidden sm:block">
                  Avg Time: 35s
                </div>
              </div>

              {/* Modern Minimal Interface Card with Decision Hotspots */}
              <div className="relative p-5 rounded-[8px] bg-void border border-graphite/80 text-[13px]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-graphite mb-4">
                  <div>
                    <div className="text-[11px] font-mono text-ash uppercase tracking-wider mb-0.5">
                      Production Runtime Auto-Config
                    </div>
                    <div className="text-paper font-[510] text-[15px] flex items-center gap-2">
                      <span>Linear Workspace Cluster</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-acid-lime/10 text-acid-lime border border-acid-lime/20">
                        VERIFIED DEFAULTS
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-[6px] bg-acid-lime text-void font-[510] text-[13px] hover:brightness-105 transition-all cursor-pointer"
                    >
                      Deploy Instantly (35s)
                    </button>
                  </div>
                </div>

                {/* Progressive summary pill list */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-[6px] bg-carbon border border-graphite relative group">
                    <div className="text-[11px] text-fog mb-1">Region</div>
                    <div className="text-paper font-medium">Asia-South (Auto)</div>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(0)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-acid-lime text-void flex items-center justify-center text-[10px] font-bold shadow-md hover:scale-110 transition-transform cursor-pointer"
                      title="Inspect UX Decision"
                    >
                      1
                    </button>
                  </div>

                  <div className="p-3 rounded-[6px] bg-carbon border border-graphite relative group">
                    <div className="text-[11px] text-fog mb-1">Heuristics</div>
                    <div className="text-paper font-medium">Adaptive Scaling (P99)</div>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(1)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-acid-lime text-void flex items-center justify-center text-[10px] font-bold shadow-md hover:scale-110 transition-transform cursor-pointer"
                      title="Inspect UX Decision"
                    >
                      2
                    </button>
                  </div>

                  <div className="p-3 rounded-[6px] bg-carbon border border-graphite relative group">
                    <div className="text-[11px] text-fog mb-1">Advanced Overrides</div>
                    <div className="text-mist font-medium flex items-center justify-between">
                      <span>Custom Variables (0)</span>
                      <SlidersHorizontal className="w-3.5 h-3.5 text-ash" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(2)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-acid-lime text-void flex items-center justify-center text-[10px] font-bold shadow-md hover:scale-110 transition-transform cursor-pointer"
                      title="Inspect UX Decision"
                    >
                      3
                    </button>
                  </div>
                </div>
              </div>

              {/* Hotspot Explainer Card */}
              {activeHotspot !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-4 rounded-[8px] bg-carbon border border-acid-lime/40 text-[13px] relative"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 text-acid-lime font-[510]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{hotspots[activeHotspot].title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-ash">
                      {hotspots[activeHotspot].metric}
                    </span>
                  </div>
                  <p className="text-mist leading-[1.6]">
                    {hotspots[activeHotspot].desc}
                  </p>
                </motion.div>
              )}

              {/* Metrics Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono text-fog pt-2 border-t border-graphite/60">
                <span className="text-pulse-green">🟢 86% Faster Task Completion</span>
                <span className="text-pulse-green">🟢 0 Configuration Support Tickets</span>
                <div className="flex items-center gap-1.5 text-mist">
                  <span>Click badge 1, 2, or 3 to inspect decisions</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </section>
  );
}
