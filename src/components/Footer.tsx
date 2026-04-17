import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-md">
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Copiloto crítico para professores. Construído para o Hackathon Brasília Virtual —
              Desafio 2: IA & Letramento Digital.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <a href="#problema" className="text-muted-foreground hover:text-foreground">O problema</a>
            <a href="#como-funciona" className="text-muted-foreground hover:text-foreground">Como funciona</a>
            <a href="#analise" className="text-muted-foreground hover:text-foreground">Análise</a>
            <a href="#diferenciais" className="text-muted-foreground hover:text-foreground">Diferenciais</a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Lumiar · Conformidade LGPD · WCAG 2.1 AA</p>
          <p>Feito com cuidado em Brasília · DF</p>
        </div>
      </div>
    </footer>
  );
}
