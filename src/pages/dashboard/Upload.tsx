import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Upload as UploadIcon, FileText, Play, AlertTriangle, CheckCircle } from "lucide-react";

interface AnalysisResult {
  textAnalysis?: {
    iaProbability?: number;
    classification?: string;
    confidence?: number;
    reasons?: string[];
    recommendations?: string[];
  };
  writingAnalysis?: {
    thesisQuality?: string;
    argumentDevelopment?: string;
    languageRegister?: string;
  };
  sourcesAnalysis?: {
    citationsFound?: number;
    reliableSources?: number[];
  };
  pedagogicalReport?: string;
}

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 50 * 1024 * 1024) {
        toast.error("Arquivo muito grande. Máximo 50MB.");
        return;
      }
      setFile(selected);
      setUploadResult(null);
      setAnalysisResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      const result = await api.upload("/upload", file, "file");
      setUploadResult(result);
      toast.success("Arquivo enviado com sucesso!");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Erro ao fazer upload");
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadResult?.file?.id) return;

    try {
      setAnalyzing(true);
      const fileId = uploadResult.file.id;
      const result = await api.post(`/submissions/${fileId}/analyze`, {});
      setAnalysisResult(result);
      toast.success("Análise concluída!");
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast.error(error.message || "Erro ao analisar");
    } finally {
      setAnalyzing(false);
    }
  };

  const getClassificationLabel = (prob?: number) => {
    if (prob === undefined) return "Pendente";
    if (prob > 60) return "Alto Uso de IA";
    if (prob > 30) return "Construção Híbrida";
    return "Autoral";
  };

  const getClassificationColor = (prob?: number) => {
    if (prob === undefined) return "text-muted-foreground";
    if (prob > 60) return "text-warning";
    if (prob > 30) return "text-accent";
    return "text-success";
  };

  const getClassificationIcon = (prob?: number) => {
    if (prob === undefined || prob <= 30) return <CheckCircle className="w-4 h-4 text-success" />;
    if (prob <= 60) return <AlertTriangle className="w-4 h-4 text-accent" />;
    return <AlertTriangle className="w-4 h-4 text-warning" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Análise de Textos</h1>
        <p className="text-muted-foreground mt-1">Envie um arquivo para análise de detecção de IA.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>1. Upload de Arquivo</CardTitle>
            <CardDescription>
              Formatos aceitos: PDF, DOCX, TXT (máx 50MB)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Selecione o arquivo</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
            </div>

            {file && (
              <div className="p-3 bg-muted/50 rounded-lg flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Enviar Arquivo
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>2. Resultado da Análise</CardTitle>
            <CardDescription>
              Análise de detecção e recomendações pedagógicas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!uploadResult ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Envie um arquivo para começar a análise.</p>
              </div>
            ) : !analysisResult ? (
              <div className="text-center py-8">
                <p className="mb-4 text-muted-foreground">Arquivo enviado com sucesso!</p>
                <Button onClick={handleAnalyze} disabled={analyzing}>
                  {analyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Iniciar Análise
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  {getClassificationIcon(analysisResult.textAnalysis?.iaProbability)}
                  <div>
                    <div className={`text-xl font-bold ${getClassificationColor(analysisResult.textAnalysis?.iaProbability)}`}>
                      {analysisResult.textAnalysis?.iaProbability ?? "—"}%
                    </div>
                    <div className={`text-sm font-medium ${getClassificationColor(analysisResult.textAnalysis?.iaProbability)}`}>
                      {getClassificationLabel(analysisResult.textAnalysis?.iaProbability)}
                    </div>
                  </div>
                </div>

                {analysisResult.textAnalysis?.confidence !== undefined && (
                  <div className="text-sm text-muted-foreground">
                    Confiança: {(analysisResult.textAnalysis.confidence * 100).toFixed(1)}%
                  </div>
                )}

                {analysisResult.textAnalysis?.reasons && analysisResult.textAnalysis.reasons.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Evidências</div>
                    <ul className="text-sm space-y-1">
                      {analysisResult.textAnalysis.reasons.map((reason, i) => (
                        <li key={i} className="text-muted-foreground">• {reason}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult.textAnalysis?.recommendations && analysisResult.textAnalysis.recommendations.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Recomendações Pedagógicas</div>
                    <ul className="text-sm space-y-1">
                      {analysisResult.textAnalysis.recommendations.map((rec, i) => (
                        <li key={i} className="text-muted-foreground">• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult.pedagogicalReport && (
                  <div>
                    <div className="text-sm font-medium mb-2">Relatório Pedagógico</div>
                    <div className="text-sm p-3 bg-muted/50 rounded-lg">
                      {analysisResult.pedagogicalReport}
                    </div>
                  </div>
                )}

                <Button
                  variant="outline"
                  onClick={() => {
                    setAnalysisResult(null);
                    setUploadResult(null);
                    setFile(null);
                  }}
                  className="w-full mt-4"
                >
                  Analisar Novo Arquivo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}