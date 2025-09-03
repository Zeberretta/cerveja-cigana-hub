import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X } from "lucide-react";
import {
  ciganoRegistrationSchema,
  fabricaRegistrationSchema,
  fornecedorRegistrationSchema,
  barRegistrationSchema,
  type CiganoRegistrationData,
  type FabricaRegistrationData,
  type FornecedorRegistrationData,
  type BarRegistrationData
} from "@/lib/validationSchemas";

type UserType = 'cigano' | 'fabrica' | 'fornecedor' | 'bar';

interface RegistrationFormProps {
  userType: UserType;
  user: User;
}

type FormData = CiganoRegistrationData | FabricaRegistrationData | FornecedorRegistrationData | BarRegistrationData;

const RegistrationForm = ({ userType, user }: RegistrationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const userTypeLabels = {
    cigano: 'Cervejaria Cigana',
    fabrica: 'Fábrica',
    fornecedor: 'Fornecedor de Insumos',
    bar: 'Dono de Bar'
  };

  const getSchema = () => {
    switch (userType) {
      case 'cigano': return ciganoRegistrationSchema;
      case 'fabrica': return fabricaRegistrationSchema;
      case 'fornecedor': return fornecedorRegistrationSchema;
      case 'bar': return barRegistrationSchema;
      default: return ciganoRegistrationSchema;
    }
  };

  const getDefaultValues = () => {
    const base = {
      nome_razao_social: "",
      email: "",
      telefone_whatsapp: "",
      endereco_completo: "",
      tempo_atuacao: "",
      link_instagram: "",
    };

    switch (userType) {
      case 'cigano':
        return {
          ...base,
          cnpj_cpf: "",
          inscricao_estadual: "",
          estimativa_producao_mensal: "",
          link_untappd: "",
        };
      case 'fabrica':
        return {
          ...base,
          cnpj: "",
          inscricao_estadual: "",
          capacidade_producao_mensal: "",
          registro_mapa: "",
        };
      case 'fornecedor':
        return {
          ...base,
          cnpj: "",
          capacidade_producao_mensal: "",
          registro_mapa: "",
        };
      case 'bar':
        return {
          ...base,
          cnpj: "",
          demanda_media_mensal: "",
        };
      default:
        return base;
    }
  };

  const form = useForm<any>({
    resolver: zodResolver(getSchema()),
    defaultValues: getDefaultValues(),
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile) return null;

    const fileExt = logoFile.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `logos/${fileName}`;

    const { error } = await supabase.storage
      .from('logos')
      .upload(filePath, logoFile);

    if (error) {
      console.error('Error uploading logo:', error);
      return null;
    }

    const { data } = supabase.storage
      .from('logos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Upload logo if provided
      const logoUrl = await uploadLogo();

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          user_type: userType
        });

      if (profileError) throw profileError;

      // Insert registration data
      let registrationError;
      
      if (userType === 'cigano') {
        ({ error: registrationError } = await supabase
          .from('cigano_registrations')
          .insert({
            user_id: user.id,
            ...(data as CiganoRegistrationData),
            logo_url: logoUrl
          }));
      } else if (userType === 'fabrica') {
        ({ error: registrationError } = await supabase
          .from('fabrica_registrations')
          .insert({
            user_id: user.id,
            ...(data as FabricaRegistrationData),
            logo_url: logoUrl
          }));
      } else if (userType === 'fornecedor') {
        ({ error: registrationError } = await supabase
          .from('fornecedor_registrations')
          .insert({
            user_id: user.id,
            ...(data as FornecedorRegistrationData),
            logo_url: logoUrl
          }));
      } else if (userType === 'bar') {
        ({ error: registrationError } = await supabase
          .from('bar_registrations')
          .insert({
            user_id: user.id,
            ...(data as BarRegistrationData),
            logo_url: logoUrl
          }));
      }

      if (registrationError) throw registrationError;

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Redirecionando para seu dashboard...",
      });

      // Redirect to appropriate dashboard
      const dashboardMap = {
        cigano: '/cervejaria-cigana',
        fabrica: '/fabrica',
        fornecedor: '/fornecedor',
        bar: '/bar'
      };
      navigate(dashboardMap[userType]);

    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Cadastro - {userTypeLabels[userType]}
          </CardTitle>
          <p className="text-muted-foreground">
            Complete seu cadastro para acessar a plataforma
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Common Fields */}
              <FormField
                control={form.control}
                name="nome_razao_social"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome/Razão Social *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nome ou razão social da empresa" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type-specific fields */}
              {userType === 'cigano' && (
                <>
                  <FormField
                    control={form.control}
                    name="cnpj_cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ/CPF *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="00.000.000/0000-00 ou 000.000.000-00" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="inscricao_estadual"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inscrição Estadual</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Inscrição estadual (opcional)" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="estimativa_producao_mensal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimativa de Produção Mensal *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ex: 500 litros/mês" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="link_untappd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link do Untappd</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://untappd.com/brewery/..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {(userType === 'fabrica' || userType === 'fornecedor' || userType === 'bar') && (
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="00.000.000/0000-00" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {userType === 'fabrica' && (
                <>
                  <FormField
                    control={form.control}
                    name="inscricao_estadual"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inscrição Estadual</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Inscrição estadual (opcional)" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capacidade_producao_mensal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacidade de Produção Mensal *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ex: 10.000 litros/mês" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registro_mapa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registro MAPA *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Número do registro no MAPA" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {userType === 'fornecedor' && (
                <>
                  <FormField
                    control={form.control}
                    name="capacidade_producao_mensal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacidade de Produção Mensal *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ex: 50 toneladas/mês" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registro_mapa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registro MAPA *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Número do registro no MAPA" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {userType === 'bar' && (
                <FormField
                  control={form.control}
                  name="demanda_media_mensal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Demanda Média Mensal *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ex: 200 litros/mês" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Common fields continued */}
              <FormField
                control={form.control}
                name="tempo_atuacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempo de Atuação *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: 3 anos" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefone_whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone/WhatsApp *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="(11) 99999-9999" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail *</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="contato@empresa.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link_instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link do Instagram</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://instagram.com/..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endereco_completo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço Completo *</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Rua, número, bairro, cidade, estado, CEP" rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Logo Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Logo da Empresa</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="flex items-center space-x-2 cursor-pointer bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Escolher arquivo</span>
                  </label>
                  {logoPreview && (
                    <div className="relative">
                      <img
                        src={logoPreview}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setLogoFile(null);
                          setLogoPreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Cadastrando..." : "Finalizar Cadastro"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;