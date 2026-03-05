import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { ClassAnalyticsChart } from '@/components/arise/ClassAnalyticsChart';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { departments, classes, allStudents, getRiskDistribution } from '@/data/mockData';
import { Users, GraduationCap, Building2, AlertTriangle, BarChart3, Settings } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const navItems = [
  { path: '/admin/dashboard', label: 'Departments', icon: Building2 },
  { path: '/admin/faculty', label: 'Faculty', icon: GraduationCap },
  { path: '/admin/students', label: 'Students', icon: Users },
  { path: '/admin/analytics', label: 'System Analytics', icon: BarChart3 },
];

const AdminDashboard = () => {
  const dist = getRiskDistribution(allStudents);

  const pieData = [
    { name: 'Safe', value: dist.safe, color: 'hsl(142, 70%, 45%)' },
    { name: 'Monitor', value: dist.monitor, color: 'hsl(45, 90%, 55%)' },
    { name: 'High Risk', value: dist.high, color: 'hsl(0, 72%, 55%)' },
  ];

  return (
    <RoleLayout navItems={navItems} roleLabel="System Admin">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Admin Control Center</h1>
          <GlowingBadge level="safe" pulse>System</GlowingBadge>
        </div>
        <p className="text-sm text-muted-foreground">Global system overview and management</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Building2} label="Departments" value={departments.length} accent="primary" delay={0} />
        <StatCard icon={Users} label="Total Students" value={allStudents.length} accent="accent" delay={0.05} />
        <StatCard icon={GraduationCap} label="Total Faculty" value={8} accent="safe" delay={0.1} />
        <StatCard icon={AlertTriangle} label="High Risk" value={dist.high} accent="risk" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Departments */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Departments</h3>
          {departments.map(d => (
            <div key={d.id} className="p-4 rounded-xl bg-secondary/50 mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-foreground">{d.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <span>Students: {d.totalStudents}</span>
                <span>Faculty: {d.totalFaculty}</span>
                <span>HOD: {d.hod}</span>
                <span>Avg Risk: {d.avgRisk}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Global risk */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Global Risk Distribution</h3>
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

        {/* System status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">System Status</h3>
          <div className="space-y-3">
            {[
              { label: 'AI Models', status: 'Active', ok: true },
              { label: 'Blockchain Network', status: 'Connected', ok: true },
              { label: 'AWS Infrastructure', status: 'Healthy', ok: true },
              { label: 'ERP Integration', status: 'Synced', ok: true },
              { label: 'Data Pipeline', status: 'Running', ok: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm text-foreground">{item.label}</span>
                </div>
                <span className="text-xs font-medium text-risk-safe">{item.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <ClassAnalyticsChart classes={classes} title="Global Class Analytics" />
    </RoleLayout>
  );
};

export default AdminDashboard;
