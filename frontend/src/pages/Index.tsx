import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BlockchainBadge } from "@/components/arise/BlockchainBadge";
import { Brain, TrendingDown, Shield, Zap, BarChart3, Users, ChevronRight, Activity, Cloud, Server } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Brain, title: "Multi-Factor AI Risk Fusion", desc: "Combines academic scores, attendance, engagement & NLP sentiment analysis" },
  { icon: TrendingDown, title: "4-Week Predictive Forecast", desc: "Identifies at-risk students before traditional methods catch warning signs" },
  { icon: Shield, title: "Blockchain-Backed Records", desc: "Hyperledger Fabric ensures tamper-proof, auditable academic records" },
  { icon: Zap, title: "48-Hour Auto Intervention", desc: "Automated triggers for faculty, advisors, and counseling workflows" },
];

const stats = [
  { value: "92%", label: "Model Accuracy" },
  { value: "37%", label: "Dropout Reduction" },
  { value: "4 Weeks", label: "Early Detection" },
  { value: "10K+", label: "Scalable Students" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* BG image */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Top badge */}
            <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 mb-8 text-sm">
              <Activity className="h-3.5 w-3.5 text-accent" />
              <span className="text-muted-foreground">Powered by</span>
              <span className="text-foreground font-medium">AWS + Hyperledger Fabric</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow" />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] mb-6">
              Predict Dropouts<br />
              <span className="text-gradient-primary">4 Weeks Before</span><br />
              They Happen.
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              AI-driven academic risk fusion with blockchain-backed transparency.
              Intervene early. Save futures. Scale to thousands.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button variant="hero" size="xl" asChild>
                <Link to="/login">
                  <BarChart3 className="h-5 w-5" />
                  Access Dashboard
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/features">
                  Explore Features
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <BlockchainBadge />
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((s, i) => (
              <div key={i} className="glass-panel p-5 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gradient-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Enterprise-Grade Academic Intelligence
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built for institutions that refuse to let students fall through the cracks.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:glow-primary transition-all duration-300">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture badge */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Cloud className="h-7 w-7 text-accent" />
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Server className="h-7 w-7 text-primary" />
              </div>
              <div className="p-3 rounded-xl bg-risk-monitor/10">
                <Users className="h-7 w-7 text-risk-monitor" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-foreground text-lg">Scales to 10,000+ Students</p>
              <p className="text-sm text-muted-foreground">
                AWS SageMaker · Lambda · DynamoDB · Hyperledger Fabric · Real-time analytics pipeline
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow" />
                Production Ready
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
