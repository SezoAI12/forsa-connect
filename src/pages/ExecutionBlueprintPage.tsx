import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft, CheckCircle2, ChevronDown, ChevronUp,
  ExternalLink, Copy, Check, Lightbulb, Wrench,
  Users, DollarSign, Package, Zap, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OPPORTUNITIES } from "@/data/opportunities";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="text-muted-foreground hover:text-primary transition-colors p-1">
      {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function CollapsibleSection({
  icon: Icon,
  title,
  children,
  defaultOpen = false,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-secondary/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-foreground">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-border"
        >
          <div className="p-5">{children}</div>
        </motion.div>
      )}
    </div>
  );
}

export default function ExecutionBlueprintPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const opp = OPPORTUNITIES.find((o) => o.id === id);

  if (!opp) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Opportunity not found</p>
          <Button variant="outline" onClick={() => navigate("/opportunities")}>Back</Button>
        </div>
      </div>
    );
  }

  const isPurchased = user?.purchasedOpportunities.includes(opp.id) || user?.plan === "pro";
  if (!isPurchased) {
    navigate(`/opportunity/${opp.id}`);
    return null;
  }

  const toggleStep = (step: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(step)) next.delete(step);
      else next.add(step);
      return next;
    });
  };

  const progress = (completedSteps.size / opp.executionBlueprint.deliveryWorkflow.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Back */}
      <button
        onClick={() => navigate(`/opportunity/${opp.id}`)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Opportunity
      </button>

      {/* Header */}
      <div className="p-6 rounded-lg border border-primary/40 bg-primary/5 glow-green-subtle">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge className="bg-primary/20 text-primary border-primary/40 font-mono text-xs mb-3">
              FULL EXECUTION BLUEPRINT
            </Badge>
            <h1 className="text-2xl font-bold text-foreground mb-1">{opp.title}</h1>
            <p className="text-muted-foreground text-sm">{opp.category} · {opp.targetClients}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-mono text-muted-foreground mb-1">DEMAND</p>
            <p className="text-3xl font-bold font-mono text-primary">{opp.demandScore}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-muted-foreground">EXECUTION PROGRESS</span>
            <span className="text-xs font-mono text-primary">{completedSteps.size}/{opp.executionBlueprint.deliveryWorkflow.length} STEPS</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Income Range", value: `$${opp.incomeMin.toLocaleString()}–$${opp.incomeMax.toLocaleString()}/mo` },
          { label: "Startup Cost", value: opp.startupCost },
          { label: "Competition", value: opp.competition },
          { label: "First Client", value: opp.timeToFirstClient },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-lg border border-border bg-card text-center">
            <p className="text-[10px] text-muted-foreground font-mono uppercase mb-1">{s.label}</p>
            <p className="text-sm font-bold font-mono text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Step 1 — Setup Tools */}
      <CollapsibleSection icon={Wrench} title="Step 1 — Setup Your Tools" defaultOpen>
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{opp.executionBlueprint.toolsSetup}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {opp.toolsStack.map((tool, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-secondary/20">
                <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", tool.isFree ? "bg-primary" : "bg-amber-400")} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground text-sm">{tool.name}</span>
                    <Badge variant="outline" className={cn("text-[9px] font-mono px-1.5", tool.isFree ? "text-primary border-primary/40" : "text-amber-400 border-amber-400/40")}>
                      {tool.isFree ? "FREE" : "PAID"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{tool.purpose}</p>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary mt-1 hover:underline"
                  >
                    Visit site <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* Step 2 — Service Packages */}
      <CollapsibleSection icon={Package} title="Step 2 — Create Your Service Packages">
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{opp.executionBlueprint.servicePackaging}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opp.pricingStrategy.map((pkg, i) => (
              <div key={i} className={cn(
                "p-5 rounded-lg border",
                i === 1 ? "border-primary/40 bg-primary/5 glow-green-subtle" : "border-border bg-secondary/20"
              )}>
                {i === 1 && (
                  <Badge className="bg-primary/20 text-primary border-primary/40 font-mono text-[9px] mb-3">
                    BEST SELLER
                  </Badge>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-foreground">{pkg.packageName}</span>
                  <span className="text-xl font-bold font-mono text-primary">${pkg.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{pkg.description}</p>
                <ul className="space-y-1.5">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* Step 3 — Find Clients */}
      <CollapsibleSection icon={Users} title="Step 3 — Find Your First Clients">
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{opp.clientAcquisitionSystem}</p>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Outreach Templates
            </h4>
            {opp.outreachTemplates.map((template, i) => (
              <div key={i} className="p-4 rounded-lg border border-border bg-secondary/20">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-primary border-primary/40 font-mono text-xs">
                    {template.platform}
                  </Badge>
                  <CopyButton text={template.body} />
                </div>
                {template.subject && (
                  <p className="text-xs font-mono text-muted-foreground mb-2">
                    SUBJECT: {template.subject}
                  </p>
                )}
                <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{template.body}</p>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* Step 4 — Close First Client + Delivery */}
      <CollapsibleSection icon={DollarSign} title="Step 4 — Close & Deliver">
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">Pricing Strategy & Model</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{opp.executionBlueprint.pricingModel}</p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">Client Acquisition System</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{opp.executionBlueprint.clientAcquisition}</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Full Delivery Workflow */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Step-by-Step Delivery Workflow</h2>
        </div>

        {opp.executionBlueprint.deliveryWorkflow.map((step) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.step * 0.1 }}
            className={cn(
              "p-5 rounded-lg border transition-all",
              completedSteps.has(step.step)
                ? "border-primary/40 bg-primary/5"
                : "border-border bg-card"
            )}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleStep(step.step)}
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                  completedSteps.has(step.step)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary"
                )}
              >
                {completedSteps.has(step.step) ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-mono font-bold">{step.step}</span>
                )}
              </button>

              <div className="flex-1">
                <h3 className={cn(
                  "font-bold mb-2",
                  completedSteps.has(step.step) ? "text-primary" : "text-foreground"
                )}>
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.content}</p>

                {step.tips && step.tips.length > 0 && (
                  <div className="space-y-2">
                    {step.tips.map((tip, j) => (
                      <div key={j} className="flex items-start gap-2 p-3 rounded-lg bg-secondary/30">
                        <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">{tip}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Market Overview — Full */}
      <CollapsibleSection icon={BookOpen} title="Market Overview & Research">
        <p className="text-muted-foreground text-sm leading-relaxed">{opp.executionBlueprint.marketOverview}</p>
        <div className="mt-4 p-4 rounded-lg border border-border bg-secondary/20">
          <h4 className="font-bold text-foreground text-sm mb-3">Market Evidence</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{opp.marketEvidence}</p>
        </div>
      </CollapsibleSection>

      {/* Done */}
      {completedSteps.size === opp.executionBlueprint.deliveryWorkflow.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-lg border border-primary/40 bg-primary/10 glow-green text-center"
        >
          <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">Blueprint Complete! 🎉</h3>
          <p className="text-muted-foreground">
            You've completed all steps in the execution guide. Time to land your first client!
          </p>
        </motion.div>
      )}
    </div>
  );
}
