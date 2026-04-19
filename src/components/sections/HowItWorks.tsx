import { Upload, ScanText, Link2, ClipboardCheck } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Upload,
    title: "Receba o trabalho",
    body: "PDF, DOCX, link do Google Docs ou texto colado. Aletheia se integra ao fluxo que o professor já tem.",
  },
  {
    n: "02",
    icon: ScanText,
    title: "Leitura forense",
    body: "Análise multi-camada de padrões: mudanças bruscas de tom, ritmo da escrita, vocabulário, perplexidade.",
  },
  {
    n: "03",
    icon: Link2,
    title: "Validação de fontes",
    body: "Cada citação é checada: o link existe? Há autoria? A informação tem evidência? Veículo é confiável?",
  },
  {
    n: "04",
    icon: ClipboardCheck,
    title: "Conversa pedagógica",
    body: "Um relatório com perguntas para fazer ao aluno. Não um veredito — um ponto de partida para diálogo.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 md:py-24 lg:py-32 bg-dark text-primary-foreground relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 grain opacity-40" />
      <div className="container relative">
        <div className="max-w-3xl mb-10 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">
            Como funciona
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
            Quatro camadas de evidência. <em className="text-accent not-italic">Nenhum veredito.</em>
          </h2>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative p-5 md:p-7 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/50 transition-colors group"
            >
              <span className="font-display text-4xl md:text-5xl text-accent/40 group-hover:text-accent transition-colors">
                {s.n}
              </span>
              <s.icon className="h-6 w-6 md:h-7 md:w-7 text-accent mt-3 md:mt-4 mb-3 md:mb-4" strokeWidth={1.8} />
              <h3 className="font-display text-lg md:text-xl mb-2 leading-snug">{s.title}</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
