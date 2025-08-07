import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-primary via-hero to-accent">
      <div className="max-w-7xl mx-auto px-6">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Pronto Para Revolucionar
              <span className="block text-primary">Seu Negócio?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Junte-se aos pioneiros que estão transformando o mercado cervejeiro brasileiro. 
              Seja parte dessa revolução tecnológica.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6 hover-scale">
                Cadastre-se Grátis
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 hover-scale">
                <Link to="/contato">Agendar Demo</Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              * Sem compromisso. Cancele quando quiser.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;