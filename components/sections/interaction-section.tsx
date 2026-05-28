  "use client"

import { useState, useRef } from "react"
import { birds } from "@/lib/data_links"
import  { Bird as inbird} from "@/lib/data_links"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Mic,
  MicOff,
  MapPin,
  Calendar,
  Play,
  Pause,
  Trash2,
  CheckCircle,
  AlertCircle,
  Navigation,
  FileAudio,
  Bird,
  ExternalLink,
  Map,
  Building2,
  Crosshair,
  Mountain,
} from "lucide-react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"

const COLOMBIA_GEO_URL = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/colombia/colombia-departments.json"

// Colombian cities with coordinates and elevation
const colombianCities = [
  { name: "Bogotá", lat: 4.7109, lng: -74.0721, elevation: 2640, department: "Cundinamarca" },
  { name: "Medellín", lat: 6.2518, lng: -75.5636, elevation: 1495, department: "Antioquia" },
  { name: "Cali", lat: 3.4516, lng: -76.5320, elevation: 1018, department: "Valle del Cauca" },
  { name: "Barranquilla", lat: 10.9639, lng: -74.7964, elevation: 18, department: "Atlántico" },
  { name: "Cartagena", lat: 10.3910, lng: -75.4794, elevation: 2, department: "Bolívar" },
  { name: "Santa Marta", lat: 11.2408, lng: -74.1990, elevation: 6, department: "Magdalena" },
  { name: "Bucaramanga", lat: 7.1254, lng: -73.1198, elevation: 959, department: "Santander" },
  { name: "Pereira", lat: 4.8133, lng: -75.6961, elevation: 1411, department: "Risaralda" },
  { name: "Manizales", lat: 5.0703, lng: -75.5138, elevation: 2153, department: "Caldas" },
  { name: "Villavicencio", lat: 4.1420, lng: -73.6266, elevation: 467, department: "Meta" },
  { name: "Leticia", lat: -4.2150, lng: -69.9406, elevation: 96, department: "Amazonas" },
  { name: "Armenia", lat: 4.5389, lng: -75.6723, elevation: 1483, department: "Quindío" },
  { name: "Neiva", lat: 2.9273, lng: -75.2819, elevation: 442, department: "Huila" },
  { name: "Popayán", lat: 2.4419, lng: -76.6061, elevation: 1737, department: "Cauca" },
  { name: "Tunja", lat: 5.5446, lng: -73.3578, elevation: 2820, department: "Boyacá" },
]

// Mock bird prediction results
const mockPredictions = [
  {
    name: "Tangara Dorada",
    scientificName: "Tangara arthus",
    confidence: 0.94,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Golden_tanager_%28Tangara_arthus_aurulenta%29.jpg/1200px-Golden_tanager_%28Tangara_arthus_aurulenta%29.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Tangara_arthus",
    family: "Thraupidae",
    conservationStatus: "LC",
  }
]

export function InteractionSection() {
  const [predictionResult, setPredictionResult] = useState<any | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number; elevation: number; name?: string } | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [manualCoords, setManualCoords] = useState({ lat: "", lng: "" })
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [locationMethod, setLocationMethod] = useState<"map" | "city" | "gps" | "manual">("city")
  const [mapClickCoords, setMapClickCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [showPrediction, setShowPrediction] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const getElevation = async (lat: number, lng: number): Promise<number> => {
  try {
    const res = await fetch(
      `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`
    )
    const data = await res.json()
    return data.results?.[0]?.elevation ?? 500
  } catch {
    return 500  // fallback si falla la API
  }
}
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
      setRecordedAudio(null)
      setShowPrediction(false)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      setRecordedAudio("recorded_audio_mock.wav")
      setAudioFile(null)
      setShowPrediction(false)
    } else {
      setIsRecording(true)
    }
  }

  const getCurrentLocation = () => {
    // Mock geolocation - would get elevation from API based on coords
    setLocation({ lat: 4.7109, lng: -74.0721, elevation: 2640, name: "Mi ubicación" })
  }

