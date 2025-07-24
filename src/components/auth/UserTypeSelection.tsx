import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Factory, Truck, Building2, Wine } from "lucide-react";

type UserType = 'cigano' | 'fabrica' | 'fornecedor' | 'bar';

interface UserTypeSelectionProps {
  onSelectType: (type: UserType) => void;
}

const UserTypeSelection = ({ onSelectType }: UserTypeSelectionProps) => {
  const userTypes = [
    {
      id: 'cigano' as UserType,
      title: 'Cervejaria Cigana',
      description: 'Desenvolva e venda suas receitas exclusivas',
      icon: Wine,
      color: 'from-primary to-hero'
    },
    {
      id: 'fabrica' as UserType,
      title: 'Fábrica',
      description: 'Ofereça seus equipamentos e serviços de produção',
      icon: Factory,
      color: 'from-accent to-primary'
    },
    {
      id: 'fornecedor' as UserType,
      title: 'Fornecedor de Insumos',
      description: 'Venda ingredientes e materiais para cervejarias',
      icon: Truck,
      color: 'from-hero to-accent'
    },
    {
      id: 'bar' as UserType,
      title: 'Dono de Bar',
      description: 'Encontre as melhores cervejas para seu estabelecimento',
      icon: Building2,
      color: 'from-primary to-accent'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Escolha seu Perfil</h1>
          <p className="text-lg text-muted-foreground">
            Selecione o tipo de usuário que melhor representa seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => onSelectType(type.id)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">{type.description}</p>
                  <Button variant="outline" className="w-full">
                    Selecionar
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;