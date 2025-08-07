import { Suspense, lazy } from "react";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const PersonaSection = lazy(() => import("@/components/PersonaSection"));
const BenefitsSection = lazy(() => import("@/components/BenefitsSection"));
const CTASection = lazy(() => import("@/components/CTASection"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Seo title="Cerveja Cigana Hub | Conecte Cervejarias, Fábricas e Fornecedores" description="Plataforma que conecta cervejarias ciganas, fábricas, fornecedores e bares. Gestão, produção e marketplace do ecossistema cervejeiro." />
      <HeroSection />
      <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-12">Carregando...</div>}>
        <PersonaSection />
        <BenefitsSection />
        <CTASection />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Index;