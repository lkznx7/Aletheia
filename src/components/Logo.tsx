import logoImg from "/logo-aletheia.png";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-12 w-12",
  };
  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };
  const imgSize = sizes[size];
  const textSize = textSizes[size];
  return (
    <a href="#" className="flex items-center gap-2.5 group" aria-label="Aletheia — início">
      <img 
        src={logoImg} 
        alt="Logo Aletheia" 
        className={`${imgSize} rounded-lg object-contain`}
      />
      <span className={`font-display ${textSize} text-foreground tracking-tight`}>
        Aletheia<span className="text-accent">.</span>
      </span>
    </a>
  );
}