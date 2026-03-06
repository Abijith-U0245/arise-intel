import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { departments } from '@/data/mockData';
import { Building2, ArrowLeft, Save, CheckCircle } from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard', label: 'College Overview', icon: Building2 },
];

const AddDepartmentPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    totalClasses: 4,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add department to mock data
      const newDept = {
        id: formData.code.toLowerCase(),
        name: formData.name,
        code: formData.code,
        totalStudents: 0,
        totalFaculty: 0,
        hod: 'TBD',
        hodId: '',
        classes: Array.from({ length: formData.totalClasses }, (_, i) => `${formData.code}-${String.fromCharCode(65 + i)}`),
        avgRisk: 45,
        avgAttendance: 82,
        avgPerformance: 75,
      };
      
      departments.push(newDept as any);
      
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <RoleLayout navItems={navItems} roleLabel="Admin">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mb-6"
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Add New Department</h1>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }}
        className="max-w-2xl"
      >
        <div className="glass-panel p-6">
          {showSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Department Added Successfully!</h3>
              <p className="text-muted-foreground">Redirecting to dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Department Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., Computer Science and Engineering"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Department Code *
                </label>
                <input
                  type="text"
                  name="code"
                  required
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., CSE"
                />
                <p className="text-xs text-muted-foreground mt-1">Short code used for class naming (e.g., CSE-A, CSE-B)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Total Classes *
                </label>
                <select
                  name="totalClasses"
                  required
                  value={formData.totalClasses}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value={2}>2 Classes</option>
                  <option value={3}>3 Classes</option>
                  <option value={4}>4 Classes</option>
                  <option value={5}>5 Classes</option>
                  <option value={6}>6 Classes</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:bg-secondary/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Add Department
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </RoleLayout>
  );
};

export default AddDepartmentPage;
