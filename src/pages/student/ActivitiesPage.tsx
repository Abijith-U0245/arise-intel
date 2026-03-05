import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { ActivityTimeline } from '@/components/arise/ActivityTimeline';
import { CompetitionActivityPanel } from '@/components/arise/CompetitionActivityPanel';
import { allStudents } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, Activity, BarChart3, Trophy, Code, Lightbulb, Calendar, Award } from 'lucide-react';

const navItems = [
  { path: '/student/dashboard', label: 'My Dashboard', icon: Users },
  { path: '/student/academics', label: 'Academics', icon: BookOpen },
  { path: '/student/attendance', label: 'Attendance', icon: Activity },
  { path: '/student/activities', label: 'Activities', icon: BarChart3 },
  { path: '/student/ai-insights', label: 'AI Insights', icon: Activity },
  { path: '/student/support', label: 'Support', icon: Users },
];

const ActivitiesPage = () => {
  const { user } = useAuth();
  const student = allStudents.find(s => s.id === user?.id) || allStudents[0];

  const competitions = [
    { id: '1', type: 'hackathon', name: 'Smart India Hackathon 2025', status: 'registered', date: '2025-03-15', organizer: 'SIH', teamSize: 4, description: 'National level hackathon', certificateStatus: 'pending' },
    { id: '2', type: 'coding', name: 'CodeChef Starters', status: 'participated', date: '2025-02-20', organizer: 'CodeChef', score: 85, teamSize: 1, description: 'Coding contest', certificateStatus: 'issued' },
    { id: '3', type: 'workshop', name: 'AI/ML Workshop', status: 'participated', date: '2025-02-10', organizer: 'College', teamSize: 1, description: 'AI Workshop', certificateStatus: 'issued' },
    { id: '4', type: 'symposium', name: 'Tech Symposium 2025', status: 'registered', date: '2025-04-05', organizer: 'IEEE', teamSize: 1, description: 'Tech Symposium', certificateStatus: 'pending' },
  ];

  const achievements = [
    { title: 'Hackathon Winner', description: 'Won 1st place in Internal Hackathon', date: '2024-11-15', icon: Trophy },
    { title: '100 Day Streak', description: '100 days of consistent coding', date: '2025-01-20', icon: Code },
    { title: 'Innovation Award', description: 'Best project idea award', date: '2024-12-10', icon: Lightbulb },
  ];

  return (
    <RoleLayout navItems={navItems} roleLabel="Student">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Activities & Competitions</h1>
          <p className="text-sm text-muted-foreground">Track your extracurricular activities and achievements</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-panel p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Competitions</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Award className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">5</p>
            <p className="text-xs text-muted-foreground">Achievements</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Code className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">8</p>
            <p className="text-xs text-muted-foreground">Coding Events</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Competitions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 glass-panel p-6">
          <h3 className="section-title mb-4">Competitions & Events</h3>
          <CompetitionActivityPanel competitions={competitions} />
        </motion.div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-6">
          <h3 className="section-title mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <achievement.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity Timeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 mt-4">
        <h3 className="section-title mb-4">Recent Activity</h3>
        <ActivityTimeline activities={[
          { type: 'assignment', title: 'Submitted Database Assignment', date: '2025-03-04 14:30', icon: 'file' },
          { type: 'quiz', title: 'Completed IA-3 Quiz', date: '2025-03-03 10:15', icon: 'check' },
          { type: 'login', title: 'Logged in to portal', date: '2025-03-03 08:45', icon: 'user' },
          { type: 'attendance', title: 'Attendance marked present', date: '2025-03-02 09:00', icon: 'calendar' },
        ]} />
      </motion.div>
    </RoleLayout>
  );
};

export default ActivitiesPage;
