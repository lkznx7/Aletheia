import { overviewStats, chartData } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, GraduationCap, AlertTriangle, Users } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Overview() {
  const icons = [Users, GraduationCap, FileText, AlertTriangle];
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Visão Geral</h1>
        <p className="text-muted-foreground mt-1">Bem-vindo ao seu painel Lumiar.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat, i) => {
          const Icon = icons[i];
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
             <CardTitle>Histórico de Análises (Meses)</CardTitle>
             <CardDescription>Comparativo de textos autorais x traços de IA gerativa.</CardDescription>
           </CardHeader>
           <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                 <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} tick={{fill: "hsl(var(--muted-foreground))"}} />
                 <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{fill: "hsl(var(--muted-foreground))"}} />
                 <Tooltip cursor={{fill: 'hsl(var(--muted)/0.3)'}} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                 <Bar dataKey="autoral" stackId="a" fill="hsl(var(--success))" radius={[0, 0, 0, 0]} name="Autoral" />
                 <Bar dataKey="hibrido" stackId="a" fill="hsl(var(--accent))" radius={[0, 0, 0, 0]} name="Construção Híbrida" />
                 <Bar dataKey="ia" stackId="a" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} name="Sinalização de IA" />
               </BarChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>
         <Card className="col-span-3 border-border/50 shadow-soft">
           <CardHeader>
             <CardTitle>Últimas Correções</CardTitle>
             <CardDescription>Métricas de triagem rápida dos seus alunos.</CardDescription>
           </CardHeader>
           <CardContent>
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-success"></div>
                  <div className="flex-1 text-sm font-medium">Revolução Francesa</div>
                  <div className="text-xs text-muted-foreground">Maria H.</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-warning animate-pulse"></div>
                  <div className="flex-1 text-sm font-medium">Geopolítica Contemporânea</div>
                  <div className="text-xs text-warning font-semibold">João P.</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-success"></div>
                  <div className="flex-1 text-sm font-medium">Resenha Literária - O Cortiço</div>
                  <div className="text-xs text-muted-foreground">Ana C.</div>
                </div>
                 <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-success"></div>
                  <div className="flex-1 text-sm font-medium">Trabalho de Biologia Celular</div>
                  <div className="text-xs text-muted-foreground">Beatriz M.</div>
                </div>
             </div>
           </CardContent>
         </Card>
      </div>
    </div>
  );
}
