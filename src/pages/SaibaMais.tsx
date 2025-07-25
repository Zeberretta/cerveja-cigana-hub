import { Mail, Phone, MapPin, Users, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SaibaMais = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Sobre Nossa Iniciativa
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conectamos o ecossistema cervejeiro brasileiro, facilitando a produção artesanal 
            e fortalecendo parcerias entre cervejarias ciganas, fábricas e fornecedores.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-4">Nossa Missão</h3>
              <p className="text-muted-foreground">
                Facilitar a produção de cervejas artesanais conectando cervejeiros 
                com fábricas qualificadas e fornecedores confiáveis.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-4">Para Quem</h3>
              <p className="text-muted-foreground">
                Cervejarias ciganas, fábricas terceirizadas, fornecedores de insumos 
                e donos de bares que buscam produtos únicos.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-4">Nossa Visão</h3>
              <p className="text-muted-foreground">
                Criar um ecossistema colaborativo onde a paixão pela cerveja 
                artesanal se transforma em oportunidades de negócio.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Description */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Como Funciona</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Para Cervejarias Ciganas</h3>
                  <p className="text-muted-foreground">
                    Oferecemos uma plataforma onde cervejeiros podem encontrar fábricas certificadas 
                    para produzir suas receitas, eliminando a necessidade de grandes investimentos 
                    em equipamentos e instalações. Conectamos você com fornecedores de insumos 
                    de qualidade e canais de distribuição.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Para Fábricas</h3>
                  <p className="text-muted-foreground">
                    Ajudamos fábricas a otimizar sua capacidade produtiva conectando-as com 
                    cervejeiros talentosos. Nossa plataforma facilita a gestão de clientes, 
                    organização da produção e expansão da carteira de negócios.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Para Fornecedores</h3>
                  <p className="text-muted-foreground">
                    Conectamos fornecedores de insumos diretamente com produtores, criando 
                    uma rede de suprimentos eficiente que beneficia toda a cadeia produtiva 
                    da cerveja artesanal.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Para Donos de Bar</h3>
                  <p className="text-muted-foreground">
                    Oferecemos acesso a uma variedade única de cervejas artesanais, 
                    permitindo que bares ofereçam produtos exclusivos e diferenciados 
                    aos seus clientes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Entre em Contato</h2>
              <p className="text-center text-muted-foreground mb-8">
                Tem dúvidas sobre nossa plataforma? Entre em contato conosco!
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold">E-mail</p>
                    <p className="text-muted-foreground">contato@cervejacigana.com.br</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-muted-foreground">(11) 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold">Endereço</p>
                    <p className="text-muted-foreground">São Paulo, SP - Brasil</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SaibaMais;