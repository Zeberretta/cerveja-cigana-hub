import Seo from "@/components/Seo";
import Footer from "@/components/Footer";

const Termos = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo title="Termos de Uso | Cerveja Cigana Hub" description="Termos e condições de uso da plataforma Cerveja Cigana Hub para ciganas, fábricas, fornecedores e bares." />
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Termos de Uso</h1>
        <p className="text-muted-foreground mb-8">Atualizado em 07/08/2025</p>

        <article className="prose prose-neutral dark:prose-invert">
          <h2>Aceitação dos Termos</h2>
          <p>Ao acessar a Cerveja Cigana Hub, você concorda com estes Termos e com nossa Política de Privacidade.</p>

          <h2>Conta e Acesso</h2>
          <ul>
            <li>Você é responsável por manter a confidencialidade de suas credenciais;</li>
            <li>Informações fornecidas devem ser verdadeiras e atualizadas;</li>
            <li>Reservamo-nos o direito de suspender contas por uso indevido.</li>
          </ul>

          <h2>Uso da Plataforma</h2>
          <p>É proibido utilizar a plataforma para atividades ilegais, violação de direitos de terceiros ou distribuição de conteúdo malicioso.</p>

          <h2>Serviços</h2>
          <p>A plataforma conecta ciganas, fábricas, fornecedores e bares para cotações, agendamentos e pedidos. Não nos responsabilizamos por negociações realizadas fora do ambiente da plataforma.</p>

          <h2>Propriedade Intelectual</h2>
          <p>Todo o conteúdo e marca Cerveja Cigana Hub pertencem aos seus respectivos proprietários. É vedada a reprodução sem autorização.</p>

          <h2>Limitação de Responsabilidade</h2>
          <p>Não nos responsabilizamos por danos indiretos, lucros cessantes ou perda de dados decorrentes do uso da plataforma.</p>

          <h2>Alterações</h2>
          <p>Podemos atualizar estes Termos periodicamente. A versão vigente estará sempre disponível nesta página.</p>

          <h2>Contato</h2>
          <p>Dúvidas? contato@cervejacigana.com.br</p>
        </article>
      </section>
      <Footer />
    </main>
  );
};

export default Termos;
