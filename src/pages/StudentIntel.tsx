import { sendRiskPrediction } from "../api/backend";
import { getBlockchain } from "../api/backend";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlowingBadge } from "@/components/arise/GlowingBadge";
import { BlockchainBadge } from "@/components/arise/BlockchainBadge";
import { User, TrendingDown, Calendar, MessageSquare, Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

const forecastData = [
  { week: "Now", risk: 62 },
  { week: "+1W", risk: 71 },
  { week: "+2W", risk: 79 },
  { week: "+3W", risk: 85 },
  { week: "+4W", risk: 91 },
];

const attendanceData = [
  { week: "W1", rate: 95 }, { week: "W2", rate: 92 }, { week: "W3", rate: 88 },
  { week: "W4", rate: 78 }, { week: "W5", rate: 72 }, { week: "W6", rate: 65 },
  { week: "W7", rate: 58 }, { week: "W8", rate: 52 },
];

const performanceData = [
  { subject: "Math", score: 45 }, { subject: "Science", score: 52 },
  { subject: "English", score: 61 }, { subject: "History", score: 38 },
];

const sentimentKeywords = [
  { word: "overwhelmed", severity: "high" },
  { word: "struggling", severity: "high" },
  { word: "behind", severity: "monitor" },
  { word: "confused", severity: "monitor" },
  { word: "trying", severity: "safe" },
];

const auditTrail = [
  { time: "2 hours ago", event: "Intervention auto-triggered", status: "triggered" },
  { time: "1 day ago", event: "Risk level escalated to HIGH", status: "alert" },
  { time: "3 days ago", event: "Attendance drop detected", status: "alert" },
  { time: "1 week ago", event: "NLP sentiment shift detected", status: "info" },
  { time: "2 weeks ago", event: "Record verified on blockchain", status: "verified" },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-panel-strong p-3 text-sm">
        <p className="text-foreground font-medium">{label}</p>
        <p className="text-muted-foreground">{payload[0].name}: <span className="text-foreground font-medium">{payload[0].value}</span></p>
      </div>
    );
  }
  return null;
};

const StudentIntel = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Student Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-4 rounded-2xl bg-risk-high/10 glow-risk">
              <User className="h-8 w-8 text-risk-high" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-foreground">Maya Johnson</h1>
                <GlowingBadge level="high" pulse>HIGH RISK</GlowingBadge>
              </div>
              <p className="text-sm text-muted-foreground">ID: STU-2024-0847 · Computer Science · Year 2 · Risk Score: 87/100</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-risk-high">87</p>
              <p className="text-xs text-muted-foreground">Composite Risk</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          {/* 4-Week Forecast */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6">
            <h3 className="section-title mb-1">4-Week Risk Forecast</h3>
            <p className="text-xs text-muted-foreground mb-4">Projected dropout probability timeline</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
                <XAxis dataKey="week" stroke="hsl(220, 15%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} domain={[0, 100]} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="risk" name="Risk %" stroke="hsl(0, 72%, 55%)" strokeWidth={3} dot={{ fill: "hsl(0, 72%, 55%)", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Attendance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-risk-monitor" />
              <h3 className="section-title">Attendance Trend</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Steady decline over 8 weeks</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
                <XAxis dataKey="week" stroke="hsl(220, 15%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} domain={[0, 100]} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="rate" name="Attendance %" fill="hsl(45, 90%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          {/* Performance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="h-4 w-4 text-risk-high" />
              <h3 className="section-title">Performance Curve</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Current subject scores</p>
            <div className="space-y-4">
              {performanceData.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{s.subject}</span>
                    <span className="text-foreground font-medium">{s.score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.score}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: s.score > 60 ? "hsl(142, 70%, 45%)" : s.score > 45 ? "hsl(45, 90%, 55%)" : "hsl(0, 72%, 55%)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* NLP Sentiment */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="h-4 w-4 text-primary" />
              <h3 className="section-title">NLP Sentiment</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Extracted from feedback & communications</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {sentimentKeywords.map((kw, i) => (
                <GlowingBadge key={i} level={kw.severity as any}>
                  "{kw.word}"
                </GlowingBadge>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-secondary/50">
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                "I'm feeling <span className="text-risk-high font-medium">overwhelmed</span> with the coursework. I'm <span className="text-risk-high font-medium">struggling</span> to keep up and feel like I'm falling <span className="text-risk-monitor font-medium">behind</span>..."
              </p>
            </div>
          </motion.div>

          {/* Blockchain Audit */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-accent" />
              <h3 className="section-title">Blockchain Audit Trail</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Immutable record on Hyperledger Fabric</p>
            <div className="space-y-3">
              {auditTrail.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {a.status === "verified" && <CheckCircle className="h-4 w-4 text-accent" />}
                    {a.status === "triggered" && <Clock className="h-4 w-4 text-risk-monitor" />}
                    {a.status === "alert" && <AlertTriangle className="h-4 w-4 text-risk-high" />}
                    {a.status === "info" && <MessageSquare className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{a.event}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-accent/5 border border-accent/20">
              <p className="text-xs font-mono text-accent">TX: 0x7f3a9c2d...e8b2f401</p>
              <p className="text-xs text-muted-foreground mt-1">Tamper-proof · Accreditation Ready</p>
            </div>
          </motion.div>
        </div>

        {/* Intervention auto-triggered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-panel p-6 border-risk-monitor/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-risk-monitor/10 animate-glow">
              <Clock className="h-5 w-5 text-risk-monitor" />
            </div>
            <div>
              <h3 className="section-title">Intervention Auto-Triggered</h3>
              <p className="text-xs text-muted-foreground">Within 48 hours of risk escalation</p>
            </div>
            <GlowingBadge level="monitor" pulse className="ml-auto">Active</GlowingBadge>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: "Faculty Notification", status: "Sent", icon: "✓" },
              { label: "Advisor Meeting", status: "Scheduled — Tomorrow", icon: "📅" },
              { label: "Counseling Referral", status: "Recommended", icon: "💬" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-secondary/50 text-center">
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.status}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentIntel;
