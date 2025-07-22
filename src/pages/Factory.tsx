import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Factory, Calendar, Users, TrendingUp, Clock, Settings } from "lucide-react";

const FactoryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Factory className="w-8 h-8 text-brewery" />
            <h1 className="text-2xl font-bold text-foreground">Fábrica</h1>
          </div>
          <Button asChild variant="outline">
            <Link to="/">Voltar</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="mb-4 bg-brewery/10 text-brewery border-brewery/20">
            Otimização de Produção
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Maximize Sua Capacidade
            <span className="block text-brewery">de Produção</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Gerencie múltiplos ciganos em sua agenda sem se preocupar com insumos. 
            Receba pedidos automaticamente e otimize sua operação.
          </p>
          <Button variant="brewery" size="lg" className="text-lg px-8 py-6">
            Integrar Minha Fábrica
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Recursos para Fábricas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="w-10 h-10 text-brewery mb-2" />
                <CardTitle>Agenda Integrada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Visualize e gerencie todas as produções agendadas em um calendário unificado.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brewery" />
                    Disponibilidade automática
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-brewery" />
                    Configuração personalizada
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Gestão de Ciganos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Acompanhe o histórico e performance de cada cervejaria cigana parceira.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Métricas de performance
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Histórico completo
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-accent mb-2" />
                <CardTitle>Dashboard Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Relatórios detalhados sobre utilização da capacidade e rentabilidade.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    Análise de capacidade
                  </li>
                  <li className="flex items-center gap-2">
                    <Factory className="w-4 h-4 text-accent" />
                    Eficiência operacional
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Production Stats */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Performance da Fábrica
            </h3>
            <p className="text-xl text-muted-foreground">
              Acompanhe métricas essenciais em tempo real
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-brewery mb-2">85%</div>
                <p className="text-muted-foreground">Utilização da Capacidade</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">24</div>
                <p className="text-muted-foreground">Ciganos Ativos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">156</div>
                <p className="text-muted-foreground">Bateladas/Mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-hero mb-2">98%</div>
                <p className="text-muted-foreground">Satisfação Cliente</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-foreground">
            Otimize Sua Produção Hoje
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Conecte-se com cervejarias ciganas e maximize o uso da sua capacidade produtiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="brewery" size="lg" className="text-lg px-8 py-6">
              Cadastrar Fábrica
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FactoryPage;