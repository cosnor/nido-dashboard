"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts"
import { Filter, Map, TrendingUp, Volume2 } from "lucide-react"

// Mock data for charts
const sightingsData = [
  { region: "Antioquia", registros: 18500 },
  { region: "Valle", registros: 15200 },
  { region: "Cundinamarca", registros: 12800 },
  { region: "Santander", registros: 11400 },
  { region: "Boyacá", registros: 9800 },
  { region: "Nariño", registros: 8900 },
  { region: "Caldas", registros: 7600 },
  { region: "Risaralda", registros: 6800 },
]

const audioDistributionData = [
  { name: "Cantos", value: 45, color: "var(--color-chart-1)" },
  { name: "Llamadas", value: 28, color: "var(--color-chart-2)" },
  { name: "Alarmas", value: 15, color: "var(--color-chart-3)" },
  { name: "Otros", value: 12, color: "var(--color-chart-4)" },
]

const elevationData = [
  { elevation: "0-500m", especies: 320, registros: 28000 },
  { elevation: "500-1000m", especies: 480, registros: 35000 },
  { elevation: "1000-2000m", especies: 620, registros: 42000 },
  { elevation: "2000-3000m", especies: 450, registros: 31000 },
  { elevation: "3000-4000m", especies: 180, registros: 12000 },
  { elevation: "4000m+", especies: 45, registros: 3500 },
]

const temporalData = [
  { mes: "Ene", observaciones: 8500 },
  { mes: "Feb", observaciones: 9200 },
  { mes: "Mar", observaciones: 11500 },
  { mes: "Abr", observaciones: 14200 },
  { mes: "May", observaciones: 12800 },
  { mes: "Jun", observaciones: 10500 },
  { mes: "Jul", observaciones: 9800 },
  { mes: "Ago", observaciones: 10200 },
  { mes: "Sep", observaciones: 11800 },
  { mes: "Oct", observaciones: 13500 },
  { mes: "Nov", observaciones: 12200 },
  { mes: "Dic", observaciones: 9500 },
]

const familyData = [
  { familia: "Thraupidae", especies: 156 },
  { familia: "Tyrannidae", especies: 142 },
  { familia: "Trochilidae", especies: 165 },
  { familia: "Furnariidae", especies: 98 },
  { familia: "Parulidae", especies: 67 },
  { familia: "Icteridae", especies: 45 },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {entry.name}: <span className="text-primary font-semibold">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

function FilterBar() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filtros:</span>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-input border-border">
              <SelectValue placeholder="Región" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las regiones</SelectItem>
              <SelectItem value="andina">Andina</SelectItem>
              <SelectItem value="caribe">Caribe</SelectItem>
              <SelectItem value="pacifico">Pacífico</SelectItem>
              <SelectItem value="orinoquia">Orinoquía</SelectItem>
              <SelectItem value="amazonia">Amazonía</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-input border-border">
              <SelectValue placeholder="Familia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las familias</SelectItem>
              <SelectItem value="thraupidae">Thraupidae</SelectItem>
              <SelectItem value="tyrannidae">Tyrannidae</SelectItem>
              <SelectItem value="trochilidae">Trochilidae</SelectItem>
              <SelectItem value="furnariidae">Furnariidae</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-44 bg-input border-border">
              <SelectValue placeholder="Elevación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las altitudes</SelectItem>
              <SelectItem value="lowland">Tierras bajas (0-1000m)</SelectItem>
              <SelectItem value="mid">Media montaña (1000-2500m)</SelectItem>
              <SelectItem value="highland">Alta montaña (2500m+)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="ml-auto">
            Aplicar filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function AnalysisSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Análisis Exploratorio
        </h2>
        <p className="text-muted-foreground mt-1">
          Exploración interactiva de datos de avifauna colombiana
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Distribution */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Map className="w-5 h-5 text-primary" />
              Distribución por Departamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sightingsData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis dataKey="region" type="category" stroke="var(--color-muted-foreground)" fontSize={12} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="registros" fill="var(--color-chart-1)" radius={[0, 4, 4, 0]} name="Registros" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Audio Type Distribution */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-accent" />
              Distribución de Tipos de Audio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={audioDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {audioDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {audioDistributionData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Elevation Distribution */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Distribución por Elevación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={elevationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="elevation" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="especies"
                    stackId="1"
                    stroke="var(--color-chart-2)"
                    fill="var(--color-chart-2)"
                    fillOpacity={0.6}
                    name="Especies"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Temporal Distribution */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Observaciones por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temporalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="observaciones"
                    stroke="var(--color-chart-1)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-chart-1)", strokeWidth: 2 }}
                    name="Observaciones"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Family Distribution - Full Width */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Familias Taxonómicas por Número de Especies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={familyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="familia" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="especies" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} name="Especies" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
