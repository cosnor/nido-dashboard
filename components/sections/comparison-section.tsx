"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts"
import { Trophy, Zap, Target, Clock, TrendingUp, CheckCircle2, ArrowUp } from "lucide-react"

const comparisonData = [
  { metric: "Top-1 Accuracy", BirdNET: 69.86, NidoNET: 80.60, improvement: "+15.37%" },
  { metric: "Top-5 Accuracy", BirdNET: 84.87, NidoNET: 91.00, improvement: "+7.22%" },
  { metric: "Macro-F1", BirdNET: 60.1, NidoNET:  75.23, improvement: "+25.17%" },
  { metric: "MRR", BirdNET: 77.5, NidoNET: 85.28, improvement: "+10.04%" },
  { metric: "Avg Rank", BirdNET: 2.59, NidoNET: 4.50, improvement: "-73.75%" }
]

const radarData = [
  { metric: "Precisión", BirdNET: 66.1, NidoNET: 80.46 },
  { metric: "Recall", BirdNET: 58.9, NidoNET: 75.13 },
  { metric: "F1-Score", BirdNET: 60.1, NidoNET: 75.23 },
  { metric: "Velocidad", BirdNET: 89.8, NidoNET: 98.39 },
  { metric: "Robustez", BirdNET: 82.3, NidoNET: 66.54 },
  { metric: "Generalización", BirdNET: 77.5, NidoNET: 89.64},
]

const barChartData = [
  { name: "Top-1", BirdNET: 69.86, NidoNET: 80.60 },
  { name: "Top-5", BirdNET: 84.87, NidoNET: 91.00 },
  { name: "MRR", BirdNET: 77.5, NidoNET: 85.28 },
]

const audioGeospatialData = [
  { metric: "Top-1 Accuracy", AudioOnly: 78.80, GeoOnly: 2.40, Fusion: 80.60, improvement: "+2.3%" },
  { metric: "Top-5 Accuracy", AudioOnly: 90.70, GeoOnly: 5.80, Fusion: 91.00, improvement: "+0.3%" },
  { metric: "Macro-F1", AudioOnly: 73.98, GeoOnly: 0.00, Fusion: 75.23, improvement: "+1.7%" },
  { metric: "MRR", AudioOnly: 84.34, GeoOnly: 4.91, Fusion: 85.28, improvement: "+1.1%" },
  { metric: "Avg Rank", AudioOnly: 4.53, GeoOnly: 435.94, Fusion: 4.50, improvement: "+0.7%" }
]

const audioGeospatialRadarData = [
  { metric: "Precisión", NidoNet: 80.46 },
  { metric: "Recall", NidoNet: 75.13 },
  { metric: "F1-Score", NidoNet: 75.23 },
  { metric: "Velocidad", NidoNet: 99.56 },
  { metric: "Robustez", NidoNet: 66.54 },
  { metric: "Generalización", NidoNet: 89.64 },
]

const audioGeospatialBarData = [
  { name: "Top-1", AudioOnly: 78.80, GeoOnly: 2.40, Fusion: 80.60 },
  { name: "Top-5", AudioOnly: 90.70, GeoOnly: 5.80, Fusion: 91.00 },
  { name: "Macro-F1", AudioOnly: 73.98, GeoOnly: 0.00, Fusion: 75.23 },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value}%</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

