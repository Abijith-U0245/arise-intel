import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { departments, allStudents, getCollegeStats, getRiskDistribution } from '@/data/mockData';
import { Building2, Users, GraduationCap, BookOpen, BarChart3, Activity, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

const navItems = [
  { path: '/admin/dashboard', label: 'College Overview', icon: Building2 },
  { path: '/admin/departments', label: 'Departments', icon: BookOpen },
  { path: '/admin/faculty', label: 'All Faculty', icon: GraduationCap },
  { path: '/admin/students', label: 'All Students', icon: Users },
  { path: '/admin/analytics', label: 'Global Analytics', icon: BarChart3 },
  { path: '/admin/system', label: 'System', icon: Activity },
];

const GlobalAnalytics = () => {
  const stats = getCollegeStats();
  const dist = getRiskDistribution(allStudents);

  // Department comparison data
  const deptData = departments.map(d => {
    const deptStudents = allStudents.filter(s => s.department === d.id);
    const avgGPA = deptStudents.reduce((acc, s) => acc + (s.gpa || 0), 0) / deptStudents.length;
    const avgAttendance = deptStudents.reduce((acc, s) => acc + (typeof s.attendance === 'number' ? s.attendance : s.attendance?.overall || 0), 0) / deptStudents.length;
    const avgRisk = deptStudents.reduce((acc, s) => acc + s.riskScore, 0) / deptStudents.length;

    return {
      name: d.code,
      students: d.totalStudents,
      avgGPA: parseFloat(avgGPA.toFixed(2)),
      avgAttendance: parseFloat(avgAttendance.toFixed(1)),
      avgRisk: parseFloat(avgRisk.toFixed(1)),
    };
  });

  // Risk distribution
  const riskData = [
    { name: 'Safe (0-40)', value: dist.safe, color: 'hsl(142, 70%, 45%)' },
    { name: 'Monitor (41-65)', value: dist.monitor, color: 'hsl(45, 90%, 55%)' },
    { name: 'High Risk (66-100)', value: dist.high + (dist.critical || 0), color: 'hsl(0, 72%, 55%)' },
  ];

  // Performance trend (mock data)
  const performanceTrend = [
    { month: 'Aug', avgGPA: 7.8, avgAttendance: 82 },
    { month: 'Sep', avgGPA: 7.9, avgAttendance: 83 },
    { month: 'Oct', avgGPA: 8.0, avgAttendance: 84 },
    { month: 'Nov', avgGPA: 8.1, avgAttendance: 85 },
    { month: 'Dec', avgGPA: 8.0, avgAttendance: 84 },
    { month: 'Jan', avgGPA: 8.2, avgAttendance: 86 },
  ];

  return (
    <RoleLayout navItems={navItems} roleLabel="System Admin">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Global Analytics</h1>
          <p className="text-sm text-muted-foreground">Comprehensive analytics across all departments</p>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Target} label="Avg CGPA" value={stats.avgCGPA} accent="primary" delay={0} />
        <StatCard icon={TrendingUp} label="Avg Attendance" value={`${stats.avgAttendance}%`} accent="accent" delay={0.05} />
        <StatCard icon={AlertTriangle} label="Avg Risk Score" value={stats.avgRiskScore} accent="monitor" delay={0.1} />
        <StatCard icon={Users} label="Total Students" value={stats.totalStudents} accent="safe" delay={0.15} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        {/* Department Comparison */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Department Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(220, 15%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="avgGPA" name="Avg GPA" fill="hsl(250, 80%, 62%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgAttendance" name="Avg Attendance %" fill="hsl(142, 70%, 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 justify-center">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-purple-500/70" />
              <span className="text-xs text-muted-foreground">Avg GPA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-green-500/70" />
              <span className="text-xs text-muted-foreground">Attendance %</span>
            </div>
          </div>
        </motion.div>

        {/* Risk Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-6">
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
                <span className="text-foreground font-medium">{d.value} ({((d.value / allStudents.length) * 100).toFixed(1)}%)</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        {/* Performance Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">College Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(220, 15%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} domain={[6, 9]} />
              <Tooltip />
              <Area type="monotone" dataKey="avgGPA" stroke="hsl(250, 80%, 62%)" fill="hsl(250, 80%, 62%)" fillOpacity={0.2} name="Avg GPA" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attendance Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(220, 15%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} domain={[70, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="avgAttendance" stroke="hsl(142, 70%, 45%)" strokeWidth={2} dot={{ fill: 'hsl(142, 70%, 45%)' }} name="Avg Attendance %" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Department Summary Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.4 }}
        className="glass-panel p-6"
      >
        <h3 className="section-title mb-4">Department Risk Analysis</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept) => {
            const deptStudents = allStudents.filter(s => s.department === dept.id);
            const avgRisk = deptStudents.reduce((acc, s) => acc + s.riskScore, 0) / deptStudents.length;
            const highRiskCount = deptStudents.filter(s => s.riskScore > 65).length;
            
            return (
              <div key={dept.id} className="p-4 rounded-xl bg-secondary/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">{dept.code}</span>
                  <GlowingBadge level={avgRisk > 65 ? 'high' : avgRisk > 40 ? 'monitor' : 'safe'}>
                    {avgRisk.toFixed(0)}
                  </GlowingBadge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{dept.name}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">High Risk Students</span>
                    <span className={highRiskCount > 20 ? 'text-red-400' : 'text-foreground'}>{highRiskCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Students</span>
                    <span className="text-foreground">{dept.totalStudents}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </RoleLayout>
  );
};

export default GlobalAnalytics;
