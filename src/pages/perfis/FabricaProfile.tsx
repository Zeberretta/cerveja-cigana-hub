import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Factory, Calendar, Users, TrendingUp, BarChart3, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const FabricaProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-brewery via-primary to-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Factory className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fábrica de Cerveja
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Maximize sua capacidade produtiva conectando-se com cervejeiros talentosos. 
            Gerencie múltiplos clientes em uma agenda integrada e otimizada.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link to="/auth">Começar Agora</Link>
          </Button>
        </div>
      </section>

      {/* Vantagens */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Vantagens Exclusivas para
              <span className="block text-brewery">Fábricas de Cerveja</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-brewery/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-brewery" />
                <h3 className="text-xl font-bold mb-4">Agenda Otimizada</h3>
                <p className="text-muted-foreground">
                  Sistema inteligente de agendamento que maximiza sua capacidade produtiva 
                  sem conflitos ou tempos ociosos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-brewery/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-brewery" />
                <h3 className="text-xl font-bold mb-4">Múltiplos Clientes</h3>
                <p className="text-muted-foreground">
                  Gerencie dezenas de cervejarias ciganas em uma única plataforma. 
                  Cada cliente com suas receitas e especificações.
                </p>
              </CardContent>
            </Card>

            <Card className="border-brewery/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-brewery" />
                <h3 className="text-xl font-bold mb-4">Receita Garantida</h3>
                <p className="text-muted-foreground">
                  Pagamentos automáticos e garantidos. Sistema de cobrança integrado 
                  com relatórios financeiros detalhados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Central de Controle da Produção
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tenha visibilidade completa de toda sua operação
            </p>
          </div>

          <Card className="max-w-5xl mx-auto shadow-2xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Funcionalidades</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        Agenda
                      </Badge>
                      <div>
                        <p className="font-semibold">Calendário Integrado</p>
                        <p className="text-sm text-muted-foreground">Visualize toda produção em timeline</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Relatórios
                      </Badge>
                      <div>
                        <p className="font-semibold">Dashboard Financeiro</p>
                        <p className="text-sm text-muted-foreground">Acompanhe faturamento por cliente</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <Users className="w-3 h-3 mr-1" />
                        Clientes
                      </Badge>
                      <div>
                        <p className="font-semibold">Gestão de Cervejarias</p>
                        <p className="text-sm text-muted-foreground">Perfil completo de cada parceiro</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <Settings className="w-3 h-3 mr-1" />
                        Controle
                      </Badge>
                      <div>
                        <p className="font-semibold">Gestão de Receitas</p>
                        <p className="text-sm text-muted-foreground">Biblioteca de todas as formulações</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-brewery/10 to-primary/10 rounded-lg p-6">
                  <h4 className="font-bold mb-4">Agenda da Semana</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-background rounded border">
                      <span>Segunda - Cervejaria Alpha</span>
                      <Badge variant="outline">IPA 500L</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded border">
                      <span>Quarta - Cervejaria Beta</span>
                      <Badge variant="secondary">Pilsen 1000L</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded border">
                      <span>Sexta - Cervejaria Gamma</span>
                      <Badge>Stout 750L</Badge>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-background rounded border border-green-200">
                    <p className="text-xs text-green-700">✓ Capacidade otimizada: 89% esta semana</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Processo */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Como Funciona na Prática
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brewery/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-brewery">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Receba Solicitações</h3>
                <p className="text-muted-foreground">
                  Cervejarias ciganas enviam solicitações de produção com receitas 
                  e especificações técnicas detalhadas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brewery/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-brewery">2</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Agende Produção</h3>
                <p className="text-muted-foreground">
                  Use nossa agenda inteligente para otimizar slots de produção 
                  e maximizar sua capacidade operacional.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brewery/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-brewery">3</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Produza & Fature</h3>
                <p className="text-muted-foreground">
                  Execute a produção conforme especificações e receba pagamentos 
                  automaticamente através da plataforma.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-brewery via-primary to-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para Otimizar sua Produção?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Conecte-se com cervejeiros talentosos e maximize sua capacidade produtiva hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link to="/auth">
                Cadastre-se Grátis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contato">Agendar Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FabricaProfile;