import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, XCircle, MessageCircleQuestion, History, FileSearch, Link2 } from "lucide-react";

type Tab = "evidencias" | "fontes" | "timeline" | "conversa";

interface Props { text: string }

const segments = [
  { type: "human", note: "Tom natural, vocabulário coerente com o ano escolar." },
  { type: "ai", note: "Mudança brusca de registro. Vocabulário 4x mais denso. Padrão típico de IA generativa." },
  { type: "human", note: "Retoma o tom anterior — possível indício de colagem entre voz própria e gerada." },
  { type: "fabricated", note: "Estatística suspeita: número exato sem fonte rastreável. Citação 'Silva (2024)' não encontrada." },
];

const sources = [
  {
    label: "Wikipedia, 2023",
    status: "warn",
    icon: AlertTriangle,
    note: "Fonte aberta sem revisão por pares. Aceitável como ponto de partida, não como autoridade primária.",
  },
  {
    label: "Silva (2024) — '87,3% dos historiadores'",
    status: "fail",
    icon: XCircle,
    note: "Citação não localizada em bases acadêmicas (Scielo, Google Scholar, JSTOR). Possível alucinação de IA.",
  },
  {
    label: "Hobsbawm, E. (1962). The Age of Revolution",
    status: "ok",
    icon: CheckCircle2,
    note: "Obra canônica. Autoria verificada. Recomende ao aluno consultar a edição em português pela Paz e Terra.",
  },
];

const timeline = [
  { t: "14:02", e: "Documento criado", n: "Documento em branco." },
  { t: "14:18", e: "Primeiro parágrafo escrito", n: "352 caracteres em 16min — ritmo compatível com escrita ativa." },
  { t: "14:22", e: "Pausa de 4min", n: "Sem atividade. Possível leitura/pesquisa." },
  { t: "14:23", e: "Bloco de 1.840 caracteres colado", n: "Inserção instantânea. Origem externa provável.", flag: true },
  { t: "14:31", e: "Edições mínimas no bloco colado", n: "5 caracteres trocados em 8min. Baixa interação." },
  { t: "14:45", e: "Conclusão escrita", n: "Volta ao ritmo natural. Tom próprio retomado." },
];

export default function AnalysisPanel({ text }: Props) {
  const [tab, setTab] = useState<Tab>("evidencias");

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "evidencias", label: "Evidências", icon: FileSearch },
    { id: "fontes", label: "Fontes", icon: Link2 },
    { id: "timeline", label: "Timeline", icon: History },
    { id: "conversa", label: "Conversa pedagógica", icon: MessageCircleQuestion },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card shadow-elev overflow-hidden animate-fade-up">
      {/* header */}
      <div className="flex items-center justify-between p-5 border-b border-border bg-muted/30">
        <div>
          <p className="text-xs text-muted-foreground">Aluno · Maria H. — Turma 3B</p>
          <h3 className="font-display text-xl">Revolução Industrial — análise pedagógica</h3>
        </div>
        <ScoreBadge />
      </div>

      {/* tabs */}
      <div role="tablist" className="flex border-b border-border overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors",
              tab === t.id
                ? "border-accent text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        {tab === "evidencias" && <Evidencias text={text} />}
        {tab === "fontes" && <Fontes />}
        {tab === "timeline" && <Timeline />}
        {tab === "conversa" && <Conversa />}
      </div>
    </div>
  );
}

function ScoreBadge() {
  return (
    <div className="text-right">
      <div className="text-xs text-muted-foreground mb-0.5">Nível de evidência</div>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/15 border border-warning/40">
        <span className="h-2 w-2 rounded-full bg-warning animate-pulse-soft" />
        <span className="text-xs font-semibold text-warning-foreground">Atenção · revisar com aluno</span>
      </div>
    </div>
  );
}

function Evidencias({ text }: { text: string }) {
  const paras = text.split("\n\n");
  const colors = {
    human: "border-success/40 bg-success/5",
    ai: "border-warning/50 bg-warning/10",
    fabricated: "border-destructive/50 bg-destructive/10",
  } as const;
  const labels = {
    human: { t: "Voz própria provável", c: "text-success" },
    ai: { t: "Padrão típico de IA", c: "text-warning-foreground" },
    fabricated: { t: "Possível fabricação", c: "text-destructive" },
  } as const;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Cada bloco abaixo foi analisado individualmente. Hover ou foque para ler a justificativa.
        <strong className="text-foreground"> Lumiar não decide</strong> — apresenta evidências.
      </p>
      {paras.map((p, i) => {
        const seg = segments[i] ?? segments[0];
        const cls = colors[seg.type as keyof typeof colors];
        const lab = labels[seg.type as keyof typeof labels];
        return (
          <div key={i} className={cn("border-l-4 rounded-r-lg p-4 transition-all", cls)}>
            <div className={cn("text-xs font-semibold uppercase tracking-wider mb-2", lab.c)}>
              {lab.t}
            </div>
            <p className="text-sm leading-relaxed mb-3">{p}</p>
            <p className="text-xs text-muted-foreground italic border-t border-border/60 pt-2">
              ↳ {seg.note}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function Fontes() {
  const styles = {
    ok: "border-success/40 bg-success/5",
    warn: "border-warning/50 bg-warning/10",
    fail: "border-destructive/50 bg-destructive/10",
  } as const;
  const iconClr = {
    ok: "text-success",
    warn: "text-warning-foreground",
    fail: "text-destructive",
  } as const;
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Cada citação foi verificada em bases acadêmicas, repositórios abertos e índices de credibilidade.
      </p>
      {sources.map((s) => (
        <div key={s.label} className={cn("border-l-4 rounded-r-lg p-4 flex gap-4", styles[s.status as keyof typeof styles])}>
          <s.icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconClr[s.status as keyof typeof iconClr])} />
          <div className="flex-1">
            <div className="font-medium text-sm mb-1">{s.label}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Timeline() {
  return (
    <div className="relative">
      <div aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
      <ol className="space-y-5">
        {timeline.map((t, i) => (
          <li key={i} className="relative pl-8">
            <span
              className={cn(
                "absolute left-0 top-1.5 h-4 w-4 rounded-full border-2",
                t.flag ? "bg-warning border-warning" : "bg-card border-border"
              )}
            />
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <span className="font-mono text-xs text-muted-foreground">{t.t}</span>
              <span className="font-medium text-sm">{t.e}</span>
              {t.flag && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-warning/20 text-warning-foreground">
                  Sinalizado
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{t.n}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Conversa() {
  const perguntas = [
    "Você poderia me contar com suas palavras o que mais te chamou atenção sobre a Revolução Industrial?",
    "Como você chegou até a fonte 'Silva (2024)'? Foi indicação, busca, ou sugestão de alguma ferramenta?",
    "Qual destes três parágrafos você sente que foi o mais difícil de escrever? Por quê?",
    "Se eu tirasse o segundo parágrafo, sua argumentação ainda se sustentaria? Como?",
  ];
  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-accent-soft border border-accent/30">
        <p className="text-sm leading-relaxed">
          <strong>Tom sugerido:</strong> curioso, não acusatório. O objetivo é desenvolver
          senso crítico, não obter confissão. Comece elogiando o que estiver bom.
        </p>
      </div>
      <ol className="space-y-3">
        {perguntas.map((p, i) => (
          <li key={i} className="flex gap-4 p-4 rounded-lg border border-border bg-background hover:border-accent transition-colors">
            <span className="font-display text-2xl text-accent">{(i + 1).toString().padStart(2, "0")}</span>
            <p className="text-sm leading-relaxed pt-1">{p}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
