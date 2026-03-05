import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StudentProfileCard } from '@/components/arise/StudentProfileCard';
import { RiskScoreWidget } from '@/components/arise/RiskScoreWidget';
import { InterventionAlertCard } from '@/components/arise/InterventionAlertCard';
import { allStudents } from '@/data/mockData';
import { User, BarChart3, Brain, HeartHandshake } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const navItems = [
  { path: '/student/dashboard', label: 'My Profile', icon: User },
  { path: '/student/academics', label: 'Academic Insights', icon: BarChart3 },
  { path: '/student/risk', label: 'AI Risk Score', icon: Brain },
  { path: '/student/support', label: 'Support', icon: HeartHandshake },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const student = allStudents.find(s => s.erpId === user?.erpId) || allStudents[0];

  const attendanceData = student.weeklyAttendance.map((v, i) => ({ week: `W${i + 1}`, value: v }));
  const performanceData = student.weeklyPerformance.map((v, i) => ({ week: `W${i + 1}`, value: v }));

  return (
    <RoleLayout navItems={navItems} roleLabel="Student">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, {student.name}</p>
      </motion.div>

      <StudentProfileCard student={student} />

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        {/* Risk Score */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 flex flex-col items-center justify-center">
          <h3 className="section-title mb-4">AI Risk Prediction</h3>
          <RiskScoreWidget score={student.riskScore} size="lg" />
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Multi-factor AI analysis of your academic trajectory
          </p>
        </motion.div>

        {/* Attendance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <h3 className="section-title mb-1">My Attendance</h3>
          <p className="text-xs text-muted-foreground mb-4">Weekly trend</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(250, 80%, 62%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(250, 80%, 62%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="week" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[60, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="value" name="Attendance %" stroke="hsl(250, 80%, 62%)" fill="url(#attGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
          <h3 className="section-title mb-1">Assignment Performance</h3>
          <p className="text-xs text-muted-foreground mb-4">Weekly trend</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(175, 80%, 50%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(175, 80%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="week" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[40, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="value" name="Score %" stroke="hsl(175, 80%, 50%)" fill="url(#perfGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* NLP + Interventions */}
      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6">
          <h3 className="section-title mb-3">NLP Wellbeing Analysis</h3>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm text-muted-foreground">Sentiment:</span>
            <span className={`text-sm font-semibold capitalize ${
              student.sentiment === 'positive' ? 'text-risk-safe' :
              student.sentiment === 'negative' ? 'text-risk-high' : 'text-risk-monitor'
            }`}>{student.sentiment}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {student.sentimentKeywords.map(kw => (
              <span key={kw} className="text-xs px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground">{kw}</span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">"{student.facultyFeedback}"</p>
        </motion.div>

        <InterventionAlertCard interventions={student.interventions} studentName={student.name} />
      </div>
    </RoleLayout>
  );
};

export default StudentDashboard;
