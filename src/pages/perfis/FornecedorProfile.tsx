import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, BarChart3, Clock, MapPin, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const FornecedorProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-accent via-primary to-brewery">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fornecedor de Insumos
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Conecte-se diretamente com produtores e cervejarias. Receba pedidos automatizados 
            e gerencie entregas de forma inteligente em todo o Brasil.
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
              <span className="block text-accent">Fornecedores</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-accent/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-4">Pedidos Automatizados</h3>
                <p className="text-muted-foreground">
                  Receba pedidos diretamente da plataforma com todas as especificações 
                  técnicas e prazos de entrega definidos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Truck className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-4">Entrega Direta</h3>
                <p className="text-muted-foreground">
                  Entregue insumos diretamente nas fábricas parceiras. 
                  Sistema de logística otimizada para reduzir custos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-4">Gestão Inteligente</h3>
                <p className="text-muted-foreground">
                  Relatórios detalhados de vendas, previsão de demanda 
                  e análise de performance por região.
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
              Central de Vendas e Logística
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Gerencie todo seu portfólio de produtos e vendas
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
                        <Package className="w-3 h-3 mr-1" />
                        Catálogo
                      </Badge>
                      <div>
                        <p className="font-semibold">Gestão de Produtos</p>
                        <p className="text-sm text-muted-foreground">Cadastre e gerencie todo seu estoque</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Pedidos
                      </Badge>
                      <div>
                        <p className="font-semibold">Central de Pedidos</p>
                        <p className="text-sm text-muted-foreground">Receba e processe pedidos automaticamente</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <Truck className="w-3 h-3 mr-1" />
                        Logística
                      </Badge>
                      <div>
                        <p className="font-semibold">Controle de Entregas</p>
                        <p className="text-sm text-muted-foreground">Rastreamento completo até o destino</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Analytics
                      </Badge>
                      <div>
                        <p className="font-semibold">Relatórios de Vendas</p>
                        <p className="text-sm text-muted-foreground">Insights detalhados de performance</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg p-6">
                  <h4 className="font-bold mb-4">Pedidos Recentes</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-background rounded border">
                      <div>
                        <p className="font-medium">Malte Pilsen - 500kg</p>
                        <p className="text-xs text-muted-foreground">Fábrica Alpha • SP</p>
                      </div>
                      <Badge variant="outline">Enviado</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded border">
                      <div>
                        <p className="font-medium">Lúpulo Cascade - 5kg</p>
                        <p className="text-xs text-muted-foreground">Fábrica Beta • RJ</p>
                      </div>
                      <Badge variant="secondary">Preparando</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded border">
                      <div>
                        <p className="font-medium">Fermento S-04 - 50un</p>
                        <p className="text-xs text-muted-foreground">Fábrica Gamma • MG</p>
                      </div>
                      <Badge>Novo</Badge>
                    </div>
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
              Fluxo Simplificado de Vendas
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-accent">1</span>
                </div>
                <h3 className="font-bold mb-2">Receba Pedidos</h3>
                <p className="text-sm text-muted-foreground">
                  Cervejarias fazem pedidos automaticamente através da plataforma
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-accent">2</span>
                </div>
                <h3 className="font-bold mb-2">Confirme Estoque</h3>
                <p className="text-sm text-muted-foreground">
                  Verifique disponibilidade e confirme prazo de entrega
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-accent">3</span>
                </div>
                <h3 className="font-bold mb-2">Prepare Entrega</h3>
                <p className="text-sm text-muted-foreground">
                  Organize logística para entrega direta na fábrica parceira
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-accent">4</span>
                </div>
                <h3 className="font-bold mb-2">Receba Pagamento</h3>
                <p className="text-sm text-muted-foreground">
                  Pagamentos automáticos após confirmação de entrega
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefícios Extras */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Benefícios Adicionais
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <Clock className="w-12 h-12 mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-4">Previsibilidade</h3>
                <p className="text-muted-foreground">
                  Sistema de previsão de demanda baseado em dados históricos 
                  e agendamentos futuros das fábricas parceiras.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <MapPin className="w-12 h-12 mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-4">Alcance Nacional</h3>
                <p className="text-muted-foreground">
                  Expanda seus negócios para todo o Brasil através da nossa 
                  rede de fábricas parceiras em diferentes regiões.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-accent via-primary to-brewery">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para Expandir suas Vendas?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Conecte-se com centenas de produtores e aumente sua receita através da nossa plataforma.
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

export default FornecedorProfile;