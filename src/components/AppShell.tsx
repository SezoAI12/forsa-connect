import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard, Library, Bell, LogOut,
  Menu, X, Crown, User, TrendingUp, DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

const FULL_WIDTH_ROUTES = ["/", "/auth", "/pricing"];

export default function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isFullWidth = FULL_WIDTH_ROUTES.includes(location.pathname);

  if (isFullWidth) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/90 backdrop-blur-sm flex items-center px-6">
          <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
            <button onClick={() => navigate("/")} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center glow-green">
                <span className="text-primary-foreground font-bold font-mono text-sm">F</span>
              </div>
              <span className="font-bold text-foreground">Forsa IQ</span>
            </button>
            <nav className="hidden md:flex items-center gap-1">
              {[{ label: "Opportunities", path: "/opportunities" }, { label: "Pricing", path: "/pricing" }].map((item) => (
                <button key={item.path} onClick={() => navigate(item.path)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary">
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              {user ? (
                <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>Sign In</Button>
                  <Button variant="default" size="sm" onClick={() => navigate("/auth")}>Get Started</Button>
                </>
              )}
            </div>
          </div>
        </header>
        <div className="pt-16">{children}</div>
      </>
    );
  }

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/opportunities", label: "Opportunities", icon: Library },
    { path: "/signals", label: "Weekly Signals", icon: Bell },
    { path: "/pricing", label: "Pricing", icon: DollarSign },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={cn(
        "fixed inset-y-0 start-0 z-50 w-64 border-e border-border bg-card flex flex-col transition-transform duration-200",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-5 border-b border-border flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-primary flex items-center justify-center glow-green">
              <span className="text-primary-foreground font-bold font-mono">F</span>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Forsa IQ</p>
              <p className="text-[10px] font-mono text-muted-foreground">v1.0 MVP</p>
            </div>
          </button>
          <button className="md:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {user && (
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/40">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                {user.plan === "pro" ? (
                  <span className="text-[10px] font-mono text-primary flex items-center gap-1"><Crown className="w-2.5 h-2.5" /> PRO</span>
                ) : (
                  <span className="text-[10px] font-mono text-muted-foreground">FREE PLAN</span>
                )}
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            return (
              <button key={item.path} onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all",
                  isActive ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}>
                <item.icon className="w-4 h-4" />
                {item.label}
                {item.path === "/signals" && (
                  <span className="ms-auto text-[10px] bg-primary/20 text-primary font-mono px-1.5 py-0.5 rounded">NEW</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          {user?.plan === "free" && (
            <button onClick={() => navigate("/pricing")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-primary/30 bg-primary/5 text-sm text-primary font-medium hover:bg-primary/10 transition-colors">
              <Crown className="w-4 h-4" />
              Upgrade to Pro
              <TrendingUp className="w-4 h-4 ms-auto" />
            </button>
          )}
          {user ? (
            <button onClick={() => { logout(); navigate("/"); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          ) : (
            <Button variant="default" size="sm" className="w-full" onClick={() => navigate("/auth")}>Sign In</Button>
          )}
        </div>
      </aside>

      <div className="flex-1 md:ms-64 flex flex-col min-h-screen">
        <header className="md:hidden sticky top-0 z-30 h-14 border-b border-border bg-background/90 backdrop-blur-sm flex items-center px-4 gap-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold font-mono text-xs">F</span>
            </div>
            <span className="font-bold text-foreground text-sm">Forsa IQ</span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
