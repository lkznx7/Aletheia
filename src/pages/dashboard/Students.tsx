import { Link } from "react-router-dom";
import { studentsData } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Students() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Meus Alunos</h1>
        <p className="text-muted-foreground mt-1">Busque alunos específicos e reveja o histórico pedagógico.</p>
      </div>

      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
          <CardDescription>Atenção aos alunos com indicativos da cor amarela para abordagem pedagógica.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Turma</TableHead>
                <TableHead className="text-center">Redações</TableHead>
                <TableHead>Padrão Gerativo</TableHead>
                <TableHead className="text-right">Relatórios</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsData.map((std) => (
                <TableRow key={std.id}>
                  <TableCell className="font-medium">{std.name}</TableCell>
                  <TableCell>{std.className}</TableCell>
                  <TableCell className="text-center">{std.redacoes}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                       <span className={`text-xs font-bold w-8 text-right ${std.iaProbability > 50 ? 'text-warning' : 'text-success'}`}>
                         {std.iaProbability}%
                       </span>
                       <Badge variant={std.alert === "Totalmente Autoral" ? "outline" : "default"} 
                              className={
                                std.alert === "Uso Intensivo de IA" ? "bg-warning text-warning-foreground hover:bg-warning/80" : 
                                std.alert === "Construção Híbrida" ? "bg-accent/80 text-accent-foreground hover:bg-accent/90" :
                                "text-muted-foreground bg-transparent border-success/30"
                              }>
                         {std.alert}
                       </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow" asChild>
                      <Link to={`/dashboard/alunos/${std.id}`}>Dashboard Individual</Link>
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
