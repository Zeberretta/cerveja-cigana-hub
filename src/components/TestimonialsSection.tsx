import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Testimonial = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatar_url?: string;
};

const TestimonialsSection = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (!isMounted) return;
      if (error) {
        console.error("Erro ao carregar depoimentos:", error);
        setItems([]);
      } else {
        setItems(data || []);
      }
      setLoading(false);
    };
    fetchTestimonials();
    return () => {
      isMounted = false;
    };
  }, []);

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
            {items.length > 0 ? items.map((t, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full shadow-sm">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={t.avatar_url || "/placeholder.svg"}
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
                    <p className="text-base text-foreground/90">"{t.quote}"</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            )) : (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full shadow-sm">
                  <CardContent className="p-6 flex flex-col h-full justify-center items-center">
                    <p className="text-muted-foreground text-center">
                      {loading ? "Carregando depoimentos..." : "Nenhum depoimento disponível no momento."}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            )}
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