import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Radar, ShoppingCart, LayoutDashboard, Globe } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const { t, lang, setLang } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: t("dashboard"), icon: LayoutDashboard },
    { path: "/radar", label: t("opportunityRadar"), icon: Radar },
    { path: "/marketplace", label: t("marketplace"), icon: ShoppingCart },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 start-0 z-50 w-64 border-e border-border bg-card flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center glow-green">
              <span className="text-primary-foreground font-bold font-mono text-lg">F</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{t("appName")}</h1>
              <p className="text-xs font-mono text-muted-foreground">v4.0.0-PRO</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all touch-target ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Language Toggle */}
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="w-full gap-2"
          >
            <Globe className="w-4 h-4" />
            {lang === "ar" ? "English" : "العربية"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ms-64">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
