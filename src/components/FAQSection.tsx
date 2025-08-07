import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "O que é o Cerveja Cigana Hub?",
    a: "Uma plataforma que conecta cervejarias ciganas, fábricas, fornecedores e bares para facilitar produção, compras e distribuição.",
  },
  {
    q: "Como encontro fábricas disponíveis para produzir minha receita?",
    a: "No painel da sua conta, acesse a aba Fábricas e filtre por capacidade, localização e agenda. Você pode enviar cotações em poucos cliques.",
  },
  {
    q: "Posso vender meus produtos para bares e restaurantes pela plataforma?",
    a: "Sim. Fornecedores e ciganos podem cadastrar itens no marketplace, receber pedidos e gerenciar a logística em um só lugar.",
  },
  {
    q: "Quais são os planos e custos?",
    a: "Você pode começar grátis. Planos pagos liberam automações, relatórios avançados e prioridades de suporte.",
  },
  {
    q: "Existe suporte e onboarding?",
    a: "Sim. Oferecemos materiais, tutoriais e um time de suporte para ajudar na configuração e melhores práticas.",
  },
];

const FAQSection = () => {
  const faqLdJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section id="faq" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <header className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Perguntas Frequentes</h2>
          <p className="text-muted-foreground mt-2">Tire suas principais dúvidas sobre como usar a plataforma.</p>
        </header>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger className="text-left text-lg">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLdJson) }}
        />
      </div>
    </section>
  );
};

export default FAQSection;
