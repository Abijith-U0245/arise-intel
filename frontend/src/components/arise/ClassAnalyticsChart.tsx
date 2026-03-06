import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ClassData } from '@/data/mockData';

interface ClassAnalyticsChartProps {
  classes: ClassData[];
  title?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-panel-strong p-3 text-sm">
        <p className="text-foreground font-medium">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-muted-foreground">
            {p.name}: <span className="text-foreground font-medium">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ClassAnalyticsChart({ classes, title = 'Class Comparison' }: ClassAnalyticsChartProps) {
  const data = classes.map(c => ({
    name: c.name,
    'Avg Risk': c.avgRisk,
    'Avg Attendance': c.avgAttendance,
    'Avg Performance': c.avgPerformance,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6"
    >
      <h3 className="section-title mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground mb-4">Across all classes</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
          <XAxis dataKey="name" stroke="hsl(220, 15%, 55%)" fontSize={12} />
          <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Avg Risk" fill="hsl(0, 72%, 55%)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Avg Attendance" fill="hsl(250, 80%, 62%)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Avg Performance" fill="hsl(175, 80%, 50%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
