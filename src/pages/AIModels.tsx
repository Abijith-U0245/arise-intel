import { sendRiskPrediction } from "../api/backend";
import { motion } from "framer-motion";
import { GlowingBadge } from "@/components/arise/GlowingBadge";
import { Brain, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

const models = [
  { name: "Random Forest", accuracy: 89, precision: 87, recall: 91, f1: 89, status: "active" },
  { name: "Gradient Boosting", accuracy: 92, precision: 90, recall: 93, f1: 91, status: "active" },
  { name: "Neural Network", accuracy: 88, precision: 85, recall: 90, f1: 87, status: "training" },
  { name: "NLP Sentiment", accuracy: 84, precision: 82, recall: 86, f1: 84, status: "active" },
];

const featureImportance = [
  { feature: "Attendance Rate", importance: 0.28 },
  { feature: "GPA Trend", importance: 0.22 },
  { feature: "Engagement Score", importance: 0.18 },
  { feature: "NLP Sentiment", importance: 0.15 },
  { feature: "Assignment Rate", importance: 0.10 },
  { feature: "Social Activity", importance: 0.07 },
];

const confusionMatrix = [
  [412, 38],
  [22, 528],
];

const rocData = [
  { factor: "Sensitivity", A: 93, B: 91 },
  { factor: "Specificity", A: 89, B: 92 },
  { factor: "Precision", A: 90, B: 87 },
  { factor: "F1-Score", A: 91, B: 89 },
  { factor: "AUC", A: 95, B: 93 },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-panel-strong p-3 text-sm">
        <p className="text-foreground font-medium">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-muted-foreground">{p.name}: <span className="text-foreground font-medium">{typeof p.value === 'number' && p.value < 1 ? (p.value * 100).toFixed(0) + '%' : p.value}</span></p>
        ))}
      </div>
    );
  }
  return null;
};

const AIModels = () => (
  <div className="min-h-screen bg-background pt-20 pb-12 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-foreground">AI Model Control Center</h1>
          <GlowingBadge level="safe" pulse>Auto-Retraining</GlowingBadge>
        </div>
        <p className="text-sm text-muted-foreground">Model performance monitoring, feature analysis, and continuous learning pipeline</p>
      </motion.div>

      {/* Model cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {models.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-panel p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <Brain className="h-5 w-5 text-primary" />
              {m.status === "training" ? (
                <span className="flex items-center gap-1 text-xs text-risk-monitor">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Training
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-risk-safe">
                  <CheckCircle className="h-3 w-3" />
                  Active
                </span>
              )}
            </div>
            <p className="font-semibold text-foreground mb-3">{m.name}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-muted-foreground">Acc: </span><span className="text-foreground font-medium">{m.accuracy}%</span></div>
              <div><span className="text-muted-foreground">Prec: </span><span className="text-foreground font-medium">{m.precision}%</span></div>
              <div><span className="text-muted-foreground">Rec: </span><span className="text-foreground font-medium">{m.recall}%</span></div>
              <div><span className="text-muted-foreground">F1: </span><span className="text-foreground font-medium">{m.f1}%</span></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        {/* Feature importance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <h3 className="section-title mb-1">Feature Importance</h3>
          <p className="text-xs text-muted-foreground mb-4">Gradient Boosting model weights</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={featureImportance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis type="number" stroke="hsl(220, 15%, 55%)" fontSize={12} />
              <YAxis dataKey="feature" type="category" stroke="hsl(220, 15%, 55%)" fontSize={11} width={120} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="importance" name="Weight" fill="hsl(250, 80%, 62%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ROC comparison radar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-6">
          <h3 className="section-title mb-1">Model Comparison</h3>
          <p className="text-xs text-muted-foreground mb-4">Gradient Boosting vs Random Forest</p>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={rocData}>
              <PolarGrid stroke="hsl(225, 20%, 18%)" />
              <PolarAngleAxis dataKey="factor" tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 11 }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar name="Gradient Boosting" dataKey="A" stroke="hsl(250, 80%, 62%)" fill="hsl(250, 80%, 62%)" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Random Forest" dataKey="B" stroke="hsl(175, 80%, 50%)" fill="hsl(175, 80%, 50%)" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center text-xs mt-2">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Gradient Boosting</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" /> Random Forest</span>
          </div>
        </motion.div>
      </div>

      {/* Confusion matrix + alerts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
          <h3 className="section-title mb-1">Confusion Matrix</h3>
          <p className="text-xs text-muted-foreground mb-4">Gradient Boosting — Test Set (1,000 students)</p>
          <div className="max-w-xs mx-auto">
            <div className="grid grid-cols-3 gap-1 text-center text-sm">
              <div />
              <div className="text-xs text-muted-foreground py-2">Pred: No Risk</div>
              <div className="text-xs text-muted-foreground py-2">Pred: At Risk</div>
              <div className="text-xs text-muted-foreground flex items-center justify-end pr-2">Actual: No Risk</div>
              <div className="p-4 rounded-xl bg-risk-safe/10 font-bold text-risk-safe">{confusionMatrix[0][0]}</div>
              <div className="p-4 rounded-xl bg-risk-high/10 font-bold text-risk-high">{confusionMatrix[0][1]}</div>
              <div className="text-xs text-muted-foreground flex items-center justify-end pr-2">Actual: At Risk</div>
              <div className="p-4 rounded-xl bg-risk-high/10 font-bold text-risk-high">{confusionMatrix[1][0]}</div>
              <div className="p-4 rounded-xl bg-risk-safe/10 font-bold text-risk-safe">{confusionMatrix[1][1]}</div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-panel p-6">
          <h3 className="section-title mb-1">System Alerts</h3>
          <p className="text-xs text-muted-foreground mb-4">Model health & data pipeline status</p>
          <div className="space-y-3">
            {[
              { label: "Data Drift Detection", status: "Normal", ok: true },
              { label: "Continuous Retraining", status: "Active — Last: 2h ago", ok: true },
              { label: "NLP Model Confidence", status: "84% — Stable", ok: true },
              { label: "Feature Pipeline", status: "Healthy — 5.2K records/day", ok: true },
              { label: "Data Quality Alert", status: "Minor — 0.3% missing values", ok: false },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-2">
                  {a.ok ? <CheckCircle className="h-4 w-4 text-risk-safe" /> : <AlertTriangle className="h-4 w-4 text-risk-monitor" />}
                  <span className="text-sm text-foreground">{a.label}</span>
                </div>
                <span className="text-xs text-muted-foreground">{a.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default AIModels;
