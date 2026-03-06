import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { departments, allFaculty, getCollegeStats } from '@/data/mockData';
import { Building2, Users, GraduationCap, BookOpen, BarChart3, Activity, Mail, User, Shield } from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard', label: 'College Overview', icon: Building2 },
  { path: '/admin/departments', label: 'Departments', icon: BookOpen },
  { path: '/admin/faculty', label: 'All Faculty', icon: GraduationCap },
  { path: '/admin/students', label: 'All Students', icon: Users },
  { path: '/admin/analytics', label: 'Global Analytics', icon: BarChart3 },
  { path: '/admin/system', label: 'System', icon: Activity },
];

const FacultyManagement = () => {
  const stats = getCollegeStats();

  // Group faculty by department
  const facultyByDept = departments.map(dept => ({
    ...dept,
    faculty: allFaculty.filter(f => f.department === dept.id),
  }));

  return (
    <RoleLayout navItems={navItems} roleLabel="System Admin">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Faculty Management</h1>
            <p className="text-sm text-muted-foreground">Manage all faculty across departments</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            + Add Faculty
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={GraduationCap} label="Total Faculty" value={stats.totalFaculty} accent="primary" delay={0} />
        <StatCard icon={Shield} label="HODs" value={stats.totalHODs} accent="accent" delay={0.05} />
        <StatCard icon={Building2} label="Departments" value={stats.totalDepartments} accent="safe" delay={0.1} />
        <StatCard icon={User} label="Faculty/Dept (Avg)" value={Math.round(stats.totalFaculty / stats.totalDepartments)} accent="monitor" delay={0.15} />
      </div>

      {/* Faculty by Department */}
      {facultyByDept.map((dept, idx) => (
        <motion.div
          key={dept.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * idx }}
          className="glass-panel p-6 mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{dept.name}</h3>
                <p className="text-sm text-muted-foreground">{dept.code} • {dept.faculty.length} faculty members</p>
              </div>
            </div>
            <GlowingBadge level="safe">{dept.faculty.length} Faculty</GlowingBadge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dept.faculty.map((faculty) => (
              <div key={faculty.id} className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{faculty.name}</p>
                    <p className="text-xs text-muted-foreground">{faculty.designation}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{faculty.email}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 px-2 py-1.5 rounded text-xs bg-secondary hover:bg-secondary/80 transition-colors">
                    View
                  </button>
                  <button className="flex-1 px-2 py-1.5 rounded text-xs border border-border hover:bg-secondary/30 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </RoleLayout>
  );
};

export default FacultyManagement;
