import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, Building2, Factory, Truck, Wine } from "lucide-react";

interface Profile {
  id: string;
  user_type: 'cigano' | 'fabrica' | 'fornecedor' | 'bar';
  created_at: string;
}

interface RegistrationData {
  id: string;
  nome_razao_social: string;
  email: string;
  telefone_whatsapp: string;
  created_at: string;
  logo_url?: string;
  [key: string]: any;
}

const Admin = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [ciganoRegistrations, setCiganoRegistrations] = useState<RegistrationData[]>([]);
  const [fabricaRegistrations, setFabricaRegistrations] = useState<RegistrationData[]>([]);
  const [fornecedorRegistrations, setFornecedorRegistrations] = useState<RegistrationData[]>([]);
  const [barRegistrations, setBarRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;
      setProfiles(profilesData || []);

      // Fetch registrations for each type
      const [ciganoRes, fabricaRes, fornecedorRes, barRes] = await Promise.all([
        supabase.from('cigano_registrations').select('*').order('created_at', { ascending: false }),
        supabase.from('fabrica_registrations').select('*').order('created_at', { ascending: false }),
        supabase.from('fornecedor_registrations').select('*').order('created_at', { ascending: false }),
        supabase.from('bar_registrations').select('*').order('created_at', { ascending: false })
      ]);

      setCiganoRegistrations(ciganoRes.data || []);
      setFabricaRegistrations(fabricaRes.data || []);
      setFornecedorRegistrations(fornecedorRes.data || []);
      setBarRegistrations(barRes.data || []);

    } catch (error: any) {
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const total = profiles.length;
    const ciganos = profiles.filter(p => p.user_type === 'cigano').length;
    const fabricas = profiles.filter(p => p.user_type === 'fabrica').length;
    const fornecedores = profiles.filter(p => p.user_type === 'fornecedor').length;
    const bars = profiles.filter(p => p.user_type === 'bar').length;

    return { total, ciganos, fabricas, fornecedores, bars };
  };

  const RegistrationCard = ({ registration, type }: { registration: RegistrationData; type: string }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{registration.nome_razao_social}</CardTitle>
          <Badge variant="outline">
            {new Date(registration.created_at).toLocaleDateString('pt-BR')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">E-mail</p>
            <p className="font-medium">{registration.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Telefone</p>
            <p className="font-medium">{registration.telefone_whatsapp}</p>
          </div>
          {type === 'cigano' && (
            <>
              <div>
                <p className="text-sm text-muted-foreground">CNPJ/CPF</p>
                <p className="font-medium">{registration.cnpj_cpf}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimativa Produção</p>
                <p className="font-medium">{registration.estimativa_producao_mensal}</p>
              </div>
            </>
          )}
          {(type === 'fabrica' || type === 'fornecedor') && (
            <>
              <div>
                <p className="text-sm text-muted-foreground">CNPJ</p>
                <p className="font-medium">{registration.cnpj}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Capacidade Produção</p>
                <p className="font-medium">{registration.capacidade_producao_mensal}</p>
              </div>
            </>
          )}
          {type === 'bar' && (
            <>
              <div>
                <p className="text-sm text-muted-foreground">CNPJ</p>
                <p className="font-medium">{registration.cnpj}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Demanda Média</p>
                <p className="font-medium">{registration.demanda_media_mensal}</p>
              </div>
            </>
          )}
          <div>
            <p className="text-sm text-muted-foreground">Tempo Atuação</p>
            <p className="font-medium">{registration.tempo_atuacao}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Endereço</p>
            <p className="font-medium text-sm">{registration.endereco_completo}</p>
          </div>
        </div>
        {registration.logo_url && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Logo</p>
            <img 
              src={registration.logo_url} 
              alt="Logo" 
              className="w-16 h-16 object-cover rounded-lg border"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Gerencie todos os cadastros da plataforma
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Wine className="h-8 w-8 text-hero" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Ciganos</p>
                  <p className="text-2xl font-bold">{stats.ciganos}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Factory className="h-8 w-8 text-accent" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Fábricas</p>
                  <p className="text-2xl font-bold">{stats.fabricas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Truck className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Fornecedores</p>
                  <p className="text-2xl font-bold">{stats.fornecedores}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-hero" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Bars</p>
                  <p className="text-2xl font-bold">{stats.bars}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registrations Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Cadastros por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cigano" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="cigano">Ciganos ({ciganoRegistrations.length})</TabsTrigger>
                <TabsTrigger value="fabrica">Fábricas ({fabricaRegistrations.length})</TabsTrigger>
                <TabsTrigger value="fornecedor">Fornecedores ({fornecedorRegistrations.length})</TabsTrigger>
                <TabsTrigger value="bar">Bars ({barRegistrations.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="cigano" className="mt-6">
                <div className="space-y-4">
                  {ciganoRegistrations.map((registration) => (
                    <RegistrationCard 
                      key={registration.id} 
                      registration={registration} 
                      type="cigano"
                    />
                  ))}
                  {ciganoRegistrations.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum cadastro de cervejaria cigana encontrado.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="fabrica" className="mt-6">
                <div className="space-y-4">
                  {fabricaRegistrations.map((registration) => (
                    <RegistrationCard 
                      key={registration.id} 
                      registration={registration} 
                      type="fabrica"
                    />
                  ))}
                  {fabricaRegistrations.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum cadastro de fábrica encontrado.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="fornecedor" className="mt-6">
                <div className="space-y-4">
                  {fornecedorRegistrations.map((registration) => (
                    <RegistrationCard 
                      key={registration.id} 
                      registration={registration} 
                      type="fornecedor"
                    />
                  ))}
                  {fornecedorRegistrations.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum cadastro de fornecedor encontrado.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="bar" className="mt-6">
                <div className="space-y-4">
                  {barRegistrations.map((registration) => (
                    <RegistrationCard 
                      key={registration.id} 
                      registration={registration} 
                      type="bar"
                    />
                  ))}
                  {barRegistrations.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum cadastro de bar encontrado.
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;