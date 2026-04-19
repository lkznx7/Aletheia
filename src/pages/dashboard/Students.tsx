import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, FileText, AlertTriangle, CheckCircle } from "lucide-react";

interface Submission {
  id: string;
  filename: string;
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
    pedagogicalReport?: string;
  };
}

export default function Students() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await api.submissions.getAll();
      setSubmissions(data.submissions || data || []);
    } catch (error: any) {
      console.error("Error loading submissions:", error);
      toast.error("Erro ao carregar submissions");
    } finally {
      setLoading(false);
    }
  };

  const getClassificationBadge = (submission: Submission) => {
    const analysis = submission.analysis?.textAnalysis;
    if (!analysis) {
      return <Badge variant="outline" className="text-muted-foreground">Pendente</Badge>;
    }

    const prob = analysis.iaProbability || 0;
    if (prob > 60) {
      return (
        <Badge className="bg-warning text-warning-foreground hover:bg-warning/80">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Alto Uso de IA
        </Badge>
      );
    }
    if (prob > 30) {
      return (
        <Badge className="bg-accent/80 text-accent-foreground hover:bg-accent/90">
          Construção Híbrida
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-success border-success/30">
        <CheckCircle className="w-3 h-3 mr-1" />
        Autoral
      </Badge>
    );
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
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Submissions</h1>
        <p className="text-muted-foreground mt-1">Acompanhe os trabalhos enviados e seus resultados de análise.</p>
      </div>

      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle>Lista de Trabalhos Enviados</CardTitle>
          <CardDescription>
            Visualize o status de análise e os resultados de cada submission.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum trabalho enviado ainda.</p>
              <p className="text-sm">Os alunos podem enviar através do código da turma.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Arquivo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prob. IA</TableHead>
                  <TableHead>Classificação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.filename}</TableCell>
                    <TableCell>
                      {sub.status === "analyzed" ? (
                        <Badge variant="outline" className="text-success">Analisado</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">Pendente</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {sub.analysis?.textAnalysis?.iaProbability !== undefined ? (
                        <span className={sub.analysis.textAnalysis.iaProbability > 50 ? "text-warning font-medium" : "text-success font-medium"}>
                          {sub.analysis.textAnalysis.iaProbability}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>{getClassificationBadge(sub)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary hover:text-primary-glow"
                          onClick={() => api.submissions.analyze(sub.id)}
                          disabled={sub.status === "analyzed"}
                        >
                          Analisar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}