import { motion } from 'framer-motion';
import { Navbar } from '@/components/arise/Navbar';
import { Brain, Shield, TrendingUp, Users, Bell, Lock, Database, LineChart, GraduationCap, Activity } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Risk Prediction',
    description: 'Advanced machine learning algorithms analyze student data to predict dropout risks, academic struggles, and performance trends with 95%+ accuracy.',
    color: 'from-purple-500/20 to-blue-500/20',
  },
  {
    icon: Shield,
    title: 'Blockchain Verification',
    description: 'Immutable blockchain records ensure academic credentials, certificates, and achievements are tamper-proof and verifiable globally.',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Real-time Analytics',
    description: 'Live dashboards and reports provide instant insights into department, class, and individual student performance metrics.',
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    icon: Users,
    title: 'Multi-Role Access',
    description: 'Tailored dashboards for System Admin, HOD, Faculty, and Students with role-specific features and permissions.',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Automated notifications for at-risk students, attendance issues, and important academic deadlines.',
    color: 'from-yellow-500/20 to-amber-500/20',
  },
  {
    icon: Lock,
    title: 'Privacy & Security',
    description: 'Enterprise-grade security with encrypted data storage, secure authentication, and role-based access control.',
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    icon: Database,
    title: 'Comprehensive Records',
    description: 'Centralized academic records including attendance, IA scores, competitions, and extracurricular activities.',
    color: 'from-indigo-500/20 to-violet-500/20',
  },
  {
    icon: LineChart,
    title: 'Predictive Insights',
    description: '4-week, 8-week, and 12-week dropout risk predictions with personalized intervention recommendations.',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: GraduationCap,
    title: 'Academic Management',
    description: 'Complete academic lifecycle management from admission to graduation with progress tracking.',
    color: 'from-cyan-500/20 to-sky-500/20',
  },
  {
    icon: Activity,
    title: 'Wellness Monitoring',
    description: 'NLP-based sentiment analysis to monitor student wellbeing and detect early signs of stress or disengagement.',
    color: 'from-red-500/20 to-pink-500/20',
  },
];

const Features = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Platform <span className="text-primary">Features</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the powerful capabilities that make A.R.I.S.E. the leading academic intelligence platform for educational institutions.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group"
              >
                <div className="h-full p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-7 w-7 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="container mx-auto px-4 mt-16"
        >
          <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to transform your institution?</h2>
            <p className="text-muted-foreground mb-6">Join hundreds of educational institutions using A.R.I.S.E.</p>
            <a
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Features;
