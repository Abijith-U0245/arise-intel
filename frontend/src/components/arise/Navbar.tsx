import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Brain, Shield, Activity, LogIn, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/features", label: "Features" },
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel-strong border-t-0 rounded-t-none border-x-0">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative p-1.5 rounded-lg bg-primary/15">
            <Brain className="h-5 w-5 text-primary" />
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent animate-glow" />
          </div>
          <span className="font-bold text-foreground tracking-tight text-lg">A.R.I.S.E.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-link px-4 py-2 rounded-lg",
                location.pathname === item.path && "text-foreground bg-secondary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Status indicators */}
          <div className="hidden sm:flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-accent font-mono">
              <Activity className="h-3 w-3" />
              <span>Live</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>AWS + Hyperledger</span>
            </div>
          </div>
          
          {/* Login/User Button */}
          {isAuthenticated && user ? (
            <button
              onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : user.role === 'hod' ? '/hod/dashboard' : user.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/15 text-primary hover:bg-primary/25 transition-colors"
            >
              <User className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span className="text-sm font-medium">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
