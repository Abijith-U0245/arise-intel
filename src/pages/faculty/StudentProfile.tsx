import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { RiskScoreWidget } from '@/components/arise/RiskScoreWidget';
import { 
  getStudentById, 
  getStudentAcademicProfile, 
  getStudentAttendance,
  getStudentAssignments,
  getStudentCompetitions,
  getRiskAnalytics,
  classes,
  departments
} from '@/data/mockData';
import { 
  Users, 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  AlertTriangle,
  FileText,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useState } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';

const navItems = [
  { path: '/faculty/dashboard', label: 'My Class', icon: Users },
  { path: '/faculty/performance', label: 'Performance', icon: Activity },
  { path: '/faculty/attendance', label: 'Attendance', icon: Calendar },
  { path: '/faculty/feedback', label: 'Feedback', icon: Mail },
];

const FacultyStudentProfilePage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { triggerNotification } = useNotifications();
  const [interventionTriggered, setInterventionTriggered] = useState(false);
  
  const student = studentId ? getStudentById(studentId) : undefined;
  
  if (!student) {
    return (
      <RoleLayout navItems={navItems} roleLabel="Faculty">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <AlertTriangle className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Student Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested student profile could not be found.</p>
          <button 
            onClick={() => navigate('/faculty/dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>
      </RoleLayout>
    );
  }
  
  const academicProfile = getStudentAcademicProfile(studentId!);
  const attendance = getStudentAttendance(studentId!);
  const assignments = getStudentAssignments(studentId!);
  const competitions = getStudentCompetitions(studentId!);
  const riskAnalytics = getRiskAnalytics(studentId!);
  
  const classInfo = classes.find(c => c.id === student.classId);
  const department = departments.find(d => d.id === student.department);
  
  // Attendance trend data
  const attendanceData = attendance?.subjects?.map((subj: { subject: string; percentage: number }) => ({
    subject: subj.subject,
    attendance: subj.percentage,
  })) || [];
  
  // IA Score data
  const iaData = academicProfile?.iaScores?.map((ia: { subject: string; score: number; maxScore: number }) => ({
    subject: ia.subject,
    score: ia.score,
    maxScore: ia.maxScore,
    percentage: Math.round((ia.score / ia.maxScore) * 100),
  })) || [];
  
  // Assignment status pie chart
  const assignmentStatus = {
    submitted: assignments?.filter((a: { status: string }) => a.status === 'submitted').length || 0,
    pending: assignments?.filter((a: { status: string }) => a.status === 'pending').length || 0,
    late: assignments?.filter((a: { status: string }) => a.status === 'late').length || 0,
    missed: assignments?.filter((a: { status: string }) => a.status === 'missed').length || 0,
  };
  
  const assignmentPieData = [
    { name: 'Submitted', value: assignmentStatus.submitted, color: '#22c55e' },
    { name: 'Pending', value: assignmentStatus.pending, color: '#3b82f6' },
    { name: 'Late', value: assignmentStatus.late, color: '#f59e0b' },
    { name: 'Missed', value: assignmentStatus.missed, color: '#ef4444' },
  ].filter(d => d.value > 0);
  
  const handleTriggerIntervention = () => {
    setInterventionTriggered(true);
    // Simulate triggering an intervention notification
    setTimeout(() => {
      triggerNotification(
        student,
        student.riskScore,
        Math.max(0, student.riskScore - 5),
        'risk_level_increase',
        'Manual intervention triggered by faculty'
      );
    }, 500);
  };
  
  return (
    <RoleLayout navItems={navItems} roleLabel="Faculty">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate('/faculty/dashboard')}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Student Profile</h1>
        </div>
      </motion.div>
      
      {/* Student Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar & Basic Info */}
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl font-bold text-primary">
              {student.profile?.name?.charAt(0) || student.name?.charAt(0) || 'S'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {student.profile?.name || student.name}
              </h2>
              <p className="text-sm text-muted-foreground">{student.erpId}</p>
              <div className="flex items-center gap-2 mt-2">
                <GlowingBadge level={student.riskLevel} pulse={student.riskLevel === 'high' || student.riskLevel === 'critical'}>
                  Risk: {student.riskScore}
                </GlowingBadge>
                <span className="text-xs text-muted-foreground">
                  {classInfo?.name || student.classId} • {department?.code || student.department}
                </span>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="flex-1 grid grid-cols-2 gap-4 md:ml-auto">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{student.profile?.email || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{student.profile?.phone || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">DOB: {student.profile?.dateOfBirth || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">CGPA: {student.academics?.cgpa?.toFixed(2) || student.gpa || 'N/A'}</span>
            </div>
          </div>
          
          {/* Intervention Button */}
          <div className="flex items-center">
            <button
              onClick={handleTriggerIntervention}
              disabled={interventionTriggered}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                interventionTriggered 
                  ? 'bg-green-500/20 text-green-400 cursor-default' 
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              {interventionTriggered ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Intervention Triggered
                </span>
              ) : (
                'Trigger Intervention'
              )}
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          icon={Calendar} 
          label="Attendance" 
          value={`${student.attendance?.overall || student.attendance_legacy || 0}%`} 
          accent={student.attendance?.overall || student.attendance_legacy || 0 > 75 ? 'safe' : 'risk'} 
          delay={0.15} 
        />
        <StatCard 
          icon={BookOpen} 
          label="CGPA" 
          value={student.academics?.cgpa?.toFixed(2) || student.gpa || 'N/A'} 
          accent="primary" 
          delay={0.2} 
        />
        <StatCard 
          icon={FileText} 
          label="Assignments" 
          value={assignments?.length || 0} 
          accent="accent" 
          delay={0.25} 
        />
        <StatCard 
          icon={Trophy} 
          label="Competitions" 
          value={competitions?.length || 0} 
          accent="monitor" 
          delay={0.3} 
        />
      </div>
      
      {/* Risk Score & Analytics */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.35 }}
          className="glass-panel p-6"
        >
          <h3 className="section-title mb-4">AI Risk Score</h3>
          <div className="flex items-center justify-center py-4">
            <RiskScoreWidget score={student.riskScore} size="lg" showDetails />
          </div>
          {riskAnalytics && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-muted-foreground">Risk Factors:</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Academic</span>
                  <span className={`${riskAnalytics.factors.academic > 50 ? 'text-red-400' : 'text-foreground'}`}>
                    {riskAnalytics.factors.academic}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Attendance</span>
                  <span className={`${riskAnalytics.factors.attendance > 50 ? 'text-red-400' : 'text-foreground'}`}>
                    {riskAnalytics.factors.attendance}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Engagement</span>
                  <span className={`${riskAnalytics.factors.engagement > 50 ? 'text-red-400' : 'text-foreground'}`}>
                    {riskAnalytics.factors.engagement}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sentiment</span>
                  <span className={`${riskAnalytics.factors.sentiment > 50 ? 'text-red-400' : 'text-foreground'}`}>
                    {riskAnalytics.factors.sentiment}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Attendance Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6"
        >
          <h3 className="section-title mb-4">Subject-wise Attendance</h3>
          {attendanceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
                <XAxis dataKey="subject" stroke="hsl(220, 15%, 55%)" fontSize={10} />
                <YAxis stroke="hsl(220, 15%, 55%)" fontSize={10} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="attendance" radius={[4, 4, 0, 0]}>
                  {attendanceData.map((entry: { attendance: number }, index: number) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.attendance >= 75 ? 'hsl(142, 70%, 45%)' : 'hsl(0, 72%, 55%)'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground">No attendance data available</p>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* IA Scores & Assignments */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        {/* IA Scores Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.45 }}
          className="glass-panel p-6"
        >
          <h3 className="section-title mb-4">Internal Assessment Scores</h3>
          {iaData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">Subject</th>
                    <th className="text-center py-2 text-muted-foreground font-medium">Score</th>
                    <th className="text-center py-2 text-muted-foreground font-medium">Max</th>
                    <th className="text-center py-2 text-muted-foreground font-medium">%</th>
                  </tr>
                </thead>
                <tbody>
                  {iaData.map((ia, idx) => (
                    <tr key={idx} className="border-b border-border/50">
                      <td className="py-2 text-foreground">{ia.subject}</td>
                      <td className="py-2 text-center text-foreground">{ia.score}</td>
                      <td className="py-2 text-center text-muted-foreground">{ia.maxScore}</td>
                      <td className="py-2 text-center">
                        <span className={`${ia.percentage >= 60 ? 'text-green-400' : ia.percentage >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {ia.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No IA scores available</p>
            </div>
          )}
        </motion.div>
        
        {/* Assignments */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5 }}
          className="glass-panel p-6"
        >
          <h3 className="section-title mb-4">Assignment Status</h3>
          <div className="flex flex-col md:flex-row gap-4">
            {assignmentPieData.length > 0 && (
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie 
                      data={assignmentPieData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={30} 
                      outerRadius={60} 
                      dataKey="value"
                      stroke="none"
                    >
                      {assignmentPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            <div className="flex-1 space-y-2">
              {assignmentPieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Assignments List */}
          {assignments && assignments.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Recent Assignments</p>
              <div className="space-y-2 max-h-[120px] overflow-y-auto">
                {assignments.slice(0, 5).map((assignment, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground truncate">{assignment.title || `Assignment ${idx + 1}`}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      assignment.status === 'submitted' ? 'bg-green-500/10 text-green-400' :
                      assignment.status === 'pending' ? 'bg-blue-500/10 text-blue-400' :
                      assignment.status === 'late' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Competition Activities */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.55 }}
        className="glass-panel p-6 mb-6"
      >
        <h3 className="section-title mb-4">Competition & Activity Participation</h3>
        {competitions && competitions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitions.map((comp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-secondary/30">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  <span className="font-medium text-foreground text-sm">{comp.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{comp.organizer}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    comp.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                    comp.status === 'ongoing' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {comp.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{comp.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No competition participation recorded</p>
          </div>
        )}
      </motion.div>
      
      {/* Recent Notifications */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.6 }}
        className="glass-panel p-6"
      >
        <h3 className="section-title mb-4">Recent Notifications</h3>
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">Notification history will appear here</p>
        </div>
      </motion.div>
    </RoleLayout>
  );
};

export default FacultyStudentProfilePage;
