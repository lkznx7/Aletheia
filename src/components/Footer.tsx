import Logo from "./Logo";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 md:py-12" role="contentinfo" aria-label="Rodapé">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
          <div className="max-w-md order-2 md:order-1">
            <Logo />
            <p className="mt-2 md:mt-3 text-sm text-muted-foreground leading-relaxed">
              Copiloto crítico para professores. Construído para o Hackathon Brasília Virtual —
              Desafio 2: IA & Letramento Digital.
            </p>
          </div>
          <nav aria-label="Navegação do rodapé" className="order-1 md:order-2">
            <ul className="flex flex-wrap gap-x-5 md:gap-x-8 gap-y-1.5 md:gap-y-2 text-sm">
              <li><a href="#problema" className="text-muted-foreground hover:text-foreground">O problema</a></li>
              <li><a href="#como-funciona" className="text-muted-foreground hover:text-foreground">Como funciona</a></li>
              <li><a href="#analise" className="text-muted-foreground hover:text-foreground">Análise</a></li>
              <li><a href="#diferenciais" className="text-muted-foreground hover:text-foreground">Diferenciais</a></li>
              <li><Link to="/inscrever" className="text-muted-foreground hover:text-foreground">Inscrever escola</Link></li>
              <li><Link to="/contato" className="text-muted-foreground hover:text-foreground">Falar com time</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t border-border flex flex-wrap items-center justify-between gap-2 md:gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Aletheia · Conformidade LGPD · WCAG 2.2 AA</p>
          <p>Feito com cuidado em Brasília · DF</p>
        </div>
      </div>
    </footer>
  );
}
