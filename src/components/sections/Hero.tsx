import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero grain pt-12 pb-16 md:pt-24 md:pb-36">
      <div className="container relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border shadow-soft mb-6 md:mb-8 animate-fade-up">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium tracking-wide">
              Hackathon Brasília Virtual · Desafio 2 · IA & Letramento Digital
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-balance text-foreground animate-fade-up delay-100">
            O copiloto do professor para enxergar
            <span className="italic text-primary-glow"> como </span>
            o trabalho foi feito.
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed text-pretty animate-fade-up delay-200">
            Aletheia é uma ferramenta pedagógica que abre a "caixa-preta" da redação digital.
            Mostra evidências do processo, valida fontes e devolve ao docente a leitura crítica
            da produção do aluno — sem julgar, sem caçar bruxas.
          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 animate-fade-up delay-300">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary-glow h-12 px-6 text-base font-medium">
              <Link to="/login">Analisar um trabalho <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6 text-base font-medium border-2">
              <FileText className="mr-2 h-4 w-4" /> Ver demonstração
            </Button>
          </div>

          <dl className="mt-10 md:mt-16 grid grid-cols-2 gap-4 md:gap-6 animate-fade-up delay-500">
            {[
              ["~7 min", "para análise completa"],
              ["3 camadas", "evidências, não vereditos"],
              ["PDF · DOCX · PPTX", "Google Docs · texto colado · Power Point"],
              ["WCAG AA+", "acessibilidade nativa"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-2 border-accent pl-3 md:pl-4">
                <dt className="font-display text-xl md:text-2xl lg:text-3xl text-foreground">{n}</dt>
                <dd className="text-xs text-muted-foreground mt-1 leading-snug">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div aria-hidden className="absolute top-20 right-[-20%] md:right-[-10%] w-[300px] md:w-[480px] h-[300px] md:h-[480px] rounded-full bg-accent/30 blur-3xl pointer-events-none" />
    </section>
  );
}
