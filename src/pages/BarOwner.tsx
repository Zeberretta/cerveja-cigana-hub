import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Store, Star, Search, ShoppingCart, MapPin, Filter } from "lucide-react";

const BarOwner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-8 h-8 text-hero" />
            <h1 className="text-2xl font-bold text-foreground">Dono de Bar</h1>
          </div>
          <Button asChild variant="outline">
            <Link to="/">Voltar</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="mb-4 bg-hero/10 text-hero border-hero/20">
            Marketplace Cervejeiro
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Encontre as Melhores
            <span className="block text-hero">Cervejas Artesanais</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Plataforma completa para escolher cervejas com informações detalhadas, 
            reviews de especialistas e pedidos simplificados.
          </p>
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Explorar Catálogo
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Recursos para Bares
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Search className="w-10 h-10 text-hero mb-2" />
                <CardTitle>Busca Avançada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Encontre cervejas por estilo, IBU, ABV, região e muito mais.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-hero" />
                    Filtros personalizados
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-hero" />
                    Busca por localização
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Reviews & Avaliações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Avaliações detalhadas de especialistas e outros donos de bar.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    Notas por categoria
                  </li>
                  <li className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-primary" />
                    Reviews de peers
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <ShoppingCart className="w-10 h-10 text-accent mb-2" />
                <CardTitle>Pedidos Simplificados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Sistema de pedidos integrado com logística otimizada.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-accent" />
                    Carrinho inteligente
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    Entrega programada
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beer Showcase */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Estilos Mais Populares
            </h3>
            <p className="text-xl text-muted-foreground">
              Descubra os estilos que mais vendem
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-hero/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-hero" />
                </div>
                <h4 className="font-semibold mb-2">IPA</h4>
                <p className="text-sm text-muted-foreground mb-3">India Pale Ale</p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Pilsen</h4>
                <p className="text-sm text-muted-foreground mb-3">Pilsener</p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">4.6</span>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-brewery/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-brewery" />
                </div>
                <h4 className="font-semibold mb-2">Weiss</h4>
                <p className="text-sm text-muted-foreground mb-3">Cerveja de Trigo</p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">4.7</span>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Stout</h4>
                <p className="text-sm text-muted-foreground mb-3">Cerveja Escura</p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">4.5</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Por Que Escolher Nossa Plataforma?
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-hero mb-2">500+</div>
                <p className="text-muted-foreground mb-2">Cervejas Disponíveis</p>
                <p className="text-sm text-muted-foreground">De diversas cervejarias artesanais</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground mb-2">Cervejarias Parceiras</p>
                <p className="text-sm text-muted-foreground">Qualidade garantida e variedade</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">24h</div>
                <p className="text-muted-foreground mb-2">Entrega Rápida</p>
                <p className="text-sm text-muted-foreground">Logística otimizada para bares</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-foreground">
            Transforme Seu Bar com as Melhores Cervejas
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Acesse nosso catálogo completo e descubra cervejas que vão impressionar seus clientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Cadastrar Meu Bar
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Ver Catálogo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BarOwner;