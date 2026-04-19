import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, GraduationCap, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Submission {
  id: string;
  filename: string;
  text?: string;
  status: string;
  analyzedAt?: string;
  analysis?: {
    textAnalysis?: {
      iaProbability?: number;
      classification?: string;
      confidence?: number;
      reasons?: string[];
      recommendations?: string[];
    };
    writingAnalysis?: {
      thesisQuality?: string;
      argumentDevelopment?: string;
      languageRegister?: string;
    };
    sourcesAnalysis?: {
      citationsFound?: number;
      reliableSources?: number[];
    };
    pedagogicalReport?: string;
  };
}

export default function StudentDashboard() {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, [id]);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await api.submissions.getAll();
      const list = data.submissions || data || [];
      
      setSubmissions(list);
    } catch (error: any) {
      console.error("Error loading submissions:", error);
      toast.error("Erro ao carregar submissions");
    } finally {
      setLoading(false);
    }
  };

  const latestSubmission = submissions[0];

  const getStatusBadge = (sub: Submission) => {
    const analysis = sub.analysis?.textAnalysis;
    if (!analysis) return <span className="text-muted-foreground">Pendente</span>;

    const prob = analysis.iaProbability || 0;
    if (prob > 60) return <span className="text-warning font-medium">Alto Uso de IA</span>;
    if (prob > 30) return <span className="text-accent font-medium">Construção Híbrida</span>;
    return <span className="text-success font-medium">Autoral</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/alunos"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Análise de Submissions</h1>
          <p className="text-muted-foreground mt-1">Visualize os trabalhos enviados.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Trabalhos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{submissions.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Analisados</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {submissions.filter(s => s.analysis?.textAnalysis).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {submissions.filter(s => !s.analysis?.textAnalysis).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 pt-8 border-t border-border">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" /> Submissions
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Lista de todos os trabalhos enviados.</p>
          </div>
        </div>

        {submissions.length === 0 ? (
          <Card className="border-border/50 shadow-soft">
            <CardContent className="py-8 text-center text-muted-foreground">
              <p>Nenhum submission encontrado.</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/50 shadow-soft">
            <CardContent>
              <div className="space-y-4">
                {submissions.map((sub) => (
                  <div key={sub.id} className="p-4 border border-border/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{sub.filename}</div>
                      {getStatusBadge(sub)}
                    </div>
                    {sub.analysis?.textAnalysis && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <div>Prob. IA: {sub.analysis.textAnalysis.iaProbability}%</div>
                        {sub.analysis.pedagogicalReport && (
                          <div className="mt-2 p-2 bg-muted/50 rounded">
                            {sub.analysis.pedagogicalReport}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}