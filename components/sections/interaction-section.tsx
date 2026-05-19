"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Mic,
  MicOff,
  MapPin,
  Mountain,
  Calendar,
  Play,
  Pause,
  Trash2,
  CheckCircle,
  AlertCircle,
  Navigation,
  FileAudio,
} from "lucide-react"

export function InteractionSection() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [elevation, setElevation] = useState([1500])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [manualCoords, setManualCoords] = useState({ lat: "", lng: "" })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
      setRecordedAudio(null)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording (mock)
      setIsRecording(false)
      setRecordedAudio("recorded_audio_mock.wav")
      setAudioFile(null)
    } else {
      // Start recording (mock)
      setIsRecording(true)
    }
  }

  const getCurrentLocation = () => {
    // Mock geolocation
    setLocation({ lat: 4.7109, lng: -74.0721 })
  }

  const setManualLocation = () => {
    if (manualCoords.lat && manualCoords.lng) {
      setLocation({
        lat: parseFloat(manualCoords.lat),
        lng: parseFloat(manualCoords.lng),
      })
    }
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
    setElevation([1500])
    setManualCoords({ lat: "", lng: "" })
  }

  const hasAudio = audioFile || recordedAudio
  const isReadyForPrediction = hasAudio && location

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Mic className="w-6 h-6 text-primary" />
          Panel de Interacción
        </h2>
        <p className="text-muted-foreground mt-1">
          Carga o graba audio y proporciona información geoespacial para la predicción
        </p>
      </div>

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
            {/* Current Location */}
            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground">Ubicación automática</Label>
              <Button
                variant="outline"
                className="w-full gap-2 border-accent/30 hover:bg-accent/10 hover:border-accent"
                onClick={getCurrentLocation}
              >
                <Navigation className="w-4 h-4 text-accent" />
                Obtener mi ubicación actual
              </Button>
            </div>

            {/* Manual Coordinates */}
            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground">O ingresa coordenadas manualmente</Label>
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
            </div>

            {/* Map Preview (Mock) */}
            <div className="relative h-32 rounded-lg bg-secondary/50 overflow-hidden border border-border">
              <div className="absolute inset-0 opacity-30">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                  <path d="M20,50 L80,50" stroke="currentColor" strokeWidth="0.3" className="text-border" />
                  <path d="M50,20 L50,80" stroke="currentColor" strokeWidth="0.3" className="text-border" />
                </svg>
              </div>
              {location && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <MapPin className="w-8 h-8 text-primary" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
                  </div>
                </div>
              )}
              {!location && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 text-sm">
                  Sin ubicación seleccionada
                </div>
              )}
            </div>
            {location && (
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">
                  {location.lat.toFixed(4)}°N, {Math.abs(location.lng).toFixed(4)}°W
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Metadata */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Mountain className="w-5 h-5 text-nido-coral" />
              Metadata Adicional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Elevation */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-muted-foreground">Elevación (metros)</Label>
                <span className="text-lg font-semibold text-foreground">{elevation[0]}m</span>
              </div>
              <Slider
                value={elevation}
                onValueChange={setElevation}
                min={0}
                max={5200}
                step={100}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0m (Nivel del mar)</span>
                <span>5,200m (Páramo)</span>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-3">
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

        {/* Summary Card */}
        <Card className={`bg-card border-border ${isReadyForPrediction ? "border-primary/30" : ""}`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {isReadyForPrediction ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
              )}
              Resumen de Metadata
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Audio</span>
                {hasAudio ? (
                  <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {audioFile ? audioFile.name : "Grabado"}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    Pendiente
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Ubicación</span>
                {location ? (
                  <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {location.lat.toFixed(2)}°, {location.lng.toFixed(2)}°
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    Pendiente
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Elevación</span>
                <Badge variant="secondary">{elevation[0]}m</Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Día del año</span>
                <Badge variant="secondary">{getDayOfYear(selectedDate)}</Badge>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={clearAll}>
                Limpiar todo
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={!isReadyForPrediction}
              >
                Ejecutar Predicción
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
