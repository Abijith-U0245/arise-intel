import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Brain, Shield, Activity } from "lucide-react";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/student", label: "Student Intel" },
  { path: "/interventions", label: "Interventions" },
  { path: "/models", label: "AI Models" },
];

export const Navbar = () => {
  const location = useLocation();

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

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-accent font-mono">
            <Activity className="h-3 w-3" />
            <span>Live</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            <span>AWS + Hyperledger</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
