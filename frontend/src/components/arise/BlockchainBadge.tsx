import { Shield, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

export const BlockchainBadge = ({ compact = false }: { compact?: boolean }) => {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs text-accent font-mono">
        <Shield className="h-3 w-3" />
        <span>Blockchain Verified</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-panel p-4 flex items-center gap-3"
    >
      <div className="p-2 rounded-xl bg-accent/10 animate-glow">
        <Shield className="h-5 w-5 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">Hyperledger Fabric Verified</p>
        <p className="text-xs text-muted-foreground font-mono truncate">
          0x7f3a...e8b2 · Tamper-proof
        </p>
      </div>
      <LinkIcon className="h-4 w-4 text-muted-foreground" />
    </motion.div>
  );
};
