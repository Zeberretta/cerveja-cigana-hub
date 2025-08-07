const Footer = () => {
  return (
    <footer className="bg-brewery text-brewery-foreground py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">BrewConnect</h3>
            <p className="text-brewery-foreground/80 mb-4 max-w-md">
              A plataforma que conecta todo o ecossistema cervejeiro brasileiro, 
              facilitando negócios e impulsionando o crescimento do setor.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Plataforma</h4>
            <ul className="space-y-2 text-brewery-foreground/80">
              <li><a href="/perfil/cervejaria-cigana" className="hover:text-brewery-foreground transition-colors">Cervejarias Ciganas</a></li>
              <li><a href="/perfil/fabrica" className="hover:text-brewery-foreground transition-colors">Fábricas</a></li>
              <li><a href="/perfil/fornecedor" className="hover:text-brewery-foreground transition-colors">Fornecedores</a></li>
              <li><a href="/perfil/bar" className="hover:text-brewery-foreground transition-colors">Bares</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-brewery-foreground/80">
              <li><a href="/saiba-mais" className="hover:text-brewery-foreground transition-colors">Central de Ajuda</a></li>
              <li><a href="/contato" className="hover:text-brewery-foreground transition-colors">Contato</a></li>
              <li><a href="/termos" className="hover:text-brewery-foreground transition-colors">Termos de Uso</a></li>
              <li><a href="/privacidade" className="hover:text-brewery-foreground transition-colors">Privacidade</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brewery-foreground/20 mt-8 pt-8 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" aria-label="Instagram" className="text-brewery-foreground/80 hover:text-brewery-foreground transition-colors">IG</a>
            <a href="#" aria-label="LinkedIn" className="text-brewery-foreground/80 hover:text-brewery-foreground transition-colors">IN</a>
            <a href="#" aria-label="Facebook" className="text-brewery-foreground/80 hover:text-brewery-foreground transition-colors">FB</a>
          </div>
          <p className="text-brewery-foreground/80">
            © 2024 BrewConnect. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;