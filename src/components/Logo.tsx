import { Sparkles } from "lucide-react";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const text = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";
  const dot = size === "lg" ? "h-3 w-3" : "h-2 w-2";
  return (
    <a href="#" className="flex items-center gap-2.5 group" aria-label="Lumiar — início">
      <div className="relative h-9 w-9 rounded-xl bg-primary flex items-center justify-center overflow-hidden">
        <Sparkles className="h-5 w-5 text-accent" strokeWidth={2.2} />
        <span className={`absolute bottom-1.5 right-1.5 ${dot} rounded-full bg-accent animate-pulse-soft`} />
      </div>
      <span className={`font-display ${text} text-foreground tracking-tight`}>
        Lumiar<span className="text-accent">.</span>
      </span>
    </a>
  );
}
