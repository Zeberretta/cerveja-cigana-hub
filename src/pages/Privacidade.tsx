import Seo from "@/components/Seo";
import Footer from "@/components/Footer";

const Privacidade = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo title="Política de Privacidade | Cerveja Cigana Hub" description="Saiba como coletamos, usamos e protegemos seus dados na plataforma Cerveja Cigana Hub." />
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Política de Privacidade</h1>
        <p className="text-muted-foreground mb-8">Atualizado em 07/08/2025</p>

        <article className="prose prose-neutral dark:prose-invert">
          <h2>Introdução</h2>
          <p>
            A Cerveja Cigana Hub valoriza sua privacidade. Este documento descreve como coletamos, utilizamos e
            protegemos as informações pessoais dos usuários da plataforma, incluindo cervejarias ciganas, fábricas,
            fornecedores e bares.
          </p>

          <h2>Coleta de Dados</h2>
          <p>Coletamos dados fornecidos voluntariamente (como nome, e-mail e empresa) e dados de uso para melhorar a experiência.</p>

          <h2>Uso de Dados</h2>
          <ul>
            <li>Operar e manter sua conta e perfis;</li>
            <li>Intermediar cotações, agendamentos e pedidos;</li>
            <li>Enviar comunicações transacionais e de suporte;</li>
            <li>Melhorar segurança, performance e funcionalidades da plataforma.</li>
          </ul>

          <h2>Compartilhamento</h2>
          <p>Compartilhamos dados apenas quando necessário para execução dos serviços (ex.: entre cigana e fábrica), cumprimento legal ou com seu consentimento.</p>

          <h2>Cookies</h2>
          <p>Utilizamos cookies para autenticação, preferências e analytics. Você pode gerenciá-los no seu navegador.</p>

          <h2>Segurança</h2>
          <p>Adotamos medidas técnicas e organizacionais para proteger seus dados. Nenhum sistema é 100% seguro.</p>

          <h2>Direitos do Titular</h2>
          <p>Você pode solicitar acesso, correção ou exclusão dos dados. Para exercer seus direitos, fale conosco em contato@cervejacigana.com.br.</p>

          <h2>Contato</h2>
          <p>Em caso de dúvidas, entre em contato: contato@cervejacigana.com.br</p>
        </article>
      </section>
      <Footer />
    </main>
  );
};

export default Privacidade;
