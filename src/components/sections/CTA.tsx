import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-24 md:py-32 bg-dark text-primary-foreground relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 grain opacity-50" />
      <div aria-hidden className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl" />
      <div className="container relative text-center">
        <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-balance max-w-4xl mx-auto">
          Devolva ao professor a leitura crítica
          <span className="italic text-accent"> da escrita.</span>
        </h2>
        <p className="mt-8 text-lg text-primary-foreground/70 max-w-2xl mx-auto">
          Construído para o Hackathon Brasília Virtual — pronto para piloto em escolas públicas do DF.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-7 text-base font-medium">
            <Link to="/register">Inscrever minha escola <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-7 text-base font-medium border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
            Falar com o time
          </Button>
        </div>
      </div>
    </section>
  );
}
