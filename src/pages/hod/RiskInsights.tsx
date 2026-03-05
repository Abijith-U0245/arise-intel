import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { departments, classes, allStudents, getRiskDistribution } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, GraduationCap, BookOpen, Activity, AlertTriangle, TrendingUp, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const navItems = [
  { path: '/hod/dashboard', label: 'Department Overview', icon: Building2 },
  { path: '/hod/classes', label: 'Class Analytics', icon: BookOpen },
  { path: '/hod/faculty', label: 'Faculty', icon: GraduationCap },
  { path: '/hod/risk', label: 'Risk Insights', icon: Activity },
];

const RiskInsights = () => {
  const { user } = useAuth();
  const department = departments.find(d => d.hod === user?.name) || departments[0];
  const deptStudents = allStudents.filter(s => s.department === department.id);
  const dist = getRiskDistribution(deptStudents);

  // Risk distribution data
  const riskData = [
    { name: 'Safe (0-40)', value: dist.safe, color: 'hsl(142, 70%, 45%)' },
    { name: 'Monitor (41-65)', value: dist.monitor, color: 'hsl(45, 90%, 55%)' },
    { name: 'High Risk (66+)', value: dist.high + (dist.critical || 0), color: 'hsl(0, 72%, 55%)' },
  ];

  // Class-wise risk data
  const deptClasses = classes.filter(c => c.department === department.id);
  const classRiskData = deptClasses.map(cls => {
    const classStudents = deptStudents.filter(s => s.classId === cls.id);
    const avgRisk = classStudents.reduce((acc, s) => acc + s.riskScore, 0) / classStudents.length || 0;
    const highRiskCount = classStudents.filter(s => s.riskScore > 65).length;

    return {
      name: cls.name,
      avgRisk: parseFloat(avgRisk.toFixed(1)),
      highRisk: highRiskCount,
    };
  });

  // High risk students
  const highRiskStudents = deptStudents
    .filter(s => s.riskScore > 65)
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 10);

  return (
    <RoleLayout navItems={navItems} roleLabel="Head of Department">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Risk Insights</h1>
          <p className="text-sm text-muted-foreground">{department.name} - Risk analysis and student alerts</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Activity} label="Avg Risk Score" value={department.avgRisk} accent="monitor" delay={0} />
        <StatCard icon={AlertTriangle} label="High Risk Students" value={dist.high + (dist.critical || 0)} accent="risk" delay={0.05} />
        <StatCard icon={TrendingUp} label="Monitoring" value={dist.monitor} accent="accent" delay={0.1} />
        <StatCard icon={Target} label="Safe Students" value={dist.safe} accent="safe" delay={0.15} />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        {/* Risk Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={riskData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" stroke="none">
                {riskData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {riskData.map((d, i) => (
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

        {/* Class-wise Risk */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Average Risk by Class</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={classRiskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="avgRisk" name="Avg Risk Score" fill="hsl(0, 72%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* High Risk Students Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">High Risk Students</h3>
          <GlowingBadge level="high">{highRiskStudents.length} Students</GlowingBadge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Class</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Risk Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Dropout Risk</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {highRiskStudents.map((student) => {
                const studentClass = deptClasses.find(c => c.id === student.classId);
                
                return (
                  <tr key={student.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
                          <span className="text-xs font-medium text-red-400">{student.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{studentClass?.name || 'N/A'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-red-400">{student.riskScore}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{(student as { aiAnalysis?: { dropoutRisk4Week?: number } }).aiAnalysis?.dropoutRisk4Week || 45}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <GlowingBadge level={student.riskScore > 80 ? 'high' : 'monitor'}>
                        {student.riskScore > 80 ? 'Critical' : 'High Risk'}
                      </GlowingBadge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </RoleLayout>
  );
};

export default RiskInsights;
