import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Zap } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              Forsa
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t("footer.product")}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/opportunities" className="hover:text-foreground transition-colors">{t("nav.opportunities")}</Link>
              <Link to="/pricing" className="hover:text-foreground transition-colors">{t("nav.pricing")}</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t("footer.company")}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">{t("footer.about")}</a>
              <a href="#" className="hover:text-foreground transition-colors">{t("footer.blog")}</a>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t("footer.legal")}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">{t("footer.privacy")}</a>
              <a href="#" className="hover:text-foreground transition-colors">{t("footer.terms")}</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Forsa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
