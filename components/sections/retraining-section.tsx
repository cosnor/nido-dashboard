"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  RefreshCw, Upload, CheckCircle, AlertTriangle, Clock,
  Database, TrendingUp, TrendingDown, Play, Settings,
  Zap, History, Loader2, Minus, X, XCircle,
} from "lucide-react"

const API_BASE = process.env.NEXT_PUBLIC_API_URL

// ── Toast ──────────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "info"
interface Toast { id: number; type: ToastType; title: string; message: string }
let toastCounter = 0

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  if (toasts.length === 0) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
      {toasts.map(t => (
        <div key={t.id} className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-sm
          transition-all duration-300
          ${t.type === "success" ? "bg-green-500/10 border-green-500/30"
            : t.type === "error"   ? "bg-red-500/10 border-red-500/30"
            : "bg-primary/10 border-primary/30"}`}>
          <div className="mt-0.5 shrink-0">
            {t.type === "success" && <CheckCircle className="w-5 h-5 text-green-500" />}
            {t.type === "error"   && <XCircle     className="w-5 h-5 text-red-500"   />}
            {t.type === "info"    && <RefreshCw   className="w-5 h-5 text-primary"   />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm">{t.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.message}</p>
          </div>
          <button onClick={() => onDismiss(t.id)} className="shrink-0 text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

// ── Tipos ──────────────────────────────────────────────────────────────────

interface TrainingStatus {
  system: { status: "idle" | "running"; can_retrain: boolean; pipeline_active: boolean }
  data: {
    total_recordings: number; validated: number
    by_split: { train: number; val: number; test: number }
    pending_embeddings: number; golden_dataset: number
  }
  retraining: {
    min_samples_required: number; retrain_every_n_samples: number
    samples_since_last_retrain: number; samples_until_next_retrain: number
    progress_pct: number
  }
  current_model: {
    version: string | null; top5_accuracy: number | null
    top1_accuracy: number | null; macro_f1: number | null
    trained_at: string | null; deployed_at: string | null
  }
}

interface ModelVersion {
  version: string; model_type: string
  top1_accuracy: number | null; top5_accuracy: number | null
  macro_f1: number | null; latency_p95_ms: number | null
  status: string; trained_at: string | null; deployed_at: string | null
  training_notes: string | null; delta_accuracy: number | null
}

interface ScheduleConfig {
  enabled: boolean; frequency: "daily" | "weekly" | "monthly"
  min_samples: number; next_run: string | null
}

// ── Helpers ────────────────────────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return "—"
  const d = new Date(iso)
  return d.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })
    + " - " + d.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
}

function formatShortDate(iso: string | null): string {
  if (!iso) return "—"
  return new Date(iso).toISOString().split("T")[0]
}

// ── Componente principal ───────────────────────────────────────────────────

export function RetrainingSection() {
  const [status,   setStatus]   = useState<TrainingStatus | null>(null)
  const [history,  setHistory]  = useState<ModelVersion[]>([])
  const [schedule, setSchedule] = useState<ScheduleConfig | null>(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string | null>(null)

  const [isTriggering,   setIsTriggering]   = useState(false)
  const [triggerError,   setTriggerError]   = useState<string | null>(null)
  const [savingSchedule, setSavingSchedule] = useState(false)
  const [toasts,         setToasts]         = useState<Toast[]>([])

  const [localFrequency,   setLocalFrequency]   = useState<"daily" | "weekly" | "monthly">("weekly")
  const [localMinSamples,  setLocalMinSamples]  = useState("500")
  const [localAutoRetrain, setLocalAutoRetrain] = useState(true)

  // Guardamos el estado anterior del pipeline para detectar transición running→idle
  const prevPipelineActive = useRef<boolean | null>(null)
  const prevHistoryFirst   = useRef<string | null>(null)
  const pollRef            = useRef<NodeJS.Timeout | null>(null)

  // ── Toast helpers ─────────────────────────────────────────────────────────

  const addToast = useCallback((type: ToastType, title: string, message: string) => {
    const id = ++toastCounter
    setToasts(prev => [...prev, { id, type, title, message }])
    // Auto-dismiss después de 6 segundos
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 6000)
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  // ── Fetchers ──────────────────────────────────────────────────────────────

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/training/status`)
      if (!res.ok) throw new Error()
      const data: TrainingStatus = await res.json()
      setStatus(data)
      setError(null)
      return data
    } catch {
      setError("No se pudo conectar con el backend.")
      return null
    }
  }, [])

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/training/history?limit=10`)
      if (!res.ok) return
      const data = await res.json()
      setHistory(data.versions ?? [])
      return data.versions as ModelVersion[]
    } catch {}
  }, [])

  const fetchSchedule = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/training/schedule`)
      if (!res.ok) return
      const data: ScheduleConfig = await res.json()
      setSchedule(data)
      setLocalFrequency(data.frequency)
      setLocalMinSamples(String(data.min_samples))
      setLocalAutoRetrain(data.enabled)
    } catch {}
  }, [])

  const fetchAll = useCallback(async () => {
    await Promise.all([fetchStatus(), fetchHistory(), fetchSchedule()])
    setLoading(false)
  }, [fetchStatus, fetchHistory, fetchSchedule])

  useEffect(() => { fetchAll() }, [fetchAll])

  // ── Polling y detección de fin del pipeline ───────────────────────────────

  useEffect(() => {
    const active = status?.system.pipeline_active ?? false

    // Detectar transición running → idle
    if (prevPipelineActive.current === true && active === false) {
      // El pipeline terminó — recargar historial y mostrar resultado
      fetchHistory().then(versions => {
        const newFirst = versions?.[0]?.version ?? null
        const promoted = newFirst !== null && newFirst !== prevHistoryFirst.current

        if (promoted) {
          const acc = versions?.[0]?.top5_accuracy
          addToast(
            "success",
            "Reentrenamiento completado",
            `Modelo ${newFirst} promovido a producción.${acc ? ` Top-5: ${(acc * 100).toFixed(1)}%` : ""}`
          )
        } else {
          addToast(
            "info",
            "Reentrenamiento finalizado",
            "El pipeline completó la ejecución. No se promovió un nuevo modelo (no superó el umbral mínimo)."
          )
        }
      })
    }

    // Guardar estado actual para la próxima comparación
    prevPipelineActive.current = active

    // Iniciar polling mientras está activo
    if (active && !pollRef.current) {
      pollRef.current = setInterval(fetchStatus, 5000)
    }
    if (!active && pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }

    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [status?.system.pipeline_active, fetchStatus, fetchHistory, addToast])

  // Guardar versión del primer historial para comparar al terminar
  useEffect(() => {
    if (history.length > 0 && prevHistoryFirst.current === null) {
      prevHistoryFirst.current = history[0].version
    }
  }, [history])

  // ── Acciones ──────────────────────────────────────────────────────────────

  const handleTrigger = async () => {
    setIsTriggering(true)
    setTriggerError(null)
    try {
      const res = await fetch(`${API_BASE}/training/trigger`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ max_recordings: 1000 }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail ?? "Error al activar reentrenamiento")
      }
      addToast("info", "Pipeline iniciado", "El reentrenamiento comenzó en segundo plano. Te avisaremos cuando termine.")
      prevHistoryFirst.current = history[0]?.version ?? null
      await fetchStatus()
    } catch (e: any) {
      setTriggerError(e.message)
      addToast("error", "Error al iniciar", e.message)
    } finally {
      setIsTriggering(false)
    }
  }

  const handleSaveSchedule = async () => {
    setSavingSchedule(true)
    try {
      const params = new URLSearchParams({
        enabled: String(localAutoRetrain),
        frequency: localFrequency,
        min_samples: localMinSamples,
      })
      const res = await fetch(`${API_BASE}/training/schedule?${params}`, { method: "POST" })
      if (!res.ok) throw new Error()
      const data: ScheduleConfig = await res.json()
      setSchedule(data)
      addToast("success", "Configuración guardada", "El scheduler fue actualizado correctamente.")
    } catch {
      addToast("error", "Error al guardar", "No se pudo actualizar la configuración del scheduler.")
    } finally {
      setSavingSchedule(false)
    }
  }

  // ── Derivados ─────────────────────────────────────────────────────────────

  const pipelineActive  = status?.system.pipeline_active ?? false
  const canRetrain      = status?.system.can_retrain ?? false
  const trainCount      = status?.data.by_split.train ?? 0
  const totalRecordings = status?.data.total_recordings ?? 0
  const minRequired     = status?.retraining.min_samples_required ?? 500
  const progressPct     = status?.retraining.progress_pct ?? 0

  // ── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground gap-3">
        <Loader2 className="w-5 h-5 animate-spin" />
        Cargando datos de reentrenamiento...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
        <AlertTriangle className="w-5 h-5" />
        {error}
        <Button variant="ghost" size="sm" onClick={fetchAll} className="ml-auto">Reintentar</Button>
      </div>
    )
  }

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

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
          {/* Panel de control */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Panel de Control de Reentrenamiento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Estado actual */}
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${pipelineActive ? "bg-primary animate-pulse" : "bg-green-500"}`} />
                    <span className="font-medium text-foreground">
                      {pipelineActive ? "Reentrenamiento en progreso..." : "Sistema listo"}
                    </span>
                  </div>
                  <Badge variant={pipelineActive ? "default" : "secondary"}>
                    {pipelineActive ? "Procesando" : "Inactivo"}
                  </Badge>
                </div>

                {/* Cuando corre: spinner sin barra falsa */}
                {pipelineActive && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span>El pipeline está corriendo en segundo plano. Recibirás una notificación al terminar.</span>
                  </div>
                )}

                {/* Cuando no corre: progreso hacia el siguiente ciclo */}
                {!pipelineActive && (
                  <div className="space-y-1 mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progreso hacia siguiente ciclo automático</span>
                      <span>{progressPct}%</span>
                    </div>
                    <Progress value={progressPct} className="h-1.5" />
                    <p className="text-xs text-muted-foreground">
                      Faltan {status?.retraining.samples_until_next_retrain ?? "—"} muestras
                    </p>
                  </div>
                )}
              </div>

              {/* Datos disponibles */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  Datos Disponibles para Reentrenamiento
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Entrenamiento", value: status?.data.by_split.train, ok: true },
                    { label: "Validación",    value: status?.data.by_split.val,   ok: true },
                    { label: "Test",          value: status?.data.by_split.test,  ok: true },
                    { label: "Golden",        value: status?.data.golden_dataset, ok: (status?.data.golden_dataset ?? 0) > 0 },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        {item.ok
                          ? <CheckCircle className="w-3 h-3 text-green-500" />
                          : <AlertTriangle className="w-3 h-3 text-yellow-500" />
                        }
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        {(item.value ?? 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">grabaciones</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div>
                    <p className="text-sm font-medium text-foreground">Total disponible para reentrenamiento</p>
                    <p className="text-xs text-muted-foreground">
                      {trainCount.toLocaleString()} en train de {totalRecordings.toLocaleString()} totales
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary">{trainCount.toLocaleString()}</p>
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-wrap gap-3">
                <Button
                  className="flex-1 min-w-[200px] bg-primary hover:bg-primary/90"
                  disabled={pipelineActive || isTriggering || !canRetrain}
                  onClick={handleTrigger}
                >
                  {pipelineActive || isTriggering ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Reentrenamiento en curso...</>
                  ) : (
                    <><Play className="w-4 h-4 mr-2" />Iniciar Reentrenamiento</>
                  )}
                </Button>
                <Button variant="outline" className="gap-2" disabled>
                  <Upload className="w-4 h-4" />
                  Cargar Datos Nuevos
                </Button>
              </div>

              {!canRetrain && !pipelineActive && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">
                    Se requieren al menos {minRequired.toLocaleString()} muestras en split train.
                    Actualmente hay {trainCount.toLocaleString()}.
                  </span>
                </div>
              )}

              {triggerError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">{triggerError}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configuración */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="w-5 h-5 text-muted-foreground" />
                Configuración
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Reentrenamiento automático</Label>
                  <p className="text-xs text-muted-foreground">Ejecutar cuando haya suficientes datos</p>
                </div>
                <Switch checked={localAutoRetrain} onCheckedChange={setLocalAutoRetrain} />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Muestras mínimas</Label>
                <Input
                  type="number"
                  value={localMinSamples}
                  onChange={e => setLocalMinSamples(e.target.value)}
                  className="bg-input border-border"
                />
                <p className="text-xs text-muted-foreground">Número mínimo de muestras validadas requeridas</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Frecuencia</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["daily", "weekly", "monthly"] as const).map(freq => (
                    <Button
                      key={freq}
                      variant={localFrequency === freq ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLocalFrequency(freq)}
                      className={localFrequency === freq ? "bg-primary" : ""}
                    >
                      {freq === "daily" ? "Diario" : freq === "weekly" ? "Semanal" : "Mensual"}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Próximo reentrenamiento:</span>
                </div>
                <p className="text-foreground font-medium mt-1 text-sm">
                  {localAutoRetrain && schedule?.next_run
                    ? formatDate(schedule.next_run)
                    : "Deshabilitado"}
                </p>
              </div>

              <Button
                className="w-full"
                variant="outline"
                onClick={handleSaveSchedule}
                disabled={savingSchedule}
              >
                {savingSchedule
                  ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Guardando...</>
                  : "Guardar configuración"
                }
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Historial */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="w-5 h-5 text-muted-foreground" />
              Historial de Reentrenamiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                Aún no hay versiones registradas.
              </p>
            ) : (
              <div className="space-y-3">
                {history.map(entry => {
                  const acc   = entry.top5_accuracy ?? entry.top1_accuracy
                  const delta = entry.delta_accuracy
                  return (
                    <div
                      key={entry.version}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{entry.version}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatShortDate(entry.trained_at)}
                            {entry.model_type ? ` · ${entry.model_type}` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        {acc !== null && (
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Precisión</p>
                            <p className="font-semibold text-foreground">{(acc * 100).toFixed(1)}%</p>
                          </div>
                        )}
                        <div className={`flex items-center gap-1 ${
                          delta == null ? "text-muted-foreground"
                          : delta > 0   ? "text-green-500"
                          : delta < 0   ? "text-red-400"
                          : "text-muted-foreground"
                        }`}>
                          {delta == null || delta === 0
                            ? <Minus className="w-4 h-4" />
                            : delta > 0
                              ? <TrendingUp   className="w-4 h-4" />
                              : <TrendingDown className="w-4 h-4" />
                          }
                          <span className="text-sm font-medium">
                            {delta == null ? "—" : `${delta >= 0 ? "+" : ""}${(delta * 100).toFixed(1)}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info */}
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
    </>
  )
}