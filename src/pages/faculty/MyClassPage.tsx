import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { classes, allStudents, allFaculty } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Users, GraduationCap, BookOpen, Activity, Search, ChevronRight, User } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/faculty/dashboard', label: 'Dashboard', icon: Users },
  { path: '/faculty/class', label: 'My Class', icon: BookOpen },
  { path: '/faculty/performance', label: 'Performance', icon: GraduationCap },
  { path: '/faculty/attendance', label: 'Attendance', icon: Activity },
];

const MyClassPage = () => {
  const { user } = useAuth();
  const faculty = allFaculty.find(f => f.email === user?.email) || allFaculty[0];
  // Find a class where faculty is assigned (using first class for demo)
  const assignedClass = classes[0];
  const classStudents = allStudents.filter(s => s.classId === assignedClass.id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = classStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <RoleLayout navItems={navItems} roleLabel="Faculty">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Class</h1>
          <p className="text-sm text-muted-foreground">{assignedClass.name} - {classStudents.length} students</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Total Students" value={classStudents.length} accent="primary" delay={0} />
        <StatCard icon={GraduationCap} label="Avg CGPA" value={(classStudents.reduce((acc, s) => acc + (s.gpa || 0), 0) / classStudents.length).toFixed(2)} accent="accent" delay={0.05} />
        <StatCard icon={Activity} label="Avg Attendance" value={`${(classStudents.reduce((acc, s) => acc + (typeof s.attendance === 'number' ? s.attendance : s.attendance?.overall || 0), 0) / classStudents.length).toFixed(1)}%`} accent="safe" delay={0.1} />
        <StatCard icon={BookOpen} label="High Risk" value={classStudents.filter(s => s.riskScore > 65).length} accent="risk" delay={0.15} />
      </div>

      {/* Search */}
      <div className="glass-panel p-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student, idx) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
            className="glass-panel p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{student.name}</h4>
                  <p className="text-xs text-muted-foreground">{student.id}</p>
                </div>
              </div>
              <GlowingBadge level={student.riskScore > 65 ? 'high' : student.riskScore > 40 ? 'monitor' : 'safe'}>
                {student.riskScore}
              </GlowingBadge>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-2 rounded-lg bg-secondary/30">
                <p className="text-xs text-muted-foreground">CGPA</p>
                <p className="text-sm font-bold text-foreground">{(student.gpa || 0).toFixed(2)}</p>
              </div>
              <div className="p-2 rounded-lg bg-secondary/30">
                <p className="text-xs text-muted-foreground">Attendance</p>
                <p className={`text-sm font-bold ${(typeof student.attendance === 'number' ? student.attendance : student.attendance?.overall || 0) < 75 ? 'text-red-400' : 'text-foreground'}`}>
                  {(typeof student.attendance === 'number' ? student.attendance : student.attendance?.overall || 0).toFixed(0)}%
                </p>
              </div>
            </div>

            <button className="w-full px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium flex items-center justify-center gap-2">
              View Details
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </RoleLayout>
  );
};

export default MyClassPage;
