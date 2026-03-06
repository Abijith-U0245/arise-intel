import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth, getRolePath } from '@/contexts/AuthContext';
import { Brain, LogIn, AlertCircle, Shield, Users, GraduationCap, Building2 } from 'lucide-react';
import { mockUsers } from '@/data/mockData';

const roleIcons = {
  admin: Shield,
  hod: Building2,
  faculty: Users,
  student: GraduationCap,
};

const roleColors = {
  admin: 'text-purple-400 bg-purple-400/10',
  hod: 'text-blue-400 bg-blue-400/10',
  faculty: 'text-green-400 bg-green-400/10',
  student: 'text-amber-400 bg-amber-400/10',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Group demo accounts by role
  const demoAccounts = {
    admin: mockUsers.filter(u => u.role === 'admin'),
    hod: mockUsers.filter(u => u.role === 'hod'),
    faculty: mockUsers.filter(u => u.role === 'faculty').slice(0, 4), // First 4 faculty
    student: mockUsers.filter(u => u.role === 'student'),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.success) {
      const user = mockUsers.find(u => u.email === email);
      if (user) navigate(getRolePath(user.role));
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    const result = login(demoEmail, demoPassword);
    if (result.success) {
      const user = mockUsers.find(u => u.email === demoEmail);
      if (user) navigate(getRolePath(user.role));
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative p-2 rounded-xl bg-primary/15">
              <Brain className="h-8 w-8 text-primary" />
              <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent animate-glow" />
            </div>
            <span className="font-bold text-2xl text-foreground tracking-tight">A.R.I.S.E.</span>
          </div>
          <p className="text-muted-foreground text-sm">Academic Risk Intelligence & Success Engine</p>
          <p className="text-muted-foreground text-xs mt-1">Demo Password for all accounts: <span className="font-mono text-accent">demo123</span></p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Login form */}
          <div className="glass-panel p-8">
            <h2 className="text-lg font-semibold text-foreground mb-6">Sign In</h2>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-risk-high/10 text-risk-high text-sm mb-4">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Quick Login</p>
              <p className="text-xs text-muted-foreground mb-3">Click any account below to auto-fill and login:</p>
            </div>
          </div>

          {/* Demo accounts */}
          <div className="space-y-4">
            {Object.entries(demoAccounts).map(([role, accounts]) => {
              const Icon = roleIcons[role as keyof typeof roleIcons];
              const colorClass = roleColors[role as keyof typeof roleColors];
              
              return (
                <motion.div 
                  key={role}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Object.keys(demoAccounts).indexOf(role) * 0.1 }}
                  className="glass-panel p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-1.5 rounded-lg ${colorClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground capitalize">{role} Accounts</span>
                  </div>
                  <div className="grid gap-2">
                    {accounts.slice(0, 2).map((acc) => (
                      <button
                        key={acc.email}
                        onClick={() => handleDemoLogin(acc.email, 'demo123')}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/60 hover:bg-secondary transition-colors text-left"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{acc.name}</p>
                          <p className="text-xs text-muted-foreground">{acc.email}</p>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">demo123</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
