"use client"

import { useState, useEffect } from "react"
import { Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Filter, FileCode2, Map, TrendingUp, Volume2, MapPin } from "lucide-react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"

// Colombia GeoJSON simplified
const COLOMBIA_GEO_URL = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/colombia/colombia-departments.json"

// Mock data for chartss
const sightingsData = [
  { region: "Antioquia", registros: 18500, especies: 420, confianza: 94 },
  { region: "Valle", registros: 15200, especies: 380, confianza: 91 },
  { region: "Cundinamarca", registros: 12800, especies: 350, confianza: 89 },
  { region: "Santander", registros: 11400, especies: 310, confianza: 87 },
  { region: "Boyacá", registros: 9800, especies: 280, confianza: 85 },
  { region: "Nariño", registros: 8900, especies: 260, confianza: 83 },
  { region: "Caldas", registros: 7600, especies: 240, confianza: 82 },
  { region: "Risaralda", registros: 6800, especies: 220, confianza: 80 },
]

const audioDistributionData = [
  { type: "Cantos", count: 45000, percentage: 45 },
  { type: "Llamadas", count: 28000, percentage: 28 },
  { type: "Alarmas", count: 15000, percentage: 15 },
  { type: "Vuelo", count: 8000, percentage: 8 },
  { type: "Otros", count: 4000, percentage: 4 },
]

const elevationData = [
  { elevation: "0-500m", especies: 320, registros: 28000, diversidad: 85 },
  { elevation: "500-1000m", especies: 480, registros: 35000, diversidad: 92 },
  { elevation: "1000-2000m", especies: 620, registros: 42000, diversidad: 98 },
  { elevation: "2000-3000m", especies: 450, registros: 31000, diversidad: 88 },
  { elevation: "3000-4000m", especies: 180, registros: 12000, diversidad: 72 },
  { elevation: "4000m+", especies: 45, registros: 3500, diversidad: 45 },
]

const temporalData = [
  { mes: "Ene", observaciones: 8500, especies: 320, promedio: 2.66 },
  { mes: "Feb", observaciones: 9200, especies: 335, promedio: 2.74 },
  { mes: "Mar", observaciones: 11500, especies: 385, promedio: 2.99 },
  { mes: "Abr", observaciones: 14200, especies: 450, promedio: 3.15 },
  { mes: "May", observaciones: 12800, especies: 420, promedio: 3.05 },
  { mes: "Jun", observaciones: 10500, especies: 380, promedio: 2.76 },
  { mes: "Jul", observaciones: 9800, especies: 360, promedio: 2.72 },
  { mes: "Ago", observaciones: 10200, especies: 370, promedio: 2.76 },
  { mes: "Sep", observaciones: 11800, especies: 400, promedio: 2.95 },
  { mes: "Oct", observaciones: 13500, especies: 440, promedio: 3.07 },
  { mes: "Nov", observaciones: 12200, especies: 410, promedio: 2.97 },
  { mes: "Dic", observaciones: 9500, especies: 350, promedio: 2.71 },
]

const familyData = [
  { familia: "Thraupidae", especies: 156 },
  { familia: "Tyrannidae", especies: 142 },
  { familia: "Trochilidae", especies: 165 },
  { familia: "Furnariidae", especies: 98 },
  { familia: "Parulidae", especies: 67 },
  { familia: "Icteridae", especies: 45 },
]

// Audio characteristics for radar chart
const audioCharacteristicsData = [
  { characteristic: "Frecuencia", Cantos: 85, Llamadas: 70, Alarmas: 95 },
  { characteristic: "Duración", Cantos: 90, Llamadas: 40, Alarmas: 30 },
  { characteristic: "Complejidad", Cantos: 95, Llamadas: 50, Alarmas: 20 },
  { characteristic: "Repetición", Cantos: 70, Llamadas: 85, Alarmas: 90 },
  { characteristic: "Volumen", Cantos: 75, Llamadas: 60, Alarmas: 100 },
]

// Hotspots for the map
const birdHotspots = [
  { name: "Bogotá", coordinates: [-74.0721, 4.7109] as [number, number], species: 450 },
  { name: "Medellín", coordinates: [-75.5636, 6.2518] as [number, number], species: 380 },
  { name: "Cali", coordinates: [-76.5320, 3.4516] as [number, number], species: 420 },
  { name: "Leticia", coordinates: [-69.9406, -4.2150] as [number, number], species: 520 },
  { name: "Santa Marta", coordinates: [-74.1990, 11.2408] as [number, number], species: 310 },
  { name: "Bucaramanga", coordinates: [-73.1198, 7.1254] as [number, number], species: 290 },
]

