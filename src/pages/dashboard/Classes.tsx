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
import { Loader2 } from "lucide-react";

interface ClassItem {
  id: string;
  name: string;
  description: string;
  studentIds: string[];
  createdAt: string;
}

export default function Classes() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newClass, setNewClass] = useState({ name: "", description: "" });

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setLoading(true);
      const data = await api.classes.getAll();
      setClasses(data.classes || []);
    } catch (error: any) {
      console.error("Error loading classes:", error);
      toast.error("Erro ao carregar turmas");
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name) return;
    
    try {
      const created = await api.classes.create(newClass.name, newClass.description);
      setClasses([...classes, created]);
      setOpen(false);
      setNewClass({ name: "", description: "" });
      toast.success("Turma criada com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar turma");
    }
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
        <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Minhas Turmas</h1>
        <p className="text-muted-foreground mt-1">Acompanhe métricas e atividades consolidadas de suas turmas.</p>
      </div>
      
      <Card className="border-border/50 shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Listagem de Turmas</CardTitle>
            <CardDescription>Use o código da turma para enviar para novos alunos.</CardDescription>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-glow text-primary-foreground">Nova Turma</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleAddClass}>
                <DialogHeader>
                  <DialogTitle>Criar Nova Turma</DialogTitle>
                  <DialogDescription>
                    Insira o nome e uma descrição para a turma.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Turma</Label>
                    <Input 
                      id="name" 
                      value={newClass.name} 
                      onChange={e => setNewClass({...newClass, name: e.target.value})} 
                      placeholder="3º Ano B" 
                      className="col-span-3" 
                      required 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Descrição</Label>
                    <Input 
                      id="description" 
                      value={newClass.description} 
                      onChange={e => setNewClass({...newClass, description: e.target.value})} 
                      placeholder="Descrição opcional" 
                      className="col-span-3" 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar turma</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

        </CardHeader>
        <CardContent>
          {classes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma turma encontrada.</p>
              <p className="text-sm">Crie sua primeira turma para começar.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Turma</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-center">Alunos</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell className="text-muted-foreground">{cls.description || "—"}</TableCell>
                    <TableCell className="text-center">
                      {cls.studentIds?.length || 0}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow" asChild>
                        <Link to={`/dashboard/turmas/${cls.id}`}>Relatório</Link>
                      </Button>
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