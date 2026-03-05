import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { DepartmentOverviewPanel } from '@/components/arise/DepartmentOverviewPanel';
import { ClassAnalyticsChart } from '@/components/arise/ClassAnalyticsChart';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { getHODByEmail, getDepartmentStudents, getRiskDistribution, departments, classes, allFaculty, allStudents } from '@/data/mockData';
import { Building2, Users, AlertTriangle, TrendingDown, BarChart3, Brain, GraduationCap, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const navItems = [
  { path: '/hod/dashboard', label: 'Department Overview', icon: Building2 },
  { path: '/hod/classes', label: 'Class Analytics', icon: BarChart3 },
  { path: '/hod/faculty', label: 'Faculty', icon: GraduationCap },
  { path: '/hod/risk', label: 'Risk Insights', icon: Brain },
];

const HodDashboard = () => {
  const { user } = useAuth();
  const hod = user?.email ? getHODByEmail(user.email) : undefined;
  
  // Get HOD's department
  const deptCode = hod?.departmentCode || 'CSE';
  const dept = departments.find(d => d.id === deptCode);
  const students = getDepartmentStudents(deptCode);
  const dist = getRiskDistribution(students);
  
  // Get department classes
  const deptClasses = classes.filter(c => c.departmentCode === deptCode);
  
  // Get department faculty
  const deptFaculty = allFaculty.filter(f => f.departmentCode === deptCode);

  const pieData = [
    { name: 'Safe', value: dist.safe, color: 'hsl(142, 70%, 45%)' },
    { name: 'Monitor', value: dist.monitor, color: 'hsl(45, 90%, 55%)' },
    { name: 'High Risk', value: dist.high + (dist.critical || 0), color: 'hsl(0, 72%, 55%)' },
  ];

  // Class comparison data
  const classComparisonData = deptClasses.map(c => ({
    name: c.id,
    avgRisk: c.avgRisk,
    avgAttendance: c.avgAttendance,
    avgPerformance: c.avgPerformance,
    studentCount: c.studentCount,
  }));

  // Faculty performance data
  const facultyData = deptFaculty.map(f => {
    const facultyStudents = students.filter(s => s.classId === f.assignedClasses[0]);
    const avgRisk = facultyStudents.length > 0 
      ? Math.floor(facultyStudents.reduce((sum, s) => sum + s.riskScore, 0) / facultyStudents.length)
      : 0;
    return {
      name: f.name.split(' ').slice(1).join(' '),
      students: facultyStudents.length,
      avgRisk,
      specialization: f.specialization,
    };
  });

  // High risk students across department
  const highRiskStudents = students
    .filter(s => s.riskScore > 65)
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 8);

  return (
    <RoleLayout navItems={navItems} roleLabel="Head of Department">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-foreground">Department Dashboard</h1>
          <GlowingBadge level="safe" pulse>{deptCode}</GlowingBadge>
        </div>
        <p className="text-sm text-muted-foreground">
          {dept?.name} · {dept?.totalStudents} students · {dept?.totalFaculty} faculty · HOD: {hod?.name || dept?.hod}
        </p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Total Students" value={dept?.totalStudents || 0} accent="primary" delay={0} />
        <StatCard icon={AlertTriangle} label="High Risk" value={dist.high + (dist.critical || 0)} accent="risk" delay={0.05} />
        <StatCard icon={TrendingDown} label="Monitor" value={dist.monitor} accent="monitor" delay={0.1} />
        <StatCard icon={Building2} label="Classes" value={deptClasses.length} accent="accent" delay={0.15} />
      </div>

      {/* Main Analytics Grid */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Department Risk Distribution */}
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

        {/* Class Comparison */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="lg:col-span-2 glass-panel p-6">
          <h3 className="section-title mb-4">Class Comparison</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={classComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <Tooltip />
              <Bar dataKey="avgRisk" name="Avg Risk Score" fill="hsl(0, 72%, 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgAttendance" name="Avg Attendance %" fill="hsl(142, 70%, 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 justify-center">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-red-500/70" />
              <span className="text-xs text-muted-foreground">Avg Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-green-500/70" />
              <span className="text-xs text-muted-foreground">Avg Attendance</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Faculty Performance */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3 }}
        className="glass-panel p-6 mb-6"
      >
        <h3 className="section-title mb-4">Faculty Overview</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {facultyData.map((faculty) => (
            <div key={faculty.name} className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{faculty.name}</span>
                <GlowingBadge 
                  level={faculty.avgRisk > 65 ? 'high' : faculty.avgRisk > 40 ? 'monitor' : 'safe'}
                >
                  {faculty.avgRisk}
                </GlowingBadge>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{faculty.specialization}</p>
              <p className="text-xs text-muted-foreground">{faculty.students} students</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Risk Heatmap - High Risk Students */}
      {highRiskStudents.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.35 }}
          className="glass-panel p-6 mb-6 border-risk-high/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-risk-high" />
              <h3 className="section-title">High Risk Students - Department Alert</h3>
            </div>
            <span className="text-xs text-muted-foreground">
              {highRiskStudents.length} of {students.length} students at risk
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {highRiskStudents.map((student) => (
              <div key={student.id} className="p-3 rounded-lg bg-risk-high/5 border border-risk-high/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground truncate">{student.profile?.name || student.name}</span>
                  <GlowingBadge level="high" pulse>{student.riskScore}</GlowingBadge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{student.erpId} · {student.classId}</p>
                <p className="text-xs text-muted-foreground">
                  Att: {student.attendance?.overall || student.attendance_legacy}% · 
                  CGPA: {student.academics?.cgpa?.toFixed(2) || student.gpa}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Class Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.4 }}
        className="glass-panel p-6"
      >
        <h3 className="section-title mb-4">Class Overview</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {deptClasses.map(c => (
            <div key={c.id} className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.studentCount} students</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Avg Risk</span>
                  <span className={c.avgRisk > 65 ? 'text-risk-high' : c.avgRisk > 40 ? 'text-risk-monitor' : 'text-risk-safe'}>
                    {c.avgRisk}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Attendance</span>
                  <span className="text-foreground">{c.avgAttendance}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Performance</span>
                  <span className="text-foreground">{c.avgPerformance}%</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Faculty: {c.faculty.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </RoleLayout>
  );
};

export default HodDashboard;
