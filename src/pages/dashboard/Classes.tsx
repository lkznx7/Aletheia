import { useState } from "react";
import { Link } from "react-router-dom";
import { classesData } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function Classes() {
  const [classes, setClasses] = useState(classesData);
  const [open, setOpen] = useState(false);
  const [newClass, setNewClass] = useState({ name: "", code: "" });

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name || !newClass.code) return;
    
    setClasses([...classes, { 
       id: Math.random().toString(), 
       name: newClass.name, 
       code: newClass.code, 
       totalStudents: 0, 
       averageScore: 0, 
       warnings: 0 
    }]);
    
    setOpen(false);
    setNewClass({ name: "", code: "" });
    toast.success("Turma criada com sucesso!");
  };

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
                    Insira o nome e um código identificador único para compartilhar com seus alunos.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Turma</Label>
                    <Input id="name" value={newClass.name} onChange={e => setNewClass({...newClass, name: e.target.value})} placeholder="3º Ano B" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">Código</Label>
                    <Input id="code" value={newClass.code} onChange={e => setNewClass({...newClass, code: e.target.value})} placeholder="#TRM-3B-24" className="col-span-3" required />
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Turma</TableHead>
                <TableHead className="text-center">Total de Alunos</TableHead>
                <TableHead className="text-center">Avisos Pendentes</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-mono text-xs">{cls.code}</TableCell>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell className="text-center">{cls.totalStudents}</TableCell>
                  <TableCell className="text-center">
                    {cls.warnings > 0 ? (
                      <Badge variant="destructive" className="bg-warning text-warning-foreground border-transparent hover:bg-warning/80">
                        {cls.warnings} ocorrência{cls.warnings > 1 ? 's' : ''}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-success border-success/50">Tudo OK</Badge>
                    )}
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
        </CardContent>
      </Card>
    </div>
  );
}
