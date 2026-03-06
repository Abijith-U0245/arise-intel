import { motion } from 'framer-motion';
import { AlertTriangle, Bell, TrendingUp, Building2, Calendar, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import type { RiskEventType, RiskLevel } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const levelColors: Record<RiskLevel, string> = {
  safe: 'hsl(142, 70%, 45%)',
  monitor: 'hsl(45, 90%, 55%)',
  highRisk: 'hsl(25, 90%, 55%)',
  critical: 'hsl(0, 72%, 55%)',
};

const eventLabels: Record<RiskEventType, string> = {
  attendance_drop: 'Attendance',
  low_ia_score: 'IA Score',
  missed_assignment: 'Assignment',
  negative_sentiment: 'Sentiment',
  low_engagement: 'Engagement',
  missing_competition: 'Competition',
  risk_level_increase: 'Risk Level',
};

const eventColors: Record<RiskEventType, string> = {
  attendance_drop: 'hsl(220, 80%, 60%)',
  low_ia_score: 'hsl(160, 70%, 45%)',
  missed_assignment: 'hsl(0, 70%, 55%)',
  negative_sentiment: 'hsl(280, 70%, 55%)',
  low_engagement: 'hsl(45, 90%, 55%)',
  missing_competition: 'hsl(200, 70%, 50%)',
  risk_level_increase: 'hsl(0, 72%, 55%)',
};

export function AdminNotificationAnalytics() {
  const { summary } = useNotifications();

  // Transform category data for chart
  const categoryData = Object.entries(summary.byCategory)
    .filter(([, count]) => count > 0)
    .map(([type, count]) => ({
      name: eventLabels[type as RiskEventType],
      value: count,
      color: eventColors[type as RiskEventType],
    }))
    .sort((a, b) => b.value - a.value);

  // Transform department data for chart
  const departmentData = Object.entries(summary.byDepartment)
    .map(([dept, count]) => ({
      name: dept.toUpperCase(),
      alerts: count,
    }))
    .sort((a, b) => b.alerts - a.alerts);

  // Weekly trend data (mock data for visualization)
  const weeklyTrend = [
    { day: 'Mon', alerts: 12 },
    { day: 'Tue', alerts: 19 },
    { day: 'Wed', alerts: 15 },
    { day: 'Thu', alerts: 22 },
    { day: 'Fri', alerts: 28 },
    { day: 'Sat', alerts: 16 },
    { day: 'Sun', alerts: 10 },
  ];

  // Risk level distribution
  const riskDistribution = [
    { name: 'Safe', value: summary.totalAlerts - summary.monitorCount - summary.highRiskCount - summary.criticalCount, color: levelColors.safe },
    { name: 'Monitor', value: summary.monitorCount, color: levelColors.monitor },
    { name: 'High Risk', value: summary.highRiskCount, color: levelColors.highRisk },
    { name: 'Critical', value: summary.criticalCount, color: levelColors.critical },
  ].filter(d => d.value > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-panel p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="section-title">College-wide Risk Alert Analytics</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {summary.totalAlerts} total alerts
        </span>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatCard icon={AlertTriangle} label="Critical" value={summary.criticalCount} color="red" />
        <StatCard icon={TrendingUp} label="High Risk" value={summary.highRiskCount} color="orange" />
        <StatCard icon={Bell} label="Today" value={summary.todayCount} color="blue" />
        <StatCard icon={Building2} label="Departments" value={Object.keys(summary.byDepartment).length} color="purple" />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Alerts by Category */}
        <div className="p-4 rounded-xl bg-secondary/30">
          <div className="flex items-center gap-2 mb-3">
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium text-foreground">Alerts by Category</h4>
          </div>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" horizontal={false} />
                <XAxis type="number" stroke="hsl(220, 15%, 55%)" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="hsl(220, 15%, 55%)" fontSize={10} width={80} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[180px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No category data yet</p>
            </div>
          )}
        </div>

        {/* Alerts by Department */}
        <div className="p-4 rounded-xl bg-secondary/30">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium text-foreground">Alerts by Department</h4>
          </div>
          {departmentData.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
                <XAxis dataKey="name" stroke="hsl(220, 15%, 55%)" fontSize={10} />
                <YAxis stroke="hsl(220, 15%, 55%)" fontSize={10} />
                <Tooltip />
                <Bar dataKey="alerts" fill="hsl(250, 80%, 62%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[180px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No department data yet</p>
            </div>
          )}
        </div>

        {/* Weekly Trend */}
        <div className="p-4 rounded-xl bg-secondary/30">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium text-foreground">Weekly Alert Trend</h4>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(220, 15%, 55%)" fontSize={10} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={10} />
              <Tooltip />
              <Line type="monotone" dataKey="alerts" stroke="hsl(250, 80%, 62%)" strokeWidth={2} dot={{ fill: 'hsl(250, 80%, 62%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Level Distribution */}
        <div className="p-4 rounded-xl bg-secondary/30">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium text-foreground">Risk Level Distribution</h4>
          </div>
          {riskDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="value"
                  stroke="none"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[180px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No risk distribution data</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {riskDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: typeof AlertTriangle; 
  label: string; 
  value: number; 
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <div className={`p-3 rounded-xl border ${colorClasses[color]} text-center`}>
      <Icon className="h-4 w-4 mx-auto mb-1" />
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs opacity-80">{label}</p>
    </div>
  );
}
