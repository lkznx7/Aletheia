import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type FontSize = "normal" | "large" | "xlarge";

interface A11yState {
  highContrast: boolean;
  fontSize: FontSize;
  reduceMotion: boolean;
  toggleHighContrast: () => void;
  cycleFontSize: () => void;
  toggleReduceMotion: () => void;
  reset: () => void;
}

const Ctx = createContext<A11yState | null>(null);

const STORAGE_KEY = "lumiar-a11y";

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHC] = useState(false);
  const [fontSize, setFS] = useState<FontSize>("normal");
  const [reduceMotion, setRM] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        setHC(!!s.highContrast);
        setFS(s.fontSize ?? "normal");
        setRM(!!s.reduceMotion);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("high-contrast", highContrast);
    root.classList.toggle("text-large", fontSize === "large");
    root.classList.toggle("text-xlarge", fontSize === "xlarge");
    root.classList.toggle("reduce-motion", reduceMotion);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ highContrast, fontSize, reduceMotion }));
    } catch {}
  }, [highContrast, fontSize, reduceMotion]);

  const value: A11yState = {
    highContrast,
    fontSize,
    reduceMotion,
    toggleHighContrast: () => setHC((v) => !v),
    cycleFontSize: () =>
      setFS((v) => (v === "normal" ? "large" : v === "large" ? "xlarge" : "normal")),
    toggleReduceMotion: () => setRM((v) => !v),
    reset: () => {
      setHC(false);
      setFS("normal");
      setRM(false);
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useA11y() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useA11y must be used within AccessibilityProvider");
  return c;
}
