"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Copy,
  AlertCircle,
  Loader2,
  Sliders,
  Sparkles,
  Layers,
  ArrowRight,
  Code,
} from "lucide-react";

type ComponentState = "default" | "loading" | "error" | "success";
type Density = "comfortable" | "compact";

interface TokenItem {
  name: string;
  variable: string;
  value: string;
  description: string;
}

const DESIGN_TOKENS: TokenItem[] = [
  { name: "Void (Canvas)", variable: "--void", value: "#08090a", description: "Base substrate / canvas" },
  { name: "Carbon (Surface)", variable: "--carbon", value: "#0f1011", description: "Elevated cards & sheets" },
  { name: "Graphite (Hairline)", variable: "--graphite", value: "#23252a", description: "Subtle 1px boundary borders" },
  { name: "Acid Lime (Primary)", variable: "--acid-lime", value: "#e4f222", description: "Active accents & focus states" },
  { name: "Paper (Heading)", variable: "--paper", value: "#f7f8f8", description: "High-contrast headings" },
  { name: "Mist (Body)", variable: "--mist", value: "#8a8f98", description: "Secondary readable text" },
];

export function DesignSystemWorkbench() {
  const [activeState, setActiveState] = useState<ComponentState>("default");
  const [density, setDensity] = useState<Density>("comfortable");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("deploy@production.io");
  const [activeTab, setActiveTab] = useState<"preview" | "tokens">("preview");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const handleSimulateSubmit = () => {
    setActiveState("loading");
    setTimeout(() => {
      if (inputValue.includes("@") && inputValue.length > 5) {
        setActiveState("success");
      } else {
        setActiveState("error");
      }
    }, 1200);
  };

  return (
    <section id="workbench" className="py-14 sm:py-18 border-b border-graphite scroll-mt-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-carbon border border-graphite text-[11px] font-mono text-acid-lime mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-acid-lime animate-pulse" />
            CONCEPT 04 / INTERACTIVE WORKBENCH
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-paper">
            Design System Token & State Lab
          </h2>
          <p className="text-[14px] text-mist mt-1 max-w-xl">
            Test component ergonomics, edge states, and sub-pixel density in real time. Built to
            validate interface resilience before engineering handoff.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-carbon border border-graphite rounded-[8px] p-0.5 text-[12px] font-mono self-start md:self-auto">
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1.5 rounded-[6px] transition-all flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "bg-steel/60 text-paper shadow-sm"
                : "text-fog hover:text-paper"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Component State Lab
          </button>
          <button
            onClick={() => setActiveTab("tokens")}
            className={`px-3 py-1.5 rounded-[6px] transition-all flex items-center gap-1.5 ${
              activeTab === "tokens"
                ? "bg-steel/60 text-paper shadow-sm"
                : "text-fog hover:text-paper"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Token Matrix
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-carbon border border-graphite rounded-[12px] overflow-hidden">
        {activeTab === "preview" ? (
          <div>
            {/* Control Bar */}
            <div className="p-4 sm:p-5 border-b border-graphite bg-void/50 flex flex-wrap items-center justify-between gap-4">
              {/* State Selectors */}
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <span className="text-[11px] font-mono text-ash uppercase tracking-wider mr-1 sm:mr-2">
                  State:
                </span>
                {(
                  [
                    { id: "default", label: "Default" },
                    { id: "loading", label: "Loading / Async" },
                    { id: "error", label: "Validation Error" },
                    { id: "success", label: "Success Commit" },
                  ] as const
                ).map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setActiveState(st.id)}
                    className={`px-2.5 py-1 text-[12px] font-mono rounded-[6px] transition-all border ${
                      activeState === st.id
                        ? "bg-acid-lime/10 border-acid-lime text-acid-lime shadow-sm"
                        : "bg-carbon border-graphite text-fog hover:text-paper hover:border-ash"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Density Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-ash uppercase tracking-wider">
                  Density:
                </span>
                <div className="flex items-center bg-carbon border border-graphite rounded-[6px] p-0.5 text-[11px] font-mono">
                  <button
                    onClick={() => setDensity("comfortable")}
                    className={`px-2.5 py-0.5 rounded-[4px] transition-colors ${
                      density === "comfortable"
                        ? "bg-steel/80 text-paper"
                        : "text-ash hover:text-paper"
                    }`}
                  >
                    Comfortable (38px)
                  </button>
                  <button
                    onClick={() => setDensity("compact")}
                    className={`px-2.5 py-0.5 rounded-[4px] transition-colors ${
                      density === "compact"
                        ? "bg-steel/80 text-acid-lime"
                        : "text-ash hover:text-paper"
                    }`}
                  >
                    Operator (28px)
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Preview Stage */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-ash tracking-wide uppercase">
                      Live Component Instance
                    </span>
                    <span className="text-[11px] font-mono text-fog">
                      Status:{" "}
                      <span className="text-acid-lime font-medium">
                        {activeState.toUpperCase()}
                      </span>
                    </span>
                  </div>

                  {/* Component Mock Card */}
                  <div
                    className={`bg-void border rounded-[8px] transition-all ${
                      activeState === "error"
                        ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                        : activeState === "success"
                        ? "border-acid-lime/50 shadow-[0_0_15px_rgba(228,242,34,0.1)]"
                        : "border-graphite"
                    } ${density === "compact" ? "p-4 space-y-3" : "p-6 space-y-4"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`rounded-full ${
                            density === "compact" ? "w-2 h-2" : "w-2.5 h-2.5"
                          } ${
                            activeState === "loading"
                              ? "bg-amber-400 animate-pulse"
                              : activeState === "error"
                              ? "bg-red-400"
                              : activeState === "success"
                              ? "bg-acid-lime"
                              : "bg-mist"
                          }`}
                        />
                        <span
                          className={`font-mono text-paper font-medium ${
                            density === "compact" ? "text-[12px]" : "text-[13px]"
                          }`}
                        >
                          Production Pipeline Target
                        </span>
                      </div>
                      <span
                        className={`font-mono px-2 py-0.5 rounded-[4px] border ${
                          activeState === "error"
                            ? "bg-red-500/10 border-red-500/30 text-red-400 text-[10px]"
                            : activeState === "success"
                            ? "bg-acid-lime/10 border-acid-lime/30 text-acid-lime text-[10px]"
                            : "bg-steel/40 border-graphite text-fog text-[10px]"
                        }`}
                      >
                        {density === "compact" ? "COMPACT" : "STANDARD"}
                      </span>
                    </div>

                    {/* Input Field */}
                    <div className="space-y-1.5">
                      <label
                        className={`block font-mono text-fog ${
                          density === "compact" ? "text-[11px]" : "text-[12px]"
                        }`}
                      >
                        Endpoint / Hook URL
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          disabled={activeState === "loading"}
                          className={`w-full bg-carbon border rounded-[6px] text-paper font-mono transition-all focus:outline-none ${
                            activeState === "error"
                              ? "border-red-500/70 focus:border-red-400"
                              : activeState === "success"
                              ? "border-acid-lime/60 focus:border-acid-lime"
                              : "border-graphite focus:border-acid-lime"
                          } ${
                            density === "compact"
                              ? "h-7 px-2.5 text-[12px]"
                              : "h-9 px-3.5 text-[13px]"
                          }`}
                        />
                        {activeState === "loading" && (
                          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                            <Loader2 className="w-3.5 h-3.5 text-fog animate-spin" />
                          </div>
                        )}
                        {activeState === "success" && (
                          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-acid-lime">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      {/* State Feedback Message */}
                      <AnimatePresence mode="wait">
                        {activeState === "error" && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="text-[11px] font-mono text-red-400 flex items-center gap-1.5 pt-0.5"
                          >
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            Validation failure: Host unreachable or format malformed
                          </motion.p>
                        )}
                        {activeState === "success" && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="text-[11px] font-mono text-acid-lime flex items-center gap-1.5 pt-0.5"
                          >
                            <Check className="w-3 h-3 flex-shrink-0" />
                            Target verified and committed to cluster (22ms)
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={handleSimulateSubmit}
                        disabled={activeState === "loading"}
                        className={`font-mono font-medium rounded-[6px] transition-all flex items-center justify-center gap-2 ${
                          activeState === "loading"
                            ? "bg-acid-lime/50 text-void cursor-wait"
                            : "bg-acid-lime text-void hover:bg-[#d0df1a] active:scale-[0.98]"
                        } ${
                          density === "compact"
                            ? "h-7 px-3 text-[11px]"
                            : "h-9 px-4 text-[13px]"
                        }`}
                      >
                        {activeState === "loading" ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Dispatching...</span>
                          </>
                        ) : activeState === "success" ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Committed</span>
                          </>
                        ) : (
                          <>
                            <span>Commit Changes</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setActiveState("default");
                          setInputValue("deploy@production.io");
                        }}
                        className={`font-mono text-fog hover:text-paper bg-steel/20 hover:bg-steel/40 border border-graphite rounded-[6px] transition-colors ${
                          density === "compact"
                            ? "h-7 px-2.5 text-[11px]"
                            : "h-9 px-3 text-[12px]"
                        }`}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtext description */}
                <div className="p-3.5 rounded-[8px] bg-void/60 border border-graphite/60 text-[12px] text-fog leading-relaxed">
                  <strong className="text-paper font-mono">Ergonomic Constraint:</strong> In operator
                  mode (28px height), micro-typography drops to 11px JetBrains Mono with 4px border
                  radius to maximize vertical information density without compromising touch targets.
                </div>
              </div>

              {/* Code & Token Inspector */}
              <div className="lg:col-span-5 bg-void border border-graphite rounded-[8px] p-4 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-graphite mb-3">
                    <span className="text-[11px] font-mono text-ash uppercase flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-acid-lime" />
                      CSS Micro-Tokens
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `/* State: ${activeState} | Density: ${density} */\n--height: ${
                            density === "compact" ? "28px" : "38px"
                          };\n--radius: 6px;\n--accent: #e4f222;`,
                          "snippet"
                        )
                      }
                      className="text-[11px] font-mono text-fog hover:text-acid-lime flex items-center gap-1 transition-colors"
                    >
                      {copiedToken === "snippet" ? (
                        <>
                          <Check className="w-3 h-3 text-acid-lime" />
                          <span className="text-acid-lime">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy CSS</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Token Lines */}
                  <div className="space-y-2 font-mono text-[12px]">
                    <div className="flex justify-between py-1 border-b border-graphite/40">
                      <span className="text-fog">state.lifecycle:</span>
                      <span className="text-acid-lime">{activeState}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-graphite/40">
                      <span className="text-fog">component.height:</span>
                      <span className="text-paper">{density === "compact" ? "28px" : "38px"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-graphite/40">
                      <span className="text-fog">typography.size:</span>
                      <span className="text-paper">{density === "compact" ? "11px" : "13px"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-graphite/40">
                      <span className="text-fog">feedback.color:</span>
                      <span
                        className={
                          activeState === "error"
                            ? "text-red-400"
                            : activeState === "success"
                            ? "text-acid-lime"
                            : "text-mist"
                        }
                      >
                        {activeState === "error"
                          ? "#ef4444"
                          : activeState === "success"
                          ? "#e4f222"
                          : "#8a8f98"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-fog">border.hairline:</span>
                      <span className="text-paper">1px solid #23252a</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-graphite">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-ash">
                    <Sparkles className="w-3.5 h-3.5 text-acid-lime flex-shrink-0" />
                    <span>Every state is mathematically bounded to the 8px baseline scale.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Tokens Matrix Tab */
          <div className="p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-paper">Core Design Tokens</h3>
                <p className="text-[13px] text-mist">
                  Strict hex values powering the Linear Midnight Precision system.
                </p>
              </div>
              <span className="text-[11px] font-mono text-ash hidden sm:inline">
                Click any swatch to copy hex code
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {DESIGN_TOKENS.map((token) => (
                <button
                  key={token.variable}
                  onClick={() => copyToClipboard(token.value, token.variable)}
                  className="group p-4 bg-void border border-graphite hover:border-acid-lime/60 rounded-[8px] text-left transition-all hover:bg-void/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-[6px] border border-graphite shadow-sm"
                      style={{ backgroundColor: token.value }}
                    />
                    <span className="text-[11px] font-mono text-ash group-hover:text-acid-lime flex items-center gap-1 transition-colors">
                      {copiedToken === token.variable ? (
                        <>
                          <Check className="w-3 h-3 text-acid-lime" />
                          <span className="text-acid-lime">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{token.value}</span>
                        </>
                      )}
                    </span>
                  </div>
                  <h4 className="text-[13px] font-mono text-paper font-medium group-hover:text-acid-lime transition-colors">
                    {token.name}
                  </h4>
                  <p className="text-[11px] font-mono text-fog mt-0.5">{token.variable}</p>
                  <p className="text-[12px] text-ash mt-2">{token.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
