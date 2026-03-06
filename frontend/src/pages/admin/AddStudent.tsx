import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { departments, classes, allStudents } from '@/data/mockData';
import { Users, ArrowLeft, Save, CheckCircle } from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard', label: 'College Overview', icon: Users },
];

const AddStudentPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    erpId: '',
    department: '',
    classId: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add student to mock data
      const newStudent = {
        id: `student_${Date.now()}`,
        erpId: formData.erpId,
        name: formData.name,
        email: formData.email,
        department: formData.department,
        classId: formData.classId,
        riskScore: Math.floor(Math.random() * 40) + 20,
        riskLevel: 'safe' as const,
        attendance_legacy: 85,
        gpa: 7.5,
        profile: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: '',
          address: '',
          bloodGroup: '',
          parentName: '',
          parentPhone: '',
          emergencyContact: '',
        },
        academics: {
          cgpa: 7.5,
          overallGrade: 'B',
          semesters: [],
          subjects: [],
          iaScores: [],
        },
        attendance: {
          overall: 85,
          monthly: [],
          subjects: [],
        },
        competitions: [],
        riskAnalytics: {
          currentScore: 30,
          previousScore: 30,
          trend: 'stable' as const,
          factors: {
            academic: 30,
            attendance: 30,
            engagement: 30,
            sentiment: 30,
          },
          history: [],
          predictions: {
            week4: 30,
            week8: 30,
            week12: 30,
          },
        },
        activityLog: [],
        notifications: [],
        assignmentScore: 75,
        sentiment: 'neutral' as const,
        sentimentKeywords: [],
        facultyFeedback: [],
        examScores: [],
        skills: [],
        behavior: {
          participation: 70,
          discipline: 80,
          teamwork: 75,
          leadership: 60,
        },
        interventions: [],
        weeklyAttendance: [],
        weeklyPerformance: [],
      };
      
      allStudents.push(newStudent as any);
      
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
          <h1 className="text-2xl font-bold text-foreground">Add New Student</h1>
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
              <h3 className="text-xl font-semibold text-foreground mb-2">Student Added Successfully!</h3>
              <p className="text-muted-foreground">Redirecting to dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Student Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter student full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  ERP ID *
                </label>
                <input
                  type="text"
                  name="erpId"
                  required
                  value={formData.erpId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., 2022CSE001"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Department *
                  </label>
                  <select
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Class *
                  </label>
                  <select
                    name="classId"
                    required
                    value={formData.classId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="student@college.edu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="+91 98765 43210"
                />
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
                      Add Student
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

export default AddStudentPage;
