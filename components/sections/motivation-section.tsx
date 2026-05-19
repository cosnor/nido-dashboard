"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Leaf,
  Bird,
  Database,
  Users,
  Globe,
  Target,
  TrendingUp,
  Lightbulb,
  MapPin,
} from "lucide-react"

const challenges = [
  {
    icon: Bird,
    title: "Biodiversidad Única",
    description: "Colombia alberga cerca del 20% de las especies de aves del mundo (1,966 especies), siendo el país más biodiverso en avifauna.",
    stat: "1,966",
    statLabel: "especies de aves",
  },
  {
    icon: MapPin,
    title: "Geografía Compleja",
    description: "Tres cordilleras andinas, dos océanos, y ecosistemas desde selvas amazónicas hasta páramos de alta montaña.",
    stat: "5",
    statLabel: "regiones naturales",
  },
  {
    icon: Database,
    title: "Datos Fragmentados",
    description: "Registros bioacústicos dispersos en múltiples bases de datos sin integración estandarizada ni georreferenciación precisa.",
    stat: "150K+",
    statLabel: "grabaciones disponibles",
  },
  {
    icon: Target,
    title: "Identificación Compleja",
    description: "Muchas especies son crípticas, diferenciándose principalmente por vocalización. La identificación manual requiere experiencia especializada.",
    stat: "87%",
    statLabel: "especies vocalmente activas",
  },
]

const objectives = [
  {
    title: "Identificación Multimodal",
    description: "Integrar señales acústicas con datos geoespaciales (coordenadas, elevación, fecha) para mejorar la precisión de identificación usando fusión bayesiana.",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "Predicción Espaciotemporal",
    description: "Predecir distribución de especies considerando patrones estacionales, altitudinales y regionales específicos de Colombia.",
    color: "bg-accent/10 text-accent border-accent/20",
  },
  {
    title: "Aprendizaje Continuo",
    description: "Implementar reentrenamiento incremental que permita al modelo adaptarse a nuevos datos y especies sin reentrenamiento completo.",
    color: "bg-nido-coral/10 text-nido-coral border-nido-coral/20",
  },
  {
    title: "Accesibilidad",
    description: "Crear una herramienta accesible para investigadores, guardaparques y ciudadanos científicos en toda Colombia.",
    color: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  },
]

const impacts = [
  {
    icon: Leaf,
    title: "Conservación",
    description: "Monitoreo de especies amenazadas y detección temprana de cambios poblacionales.",
  },
  {
    icon: Users,
    title: "Ciencia Ciudadana",
    description: "Empoderamiento de comunidades locales para contribuir a bases de datos de biodiversidad.",
  },
  {
    icon: Globe,
    title: "Investigación",
    description: "Datos de alta calidad para estudios de ecología, biogeografía y cambio climático.",
  },
  {
    icon: TrendingUp,
    title: "Políticas Públicas",
    description: "Información para toma de decisiones sobre áreas protegidas y corredores biológicos.",
  },
]

export function MotivationSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary" />
          Motivación del Proyecto
        </h2>
        <p className="text-muted-foreground max-w-3xl">
          NIDO nace de la necesidad de herramientas inteligentes para el estudio y conservación 
          de la extraordinaria avifauna colombiana, integrando tecnología de punta con conocimiento ecológico local.
        </p>
      </div>

      {/* Hero Quote */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <div>
              <blockquote className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
                &ldquo;En un país donde una de cada cinco aves del mundo encuentra su hogar, 
                necesitamos herramientas que nos permitan escuchar, identificar y proteger 
                esta riqueza sonora antes de que se pierda.&rdquo;
              </blockquote>
              <p className="mt-3 text-muted-foreground">
                — Visión del Proyecto NIDO
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenges */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">El Desafío</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((challenge, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/30 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <challenge.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{challenge.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {challenge.stat} {challenge.statLabel}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {challenge.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Objectives */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Objetivos Principales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objectives.map((objective, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-5">
                <Badge className={`mb-3 ${objective.color}`}>
                  Objetivo {index + 1}
                </Badge>
                <h4 className="font-medium text-foreground mb-2">{objective.title}</h4>
                <p className="text-sm text-muted-foreground">{objective.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Impact */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Impacto Esperado</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {impacts.map((impact, index) => (
            <Card key={index} className="bg-card border-border text-center">
              <CardContent className="p-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <impact.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-medium text-foreground mb-1">{impact.title}</h4>
                <p className="text-xs text-muted-foreground">{impact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Data Sources */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Fuentes de Datos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-2xl font-bold text-primary">Xeno-canto</p>
              <p className="text-xs text-muted-foreground mt-1">Grabaciones bioacústicas</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-2xl font-bold text-accent">eBird</p>
              <p className="text-xs text-muted-foreground mt-1">Observaciones georreferenciadas</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-2xl font-bold text-nido-coral">GBIF</p>
              <p className="text-xs text-muted-foreground mt-1">Datos de biodiversidad</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-2xl font-bold text-chart-3">SiB</p>
              <p className="text-xs text-muted-foreground mt-1">Sistema de Información sobre Biodiversidad de Colombia</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
