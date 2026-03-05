import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Building2, GraduationCap, Calendar, Phone, MapPin, Edit3, Camera } from 'lucide-react';
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

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const navItems = getNavItems(user?.role || 'student');
  const roleLabel = getRoleLabel(user?.role || 'student');

  return (
    <RoleLayout navItems={navItems} roleLabel={roleLabel}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
            <p className="text-sm text-muted-foreground">View and manage your profile information</p>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Edit3 className="h-4 w-4" />
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 glass-panel p-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="h-28 w-28 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-14 w-14 text-primary" />
              </div>
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h3 className="text-lg font-semibold text-foreground">{user?.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
            <div className="mt-4 w-full pt-4 border-t border-border space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{user?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{user?.department?.toUpperCase() || 'CSE'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Details Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 glass-panel p-6">
          <h3 className="section-title mb-4">Profile Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                disabled={!isEditing}
                className="w-full p-3 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                disabled={true}
                className="w-full p-3 rounded-lg bg-secondary border-0 text-sm disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Role</label>
              <input
                type="text"
                defaultValue={user?.role}
                disabled={true}
                className="w-full p-3 rounded-lg bg-secondary border-0 text-sm capitalize disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Department</label>
              <input
                type="text"
                defaultValue={user?.department?.toUpperCase() || 'CSE'}
                disabled={!isEditing}
                className="w-full p-3 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                disabled={!isEditing}
                className="w-full p-3 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Joined Date</label>
              <input
                type="text"
                defaultValue="2023-08-01"
                disabled={true}
                className="w-full p-3 rounded-lg bg-secondary border-0 text-sm disabled:opacity-50"
              />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">Address Information</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                <textarea
                  placeholder="Enter your address..."
                  rows={3}
                  disabled={!isEditing}
                  className="w-full p-3 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary disabled:opacity-50 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">City</label>
                <input
                  type="text"
                  placeholder="City"
                  disabled={!isEditing}
                  className="w-full p-3 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">State</label>
                <input
                  type="text"
                  placeholder="State"
                  disabled={!isEditing}
                  className="w-full p-3 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Activity History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 mt-4">
        <h3 className="section-title mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Profile updated', date: '2025-03-01 14:30', icon: Edit3 },
            { action: 'Password changed', date: '2025-02-15 09:15', icon: User },
            { action: 'Logged in from new device', date: '2025-02-10 08:45', icon: User },
            { action: 'Updated contact information', date: '2025-01-20 16:20', icon: Edit3 },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <activity.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </RoleLayout>
  );
};

export default ProfilePage;
