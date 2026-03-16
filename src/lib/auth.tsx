import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  plan: "free" | "pro";
  purchasedOpportunities: string[];
  savedOpportunities: string[];
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, _password: string) => Promise<void>;
  register: (email: string, name: string, _password: string) => Promise<void>;
  logout: () => void;
  purchaseOpportunity: (id: string) => void;
  toggleSaveOpportunity: (id: string) => void;
  upgradeToPro: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUser({
      id: "user-1",
      email,
      name: email.split("@")[0],
      plan: "free",
      purchasedOpportunities: [],
      savedOpportunities: [],
      joinedAt: new Date().toISOString(),
    });
    setIsLoading(false);
  };

  const register = async (email: string, name: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUser({
      id: "user-" + Date.now(),
      email,
      name,
      plan: "free",
      purchasedOpportunities: [],
      savedOpportunities: [],
      joinedAt: new Date().toISOString(),
    });
    setIsLoading(false);
  };

  const logout = () => setUser(null);

  const purchaseOpportunity = (id: string) => {
    if (!user) return;
    setUser((prev) =>
      prev
        ? { ...prev, purchasedOpportunities: [...new Set([...prev.purchasedOpportunities, id])] }
        : prev
    );
  };

  const toggleSaveOpportunity = (id: string) => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return prev;
      const saved = prev.savedOpportunities.includes(id)
        ? prev.savedOpportunities.filter((s) => s !== id)
        : [...prev.savedOpportunities, id];
      return { ...prev, savedOpportunities: saved };
    });
  };

  const upgradeToPro = () => {
    setUser((prev) => (prev ? { ...prev, plan: "pro" } : prev));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, purchaseOpportunity, toggleSaveOpportunity, upgradeToPro, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
