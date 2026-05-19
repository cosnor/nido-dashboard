"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  RefreshCw,
  Upload,
  CheckCircle,
  AlertTriangle,
  Clock,
  Database,
  TrendingUp,
  Play,
  Pause,
  Settings,
  FileAudio,
  Calendar,
  Zap,
  History,
} from "lucide-react"

const retrainingHistory = [
  { date: "2026-05-15", samples: 1250, accuracy: 0.894, status: "completed" },
  { date: "2026-05-01", samples: 980, accuracy: 0.887, status: "completed" },
  { date: "2026-04-15", samples: 1420, accuracy: 0.881, status: "completed" },
  { date: "2026-04-01", samples: 750, accuracy: 0.875, status: "completed" },
  { date: "2026-03-15", samples: 1100, accuracy: 0.869, status: "completed" },
]

const pendingData = [
  { source: "Xeno-canto", count: 342, type: "audio", validated: true },
  { source: "eBird", count: 1250, type: "observations", validated: true },
  { source: "Usuarios NIDO", count: 89, type: "audio", validated: false },
  { source: "SiB Colombia", count: 567, type: "records", validated: true },
]

export function RetrainingSection() {
  const [isRetraining, setIsRetraining] = useState(false)
  const [progress, setProgress] = useState(0)
  const [autoRetrain, setAutoRetrain] = useState(true)
  const [minSamples, setMinSamples] = useState("500")
  const [retrainFrequency, setRetrainFrequency] = useState("weekly")

  const startRetraining = () => {
    setIsRetraining(true)
    setProgress(0)
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRetraining(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const totalPendingSamples = pendingData.reduce((acc, d) => acc + d.count, 0)
  const validatedSamples = pendingData.filter(d => d.validated).reduce((acc, d) => acc + d.count, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-primary" />
          Reentrenamiento del Modelo
        </h2>
        <p className="text-muted-foreground mt-1">
          Sistema de aprendizaje incremental para mejorar continuamente la precisión del modelo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Control Panel */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Panel de Control de Reentrenamiento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Status */}
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isRetraining ? "bg-primary animate-pulse" : "bg-green-500"}`} />
                  <span className="font-medium text-foreground">
                    {isRetraining ? "Reentrenamiento en progreso..." : "Sistema listo"}
                  </span>
                </div>
                <Badge variant={isRetraining ? "default" : "secondary"}>
                  {isRetraining ? "Procesando" : "Inactivo"}
                </Badge>
              </div>
              
              {isRetraining && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="text-foreground font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Procesando nuevos datos...</span>
                    <span>~{Math.round((100 - progress) / 20)} min restantes</span>
                  </div>
                </div>
              )}
            </div>

            {/* Pending Data Summary */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Database className="w-4 h-4 text-muted-foreground" />
                Datos Pendientes de Integración
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {pendingData.map((data, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{data.source}</span>
                      {data.validated ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-lg font-semibold text-foreground">{data.count.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{data.type}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div>
                  <p className="text-sm font-medium text-foreground">Total disponible para reentrenamiento</p>
                  <p className="text-xs text-muted-foreground">{validatedSamples.toLocaleString()} validados de {totalPendingSamples.toLocaleString()} totales</p>
                </div>
                <p className="text-2xl font-bold text-primary">{validatedSamples.toLocaleString()}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                className="flex-1 min-w-[200px] bg-primary hover:bg-primary/90"
                disabled={isRetraining || validatedSamples < parseInt(minSamples)}
                onClick={startRetraining}
              >
                {isRetraining ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Reentrenamiento en curso...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Reentrenamiento
                  </>
                )}
              </Button>
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                Cargar Datos Nuevos
              </Button>
            </div>

            {validatedSamples < parseInt(minSamples) && !isRetraining && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">
                  Se requieren al menos {minSamples} muestras validadas para iniciar el reentrenamiento.
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Configuration Panel */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="w-5 h-5 text-muted-foreground" />
              Configuración
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Auto Retrain Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Reentrenamiento automático</Label>
                <p className="text-xs text-muted-foreground">Ejecutar cuando haya suficientes datos</p>
              </div>
              <Switch checked={autoRetrain} onCheckedChange={setAutoRetrain} />
            </div>

            {/* Min Samples */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Muestras mínimas</Label>
              <Input
                type="number"
                value={minSamples}
                onChange={(e) => setMinSamples(e.target.value)}
                className="bg-input border-border"
              />
              <p className="text-xs text-muted-foreground">
                Número mínimo de muestras validadas requeridas
              </p>
            </div>

            {/* Frequency */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Frecuencia</Label>
              <div className="grid grid-cols-3 gap-2">
                {["daily", "weekly", "monthly"].map((freq) => (
                  <Button
                    key={freq}
                    variant={retrainFrequency === freq ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRetrainFrequency(freq)}
                    className={retrainFrequency === freq ? "bg-primary" : ""}
                  >
                    {freq === "daily" ? "Diario" : freq === "weekly" ? "Semanal" : "Mensual"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Next Scheduled */}
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Próximo reentrenamiento:</span>
              </div>
              <p className="text-foreground font-medium mt-1">
                {autoRetrain ? "22 de Mayo, 2026 - 03:00 AM" : "Deshabilitado"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Retraining History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="w-5 h-5 text-muted-foreground" />
            Historial de Reentrenamiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {retrainingHistory.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{entry.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.samples.toLocaleString()} muestras procesadas
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Precisión</p>
                    <p className="font-semibold text-foreground">{(entry.accuracy * 100).toFixed(1)}%</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      +{((entry.accuracy - (retrainingHistory[index + 1]?.accuracy || entry.accuracy)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Sobre el Reentrenamiento Incremental</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                El sistema utiliza <strong>aprendizaje incremental</strong> que permite actualizar el modelo 
                con nuevos datos sin necesidad de reentrenar desde cero. Esto reduce significativamente el 
                tiempo de entrenamiento (de horas a minutos) mientras mantiene el conocimiento previo del modelo.
                Los nuevos datos pasan por validación automática antes de ser integrados para asegurar la calidad.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
