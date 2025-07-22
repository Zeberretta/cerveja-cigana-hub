import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Package, Truck, BarChart3, Bell, MapPin, CheckCircle } from "lucide-react";

const Supplier = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-8 h-8 text-accent" />
            <h1 className="text-2xl font-bold text-foreground">Fornecedor de Insumos</h1>
          </div>
          <Button asChild variant="outline">
            <Link to="/">Voltar</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            Vendas Automatizadas
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Simplifique Suas Vendas
            <span className="block text-accent">B2B de Insumos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Receba pedidos de forma prática e automatizada. Gerencie seu estoque inteligentemente 
            e entregue diretamente nas fábricas.
          </p>
          <Button variant="default" size="lg" className="text-lg px-8 py-6 bg-accent hover:bg-accent/90">
            Começar a Vender
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Recursos para Fornecedores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Bell className="w-10 h-10 text-accent mb-2" />
                <CardTitle>Central de Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Receba todos os pedidos em uma central unificada com notificações automáticas.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-accent" />
                    Alertas em tempo real
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    Confirmação automática
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Entrega Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Otimize rotas de entrega direto para as fábricas com rastreamento completo.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Otimização de rotas
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" />
                    Rastreamento em tempo real
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-brewery mb-2" />
                <CardTitle>Gestão de Estoque</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Controle inteligente de estoque com previsão de demanda e alertas de reposição.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-brewery" />
                    Previsão de demanda
                  </li>
                  <li className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-brewery" />
                    Alertas de estoque baixo
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Categorias de Produtos
            </h3>
            <p className="text-xl text-muted-foreground">
              Gerencie todos os tipos de insumos cervejeiros
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Package className="w-12 h-12 text-accent mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Maltes</h4>
                <p className="text-sm text-muted-foreground">Base, especiais e caramelos</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Package className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Lúpulos</h4>
                <p className="text-sm text-muted-foreground">Amargor, aroma e sabor</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Package className="w-12 h-12 text-brewery mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Leveduras</h4>
                <p className="text-sm text-muted-foreground">Ale, lager e especiais</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Package className="w-12 h-12 text-hero mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Adjuntos</h4>
                <p className="text-sm text-muted-foreground">Açúcares, frutas e especiarias</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sales Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Performance de Vendas
            </h3>
            <p className="text-xl text-muted-foreground">
              Acompanhe o crescimento do seu negócio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">R$ 2.1M</div>
                <p className="text-muted-foreground">Vendas Este Mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">147</div>
                <p className="text-muted-foreground">Pedidos Processados</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-brewery mb-2">96%</div>
                <p className="text-muted-foreground">Entregas no Prazo</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-foreground">
            Expanda Suas Vendas no Mercado Cervejeiro
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Conecte-se com centenas de cervejarias e fábricas em todo o país.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" className="text-lg px-8 py-6 bg-accent hover:bg-accent/90">
              Cadastrar Produtos
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Conhecer Plataforma
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Supplier;