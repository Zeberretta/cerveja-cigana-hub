import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import AuthGuard from "@/components/AuthGuard";
import Header from "@/components/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GypsyBrewery from "./pages/GypsyBrewery";
import Factory from "./pages/Factory";
import Supplier from "./pages/Supplier";
import BarOwner from "./pages/BarOwner";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import SaibaMais from "./pages/SaibaMais";
import Contato from "./pages/Contato";
import CervejariaCigana from "./pages/perfis/CervejariaCigana";
import FabricaProfile from "./pages/perfis/FabricaProfile";
import FornecedorProfile from "./pages/perfis/FornecedorProfile";
import BarProfile from "./pages/perfis/BarProfile";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<AuthGuard requireAdmin><Admin /></AuthGuard>} />
              <Route path="/saiba-mais" element={<SaibaMais />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/privacidade" element={<Privacidade />} />
              <Route path="/termos" element={<Termos />} />
              <Route path="/perfil/cervejaria-cigana" element={<CervejariaCigana />} />
              <Route path="/perfil/fabrica" element={<FabricaProfile />} />
              <Route path="/perfil/fornecedor" element={<FornecedorProfile />} />
              <Route path="/perfil/bar" element={<BarProfile />} />
              <Route path="/cervejaria-cigana" element={<AuthGuard><GypsyBrewery /></AuthGuard>} />
              <Route path="/fabrica" element={<AuthGuard><Factory /></AuthGuard>} />
              <Route path="/fornecedor" element={<AuthGuard><Supplier /></AuthGuard>} />
              <Route path="/bar" element={<AuthGuard><BarOwner /></AuthGuard>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
