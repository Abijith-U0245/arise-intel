import { motion } from "framer-motion";
import { StatCard } from "@/components/arise/StatCard";
import { GlowingBadge } from "@/components/arise/GlowingBadge";
import { Users, AlertTriangle, TrendingDown, Brain, Target, Clock, Zap } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

const trendData = [
  { week: "W1", risk: 45, predicted: 48 },
  { week: "W2", risk: 52, predicted: 55 },
  { week: "W3", risk: 58, predicted: 62 },
  { week: "W4", risk: 65, predicted: 71 },
  { week: "W5", risk: 72, predicted: 78 },
  { week: "W6", risk: 68, predicted: 73 },
  { week: "W7", risk: 75, predicted: 82 },
  { week: "W8", risk: 80, predicted: 88 },
];

const riskDist = [
  { name: "Safe", value: 4115, color: "hsl(142, 70%, 45%)" },
  { name: "Monitor", value: 821, color: "hsl(45, 90%, 55%)" },
  { name: "High Risk", value: 312, color: "hsl(0, 72%, 55%)" },
];

const radarData = [
  { factor: "Academics", value: 78 },
  { factor: "Attendance", value: 45 },
  { factor: "Engagement", value: 52 },
  { factor: "Sentiment", value: 38 },
  { factor: "Social", value: 65 },
];

const recentAlerts = [
  { name: "Maya Johnson", risk: "high" as const, score: 87, trigger: "Attendance drop + negative sentiment" },
  { name: "James Chen", risk: "high" as const, score: 82, trigger: "Performance decline (3 weeks)" },
  { name: "Priya Patel", risk: "monitor" as const, score: 68, trigger: "Engagement decrease detected" },
  { name: "Alex Rivera", risk: "monitor" as const, score: 64, trigger: "Sentiment shift — 'overwhelmed'" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-panel-strong p-3 text-sm">
        <p className="text-foreground font-medium">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-muted-foreground">
            {p.name}: <span className="text-foreground font-medium">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-foreground">Global Risk Overview</h1>
            <GlowingBadge level="high" pulse>Live</GlowingBadge>
          </div>
          <p className="text-muted-foreground text-sm">Real-time academic risk intelligence across all enrolled students</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Users} label="Total Students" value="5,248" accent="primary" delay={0} />
          <StatCard icon={AlertTriangle} label="High Risk" value="312" trend="+18" accent="risk" delay={0.05} />
          <StatCard icon={TrendingDown} label="Medium Risk" value="821" accent="monitor" delay={0.1} />
          <StatCard icon={Brain} label="Model Accuracy" value="92%" trend="+2.1%" trendUp accent="safe" delay={0.15} />
        </div>

        {/* Second row stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard icon={Target} label="Dropout Forecast (4 Wks)" value="47" accent="risk" delay={0.2} />
          <StatCard icon={Clock} label="48h Intervention Trigger" value="12 Active" accent="monitor" delay={0.25} />
          <StatCard icon={Zap} label="Interventions This Week" value="34" trend="+8" trendUp accent="accent" delay={0.3} />
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          {/* Trend chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-panel p-6"
          >
            <h3 className="section-title mb-1">Predictive Risk Trend</h3>
            <p className="text-xs text-muted-foreground mb-4">Actual vs predicted dropout risk index</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(250, 80%, 62%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(250, 80%, 62%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
                <XAxis dataKey="week" stroke="hsl(220, 15%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="risk" name="Actual Risk" stroke="hsl(0, 72%, 55%)" fill="url(#riskGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="predicted" name="Predicted" stroke="hsl(250, 80%, 62%)" fill="url(#predGrad)" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Donut */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-panel p-6"
          >
            <h3 className="section-title mb-1">Risk Distribution</h3>
            <p className="text-xs text-muted-foreground mb-4">Across all students</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={riskDist} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" stroke="none">
                  {riskDist.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {riskDist.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-muted-foreground">{d.name}</span>
                  </div>
                  <span className="text-foreground font-medium">{d.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Radar + Alerts */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* AI Risk Fusion Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-6"
          >
            <h3 className="section-title mb-1">AI Risk Fusion Analysis</h3>
            <p className="text-xs text-muted-foreground mb-4">Multi-factor risk assessment model</p>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(225, 20%, 18%)" />
                <PolarAngleAxis dataKey="factor" tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 12 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Risk" dataKey="value" stroke="hsl(250, 80%, 62%)" fill="hsl(250, 80%, 62%)" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>

            {/* AI Confidence */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">AI Confidence</span>
                <span className="text-foreground font-semibold">92%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>
          </motion.div>

          {/* Recent alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="glass-panel p-6"
          >
            <h3 className="section-title mb-1">Recent Risk Alerts</h3>
            <p className="text-xs text-muted-foreground mb-4">Auto-detected by AI risk fusion engine</p>
            <div className="space-y-3">
              {recentAlerts.map((a, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{a.name}</span>
                      <GlowingBadge level={a.risk} pulse={a.risk === "high"}>{a.risk}</GlowingBadge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{a.trigger}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-foreground">{a.score}</p>
                    <p className="text-xs text-muted-foreground">Risk Score</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
