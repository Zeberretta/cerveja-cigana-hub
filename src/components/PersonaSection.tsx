import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Factory, Users, Package, Store } from "lucide-react";
import { Link } from "react-router-dom";

const personas = [
  {
    id: "gypsy",
    title: "Cervejaria Cigana",
    icon: Users,
    description: "Cote e agende fabricação, compre insumos e oferte suas cervejas com dados completos",
    features: [
      "Cotação e agendamento de fabricação",
      "Compra de insumos direto para fábrica",
      "Marketplace para ofertar cervejas",
      "Gestão de dados de envase e MAPA"
    ],
    color: "primary",
    link: "/cervejaria-cigana"
  },
  {
    id: "factory",
    title: "Fábrica",
    icon: Factory,
    description: "Gerencie múltiplos ciganos em sua agenda sem se preocupar com insumos",
    features: [
      "Agenda integrada de produção",
      "Gestão de múltiplos ciganos",
      "Recebimento automático de insumos",
      "Dashboard de performance"
    ],
    color: "brewery",
    link: "/fabrica"
  },
  {
    id: "supplier",
    title: "Fornecedor de Insumos",
    icon: Package,
    description: "Receba pedidos de forma prática e automatizada",
    features: [
      "Central de pedidos unificada",
      "Entrega direta nas fábricas",
      "Gestão de estoque inteligente",
      "Relatórios de vendas"
    ],
    color: "accent",
    link: "/fornecedor"
  },
  {
    id: "bar",
    title: "Dono de Bar",
    icon: Store,
    description: "Plataforma completa para escolher cervejas com informações detalhadas",
    features: [
      "Catálogo completo de cervejas",
      "Reviews e avaliações",
      "Informações de fabricação",
      "Pedidos simplificados"
    ],
    color: "hero",
    link: "/bar"
  }
];

const PersonaSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Uma Plataforma,
            <span className="block text-primary">Quatro Soluções</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada perfil de usuário tem uma experiência personalizada, 
            otimizada para suas necessidades específicas no mercado cervejeiro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {personas.map((persona, index) => (
            <Card 
              key={persona.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50"
            >
              <CardContent className="p-8 text-center flex flex-col h-full">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-${persona.color} to-${persona.color}/70 flex items-center justify-center`}>
                  <persona.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {persona.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {persona.description}
                </p>
                
                <ul className="text-left space-y-2 mb-6 flex-grow">
                  {persona.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors mt-auto">
                  <Link to={persona.link}>Saiba Mais</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonaSection;