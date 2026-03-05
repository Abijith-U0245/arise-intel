import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth, getRolePath } from '@/contexts/AuthContext';
import { Brain, LogIn, AlertCircle } from 'lucide-react';
import { mockUsers } from '@/data/mockData';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

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

  const demoAccounts = [
    { label: 'Admin', email: 'admin@arise.edu', pw: 'admin123' },
    { label: 'HOD', email: 'hod@arise.edu', pw: 'hod123' },
    { label: 'Faculty', email: 'faculty1@arise.edu', pw: 'faculty123' },
    { label: 'Student', email: 'student@arise.edu', pw: 'student123' },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
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
        </div>

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
        </div>

        {/* Demo accounts */}
        <div className="mt-6 glass-panel p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Demo Accounts</p>
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map(acc => (
              <button
                key={acc.label}
                onClick={() => { setEmail(acc.email); setPassword(acc.pw); }}
                className="text-left p-2.5 rounded-lg bg-secondary/60 hover:bg-secondary transition-colors"
              >
                <p className="text-sm font-medium text-foreground">{acc.label}</p>
                <p className="text-xs text-muted-foreground truncate">{acc.email}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
