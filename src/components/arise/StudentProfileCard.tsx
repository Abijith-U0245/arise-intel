import { motion } from 'framer-motion';
import type { StudentData } from '@/types';
import { RiskScoreWidget } from './RiskScoreWidget';
import { GlowingBadge } from './GlowingBadge';
import { User, BookOpen, Calendar, FileText, Mail, Phone, GraduationCap, Building2 } from 'lucide-react';

interface StudentProfileCardProps {
  student: StudentData;
  detailed?: boolean;
}

export function StudentProfileCard({ student, detailed = false }: StudentProfileCardProps) {
  const profile = student.profile;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6"
    >
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-16 rounded-2xl bg-primary/15 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <RiskScoreWidget score={student.riskScore} size="sm" showLabel={detailed} />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-foreground">{profile?.name || student.name}</h2>
            <GlowingBadge level={student.riskLevel} pulse={student.riskLevel === 'high'}>
              {student.riskLevel}
            </GlowingBadge>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <span>{student.erpId}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              <span>GPA: {student.academics?.cgpa?.toFixed(2) || student.gpa}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Att: {student.attendance?.overall || student.attendance_legacy}%</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <span>Class: {student.classId}</span>
            </div>
          </div>
          
          {detailed && profile && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Year {profile.academicYear}, Semester {profile.semester}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                <span>{profile.department}</span>
              </div>
            </div>
          )}
          
          {student.sentimentKeywords?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {student.sentimentKeywords.map(kw => (
                <span key={kw} className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
