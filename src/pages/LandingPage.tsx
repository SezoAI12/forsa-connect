import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, Zap, Target, ArrowRight, Star, CheckCircle2,
  Sparkles, BarChart3, Users, Clock
} from "lucide-react";
import { OPPORTUNITIES, CATEGORIES } from "@/data/opportunities";
import OpportunityCard from "@/components/opportunity/OpportunityCard";

const BLOG_POSTS = [
  {
    title: "3 AI Services You Can Start This Month (No Coding Required)",
    description: "Discover the fastest-growing AI freelance services that require zero technical background to get started.",
    tag: "AI Services",
    readTime: "4 min read",
  },
  {
    title: "5 Freelance Services Currently Growing Fast in 2025",
    description: "Market data reveals which freelance niches are seeing the highest demand growth — and what to do about it.",
    tag: "Market Trends",
    readTime: "6 min read",
  },
  {
    title: "How to Earn $2,000/Month with Podcast Repurposing",
    description: "A step-by-step breakdown of turning podcast audio into a full content library using AI tools.",
    tag: "Case Study",
    readTime: "8 min read",
  },
];

const STATS = [
  { value: "4M+", label: "Active Creators", icon: Users },
  { value: "88%", label: "Avg Demand Score", icon: BarChart3 },
  { value: "2 weeks", label: "Avg Time to First Client", icon: Clock },
  { value: "$3.2k", label: "Avg Monthly Income", icon: TrendingUp },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const trending = OPPORTUNITIES.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono">
              <Sparkles className="w-4 h-4" />
              WEEKLY OPPORTUNITY SIGNALS — UPDATED EVERY MONDAY
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Stop Guessing.<br />
              <span className="text-primary trust-score-premium">Start Earning.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We analyze market signals across TikTok, Upwork, Fiverr and YouTube — then turn them into
              ready-to-execute freelance service opportunities with step-by-step blueprints.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="tactical"
                size="lg"
                className="w-full sm:w-auto text-base px-8"
                onClick={() => navigate("/opportunities")}
              >
                Browse Opportunities
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => navigate("/auth")}
              >
                Create Free Account
              </Button>
            </div>

            <p className="text-xs text-muted-foreground font-mono">
              No credit card required · Free opportunity previews · Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog / Content Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">Latest Opportunity Reports</h2>
            <p className="text-muted-foreground">Market intelligence updated weekly</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors cursor-pointer group"
                onClick={() => navigate("/opportunities")}
              >
                <Badge variant="outline" className="mb-4 text-primary border-primary/40 font-mono text-xs">
                  {post.tag}
                </Badge>
                <h3 className="font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">{post.readTime}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Opportunities */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-xs font-mono text-primary uppercase tracking-wider">Trending This Week</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Top Freelance Opportunities</h2>
            </div>
            <Button variant="outline" onClick={() => navigate("/opportunities")} className="hidden md:flex">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map((opp, i) => (
              <OpportunityCard key={opp.id} opportunity={opp} index={i} />
            ))}
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <Button variant="outline" onClick={() => navigate("/opportunities")}>
              View All Opportunities
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">Browse by Category</h2>
            <p className="text-muted-foreground">Find opportunities matching your skills</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => navigate(`/opportunities?category=${encodeURIComponent(cat)}`)}
                className="px-5 py-3 rounded-lg border border-border bg-background hover:border-primary hover:text-primary text-sm font-medium transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">How It Works</h2>
            <p className="text-muted-foreground">From market signal to first client in 4 steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: BarChart3, title: "Market Analysis", desc: "We monitor TikTok, Upwork, Fiverr, and YouTube daily for growing service demands" },
              { icon: Target, title: "Opportunity Scoring", desc: "Each opportunity gets a Demand Score based on real market data" },
              { icon: Zap, title: "Blueprint Creation", desc: "We build step-by-step execution guides with pricing, tools, and outreach templates" },
              { icon: Star, title: "You Execute", desc: "Follow the blueprint and land your first client — typically within 1–2 weeks" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs font-mono text-primary mb-2">STEP {i + 1}</div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">Simple Pricing</h2>
            <p className="text-muted-foreground">Buy one opportunity or get everything with Pro</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-lg border border-border bg-card">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Single Opportunity</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-mono text-foreground">$29</span>
                  <span className="text-muted-foreground">one-time</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {["Full execution blueprint", "Pricing strategy & packages", "Client outreach templates", "Tools setup guide", "Step-by-step delivery workflow"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" onClick={() => navigate("/opportunities")}>
                Browse Opportunities
              </Button>
            </div>

            <div className="p-8 rounded-lg border border-primary/40 bg-primary/5 glow-green-subtle relative">
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground font-mono text-xs">BEST VALUE</Badge>
              </div>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Pro Monthly</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-mono text-primary">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited opportunity library access",
                  "Weekly opportunity signals",
                  "New opportunities as published",
                  "All execution blueprints",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="tactical" className="w-full" onClick={() => navigate("/auth")}>
                Start Pro — $29/month
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center glow-green">
              <span className="text-primary-foreground font-bold font-mono text-sm">F</span>
            </div>
            <span className="font-bold text-foreground">Forsa IQ</span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            © 2025 FORSA IQ — OPPORTUNITY INTELLIGENCE PLATFORM
          </p>
        </div>
      </footer>
    </div>
  );
}
