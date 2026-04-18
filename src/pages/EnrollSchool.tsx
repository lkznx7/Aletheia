import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { School, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function EnrollSchool() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    schoolName: "",
    cnpj: "",
    directorName: "",
    email: "",
    phone: "",
    students: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-hero grain flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/50 shadow-elev backdrop-blur-sm bg-card/90">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" aria-hidden="true" />
            </div>
            <CardTitle className="text-2xl font-display">Solicitação Recebida!</CardTitle>
            <CardDescription>
              Em breve nossa equipe entrará em contato com a direção da escola para apresentar a Aletheia.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/">Voltar ao início</Link>
            </Button>
            <Button asChild>
              <Link to="/contato">Falar com time</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero grain flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-fade-up">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => navigate(-1)}
          aria-label="Voltar para página anterior"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="border-border/50 shadow-elev backdrop-blur-sm bg-card/90">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-display text-center text-primary flex items-center justify-center gap-2">
              <School className="w-8 h-8" aria-hidden="true" />
              Inscrever Minha Escola
            </CardTitle>
            <CardDescription className="text-center">
              Preencha os dados da instituição para conhecermos melhor suas necessidades.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">Nome da Escola *</Label>
                  <Input
                    id="schoolName"
                    placeholder="Colégio Example"
                    required
                    aria-required="true"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    placeholder="00.000.000/0001-00"
                    aria-required="false"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="directorName">Nome do Diretor(a) *</Label>
                  <Input
                    id="directorName"
                    placeholder="Nome completo"
                    required
                    aria-required="true"
                    value={formData.directorName}
                    onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail institucional *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contato@escola.com.br"
                    required
                    aria-required="true"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(61) 99999-9999"
                    required
                    aria-required="true"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="students">Número de alunos</Label>
                  <Input
                    id="students"
                    type="number"
                    placeholder="Quantidade"
                    aria-required="false"
                    value={formData.students}
                    onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary-glow group hover:shadow-glow transition-all"
              >
                Enviar Solicitação
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}