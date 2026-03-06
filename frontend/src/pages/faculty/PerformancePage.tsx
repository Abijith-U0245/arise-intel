import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { classes, allStudents } from '@/data/mockData';
import { Users, GraduationCap, BookOpen, Activity, TrendingUp, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const navItems = [
  { path: '/faculty/dashboard', label: 'Dashboard', icon: Users },
  { path: '/faculty/class', label: 'My Class', icon: BookOpen },
  { path: '/faculty/performance', label: 'Performance', icon: GraduationCap },
  { path: '/faculty/attendance', label: 'Attendance', icon: Activity },
];

const PerformancePage = () => {
  const assignedClass = classes[0];
  const classStudents = allStudents.filter(s => s.classId === assignedClass.id);

  // GPA Distribution
  const gpaDistribution = [
    { range: '9.0+', count: classStudents.filter(s => (s.gpa || 0) >= 9).length, color: 'hsl(142, 70%, 45%)' },
    { range: '8.0-8.9', count: classStudents.filter(s => (s.gpa || 0) >= 8 && (s.gpa || 0) < 9).length, color: 'hsl(160, 60%, 50%)' },
    { range: '7.0-7.9', count: classStudents.filter(s => (s.gpa || 0) >= 7 && (s.gpa || 0) < 8).length, color: 'hsl(45, 90%, 55%)' },
    { range: '6.0-6.9', count: classStudents.filter(s => (s.gpa || 0) >= 6 && (s.gpa || 0) < 7).length, color: 'hsl(30, 80%, 55%)' },
    { range: '< 6.0', count: classStudents.filter(s => (s.gpa || 0) < 6).length, color: 'hsl(0, 72%, 55%)' },
  ];

  // Subject performance (mock data based on IA scores)
  const subjectPerformance = [
    { subject: 'Subject 1', avg: 78, max: 100 },
    { subject: 'Subject 2', avg: 72, max: 100 },
    { subject: 'Subject 3', avg: 75, max: 100 },
    { subject: 'Subject 4', avg: 80, max: 100 },
  ];

  return (
    <RoleLayout navItems={navItems} roleLabel="Faculty">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Class Performance</h1>
          <p className="text-sm text-muted-foreground">{assignedClass.name} - Academic performance analytics</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={TrendingUp} label="Class Average" value={(classStudents.reduce((acc, s) => acc + (s.gpa || 0), 0) / classStudents.length).toFixed(2)} accent="primary" delay={0} />
        <StatCard icon={Target} label="Top Performers" value={classStudents.filter(s => (s.gpa || 0) >= 9).length} accent="safe" delay={0.05} />
        <StatCard icon={GraduationCap} label="Above 7.0" value={classStudents.filter(s => (s.gpa || 0) >= 7).length} accent="accent" delay={0.1} />
        <StatCard icon={Activity} label="Need Attention" value={classStudents.filter(s => (s.gpa || 0) < 6).length} accent="risk" delay={0.15} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">GPA Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={gpaDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="count" stroke="none">
                {gpaDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {gpaDistribution.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-muted-foreground">{d.range}</span>
                </div>
                <span className="text-foreground font-medium">{d.count} students</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Subject-wise Average</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="subject" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="avg" name="Average Score" fill="hsl(250, 80%, 62%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Student Rankings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
        <h3 className="section-title mb-4">Student Rankings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">CGPA</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Risk Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {classStudents
                .sort((a, b) => (b.gpa || 0) - (a.gpa || 0))
                .slice(0, 10)
                .map((student, idx) => (
                  <tr key={student.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-foreground">#{idx + 1}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-foreground">{(student.gpa || 0).toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${student.riskScore > 65 ? 'text-red-400' : student.riskScore > 40 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {student.riskScore}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${(student.gpa || 0) >= 9 ? 'bg-green-500/10 text-green-400' : (student.gpa || 0) >= 7 ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'}`}>
                        {(student.gpa || 0) >= 9 ? 'Excellent' : (student.gpa || 0) >= 7 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </RoleLayout>
  );
};

export default PerformancePage;
