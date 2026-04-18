import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type FontSize = "normal" | "large" | "xlarge";
type Theme = "light" | "dark" | "system";

interface A11yState {
  highContrast: boolean;
  fontSize: FontSize;
  reduceMotion: boolean;
  theme: Theme;
  toggleHighContrast: () => void;
  cycleFontSize: () => void;
  toggleReduceMotion: () => void;
  cycleTheme: () => void;
  reset: () => void;
}

const Ctx = createContext<A11yState | null>(null);

const STORAGE_KEY = "aletheia-a11y";

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHC] = useState(false);
  const [fontSize, setFS] = useState<FontSize>("normal");
  const [reduceMotion, setRM] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        setHC(!!s.highContrast);
        setFS(s.fontSize ?? "normal");
        setRM(!!s.reduceMotion);
        setTheme(s.theme ?? "light");
      }
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("high-contrast", highContrast);
    root.classList.toggle("text-large", fontSize === "large");
    root.classList.toggle("text-xlarge", fontSize === "xlarge");
    root.classList.toggle("reduce-motion", reduceMotion);
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ highContrast, fontSize, reduceMotion, theme }));
    } catch {}
  }, [highContrast, fontSize, reduceMotion, theme]);

  const value: A11yState = {
    highContrast,
    fontSize,
    reduceMotion,
    theme,
    toggleHighContrast: () => setHC((v) => !v),
    cycleFontSize: () =>
      setFS((v) => (v === "normal" ? "large" : v === "large" ? "xlarge" : "normal")),
    toggleReduceMotion: () => setRM((v) => !v),
    cycleTheme: () => setTheme((v) => (v === "light" ? "dark" : "light")),
    reset: () => {
      setHC(false);
      setFS("normal");
      setRM(false);
      setTheme("light");
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useA11y() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useA11y must be used within AccessibilityProvider");
  return c;
}
