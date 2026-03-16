import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, Zap, TrendingUp, Bell, ArrowRight, Package, Crown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OPPORTUNITIES } from "@/data/opportunities";
import { useAuth } from "@/lib/auth";
import OpportunityCard from "@/components/opportunity/OpportunityCard";
import { useState } from "react";
import { cn } from "@/lib/utils";

const WEEKLY_SIGNALS = [
  { title: "AI Voice Cloning for Content Creators", demandScore: 92, category: "AI Services", isHot: true, publishedAt: "2 days ago" },
  { title: "LinkedIn Ghostwriting for Executives", demandScore: 87, category: "Freelance Services", isHot: true, publishedAt: "3 days ago" },
  { title: "Email Marketing Automation for D2C Brands", demandScore: 81, category: "Automation Services", isHot: false, publishedAt: "5 days ago" },
  { title: "No-Code SaaS Builder for Niche Communities", demandScore: 79, category: "Micro SaaS Ideas", isHot: false, publishedAt: "6 days ago" },
  { title: "AI Product Photography Service", demandScore: 85, category: "AI Services", isHot: true, publishedAt: "Today" },
];

type Tab = "purchased" | "saved" | "signals";

export default function UserDashboardPage() {
  const navigate = useNavigate();
  const { user, upgradeToPro } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("purchased");

  if (!user) {
    navigate("/auth");
    return null;
  }

  const purchasedOpps = OPPORTUNITIES.filter((o) => user.purchasedOpportunities.includes(o.id));
  const savedOpps = OPPORTUNITIES.filter((o) => user.savedOpportunities.includes(o.id));

  const TABS = [
    { id: "purchased" as Tab, label: "My Opportunities", icon: Package, count: purchasedOpps.length },
    { id: "saved" as Tab, label: "Saved", icon: Bookmark, count: savedOpps.length },
    { id: "signals" as Tab, label: "Weekly Signals", icon: Bell, count: WEEKLY_SIGNALS.length },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, <span className="text-primary">{user.name}</span>
          </h1>
          <p className="text-muted-foreground mt-1 font-mono text-sm">
            {user.plan === "pro" ? "PRO MEMBER" : "FREE PLAN"} · {purchasedOpps.length} OPPORTUNITIES UNLOCKED
          </p>
        </div>
        {user.plan === "free" && (
          <Button variant="tactical" onClick={() => { upgradeToPro(); }} className="shrink-0">
            <Crown className="w-5 h-5" />
            Upgrade to Pro — $29/mo
          </Button>
        )}
        {user.plan === "pro" && (
          <Badge className="bg-primary/20 text-primary border-primary/40 font-mono text-sm px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            PRO MEMBER
          </Badge>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Package, label: "Purchased", value: purchasedOpps.length, accent: true },
          { icon: Bookmark, label: "Saved", value: savedOpps.length, accent: false },
          { icon: Bell, label: "New Signals", value: WEEKLY_SIGNALS.filter(s => s.publishedAt === "Today").length, accent: true },
          { icon: TrendingUp, label: "Avg Demand", value: purchasedOpps.length > 0 ? Math.round(purchasedOpps.reduce((a, o) => a + o.demandScore, 0) / purchasedOpps.length) : "—", accent: false },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "p-5 rounded-lg border bg-card",
              stat.accent ? "border-primary/30 glow-green-subtle" : "border-border"
            )}
          >
            <stat.icon className={cn("w-5 h-5 mb-3", stat.accent ? "text-primary" : "text-muted-foreground")} />
            <p className="text-2xl font-bold font-mono text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Pro Upsell Banner */}
      {user.plan === "free" && (
        <div className="p-5 rounded-lg border border-primary/30 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-foreground mb-1">Get unlimited access to all {OPPORTUNITIES.length} opportunities</p>
            <p className="text-sm text-muted-foreground">Pro members get the full library, weekly signals, and new opportunities as they're published.</p>
          </div>
          <Button variant="tactical" className="shrink-0" onClick={upgradeToPro}>
            Start Pro — $29/month
          </Button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.count > 0 && (
              <span className={cn(
                "px-1.5 py-0.5 rounded text-[10px] font-mono font-bold",
                activeTab === tab.id ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "purchased" && (
          <div>
            {purchasedOpps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedOpps.map((opp, i) => (
                  <OpportunityCard key={opp.id} opportunity={opp} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">No purchased opportunities yet</p>
                <p className="text-muted-foreground mb-6">Browse the library and unlock your first execution blueprint</p>
                <Button variant="tactical" onClick={() => navigate("/opportunities")}>
                  Browse Opportunities
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === "saved" && (
          <div>
            {savedOpps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedOpps.map((opp, i) => (
                  <OpportunityCard key={opp.id} opportunity={opp} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">No saved opportunities</p>
                <p className="text-muted-foreground mb-6">Bookmark opportunities you're interested in</p>
                <Button variant="outline" onClick={() => navigate("/opportunities")}>Browse Library</Button>
              </div>
            )}
          </div>
        )}

        {activeTab === "signals" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground font-mono">{WEEKLY_SIGNALS.length} NEW SIGNALS THIS WEEK</p>
              <div className="flex items-center gap-2 text-xs text-primary font-mono">
                <Bell className="w-3 h-3" />
                NEXT UPDATE: MONDAY
              </div>
            </div>
            {WEEKLY_SIGNALS.map((signal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between p-5 rounded-lg border border-border bg-card hover:border-primary/40 transition-all cursor-pointer group"
                onClick={() => navigate("/opportunities")}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                        {signal.title}
                      </span>
                      {signal.isHot && (
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40 font-mono text-[9px]">
                          🔥 HOT
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground font-mono">{signal.category}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {signal.publishedAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">DEMAND</p>
                    <p className="font-bold font-mono text-primary">{signal.demandScore}</p>
                  </div>
                  {user.plan === "free" ? (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono bg-secondary px-3 py-1.5 rounded border border-border">
                      <Crown className="w-3 h-3" />
                      PRO
                    </div>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </div>
              </motion.div>
            ))}

            {user.plan === "free" && (
              <div className="p-6 rounded-lg border border-primary/30 bg-primary/5 text-center">
                <Crown className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-bold text-foreground mb-2">Upgrade to Pro to access all weekly signals</p>
                <p className="text-sm text-muted-foreground mb-4">Get new opportunities every week before everyone else</p>
                <Button variant="tactical" onClick={upgradeToPro}>
                  Upgrade Now — $29/month
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
