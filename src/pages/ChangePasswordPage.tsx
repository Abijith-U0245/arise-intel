import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { useAuth } from '@/contexts/AuthContext';
import { User, Building2, GraduationCap, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

// Nav items for each role
const getNavItems = (role: string) => {
  switch (role) {
    case 'admin':
      return [
        { path: '/admin/dashboard', label: 'College Overview', icon: Building2 },
        { path: '/admin/departments', label: 'Departments', icon: Building2 },
        { path: '/admin/faculty', label: 'All Faculty', icon: GraduationCap },
        { path: '/admin/students', label: 'All Students', icon: User },
        { path: '/admin/analytics', label: 'Global Analytics', icon: Building2 },
        { path: '/admin/system', label: 'System', icon: Building2 },
      ];
    case 'hod':
      return [
        { path: '/hod/dashboard', label: 'Department Overview', icon: Building2 },
        { path: '/hod/classes', label: 'Class Analytics', icon: Building2 },
        { path: '/hod/faculty', label: 'Faculty', icon: GraduationCap },
        { path: '/hod/risk', label: 'Risk Insights', icon: Building2 },
      ];
    case 'faculty':
      return [
        { path: '/faculty/dashboard', label: 'Dashboard', icon: User },
        { path: '/faculty/class', label: 'My Class', icon: Building2 },
        { path: '/faculty/performance', label: 'Performance', icon: GraduationCap },
        { path: '/faculty/attendance', label: 'Attendance', icon: Building2 },
      ];
    default:
      return [
        { path: '/student/dashboard', label: 'My Dashboard', icon: User },
        { path: '/student/academics', label: 'Academics', icon: Building2 },
        { path: '/student/attendance', label: 'Attendance', icon: Building2 },
        { path: '/student/activities', label: 'Activities', icon: Building2 },
        { path: '/student/ai-insights', label: 'AI Insights', icon: Building2 },
        { path: '/student/support', label: 'Support', icon: Building2 },
      ];
  }
};

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'admin': return 'System Admin';
    case 'hod': return 'Head of Department';
    case 'faculty': return 'Faculty';
    default: return 'Student';
  }
};

const ChangePasswordPage = () => {
  const { user } = useAuth();
  const navItems = getNavItems(user?.role || 'student');
  const roleLabel = getRoleLabel(user?.role || 'student');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus('error');
      return;
    }
    if (newPassword.length < 6) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setTimeout(() => {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setStatus('idle');
    }, 3000);
  };

  return (
    <RoleLayout navItems={navItems} roleLabel={roleLabel}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Change Password</h1>
          <p className="text-sm text-muted-foreground">Update your account password</p>
        </div>
      </motion.div>

      <div className="max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6">
          {status === 'success' && (
            <div className="mb-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <p className="text-sm text-green-400">Password changed successfully!</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="text-sm text-red-400">
                {newPassword !== confirmPassword ? 'Passwords do not match!' : 'Password must be at least 6 characters!'}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full pl-10 pr-10 py-3 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Change Password
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">Password Requirements</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className={`h-4 w-4 ${newPassword.length >= 6 ? 'text-green-400' : 'text-muted-foreground'}`} />
                At least 6 characters
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className={`h-4 w-4 ${/[A-Z]/.test(newPassword) ? 'text-green-400' : 'text-muted-foreground'}`} />
                At least one uppercase letter
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className={`h-4 w-4 ${/[0-9]/.test(newPassword) ? 'text-green-400' : 'text-muted-foreground'}`} />
                At least one number
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </RoleLayout>
  );
};

export default ChangePasswordPage;
