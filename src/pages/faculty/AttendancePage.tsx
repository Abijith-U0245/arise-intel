import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { AttendanceHeatmap } from '@/components/arise/AttendanceHeatmap';
import { classes, allStudents } from '@/data/mockData';
import { Users, GraduationCap, BookOpen, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const navItems = [
  { path: '/faculty/dashboard', label: 'Dashboard', icon: Users },
  { path: '/faculty/class', label: 'My Class', icon: BookOpen },
  { path: '/faculty/performance', label: 'Performance', icon: GraduationCap },
  { path: '/faculty/attendance', label: 'Attendance', icon: Activity },
];

const AttendancePage = () => {
  const assignedClass = classes[0];
  const classStudents = allStudents.filter(s => s.classId === assignedClass.id);

  // Calculate attendance stats
  const avgAttendance = classStudents.reduce((acc, s) => acc + (typeof s.attendance === 'number' ? s.attendance : s.attendance?.overall || 0), 0) / classStudents.length;
  const lowAttendance = classStudents.filter(s => (typeof s.attendance === 'number' ? s.attendance : s.attendance?.overall || 0) < 75).length;
  const excellentAttendance = classStudents.filter(s => (typeof s.attendance === 'number' ? s.attendance : s.attendance?.overall || 0) >= 90).length;

  // Weekly trend data (mock)
  const weeklyTrend = [
    { week: 'Week 1', attendance: 88 },
    { week: 'Week 2', attendance: 85 },
    { week: 'Week 3', attendance: 87 },
    { week: 'Week 4', attendance: 90 },
    { week: 'Week 5', attendance: 86 },
    { week: 'Week 6', attendance: 89 },
  ];

  // Subject-wise attendance
  const subjectAttendance = [
    { subject: 'CS101', avg: 85 },
    { subject: 'CS102', avg: 78 },
    { subject: 'MA101', avg: 82 },
    { subject: 'PH101', avg: 88 },
  ];

  return (
    <RoleLayout navItems={navItems} roleLabel="Faculty">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-sm text-muted-foreground">{assignedClass.name} - Track student attendance</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Activity} label="Class Average" value={`${avgAttendance.toFixed(1)}%`} accent="primary" delay={0} />
        <StatCard icon={AlertCircle} label="Below 75%" value={lowAttendance} accent="risk" delay={0.05} />
        <StatCard icon={TrendingUp} label="Above 90%" value={excellentAttendance} accent="safe" delay={0.1} />
        <StatCard icon={Users} label="Total Students" value={classStudents.length} accent="accent" delay={0.15} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Weekly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="week" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[70, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="hsl(250, 80%, 62%)" strokeWidth={2} dot={{ fill: 'hsl(250, 80%, 62%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Subject-wise Attendance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="subject" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="avg" name="Avg %" fill="hsl(142, 70%, 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Attendance Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Student Attendance</h3>
          <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Mark Attendance
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Overall %</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Present</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Absent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {classStudents.slice(0, 10).map((student) => {
                const attendance = typeof student.attendance === 'number' ? student.attendance : student.attendance?.overall || 0;
                const totalClasses = 60;
                const present = Math.round((attendance / 100) * totalClasses);
                const absent = totalClasses - present;
                
                return (
                  <tr key={student.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${attendance < 75 ? 'text-red-400' : attendance >= 90 ? 'text-green-400' : 'text-foreground'}`}>
                        {attendance.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{present}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${absent > 10 ? 'text-red-400' : 'text-foreground'}`}>{absent}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${attendance < 75 ? 'bg-red-500/10 text-red-400' : attendance >= 90 ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                        {attendance < 75 ? 'At Risk' : attendance >= 90 ? 'Excellent' : 'Good'}
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
