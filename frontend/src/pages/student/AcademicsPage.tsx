import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { allStudents } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, Activity, BarChart3, TrendingUp, Award, FileText, Calculator } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const navItems = [
  { path: '/student/dashboard', label: 'My Dashboard', icon: Users },
  { path: '/student/academics', label: 'Academics', icon: BookOpen },
  { path: '/student/attendance', label: 'Attendance', icon: Activity },
  { path: '/student/activities', label: 'Activities', icon: BarChart3 },
  { path: '/student/ai-insights', label: 'AI Insights', icon: Activity },
  { path: '/student/support', label: 'Support', icon: Users },
];

const AcademicsPage = () => {
  const { user } = useAuth();
  const student = allStudents.find(s => s.email === user?.email) || allStudents[0];

  // IA scores (mock data)
  const iaScores = [
    { subject: 'Subject 1', ia1: 18, ia2: 19, ia3: 17, avg: 18 },
    { subject: 'Subject 2', ia1: 15, ia2: 16, ia3: 17, avg: 16 },
    { subject: 'Subject 3', ia1: 19, ia2: 18, ia3: 20, avg: 19 },
    { subject: 'Subject 4', ia1: 17, ia2: 17, ia3: 18, avg: 17 },
    { subject: 'Subject 5', ia1: 16, ia2: 15, ia3: 17, avg: 16 },
  ];

  // Skills radar (mock)
  const skillsData = [
    { skill: 'Technical', score: 85 },
    { skill: 'Communication', score: 75 },
    { skill: 'Problem Solving', score: 80 },
    { skill: 'Teamwork', score: 90 },
    { skill: 'Leadership', score: 70 },
    { skill: 'Creativity', score: 78 },
  ];

  return (
    <RoleLayout navItems={navItems} roleLabel="Student">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Academic Performance</h1>
          <p className="text-sm text-muted-foreground">View your academic records and progress</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={TrendingUp} label="Current CGPA" value={(student.gpa || 0).toFixed(2)} accent="primary" delay={0} />
        <StatCard icon={Award} label="Rank in Class" value="#12" accent="accent" delay={0.05} />
        <StatCard icon={FileText} label="Assignments" value="24/28" accent="safe" delay={0.1} />
        <StatCard icon={Calculator} label="Avg IA Score" value="16.5/20" accent="monitor" delay={0.15} />
      </div>

      {/* IA Scores Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 mb-4">
        <h3 className="section-title mb-4">Internal Assessment Scores</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={iaScores}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
            <XAxis dataKey="subject" stroke="hsl(220, 15%, 55%)" fontSize={11} />
            <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[0, 20]} />
            <Tooltip />
            <Bar dataKey="ia1" name="IA 1" fill="hsl(250, 80%, 62%)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="ia2" name="IA 2" fill="hsl(180, 70%, 45%)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="ia3" name="IA 3" fill="hsl(45, 90%, 55%)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3 justify-center">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-purple-500/70" />
            <span className="text-xs text-muted-foreground">IA 1</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-teal-500/70" />
            <span className="text-xs text-muted-foreground">IA 2</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-yellow-500/70" />
            <span className="text-xs text-muted-foreground">IA 3</span>
          </div>
        </div>
      </motion.div>

      {/* Subject-wise & Skills */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Subject-wise Grades</h3>
          <div className="space-y-3">
            {iaScores.map((subject) => (
              <div key={subject.subject} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <span className="text-sm text-foreground">{subject.subject}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-primary" 
                      style={{ width: `${(subject.avg / 20) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-12">{subject.avg}/20</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Skills Assessment</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="hsl(225, 20%, 25%)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: 'hsl(220, 15%, 65%)', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              <Radar name="Skills" dataKey="score" stroke="hsl(250, 80%, 62%)" fill="hsl(250, 80%, 62%)" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </RoleLayout>
  );
};

export default AcademicsPage;
