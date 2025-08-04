import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Calendar, Package, BarChart3, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const CervejariaCigana = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-hero to-accent">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Cervejaria Cigana
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Transforme sua receita em realidade sem investir em equipamentos. 
            Nossa plataforma conecta você com fábricas certificadas e fornecedores confiáveis.
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
              <span className="block text-primary">Cervejarias Ciganas</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-4">Baixo Investimento</h3>
                <p className="text-muted-foreground">
                  Produza sua cerveja sem investir milhões em equipamentos. 
                  Use fábricas já certificadas e otimizadas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-4">Agendamento Flexível</h3>
                <p className="text-muted-foreground">
                  Agende sua produção conforme sua demanda. 
                  Sistema integrado de calendário com fábricas parceiras.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Package className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-4">Insumos Diretos</h3>
                <p className="text-muted-foreground">
                  Compre insumos que são entregues diretamente na fábrica. 
                  Otimize custos e logística.
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
              Seu Dashboard Personalizado
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Gerencie toda sua operação em um só lugar
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
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Analytics
                      </Badge>
                      <div>
                        <p className="font-semibold">Dashboard de Vendas</p>
                        <p className="text-sm text-muted-foreground">Acompanhe performance de cada receita</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        Produção
                      </Badge>
                      <div>
                        <p className="font-semibold">Agenda Integrada</p>
                        <p className="text-sm text-muted-foreground">Visualize slots disponíveis em tempo real</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <Package className="w-3 h-3 mr-1" />
                        Insumos
                      </Badge>
                      <div>
                        <p className="font-semibold">Central de Compras</p>
                        <p className="text-sm text-muted-foreground">Compare preços e faça cotações</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Comunicação
                      </Badge>
                      <div>
                        <p className="font-semibold">Chat Integrado</p>
                        <p className="text-sm text-muted-foreground">Converse com fábricas e fornecedores</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6">
                  <h4 className="font-bold mb-4">Exemplo de Uso</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-background rounded border">
                      <span>IPA Tropical - Batch #23</span>
                      <Badge variant="outline">Em Produção</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded border">
                      <span>Pilsen Premium - Batch #24</span>
                      <Badge variant="secondary">Agendado</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded border">
                      <span>Stout Imperial - Batch #25</span>
                      <Badge>Cotando</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-hero to-accent">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para Começar sua Jornada?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de cervejeiros que já estão produzindo suas receitas 
            com nossa plataforma.
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

export default CervejariaCigana;