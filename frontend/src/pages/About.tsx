import { motion } from 'framer-motion';
import { Navbar } from '@/components/arise/Navbar';
import { Target, Heart, Users, Sparkles, Building2, GraduationCap, Award, Globe } from 'lucide-react';

const stats = [
  { label: 'Students Tracked', value: '10,000+', icon: GraduationCap },
  { label: 'Faculty Members', value: '500+', icon: Users },
  { label: 'Departments', value: '25+', icon: Building2 },
  { label: 'Success Rate', value: '95%', icon: Award },
];

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower educational institutions with AI-driven insights that help every student reach their full potential through early intervention and personalized support.',
  },
  {
    icon: Heart,
    title: 'Student First',
    description: 'We believe every student deserves individual attention. Our platform ensures no student falls through the cracks by identifying at-risk individuals early.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'Leveraging cutting-edge AI, blockchain, and data analytics to revolutionize how academic institutions monitor and support student success.',
  },
  {
    icon: Globe,
    title: 'Accessibility',
    description: 'Making advanced academic analytics accessible to institutions of all sizes, ensuring quality education support is never limited by resources.',
  },
];

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="text-primary">A.R.I.S.E.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Academic Risk Intelligence & Student Excellence - Transforming education through intelligent analytics
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="container mx-auto px-4 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="p-6 rounded-xl bg-card/50 border border-border/50 text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What is ARISE */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">What is A.R.I.S.E.?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A.R.I.S.E. (Academic Risk Intelligence & Student Excellence) is a comprehensive academic analytics platform designed to help educational institutions monitor, predict, and improve student outcomes. By combining artificial intelligence, blockchain technology, and real-time data analytics, we provide actionable insights that enable early intervention and personalized support.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform serves as a bridge between data and action, transforming raw academic records into meaningful intelligence that helps faculty, administrators, and students make informed decisions. From predicting dropout risks to verifying academic credentials on the blockchain, A.R.I.S.E. is the future of educational technology.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Values */}
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="p-6 rounded-xl bg-card/50 border border-border/50"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team/Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="container mx-auto px-4 mt-16"
        >
          <div className="text-center p-8 rounded-2xl bg-secondary/30 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions about A.R.I.S.E.? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@arise.edu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border font-medium hover:bg-secondary/50 transition-colors"
              >
                Explore Features
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default About;
