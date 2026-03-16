import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import AppShell from "@/components/AppShell";
import DashboardPage from "@/pages/DashboardPage";
import RadarPage from "@/pages/RadarPage";
import MarketplacePage from "@/pages/MarketplacePage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <I18nProvider>
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/radar" element={<RadarPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
