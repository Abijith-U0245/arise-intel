import { motion } from 'framer-motion';
import type { Competition } from '@/types';
import { Trophy, Medal, Award, Clock, Users, ExternalLink } from 'lucide-react';

interface CompetitionActivityPanelProps {
  competitions: Competition[];
  title?: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  won: { label: 'Winner', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20', icon: Trophy },
  runner_up: { label: 'Runner Up', color: 'text-silver-400 bg-gray-400/10 border-gray-400/20', icon: Medal },
  participated: { label: 'Participated', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', icon: Award },
  not_participated: { label: 'Not Participated', color: 'text-muted-foreground bg-secondary/50 border-border', icon: Clock },
};

const typeIcons: Record<string, React.ElementType> = {
  hackathon: Trophy,
  coding: Award,
  symposium: Users,
  paper: ExternalLink,
  workshop: Clock,
  project: Trophy,
};

export function CompetitionActivityPanel({ competitions, title = 'Competitions & Activities' }: CompetitionActivityPanelProps) {
  const participatedCompetitions = competitions.filter(c => c.status !== 'not_participated');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.55 }}
      className="glass-panel p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title">{title}</h3>
        <div className="text-xs text-muted-foreground">
          {participatedCompetitions.length} / {competitions.length} participated
        </div>
      </div>
      
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {competitions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No competition records</p>
        ) : (
          competitions.slice(0, 5).map((comp) => {
            const config = statusConfig[comp.status] || statusConfig.not_participated;
            const StatusIcon = config.icon;
            const TypeIcon = typeIcons[comp.type] || Trophy;
            
            return (
              <div 
                key={comp.id}
                className="p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-transparent hover:border-border"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 ${config.color}`}>
                    <TypeIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{comp.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{comp.organizer}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(comp.date).toLocaleDateString()}
                      </span>
                      {comp.position && (
                        <span className="text-xs font-medium text-amber-400">
                          {comp.position}
                        </span>
                      )}
                      {comp.score && (
                        <span className="text-xs text-muted-foreground">
                          Score: {comp.score}
                        </span>
                      )}
                      {comp.teamSize > 1 && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Team of {comp.teamSize}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {competitions.length > 5 && (
        <button className="w-full mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors">
          View all {competitions.length} competitions →
        </button>
      )}
    </motion.div>
  );
}
