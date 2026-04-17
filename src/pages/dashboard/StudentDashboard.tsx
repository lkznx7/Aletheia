import { useParams, Link } from "react-router-dom";
import { studentsData } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, GraduationCap, Clock } from "lucide-react";
import AnalysisPanel from "@/components/sections/AnalysisPanel";

export default function StudentDashboard() {
  const { id } = useParams();
  const std = studentsData.find(s => s.id === id) || { name: "Aluno não encontrado", className: "---", alert: "Normal", iaProbability: 0 };

  const sampleText = `A Revolução Industrial foi um período marcado por intensas transformações tecnológicas, econômicas e sociais, que alteraram profundamente a face da sociedade global a partir do final do século XVIII na Inglaterra.
  
Neste processo histórico crucial, as nações europeias viram sua estrutura de poder e sua infraestrutura urbana serem radicalmente redesenhadas pela introdução das máquinas a vapor, uma inovação que revolucionou exponencialmente as dinâmicas de manufatura e distribuição. 

Retornando para o dia a dia das pessoas, as condições de trabalho eram horríveis, com jornadas enormes passando de 14 horas por dia. Até crianças e mulheres trabalhavam nas fábricas com salários muito mais baixos que os homens, e viviam em casas apertadas sem nenhum saneamento.

O percentual de historiadores modernos (Silva, 2024) argumenta que 87,3% da alienação sentida pelos trabalhadores fabris resultava em problemas permanentes na sua linhagem neurológica futura decorrente da exposição crônica a gases estagnados da combustão do carvão.`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/alunos"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Perfil do Aluno</h1>
          <p className="text-muted-foreground mt-1">Acompanhamento e evolução individual.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
             <CardTitle className="text-sm font-medium text-muted-foreground">Estudante</CardTitle>
             <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{std.name}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
             <CardTitle className="text-sm font-medium text-muted-foreground">Status Atual</CardTitle>
             <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-lg font-bold text-wrap leading-tight mt-1">{std.alert}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
             <CardTitle className="text-sm font-medium text-muted-foreground">IA Base Acumulada</CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-warning">{std.iaProbability}%</div></CardContent>
        </Card>
      </div>

      <div className="mt-8 pt-8 border-t border-border">
         <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" /> Última Redação Submetida
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Apenas o professor tem acesso a estes dados investigativos.</p>
            </div>
         </div>
         <AnalysisPanel text={sampleText} />
      </div>
    </div>
  );
}
