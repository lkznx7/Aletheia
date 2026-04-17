import { Heart, Shield, Plug, Accessibility } from "lucide-react";

const items = [
  {
    icon: Heart,
    title: "Apoio, não punição",
    body: "Lumiar nunca diz 'é IA' ou 'não é IA'. Mostra evidências e devolve ao professor a decisão pedagógica.",
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
    <section id="diferenciais" className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">
            Diferenciais
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance">
            Pedagógico antes de tecnológico.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className="group p-8 rounded-2xl border border-border bg-card hover:border-accent transition-all hover:shadow-elev flex gap-5"
            >
              <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <it.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-display text-2xl leading-tight mb-2">{it.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
