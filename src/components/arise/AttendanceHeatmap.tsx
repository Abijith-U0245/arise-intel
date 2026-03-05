import { motion } from 'framer-motion';
import type { AttendanceRecord } from '@/types';
import { Check, X, Minus } from 'lucide-react';

interface AttendanceHeatmapProps {
  attendanceRecords: AttendanceRecord[];
  title?: string;
}

export function AttendanceHeatmap({ attendanceRecords, title = 'Subject-wise Attendance' }: AttendanceHeatmapProps) {
  const getColorClass = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500/20 border-green-500/30 text-green-400';
    if (percentage >= 75) return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
    if (percentage >= 60) return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
    return 'bg-red-500/20 border-red-500/30 text-red-400';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6"
    >
      <h3 className="section-title mb-4">{title}</h3>
      <div className="space-y-2">
        {attendanceRecords.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No attendance records</p>
        ) : (
          attendanceRecords.map((record) => (
            <div 
              key={record.subjectId}
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getColorClass(record.percentage)}`}>
                <span className="text-sm font-bold">{record.percentage}%</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{record.subjectName}</p>
                <p className="text-xs text-muted-foreground">
                  {record.attended} / {record.total} classes attended
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {record.percentage >= 75 ? (
                    <Check className="h-3 w-3 text-green-400" />
                  ) : record.percentage >= 60 ? (
                    <Minus className="h-3 w-3 text-yellow-400" />
                  ) : (
                    <X className="h-3 w-3 text-red-400" />
                  )}
                  <span>{record.percentage >= 75 ? 'Good' : record.percentage >= 60 ? 'Average' : 'At Risk'}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/30" />
          <span className="text-xs text-muted-foreground">Excellent (90%+)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/30" />
          <span className="text-xs text-muted-foreground">Good (75-89%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-yellow-500/20 border border-yellow-500/30" />
          <span className="text-xs text-muted-foreground">Average (60-74%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/30" />
          <span className="text-xs text-muted-foreground">At Risk (&lt;60%)</span>
        </div>
      </div>
    </motion.div>
  );
}
