import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { AttendanceHeatmap } from '@/components/arise/AttendanceHeatmap';
import { allStudents } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, Activity, BarChart3, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const navItems = [
  { path: '/student/dashboard', label: 'My Dashboard', icon: Users },
  { path: '/student/academics', label: 'Academics', icon: BookOpen },
  { path: '/student/attendance', label: 'Attendance', icon: Activity },
  { path: '/student/activities', label: 'Activities', icon: BarChart3 },
  { path: '/student/ai-insights', label: 'AI Insights', icon: Activity },
  { path: '/student/support', label: 'Support', icon: Users },
];

const AttendancePage = () => {
  const { user } = useAuth();
  const student = allStudents.find(s => s.id === user?.id) || allStudents[0];
  const attendance = typeof student.attendance === 'number' ? student.attendance : student.attendance?.overall || 85;

  // Monthly trend (mock)
  const monthlyTrend = [
    { month: 'Aug', present: 22, absent: 3 },
    { month: 'Sep', present: 20, absent: 5 },
    { month: 'Oct', present: 23, absent: 2 },
    { month: 'Nov', present: 21, absent: 4 },
    { month: 'Dec', present: 24, absent: 1 },
    { month: 'Jan', present: 22, absent: 3 },
  ];

  // Subject-wise attendance
  const subjectAttendance = [
    { subject: 'CS101', present: 45, total: 50 },
    { subject: 'CS102', present: 42, total: 50 },
    { subject: 'MA101', present: 44, total: 50 },
    { subject: 'PH101', present: 46, total: 50 },
    { subject: 'EN101', present: 43, total: 50 },
  ];

  return (
    <RoleLayout navItems={navItems} roleLabel="Student">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance Record</h1>
          <p className="text-sm text-muted-foreground">Track your attendance across all subjects</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Activity} label="Overall %" value={`${attendance.toFixed(1)}%`} accent={attendance >= 75 ? 'safe' : 'risk'} delay={0} />
        <StatCard icon={CheckCircle} label="Present Days" value="132" accent="safe" delay={0.05} />
        <StatCard icon={AlertCircle} label="Absent Days" value="18" accent="monitor" delay={0.1} />
        <StatCard icon={Calendar} label="Working Days" value="150" accent="accent" delay={0.15} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Monthly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(220, 15%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="present" stroke="hsl(142, 70%, 45%)" fill="hsl(142, 70%, 45%)" fillOpacity={0.3} name="Present" />
              <Area type="monotone" dataKey="absent" stroke="hsl(0, 72%, 55%)" fill="hsl(0, 72%, 55%)" fillOpacity={0.3} name="Absent" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Subject-wise Attendance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectAttendance.map(s => ({ ...s, pct: (s.present / s.total) * 100 }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="subject" stroke="hsl(220, 15%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} domain={[0, 100]} />
              <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
              <Bar dataKey="pct" name="Attendance %" fill="hsl(250, 80%, 62%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Subject Details */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
        <h3 className="section-title mb-4">Subject-wise Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Classes Held</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Present</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Absent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Percentage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subjectAttendance.map((subject) => {
                const pct = (subject.present / subject.total) * 100;
                return (
                  <tr key={subject.subject} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground">{subject.subject}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{subject.total}</td>
                    <td className="px-4 py-3 text-sm text-green-400">{subject.present}</td>
                    <td className="px-4 py-3 text-sm text-red-400">{subject.total - subject.present}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${pct < 75 ? 'text-red-400' : 'text-foreground'}`}>
                        {pct.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${pct >= 75 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {pct >= 75 ? 'Good Standing' : 'At Risk'}
                      </span>
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

export default AttendancePage;
