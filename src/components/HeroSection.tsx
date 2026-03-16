import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(160,84%,39%,0.15),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(38,92%,50%,0.1),_transparent_50%)]" />

      <div className="container relative py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="secondary" className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-1.5">
            {t("hero.badge")}
          </Badge>

          <h1 className="font-display text-4xl font-black leading-tight tracking-tight md:text-6xl">
            {t("hero.title")}
          </h1>

          <p className="mt-6 text-lg text-muted-foreground md:text-xl" style={{ color: "hsl(220, 14%, 70%)" }}>
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/opportunities">
              <Button size="lg" className="gap-2 px-8 text-base font-semibold">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-3xl font-black">50+</span>
              </div>
              <p className="mt-1 text-sm" style={{ color: "hsl(220, 14%, 55%)" }}>{t("hero.stats.opportunities")}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <DollarSign className="h-5 w-5 text-accent" />
                <span className="text-3xl font-black">$3k+</span>
              </div>
              <p className="mt-1 text-sm" style={{ color: "hsl(220, 14%, 55%)" }}>{t("hero.stats.avgIncome")}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-3xl font-black">87%</span>
              </div>
              <p className="mt-1 text-sm" style={{ color: "hsl(220, 14%, 55%)" }}>{t("hero.stats.successRate")}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
