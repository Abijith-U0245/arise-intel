import { motion } from 'framer-motion';
import { DepartmentData } from '@/data/mockData';
import { Building2, Users, GraduationCap, AlertTriangle } from 'lucide-react';

interface DepartmentOverviewPanelProps {
  department: DepartmentData;
}

export function DepartmentOverviewPanel({ department }: DepartmentOverviewPanelProps) {
  const items = [
    { icon: Building2, label: 'Department', value: department.name, accent: 'primary' as const },
    { icon: Users, label: 'Students', value: department.totalStudents, accent: 'accent' as const },
    { icon: GraduationCap, label: 'Faculty', value: department.totalFaculty, accent: 'safe' as const },
    { icon: AlertTriangle, label: 'Avg Risk', value: department.avgRisk, accent: 'risk' as const },
  ];

  const accentMap = {
    primary: 'text-primary bg-primary/10',
    accent: 'text-accent bg-accent/10',
    safe: 'text-risk-safe bg-risk-safe/10',
    risk: 'text-risk-high bg-risk-high/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6"
    >
      <h3 className="section-title mb-4">Department Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.label} className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${accentMap[item.accent]}`}>
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-semibold text-foreground">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
