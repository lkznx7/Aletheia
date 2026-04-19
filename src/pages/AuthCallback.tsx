import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Backend API URL (com /api prefix)
const BACKEND_API = "http://localhost:8080/api";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Processando login...");
  const [debug, setDebug] = useState("");

  useEffect(() => {
    const fullUrl = window.location.href;
    setDebug("URL: " + fullUrl);
    
    const params = new URL(fullUrl).searchParams;
    const code = params.get("code");
    const error = params.get("error");
    
    setDebug(prev => prev + "\ncode: " + (code ? "SIM" : "NÃO"));
    setDebug(prev => prev + "\nerror: " + error);
    
    if (error) {
      setStatus("Erro: " + error);
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (code) {
      setStatus("Trocando code por tokens...");
      setDebug(prev => prev + "\nChamando: " + BACKEND_API + "/auth/google/callback?code=" + code);
      
      // Ir para o backend com o code
      window.location.href = BACKEND_API + "/auth/google/callback?code=" + code;
    } else {
      setStatus("No code found");
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md border-border/50 shadow-soft">
        <CardContent className="pt-8 pb-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground mb-4">{status}</p>
          <pre className="text-left text-xs bg-muted p-2 rounded max-h-40 overflow-auto whitespace-pre-wrap">
            {debug}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}