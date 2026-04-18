import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ArrowLeft, Send, CheckCircle2 } from "lucide-react";

export default function ContactTeam() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
            <CardTitle className="text-2xl font-display">Mensagem Enviada!</CardTitle>
            <CardDescription>
              Obrigado por entrar em contato. Nossa equipe responderá em até 24 horas úteis.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Voltar
            </Button>
            <Button asChild>
              <a href="mailto:contato@aletheia.edu.br">E-mail direto</a>
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
              <MessageCircle className="w-8 h-8" aria-hidden="true" />
              Falar com o Time
            </CardTitle>
            <CardDescription className="text-center">
              Tem dúvidas, sugestões ou quer parcerias? Estamos prontos para conversar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Seu nome *</Label>
                <Input
                  id="name"
                  placeholder="Nome completo"
                  required
                  aria-required="true"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  aria-required="true"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto *</Label>
                <Input
                  id="subject"
                  placeholder="Sobre o que deseja falar?"
                  required
                  aria-required="true"
                  list="subject-list"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
                <datalist id="subject-list">
                  <option value="Dúvidas sobre uso" />
                  <option value="Parceria educacional" />
                  <option value="Sugestões" />
                  <option value="Reportar problema" />
                  <option value="Outro" />
                </datalist>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem *</Label>
                <Textarea
                  id="message"
                  placeholder="Conte-nos mais detalhes..."
                  required
                  aria-required="true"
                  className="min-h-[120px]"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary-glow group hover:shadow-glow transition-all"
              >
                <Send className="mr-2 h-4 w-4" />
                Enviar Mensagem
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}