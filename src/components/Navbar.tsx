import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, Zap } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          Forsa
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          <Link to="/">
            <Button variant="ghost" size="sm">{t("nav.home")}</Button>
          </Link>
          <Link to="/opportunities">
            <Button variant="ghost" size="sm">{t("nav.opportunities")}</Button>
          </Link>
          <Link to="/pricing">
            <Button variant="ghost" size="sm">{t("nav.pricing")}</Button>
          </Link>
          {user && (
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">{t("nav.dashboard")}</Button>
            </Link>
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" onClick={toggleLanguage} title="Toggle language">
            <Globe className="h-4 w-4" />
          </Button>
          {user ? (
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              {t("nav.logout")}
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">{t("nav.login")}</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">{t("nav.signup")}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">{t("nav.home")}</Button>
            </Link>
            <Link to="/opportunities" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">{t("nav.opportunities")}</Button>
            </Link>
            <Link to="/pricing" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">{t("nav.pricing")}</Button>
            </Link>
            {user && (
              <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">{t("nav.dashboard")}</Button>
              </Link>
            )}
            <Button variant="ghost" className="w-full justify-start" onClick={toggleLanguage}>
              <Globe className="mr-2 h-4 w-4" /> {language === "en" ? "العربية" : "English"}
            </Button>
            {user ? (
              <Button variant="outline" onClick={() => { signOut(); setMobileOpen(false); }}>
                {t("nav.logout")}
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full">{t("nav.login")}</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">{t("nav.signup")}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