type EdaMapAsset = {
  src: string
  title: string
  fileName: string
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color?: string }>; label?: string }) => {
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

function ColombiaMap() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent" />
          Mapa de Avistamientos en Colombia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 1800,
              center: [-74, 4.5],
            }}
            className="w-full h-full"
          >
            <Geographies geography={COLOMBIA_GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="var(--color-secondary)"
                    stroke="var(--color-border)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "var(--color-primary)", opacity: 0.3, outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {birdHotspots.map(({ name, coordinates, species }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle
                  r={Math.sqrt(species) / 3}
                  fill="var(--color-primary)"
                  fillOpacity={0.7}
                  stroke="var(--color-primary-foreground)"
                  strokeWidth={1}
                />
                <title>{`${name}: ${species} especies`}</title>
              </Marker>
            ))}
          </ComposableMap>
          
        </div>
      </CardContent>
    </Card>
  )
}
function EdaMapGallery() {
  const [maps, setMaps] = useState<EdaMapAsset[]>([])
  const [selectedMapIndex, setSelectedMapIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadMaps() {
      try {
        const response = await fetch("/api/eda-maps")

        if (!response.ok) {
          throw new Error("No se pudieron cargar los mapas EDA")
        }

        const data = (await response.json()) as { maps?: EdaMapAsset[] }

        if (isMounted) {
          setMaps(data.maps ?? [])
          setSelectedMapIndex(0)
        }
      } catch {
        if (isMounted) {
          setMaps([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadMaps()

    return () => {
      isMounted = false
    }
  }, [])

  const selectedMap = maps[selectedMapIndex]

  if (isLoading) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-accent" />
            Mapas EDA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[420px] w-full animate-pulse rounded-md border border-border bg-muted/40" />
        </CardContent>
      </Card>
    )
  }

  if (!selectedMap) {
    return <ColombiaMap />
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-accent" />
            Mapas EDA
          </CardTitle>
          {maps.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {maps.map((map, index) => (
                <Button
                  key={map.src}
                  type="button"
                  variant={selectedMapIndex === index ? "default" : "outline"}
                  size="sm"
                  className="max-w-52 truncate"
                  onClick={() => setSelectedMapIndex(index)}
                  title={map.title}
                >
                  {map.title}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <figure className="space-y-3">
          <div className="flex min-h-[420px] w-full items-center justify-center overflow-hidden rounded-md border border-border bg-muted/30">
            <iframe
              src={selectedMap.src}
              title={selectedMap.title}
              className="h-[620px] w-full border-0"
            />
          </div>
          <figcaption className="text-sm text-muted-foreground">
            {selectedMap.title}
          </figcaption>
        </figure>
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

      {/* Colombia Map - Full Width */}
      <EdaMapGallery />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Distribution */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Map className="w-5 h-5 text-primary" />
              Distribución por Departamento (EDA)
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
                  <Bar dataKey="especies" fill="var(--color-accent)" radius={[0, 4, 4, 0]} name="Especies" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Audio Type Distribution - Changed to Horizontal Bar Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-accent" />
              Distribución de Tipos de Audio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={audioDistributionData} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis dataKey="type" type="category" stroke="var(--color-muted-foreground)" fontSize={12} width={70} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="var(--color-chart-2)" radius={[0, 4, 4, 0]} name="Registros" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Audio Characteristics Radar */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-nido-coral" />
              Características de Audio por Tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={audioCharacteristicsData}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="characteristic" stroke="var(--color-muted-foreground)" fontSize={11} />
                  <PolarRadiusAxis stroke="var(--color-muted-foreground)" fontSize={10} />
                  <Radar name="Cantos" dataKey="Cantos" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.3} />
                  <Radar name="Llamadas" dataKey="Llamadas" stroke="var(--color-chart-2)" fill="var(--color-chart-2)" fillOpacity={0.3} />
                  <Radar name="Alarmas" dataKey="Alarmas" stroke="var(--color-chart-3)" fill="var(--color-chart-3)" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-chart-1)" }} />
                <span className="text-xs text-muted-foreground">Cantos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-chart-2)" }} />
                <span className="text-xs text-muted-foreground">Llamadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-chart-3)" }} />
                <span className="text-xs text-muted-foreground">Alarmas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Elevation Distribution */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Distribución por Elevación (EDA)</CardTitle>
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
                    stroke="var(--color-chart-1)"
                    fill="var(--color-chart-1)"
                    fillOpacity={0.6}
                    name="Especies"
                  />
                  <Area
                    type="monotone"
                    dataKey="diversidad"
                    stackId="2"
                    stroke="var(--color-accent)"
                    fill="var(--color-accent)"
                    fillOpacity={0.4}
                    name="Índice Diversidad"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Temporal Distribution */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Patrón Temporal Mensual (EDA)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temporalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis yAxisId="left" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="observaciones"
                    stroke="var(--color-chart-1)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-chart-1)", strokeWidth: 2 }}
                    name="Observaciones"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="especies"
                    stroke="var(--color-accent)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-accent)" }}
                    name="Especies Detectadas"
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
