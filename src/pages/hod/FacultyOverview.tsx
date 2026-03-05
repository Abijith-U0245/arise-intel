import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { departments, allFaculty } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Users, GraduationCap, BookOpen, Activity, Mail, User, Award } from 'lucide-react';

const navItems = [
  { path: '/hod/dashboard', label: 'Department Overview', icon: Building2 },
  { path: '/hod/classes', label: 'Class Analytics', icon: BookOpen },
  { path: '/hod/faculty', label: 'Faculty', icon: GraduationCap },
  { path: '/hod/risk', label: 'Risk Insights', icon: Activity },
];

const FacultyOverview = () => {
  const { user } = useAuth();
  const department = departments.find(d => d.hod === user?.name) || departments[0];
  const deptFaculty = allFaculty.filter(f => f.department === department.id);

  return (
    <RoleLayout navItems={navItems} roleLabel="Head of Department">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Faculty Overview</h1>
          <p className="text-sm text-muted-foreground">{department.name} - Faculty management</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={GraduationCap} label="Total Faculty" value={deptFaculty.length} accent="primary" delay={0} />
        <StatCard icon={Award} label="Professors" value={deptFaculty.filter(f => f.designation?.includes('Professor')).length} accent="accent" delay={0.05} />
        <StatCard icon={User} label="Asst. Professors" value={deptFaculty.filter(f => f.designation?.includes('Assistant')).length} accent="safe" delay={0.1} />
        <StatCard icon={Users} label="Subjects Covered" value={8} accent="monitor" delay={0.15} />
      </div>

      {/* Faculty Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deptFaculty.map((faculty, idx) => (
          <motion.div
            key={faculty.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
            className="glass-panel p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">{faculty.name}</h3>
                <p className="text-xs text-muted-foreground">{faculty.designation}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{faculty.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>{faculty.specialization || 'Computer Science'}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{(faculty as { subjects?: string[] }).subjects?.length || 2} subjects assigned</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex gap-2">
              <button className="flex-1 px-3 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors">
                View Profile
              </button>
              <button className="flex-1 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary/30 transition-colors">
                Edit
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </RoleLayout>
  );
};

export default FacultyOverview;
