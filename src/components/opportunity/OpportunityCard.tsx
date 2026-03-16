import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, TrendingUp, ArrowRight, Zap } from "lucide-react";
import type { Opportunity } from "@/data/opportunities";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface OpportunityCardProps {
  opportunity: Opportunity;
  index?: number;
  showSaveButton?: boolean;
}

const COMPETITION_COLORS: Record<string, string> = {
  Low: "text-primary border-primary/40 bg-primary/10",
  Medium: "text-trust-gold border-trust-gold/40 bg-trust-gold/10",
  High: "text-alert-red border-alert-red/40 bg-alert-red/10",
};

const CATEGORY_COLORS: Record<string, string> = {
  "AI Services": "text-primary",
  "Freelance Services": "text-trust-gold",
  "Automation Services": "text-blue-400",
  "Digital Arbitrage": "text-purple-400",
  "Micro SaaS Ideas": "text-pink-400",
};

export default function OpportunityCard({ opportunity: opp, index = 0, showSaveButton = true }: OpportunityCardProps) {
  const navigate = useNavigate();
  const { user, toggleSaveOpportunity } = useAuth();

  const isSaved = user?.savedOpportunities.includes(opp.id);
  const isPurchased = user?.purchasedOpportunities.includes(opp.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={cn(
        "rounded-lg border bg-card overflow-hidden hover:border-primary/40 transition-all group",
        opp.demandScore >= 85 ? "border-primary/30 glow-green-subtle" : "border-border"
      )}
    >
      {/* Header */}
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn("text-xs font-mono font-bold", CATEGORY_COLORS[opp.category] || "text-primary")}>
                {opp.category}
              </span>
              {opp.isNew && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-primary/20 text-primary border border-primary/30 uppercase">
                  NEW
                </span>
              )}
            </div>
            <h3 className="font-bold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
              {opp.title}
            </h3>
          </div>
          {showSaveButton && user && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleSaveOpportunity(opp.id); }}
              className={cn(
                "p-1.5 rounded transition-colors",
                isSaved ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
            >
              <Bookmark className={cn("w-4 h-4", isSaved ? "fill-current" : "")} />
            </button>
          )}
        </div>

        {/* Demand Score */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${opp.demandScore}%` }}
            />
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-primary" />
            <span className="text-sm font-mono font-bold text-primary">{opp.demandScore}/100</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-secondary/40 text-center">
            <p className="text-[10px] text-muted-foreground mb-0.5">Income Potential</p>
            <p className="text-xs font-mono font-bold text-foreground">
              ${opp.incomeMin.toLocaleString()}–${opp.incomeMax.toLocaleString()}<span className="text-muted-foreground font-normal">/mo</span>
            </p>
          </div>
          <div className="p-2 rounded bg-secondary/40 text-center">
            <p className="text-[10px] text-muted-foreground mb-0.5">Competition</p>
            <p className={cn("text-xs font-mono font-bold", opp.competition === "Low" ? "text-primary" : opp.competition === "Medium" ? "text-amber-400" : "text-red-400")}>
              {opp.competition}
            </p>
          </div>
          <div className="p-2 rounded bg-secondary/40 text-center">
            <p className="text-[10px] text-muted-foreground mb-0.5">Startup Cost</p>
            <p className="text-xs font-mono font-bold text-foreground">{opp.startupCost}</p>
          </div>
          <div className="p-2 rounded bg-secondary/40 text-center">
            <p className="text-[10px] text-muted-foreground mb-0.5">First Client</p>
            <p className="text-xs font-mono font-bold text-foreground">{opp.timeToFirstClient}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {opp.overview.substring(0, 130)}...
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5">
        {isPurchased ? (
          <Button
            variant="outline"
            className="w-full text-primary border-primary/40"
            onClick={() => navigate(`/opportunity/${opp.id}/execute`)}
          >
            <Zap className="w-4 h-4" />
            View Execution Guide
          </Button>
        ) : (
          <Button
            variant={opp.demandScore >= 85 ? "tactical" : "default"}
            className="w-full"
            size={opp.demandScore >= 85 ? "default" : "default"}
            onClick={() => navigate(`/opportunity/${opp.id}`)}
          >
            View Opportunity
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
