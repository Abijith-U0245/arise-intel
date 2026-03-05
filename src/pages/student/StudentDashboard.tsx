import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StudentProfileCard } from '@/components/arise/StudentProfileCard';
import { RiskScoreWidget } from '@/components/arise/RiskScoreWidget';
import { InterventionAlertCard } from '@/components/arise/InterventionAlertCard';
import { ActivityTimeline } from '@/components/arise/ActivityTimeline';
import { CompetitionActivityPanel } from '@/components/arise/CompetitionActivityPanel';
import { getStudentByEmail } from '@/data/mockData';
import { User, Brain, HeartHandshake, BookOpen, TrendingUp, Award, Calendar } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

const navItems = [
  { path: '/student/dashboard', label: 'My Dashboard', icon: User },
  { path: '/student/academics', label: 'Academics', icon: BookOpen },
  { path: '/student/attendance', label: 'Attendance', icon: Calendar },
  { path: '/student/competitions', label: 'Activities', icon: Award },
  { path: '/student/risk', label: 'AI Insights', icon: Brain },
  { path: '/student/support', label: 'Support', icon: HeartHandshake },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const student = user?.email ? getStudentByEmail(user.email) : undefined;

  if (!student) {
    return (
      <RoleLayout navItems={navItems} roleLabel="Student">
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Loading student data...</p>
        </div>
      </RoleLayout>
    );
  }

  const attendanceData = student.weeklyAttendance.map((v, i) => ({ week: `W${i + 1}`, value: v }));
  const performanceData = student.weeklyPerformance.map((v, i) => ({ week: `W${i + 1}`, value: v }));
  
  // IA Scores data
  const iaScoresData = student.academics?.subjects.slice(0, 5).map(s => ({
    subject: s.subjectCode,
    ia1: s.ia1,
    ia2: s.ia2,
    ia3: s.ia3,
    avg: s.avgIA,
  })) || [];

  // Grade distribution
  const gradeData = [
    { name: 'A', value: student.academics?.subjects.filter(s => s.grade === 'A').length || 0, color: '#22c55e' },
    { name: 'B', value: student.academics?.subjects.filter(s => s.grade === 'B').length || 0, color: '#3b82f6' },
    { name: 'C', value: student.academics?.subjects.filter(s => s.grade === 'C').length || 0, color: '#f59e0b' },
    { name: 'D/F', value: student.academics?.subjects.filter(s => s.grade === 'D' || s.grade === 'F').length || 0, color: '#ef4444' },
  ].filter(g => g.value > 0);

  return (
    <RoleLayout navItems={navItems} roleLabel="Student">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {student.profile?.name || student.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Current CGPA</p>
              <p className="text-xl font-bold text-primary">{student.academics?.cgpa?.toFixed(2) || student.gpa}</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Semester</p>
              <p className="text-xl font-bold text-foreground">{student.profile?.semester || 5}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Card */}
      <StudentProfileCard student={student} detailed />

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="glass-panel p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-primary/15">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Attendance</p>
            <p className="text-lg font-semibold text-foreground">{student.attendance?.overall || student.attendance_legacy}%</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.15 }}
          className="glass-panel p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-accent/15">
            <BookOpen className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Subjects</p>
            <p className="text-lg font-semibold text-foreground">{student.academics?.subjects?.length || 8}</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="glass-panel p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-green-500/15">
            <Award className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Competitions</p>
            <p className="text-lg font-semibold text-foreground">{student.competitions?.length || 0}</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.25 }}
          className="glass-panel p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-orange-500/15">
            <TrendingUp className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Risk Level</p>
            <p className="text-lg font-semibold text-foreground capitalize">{student.riskLevel}</p>
          </div>
        </motion.div>
      </div>

      {/* Main Charts Section */}
      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        {/* Risk Score */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 flex flex-col items-center justify-center">
          <h3 className="section-title mb-4">AI Risk Prediction</h3>
          <RiskScoreWidget score={student.riskScore} size="lg" showLabel />
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Dropout Probability: <span className="font-semibold text-foreground">{(student.riskAnalytics?.prediction?.dropoutProbability * 100).toFixed(1)}%</span>
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-1 justify-center">
            {student.riskAnalytics?.interventionSuggestions?.slice(0, 2).map((suggestion, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">
                {suggestion}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Attendance Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-panel p-6">
          <h3 className="section-title mb-1">Attendance Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Weekly attendance %</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="attGradStudent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(250, 80%, 62%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(250, 80%, 62%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="week" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[60, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="value" name="Attendance %" stroke="hsl(250, 80%, 62%)" fill="url(#attGradStudent)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Grade Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6">
          <h3 className="section-title mb-1">Grade Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">Current semester</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={gradeData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                dataKey="value"
                stroke="none"
              >
                {gradeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {gradeData.map((g, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: g.color }} />
                <span className="text-xs text-muted-foreground">{g.name}: {g.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* IA Scores and Subject Performance */}
      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass-panel p-6">
          <h3 className="section-title mb-1">Internal Assessment Scores</h3>
          <p className="text-xs text-muted-foreground mb-4">IA1, IA2, IA3 comparison</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={iaScoresData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="subject" stroke="hsl(220, 15%, 55%)" fontSize={10} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[0, 30]} />
              <Tooltip />
              <Bar dataKey="ia1" name="IA 1" fill="hsl(250, 80%, 62%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="ia2" name="IA 2" fill="hsl(175, 80%, 50%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="ia3" name="IA 3" fill="hsl(45, 90%, 55%)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-panel p-6">
          <h3 className="section-title mb-1">Performance Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Weekly performance scores</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="perfGradStudent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(175, 80%, 50%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(175, 80%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="week" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[40, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="value" name="Score %" stroke="hsl(175, 80%, 50%)" fill="url(#perfGradStudent)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Activity Timeline and Competitions */}
      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <ActivityTimeline activities={student.activityLog?.slice(0, 6) || []} />
        <CompetitionActivityPanel competitions={student.competitions || []} />
      </div>

      {/* NLP + Interventions */}
      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="glass-panel p-6">
          <h3 className="section-title mb-3">NLP Wellbeing Analysis</h3>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm text-muted-foreground">Overall Sentiment:</span>
            <span className={`text-sm font-semibold capitalize ${
              student.sentiment === 'positive' ? 'text-green-500' :
              student.sentiment === 'negative' ? 'text-red-500' : 'text-yellow-500'
            }`}>{student.sentiment}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {student.sentimentKeywords?.map(kw => (
              <span key={kw} className="text-xs px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground">{kw}</span>
            ))}
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-1">Faculty Feedback</p>
            <p className="text-sm text-foreground italic">"{student.facultyFeedback}"</p>
          </div>
        </motion.div>

        <InterventionAlertCard 
          interventions={student.interventions || []} 
          studentName={student.profile?.name || student.name} 
          riskScore={student.riskScore}
        />
      </div>
    </RoleLayout>
  );
};

export default StudentDashboard;
