import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";

const FREE_FEATURES = [
  "Browse all opportunity cards",
  "View demand scores & competition levels",
  "See pricing package overviews",
  "Save opportunities to wishlist",
];

const SINGLE_FEATURES = [
  "Full execution blueprint (one opportunity)",
  "Step-by-step delivery workflow",
  "Client outreach message templates",
  "Tools setup guide",
  "Pricing strategy & packages",
  "Lifetime access to that opportunity",
];

const PRO_FEATURES = [
  "Unlimited opportunity library access",
  "All execution blueprints unlocked",
  "Weekly opportunity signals (3–5 new/week)",
  "New opportunities as published",
  "Priority email support",
  "Cancel anytime",
];

export default function PricingPage() {
  const navigate = useNavigate();
  const { user, upgradeToPro } = useAuth();

  const handlePro = () => {
    if (!user) navigate("/auth");
    else { upgradeToPro(); navigate("/dashboard"); }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-3">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground text-lg">
          Buy one opportunity or unlock everything with Pro
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-xl border border-border bg-card"
        >
          <div className="mb-6">
            <p className="text-sm text-muted-foreground font-mono uppercase mb-2">Free</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold font-mono text-foreground">$0</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Browse & explore the library</p>
          </div>
          <ul className="space-y-3 mb-8">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground/60 flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => !user ? navigate("/auth") : navigate("/opportunities")}
          >
            {user ? "Browse Library" : "Create Free Account"}
          </Button>
        </motion.div>

        {/* Single */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-xl border border-border bg-card"
        >
          <div className="mb-6">
            <p className="text-sm text-muted-foreground font-mono uppercase mb-2">Single Opportunity</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold font-mono text-foreground">$29</span>
              <span className="text-muted-foreground">one-time</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Full blueprint for one opportunity</p>
          </div>
          <ul className="space-y-3 mb-8">
            {SINGLE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <Button
            variant="default"
            className="w-full"
            onClick={() => navigate("/opportunities")}
          >
            <Zap className="w-4 h-4" />
            Browse Opportunities
          </Button>
        </motion.div>

        {/* Pro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-xl border border-primary/40 bg-primary/5 glow-green-subtle relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground font-mono text-xs px-4">BEST VALUE</Badge>
          </div>
          <div className="mb-6">
            <p className="text-sm text-primary font-mono uppercase mb-2">Pro Monthly</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold font-mono text-primary">$29</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Everything, every week</p>
          </div>
          <ul className="space-y-3 mb-8">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          {user?.plan === "pro" ? (
            <Button variant="outline" className="w-full border-primary text-primary" disabled>
              <Crown className="w-4 h-4" />
              Active Subscription
            </Button>
          ) : (
            <Button variant="tactical" className="w-full" onClick={handlePro}>
              Start Pro — $29/month
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </motion.div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-bold text-foreground text-center mb-6">Frequently Asked Questions</h2>
        {[
          { q: "What's included in an Execution Blueprint?", a: "Each blueprint includes a market overview, step-by-step delivery workflow, service package templates with pricing, client outreach message templates (3–5 variations), tools setup guide, and a full pricing strategy." },
          { q: "How often are new opportunities published?", a: "We publish 3–5 new opportunities every week, sourced from trend monitoring across TikTok, Upwork, Fiverr, and YouTube. Pro members get access to all new opportunities as they're published." },
          { q: "Can I use one opportunity purchase to start a real freelance business?", a: "Yes — that's exactly what they're designed for. Each blueprint gives you everything you need to find clients and deliver the service, typically within 1–2 weeks of starting." },
          { q: "Is there a refund policy?", a: "Yes. If you're not satisfied with a purchased blueprint, contact us within 30 days for a full refund. No questions asked." },
        ].map((item) => (
          <div key={item.q} className="p-5 rounded-lg border border-border bg-card">
            <p className="font-bold text-foreground mb-2 text-sm">{item.q}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
