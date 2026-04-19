import { Heart, Shield, Plug, Accessibility } from "lucide-react";

const items = [
  {
    icon: Heart,
    title: "Apoio, não punição",
    body: "Aletheia nunca diz 'é IA' ou 'não é IA'. Mostra evidências e devolve ao professor a decisão pedagógica.",
  },
  {
    icon: Plug,
    title: "Integração fluida",
    body: "PDF, Word, Google Docs. Sem mudar fluxo, sem instalar nada complexo, sem tomar tempo extra do professor.",
  },
  {
    icon: Accessibility,
    title: "Inclusão digital",
    body: "Interface amigável para professores sem familiaridade com tecnologia. Alto contraste, fontes ajustáveis, navegação por teclado.",
  },
  {
    icon: Shield,
    title: "Ética e privacidade",
    body: "Trabalhos não são armazenados após análise. Conformidade com LGPD e diretrizes da SEEDF.",
  },
];

export default function Differentials() {
  return (
    <section id="diferenciais" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container">
        <div className="max-w-3xl mb-10 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">
            Diferenciais
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
            Pedagógico antes de tecnológico.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className="group p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-accent transition-all hover:shadow-elev flex gap-4 md:gap-5"
            >
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <it.icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-display text-lg md:text-2xl leading-tight mb-2">{it.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
