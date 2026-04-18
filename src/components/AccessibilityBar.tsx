import { Contrast, Type, Pause, RotateCcw, Accessibility, Hand, Sun, Moon, Minus, Plus } from "lucide-react";
import { useA11y } from "@/contexts/AccessibilityContext";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function AccessibilityBar() {
  const { highContrast, fontSize, reduceMotion, toggleHighContrast, cycleFontSize, toggleReduceMotion, reset } = useA11y();
  const [open, setOpen] = useState(false);
  const [librasOpen, setLibrrasOpen] = useState(false);
  const librasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (librasRef.current && !librasRef.current.contains(e.target as Node)) {
        setLibrrasOpen(false);
      }
    };
    if (librasOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [librasOpen]);

  return (
    <>
      <a href="#main" className="skip-link">Pular para o conteúdo principal</a>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {librasOpen && (
          <div
            ref={librasRef}
            role="dialog"
            aria-label="Vídeo em LIBRAS"
            aria-modal="true"
            className="bg-card border-2 border-border rounded-2xl shadow-elev p-4 w-80 animate-fade-up"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Hand className="w-4 h-4" aria-hidden="true" />
                Interprete LIBRAS
              </h3>
              <button
                onClick={() => setLibrrasOpen(false)}
                aria-label="Fechar vídeo LIBRAS"
                className="text-muted-foreground hover:text-foreground"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div
              className="bg-muted rounded-lg aspect-video flex items-center justify-center"
              role="img"
              aria-label="Vídeo do intérprete de LIBRAS será exibido aqui"
            >
              <div className="text-center text-muted-foreground">
                <Sun className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Em breve</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Vídeo com tradução em Libras será integrado.
            </p>
          </div>
        )}

        {open && (
          <div
            role="region"
            aria-label="Opções de acessibilidade"
            className="bg-card border-2 border-border rounded-2xl shadow-elev p-3 flex flex-col gap-2 w-64 animate-fade-up"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground px-2 pt-1 pb-2 font-semibold">
              Acessibilidade WCAG 2.2
            </p>
            <Btn
              icon={highContrast ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
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
              onClick={() => setLibrrasOpen(true)}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all border",
                "bg-transparent text-foreground border-border hover:bg-muted"
              )}
              aria-pressed={librasOpen}
            >
              <Hand className="h-4 w-4" aria-hidden="true" />
              <span className="text-left flex-1">Libras (Vídeo)</span>
            </button>
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
          <Accessibility className="h-6 w-6" aria-hidden="true" />
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
