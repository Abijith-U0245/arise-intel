import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { StatCard } from '@/components/arise/StatCard';
import { GlowingBadge } from '@/components/arise/GlowingBadge';
import { Building2, Users, GraduationCap, BookOpen, BarChart3, Activity, Shield, Server, Database, Cloud, RefreshCw, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/admin/dashboard', label: 'College Overview', icon: Building2 },
  { path: '/admin/departments', label: 'Departments', icon: BookOpen },
  { path: '/admin/faculty', label: 'All Faculty', icon: GraduationCap },
  { path: '/admin/students', label: 'All Students', icon: Users },
  { path: '/admin/analytics', label: 'Global Analytics', icon: BarChart3 },
  { path: '/admin/system', label: 'System', icon: Activity },
];

const SystemSettings = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastBackup, setLastBackup] = useState('2 hours ago');

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastBackup('Just now');
    }, 2000);
  };

  const systemStatus = [
    { name: 'AI Risk Prediction', status: 'Active', icon: Activity, color: 'green', detail: '94.2% accuracy' },
    { name: 'Blockchain Network', status: 'Connected', icon: Shield, color: 'green', detail: 'Hyperledger Fabric' },
    { name: 'AWS Infrastructure', status: 'Healthy', icon: Cloud, color: 'green', detail: 'All regions operational' },
    { name: 'ERP Integration', status: 'Synced', icon: RefreshCw, color: 'green', detail: 'Real-time sync' },
    { name: 'Data Pipeline', status: 'Running', icon: Database, color: 'green', detail: '800 students processed' },
    { name: 'API Gateway', status: 'Active', icon: Server, color: 'green', detail: '1.2s avg response' },
  ];

  return (
    <RoleLayout navItems={navItems} roleLabel="System Admin">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
            <p className="text-sm text-muted-foreground">Manage system configuration and monitor health</p>
          </div>
        </div>
      </motion.div>

      {/* System Health Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Shield} label="System Status" value="Healthy" accent="safe" delay={0} />
        <StatCard icon={Activity} label="Uptime" value="99.9%" accent="primary" delay={0.05} />
        <StatCard icon={Database} label="Last Backup" value={lastBackup} accent="accent" delay={0.1} />
        <StatCard icon={Cloud} label="Storage Used" value="68%" accent="monitor" delay={0.15} />
      </div>

      {/* System Status Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {systemStatus.map((service, idx) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
            className="glass-panel p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg bg-${service.color}-500/10 flex items-center justify-center`}>
                  <service.icon className={`h-5 w-5 text-${service.color}-400`} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{service.name}</h4>
                  <p className="text-xs text-muted-foreground">{service.detail}</p>
                </div>
              </div>
              <GlowingBadge level="safe">{service.status}</GlowingBadge>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Settings Sections */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Data Management */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-5 w-5 text-primary" />
            <h3 className="section-title">Data Management</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">ERP Data Sync</p>
                <p className="text-xs text-muted-foreground">Last synced: 5 minutes ago</p>
              </div>
              <button 
                onClick={handleSync}
                disabled={isSyncing}
                className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">Database Backup</p>
                <p className="text-xs text-muted-foreground">Next scheduled: Tonight 2:00 AM</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-secondary/30 transition-colors">
                Backup Now
              </button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">Export All Data</p>
                <p className="text-xs text-muted-foreground">Download full college dataset</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-secondary/30 transition-colors">
                Export CSV
              </button>
            </div>
          </div>
        </motion.div>

        {/* AI Configuration */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-accent" />
            <h3 className="section-title">AI Configuration</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">Risk Prediction Model</p>
                <p className="text-xs text-muted-foreground">Current: v2.4.1 (94.2% accuracy)</p>
              </div>
              <GlowingBadge level="safe">Active</GlowingBadge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">Dropout Prediction</p>
                <p className="text-xs text-muted-foreground">Enabled for all departments</p>
              </div>
              <GlowingBadge level="safe">Enabled</GlowingBadge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-Intervention</p>
                <p className="text-xs text-muted-foreground">Trigger alerts at risk score &gt; 65</p>
              </div>
              <GlowingBadge level="safe">Enabled</GlowingBadge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">Model Retraining</p>
                <p className="text-xs text-muted-foreground">Scheduled: Weekly (Sundays)</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-secondary/30 transition-colors">
                Retrain
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-red-400" />
            <h3 className="section-title">Security Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Required for all admin users</p>
              </div>
              <GlowingBadge level="safe">Enabled</GlowingBadge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">Session Timeout</p>
                <p className="text-xs text-muted-foreground">Auto-logout after 30 minutes</p>
              </div>
              <GlowingBadge level="safe">30 min</GlowingBadge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">Audit Logging</p>
                <p className="text-xs text-muted-foreground">Blockchain-verified logs</p>
              </div>
              <GlowingBadge level="safe">Active</GlowingBadge>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-orange-400" />
            <h3 className="section-title">Alert Configuration</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">High Risk Alerts</p>
                <p className="text-xs text-muted-foreground">Notify HODs and Faculty</p>
              </div>
              <GlowingBadge level="safe">Enabled</GlowingBadge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">Daily Reports</p>
                <p className="text-xs text-muted-foreground">Email summary at 8:00 AM</p>
              </div>
              <GlowingBadge level="safe">Enabled</GlowingBadge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">System Alerts</p>
                <p className="text-xs text-muted-foreground">Infrastructure notifications</p>
              </div>
              <GlowingBadge level="safe">Enabled</GlowingBadge>
            </div>
          </div>
        </motion.div>
      </div>
    </RoleLayout>
  );
};

export default SystemSettings;
