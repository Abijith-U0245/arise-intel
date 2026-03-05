import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { departments, classes, allStudents, allFaculty, getRiskDistribution, getCollegeStats } from '@/data/mockData';
import { Users, GraduationCap, Building2, AlertTriangle, BarChart3, Settings, Shield, Activity, TrendingUp, BookOpen } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const navItems = [
  { path: '/admin/dashboard', label: 'College Overview', icon: Building2 },
  { path: '/admin/departments', label: 'Departments', icon: BookOpen },
  { path: '/admin/faculty', label: 'All Faculty', icon: GraduationCap },
  { path: '/admin/students', label: 'All Students', icon: Users },
  { path: '/admin/analytics', label: 'Global Analytics', icon: BarChart3 },
  { path: '/admin/system', label: 'System', icon: Settings },
];

const AdminDashboard = () => {
  const stats = getCollegeStats();
  const dist = getRiskDistribution(allStudents);

  const pieData = [
    { name: 'Safe', value: dist.safe, color: 'hsl(142, 70%, 45%)' },
    { name: 'Monitor', value: dist.monitor, color: 'hsl(45, 90%, 55%)' },
    { name: 'High Risk', value: dist.high + (dist.critical || 0), color: 'hsl(0, 72%, 55%)' },
  ];

  // Department comparison data
  const deptComparisonData = departments.map(d => ({
    name: d.code,
    students: d.totalStudents,
    faculty: d.totalFaculty,
    avgRisk: d.avgRisk,
    avgAttendance: d.avgAttendance,
    avgPerformance: d.avgPerformance,
  }));

  // Calculate global statistics
  const totalHighRisk = dist.high + (dist.critical || 0);
  const atRiskPercentage = ((totalHighRisk / allStudents.length) * 100).toFixed(1);
  
  // System metrics
  const systemMetrics = {
    aiModelAccuracy: '94.2%',
    activePredictions: allStudents.length,
    interventionsTriggered: totalHighRisk * 2,
    avgResponseTime: '1.2s',
    dataSync: 'Real-time',
    lastBackup: '2 hours ago',
  };

  return (
    <RoleLayout navItems={navItems} roleLabel="System Admin">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">College Administration</h1>
              <GlowingBadge level="safe" pulse>System Active</GlowingBadge>
            </div>
            <p className="text-sm text-muted-foreground">
              A.R.I.S.E. Academic Risk Intelligence Platform - {stats.totalStudents} students across {stats.totalDepartments} departments
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">System Status</p>
              <div className="flex items-center gap-1.5">
                <Activity className="h-3 w-3 text-green-400" />
                <span className="text-sm font-medium text-green-400">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Building2} label="Departments" value={stats.totalDepartments} accent="primary" delay={0} />
        <StatCard icon={Users} label="Total Students" value={stats.totalStudents} accent="accent" delay={0.05} />
        <StatCard icon={GraduationCap} label="Total Faculty" value={stats.totalFaculty + stats.totalHODs} accent="safe" delay={0.1} />
        <StatCard icon={AlertTriangle} label="High Risk Students" value={totalHighRisk} accent="risk" delay={0.15} />
      </div>

      {/* Analytics Grid */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Global Risk Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Global Risk Distribution</h3>
            <span className="text-xs text-muted-foreground">{atRiskPercentage}% at risk</span>
          </div>
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
                <span className="text-foreground font-medium">{d.value} ({((d.value / allStudents.length) * 100).toFixed(1)}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Department Comparison */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="lg:col-span-2 glass-panel p-6">
          <h3 className="section-title mb-4">Department Comparison</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deptComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <Tooltip />
              <Bar dataKey="students" name="Students" fill="hsl(250, 80%, 62%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgRisk" name="Avg Risk Score" fill="hsl(0, 72%, 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgAttendance" name="Avg Attendance %" fill="hsl(142, 70%, 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 justify-center">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-purple-500/70" />
              <span className="text-xs text-muted-foreground">Students</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-red-500/70" />
              <span className="text-xs text-muted-foreground">Avg Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-green-500/70" />
              <span className="text-xs text-muted-foreground">Attendance %</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Departments Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3 }}
        className="glass-panel p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Department Overview</h3>
          <span className="text-xs text-muted-foreground">{departments.length} departments</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map(dept => {
            const deptStudents = allStudents.filter(s => s.department === dept.id);
            const highRiskCount = deptStudents.filter(s => s.riskScore > 65).length;
            
            return (
              <div key={dept.id} className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-foreground">{dept.code}</span>
                  <GlowingBadge 
                    level={dept.avgRisk > 65 ? 'high' : dept.avgRisk > 40 ? 'monitor' : 'safe'}
                  >
                    Risk: {dept.avgRisk}
                  </GlowingBadge>
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{dept.name}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students</span>
                    <span className="text-foreground">{dept.totalStudents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Faculty</span>
                    <span className="text-foreground">{dept.totalFaculty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Classes</span>
                    <span className="text-foreground">{dept.classes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">High Risk</span>
                    <span className={highRiskCount > 30 ? 'text-red-400' : 'text-foreground'}>{highRiskCount}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground truncate">HOD: {dept.hod}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* System Status & Metrics */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        {/* System Health */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="section-title">System Health</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'AI Risk Prediction Models', status: 'Active', detail: systemMetrics.aiModelAccuracy, ok: true },
              { label: 'Blockchain Audit Trail', status: 'Connected', detail: 'Hyperledger Fabric', ok: true },
              { label: 'AWS Infrastructure', status: 'Healthy', detail: 'All regions operational', ok: true },
              { label: 'ERP Integration', status: 'Synced', detail: systemMetrics.dataSync, ok: true },
              { label: 'Data Pipeline', status: 'Running', detail: `${systemMetrics.activePredictions} predictions/day`, ok: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-foreground">{item.label}</span>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-400">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Global Metrics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-accent" />
            <h3 className="section-title">Global Metrics</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-xs text-muted-foreground mb-1">Avg College CGPA</p>
              <p className="text-2xl font-bold text-foreground">{stats.avgCGPA}</p>
              <p className="text-xs text-muted-foreground mt-1">Across all departments</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-xs text-muted-foreground mb-1">Avg Attendance</p>
              <p className="text-2xl font-bold text-foreground">{stats.avgAttendance}%</p>
              <p className="text-xs text-muted-foreground mt-1">College-wide</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-xs text-muted-foreground mb-1">Avg Risk Score</p>
              <p className="text-2xl font-bold text-foreground">{stats.avgRiskScore}</p>
              <p className="text-xs text-muted-foreground mt-1">Lower is better</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-xs text-muted-foreground mb-1">Total Classes</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalClasses}</p>
              <p className="text-xs text-muted-foreground mt-1">{stats.totalDepartments} departments</p>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">AI Model Accuracy</span>
              <span className="text-sm font-semibold text-primary">{systemMetrics.aiModelAccuracy}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-muted-foreground">Interventions Triggered</span>
              <span className="text-sm font-semibold text-accent">{systemMetrics.interventionsTriggered}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-muted-foreground">Last Backup</span>
              <span className="text-sm text-muted-foreground">{systemMetrics.lastBackup}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.45 }}
        className="glass-panel p-6"
      >
        <h3 className="section-title mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors text-left">
            <Users className="h-5 w-5 text-primary mb-2" />
            <p className="text-sm font-medium text-foreground">Add Student</p>
            <p className="text-xs text-muted-foreground">Enroll new student</p>
          </button>
          <button className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors text-left">
            <GraduationCap className="h-5 w-5 text-accent mb-2" />
            <p className="text-sm font-medium text-foreground">Add Faculty</p>
            <p className="text-xs text-muted-foreground">Add new faculty</p>
          </button>
          <button className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors text-left">
            <Building2 className="h-5 w-5 text-green-400 mb-2" />
            <p className="text-sm font-medium text-foreground">Add Department</p>
            <p className="text-xs text-muted-foreground">Create department</p>
          </button>
          <button className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors text-left">
            <BarChart3 className="h-5 w-5 text-orange-400 mb-2" />
            <p className="text-sm font-medium text-foreground">Generate Report</p>
            <p className="text-xs text-muted-foreground">Export analytics</p>
          </button>
        </div>
      </motion.div>
    </RoleLayout>
  );
};

export default AdminDashboard;
