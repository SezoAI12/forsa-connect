import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Shield, Activity, TrendingUp, Clock } from "lucide-react";

const MOCK_STATS = {
  activeAssets: 47,
  pendingValidation: 12,
  totalValue: "$2.4M",
  avgScore: "78.333",
};

const MOCK_RECENT = [
  { id: "ASSET-777-WTR", sector: "Water", city: "Basra", score: 91.333, pain: "$12,000", status: "premium" },
  { id: "ASSET-333-NRG", sector: "Energy", city: "Erbil", score: 76.5, pain: "$8,500", status: "active" },
  { id: "ASSET-111-INF", sector: "Infrastructure", city: "Baghdad", score: 88.777, pain: "$15,200", status: "premium" },
  { id: "ASSET-555-SCH", sector: "Supply Chain", city: "Mosul", score: 62.0, pain: "$4,300", status: "pending" },
];

export default function DashboardPage() {
  const { t } = useI18n();

  const statCards = [
    { label: t("activeAssets"), value: MOCK_STATS.activeAssets, icon: Shield, accent: true },
    { label: t("pendingValidation"), value: MOCK_STATS.pendingValidation, icon: Clock, accent: false },
    { label: t("totalValue"), value: MOCK_STATS.totalValue, icon: TrendingUp, accent: true },
    { label: t("trustScore") + " Ø", value: MOCK_STATS.avgScore, icon: Activity, accent: false },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("dashboard")}</h1>
        <p className="text-muted-foreground mt-1 font-mono text-sm">SYS.STATUS: OPERATIONAL</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-lg border ${
              stat.accent ? "border-primary/30 glow-green-subtle" : "border-border"
            } bg-card`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-5 h-5 ${stat.accent ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-xs font-mono text-muted-foreground">LIVE</span>
            </div>
            <p className="text-3xl font-bold font-mono text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Assets Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">{t("recentSubmissions")}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-start p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">ID</th>
                <th className="text-start p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">{t("sector")}</th>
                <th className="text-start p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">{t("city")}</th>
                <th className="text-start p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">{t("trustScore")}</th>
                <th className="text-start p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">{t("painMagnitude")}</th>
                <th className="text-start p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RECENT.map((asset) => (
                <tr key={asset.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 font-mono text-sm text-primary">{asset.id}</td>
                  <td className="p-4 text-sm text-foreground">{asset.sector}</td>
                  <td className="p-4 text-sm text-foreground">{asset.city}</td>
                  <td className="p-4">
                    <span className={`font-mono font-bold text-sm ${
                      asset.score > 85 ? "trust-score-premium" : "text-foreground"
                    }`}>
                      {asset.score}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-sm text-foreground">{asset.pain}{t("perMonth")}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-mono uppercase ${
                      asset.status === "premium"
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : asset.status === "active"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {asset.status === "premium" ? t("premiumAsset") : asset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
