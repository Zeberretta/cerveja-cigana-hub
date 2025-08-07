import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Ana Souza",
    role: "Cervejaria Cigana",
    company: "Brava Malte",
    quote:
      "A plataforma simplificou toda a operação e nos conectou rapidamente a fábricas com capacidade real. Crescemos 30% em 3 meses.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Carlos Lima",
    role: "Fábrica",
    company: "Serra Alta Brew",
    quote:
      "Agenda, cotações e comunicação em um único lugar. Reduzimos ociosidade e fechamos parcerias de longo prazo.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Juliana Ferreira",
    role: "Fornecedor",
    company: "Lúpulo Verde",
    quote:
      "Novos canais de venda e previsibilidade de demanda. As integrações facilitaram todo o fluxo de pedidos.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Rafael Santos",
    role: "Bar/Restaurante",
    company: "Tap House Centro",
    quote:
      "Catálogo atualizado e logística ágil. Conseguimos variar o cardápio com rótulos exclusivos sem complicação.",
    avatar: "/placeholder.svg",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Depoimentos de Clientes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Histórias reais de parceiros que estão transformando seus negócios com o Cerveja Cigana Hub.
          </p>
        </header>

        <Carousel>
          <CarouselContent>
            {testimonials.map((t, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full shadow-sm">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={t.avatar}
                        alt={`Foto de ${t.name} - Cliente Cerveja Cigana Hub`}
                        loading="lazy"
                        className="h-12 w-12 rounded-full object-cover bg-muted"
                      />
                      <div>
                        <p className="font-semibold leading-tight">{t.name}</p>
                        <p className="text-sm text-muted-foreground leading-tight">
                          {t.role} • {t.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-base text-foreground/90">“{t.quote}”</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-2 mt-6">
            <CarouselPrevious aria-label="Anterior" />
            <CarouselNext aria-label="Próximo" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
