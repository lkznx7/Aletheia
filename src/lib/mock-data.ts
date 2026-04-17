export const classesData = [
  { id: "1", name: "Turma 3A", code: "#TRM-3A-2024", totalStudents: 32, averageScore: 8.5, warnings: 2 },
  { id: "2", name: "Turma 3B", code: "#TRM-3B-2024", totalStudents: 28, averageScore: 7.2, warnings: 5 },
  { id: "3", name: "Turma 2A", code: "#TRM-2A-2024", totalStudents: 35, averageScore: 8.8, warnings: 1 },
];

export const studentsData = [
  { id: "s1", name: "Maria Helena", classId: "2", className: "Turma 3B", redacoes: 5, iaProbability: 85, alert: "Uso Intensivo de IA" },
  { id: "s2", name: "João Pedro", classId: "1", className: "Turma 3A", redacoes: 4, iaProbability: 15, alert: "Totalmente Autoral" },
  { id: "s3", name: "Ana Clara", classId: "1", className: "Turma 3A", redacoes: 6, iaProbability: 40, alert: "Construção Híbrida" },
  { id: "s4", name: "Carlos Eduardo", classId: "2", className: "Turma 3B", redacoes: 3, iaProbability: 60, alert: "Uso Intensivo de IA" },
  { id: "s5", name: "Beatriz M.", classId: "3", className: "Turma 2A", redacoes: 5, iaProbability: 35, alert: "Construção Híbrida" },
];

export const overviewStats = [
  { label: "Total de Alunos", value: "95", trend: "+2" },
  { label: "Turmas Ativas", value: "3", trend: "0" },
  { label: "Textos Avaliados", value: "1.240", trend: "+120" },
  { label: "Perfis Híbridos Detectados", value: "28", trend: "+5" },
];

export const chartData = [
  { month: "Mar", ia: 15, hibrido: 40, autoral: 120 },
  { month: "Abr", ia: 22, hibrido: 50, autoral: 150 },
  { month: "Mai", ia: 18, hibrido: 65, autoral: 145 },
  { month: "Jun", ia: 10, hibrido: 80, autoral: 180 },
  { month: "Jul", ia: 5, hibrido: 105, autoral: 90 },
];