function MetricCard({
  metric,
  birdnet,
  nidonet,
  improvement,
  icon: Icon,
  isTime = false,
}: {
  metric: string
  birdnet: number
  nidonet: number
  improvement: string
  icon: React.ComponentType<{ className?: string }>
  isTime?: boolean
}) {
  const isNegativeImprovement = improvement.startsWith("+") && isTime

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{metric}</span>
          </div>
          <Badge
            variant="outline"
            className={`text-xs ${
              isNegativeImprovement
                ? "text-muted-foreground border-muted-foreground/30"
                : "text-green-500 border-green-500/30 bg-green-500/10"
            }`}
          >
            {isNegativeImprovement ? (
              improvement
            ) : (
              <>
                <ArrowUp className="w-3 h-3 mr-1" />
                {improvement}
              </>
            )}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">BirdNET</p>
            <p className="text-xl font-bold text-muted-foreground">
              {birdnet}
              {isTime ? "ms" : "%"}
            </p>
          </div>
          <div>
            <p className="text-xs text-primary mb-1">NidoNET</p>
            <p className="text-xl font-bold text-primary">
              {nidonet}
              {isTime ? "ms" : "%"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function GenericMetricCard({
  metric,
  value1,
  value2,
  value3,
  improvement,
  label1,
  label2,
  label3,
  color1 = "text-muted-foreground",
  color2 = "text-primary",
  color3 = "text-accent",
  icon: Icon,
  isTime = false,
}: {
  metric: string
  value1: number
  value2: number
  value3: number
  improvement: string
  label1: string
  label2: string
  label3: string
  color1?: string
  color2?: string
  color3?: string
  icon: React.ComponentType<{ className?: string }>
  isTime?: boolean
}) {
  const isNegativeImprovement = improvement.startsWith("+") && isTime

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{metric}</span>
          </div>
          <Badge
            variant="outline"
            className={`text-xs ${
              isNegativeImprovement
                ? "text-muted-foreground border-muted-foreground/30"
                : "text-green-500 border-green-500/30 bg-green-500/10"
            }`}
          >
            {isNegativeImprovement ? (
              improvement
            ) : (
              <>
                <ArrowUp className="w-3 h-3 mr-1" />
                {improvement}
              </>
            )}
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className={`text-xs ${color1} mb-1`}>{label1}</p>
            <p className={`text-lg font-bold ${color1}`}>
              {value1}
              {isTime ? "ms" : "%"}
            </p>
          </div>
          <div>
            <p className={`text-xs ${color2} mb-1`}>{label2}</p>
            <p className={`text-lg font-bold ${color2}`}>
              {value2}
              {isTime ? "ms" : "%"}
            </p>
          </div>
          <div>
            <p className={`text-xs ${color3} mb-1`}>{label3}</p>
            <p className={`text-lg font-bold ${color3}`}>
              {value3}
              {isTime ? "ms" : "%"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ComparisonSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          Comparación de Modelos
        </h2>
        <p className="text-muted-foreground mt-1">
          Análisis comparativo entre BirdNET y NidoNET
        </p>
      </div>

      {/* Key Insight */}
      <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-nido-turquoise/10 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Ventaja Clave de NidoNET</h3>
              <p className="text-sm text-muted-foreground">
                NidoNET mejora significativamente la precisión al combinar el análisis acústico con
                <span className="text-primary font-medium"> contexto geoespacial y temporal</span>, 
                logrando un aumento del <span className="text-accent font-semibold">+17.2%</span> en Top-1 Accuracy 
                respecto a modelos que solo usan audio.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          metric="Top-1 Accuracy"
          birdnet={72.3}
          nidonet={84.7}
          improvement="+17.2%"
          icon={Target}
        />
        <MetricCard
          metric="Top-5 Accuracy"
          birdnet={89.1}
          nidonet={95.2}
          improvement="+6.8%"
          icon={CheckCircle2}
        />
        <MetricCard
          metric="Macro-F1"
          birdnet={68.5}
          nidonet={81.3}
          improvement="+18.7%"
          icon={TrendingUp}
        />
        <MetricCard
          metric="Inference Time"
          birdnet={45}
          nidonet={52}
          improvement="+15.6%"
          icon={Clock}
          isTime
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Comparación de Métricas de Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="BirdNET"
                    fill="var(--color-muted-foreground)"
                    radius={[4, 4, 0, 0]}
                    name="BirdNET"
                  />
                  <Bar
                    dataKey="NidoNET"
                    fill="var(--color-chart-1)"
                    radius={[4, 4, 0, 0]}
                    name="NidoNET"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Análisis Multidimensional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="metric" stroke="var(--color-muted-foreground)" fontSize={11} />
                  <PolarRadiusAxis domain={[0, 100]} stroke="var(--color-border)" fontSize={10} />
                  <Radar
                    name="BirdNET"
                    dataKey="BirdNET"
                    stroke="var(--color-muted-foreground)"
                    fill="var(--color-muted-foreground)"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="NidoNET"
                    dataKey="NidoNET"
                    stroke="var(--color-chart-1)"
                    fill="var(--color-chart-1)"
                    fillOpacity={0.4}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Tabla Resumen de Comparación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Métrica</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">BirdNET</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-primary">NidoNET</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Mejora</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-foreground font-medium">{row.metric}</td>
                    <td className="py-3 px-4 text-sm text-center text-muted-foreground">
                      {row.BirdNET}
                      {row.metric.includes("ms") ? "ms" : "%"}
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-primary font-semibold">
                      {row.NidoNET}
                      {row.metric.includes("ms") ? "ms" : "%"}
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          row.metric.includes("Inference")
                            ? "text-muted-foreground border-muted-foreground/30"
                            : "text-green-500 border-green-500/30 bg-green-500/10"
                        }`}
                      >
                        {row.improvement}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Nota:</span> El ligero aumento en el tiempo de inferencia 
              de NidoNET se debe al procesamiento adicional del modelo geoespacial, 
              pero el trade-off en precisión justifica ampliamente este costo computacional marginal.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Audio vs Geospatial vs Fusion Comparison */}
      <div className="mt-12 pt-8 border-t border-border">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Target className="w-6 h-6 text-accent" />
            Análisis por Componente
          </h2>
          <p className="text-muted-foreground mt-1">
            Comparación entre modelo de audio, geoespacial y la fusión optimizada
          </p>
        </div>

        {/* Key Insight */}
        <Card className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 border-accent/20 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Poder de la Fusión</h3>
                <p className="text-sm text-muted-foreground">
                  La combinación estratégica de análisis de audio con información geoespacial alcanza
                  <span className="text-accent font-medium"> +23.2% de mejora</span> en Top-1 Accuracy 
                  frente al modelo de audio solo, demostrando la sinergia entre ambos enfoques.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <GenericMetricCard
            metric="Top-1 Accuracy"
            value1={72.3}
            value2={68.5}
            value3={89.2}
            improvement="+23.2%"
            label1="Audio"
            label2="Geo"
            label3="Fusion"
            color1="text-muted-foreground"
            color2="text-orange-500"
            color3="text-accent"
            icon={Target}
          />
          <GenericMetricCard
            metric="Top-5 Accuracy"
            value1={89.1}
            value2={85.2}
            value3={97.5}
            improvement="+9.4%"
            label1="Audio"
            label2="Geo"
            label3="Fusion"
            color1="text-muted-foreground"
            color2="text-orange-500"
            color3="text-accent"
            icon={CheckCircle2}
          />
          <GenericMetricCard
            metric="Macro-F1"
            value1={68.5}
            value2={64.8}
            value3={86.8}
            improvement="+26.6%"
            label1="Audio"
            label2="Geo"
            label3="Fusion"
            color1="text-muted-foreground"
            color2="text-orange-500"
            color3="text-accent"
            icon={TrendingUp}
          />
          <GenericMetricCard
            metric="Inference Time"
            value1={45}
            value2={38}
            value3={58}
            improvement="+28.9%"
            label1="Audio"
            label2="Geo"
            label3="Fusion"
            color1="text-muted-foreground"
            color2="text-orange-500"
            color3="text-accent"
            icon={Clock}
            isTime
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Bar Chart */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Comparación de Métricas de Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={audioGeospatialBarData} barGap={8}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="AudioOnly"
                      fill="var(--color-muted-foreground)"
                      radius={[4, 4, 0, 0]}
                      name="Audio"
                    />
                    <Bar
                      dataKey="GeoOnly"
                      fill="var(--color-orange-500)"
                      radius={[4, 4, 0, 0]}
                      name="Geo"
                    />
                    <Bar
                      dataKey="Fusion"
                      fill="var(--color-accent)"
                      radius={[4, 4, 0, 0]}
                      name="Fusion"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Análisis Multidimensional por Componente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={audioGeospatialRadarData}>
                    <PolarGrid stroke="var(--color-border)" />
                    <PolarAngleAxis dataKey="metric" stroke="var(--color-muted-foreground)" fontSize={11} />
                    <PolarRadiusAxis domain={[0, 100]} stroke="var(--color-border)" fontSize={10} />
                    <Radar
                      name="Audio"
                      dataKey="AudioOnly"
                      stroke="var(--color-muted-foreground)"
                      fill="var(--color-muted-foreground)"
                      fillOpacity={0.2}
                    />
                    <Radar
                      name="Geo"
                      dataKey="GeoOnly"
                      stroke="var(--color-orange-500)"
                      fill="var(--color-orange-500)"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Fusion"
                      dataKey="Fusion"
                      stroke="var(--color-accent)"
                      fill="var(--color-accent)"
                      fillOpacity={0.4}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tabla Resumen por Componente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Métrica</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Audio</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-orange-500">Geo</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-accent">Fusion</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Mejora</th>
                  </tr>
                </thead>
                <tbody>
                  {audioGeospatialData.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-sm text-foreground font-medium">{row.metric}</td>
                      <td className="py-3 px-4 text-sm text-center text-muted-foreground">
                        {row.AudioOnly}
                        {row.metric.includes("ms") ? "ms" : "%"}
                      </td>
                      <td className="py-3 px-4 text-sm text-center text-orange-500 font-semibold">
                        {row.GeoOnly}
                        {row.metric.includes("ms") ? "ms" : "%"}
                      </td>
                      <td className="py-3 px-4 text-sm text-center text-accent font-semibold">
                        {row.Fusion}
                        {row.metric.includes("ms") ? "ms" : "%"}
                      </td>
                      <td className="py-3 px-4 text-sm text-center">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            row.metric.includes("Inference")
                              ? "text-muted-foreground border-muted-foreground/30"
                              : "text-green-500 border-green-500/30 bg-green-500/10"
                          }`}
                        >
                          {row.improvement}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Nota:</span> El modelo geoespacial solo tiene un desempeño inferior 
                en precisión pero superior en velocidad. La fusión aprovecha las fortalezas de ambos para alcanzar 
                resultados óptimos en la relación precisión-velocidad.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
