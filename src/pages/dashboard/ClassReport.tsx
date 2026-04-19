import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ClassItem {
  id: string;
  name: string;
  description: string;
  studentIds: string[];
  createdAt: string;
}

export default function ClassReport() {
  const { id } = useParams();
  const [cls, setClass] = useState<ClassItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadClass(id);
    }
  }, [id]);

  const loadClass = async (classId: string) => {
    try {
      setLoading(true);
      const data = await api.classes.getById(classId);
      setClass(data);
    } catch (error: any) {
      console.error("Error loading class:", error);
      toast.error("Erro ao carregar turma");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!cls) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard/turmas"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Turma não encontrada</h1>
          </div>
        </div>
        <Card className="border-border/50 shadow-soft">
          <CardContent className="py-8 text-center text-muted-foreground">
            <p>Esta turma não foi encontrada.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/turmas"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Relatório da {cls.name}</h1>
          <p className="text-muted-foreground mt-1">{cls.description || "Sem descrição"}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-1 shadow-soft">
          <CardHeader>
            <CardTitle>Informações da Turma</CardTitle>
            <CardDescription>Detalhes consolidados.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Total de Alunos</div>
                <div className="text-2xl font-bold">{cls.studentIds?.length || 0}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Data de Criação</div>
                <div className="text-sm">{cls.createdAt ? new Date(cls.createdAt).toLocaleDateString("pt-BR") : "—"}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 shadow-soft">
          <CardHeader>
            <CardTitle>Alunos Matriculados</CardTitle>
            <CardDescription>Estudantes desta turma.</CardDescription>
          </CardHeader>
          <CardContent>
            {!cls.studentIds || cls.studentIds.length === 0 ? (
              <div className="text-sm text-muted-foreground pt-4">
                Nenhum aluno matriculado nesta turma ainda.
              </div>
            ) : (
              <ul className="space-y-2">
                {cls.studentIds.map((studentId, index) => (
                  <li key={index} className="text-sm font-medium p-2 border-b border-border/50">
                    Aluno #{index + 1}: {studentId}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}