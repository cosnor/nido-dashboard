"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileAudio,
  MapPin,
  Brain,
  GitMerge,
  Bird,
  RefreshCw,
  ChevronDown,
  Waves,
  Globe,
  Sparkles,
  CheckCircle,
  ArrowDown,
} from "lucide-react"

const pipelineSteps = [
  {
    id: "input",
    title: "Entrada de Datos",
    description: "Audio + Metadata geoespacial",
    icon: FileAudio,
    color: "from-primary to-primary/70",
    details: ["Archivo de audio (WAV/MP3)", "Coordenadas GPS", "Elevación", "Día del año"],
  },
  {
    id: "audio-model",
    title: "Modelo A: Audio",
    description: "Análisis bioacústico con CNN",
    icon: Waves,
    color: "from-accent to-accent/70",
    details: ["Extracción de espectrogramas", "Red neuronal convolucional", "Features acústicos", "Top-K especies candidatas"],
    output: "Top-K Audio",
  },
  {
    id: "geo-model",
    title: "Modelo B: Geoespacial",
    description: "Predicción por contexto espaciotemporal",
    icon: Globe,
    color: "from-nido-turquoise to-nido-turquoise/70",
    details: ["Análisis de elevación", "Distribución geográfica", "Estacionalidad temporal", "Top-K especies probables"],
    output: "Top-K Geo",
  },
  {
    id: "fusion",
    title: "Fusión Bayesiana",
    description: "Combinación de predicciones",
    icon: GitMerge,
    color: "from-nido-coral to-nido-coral/70",
    details: ["Ponderación de probabilidades", "Prior geoespacial", "Likelihood acústico", "Posterior conjunto"],
  },
  {
    id: "output",
    title: "Resultado Final",
    description: "Especie identificada con confianza",
    icon: Bird,
    color: "from-nido-yellow to-nido-yellow/70",
    details: ["Especie más probable", "Índice de confianza", "Explicación del resultado", "Alternativas probables"],
  },
  {
    id: "retrain",
    title: "Reentrenamiento",
    description: "Mejora continua del modelo",
    icon: RefreshCw,
    color: "from-muted-foreground to-muted-foreground/70",
    details: ["Validación por expertos", "Cada X audios validados", "Actualización incremental", "Mejora de accuracy"],
    isOptional: true,
  },
]

function PipelineStep({
  step,
  isLast,
  index,
}: {
  step: (typeof pipelineSteps)[0]
  isLast: boolean
  index: number
}) {
  const Icon = step.icon
  const isParallel = step.id === "audio-model" || step.id === "geo-model"

  return (
    <div className="relative">
      <div className={`flex flex-col items-center ${isParallel ? "" : ""}`}>
        {/* Step Card */}
        <div
          className={`w-full max-w-md ${
            step.isOptional ? "opacity-70" : ""
          }`}
        >
          <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 group overflow-hidden">
            <div className={`h-1 bg-gradient-to-r ${step.color}`} />
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    {step.isOptional && (
                      <Badge variant="outline" className="text-xs">
                        Opcional
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((detail, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground"
                      >
                        <CheckCircle className="w-3 h-3 text-primary/50" />
                        {detail}
                      </span>
                    ))}
                  </div>
                  {step.output && (
                    <div className="mt-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{step.output}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connection Arrow */}
        {!isLast && (
          <div className="flex flex-col items-center py-3">
            <div className="w-px h-6 bg-gradient-to-b from-border to-primary/30" />
            <ArrowDown className="w-5 h-5 text-primary/50 -mt-1" />
          </div>
        )}
      </div>
    </div>
  )
}

function ParallelModels() {
  const audioModel = pipelineSteps.find((s) => s.id === "audio-model")!
  const geoModel = pipelineSteps.find((s) => s.id === "geo-model")!

  return (
    <div className="relative">
      {/* Split indicator */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="px-3 text-xs text-muted-foreground">Procesamiento Paralelo</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Parallel cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[audioModel, geoModel].map((step) => {
          const Icon = step.icon
          return (
            <Card key={step.id} className="bg-card border-border hover:border-primary/30 transition-all duration-300 group overflow-hidden">
              <div className={`h-1 bg-gradient-to-r ${step.color}`} />
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.details.map((detail, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground"
                        >
                          <CheckCircle className="w-3 h-3 text-primary/50" />
                          {detail}
                        </span>
                      ))}
                    </div>
                    {step.output && (
                      <div className="mt-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">{step.output}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Merge indicator */}
      <div className="flex flex-col items-center py-4">
        <div className="flex items-center w-full max-w-md">
          <div className="flex-1 h-px bg-accent/50" />
          <div className="px-2">
            <GitMerge className="w-5 h-5 text-accent rotate-180" />
          </div>
          <div className="flex-1 h-px bg-nido-turquoise/50" />
        </div>
        <div className="w-px h-4 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </div>
  )
}

export function PipelineSection() {
  const inputStep = pipelineSteps.find((s) => s.id === "input")!
  const fusionStep = pipelineSteps.find((s) => s.id === "fusion")!
  const outputStep = pipelineSteps.find((s) => s.id === "output")!
  const retrainStep = pipelineSteps.find((s) => s.id === "retrain")!

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          Pipeline del Modelo NidoNET
        </h2>
        <p className="text-muted-foreground mt-1">
          Arquitectura de fusión multimodal para identificación bioacústica
        </p>
      </div>

      {/* Pipeline Diagram */}
      <Card className="bg-card/50 border-border p-6">
        <div className="flex flex-col items-center">
          {/* Input Step */}
          <PipelineStep step={inputStep} isLast={false} index={0} />

          {/* Parallel Models */}
          <ParallelModels />

          {/* Fusion Step */}
          <PipelineStep step={fusionStep} isLast={false} index={3} />

          {/* Output Step */}
          <PipelineStep step={outputStep} isLast={false} index={4} />

          {/* Retrain Step (with feedback loop indicator) */}
          <div className="relative w-full max-w-md">
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center">
              <div className="w-px h-20 bg-muted-foreground/30" />
              <RefreshCw className="w-4 h-4 text-muted-foreground/50" />
              <div className="text-[10px] text-muted-foreground/50 writing-mode-vertical rotate-180" style={{ writingMode: "vertical-rl" }}>
                Feedback Loop
              </div>
            </div>
            <PipelineStep step={retrainStep} isLast={true} index={5} />
          </div>
        </div>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Audio Processing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground">Acoustic Model</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-nido-turquoise" />
          <span className="text-xs text-muted-foreground">Geospatial Model</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-nido-coral" />
          <span className="text-xs text-muted-foreground">Bayesian Fusion</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-nido-yellow" />
          <span className="text-xs text-muted-foreground">Final Output</span>
        </div>
      </div>
    </div>
  )
}
