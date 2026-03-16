import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, TrendingUp, Clock, Crown, ArrowRight, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const ALL_SIGNALS = [
  {
    week: "Week of Jan 13, 2025",
    isCurrentWeek: true,
    signals: [
      { title: "AI Voice Cloning for Content Creators", demandScore: 92, category: "AI Services", startupCost: "$0", competiton: "Low", income: "$2k–$5k/mo", isHot: true, summary: "Voice cloning tools like ElevenLabs have made it trivial to offer voiceover services at scale. YouTube channels and podcast networks are the primary buyers." },
      { title: "LinkedIn Ghostwriting for Executives", demandScore: 87, category: "Freelance Services", startupCost: "$0", competiton: "Low", income: "$2k–$6k/mo", isHot: true, summary: "LinkedIn's algorithm is rewarding personal brand content harder than ever. Senior executives pay $500–$2,000/month for ghostwriters who can mimic their voice." },
      { title: "AI Product Photography Service", demandScore: 85, category: "AI Services", startupCost: "$0", competiton: "Low", income: "$1.5k–$4k/mo", isHot: true, summary: "Tools like Flair AI let you generate professional product photos from a simple snapshot. E-commerce brands need dozens of product images monthly." },
      { title: "Email Marketing Automation for D2C Brands", demandScore: 81, category: "Automation Services", startupCost: "$29", competiton: "Medium", income: "$1.5k–$3k/mo", isHot: false, summary: "Klaviyo and Mailchimp experts are in short supply relative to demand. D2C brands allocate 15–20% of their marketing budget to email." },
      { title: "No-Code SaaS for Niche Communities", demandScore: 79, category: "Micro SaaS Ideas", startupCost: "$50", competiton: "Low", income: "$500–$3k/mo", isHot: false, summary: "Bubble and Webflow have lowered the bar. Niche tools for specific professions (plumbers, photographers, coaches) generate $50–$200/month recurring from each user." },
    ],
  },
  {
    week: "Week of Jan 6, 2025",
    isCurrentWeek: false,
    signals: [
      { title: "AI Subtitle Generation for Video Creators", demandScore: 88, category: "AI Services", startupCost: "$0", competiton: "Medium", income: "$1k–$3k/mo", isHot: true, summary: "Captions increase watch-time by 14%. Whisper AI makes this a near-zero-cost service to deliver." },
      { title: "Podcast Content Repurposing", demandScore: 85, category: "AI Services", startupCost: "$0", competiton: "Low", income: "$2k–$5k/mo", isHot: true, summary: "4M+ podcasts exist, 78% never repurpose their episodes. AI tools turn 1 hour of audio into a month of content." },
      { title: "WhatsApp Automation for Clinics", demandScore: 91, category: "Automation Services", startupCost: "$29", competiton: "Low", income: "$1.5k–$4k/mo", isHot: true, summary: "Clinics lose 23% revenue to no-shows. A $500 WhatsApp bot setup pays for itself in the first week." },
    ],
  },
];

export default function WeeklySignalsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isPro = user?.plan === "pro";

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Live Feed</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Weekly Opportunity Signals</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            3–5 new opportunities published every Monday, sourced from TikTok, Upwork, Fiverr & YouTube trends
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 bg-primary/5">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-primary">NEXT UPDATE: MONDAY</span>
        </div>
      </div>

      {/* Data Sources Bar */}
      <div className="flex flex-wrap gap-3">
        {["TikTok Trends", "Upwork Demand", "Fiverr Gig Growth", "YouTube Creator Economy"].map((src) => (
          <div key={src} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs text-muted-foreground">
            <Zap className="w-3 h-3 text-primary" />
            {src}
          </div>
        ))}
      </div>

      {ALL_SIGNALS.map((week, wi) => (
        <div key={week.week}>
          {/* Week Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold",
              week.isCurrentWeek
                ? "bg-primary/20 text-primary border border-primary/40"
                : "bg-secondary text-muted-foreground border border-border"
            )}>
              <Clock className="w-3 h-3" />
              {week.week}
              {week.isCurrentWeek && " — CURRENT"}
            </div>
          </div>

          {/* Signals List */}
          <div className="space-y-3">
            {week.signals.map((signal, si) => {
              const isLocked = !isPro && (wi > 0 || si > 2);

              return (
                <motion.div
                  key={signal.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (wi * 5 + si) * 0.06 }}
                  className={cn(
                    "p-5 rounded-lg border bg-card transition-all",
                    isLocked ? "opacity-60 border-border" : "hover:border-primary/40 border-border",
                    signal.isHot && !isLocked ? "border-primary/20" : ""
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-bold text-foreground text-sm">
                          {isLocked ? "••••••••••••••••••••••" : signal.title}
                        </span>
                        {signal.isHot && !isLocked && (
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40 font-mono text-[9px]">
                            🔥 HOT
                          </Badge>
                        )}
                      </div>

                      {!isLocked && (
                        <>
                          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{signal.summary}</p>
                          <div className="flex flex-wrap gap-3 text-xs">
                            <span className="font-mono text-muted-foreground">{signal.category}</span>
                            <span className="text-muted-foreground">·</span>
                            <span className="font-mono text-foreground">{signal.income}</span>
                            <span className="text-muted-foreground">·</span>
                            <span className={cn(
                              "font-mono",
                              signal.competiton === "Low" ? "text-primary" : "text-amber-400"
                            )}>
                              {signal.competiton} Competition
                            </span>
                            <span className="text-muted-foreground">·</span>
                            <span className="font-mono text-muted-foreground">Startup: {signal.startupCost}</span>
                          </div>
                        </>
                      )}

                      {isLocked && (
                        <p className="text-xs text-muted-foreground font-mono">PRO MEMBERS ONLY</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-center">
                        <p className="text-[10px] text-muted-foreground font-mono mb-1">DEMAND</p>
                        <p className={cn(
                          "text-lg font-bold font-mono",
                          isLocked ? "text-muted-foreground blur-sm" : "text-primary"
                        )}>
                          {signal.demandScore}
                        </p>
                      </div>
                      {isLocked ? (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Lock className="w-4 h-4" />
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate("/opportunities")}
                          className="text-xs"
                        >
                          View <ArrowRight className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Pro Upsell */}
      {!isPro && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-xl border border-primary/30 bg-primary/5 glow-green-subtle text-center"
        >
          <Crown className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">Unlock All Weekly Signals</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Pro members get full access to every signal — including demand scores, income estimates, and early access to new opportunities every Monday.
          </p>
          <Button variant="tactical" onClick={() => navigate("/pricing")}>
            Start Pro — $29/month
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
