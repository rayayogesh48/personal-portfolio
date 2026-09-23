"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface BlueprintContextType {
  isBlueprintActive: boolean;
  toggleBlueprint: () => void;
  setBlueprintActive: (active: boolean) => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
}

const BlueprintContext = createContext<BlueprintContextType | undefined>(undefined);

export function BlueprintProvider({ children }: { children: React.ReactNode }) {
  const [isBlueprintActive, setIsBlueprintActive] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const toggleBlueprint = () => setIsBlueprintActive((prev) => !prev);
  const setBlueprintActive = (active: boolean) => setIsBlueprintActive(active);
  const toggleCommandPalette = () => setIsCommandPaletteOpen((prev) => !prev);
  const openCommandPalette = () => setIsCommandPaletteOpen(true);
  const closeCommandPalette = () => setIsCommandPaletteOpen(false);

  // Global keyboard listener for ⌘K / Ctrl+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette on ⌘K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }

      // Close on Esc
      if (e.key === "Escape") {
        if (isCommandPaletteOpen) {
          setIsCommandPaletteOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen]);

  return (
    <BlueprintContext.Provider
      value={{
        isBlueprintActive,
        toggleBlueprint,
        setBlueprintActive,
        isCommandPaletteOpen,
        setCommandPaletteOpen: setIsCommandPaletteOpen,
        toggleCommandPalette,
        openCommandPalette,
        closeCommandPalette,
      }}
    >
      {children}
    </BlueprintContext.Provider>
  );
}

export function useBlueprint() {
  const context = useContext(BlueprintContext);
  if (!context) {
    throw new Error("useBlueprint must be used within a BlueprintProvider");
  }
  return context;
}
