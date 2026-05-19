"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Cpu,
  GitMerge,
  RefreshCw,
  Radio,
  UserCheck,
  Server,
  Wifi,
  CloudLightning,
  Database,
  Shield,
} from "lucide-react"

const applications = [
  {
    id: "iot",
    title: "Nodos IoT No Supervisados",
    description: "Dispositivos autónomos de grabación continua desplegados en campo para captura de audio 24/7.",
    icon: Wifi,
    color: "from-primary to-primary/70",
    features: ["Bajo consumo energético", "Almacenamiento local", "Transmisión por lotes", "Resistente a intemperie"],
    status: "Activo",
  },
  {
    id: "fusion",
    title: "Arquitectura de Fusión",
    description: "Sistema de combinación bayesiana de modelos acústicos y geoespaciales para mayor precisión.",
    icon: GitMerge,
    color: "from-accent to-accent/70",
    features: ["Fusión probabilística", "Ponderación adaptativa", "Multi-modal", "Explicabilidad"],
    status: "En producción",
  },
  {
    id: "retrain",
    title: "Reentrenamiento Incremental",
    description: "El modelo mejora continuamente con cada nueva validación sin perder conocimiento previo.",
    icon: RefreshCw,
    color: "from-nido-turquoise to-nido-turquoise/70",
    features: ["Online learning", "Sin olvido catastrófico", "Automatizado", "Versionado"],
    status: "Automático",
  },
  {
    id: "monitoring",
    title: "Monitoreo Bioacústico",
    description: "Dashboard de visualización en tiempo real del estado de los nodos y detecciones recientes.",
    icon: Radio,
    color: "from-nido-coral to-nido-coral/70",
    features: ["Alertas en tiempo real", "Mapas de calor", "Tendencias temporales", "Reportes automáticos"],
    status: "24/7",
  },
  {
    id: "validation",
    title: "Validación Experta",
    description: "Interfaz para que ornitólogos validen o corrijan predicciones, alimentando el reentrenamiento.",
    icon: UserCheck,
    color: "from-nido-yellow to-nido-yellow/70",
    features: ["Interface intuitiva", "Feedback loop", "Gamificación", "Métricas de consenso"],
    status: "Colaborativo",
  },
  {
    id: "infrastructure",
    title: "Infraestructura Cloud",
    description: "Backend escalable para procesamiento de grandes volúmenes de audio y predicciones en tiempo real.",
    icon: Server,
    color: "from-muted-foreground to-muted-foreground/70",
    features: ["Auto-escalado", "GPU inference", "CDN global", "99.9% uptime"],
    status: "Escalable",
  },
]

function ApplicationCard({ app }: { app: (typeof applications)[0] }) {
  const Icon = app.icon
  return (
    <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 group h-full">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <Badge variant="outline" className="text-xs">
            {app.status}
          </Badge>
        </div>
        <h3 className="font-semibold text-foreground mb-2">{app.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1">{app.description}</p>
        <div className="flex flex-wrap gap-2">
          {app.features.map((feature, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ApplicationsSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Cpu className="w-6 h-6 text-primary" />
          Panel de Aplicaciones
        </h2>
        <p className="text-muted-foreground mt-1">
          Módulos y capacidades del ecosistema NIDO
        </p>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((app) => (
          <ApplicationCard key={app.id} app={app} />
        ))}
      </div>

      {/* Architecture Diagram */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Arquitectura del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Edge Layer */}
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Wifi className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Edge Layer</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Nodos IoT</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary/70" />
                  <span>Grabación local</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary/50" />
                  <span>Pre-procesamiento</span>
                </div>
              </div>
            </div>

            {/* Processing Layer */}
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-2 mb-3">
                <CloudLightning className="w-5 h-5 text-accent" />
                <span className="font-medium text-foreground">Processing Layer</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span>GPU Inference</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent/70" />
                  <span>Model Fusion</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent/50" />
                  <span>Real-time Analysis</span>
                </div>
              </div>
            </div>

            {/* Storage Layer */}
            <div className="p-4 rounded-lg bg-nido-turquoise/10 border border-nido-turquoise/20">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-5 h-5 text-nido-turquoise" />
                <span className="font-medium text-foreground">Storage Layer</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-nido-turquoise" />
                  <span>Audio Archive</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-nido-turquoise/70" />
                  <span>Predictions DB</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-nido-turquoise/50" />
                  <span>Model Versions</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
