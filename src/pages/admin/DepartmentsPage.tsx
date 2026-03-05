import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { departments, allStudents, getCollegeStats } from '@/data/mockData';
import { Building2, Users, GraduationCap, BookOpen, BarChart3, Activity } from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard', label: 'College Overview', icon: Building2 },
  { path: '/admin/departments', label: 'Departments', icon: BookOpen },
  { path: '/admin/faculty', label: 'All Faculty', icon: GraduationCap },
  { path: '/admin/students', label: 'All Students', icon: Users },
  { path: '/admin/analytics', label: 'Global Analytics', icon: BarChart3 },
  { path: '/admin/system', label: 'System', icon: Activity },
];

const DepartmentsPage = () => {
  const stats = getCollegeStats();

  return (
    <RoleLayout navItems={navItems} roleLabel="System Admin">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Departments Management</h1>
            <p className="text-sm text-muted-foreground">Manage all college departments and their resources</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            + Add Department
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Building2} label="Total Departments" value={stats.totalDepartments} accent="primary" delay={0} />
        <StatCard icon={Users} label="Total Students" value={stats.totalStudents} accent="accent" delay={0.05} />
        <StatCard icon={GraduationCap} label="Total Faculty" value={stats.totalFaculty + stats.totalHODs} accent="safe" delay={0.1} />
        <StatCard icon={BookOpen} label="Total Classes" value={stats.totalClasses} accent="monitor" delay={0.15} />
      </div>

      {/* Departments Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {departments.map((dept, idx) => {
          const deptStudents = allStudents.filter(s => s.department === dept.id);
          const highRiskCount = deptStudents.filter(s => s.riskScore > 65).length;
          const avgAttendance = deptStudents.reduce((acc, s) => acc + (typeof s.attendance === 'number' ? s.attendance : s.attendance?.overall || 0), 0) / deptStudents.length;
          const avgCGPA = deptStudents.reduce((acc, s) => acc + (s.gpa || 0), 0) / deptStudents.length;

          return (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="glass-panel p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground">{dept.code}</p>
                </div>
                <GlowingBadge level={dept.avgRisk > 65 ? 'high' : dept.avgRisk > 40 ? 'monitor' : 'safe'}>
                  Risk: {dept.avgRisk}
                </GlowingBadge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xs text-muted-foreground">Students</p>
                  <p className="text-xl font-bold text-foreground">{dept.totalStudents}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xs text-muted-foreground">Faculty</p>
                  <p className="text-xl font-bold text-foreground">{dept.totalFaculty}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xs text-muted-foreground">Classes</p>
                  <p className="text-xl font-bold text-foreground">{dept.classes.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xs text-muted-foreground">High Risk</p>
                  <p className={`text-xl font-bold ${highRiskCount > 30 ? 'text-red-400' : 'text-foreground'}`}>{highRiskCount}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Attendance</span>
                  <span className="font-medium text-foreground">{avgAttendance.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average CGPA</span>
                  <span className="font-medium text-foreground">{avgCGPA.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HOD</span>
                  <span className="font-medium text-foreground">{dept.hod}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <button className="flex-1 px-3 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary/30 transition-colors">
                  Edit
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </RoleLayout>
  );
};

export default DepartmentsPage;
