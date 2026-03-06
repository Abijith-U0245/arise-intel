import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/components/arise/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider, useAuth, getRolePath } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import About from "./pages/About";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import DepartmentsPage from "./pages/admin/DepartmentsPage";
import FacultyManagement from "./pages/admin/FacultyManagement";
import StudentManagement from "./pages/admin/StudentManagement";
import GlobalAnalytics from "./pages/admin/GlobalAnalytics";
import SystemSettings from "./pages/admin/SystemSettings";
import AddStudent from "./pages/admin/AddStudent";
import AddDepartment from "./pages/admin/AddDepartment";
import AddHOD from "./pages/admin/AddHOD";

// HOD pages
import HodDashboard from "./pages/hod/HodDashboard";
import ClassAnalytics from "./pages/hod/ClassAnalytics";
import FacultyOverview from "./pages/hod/FacultyOverview";
import RiskInsights from "./pages/hod/RiskInsights";

// Faculty pages
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import MyClassPage from "./pages/faculty/MyClassPage";
import PerformancePage from "./pages/faculty/PerformancePage";
import AttendancePage from "./pages/faculty/AttendancePage";
import FeedbackPage from "./pages/faculty/FeedbackPage";
import FacultyStudentProfile from "./pages/faculty/StudentProfile";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import AcademicsPage from "./pages/student/AcademicsPage";
import AttendancePageStudent from "./pages/student/AttendancePage";
import ActivitiesPage from "./pages/student/ActivitiesPage";
import AIInsightsPage from "./pages/student/AIInsightsPage";
import SupportPage from "./pages/student/SupportPage";

// Shared pages
import ProfilePage from "./pages/ProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

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
    {/* Public routes */}
    <Route path="/" element={<><Navbar /><Index /></>} />
    <Route path="/login" element={<AuthRedirect />} />
    <Route path="/features" element={<><Navbar /><Features /></>} />
    <Route path="/about" element={<><Navbar /><About /></>} />

    {/* Admin routes */}
    <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/departments" element={<ProtectedRoute allowedRoles={['admin']}><DepartmentsPage /></ProtectedRoute>} />
    <Route path="/admin/faculty" element={<ProtectedRoute allowedRoles={['admin']}><FacultyManagement /></ProtectedRoute>} />
    <Route path="/admin/students" element={<ProtectedRoute allowedRoles={['admin']}><StudentManagement /></ProtectedRoute>} />
    <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><GlobalAnalytics /></ProtectedRoute>} />
    <Route path="/admin/system" element={<ProtectedRoute allowedRoles={['admin']}><SystemSettings /></ProtectedRoute>} />
    <Route path="/admin/add-student" element={<ProtectedRoute allowedRoles={['admin']}><AddStudent /></ProtectedRoute>} />
    <Route path="/admin/add-department" element={<ProtectedRoute allowedRoles={['admin']}><AddDepartment /></ProtectedRoute>} />
    <Route path="/admin/add-hod" element={<ProtectedRoute allowedRoles={['admin']}><AddHOD /></ProtectedRoute>} />
    <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin']}><ProfilePage /></ProtectedRoute>} />
    <Route path="/admin/change-password" element={<ProtectedRoute allowedRoles={['admin']}><ChangePasswordPage /></ProtectedRoute>} />

    {/* HOD routes */}
    <Route path="/hod/dashboard" element={<ProtectedRoute allowedRoles={['hod']}><HodDashboard /></ProtectedRoute>} />
    <Route path="/hod/classes" element={<ProtectedRoute allowedRoles={['hod']}><ClassAnalytics /></ProtectedRoute>} />
    <Route path="/hod/faculty" element={<ProtectedRoute allowedRoles={['hod']}><FacultyOverview /></ProtectedRoute>} />
    <Route path="/hod/risk" element={<ProtectedRoute allowedRoles={['hod']}><RiskInsights /></ProtectedRoute>} />
    <Route path="/hod/profile" element={<ProtectedRoute allowedRoles={['hod']}><ProfilePage /></ProtectedRoute>} />
    <Route path="/hod/change-password" element={<ProtectedRoute allowedRoles={['hod']}><ChangePasswordPage /></ProtectedRoute>} />

    {/* Faculty routes */}
    <Route path="/faculty/dashboard" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyDashboard /></ProtectedRoute>} />
    <Route path="/faculty/student/:studentId" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyStudentProfile /></ProtectedRoute>} />
    <Route path="/faculty/class" element={<ProtectedRoute allowedRoles={['faculty']}><MyClassPage /></ProtectedRoute>} />
    <Route path="/faculty/performance" element={<ProtectedRoute allowedRoles={['faculty']}><PerformancePage /></ProtectedRoute>} />
    <Route path="/faculty/attendance" element={<ProtectedRoute allowedRoles={['faculty']}><AttendancePage /></ProtectedRoute>} />
    <Route path="/faculty/feedback" element={<ProtectedRoute allowedRoles={['faculty']}><FeedbackPage /></ProtectedRoute>} />
    <Route path="/faculty/profile" element={<ProtectedRoute allowedRoles={['faculty']}><ProfilePage /></ProtectedRoute>} />
    <Route path="/faculty/change-password" element={<ProtectedRoute allowedRoles={['faculty']}><ChangePasswordPage /></ProtectedRoute>} />

    {/* Student routes */}
    <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
    <Route path="/student/academics" element={<ProtectedRoute allowedRoles={['student']}><AcademicsPage /></ProtectedRoute>} />
    <Route path="/student/attendance" element={<ProtectedRoute allowedRoles={['student']}><AttendancePageStudent /></ProtectedRoute>} />
    <Route path="/student/activities" element={<ProtectedRoute allowedRoles={['student']}><ActivitiesPage /></ProtectedRoute>} />
    <Route path="/student/ai-insights" element={<ProtectedRoute allowedRoles={['student']}><AIInsightsPage /></ProtectedRoute>} />
    <Route path="/student/support" element={<ProtectedRoute allowedRoles={['student']}><SupportPage /></ProtectedRoute>} />
    <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><ProfilePage /></ProtectedRoute>} />
    <Route path="/student/change-password" element={<ProtectedRoute allowedRoles={['student']}><ChangePasswordPage /></ProtectedRoute>} />

    {/* Role base route fallbacks */}
    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="/hod" element={<Navigate to="/hod/dashboard" replace />} />
    <Route path="/faculty" element={<Navigate to="/faculty/dashboard" replace />} />
    <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />

    {/* Catch all */}
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
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
