import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { AttendanceHeatmap } from '@/components/arise/AttendanceHeatmap';
import { getFacultyByEmail, getFacultyStudents, getRiskDistribution, classes, departments } from '@/data/mockData';
import { Users, AlertTriangle, TrendingDown, MessageSquare, BarChart3, Calendar, GraduationCap, BookOpen } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const navItems = [
  { path: '/faculty/dashboard', label: 'My Class', icon: Users },
  { path: '/faculty/performance', label: 'Performance', icon: BarChart3 },
  { path: '/faculty/attendance', label: 'Attendance', icon: Calendar },
  { path: '/faculty/feedback', label: 'Feedback', icon: MessageSquare },
];

const FacultyDashboard = () => {
  const { user } = useAuth();
  const faculty = user?.email ? getFacultyByEmail(user.email) : undefined;
  
  // Get faculty's assigned class
  const classId = faculty?.assignedClasses[0] || 'CSE-A';
  const classInfo = classes.find(c => c.id === classId);
  const department = departments.find(d => d.id === classInfo?.departmentCode);
  const students = getFacultyStudents(faculty?.facultyId || '');
  const dist = getRiskDistribution(students);

  const pieData = [
    { name: 'Safe', value: dist.safe, color: 'hsl(142, 70%, 45%)' },
    { name: 'Monitor', value: dist.monitor, color: 'hsl(45, 90%, 55%)' },
    { name: 'High Risk', value: dist.high + (dist.critical || 0), color: 'hsl(0, 72%, 55%)' },
  ];

  // Grade distribution from actual student data
  const gradeDist = {
    A: students.filter(s => s.academics?.overallGrade === 'A' || s.academics?.overallGrade === 'A+').length,
    B: students.filter(s => s.academics?.overallGrade === 'B').length,
    C: students.filter(s => s.academics?.overallGrade === 'C').length,
    D: students.filter(s => s.academics?.overallGrade === 'D' || s.academics?.overallGrade === 'F').length,
  };

  const gradeData = [
    { name: 'A', value: gradeDist.A, color: '#22c55e' },
    { name: 'B', value: gradeDist.B, color: '#3b82f6' },
    { name: 'C', value: gradeDist.C, color: '#f59e0b' },
    { name: 'D/F', value: gradeDist.D, color: '#ef4444' },
  ].filter(g => g.value > 0);

  // Attendance distribution
  const attDist = {
    excellent: students.filter(s => (s.attendance?.overall || s.attendance_legacy) >= 90).length,
    good: students.filter(s => {
      const att = s.attendance?.overall || s.attendance_legacy;
      return att >= 75 && att < 90;
    }).length,
    average: students.filter(s => {
      const att = s.attendance?.overall || s.attendance_legacy;
      return att >= 60 && att < 75;
    }).length,
    poor: students.filter(s => (s.attendance?.overall || s.attendance_legacy) < 60).length,
  };

  // High risk students for alerts
  const highRiskStudents = students
    .filter(s => s.riskScore > 65)
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5);

  return (
    <RoleLayout navItems={navItems} roleLabel="Faculty">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-foreground">{classInfo?.name || 'My Class'} Dashboard</h1>
          <GlowingBadge level="monitor" pulse>{classId}</GlowingBadge>
          {department && (
            <span className="text-sm text-muted-foreground">{department.name}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Assigned class: {classId} · {students.length} students · Faculty Advisor
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Students" value={students.length} accent="primary" delay={0} />
        <StatCard icon={AlertTriangle} label="High Risk" value={dist.high + (dist.critical || 0)} accent="risk" delay={0.05} />
        <StatCard icon={TrendingDown} label="Monitor" value={dist.monitor} accent="monitor" delay={0.1} />
        <StatCard icon={Calendar} label="Avg Attendance" value={`${classInfo?.avgAttendance || 0}%`} accent="safe" delay={0.15} />
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

        {/* Grade Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={gradeData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" stroke="none">
                {gradeData.map((e, i) => <Cell key={i} fill={e.color} />)}
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

        {/* Attendance Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Attendance Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-foreground">Excellent (90%+)</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{attDist.excellent}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-sm text-foreground">Good (75-89%)</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{attDist.good}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span className="text-sm text-foreground">Average (60-74%)</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{attDist.average}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-sm text-foreground">At Risk (&lt;60%)</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{attDist.poor}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risk Alerts */}
      {highRiskStudents.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.35 }}
          className="glass-panel p-6 mb-6 border-risk-high/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-risk-high" />
            <h3 className="section-title">Risk Alerts - Students Requiring Attention</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {highRiskStudents.map((student) => (
              <div key={student.id} className="p-3 rounded-lg bg-risk-high/5 border border-risk-high/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{student.profile?.name || student.name}</span>
                  <GlowingBadge level="high" pulse>{student.riskScore}</GlowingBadge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">ERP: {student.erpId}</p>
                <p className="text-xs text-muted-foreground">
                  Att: {student.attendance?.overall || student.attendance_legacy}% · 
                  GPA: {student.academics?.cgpa?.toFixed(2) || student.gpa}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Student table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6">
        <h3 className="section-title mb-4">Student Overview</h3>
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card">
              <tr className="border-b border-border text-left">
                <th className="pb-3 text-muted-foreground font-medium">Name</th>
                <th className="pb-3 text-muted-foreground font-medium">ERP ID</th>
                <th className="pb-3 text-muted-foreground font-medium">Attendance</th>
                <th className="pb-3 text-muted-foreground font-medium">CGPA</th>
                <th className="pb-3 text-muted-foreground font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 20).map(s => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-2.5 text-foreground">{s.profile?.name || s.name}</td>
                  <td className="py-2.5 text-muted-foreground font-mono text-xs">{s.erpId}</td>
                  <td className="py-2.5 text-muted-foreground">{s.attendance?.overall || s.attendance_legacy}%</td>
                  <td className="py-2.5 text-muted-foreground">{s.academics?.cgpa?.toFixed(2) || s.gpa}</td>
                  <td className="py-2.5">
                    <GlowingBadge level={s.riskLevel} pulse={s.riskLevel === 'high'}>{s.riskLevel}</GlowingBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {students.length > 20 && (
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Showing first 20 of {students.length} students
          </p>
        )}
      </motion.div>
    </RoleLayout>
  );
};

export default FacultyDashboard;
