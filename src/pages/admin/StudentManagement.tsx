import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { departments, allStudents, getCollegeStats, getRiskDistribution } from '@/data/mockData';
import { Building2, Users, GraduationCap, BookOpen, BarChart3, Activity, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/admin/dashboard', label: 'College Overview', icon: Building2 },
  { path: '/admin/departments', label: 'Departments', icon: BookOpen },
  { path: '/admin/faculty', label: 'All Faculty', icon: GraduationCap },
  { path: '/admin/students', label: 'All Students', icon: Users },
  { path: '/admin/analytics', label: 'Global Analytics', icon: BarChart3 },
  { path: '/admin/system', label: 'System', icon: Activity },
];

const StudentManagement = () => {
  const stats = getCollegeStats();
  const dist = getRiskDistribution(allStudents);
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter students
  const filteredStudents = allStudents.filter(student => {
    const matchesDept = selectedDept === 'all' || student.department === selectedDept;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <RoleLayout navItems={navItems} roleLabel="System Admin">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Student Management</h1>
            <p className="text-sm text-muted-foreground">View and manage all students across departments</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            + Add Student
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Total Students" value={stats.totalStudents} accent="primary" delay={0} />
        <StatCard icon={GraduationCap} label="Avg CGPA" value={stats.avgCGPA} accent="accent" delay={0.05} />
        <StatCard icon={BarChart3} label="Avg Attendance" value={`${stats.avgAttendance}%`} accent="safe" delay={0.1} />
        <StatCard icon={Activity} label="At Risk" value={dist.high + (dist.critical || 0)} accent="risk" delay={0.15} />
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 mb-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-4 py-2 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.code}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Department</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">CGPA</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Attendance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Risk Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedStudents.map((student) => {
                const dept = departments.find(d => d.id === student.department);
                const attendance = typeof student.attendance === 'number' ? student.attendance : student.attendance?.overall || 0;
                
                return (
                  <tr key={student.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">{student.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{dept?.code || 'N/A'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-foreground">{(student.gpa || 0).toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${attendance < 75 ? 'text-red-400' : 'text-foreground'}`}>
                        {attendance.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${student.riskScore > 65 ? 'text-red-400' : student.riskScore > 40 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {student.riskScore}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <GlowingBadge 
                        level={student.riskScore > 65 ? 'high' : student.riskScore > 40 ? 'monitor' : 'safe'}
                        className="text-xs"
                      >
                        {student.riskScore > 65 ? 'Critical' : student.riskScore > 40 ? 'Monitor' : 'Safe'}
                      </GlowingBadge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-secondary disabled:opacity-50 hover:bg-secondary/80 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-secondary disabled:opacity-50 hover:bg-secondary/80 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};

export default StudentManagement;
