import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-brewery.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          Conectando Todo o
          <span className="block bg-gradient-to-r from-primary to-hero bg-clip-text text-transparent">
            Ecossistema Cervejeiro
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          A plataforma que une cervejarias ciganas, fábricas, fornecedores e bares 
          em um só lugar. Simplifique sua operação e expanda seus negócios.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="hero" 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate('/auth')}
          >
            Começar Agora
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            Saiba Mais
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;