const setManualLocation = async () => {
  if (manualCoords.lat && manualCoords.lng) {
    const lat = parseFloat(manualCoords.lat)
    const lng = parseFloat(manualCoords.lng)
    const elevation = await getElevation(lat, lng)
    setLocation({ lat, lng, elevation })
  }
}

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName)
    const city = colombianCities.find(c => c.name === cityName)
    if (city) {
      setLocation({
        lat: city.lat,
        lng: city.lng,
        elevation: city.elevation,
        name: city.name,
      })
    }
  }

const handleMapClick = async (lat: number, lng: number) => {
  setMapClickCoords({ lat, lng })
  const elevation = await getElevation(lat, lng)
  setLocation({ lat, lng, elevation })
}
  const getDayOfYear = (dateStr: string) => {
    const date = new Date(dateStr)
    const start = new Date(date.getFullYear(), 0, 0)
    const diff = date.getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    return Math.floor(diff / oneDay)
  }

  const clearAll = () => {
    setAudioFile(null)
    setRecordedAudio(null)
    setLocation(null)
    setManualCoords({ lat: "", lng: "" })
    setSelectedCity("")
    setMapClickCoords(null)
    setShowPrediction(false)
  }

const runPrediction = async () => {
  if (!hasAudio || !location) return

  setIsProcessing(true)
  setShowPrediction(false)

  try {
    const formData = new FormData()

    // Audio: puede ser archivo subido o grabado
    if (audioFile) {
      console.log("AUDIO FILE:", audioFile)
      formData.append("audio", audioFile)
    } else if (recordedAudio) {
      // Si es grabación, convertir el blob a archivo
      const response = await fetch(recordedAudio)
      const blob = await response.blob()
      formData.append("audio", blob, "recording.wav")
    }

    // Metadata
    formData.append("latitude",    location.lat.toString())
    formData.append("longitude",   location.lng.toString())
    formData.append("recorded_at", `${selectedDate}T00:00:00`)
    formData.append("elevation",   location.elevation.toString())

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.detail || "Error en la predicción")
    }

    const data = await res.json()
    // Guardar resultado para mostrarlo
    setPredictionResult(data)
    setShowPrediction(true)

  } catch (error) {
    console.error("Error en predicción:", error)
    
    // Manejar el error como prefieras, por ejemplo un toast
    alert(error instanceof Error ? error.message : "Error desconocido")
  } finally {
    setIsProcessing(false)
  }
}

  const hasAudio = audioFile || recordedAudio
  const isReadyForPrediction = hasAudio && location

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Bird className="w-6 h-6 text-primary" />
          Identificación de Aves
        </h2>
        <p className="text-muted-foreground mt-1">
          Carga o graba audio bioacústico para identificar especies de aves colombianas
        </p>
      </div>

      {/* Show prediction results or input form */}
      {showPrediction ? (
        <div className="space-y-6">
          {/* Prediction Results */}
          <Card className="bg-card border-border border-primary/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Resultados de Identificación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {predictionResult?.predictions?.map((bird: any, index: number) => {
                  const birdData = birds.find(b => b.scientificName === bird.scientific_name);

                  return (
                    <Card key={index} className={`bg-secondary/30 border-border ${index === 0 ? "border-primary/50 ring-1 ring-primary/20" : ""}`}>
                      <CardContent className="p-4">
                        <div className="aspect-square relative rounded-lg overflow-hidden mb-3 bg-muted">
                          <img
                            src={birdData?.imageUrl ?? ""}
                            alt={birdData?.name}
                            className="w-full h-full object-cover"
                            crossOrigin="anonymous"
                          />
                          {index === 0 && (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-primary text-primary-foreground">
                                Top Match
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{bird.scientific_name}</h4>
                            <p className="text-sm text-muted-foreground italic">{bird.scientific_name}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs">
                              {bird.family}
                            </Badge>
                            <span className="text-sm font-semibold text-primary">
                              {(bird.confidence * 100).toFixed(0)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 pt-2">
                            <Badge variant="outline" className="text-xs text-green-600 border-green-600/30">
                              {birdData?.conservationStatus ?? "LC"}
                            </Badge>
                            <a
                              href={birdData?.wikipediaUrl ?? `https://en.wikipedia.org/wiki/${bird.scientific_name.replace(/ /g, "_")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline flex items-center gap-1 ml-auto"
                            >
                              Wikipedia <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Metadata Summary */}
              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Ubicación:</span>
                    <p className="font-medium text-foreground">{location?.name || `${location?.lat.toFixed(4)}°, ${location?.lng.toFixed(4)}°`}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Elevación:</span>
                    <p className="font-medium text-foreground">{location?.elevation}m</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fecha:</span>
                    <p className="font-medium text-foreground">{selectedDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Día del año:</span>
                    <p className="font-medium text-foreground">{getDayOfYear(selectedDate)}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowPrediction(false)}>
                  Nueva Identificación
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  Limpiar Todo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Audio Input Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileAudio className="w-5 h-5 text-primary" />
                Entrada de Audio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="space-y-3">
                <Label className="text-sm text-muted-foreground">Subir archivo de audio</Label>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer hover:border-primary/50 hover:bg-primary/5 ${
                    audioFile ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  {audioFile ? (
                    <div>
                      <p className="text-foreground font-medium">{audioFile.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(audioFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-muted-foreground">
                        Arrastra o haz clic para subir
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        MP3, WAV, OGG, FLAC
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">o</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Recording */}
              <div className="space-y-3">
                <Label className="text-sm text-muted-foreground">Grabar desde el navegador</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    size="lg"
                    className={`flex-1 gap-2 ${isRecording ? "" : "bg-primary hover:bg-primary/90"}`}
                    onClick={toggleRecording}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-5 h-5" />
                        Detener Grabación
                      </>
                    ) : (
                      <>
                        <Mic className="w-5 h-5" />
                        Iniciar Grabación
                      </>
                    )}
                  </Button>
                </div>
                {isRecording && (
                  <div className="flex items-center justify-center gap-2 py-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                    <span className="text-sm text-destructive">Grabando...</span>
                    <div className="flex gap-0.5 ml-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-destructive rounded-full wave-bar"
                          style={{ height: `${12 + Math.random() * 12}px` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {recordedAudio && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <FileAudio className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Audio grabado</p>
                        <p className="text-xs text-muted-foreground">Listo para análisis</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setRecordedAudio(null)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Date Selection */}
              <div className="space-y-3 pt-4 border-t border-border">
                <Label className="text-sm text-muted-foreground">Fecha de observación</Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-input border-border"
                />
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Día del año:{" "}
                    <span className="font-semibold text-foreground">{getDayOfYear(selectedDate)}</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Input Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Ubicación Geográfica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="city" onValueChange={(v) => setLocationMethod(v as "map" | "city" | "gps" | "manual")}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="city" className="text-xs">
                    <Building2 className="w-3 h-3 mr-1" />
                    Ciudad
                  </TabsTrigger>
                  <TabsTrigger value="map" className="text-xs">
                    <Map className="w-3 h-3 mr-1" />
                    Mapa
                  </TabsTrigger>
                  <TabsTrigger value="gps" className="text-xs">
                    <Navigation className="w-3 h-3 mr-1" />
                    GPS
                  </TabsTrigger>
                  <TabsTrigger value="manual" className="text-xs">
                    <Crosshair className="w-3 h-3 mr-1" />
                    Manual
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="city" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Selecciona una ciudad</Label>
                    <Select value={selectedCity} onValueChange={handleCitySelect}>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Elige una ciudad colombiana" />
                      </SelectTrigger>
                      <SelectContent>
                        {colombianCities.map((city) => (
                          <SelectItem key={city.name} value={city.name}>
                            {city.name}, {city.department}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="map" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Haz clic en el mapa para seleccionar</Label>
                    <div className="h-64 rounded-lg overflow-hidden border border-border relative">
                      <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                          scale: 1400,
                          center: [-74, 4.5],
                        }}
                        className="w-full h-full bg-secondary/30"
                        onClick={(e: React.MouseEvent) => {
                          // Simplified click handler - in production, use proper coordinate conversion
                          const rect = e.currentTarget.getBoundingClientRect()
                          const x = e.clientX - rect.left
                          const y = e.clientY - rect.top
                          // Approximate coordinate mapping for Colombia
                          const lng = -82 + (x / rect.width) * 16
                          const lat = 13 - (y / rect.height) * 17
                          if (lat > -5 && lat < 13 && lng > -82 && lng < -66) {
                            handleMapClick(lat, lng)
                          }
                        }}
                      >
                        <Geographies geography={COLOMBIA_GEO_URL}>
                          {({ geographies }) =>
                            geographies.map((geo) => (
                              <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="var(--color-muted)"
                                stroke="var(--color-border)"
                                strokeWidth={0.5}
                                style={{
                                  default: { outline: "none", cursor: "pointer" },
                                  hover: { fill: "var(--color-primary)", opacity: 0.4, outline: "none" },
                                  pressed: { outline: "none" },
                                }}
                              />
                            ))
                          }
                        </Geographies>
                        {mapClickCoords && (
                          <Marker coordinates={[mapClickCoords.lng, mapClickCoords.lat]}>
                            <circle r={6} fill="var(--color-primary)" />
                            <circle r={10} fill="var(--color-primary)" fillOpacity={0.3} />
                          </Marker>
                        )}
                      </ComposableMap>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gps" className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-accent/30 hover:bg-accent/10 hover:border-accent"
                    onClick={getCurrentLocation}
                  >
                    <Navigation className="w-4 h-4 text-accent" />
                    Obtener mi ubicación actual
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Se solicitará permiso para acceder a tu GPS
                  </p>
                </TabsContent>

                <TabsContent value="manual" className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-muted-foreground/70">Latitud</Label>
                      <Input
                        type="number"
                        step="0.0001"
                        placeholder="4.7109"
                        value={manualCoords.lat}
                        onChange={(e) => setManualCoords({ ...manualCoords, lat: e.target.value })}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground/70">Longitud</Label>
                      <Input
                        type="number"
                        step="0.0001"
                        placeholder="-74.0721"
                        value={manualCoords.lng}
                        onChange={(e) => setManualCoords({ ...manualCoords, lng: e.target.value })}
                        className="bg-input border-border"
                      />
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={setManualLocation}
                    disabled={!manualCoords.lat || !manualCoords.lng}
                  >
                    Establecer ubicación
                  </Button>
                </TabsContent>
              </Tabs>

              {/* Location Display */}
              {location && (
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-foreground">Ubicación seleccionada</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Coordenadas:</span>
                      <p className="font-mono text-foreground">
                        {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mountain className="w-4 h-4 text-nido-coral" />
                      <div>
                        <span className="text-muted-foreground">Elevación:</span>
                        <p className="font-semibold text-foreground">{location.elevation}m</p>
                      </div>
                    </div>
                  </div>
                  {location.name && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Lugar:</span>
                      <p className="font-medium text-foreground">{location.name}</p>
                    </div>
                  )}
                </div>
              )}

              {!location && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Sin ubicación seleccionada</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Card */}
          <Card className={`bg-card border-border lg:col-span-2 ${isReadyForPrediction ? "border-primary/30" : ""}`}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isReadyForPrediction ? "bg-primary/10" : "bg-muted"}`}>
                    {isReadyForPrediction ? (
                      <CheckCircle className="w-6 h-6 text-primary" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {isReadyForPrediction ? "Listo para identificar" : "Completa los datos requeridos"}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant={hasAudio ? "default" : "outline"} className={hasAudio ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}>
                        {hasAudio ? <CheckCircle className="w-3 h-3 mr-1" /> : null}
                        Audio
                      </Badge>
                      <Badge variant={location ? "default" : "outline"} className={location ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}>
                        {location ? <CheckCircle className="w-3 h-3 mr-1" /> : null}
                        Ubicación
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={clearAll}>
                    Limpiar
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 min-w-[180px]"
                    disabled={!isReadyForPrediction || isProcessing}
                    onClick={runPrediction}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Bird className="w-4 h-4 mr-2" />
                        Identificar Ave
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
