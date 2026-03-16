import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/AuthPage";
import OpportunitiesPage from "@/pages/OpportunitiesPage";
import OpportunityDetailPage from "@/pages/OpportunityDetailPage";
import ExecutionBlueprintPage from "@/pages/ExecutionBlueprintPage";
import UserDashboardPage from "@/pages/UserDashboardPage";
import WeeklySignalsPage from "@/pages/WeeklySignalsPage";
import PricingPage from "@/pages/PricingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/opportunities" element={<OpportunitiesPage />} />
              <Route path="/opportunity/:id" element={<OpportunityDetailPage />} />
              <Route path="/opportunity/:id/execute" element={<ExecutionBlueprintPage />} />
              <Route path="/dashboard" element={<UserDashboardPage />} />
              <Route path="/signals" element={<WeeklySignalsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
