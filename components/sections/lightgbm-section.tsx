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
  LineChart,
  Line,
} from "recharts"
import {
  Trees,
  Zap,
  Target,
  Clock,
  Database,
  TrendingUp,
  Cpu,
  Layers,
  GitBranch,
  CheckCircle,
  Info,
} from "lucide-react"

const featureImportance = [
  { feature: "Mel Spectrogram", importance: 0.28 },
  { feature: "Elevación", importance: 0.18 },
  { feature: "Latitud", importance: 0.15 },
  { feature: "Longitud", importance: 0.12 },
  { feature: "Día del Año", importance: 0.11 },
  { feature: "MFCC Features", importance: 0.09 },
  { feature: "Hora del día", importance: 0.07 },
]

const modelComparison = [
  { metric: "Precisión", LightGBM: 89.4, RandomForest: 82.1, XGBoost: 87.2 },
  { metric: "Recall", LightGBM: 87.8, RandomForest: 79.5, XGBoost: 85.1 },
  { metric: "F1-Score", LightGBM: 88.6, RandomForest: 80.7, XGBoost: 86.1 },
  { metric: "Velocidad", LightGBM: 95, RandomForest: 60, XGBoost: 75 },
  { metric: "Memoria", LightGBM: 90, RandomForest: 70, XGBoost: 78 },
]

const trainingProgress = [
  { iteration: 100, trainLoss: 0.45, validLoss: 0.52 },
  { iteration: 200, trainLoss: 0.32, validLoss: 0.38 },
  { iteration: 300, trainLoss: 0.24, validLoss: 0.29 },
  { iteration: 400, trainLoss: 0.18, validLoss: 0.23 },
  { iteration: 500, trainLoss: 0.14, validLoss: 0.19 },
  { iteration: 600, trainLoss: 0.11, validLoss: 0.16 },
  { iteration: 700, trainLoss: 0.09, validLoss: 0.14 },
  { iteration: 800, trainLoss: 0.08, validLoss: 0.13 },
]

const modelMetrics = [
  { label: "Top-1 Accuracy", value: "89.4%", icon: Target, color: "text-primary" },
  { label: "Top-5 Accuracy", value: "96.2%", icon: TrendingUp, color: "text-accent" },
  { label: "Tiempo Inferencia", value: "12ms", icon: Clock, color: "text-nido-coral" },
  { label: "Tamaño Modelo", value: "45MB", icon: Database, color: "text-chart-3" },
]

