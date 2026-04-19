import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, GraduationCap, AlertTriangle, Users } from "lucide-react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Stats {
  totalClasses?: number;
  totalStudents?: number;
  totalSubmissions?: number;
  analyzedSubmissions?: number;
}

interface Submission {
  id: string;
  filename: string;
  analyzedAt?: string;
}

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({});
  const [recentSubmissions, setRecentSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [classesRes, submissionsRes] = await Promise.all([
        api.classes.getAll().catch(() => ({ classes: [] })),
        api.submissions.getAll().catch(() => ({ submissions: [] })),
      ]);

      const classes = classesRes.classes || [];
      const submissions = submissionsRes.submissions || submissionsRes || [];
      const analyzed = submissions.filter((s: Submission) => s.analyzedAt).length;

      setStats({
        totalClasses: classes.length,
        totalStudents: classes.reduce((acc: number, c: any) => acc + (c.studentIds?.length || 0), 0),
        totalSubmissions: submissions.length,
        analyzedSubmissions: analyzed,
      });

      setRecentSubmissions(submissions.slice(-5).reverse());
    } catch (error: any) {
      console.error("Error loading data:", error);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const overviewStats = [
    { label: "Total de Turmas", value: stats.totalClasses || 0, icon: GraduationCap, trend: "0" },
    { label: "Alunos Matriculados", value: stats.totalStudents || 0, icon: Users, trend: "0" },
    { label: "Trabalhos Enviados", value: stats.totalSubmissions || 0, icon: FileText, trend: "0" },
    { label: "Análises Realizadas", value: stats.analyzedSubmissions || 0, icon: AlertTriangle, trend: "0" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Visão Geral</h1>
        <p className="text-muted-foreground mt-1">Bem-vindo ao seu painel, {user?.name || "Professor"}.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="border-border/50 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={stat.trend.startsWith("+") ? "text-success font-medium" : stat.trend.startsWith("-") ? "text-destructive font-medium" : "text-muted-foreground"}>
                    {stat.trend}
                  </span> neste mês
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimos trabalhos enviados.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentSubmissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhuma atividade recente.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentSubmissions.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${sub.analyzedAt ? "bg-success" : "bg-warning animate-pulse"}`}></div>
                    <div className="flex-1 text-sm font-medium">{sub.filename}</div>
                    <div className="text-xs text-muted-foreground">
                      {sub.analyzedAt ? "Analisado" : "Pendente"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3 border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>Informações</CardTitle>
            <CardDescription>Sobre o sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium">Copiloto Crítico do Professor</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Sistema de análise de trabalhos acadêmicos com detecção de IA.
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Princípio</div>
                <div className="text-xs text-muted-foreground mt-1">
                  "Evidências, não veredito" — O sistema fornece evidências para discussão pedagógica, não acusações.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}