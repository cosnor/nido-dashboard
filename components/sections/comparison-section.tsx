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
  { metric: "Top-1 Accuracy", BirdNET: 72.3, NidoNET: 84.7, improvement: "+17.2%" },
  { metric: "Top-5 Accuracy", BirdNET: 89.1, NidoNET: 95.2, improvement: "+6.8%" },
  { metric: "Macro-F1", BirdNET: 68.5, NidoNET: 81.3, improvement: "+18.7%" },
  { metric: "Inference (ms)", BirdNET: 45, NidoNET: 52, improvement: "+15.6%" },
]

const radarData = [
  { metric: "Precisión", BirdNET: 72, NidoNET: 85 },
  { metric: "Recall", BirdNET: 68, NidoNET: 82 },
  { metric: "F1-Score", BirdNET: 70, NidoNET: 83 },
  { metric: "Velocidad", BirdNET: 90, NidoNET: 85 },
  { metric: "Robustez", BirdNET: 65, NidoNET: 88 },
  { metric: "Generalización", BirdNET: 60, NidoNET: 80 },
]

const barChartData = [
  { name: "Top-1", BirdNET: 72.3, NidoNET: 84.7 },
  { name: "Top-5", BirdNET: 89.1, NidoNET: 95.2 },
  { name: "Macro-F1", BirdNET: 68.5, NidoNET: 81.3 },
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
    </div>
  )
}
