"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { themeStorageKey, type Theme } from "./theme-init";

type ThemeContextValue = { theme: Theme; setTheme: (theme: Theme) => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);

function allowedTheme(value: string | null): Theme {
  return value === "light" || value === "system" ? value : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setPreference] = useState<Theme>("dark");
  useEffect(() => {
    setPreference(allowedTheme(document.documentElement.dataset.theme ?? null));
    function synchronize(event: StorageEvent) {
      if (event.key !== themeStorageKey) return;
      const next = allowedTheme(event.newValue);
      document.documentElement.dataset.theme = next;
      setPreference(next);
    }
    window.addEventListener("storage", synchronize);
    return () => window.removeEventListener("storage", synchronize);
  }, []);
  function setTheme(next: Theme) {
    setPreference(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(themeStorageKey, next); } catch { /* Preference remains active this visit. */ }
  }
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("Theme control must be inside ThemeProvider");
  return value;
}
