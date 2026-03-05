import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/components/arise/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider, useAuth, getRolePath } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import HodDashboard from "./pages/hod/HodDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import StudentIntel from "./pages/StudentIntel";
import Interventions from "./pages/Interventions";
import AIModels from "./pages/AIModels";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user || !allowedRoles.includes(user.role)) return <Navigate to={getRolePath(user?.role || 'student')} replace />;
  return <>{children}</>;
}

function AuthRedirect() {
  const { user, isAuthenticated } = useAuth();
  if (isAuthenticated && user) return <Navigate to={getRolePath(user.role)} replace />;
  return <Login />;
}

const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<><Navbar /><Index /></>} />
    <Route path="/login" element={<AuthRedirect />} />

    {/* Legacy public pages with navbar */}
    <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
    <Route path="/student" element={<><Navbar /><StudentIntel /></>} />
    <Route path="/interventions" element={<><Navbar /><Interventions /></>} />
    <Route path="/models" element={<><Navbar /><AIModels /></>} />

    {/* Role-based dashboards */}
    <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
    <Route path="/student/*" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />

    <Route path="/faculty/dashboard" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyDashboard /></ProtectedRoute>} />
    <Route path="/faculty/*" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyDashboard /></ProtectedRoute>} />

    <Route path="/hod/dashboard" element={<ProtectedRoute allowedRoles={['hod']}><HodDashboard /></ProtectedRoute>} />
    <Route path="/hod/*" element={<ProtectedRoute allowedRoles={['hod']}><HodDashboard /></ProtectedRoute>} />

    <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
