import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, FileText, Plus, Calendar, Clock } from "lucide-react";

interface Assignment {
  id: string;
  classId: string;
  title: string;
  description: string;
  dueDate?: string;
  createdAt: string;
}

interface ClassItem {
  id: string;
  name: string;
}

export default function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ classId: "", title: "", description: "", dueDate: "" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [assignmentsRes, classesRes] = await Promise.all([
        api.assignments.getAll().catch(() => ({ assignments: [] })),
        api.classes.getAll().catch(() => ({ classes: [] })),
      ]);
      setAssignments(assignmentsRes.assignments || []);
      setClasses(classesRes.classes || []);
    } catch (error: any) {
      console.error("Error loading data:", error);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignment.classId || !newAssignment.title) return;

    try {
      setCreating(true);
      const created = await api.assignments.create({
        classId: newAssignment.classId,
        title: newAssignment.title,
        description: newAssignment.description,
        dueDate: newAssignment.dueDate || undefined,
      });
      setAssignments([...assignments, created]);
      setOpen(false);
      setNewAssignment({ classId: "", title: "", description: "", dueDate: "" });
      toast.success("Tarefa criada com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar tarefa");
    } finally {
      setCreating(false);
    }
  };

  const getClassName = (classId: string) => {
    const cls = classes.find(c => c.id === classId);
    return cls?.name || classId;
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
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
        <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Tarefas</h1>
        <p className="text-muted-foreground mt-1">Gerencie as tarefas da suas turmas.</p>
      </div>

      <Card className="border-border/50 shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Lista de Tarefas</CardTitle>
            <CardDescription>Crie e gerencie tarefas para suas turmas.</CardDescription>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-glow text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Nova Tarefa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleCreate}>
                <DialogHeader>
                  <DialogTitle>Criar Nova Tarefa</DialogTitle>
                  <DialogDescription>
                    Defina os detalhes da tarefa que os alunos deverão entregar.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="classId">Turma</Label>
                    <select
                      id="classId"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newAssignment.classId}
                      onChange={e => setNewAssignment({ ...newAssignment, classId: e.target.value })}
                      required
                    >
                      <option value="">Selecione uma turma</option>
                      {classes.map(cls => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Título da Tarefa</Label>
                    <Input
                      id="title"
                      value={newAssignment.title}
                      onChange={e => setNewAssignment({ ...newAssignment, title: e.target.value })}
                      placeholder="Redacao sobre"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                      id="description"
                      value={newAssignment.description}
                      onChange={e => setNewAssignment({ ...newAssignment, description: e.target.value })}
                      placeholder="Descrição opcional"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Data de Entrega</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newAssignment.dueDate}
                      onChange={e => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={creating}>
                    {creating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando...
                      </>
                    ) : (
                      "Criar Tarefa"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

        </CardHeader>
        <CardContent>
          {assignments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma tarefa encontrada.</p>
              <p className="text-sm">Crie sua primeira tarefa para os alunos.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Turma</TableHead>
                  <TableHead>Data de Entrega</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map(assignment => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">{assignment.title}</TableCell>
                    <TableCell>{getClassName(assignment.classId)}</TableCell>
                    <TableCell>
                      {assignment.dueDate ? (
                        <span className={isOverdue(assignment.dueDate) ? "text-destructive" : ""}>
                          {new Date(assignment.dueDate).toLocaleDateString("pt-BR")}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={isOverdue(assignment.dueDate) ? "destructive" : "outline"}>
                        {isOverdue(assignment.dueDate) ? "Expirada" : "Ativa"}
                      </Badge>
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