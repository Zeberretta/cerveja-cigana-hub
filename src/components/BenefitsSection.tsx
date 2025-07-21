import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Clock, Shield, Zap } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Crescimento Acelerado",
    description: "Expanda sua rede de contatos e oportunidades de negócio com conexões diretas entre todos os players do mercado."
  },
  {
    icon: Clock,
    title: "Eficiência Operacional",
    description: "Reduza tempo gasto em negociações e burocracias com processos automatizados e integrados."
  },
  {
    icon: Shield,
    title: "Transparência Total",
    description: "Todas as informações sobre fabricação, qualidade e certificações em um só lugar, garantindo confiança."
  },
  {
    icon: Zap,
    title: "Inovação Contínua",
    description: "Plataforma em constante evolução, com novas funcionalidades baseadas no feedback dos usuários."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Por Que Escolher Nossa
            <span className="block text-primary">Plataforma?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Desenvolvida especificamente para o mercado cervejeiro brasileiro, 
            nossa plataforma oferece soluções que realmente fazem a diferença.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 flex items-start space-x-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-hero flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;