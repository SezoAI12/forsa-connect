import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft, TrendingUp, Target, DollarSign, Clock, Users,
  Lock, Unlock, CheckCircle2, Star, Zap, Bookmark, Share2, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OPPORTUNITIES } from "@/data/opportunities";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import PurchaseModal from "@/components/opportunity/PurchaseModal";

export default function OpportunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, toggleSaveOpportunity, purchaseOpportunity } = useAuth();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const opp = OPPORTUNITIES.find((o) => o.id === id);
  if (!opp) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Opportunity not found</p>
          <Button variant="outline" onClick={() => navigate("/opportunities")}>
            Back to Library
          </Button>
        </div>
      </div>
    );
  }

  const isPurchased = user?.purchasedOpportunities.includes(opp.id) || user?.plan === "pro";
  const isSaved = user?.savedOpportunities.includes(opp.id);

  const handlePurchase = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setPurchasing(true);
    await new Promise((r) => setTimeout(r, 1200));
    purchaseOpportunity(opp.id);
    setPurchasing(false);
    setShowPurchaseModal(false);
    navigate(`/opportunity/${opp.id}/execute`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Back */}
      <button
        onClick={() => navigate("/opportunities")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Library
      </button>

      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "p-8 rounded-lg border bg-card",
          opp.demandScore >= 85 ? "border-primary/40 glow-green-subtle" : "border-border"
        )}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="outline" className="text-primary border-primary/40 font-mono text-xs">
                {opp.category}
              </Badge>
              {opp.isNew && (
                <Badge className="bg-primary/20 text-primary border-primary/40 font-mono text-xs">
                  NEW THIS WEEK
                </Badge>
              )}
              {opp.demandScore >= 85 && (
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40 font-mono text-xs">
                  ⭐ HIGH DEMAND
                </Badge>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{opp.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Users className="w-4 h-4" />
              <span>Target Clients: <strong className="text-foreground">{opp.targetClients}</strong></span>
            </div>
          </div>

          <div className="flex gap-2">
            {user && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleSaveOpportunity(opp.id)}
                className={isSaved ? "border-primary text-primary" : ""}
              >
                <Bookmark className={cn("w-4 h-4", isSaved ? "fill-current" : "")} />
              </Button>
            )}
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Score Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Demand Score</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-2xl font-bold font-mono text-primary">{opp.demandScore}</span>
              <span className="text-muted-foreground">/100</span>
            </div>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${opp.demandScore}%` }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: "Income Potential", value: `$${opp.incomeMin.toLocaleString()}–$${opp.incomeMax.toLocaleString()}/mo` },
          { icon: Target, label: "Competition", value: opp.competition },
          { icon: DollarSign, label: "Startup Cost", value: opp.startupCost },
          { icon: Clock, label: "Time to First Client", value: opp.timeToFirstClient },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-4 rounded-lg border border-border bg-card text-center"
          >
            <metric.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-[10px] text-muted-foreground mb-1 font-mono uppercase">{metric.label}</p>
            <p className="font-bold text-foreground text-sm font-mono">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Overview */}
      <div className="p-6 rounded-lg border border-border bg-card">
        <h2 className="text-lg font-bold text-foreground mb-4">Opportunity Overview</h2>
        <p className="text-muted-foreground leading-relaxed">{opp.overview}</p>
      </div>

      {/* Market Evidence */}
      <div className="p-6 rounded-lg border border-border bg-card">
        <h2 className="text-lg font-bold text-foreground mb-4">Market Evidence</h2>
        <p className="text-muted-foreground leading-relaxed">{opp.marketEvidence}</p>
      </div>

      {/* Pricing Preview */}
      <div className="p-6 rounded-lg border border-border bg-card">
        <h2 className="text-lg font-bold text-foreground mb-4">Service Packages Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opp.pricingStrategy.map((pkg, i) => (
            <div key={i} className="p-4 rounded-lg border border-border bg-secondary/20">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-foreground text-sm">{pkg.packageName}</span>
                <span className="text-primary font-mono font-bold">${pkg.price}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{pkg.description}</p>
              <ul className="space-y-1">
                {pkg.features.slice(0, 3).map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
                {pkg.features.length > 3 && (
                  <li className="text-xs text-muted-foreground ps-5">+{pkg.features.length - 3} more...</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Preview */}
      <div className="p-6 rounded-lg border border-border bg-card">
        <h2 className="text-lg font-bold text-foreground mb-4">Tools Required</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {opp.toolsStack.map((tool, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/20">
              <div className={cn(
                "w-2 h-2 rounded-full flex-shrink-0",
                tool.isFree ? "bg-primary" : "bg-amber-400"
              )} />
              <div>
                <p className="text-xs font-medium text-foreground">{tool.name}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{tool.isFree ? "FREE" : "PAID"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase / Unlock Section */}
      {isPurchased ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-lg border border-primary/40 bg-primary/5 glow-green-subtle text-center"
        >
          <Unlock className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">Blueprint Unlocked!</h3>
          <p className="text-muted-foreground mb-6">
            You have full access to the step-by-step execution guide for this opportunity.
          </p>
          <Button variant="tactical" onClick={() => navigate(`/opportunity/${opp.id}/execute`)}>
            <Zap className="w-5 h-5" />
            Open Execution Guide
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-lg border border-border bg-card"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-xl font-bold text-foreground">Unlock Full Execution Blueprint</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Get the complete step-by-step guide: tool setup, client outreach templates, pricing strategy, and delivery workflow.
              </p>
              <ul className="space-y-2">
                {[
                  "Step-by-step execution guide (4 steps)",
                  "3–5 client outreach message templates",
                  "Complete pricing strategy",
                  "Tools setup instructions",
                  "Delivery workflow checklist",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center md:text-right">
              <div className="mb-4">
                <span className="text-4xl font-bold font-mono text-foreground">$29</span>
                <p className="text-sm text-muted-foreground">one-time purchase</p>
              </div>
              <Button
                variant="tactical"
                className="w-full md:w-auto px-8"
                onClick={() => {
                  if (!user) navigate("/auth");
                  else setShowPurchaseModal(true);
                }}
              >
                <Unlock className="w-5 h-5" />
                Unlock Blueprint — $29
              </Button>
              <p className="text-xs text-muted-foreground mt-3 font-mono">
                Or get all opportunities with Pro at $29/month
              </p>
              <button
                onClick={() => navigate("/pricing")}
                className="text-xs text-primary underline mt-1"
              >
                View Pro Plan →
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <PurchaseModal
          opportunity={opp}
          onClose={() => setShowPurchaseModal(false)}
          onPurchase={handlePurchase}
          purchasing={purchasing}
        />
      )}
    </div>
  );
}
