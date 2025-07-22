import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Calendar, Package, BarChart3, Clock, MapPin } from "lucide-react";

const GypsyBrewery = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Cervejaria Cigana</h1>
          </div>
          <Button asChild variant="outline">
            <Link to="/">Voltar</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Plataforma Completa para Ciganos
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Gerencie Sua Cervejaria
            <span className="block text-primary">Do Planejamento à Venda</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Cote e agende fabricação, compre insumos direto para fábrica e oferte suas cervejas 
            com dados completos de envase e MAPA.
          </p>
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Começar Gratuitamente
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Funcionalidades Principais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Cotação & Agendamento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Compare preços de diferentes fábricas e agende sua produção com facilidade.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Disponibilidade em tempo real
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    Comparação de preços
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="w-10 h-10 text-brewery mb-2" />
                <CardTitle>Compra de Insumos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Adquira malte, lúpulo e outros insumos com entrega direta na fábrica.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brewery" />
                    Entrega na fábrica
                  </li>
                  <li className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-brewery" />
                    Controle de qualidade
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-accent mb-2" />
                <CardTitle>Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Oferte suas cervejas para bares com informações completas e certificações.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-accent" />
                    Dados de envase
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    Certificação MAPA
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Dashboard Intuitivo
            </h3>
            <p className="text-xl text-muted-foreground">
              Gerencie toda sua operação em um só lugar
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">12</div>
                <p className="text-muted-foreground">Receitas Cadastradas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brewery mb-2">5</div>
                <p className="text-muted-foreground">Produções Agendadas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">28</div>
                <p className="text-muted-foreground">Bares Conectados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-foreground">
            Pronto para Revolucionar Sua Cervejaria?
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se a centenas de cervejarias ciganas que já usam nossa plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Criar Conta Gratuita
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Agendar Demonstração
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GypsyBrewery;