import { Contrast, Type, Pause, RotateCcw, Accessibility } from "lucide-react";
import { useA11y } from "@/contexts/AccessibilityContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AccessibilityBar() {
  const { highContrast, fontSize, reduceMotion, toggleHighContrast, cycleFontSize, toggleReduceMotion, reset } = useA11y();
  const [open, setOpen] = useState(false);

  return (
    <>
      <a href="#main" className="skip-link">Pular para o conteúdo</a>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {open && (
          <div
            role="region"
            aria-label="Opções de acessibilidade"
            className="bg-card border-2 border-border rounded-2xl shadow-elev p-3 flex flex-col gap-2 w-64 animate-fade-up"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground px-2 pt-1 pb-2 font-semibold">
              Acessibilidade
            </p>
            <Btn
              icon={<Contrast className="h-4 w-4" />}
              label="Alto contraste"
              active={highContrast}
              onClick={toggleHighContrast}
              ariaPressed={highContrast}
            />
            <Btn
              icon={<Type className="h-4 w-4" />}
              label={`Fonte: ${fontSize === "normal" ? "padrão" : fontSize === "large" ? "grande" : "extra grande"}`}
              active={fontSize !== "normal"}
              onClick={cycleFontSize}
              ariaPressed={fontSize !== "normal"}
            />
            <Btn
              icon={<Pause className="h-4 w-4" />}
              label="Reduzir movimento"
              active={reduceMotion}
              onClick={toggleReduceMotion}
              ariaPressed={reduceMotion}
            />
            <button
              onClick={reset}
              className="text-xs flex items-center gap-2 px-3 py-2 mt-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Restaurar padrões
            </button>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir opções de acessibilidade"
          aria-expanded={open}
          className={cn(
            "h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-elev flex items-center justify-center hover:scale-105 transition-transform border-2 border-accent",
            open && "shadow-glow"
          )}
        >
          <Accessibility className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}

function Btn({
  icon, label, active, onClick, ariaPressed,
}: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void; ariaPressed: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={ariaPressed}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all border",
        active
          ? "bg-accent text-accent-foreground border-accent shadow-soft"
          : "bg-transparent text-foreground border-border hover:bg-muted"
      )}
    >
      {icon}
      <span className="text-left flex-1">{label}</span>
    </button>
  );
}
