import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { DepartmentOverviewPanel } from '@/components/arise/DepartmentOverviewPanel';
import { ClassAnalyticsChart } from '@/components/arise/ClassAnalyticsChart';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { departments, classes, getDepartmentStudents, getRiskDistribution } from '@/data/mockData';
import { Building2, Users, AlertTriangle, TrendingDown, BarChart3, Brain } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const navItems = [
  { path: '/hod/dashboard', label: 'Department Overview', icon: Building2 },
  { path: '/hod/classes', label: 'Class Analytics', icon: BarChart3 },
  { path: '/hod/risk', label: 'Risk Insights', icon: Brain },
];

const HodDashboard = () => {
  const dept = departments[0];
  const students = getDepartmentStudents('CSE');
  const dist = getRiskDistribution(students);

  const pieData = [
    { name: 'Safe', value: dist.safe, color: 'hsl(142, 70%, 45%)' },
    { name: 'Monitor', value: dist.monitor, color: 'hsl(45, 90%, 55%)' },
    { name: 'High Risk', value: dist.high, color: 'hsl(0, 72%, 55%)' },
  ];

  return (
    <RoleLayout navItems={navItems} roleLabel="Head of Department">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Department Dashboard</h1>
          <GlowingBadge level="safe" pulse>CSE</GlowingBadge>
        </div>
        <p className="text-sm text-muted-foreground">{dept.name} · {dept.totalStudents} students · {dept.totalFaculty} faculty</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Total Students" value={dept.totalStudents} accent="primary" delay={0} />
        <StatCard icon={AlertTriangle} label="High Risk" value={dist.high} accent="risk" delay={0.05} />
        <StatCard icon={TrendingDown} label="Monitor" value={dist.monitor} accent="monitor" delay={0.1} />
        <StatCard icon={Building2} label="Classes" value={classes.length} accent="accent" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <DepartmentOverviewPanel department={dept} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Department Risk Distribution</h3>
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

        {/* Class cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Class Overview</h3>
          <div className="space-y-3">
            {classes.map(c => (
              <div key={c.id} className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.studentCount} students</span>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Risk: {c.avgRisk}</span>
                  <span>Att: {c.avgAttendance}%</span>
                  <span>Perf: {c.avgPerformance}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <ClassAnalyticsChart classes={classes} title="Class Comparison Analytics" />
    </RoleLayout>
  );
};

export default HodDashboard;
