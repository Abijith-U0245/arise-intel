import { motion } from 'framer-motion';
import { RoleLayout } from '@/components/arise/RoleLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, Activity, BarChart3, MessageCircle, Mail, Phone, HelpCircle, FileText, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/student/dashboard', label: 'My Dashboard', icon: Users },
  { path: '/student/academics', label: 'Academics', icon: BookOpen },
  { path: '/student/attendance', label: 'Attendance', icon: Activity },
  { path: '/student/activities', label: 'Activities', icon: BarChart3 },
  { path: '/student/ai-insights', label: 'AI Insights', icon: Activity },
  { path: '/student/support', label: 'Support', icon: Users },
];

const SupportPage = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (message.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setMessage('');
      }, 3000);
    }
  };

  const quickLinks = [
    { title: 'Academic Calendar', icon: FileText, href: '#' },
    { title: 'Exam Schedule', icon: FileText, href: '#' },
    { title: 'Fee Payment', icon: ExternalLink, href: '#' },
    { title: 'Library Portal', icon: ExternalLink, href: '#' },
  ];

  const faqs = [
    { q: 'How can I improve my attendance?', a: 'Regularly attend all classes and inform your faculty in advance if you need to be absent.' },
    { q: 'What is the minimum CGPA required?', a: 'You need to maintain a minimum CGPA of 6.0 to stay in good academic standing.' },
    { q: 'How do I register for courses?', a: 'Course registration is done through the ERP portal before each semester.' },
    { q: 'Who should I contact for technical issues?', a: 'Contact the IT support desk at support@college.edu or call ext. 1234.' },
  ];

  return (
    <RoleLayout navItems={navItems} roleLabel="Student">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Support & Help</h1>
          <p className="text-sm text-muted-foreground">Get help and contact support</p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h3 className="section-title">Contact Support</h3>
          </div>

          {submitted ? (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm text-green-400">Your message has been sent! We will get back to you soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Your Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or question..."
                  rows={6}
                  className="w-full p-3 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
                <button
                  onClick={() => setMessage('')}
                  className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary/30 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="mt-6 pt-6 border-t border-border grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Email Support</p>
                <p className="text-xs text-muted-foreground">support@arise.edu</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Phone Support</p>
                <p className="text-xs text-muted-foreground">+91 12345 67890</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <ExternalLink className="h-5 w-5 text-accent" />
            <h3 className="section-title">Quick Links</h3>
          </div>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <link.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{link.title}</span>
                </div>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* FAQs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 mt-4">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-orange-400" />
          <h3 className="section-title">Frequently Asked Questions</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-secondary/30">
              <p className="text-sm font-medium text-foreground mb-2">Q: {faq.q}</p>
              <p className="text-xs text-muted-foreground">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </RoleLayout>
  );
};

export default SupportPage;