const hyperparameters = [
  { param: "num_leaves", value: "128", description: "Número máximo de hojas por árbol" },
  { param: "max_depth", value: "12", description: "Profundidad máxima del árbol" },
  { param: "learning_rate", value: "0.05", description: "Tasa de aprendizaje" },
  { param: "n_estimators", value: "800", description: "Número de árboles en el ensemble" },
  { param: "min_child_samples", value: "20", description: "Muestras mínimas por hoja" },
  { param: "subsample", value: "0.8", description: "Fracción de muestras por árbol" },
  { param: "colsample_bytree", value: "0.8", description: "Fracción de features por árbol" },
  { param: "reg_alpha", value: "0.1", description: "Regularización L1" },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color?: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {entry.name}: <span className="text-primary font-semibold">{typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function LightGBMSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Trees className="w-6 h-6 text-primary" />
          Modelo LightGBM
        </h2>
        <p className="text-muted-foreground mt-1">
          Características y resultados del modelo de gradient boosting para clasificación geoespacial
        </p>
      </div>

      {/* What is LightGBM */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground text-lg">¿Qué es LightGBM?</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong>LightGBM</strong> (Light Gradient Boosting Machine) es un framework de gradient boosting 
                desarrollado por Microsoft que utiliza <strong>árboles de decisión</strong> como aprendices base. 
                A diferencia de otros algoritmos que crecen los árboles nivel por nivel (level-wise), LightGBM 
                usa un enfoque <strong>leaf-wise</strong> que crece los árboles hoja por hoja, eligiendo siempre 
                la hoja que produce la mayor reducción de pérdida.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-3 rounded-lg bg-card border border-border">
                  <Zap className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm font-medium text-foreground">Alta Velocidad</p>
                  <p className="text-xs text-muted-foreground">20x más rápido que XGBoost tradicional</p>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <Cpu className="w-5 h-5 text-accent mb-2" />
                  <p className="text-sm font-medium text-foreground">Bajo Consumo</p>
                  <p className="text-xs text-muted-foreground">Usa menos memoria que otras implementaciones</p>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <Target className="w-5 h-5 text-nido-coral mb-2" />
                  <p className="text-sm font-medium text-foreground">Alta Precisión</p>
                  <p className="text-xs text-muted-foreground">Resultados state-of-the-art en clasificación</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {modelMetrics.map((metric, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <metric.icon className={`w-8 h-8 mx-auto mb-2 ${metric.color}`} />
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Importance */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Importancia de Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureImportance} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} domain={[0, 0.3]} />
                  <YAxis dataKey="feature" type="category" stroke="var(--color-muted-foreground)" fontSize={11} width={100} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="importance" fill="var(--color-chart-1)" radius={[0, 4, 4, 0]} name="Importancia" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              El espectrograma mel es el feature más importante, seguido por datos geoespaciales
            </p>
          </CardContent>
        </Card>

        {/* Model Comparison Radar */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-accent" />
              Comparación con Otros Modelos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={modelComparison}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="metric" stroke="var(--color-muted-foreground)" fontSize={11} />
                  <PolarRadiusAxis stroke="var(--color-muted-foreground)" fontSize={10} domain={[0, 100]} />
                  <Radar name="LightGBM" dataKey="LightGBM" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.4} />
                  <Radar name="XGBoost" dataKey="XGBoost" stroke="var(--color-chart-2)" fill="var(--color-chart-2)" fillOpacity={0.2} />
                  <Radar name="RandomForest" dataKey="RandomForest" stroke="var(--color-chart-3)" fill="var(--color-chart-3)" fillOpacity={0.2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-chart-1)" }} />
                <span className="text-xs text-muted-foreground">LightGBM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-chart-2)" }} />
                <span className="text-xs text-muted-foreground">XGBoost</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-chart-3)" }} />
                <span className="text-xs text-muted-foreground">Random Forest</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Progress */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-nido-coral" />
              Curva de Aprendizaje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="iteration" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} domain={[0, 0.6]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="trainLoss"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    dot={false}
                    name="Train Loss"
                  />
                  <Line
                    type="monotone"
                    dataKey="validLoss"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                    dot={false}
                    name="Validation Loss"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-chart-1)" }} />
                <span className="text-xs text-muted-foreground">Entrenamiento</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-chart-2)" }} />
                <span className="text-xs text-muted-foreground">Validación</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hyperparameters */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Cpu className="w-5 h-5 text-chart-3" />
              Hiperparámetros Optimizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {hyperparameters.map((hp, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 border border-border"
                >
                  <div>
                    <code className="text-sm font-mono text-primary">{hp.param}</code>
                    <p className="text-xs text-muted-foreground">{hp.description}</p>
                  </div>
                  <Badge variant="secondary" className="font-mono">
                    {hp.value}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How Decision Trees Work */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Trees className="w-5 h-5 text-primary" />
            ¿Cómo Funcionan los Árboles de Decisión en LightGBM?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">1</div>
                <div>
                  <h4 className="font-medium text-foreground">División Leaf-wise</h4>
                  <p className="text-sm text-muted-foreground">
                    A diferencia del crecimiento por niveles, LightGBM selecciona la hoja con mayor ganancia 
                    de información para dividir, resultando en árboles más precisos y eficientes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">2</div>
                <div>
                  <h4 className="font-medium text-foreground">Gradient Boosting</h4>
                  <p className="text-sm text-muted-foreground">
                    Cada nuevo árbol se entrena para corregir los errores del ensemble anterior, 
                    minimizando iterativamente la función de pérdida mediante descenso de gradiente.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">3</div>
                <div>
                  <h4 className="font-medium text-foreground">Histogram Binning</h4>
                  <p className="text-sm text-muted-foreground">
                    Los valores continuos se discretizan en bins (256 por defecto), reduciendo 
                    drásticamente el tiempo de búsqueda del mejor punto de corte.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent font-bold text-sm">4</div>
                <div>
                  <h4 className="font-medium text-foreground">GOSS (Gradient-based One-Side Sampling)</h4>
                  <p className="text-sm text-muted-foreground">
                    Conserva instancias con gradientes grandes y submuestrea las de gradientes pequeños, 
                    acelerando el entrenamiento sin perder precisión.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent font-bold text-sm">5</div>
                <div>
                  <h4 className="font-medium text-foreground">EFB (Exclusive Feature Bundling)</h4>
                  <p className="text-sm text-muted-foreground">
                    Agrupa features mutuamente excluyentes para reducir la dimensionalidad efectiva 
                    y acelerar el procesamiento sin pérdida de información.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent font-bold text-sm">6</div>
                <div>
                  <h4 className="font-medium text-foreground">Predicción Final</h4>
                  <p className="text-sm text-muted-foreground">
                    La predicción final es la suma ponderada de las predicciones de todos los árboles, 
                    cada uno corrigiendo los errores residuales de los anteriores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Resultados del Modelo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Rendimiento en Clasificación</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Top-1 Accuracy: 89.4% (+7.3% vs BirdNET base)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Top-5 Accuracy: 96.2%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Macro F1-Score: 88.6%
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Eficiencia Computacional</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Inferencia: 12ms por muestra
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Entrenamiento: 15 min (150K muestras)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Memoria RAM: 2.1 GB peak
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Beneficios Clave</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Interpretabilidad de features
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Soporte para reentrenamiento incremental
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Robusto ante datos desbalanceados
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
