import { motion } from 'framer-motion';
import { StudentData } from '@/data/mockData';
import { RiskScoreWidget } from './RiskScoreWidget';
import { GlowingBadge } from './GlowingBadge';
import { User, BookOpen, Calendar, FileText } from 'lucide-react';

interface StudentProfileCardProps {
  student: StudentData;
}

export function StudentProfileCard({ student }: StudentProfileCardProps) {
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
          <RiskScoreWidget score={student.riskScore} size="sm" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-foreground">{student.name}</h2>
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
              <span>GPA: {student.gpa}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Att: {student.attendance}%</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <span>Assign: {student.assignmentScore}%</span>
            </div>
          </div>
          {student.sentimentKeywords.length > 0 && (
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
