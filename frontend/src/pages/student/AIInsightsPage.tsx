import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { RiskScoreWidget } from '@/components/arise/RiskScoreWidget';
import { InterventionAlertCard } from '@/components/arise/InterventionAlertCard';
import { allStudents } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, Activity, BarChart3, AlertTriangle, TrendingDown, Brain, Target, Shield } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const navItems = [
  { path: '/student/dashboard', label: 'My Dashboard', icon: Users },
  { path: '/student/academics', label: 'Academics', icon: BookOpen },
  { path: '/student/attendance', label: 'Attendance', icon: Activity },
  { path: '/student/activities', label: 'Activities', icon: BarChart3 },
  { path: '/student/ai-insights', label: 'AI Insights', icon: Activity },
  { path: '/student/support', label: 'Support', icon: Users },
];

const AIInsightsPage = () => {
  const { user } = useAuth();
  const student = allStudents.find(s => s.id === user?.id) || allStudents[0];
  const aiAnalysis = (student as { aiAnalysis?: { dropoutRisk4Week: number; dropoutRisk8Week: number; dropoutRisk12Week: number; recommendedActions: string[] } }).aiAnalysis || {
    dropoutRisk4Week: 25,
    dropoutRisk8Week: 35,
    dropoutRisk12Week: 45,
    recommendedActions: ['Improve attendance', 'Submit pending assignments', 'Meet with advisor']
  };

  // Risk trend (mock)
  const riskTrend = [
    { month: 'Aug', risk: 35 },
    { month: 'Sep', risk: 40 },
    { month: 'Oct', risk: 45 },
    { month: 'Nov', risk: 42 },
    { month: 'Dec', risk: 48 },
    { month: 'Jan', risk: student.riskScore },
  ];

  // Risk factors
  const riskFactors = [
    { factor: 'Attendance', score: 85, impact: 'Low' },
    { factor: 'Assignment Completion', score: 65, impact: 'Medium' },
    { factor: 'IA Performance', score: 70, impact: 'Medium' },
    { factor: 'Engagement', score: 55, impact: 'High' },
  ];

  return (
    <RoleLayout navItems={navItems} roleLabel="Student">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">AI Risk Insights</h1>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">AI Powered</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Personalized risk analysis and recommendations</p>
      </motion.div>

      {/* Risk Score */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-1">
          <RiskScoreWidget score={student.riskScore} size="lg" showDetails />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 glass-panel p-6">
          <h3 className="section-title mb-4">Risk Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={riskTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[0, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="risk" stroke="hsl(0, 72%, 55%)" fill="hsl(0, 72%, 55%)" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Dropout Prediction */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="h-5 w-5 text-red-400" />
          <h3 className="section-title">Dropout Risk Prediction</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-secondary/30 text-center">
            <p className="text-xs text-muted-foreground mb-1">4 Week Risk</p>
            <p className={`text-3xl font-bold ${aiAnalysis.dropoutRisk4Week > 40 ? 'text-red-400' : 'text-foreground'}`}>
              {aiAnalysis.dropoutRisk4Week}%
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/30 text-center">
            <p className="text-xs text-muted-foreground mb-1">8 Week Risk</p>
            <p className={`text-3xl font-bold ${aiAnalysis.dropoutRisk8Week > 40 ? 'text-red-400' : 'text-foreground'}`}>
              {aiAnalysis.dropoutRisk8Week}%
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/30 text-center">
            <p className="text-xs text-muted-foreground mb-1">12 Week Risk</p>
            <p className={`text-3xl font-bold ${aiAnalysis.dropoutRisk12Week > 40 ? 'text-red-400' : 'text-foreground'}`}>
              {aiAnalysis.dropoutRisk12Week}%
            </p>
          </div>
        </div>
      </motion.div>

      {/* Risk Factors */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
            <h3 className="section-title">Contributing Risk Factors</h3>
          </div>
          <div className="space-y-3">
            {riskFactors.map((factor) => (
              <div key={factor.factor} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div>
                  <p className="text-sm font-medium text-foreground">{factor.factor}</p>
                  <p className="text-xs text-muted-foreground">Impact: {factor.impact}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${factor.score < 60 ? 'bg-red-400' : factor.score < 75 ? 'bg-yellow-400' : 'bg-green-400'}`}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8">{factor.score}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-accent" />
            <h3 className="section-title">Recommended Actions</h3>
          </div>
          <div className="space-y-3">
            {aiAnalysis.recommendedActions.map((action, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">{idx + 1}</span>
                </div>
                <p className="text-sm text-foreground">{action}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              <p className="text-xs text-green-400">Following these actions can reduce your risk by up to 25%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </RoleLayout>
  );
};

export default AIInsightsPage;
