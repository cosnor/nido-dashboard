"use client"

import Image from "next/image"
import { Bird, Headphones, MapPin, Mountain, Users, Waves } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const kpis = [
  {
    label: "Especies Objetivo",
    value: "263",
    icon: Bird,
    color: "from-primary to-primary/70",
    description: "Aves monitoreadas",
  },
  {
    label: "Audios Procesados",
    value: "26 K",
    icon: Headphones,
    color: "from-accent to-accent/70",
    description: "Grabaciones analizadas",
  },
  {
    label: "Observaciones",
    value: "1 M",
    icon: MapPin,
    color: "from-nido-coral to-nido-coral/70",
    description: "Registros geográficos",
  },
  {
    label: "Rango de Elevación",
    value: "0 - 5,200m",
    icon: Mountain,
    color: "from-nido-turquoise to-nido-turquoise/70",
    description: "Altitud cubierta",
  },
  {
    label: "Familias Taxonómicas",
    value: "42",
    icon: Users,
    color: "from-nido-yellow to-nido-yellow/70",
    description: "Clasificaciones",
  },
]

function KPICard({ kpi }: { kpi: (typeof kpis)[0] }) {
  const Icon = kpi.icon
  return (
    <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 group">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
              {kpi.value}
            </p>
            <p className="text-xs text-muted-foreground/70">{kpi.description}</p>
          </div>
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BioacousticVisualization() {
  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Actividad Bioacústica en Tiempo Real</h3>
        <style>{`
          @keyframes audioBarAnimation {
            0%, 100% { height: var(--bar-height-start, 30%); }
            50% { height: var(--bar-height-peak, 80%); }
          }
          .audio-bar {
            animation: audioBarAnimation 1.5s ease-in-out infinite;
          }
        `}</style>
        <div className="h-32 flex items-end justify-center gap-1">
          {[...Array(40)].map((_, i) => {
            const baseHeight = 20 + Math.sin(i * 0.3) * 30
            const peakHeight = baseHeight + 40
            const isHighlight = i % 5 === 0
            return (
              <div
                key={i}
                className={`w-2 rounded-t audio-bar ${
                  isHighlight ? "bg-primary" : "bg-accent/60"
                }`}
                style={{
                  "--bar-height-start": `${baseHeight}%`,
                  "--bar-height-peak": `${peakHeight}%`,
                  animationDelay: `${i * 0.05}s`,
                } as React.CSSProperties}
              />
            )
          })}
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <span>0:00</span>
          <div className="flex items-center gap-2">
            <Waves className="w-4 h-4 text-primary" />
            <span>Espectrograma simulado</span>
          </div>
          <span>0:30</span>
        </div>
      </CardContent>
    </Card>
  )
}

function ColombiaMapPreview() {
  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Cobertura Geográfica</h3>
        <div className="relative h-48 bg-gradient-to-b from-secondary/50 to-secondary/20 rounded-lg overflow-hidden">
          {/* Colombia map from SVG asset */}
          <Image
            src="/co-sil.svg"
            alt="Mapa de Colombia"
            fill
            className="opacity-30 object-contain"
          />
          
          {/* Sample observation points */}
          {[
            { x: 30, y: 25, size: 12 },
            { x: 45, y: 40, size: 8 },
            { x: 60, y: 35, size: 15 },
            { x: 70, y: 55, size: 10 },
            { x: 55, y: 65, size: 18 },
            { x: 40, y: 75, size: 6 },
            { x: 65, y: 80, size: 12 },
          ].map((point, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/60 animate-pulse"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: point.size,
                height: point.size,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">32</p>
              <p className="text-sm text-muted-foreground">Departamentos</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function HomeSection() {
  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary to-accent/10 border border-primary/20 p-6 lg:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-orange">
              <Bird className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">NIDO</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Sistema Activo</span>
              </div>
            </div>
          </div>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Sistema inteligente multimodal de{" "}
            <span className="text-primary font-semibold">identificación bioacústica</span> y{" "}
            <span className="text-accent font-semibold">predicción espaciotemporal</span> de aves en Colombia.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/30">
              Machine Learning
            </span>
            <span className="px-3 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium border border-accent/30">
              Bioacústica
            </span>
            <span className="px-3 py-1.5 rounded-full bg-nido-coral/20 text-nido-coral text-sm font-medium border border-nido-coral/30">
              Geoespacial
            </span>
          </div>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpis.map((kpi, i) => (
          <KPICard key={i} kpi={kpi} />
        ))}
      </div>

      {/* Visualization Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BioacousticVisualization />
        <ColombiaMapPreview />
      </div>
    </div>
  )
}
