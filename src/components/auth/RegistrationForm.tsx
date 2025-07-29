import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
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

const RegistrationForm = ({ userType, user }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const userTypeLabels = {
    cigano: 'Cervejaria Cigana',
    fabrica: 'Fábrica',
    fornecedor: 'Fornecedor de Insumos',
    bar: 'Dono de Bar'
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const schema = userType === 'cigano' ? ciganoRegistrationSchema
      : userType === 'fabrica' ? fabricaRegistrationSchema
      : userType === 'fornecedor' ? fornecedorRegistrationSchema
      : barRegistrationSchema;

    const result = schema.safeParse(formData);
    
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      });
      setValidationErrors(errors);
      return false;
    }
    
    setValidationErrors({});
    return true;
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile) return null;

    const fileExt = logoFile.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('logos')
      .upload(fileName, logoFile);

    if (uploadError) {
      console.error('Error uploading logo:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('logos')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!validateForm()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os erros no formulário",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Upload logo first
      const logoUrl = await uploadLogo();

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          user_type: userType
        });

      if (profileError) {
        throw profileError;
      }

      // Insert registration data based on user type
      const registrationData = {
        user_id: user.id,
        ...formData,
        logo_url: logoUrl
      };

      const { error: registrationError } = await supabase
        .from(`${userType}_registrations`)
        .insert(registrationData);

      if (registrationError) {
        throw registrationError;
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você será redirecionado para seu dashboard",
      });

      // Redirect to appropriate dashboard
      switch (userType) {
        case 'cigano':
          navigate('/cervejaria-cigana');
          break;
        case 'fabrica':
          navigate('/fabrica');
          break;
        case 'fornecedor':
          navigate('/fornecedor');
          break;
        case 'bar':
          navigate('/bar');
          break;
      }
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

  const renderCiganoForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome_razao_social">Nome/Razão Social *</Label>
          <Input
            id="nome_razao_social"
            required
            onChange={(e) => handleInputChange('nome_razao_social', e.target.value)}
            className={validationErrors.nome_razao_social ? 'border-destructive' : ''}
          />
          {validationErrors.nome_razao_social && (
            <p className="text-sm text-destructive mt-1">{validationErrors.nome_razao_social}</p>
          )}
        </div>
        <div>
          <Label htmlFor="cnpj_cpf">CNPJ/CPF *</Label>
          <Input
            id="cnpj_cpf"
            required
            placeholder="000.000.000-00 ou 00.000.000/0000-00"
            onChange={(e) => handleInputChange('cnpj_cpf', e.target.value)}
            className={validationErrors.cnpj_cpf ? 'border-destructive' : ''}
          />
          {validationErrors.cnpj_cpf && (
            <p className="text-sm text-destructive mt-1">{validationErrors.cnpj_cpf}</p>
          )}
        </div>
        <div>
          <Label htmlFor="inscricao_estadual">Inscrição Estadual</Label>
          <Input
            id="inscricao_estadual"
            onChange={(e) => handleInputChange('inscricao_estadual', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="estimativa_producao_mensal">Estimativa de Produção Mensal *</Label>
          <Input
            id="estimativa_producao_mensal"
            required
            placeholder="Ex: 1000L/mês"
            onChange={(e) => handleInputChange('estimativa_producao_mensal', e.target.value)}
            className={validationErrors.estimativa_producao_mensal ? 'border-destructive' : ''}
          />
          {validationErrors.estimativa_producao_mensal && (
            <p className="text-sm text-destructive mt-1">{validationErrors.estimativa_producao_mensal}</p>
          )}
        </div>
        <div>
          <Label htmlFor="tempo_atuacao">Tempo de Atuação *</Label>
          <Input
            id="tempo_atuacao"
            required
            placeholder="Ex: 2 anos"
            onChange={(e) => handleInputChange('tempo_atuacao', e.target.value)}
            className={validationErrors.tempo_atuacao ? 'border-destructive' : ''}
          />
          {validationErrors.tempo_atuacao && (
            <p className="text-sm text-destructive mt-1">{validationErrors.tempo_atuacao}</p>
          )}
        </div>
        <div>
          <Label htmlFor="telefone_whatsapp">Telefone/WhatsApp *</Label>
          <Input
            id="telefone_whatsapp"
            required
            type="tel"
            placeholder="(11) 99999-9999"
            onChange={(e) => handleInputChange('telefone_whatsapp', e.target.value)}
            className={validationErrors.telefone_whatsapp ? 'border-destructive' : ''}
          />
          {validationErrors.telefone_whatsapp && (
            <p className="text-sm text-destructive mt-1">{validationErrors.telefone_whatsapp}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            required
            type="email"
            defaultValue={user.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={validationErrors.email ? 'border-destructive' : ''}
          />
          {validationErrors.email && (
            <p className="text-sm text-destructive mt-1">{validationErrors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="link_untappd">Link do Untappd</Label>
          <Input
            id="link_untappd"
            placeholder="https://untappd.com/..."
            onChange={(e) => handleInputChange('link_untappd', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="link_instagram">Link do Instagram</Label>
          <Input
            id="link_instagram"
            placeholder="https://instagram.com/..."
            onChange={(e) => handleInputChange('link_instagram', e.target.value)}
          />
        </div>
      </div>
        <div>
          <Label htmlFor="endereco_completo">Endereço Completo *</Label>
          <Textarea
            id="endereco_completo"
            required
            rows={3}
            onChange={(e) => handleInputChange('endereco_completo', e.target.value)}
            className={validationErrors.endereco_completo ? 'border-destructive' : ''}
          />
          {validationErrors.endereco_completo && (
            <p className="text-sm text-destructive mt-1">{validationErrors.endereco_completo}</p>
          )}
        </div>
    </>
  );

  const renderFabricaForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome_razao_social">Nome/Razão Social *</Label>
          <Input
            id="nome_razao_social"
            required
            onChange={(e) => handleInputChange('nome_razao_social', e.target.value)}
            className={validationErrors.nome_razao_social ? 'border-destructive' : ''}
          />
          {validationErrors.nome_razao_social && (
            <p className="text-sm text-destructive mt-1">{validationErrors.nome_razao_social}</p>
          )}
        </div>
        <div>
          <Label htmlFor="cnpj">CNPJ *</Label>
          <Input
            id="cnpj"
            required
            placeholder="00.000.000/0000-00"
            onChange={(e) => handleInputChange('cnpj', e.target.value)}
            className={validationErrors.cnpj ? 'border-destructive' : ''}
          />
          {validationErrors.cnpj && (
            <p className="text-sm text-destructive mt-1">{validationErrors.cnpj}</p>
          )}
        </div>
        <div>
          <Label htmlFor="inscricao_estadual">Inscrição Estadual</Label>
          <Input
            id="inscricao_estadual"
            onChange={(e) => handleInputChange('inscricao_estadual', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="registro_mapa">Registro MAPA *</Label>
          <Input
            id="registro_mapa"
            required
            onChange={(e) => handleInputChange('registro_mapa', e.target.value)}
            className={validationErrors.registro_mapa ? 'border-destructive' : ''}
          />
          {validationErrors.registro_mapa && (
            <p className="text-sm text-destructive mt-1">{validationErrors.registro_mapa}</p>
          )}
        </div>
        <div>
          <Label htmlFor="capacidade_producao_mensal">Capacidade de Produção Mensal *</Label>
          <Input
            id="capacidade_producao_mensal"
            required
            placeholder="Ex: 5000L/mês"
            onChange={(e) => handleInputChange('capacidade_producao_mensal', e.target.value)}
            className={validationErrors.capacidade_producao_mensal ? 'border-destructive' : ''}
          />
          {validationErrors.capacidade_producao_mensal && (
            <p className="text-sm text-destructive mt-1">{validationErrors.capacidade_producao_mensal}</p>
          )}
        </div>
        <div>
          <Label htmlFor="tempo_atuacao">Tempo de Atuação *</Label>
          <Input
            id="tempo_atuacao"
            required
            placeholder="Ex: 5 anos"
            onChange={(e) => handleInputChange('tempo_atuacao', e.target.value)}
            className={validationErrors.tempo_atuacao ? 'border-destructive' : ''}
          />
          {validationErrors.tempo_atuacao && (
            <p className="text-sm text-destructive mt-1">{validationErrors.tempo_atuacao}</p>
          )}
        </div>
        <div>
          <Label htmlFor="telefone_whatsapp">Telefone/WhatsApp *</Label>
          <Input
            id="telefone_whatsapp"
            required
            type="tel"
            placeholder="(11) 99999-9999"
            onChange={(e) => handleInputChange('telefone_whatsapp', e.target.value)}
            className={validationErrors.telefone_whatsapp ? 'border-destructive' : ''}
          />
          {validationErrors.telefone_whatsapp && (
            <p className="text-sm text-destructive mt-1">{validationErrors.telefone_whatsapp}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            required
            type="email"
            defaultValue={user.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={validationErrors.email ? 'border-destructive' : ''}
          />
          {validationErrors.email && (
            <p className="text-sm text-destructive mt-1">{validationErrors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="link_instagram">Link do Instagram</Label>
          <Input
            id="link_instagram"
            placeholder="https://instagram.com/..."
            onChange={(e) => handleInputChange('link_instagram', e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="endereco_completo">Endereço Completo *</Label>
        <Textarea
          id="endereco_completo"
          required
          rows={3}
          onChange={(e) => handleInputChange('endereco_completo', e.target.value)}
        />
      </div>
    </>
  );

  const renderFornecedorForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome_razao_social">Nome/Razão Social *</Label>
          <Input
            id="nome_razao_social"
            required
            onChange={(e) => handleInputChange('nome_razao_social', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="cnpj">CNPJ *</Label>
          <Input
            id="cnpj"
            required
            onChange={(e) => handleInputChange('cnpj', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="registro_mapa">Registro MAPA *</Label>
          <Input
            id="registro_mapa"
            required
            onChange={(e) => handleInputChange('registro_mapa', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="capacidade_producao_mensal">Capacidade de Produção Mensal *</Label>
          <Input
            id="capacidade_producao_mensal"
            required
            placeholder="Ex: Toneladas/mês"
            onChange={(e) => handleInputChange('capacidade_producao_mensal', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="tempo_atuacao">Tempo de Atuação *</Label>
          <Input
            id="tempo_atuacao"
            required
            placeholder="Ex: 10 anos"
            onChange={(e) => handleInputChange('tempo_atuacao', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="telefone_whatsapp">Telefone/WhatsApp *</Label>
          <Input
            id="telefone_whatsapp"
            required
            type="tel"
            onChange={(e) => handleInputChange('telefone_whatsapp', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            required
            type="email"
            defaultValue={user.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="link_instagram">Link do Instagram</Label>
          <Input
            id="link_instagram"
            placeholder="https://instagram.com/..."
            onChange={(e) => handleInputChange('link_instagram', e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="endereco_completo">Endereço Completo *</Label>
        <Textarea
          id="endereco_completo"
          required
          rows={3}
          onChange={(e) => handleInputChange('endereco_completo', e.target.value)}
        />
      </div>
    </>
  );

  const renderBarForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome_razao_social">Nome/Razão Social *</Label>
          <Input
            id="nome_razao_social"
            required
            onChange={(e) => handleInputChange('nome_razao_social', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="cnpj">CNPJ *</Label>
          <Input
            id="cnpj"
            required
            onChange={(e) => handleInputChange('cnpj', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="demanda_media_mensal">Demanda Média Mensal *</Label>
          <Input
            id="demanda_media_mensal"
            required
            placeholder="Ex: 500L/mês"
            onChange={(e) => handleInputChange('demanda_media_mensal', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="tempo_atuacao">Tempo de Atuação *</Label>
          <Input
            id="tempo_atuacao"
            required
            placeholder="Ex: 3 anos"
            onChange={(e) => handleInputChange('tempo_atuacao', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="telefone_whatsapp">Telefone/WhatsApp *</Label>
          <Input
            id="telefone_whatsapp"
            required
            type="tel"
            onChange={(e) => handleInputChange('telefone_whatsapp', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            required
            type="email"
            defaultValue={user.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="link_instagram">Link do Instagram</Label>
          <Input
            id="link_instagram"
            placeholder="https://instagram.com/..."
            onChange={(e) => handleInputChange('link_instagram', e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="endereco_completo">Endereço Completo *</Label>
        <Textarea
          id="endereco_completo"
          required
          rows={3}
          onChange={(e) => handleInputChange('endereco_completo', e.target.value)}
        />
      </div>
    </>
  );

  const renderForm = () => {
    switch (userType) {
      case 'cigano':
        return renderCiganoForm();
      case 'fabrica':
        return renderFabricaForm();
      case 'fornecedor':
        return renderFornecedorForm();
      case 'bar':
        return renderBarForm();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Cadastro - {userTypeLabels[userType]}
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Preencha os dados para completar seu cadastro
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderForm()}
              
              {/* Logo Upload */}
              <div>
                <Label htmlFor="logo">Logo da {userType === 'bar' ? 'Empresa' : 'Cervejaria'}</Label>
                <div className="mt-2">
                  {logoPreview ? (
                    <div className="relative inline-block">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setLogoFile(null);
                          setLogoPreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="logo-upload"
                      className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/10"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Upload Logo</span>
                    </label>
                  )}
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Cadastrando..." : "Finalizar Cadastro"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;