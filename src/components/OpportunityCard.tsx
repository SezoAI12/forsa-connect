import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, DollarSign, Clock, BarChart3 } from "lucide-react";

interface OpportunityCardProps {
  id: string;
  title: string;
  category: string;
  demandScore: number;
  competition: string;
  startupCost: number;
  timeToFirstClient: string;
  incomeMin: number;
  incomeMax: number;
  targetClients: string;
  isFeatured?: boolean;
  slug: string;
}

const categoryColors: Record<string, string> = {
  ai_services: "bg-info/10 text-info",
  freelance_services: "bg-primary/10 text-primary",
  automation_services: "bg-accent/10 text-accent",
  digital_arbitrage: "bg-destructive/10 text-destructive",
  micro_saas: "bg-warning/10 text-warning",
};

export default function OpportunityCard({
  title, category, demandScore, competition, startupCost,
  timeToFirstClient, incomeMin, incomeMax, targetClients, isFeatured, slug,
}: OpportunityCardProps) {
  const { t } = useTranslation();

  const demandColor = demandScore >= 80 ? "text-success" : demandScore >= 60 ? "text-warning" : "text-muted-foreground";

  return (
    <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
      {isFeatured && (
        <div className="absolute right-3 top-3">
          <Badge className="bg-accent text-accent-foreground">{t("opportunity.featured")}</Badge>
        </div>
      )}
      <CardContent className="p-6">
        <Badge variant="secondary" className={categoryColors[category] || "bg-secondary text-secondary-foreground"}>
          {t(`categories.${category}`)}
        </Badge>

        <h3 className="mt-3 text-lg font-bold leading-tight text-foreground">{title}</h3>

        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span>{targetClients}</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <BarChart3 className={`h-4 w-4 ${demandColor}`} />
            <div>
              <p className="text-xs text-muted-foreground">{t("opportunity.demandScore")}</p>
              <p className={`text-sm font-bold ${demandColor}`}>{demandScore}/100</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">{t("opportunity.competition")}</p>
              <p className="text-sm font-semibold capitalize text-foreground">{competition}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">{t("opportunity.startupCost")}</p>
              <p className="text-sm font-semibold text-foreground">
                {startupCost === 0 ? t("opportunity.free") : `$${startupCost}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">{t("opportunity.timeToClient")}</p>
              <p className="text-sm font-semibold text-foreground">{timeToFirstClient}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-primary/5 p-3">
          <p className="text-xs text-muted-foreground">{t("opportunity.incomePotential")}</p>
          <p className="text-lg font-extrabold text-primary">
            ${incomeMin.toLocaleString()} – ${incomeMax.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground">{t("opportunity.perMonth")}</span>
          </p>
        </div>

        <Link to={`/opportunity/${slug}`} className="mt-4 block">
          <Button className="w-full" variant="outline">
            {t("opportunity.viewDetails")}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
