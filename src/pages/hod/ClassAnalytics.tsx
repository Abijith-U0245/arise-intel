import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { departments, classes, allStudents } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Users, GraduationCap, BookOpen, Activity, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const navItems = [
  { path: '/hod/dashboard', label: 'Department Overview', icon: Building2 },
  { path: '/hod/classes', label: 'Class Analytics', icon: BookOpen },
  { path: '/hod/faculty', label: 'Faculty', icon: GraduationCap },
  { path: '/hod/risk', label: 'Risk Insights', icon: Activity },
];

const ClassAnalytics = () => {
  const { user } = useAuth();
  const department = departments.find(d => d.hod === user?.name) || departments[0];
  const deptClasses = classes.filter(c => c.department === department.id);
  const deptStudents = allStudents.filter(s => s.department === department.id);

  // Class performance data
  const classData = deptClasses.map(cls => {
    const classStudents = deptStudents.filter(s => s.classId === cls.id);
    const avgGPA = classStudents.reduce((acc, s) => acc + (s.gpa || 0), 0) / classStudents.length || 0;
    const avgAttendance = classStudents.reduce((acc, s) => acc + (typeof s.attendance === 'number' ? s.attendance : s.attendance?.overall || 0), 0) / classStudents.length || 0;
    const highRiskCount = classStudents.filter(s => s.riskScore > 65).length;

    return {
      name: cls.name,
      students: classStudents.length,
      avgGPA: parseFloat(avgGPA.toFixed(2)),
      avgAttendance: parseFloat(avgAttendance.toFixed(1)),
      highRisk: highRiskCount,
      advisor: (cls as { facultyAdvisor?: string; classTeacher?: string }).facultyAdvisor || (cls as { facultyAdvisor?: string; classTeacher?: string }).classTeacher || 'TBD',
    };
  });

  return (
    <RoleLayout navItems={navItems} roleLabel="Head of Department">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Class Analytics</h1>
          <p className="text-sm text-muted-foreground">{department.name} - Performance across all classes</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={BookOpen} label="Total Classes" value={deptClasses.length} accent="primary" delay={0} />
        <StatCard icon={Users} label="Total Students" value={deptStudents.length} accent="accent" delay={0.05} />
        <StatCard icon={GraduationCap} label="Avg Class Size" value={Math.round(deptStudents.length / deptClasses.length)} accent="safe" delay={0.1} />
        <StatCard icon={Activity} label="High Risk Students" value={deptStudents.filter(s => s.riskScore > 65).length} accent="risk" delay={0.15} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Class Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={classData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="avgGPA" name="Avg GPA" fill="hsl(250, 80%, 62%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Attendance by Class</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={classData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(220, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={11} domain={[60, 100]} />
              <Tooltip />
              <Bar dataKey="avgAttendance" name="Avg Attendance %" fill="hsl(142, 70%, 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Class Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {classData.map((cls, idx) => (
          <motion.div
            key={cls.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{cls.name}</h3>
                <p className="text-sm text-muted-foreground">Class Advisor: {cls.advisor}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded-lg bg-secondary/30">
                <p className="text-xs text-muted-foreground">Students</p>
                <p className="text-xl font-bold text-foreground">{cls.students}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30">
                <p className="text-xs text-muted-foreground">Avg GPA</p>
                <p className="text-xl font-bold text-foreground">{cls.avgGPA}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30">
                <p className="text-xs text-muted-foreground">Attendance</p>
                <p className={`text-xl font-bold ${cls.avgAttendance < 75 ? 'text-red-400' : 'text-foreground'}`}>
                  {cls.avgAttendance}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30">
                <p className="text-xs text-muted-foreground">High Risk</p>
                <p className={`text-xl font-bold ${cls.highRisk > 10 ? 'text-red-400' : 'text-foreground'}`}>
                  {cls.highRisk}
                </p>
              </div>
            </div>

            <button className="w-full px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium flex items-center justify-center gap-2">
              View Class Details
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </RoleLayout>
  );
};

export default ClassAnalytics;
