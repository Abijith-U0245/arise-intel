import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { classes, allStudents } from '@/data/mockData';
import { Users, GraduationCap, BookOpen, Activity, MessageSquare, Star, Send } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/faculty/dashboard', label: 'Dashboard', icon: Users },
  { path: '/faculty/class', label: 'My Class', icon: BookOpen },
  { path: '/faculty/performance', label: 'Performance', icon: GraduationCap },
  { path: '/faculty/attendance', label: 'Attendance', icon: Activity },
];

const FeedbackPage = () => {
  const assignedClass = classes[0];
  const classStudents = allStudents.filter(s => s.classId === assignedClass.id);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = () => {
    alert('Feedback submitted successfully!');
    setFeedbackText('');
    setSelectedStudent(null);
  };

  return (
    <RoleLayout navItems={navItems} roleLabel="Faculty">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Student Feedback</h1>
          <p className="text-sm text-muted-foreground">{assignedClass.name} - Provide feedback to students</p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Students List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 glass-panel p-4">
          <h3 className="section-title mb-4">Select Student</h3>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {classStudents.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student.id)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  selectedStudent === student.id
                    ? 'bg-primary/15 border border-primary/30'
                    : 'bg-secondary/30 hover:bg-secondary/50'
                }`}
              >
                <p className="text-sm font-medium text-foreground">{student.name}</p>
                <p className="text-xs text-muted-foreground">{student.id}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Feedback Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 glass-panel p-6">
          <h3 className="section-title mb-4">Provide Feedback</h3>
          
          {selectedStudent ? (
            <div>
              {(() => {
                const student = classStudents.find(s => s.id === selectedStudent);
                return student ? (
                  <div className="mb-4 p-4 rounded-lg bg-secondary/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">CGPA: <span className="text-foreground font-medium">{(student.gpa || 0).toFixed(2)}</span></p>
                        <p className="text-xs text-muted-foreground">Risk: <span className={`font-medium ${student.riskScore > 65 ? 'text-red-400' : 'text-green-400'}`}>{student.riskScore}</span></p>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">Quick Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <Star className="h-5 w-5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">Feedback Message</label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Enter your feedback for the student..."
                  rows={6}
                  className="w-full p-3 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  Submit Feedback
                </button>
                <button
                  onClick={() => { setFeedbackText(''); setSelectedStudent(null); }}
                  className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary/30 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Select a student from the list to provide feedback</p>
            </div>
          )}
        </motion.div>
      </div>
    </RoleLayout>
  );
};

export default FeedbackPage;
