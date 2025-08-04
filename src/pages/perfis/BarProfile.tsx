import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, Star, Search, ShoppingCart, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const BarProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-hero via-accent to-primary">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Dono de Bar
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Descubra cervejas artesanais exclusivas com informações completas de fabricação. 
            Ofereça experiências únicas aos seus clientes com nosso catálogo especializado.
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
              <span className="block text-hero">Donos de Bar</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-hero/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 mx-auto mb-4 text-hero" />
                <h3 className="text-xl font-bold mb-4">Catálogo Completo</h3>
                <p className="text-muted-foreground">
                  Acesse centenas de cervejas artesanais com informações detalhadas 
                  de fabricação, ingredientes e características sensoriais.
                </p>
              </CardContent>
            </Card>

            <Card className="border-hero/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-hero" />
                <h3 className="text-xl font-bold mb-4">Reviews Verificados</h3>
                <p className="text-muted-foreground">
                  Leia avaliações de outros bares e clientes. Tome decisões 
                  informadas baseadas em experiências reais.
                </p>
              </CardContent>
            </Card>

            <Card className="border-hero/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-hero" />
                <h3 className="text-xl font-bold mb-4">Pedidos Simplificados</h3>
                <p className="text-muted-foreground">
                  Sistema de pedidos integrado com entregas programadas. 
                  Gerencie seu estoque de forma inteligente.
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
              Marketplace de Cervejas Artesanais
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubra e gerencie seu portfólio de cervejas
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
                        <Search className="w-3 h-3 mr-1" />
                        Busca
                      </Badge>
                      <div>
                        <p className="font-semibold">Filtros Avançados</p>
                        <p className="text-sm text-muted-foreground">Por estilo, ABV, região, preço</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <Star className="w-3 h-3 mr-1" />
                        Reviews
                      </Badge>
                      <div>
                        <p className="font-semibold">Avaliações Detalhadas</p>
                        <p className="text-sm text-muted-foreground">Feedback de outros estabelecimentos</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <Users className="w-3 h-3 mr-1" />
                        Cervejarias
                      </Badge>
                      <div>
                        <p className="font-semibold">Perfis Completos</p>
                        <p className="text-sm text-muted-foreground">História e portfólio dos produtores</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Analytics
                      </Badge>
                      <div>
                        <p className="font-semibold">Performance de Vendas</p>
                        <p className="text-sm text-muted-foreground">Acompanhe quais cervejas vendem mais</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-hero/10 to-accent/10 rounded-lg p-6">
                  <h4 className="font-bold mb-4">Cervejas em Destaque</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-background rounded border">
                      <div>
                        <p className="font-medium">IPA Tropical</p>
                        <p className="text-xs text-muted-foreground">Cervejaria Alpha • 6.2% ABV</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs ml-1">4.8 (23 reviews)</span>
                        </div>
                      </div>
                      <Badge variant="outline">R$ 28</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded border">
                      <div>
                        <p className="font-medium">Pilsen Premium</p>
                        <p className="text-xs text-muted-foreground">Cervejaria Beta • 4.8% ABV</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs ml-1">4.6 (45 reviews)</span>
                        </div>
                      </div>
                      <Badge variant="secondary">R$ 22</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded border">
                      <div>
                        <p className="font-medium">Stout Imperial</p>
                        <p className="text-xs text-muted-foreground">Cervejaria Gamma • 8.5% ABV</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs ml-1">4.9 (12 reviews)</span>
                        </div>
                      </div>
                      <Badge>R$ 35</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Diferencial */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              O Que Nos Diferencia
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-foreground">
                Informações Completas de Cada Cerveja
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-hero/20 flex items-center justify-center mt-1">
                    <span className="w-2 h-2 rounded-full bg-hero"></span>
                  </div>
                  <div>
                    <p className="font-semibold">Dados de Fabricação</p>
                    <p className="text-sm text-muted-foreground">Data de produção, fábrica responsável, lote</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-hero/20 flex items-center justify-center mt-1">
                    <span className="w-2 h-2 rounded-full bg-hero"></span>
                  </div>
                  <div>
                    <p className="font-semibold">Ingredientes Detalhados</p>
                    <p className="text-sm text-muted-foreground">Maltes, lúpulos, fermentos e adjuntos utilizados</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-hero/20 flex items-center justify-center mt-1">
                    <span className="w-2 h-2 rounded-full bg-hero"></span>
                  </div>
                  <div>
                    <p className="font-semibold">Análises Sensoriais</p>
                    <p className="text-sm text-muted-foreground">Notas de degustação profissionais</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-hero/20 flex items-center justify-center mt-1">
                    <span className="w-2 h-2 rounded-full bg-hero"></span>
                  </div>
                  <div>
                    <p className="font-semibold">Certificações</p>
                    <p className="text-sm text-muted-foreground">MAPA, certificações orgânicas e especiais</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-hero/5 to-accent/5">
              <CardContent className="p-8">
                <h4 className="text-xl font-bold mb-4">Exemplo de Ficha Técnica</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-muted-foreground">Estilo:</p>
                      <p>American IPA</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">ABV:</p>
                      <p>6.2%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-muted-foreground">IBU:</p>
                      <p>65</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">SRM:</p>
                      <p>8</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Maltes:</p>
                    <p>Pilsen, Crystal 60L, Munich</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Lúpulos:</p>
                    <p>Cascade, Centennial, Citra</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Notas:</p>
                    <p className="text-xs">Aroma cítrico intenso, amargor equilibrado, final seco</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-hero via-accent to-primary">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para Descobrir Cervejas Únicas?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Transforme seu bar em um destino para apreciadores de cerveja artesanal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link to="/auth">
                Explorar Catálogo
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

export default BarProfile;