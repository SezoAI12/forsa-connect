import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lock, Unlock, Shield, Zap, Droplets, Flame, Truck, Building } from "lucide-react";
import { calculateTrustScore, generateAssetId, type TrustInput } from "@/lib/trust-algorithm";

interface Asset {
  id: string;
  sector: string;
  city: string;
  region: string;
  monthlyLossUSD: number;
  durationMonths: number;
  demandScore: number;
  feasibilityScore: number;
  hasEvidence: boolean;
  govComplexity: number;
  gdpPerCapita: number;
}

const MOCK_ASSETS: Asset[] = [
  { id: "ASSET-777-WTR", sector: "Water", city: "Basra", region: "Iraq", monthlyLossUSD: 12000, durationMonths: 36, demandScore: 85, feasibilityScore: 70, hasEvidence: true, govComplexity: 55, gdpPerCapita: 5500 },
  { id: "ASSET-333-NRG", sector: "Energy", city: "Erbil", region: "Iraq", monthlyLossUSD: 8500, durationMonths: 18, demandScore: 72, feasibilityScore: 80, hasEvidence: false, govComplexity: 40, gdpPerCapita: 6200 },
  { id: "ASSET-111-INF", sector: "Infrastructure", city: "Baghdad", region: "Iraq", monthlyLossUSD: 15200, durationMonths: 48, demandScore: 90, feasibilityScore: 60, hasEvidence: true, govComplexity: 65, gdpPerCapita: 5500 },
  { id: "ASSET-555-SCH", sector: "Supply Chain", city: "Mosul", region: "Iraq", monthlyLossUSD: 4300, durationMonths: 8, demandScore: 55, feasibilityScore: 75, hasEvidence: false, govComplexity: 60, gdpPerCapita: 4800 },
  { id: "ASSET-999-WST", sector: "Waste", city: "Sharjah", region: "UAE", monthlyLossUSD: 22000, durationMonths: 30, demandScore: 88, feasibilityScore: 85, hasEvidence: true, govComplexity: 20, gdpPerCapita: 43000 },
  { id: "ASSET-777-NRG", sector: "Energy", city: "Abu Dhabi", region: "UAE", monthlyLossUSD: 35000, durationMonths: 12, demandScore: 78, feasibilityScore: 90, hasEvidence: true, govComplexity: 15, gdpPerCapita: 43000 },
];

const sectorIcons: Record<string, React.ElementType> = {
  Water: Droplets,
  Energy: Flame,
  Infrastructure: Building,
  "Supply Chain": Truck,
  Waste: Zap,
};

export default function MarketplacePage() {
  const { t, lang } = useI18n();
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());

  const assetsWithScores = MOCK_ASSETS.map((asset) => {
    const input: TrustInput = {
      monthlyLossUSD: asset.monthlyLossUSD,
      localGDPPerCapita: asset.gdpPerCapita,
      demandScore: asset.demandScore,
      feasibilityScore: asset.feasibilityScore,
      hasEvidence: asset.hasEvidence,
      problemDurationMonths: asset.durationMonths,
      govComplexityScore: asset.govComplexity,
    };
    return { ...asset, trust: calculateTrustScore(input) };
  }).sort((a, b) => b.trust.score - a.trust.score);

  const handleUnlock = (id: string) => {
    setUnlockedIds((prev) => new Set(prev).add(id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("marketplace")}</h1>
        <p className="text-muted-foreground mt-1 font-mono text-sm">
          {lang === "ar" ? "سوق التمويه الذكي" : "Smart Blurring Marketplace"} | {assetsWithScores.length} ASSETS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assetsWithScores.map((asset, i) => {
          const isUnlocked = unlockedIds.has(asset.id);
          const SectorIcon = sectorIcons[asset.sector] || Shield;

          return (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-lg border bg-card overflow-hidden ${
                asset.trust.isPremium ? "border-primary/40 glow-green-subtle" : "border-border"
              }`}
            >
              {/* Header */}
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded flex items-center justify-center ${
                      asset.trust.isPremium ? "bg-primary/20" : "bg-secondary"
                    }`}>
                      <SectorIcon className={`w-5 h-5 ${asset.trust.isPremium ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">{asset.id}</p>
                      <p className="text-sm font-semibold text-foreground">{asset.sector}</p>
                    </div>
                  </div>
                  {asset.trust.isPremium && (
                    <span className="px-2 py-1 rounded text-[10px] font-mono font-bold bg-primary/20 text-primary border border-primary/30 uppercase">
                      {t("premiumAsset")}
                    </span>
                  )}
                </div>

                {/* Score */}
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-mono font-bold ${
                    asset.trust.isPremium ? "trust-score-premium" : "text-foreground"
                  }`}>
                    {asset.trust.score.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>

                {/* Visible Info */}
                <div className="space-y-2">
                  {[
                    [t("sector"), asset.sector],
                    [t("city"), `${asset.city}, ${asset.region}`],
                    [t("painMagnitude"), `$${asset.monthlyLossUSD.toLocaleString()}${t("perMonth")}`],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-mono text-foreground">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Blurred / Unlocked Section */}
                {isUnlocked ? (
                  <div className="p-3 rounded border border-primary/20 bg-primary/5 space-y-2">
                    <div className="flex items-center gap-2 text-primary text-xs font-mono">
                      <Unlock className="w-3 h-3" /> UNLOCKED
                    </div>
                    <p className="text-xs text-muted-foreground">
                      GPS: {(30.5 + Math.random()).toFixed(4)}, {(47.7 + Math.random()).toFixed(4)}
                    </p>
                    <p className="text-xs text-foreground font-medium">
                      {lang === "ar" ? "خطة التنفيذ 30/60/90 يوم" : "30/60/90 Day Implementation Roadmap"}
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>• Day 1-30: Resource procurement & permits</p>
                      <p>• Day 31-60: Implementation & deployment</p>
                      <p>• Day 61-90: First revenue target</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded border border-border bg-secondary/30 relative overflow-hidden">
                    <div className="blur-sm select-none">
                      <p className="text-xs text-muted-foreground">GPS: ██.████, ██.████</p>
                      <p className="text-xs text-muted-foreground">Seller: ████████████</p>
                      <p className="text-xs text-muted-foreground">Roadmap: ████████</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="p-4 border-t border-border">
                {isUnlocked ? (
                  <p className="text-center text-xs font-mono text-primary">{t("unlocked")} ✓</p>
                ) : (
                  <Button
                    variant={asset.trust.isPremium ? "tactical" : "default"}
                    className="w-full"
                    onClick={() => handleUnlock(asset.id)}
                  >
                    <Lock className="w-4 h-4" />
                    {t("unlock")}
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
