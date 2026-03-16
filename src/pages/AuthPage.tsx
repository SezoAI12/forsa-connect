import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

type Mode = "login" | "register";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    if (mode === "register" && !form.name) {
      setError("Please enter your name");
      return;
    }
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form.email, form.name, form.password);
      }
      navigate("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center glow-green mx-auto mb-4">
            <span className="text-primary-foreground font-bold font-mono text-2xl">F</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Forsa IQ</h1>
          <p className="text-muted-foreground text-sm mt-1 font-mono">OPPORTUNITY INTELLIGENCE PLATFORM</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-xl border border-border bg-card"
        >
          {/* Mode toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden mb-6">
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-2.5 text-sm font-medium font-mono uppercase tracking-wider transition-all ${
                  mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full bg-input border border-border rounded-md px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full bg-input border border-border rounded-md px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full bg-input border border-border rounded-md px-4 py-2.5 pe-11 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive font-mono bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="tactical"
              className="w-full mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </div>
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {mode === "register" && (
            <p className="text-xs text-muted-foreground text-center mt-4">
              Free account includes opportunity previews and demand scores. Unlock blueprints for $29 each or upgrade to Pro.
            </p>
          )}
        </motion.div>

        {/* Demo hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 p-4 rounded-lg border border-primary/20 bg-primary/5 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-xs text-primary font-mono mb-2">
            <Zap className="w-3 h-3" />
            QUICK DEMO
          </div>
          <p className="text-xs text-muted-foreground mb-3">Try with any email/password to explore the platform</p>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={async () => {
              await login("demo@forsaiq.com", "demo");
              navigate("/dashboard");
            }}
          >
            Enter as Demo User
          </Button>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">
            ← Back to Home
          </button>
        </p>
      </div>
    </div>
  );
}
