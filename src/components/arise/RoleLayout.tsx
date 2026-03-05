import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Brain, LogOut, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

interface RoleLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  roleLabel: string;
}

export function RoleLayout({ children, navItems, roleLabel }: RoleLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full z-50 flex flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}>
        {/* Brand */}
        <div className="h-16 flex items-center gap-2.5 px-4 border-b border-border shrink-0">
          <div className="relative p-1.5 rounded-lg bg-primary/15 shrink-0">
            <Brain className="h-5 w-5 text-primary" />
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent animate-glow" />
          </div>
          {!collapsed && <span className="font-bold text-foreground tracking-tight text-lg">A.R.I.S.E.</span>}
        </div>

        {/* Role badge */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Role</p>
            <p className="text-sm font-semibold text-primary">{roleLabel}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                  active
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-border p-3 space-y-2">
          {!collapsed && user && (
            <div className="px-2">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-risk-high hover:bg-risk-high/10 transition-colors w-full"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        collapsed ? "ml-16" : "ml-60"
      )}>
        {/* Top bar */}
        <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center gap-2 text-xs text-accent font-mono">
            <Activity className="h-3 w-3" />
            <span>Live</span>
          </div>
          <p className="text-xs text-muted-foreground">AWS + Hyperledger Fabric</p>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
