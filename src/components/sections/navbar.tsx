"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Menu, X, ArrowUpRight, Search } from "lucide-react";
import { useBlueprint } from "@/context/blueprint-context";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCommandPalette } = useBlueprint();

  const navLinks = [
    { label: "About Me", href: "/#about" },
    { label: "Case Studies", href: "/#case-studies" },
    { label: "Experience", href: "/#experience" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-void/90 backdrop-blur-md border-b border-graphite">
      <div className="max-w-[920px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Name / Wordmark */}
        <Logo name="Yogesh Raya" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isBlogActive = link.href === "/blog" && pathname.startsWith("/blog");
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-2.5 py-1 text-[13px] font-normal transition-all rounded-[6px] ${
                  isBlogActive
                    ? "text-acid-lime bg-acid-lime/[0.08] border border-acid-lime/20"
                    : "text-fog hover:text-acid-lime hover:bg-acid-lime/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Contact Link & Command Palette Trigger */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={openCommandPalette}
            className="group flex items-center gap-2 px-2.5 py-1 text-[12px] font-mono text-fog hover:text-paper bg-steel/30 hover:bg-steel/50 border border-graphite hover:border-acid-lime/40 rounded-[6px] transition-all"
            title="Open Command Palette (⌘K)"
          >
            <Search className="w-3 h-3 text-ash group-hover:text-acid-lime transition-colors" />
            <span className="text-[11px] text-ash group-hover:text-fog">Search</span>
            <kbd className="text-[10px] px-1 py-0.5 bg-void border border-graphite rounded text-ash group-hover:border-acid-lime/30 group-hover:text-acid-lime transition-colors">
              ⌘K
            </kbd>
          </button>

          <Link
            href="mailto:yogesh@example.com"
            className="group inline-flex items-center gap-1 text-[13px] font-normal text-fog hover:text-acid-lime transition-all py-1 px-2.5 rounded-[6px] hover:bg-acid-lime/[0.04]"
          >
            <span>yogesh@example.com</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ash group-hover:text-acid-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-mist hover:text-acid-lime rounded-[6px] hover:bg-white/[0.04] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-carbon border-b border-graphite px-6 py-3 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-mist hover:text-acid-lime text-[14px] py-1 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openCommandPalette();
            }}
            className="text-left text-mist hover:text-acid-lime text-[14px] py-1 transition-colors flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-ash" />
              Command Palette
            </span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-void border border-graphite rounded text-ash">
              ⌘K
            </kbd>
          </button>
          <div className="pt-2 border-t border-graphite">
            <Link
              href="mailto:yogesh@example.com"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[13px] text-paper hover:text-acid-lime inline-flex items-center gap-1 transition-colors group"
            >
              <span>Email: yogesh@example.com</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-ash group-hover:text-acid-lime transition-colors" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
