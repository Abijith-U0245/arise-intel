import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { getClassStudents, getRiskDistribution, classes } from '@/data/mockData';
import { Users, AlertTriangle, TrendingDown, MessageSquare, BarChart3, Calendar, ClipboardList } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const navItems = [
  { path: '/faculty/dashboard', label: 'My Class', icon: Users },
  { path: '/faculty/performance', label: 'Student Performance', icon: BarChart3 },
  { path: '/faculty/attendance', label: 'Attendance', icon: Calendar },
  { path: '/faculty/feedback', label: 'Feedback', icon: MessageSquare },
];

const FacultyDashboard = () => {
  const { user } = useAuth();
  const classId = user?.classId || 'CSE-A';
  const classInfo = classes.find(c => c.id === classId);
  const students = getClassStudents(classId);
  const dist = getRiskDistribution(students);

  const pieData = [
    { name: 'Safe', value: dist.safe, color: 'hsl(142, 70%, 45%)' },
    { name: 'Monitor', value: dist.monitor, color: 'hsl(45, 90%, 55%)' },
    { name: 'High Risk', value: dist.high, color: 'hsl(0, 72%, 55%)' },
  ];

  return (
    <RoleLayout navItems={navItems} roleLabel="Faculty">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">{classInfo?.name || 'My Class'} Dashboard</h1>
          <GlowingBadge level="monitor" pulse>Class {classId}</GlowingBadge>
        </div>
        <p className="text-sm text-muted-foreground">Assigned class: {classId} · {students.length} students</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Students" value={students.length} accent="primary" delay={0} />
        <StatCard icon={AlertTriangle} label="High Risk" value={dist.high} accent="risk" delay={0.05} />
        <StatCard icon={TrendingDown} label="Monitor" value={dist.monitor} accent="monitor" delay={0.1} />
        <StatCard icon={ClipboardList} label="Avg Attendance" value={`${classInfo?.avgAttendance || 0}%`} accent="safe" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Risk pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" stroke="none">
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="text-foreground font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Student table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 glass-panel p-6">
          <h3 className="section-title mb-4">Student Overview</h3>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-border text-left">
                  <th className="pb-3 text-muted-foreground font-medium">Name</th>
                  <th className="pb-3 text-muted-foreground font-medium">ERP ID</th>
                  <th className="pb-3 text-muted-foreground font-medium">Attendance</th>
                  <th className="pb-3 text-muted-foreground font-medium">Assignment</th>
                  <th className="pb-3 text-muted-foreground font-medium">Risk</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 text-foreground">{s.name}</td>
                    <td className="py-2.5 text-muted-foreground font-mono text-xs">{s.erpId}</td>
                    <td className="py-2.5 text-muted-foreground">{s.attendance}%</td>
                    <td className="py-2.5 text-muted-foreground">{s.assignmentScore}%</td>
                    <td className="py-2.5">
                      <GlowingBadge level={s.riskLevel} pulse={s.riskLevel === 'high'}>{s.riskLevel}</GlowingBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </RoleLayout>
  );
};

export default FacultyDashboard;
