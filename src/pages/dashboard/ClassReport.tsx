import { useParams, Link } from "react-router-dom";
import { classesData, studentsData } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function ClassReport() {
  const { id } = useParams();
  const cls = classesData.find(c => c.id === id) || { name: "Turma não encontrada", code: "---", totalStudents: 0 };
  const students = studentsData.filter(s => s.classId === id);

  const pieData = [
    { name: "Autoral", value: 60, color: "hsl(var(--success))" },
    { name: "Construção Híbrida", value: 25, color: "hsl(var(--accent))" },
    { name: "Sinalização de IA", value: 15, color: "hsl(var(--warning))" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/turmas"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Relatório da {cls.name}</h1>
          <p className="text-muted-foreground mt-1">Código de acesso: {cls.code}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         <Card className="col-span-1 shadow-soft">
           <CardHeader>
             <CardTitle>Composição Recente</CardTitle>
             <CardDescription>Detecção consolidada dos textos textuais nesta turma.</CardDescription>
           </CardHeader>
           <CardContent className="h-[200px] flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
               </PieChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>
         <Card className="col-span-2 shadow-soft">
           <CardHeader>
             <CardTitle>Alunos Atritados</CardTitle>
             <CardDescription>Estudantes que demandam maior atenção.</CardDescription>
           </CardHeader>
           <CardContent>
             {students.length > 0 ? (
               <ul className="space-y-2">
                 {students.map(s => (
                   <li key={s.id} className="text-sm font-medium p-2 border-b border-border/50 flex justify-between">
                     <span>{s.name}</span>
                     <span className="text-warning-foreground">{s.iaProbability}% IA Detectada</span>
                   </li>
                 ))}
               </ul>
             ) : (
                <div className="text-sm text-muted-foreground pt-4">Nenhum aluno cadastrado com alerta nesta turma.</div>
             )}
           </CardContent>
         </Card>
      </div>
    </div>
  );
}
