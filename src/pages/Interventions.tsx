import { motion } from "framer-motion";
import { GlowingBadge } from "@/components/arise/GlowingBadge";
import { Zap, CheckCircle, Clock, AlertTriangle, TrendingDown, ArrowRight } from "lucide-react";

const workflows = [
  {
    student: "Maya Johnson",
    riskScore: 87,
    level: "high" as const,
    steps: [
      { label: "AI Risk Detected", status: "done", time: "48h ago" },
      { label: "Faculty Notified", status: "done", time: "46h ago" },
      { label: "Advisor Meeting", status: "active", time: "Today 2pm" },
      { label: "Counseling Referral", status: "pending", time: "Pending" },
    ],
  },
  {
    student: "James Chen",
    riskScore: 82,
    level: "high" as const,
    steps: [
      { label: "AI Risk Detected", status: "done", time: "3 days ago" },
      { label: "Faculty Notified", status: "done", time: "3 days ago" },
      { label: "Advisor Meeting", status: "done", time: "Yesterday" },
      { label: "Outcome Tracking", status: "active", time: "In progress" },
    ],
  },
  {
    student: "Priya Patel",
    riskScore: 68,
    level: "monitor" as const,
    steps: [
      { label: "AI Risk Detected", status: "done", time: "1 week ago" },
      { label: "Faculty Notified", status: "done", time: "6 days ago" },
      { label: "Check-in Scheduled", status: "active", time: "Tomorrow" },
      { label: "Resolution", status: "pending", time: "Pending" },
    ],
  },
];

const impactStats = [
  { label: "Dropout Reduced", value: "37%", icon: TrendingDown },
  { label: "Interventions Triggered", value: "156", icon: Zap },
  { label: "Successfully Resolved", value: "89", icon: CheckCircle },
  { label: "Currently Active", value: "34", icon: Clock },
];

const statusIcon = (status: string) => {
  if (status === "done") return <CheckCircle className="h-4 w-4 text-risk-safe" />;
  if (status === "active") return <Clock className="h-4 w-4 text-risk-monitor" />;
  return <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />;
};

const Interventions = () => (
  <div className="min-h-screen bg-background pt-20 pb-12 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Intervention Automation</h1>
        <p className="text-sm text-muted-foreground">AI-triggered workflows with measurable impact tracking</p>
      </motion.div>

      {/* Impact stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {impactStats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-panel p-5 text-center"
          >
            <s.icon className="h-6 w-6 mx-auto mb-3 text-primary" />
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Workflow cards */}
      <div className="space-y-4">
        {workflows.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <h3 className="font-semibold text-foreground text-lg">{w.student}</h3>
              <GlowingBadge level={w.level} pulse={w.level === "high"}>{w.level}</GlowingBadge>
              <span className="text-sm text-muted-foreground ml-auto">Score: {w.riskScore}</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {w.steps.map((step, si) => (
                <div key={si} className="flex items-center gap-2 shrink-0">
                  <div className={`p-4 rounded-xl text-center min-w-[140px] ${
                    step.status === "done" ? "bg-risk-safe/5 border border-risk-safe/20" :
                    step.status === "active" ? "bg-risk-monitor/5 border border-risk-monitor/20" :
                    "bg-secondary/50 border border-border"
                  }`}>
                    <div className="flex justify-center mb-2">{statusIcon(step.status)}</div>
                    <p className="text-sm font-medium text-foreground">{step.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{step.time}</p>
                  </div>
                  {si < w.steps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Interventions;
