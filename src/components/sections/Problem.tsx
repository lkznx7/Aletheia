import { AlertTriangle, EyeOff, Scale } from "lucide-react";

const items = [
  {
    icon: EyeOff,
    title: "A aprendizagem virou caixa-preta",
    body: "O professor recebe um arquivo pronto, mas perdeu a visibilidade de como ele foi construído. O processo desapareceu.",
  },
  {
    icon: AlertTriangle,
    title: "Fontes sem qualquer credibilidade",
    body: "Conteúdo impecável, citações inventadas, sites duvidosos. Distinguir esforço real de automação pura ficou quase impossível.",
  },
  {
    icon: Scale,
    title: "Avaliação injusta de ambos os lados",
    body: "O aluno finge que aprende, o docente finge que avalia. O propósito do ensino se esvazia silenciosamente.",
  },
];

export default function Problem() {
  return (
    <section id="problema" className="py-16 md:py-32 bg-background">
      <div className="container">
        <div className="max-w-3xl mb-10 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">
            O problema
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
            Avaliar virou um jogo de adivinhação.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {items.map((it) => (
            <div key={it.title} className="bg-card p-6 md:p-8 lg:p-10 flex flex-col gap-4 md:gap-5">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-accent-soft flex items-center justify-center">
                <it.icon className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" strokeWidth={1.8} />
              </div>
              <h3 className="font-display text-xl md:text-2xl leading-tight">{it.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
