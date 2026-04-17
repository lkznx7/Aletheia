import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, Sparkles } from "lucide-react";
import AnalysisPanel from "./AnalysisPanel";

const SAMPLE = `A Revolução Industrial começou na Inglaterra no século XVIII e transformou profundamente a sociedade europeia. As pessoas saíram do campo e foram pra cidade trabalhar em fábricas, o que mudou tudo na vida delas.

Sob a perspectiva multifacetada de uma transição paradigmática, é imperativo reconhecer que a confluência de fatores socioeconômicos engendrou uma reconfiguração estrutural sem precedentes no tecido social europeu, culminando em uma metamorfose civilizacional cuja amplitude transcende a mera substituição de modos produtivos.

Foi muito ruim pros operários no começo. Trabalhavam tipo 14 horas por dia e ganhavam pouco. Tinha criança trabalhando também (Wikipedia, 2023).

Conforme estudo de Silva (2024), 87,3% dos historiadores concordam que a invenção da máquina a vapor por James Watt em 1769 foi o ponto de virada definitivo do processo industrial moderno.`;

export default function LiveDemo() {
  const [stage, setStage] = useState<"idle" | "loading" | "done">("idle");
  const [text, setText] = useState("");

  const run = () => {
    setText(SAMPLE);
    setStage("loading");
    setTimeout(() => setStage("done"), 2200);
  };

  return (
    <section id="analise" className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">
            Análise ao vivo
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance">
            Cole um trabalho. Veja as evidências.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Esta é uma demonstração interativa com um texto de exemplo. Em produção,
            Lumiar aceita upload de PDF, DOCX e Google Docs.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Coluna esquerda — upload */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border-2 border-dashed border-border bg-card p-8 shadow-soft">
              <div className="h-14 w-14 rounded-xl bg-accent flex items-center justify-center mb-5">
                <Upload className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-display text-2xl mb-2">Envie um trabalho</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Arraste um arquivo aqui ou clique para colar um texto de demonstração
                e ver Lumiar em ação.
              </p>

              <div className="flex flex-col gap-2 mb-6">
                {["redacao_aluno_3B.pdf", "trabalho_historia.docx", "ensaio_filosofia.gdocs"].map((f) => (
                  <div key={f} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-muted/50 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{f}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={run}
                disabled={stage === "loading"}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary-glow font-medium"
              >
                {stage === "loading" ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analisando…</>
                ) : (
                  <><Sparkles className="mr-2 h-4 w-4" /> Carregar exemplo & analisar</>
                )}
              </Button>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Privacidade primeiro · sem armazenar conteúdos sensíveis
              </p>
            </div>
          </div>

          {/* Coluna direita — análise */}
          <div className="lg:col-span-3">
            {stage === "idle" && <EmptyState />}
            {stage === "loading" && <LoadingState />}
            {stage === "done" && <AnalysisPanel text={text} />}
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-border bg-card p-12 text-center min-h-[500px] flex flex-col items-center justify-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-5">
        <FileText className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="font-display text-2xl mb-2">Aguardando trabalho</h3>
      <p className="text-muted-foreground max-w-sm">
        Carregue o exemplo ao lado para ver evidências de IA, validação de fontes
        e a timeline de evolução do documento.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="relative rounded-2xl border border-border bg-card p-12 min-h-[500px] overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 h-1 bg-accent/40 animate-scan" />
      <div className="space-y-4">
        {[
          "Analisando padrões linguísticos…",
          "Comparando ritmo e vocabulário…",
          "Validando fontes citadas…",
          "Reconstruindo timeline de edição…",
        ].map((s, i) => (
          <div key={s} className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: `${i * 0.4}s` }}>
            <Loader2 className="h-4 w-4 animate-spin text-accent" />
            <span className="text-sm text-muted-foreground">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
