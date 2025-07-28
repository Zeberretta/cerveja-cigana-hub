import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Users, Calendar, Package, Star, Plus, Edit, Trash2, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/DashboardHeader";
import Chat from "@/components/Chat";

interface Factory {
  id: string;
  name: string;
  location: string;
  availability: string;
  price: number;
  rating: number;
}

interface Recipe {
  id: string;
  name: string;
  style: string;
  abv: number;
  ibu: number;
  price: number;
  status: string;
}

const GypsyBrewery = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [factories] = useState<Factory[]>([
    { id: '1', name: 'Cervejaria Independente', location: 'São Paulo', availability: 'Disponível', price: 2500, rating: 4.8 },
    { id: '2', name: 'Brasil Brewing', location: 'Rio de Janeiro', availability: '15 dias', price: 2200, rating: 4.6 },
    { id: '3', name: 'Craft Factory', location: 'Belo Horizonte', availability: 'Lotada', price: 2800, rating: 4.9 }
  ]);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  const [ciganoData, setCiganoData] = useState<any>(null);

  const form = useForm();

  useEffect(() => {
    if (user) {
      loadCiganoData();
    }
  }, [user]);

  const loadCiganoData = async () => {
    try {
      // Load cigano registration data
      const { data: cigano } = await supabase
        .from('cigano_registrations')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      setCiganoData(cigano);
      
      // Load real recipes data
      const { data: recipesData } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      setRecipes(recipesData || []);
      
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

  const addRecipe = async (data: any) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .insert({
          user_id: user?.id,
          name: data.name,
          style: data.style,
          abv: parseFloat(data.abv),
          ibu: parseInt(data.ibu),
          price: parseFloat(data.price),
          status: 'Rascunho'
        });
        
      if (error) throw error;
      
      // Reload recipes data
      await loadCiganoData();
      setIsAddingRecipe(false);
      form.reset();
      
      toast({
        title: "Receita adicionada",
        description: "Receita cadastrada com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar receita",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteRecipe = async (recipeId: string) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', recipeId)
        .eq('user_id', user?.id);
        
      if (error) throw error;
      
      // Reload recipes data
      await loadCiganoData();
      
      toast({
        title: "Receita removida",
        description: "Receita removida com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao remover receita",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Dashboard Cigano"
        icon={<Users className="w-8 h-8 text-primary" />}
        onChatToggle={() => setShowChat(!showChat)}
        showChat={showChat}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="factories">Fábricas</TabsTrigger>
                <TabsTrigger value="recipes">Receitas</TabsTrigger>
                <TabsTrigger value="profile">Perfil</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-muted-foreground">Receitas Ativas</p>
                           <p className="text-3xl font-bold text-primary">{recipes.filter(r => r.status === 'Ativa').length}</p>
                        </div>
                        <Package className="w-8 h-8 text-primary/60" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Produções Agendadas</p>
                          <p className="text-3xl font-bold text-brewery">5</p>
                        </div>
                        <Calendar className="w-8 h-8 text-brewery/60" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Bares Conectados</p>
                          <p className="text-3xl font-bold text-accent">28</p>
                        </div>
                        <Users className="w-8 h-8 text-accent/60" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Próximas Produções</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">IPA Tropical - 1000L</h4>
                          <p className="text-sm text-muted-foreground">Cervejaria Independente</p>
                        </div>
                        <Badge>15/02/2024</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Pilsen Premium - 500L</h4>
                          <p className="text-sm text-muted-foreground">Brasil Brewing</p>
                        </div>
                        <Badge variant="secondary">22/02/2024</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="factories" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Disponibilidade de Fábricas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fábrica</TableHead>
                          <TableHead>Localização</TableHead>
                          <TableHead>Disponibilidade</TableHead>
                          <TableHead>Preço/L</TableHead>
                          <TableHead>Avaliação</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {factories.map((factory) => (
                          <TableRow key={factory.id}>
                            <TableCell className="font-medium">{factory.name}</TableCell>
                            <TableCell>{factory.location}</TableCell>
                            <TableCell>
                              <Badge variant={factory.availability === 'Disponível' ? 'default' : 'secondary'}>
                                {factory.availability}
                              </Badge>
                            </TableCell>
                            <TableCell>R$ {factory.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                {factory.rating}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">Cotar</Button>
                                <Button size="sm" variant="outline">Avaliar</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recipes" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Minhas Receitas</h2>
                  <Dialog open={isAddingRecipe} onOpenChange={setIsAddingRecipe}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Receita
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cadastrar Nova Receita</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(addRecipe)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome da Receita</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Ex: IPA Tropical" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="style"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Estilo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione o estilo" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="IPA">IPA</SelectItem>
                                    <SelectItem value="Pilsen">Pilsen</SelectItem>
                                    <SelectItem value="Stout">Stout</SelectItem>
                                    <SelectItem value="Weiss">Weiss</SelectItem>
                                    <SelectItem value="Lager">Lager</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="abv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ABV (%)</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.1" placeholder="6.5" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="ibu"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>IBU</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" placeholder="45" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preço de Venda (R$)</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" step="0.01" placeholder="12.50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsAddingRecipe(false)}>
                              Cancelar
                            </Button>
                            <Button type="submit">Salvar Receita</Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Estilo</TableHead>
                          <TableHead>ABV</TableHead>
                          <TableHead>IBU</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recipes.map((recipe) => (
                          <TableRow key={recipe.id}>
                            <TableCell className="font-medium">{recipe.name}</TableCell>
                            <TableCell>{recipe.style}</TableCell>
                            <TableCell>{recipe.abv}%</TableCell>
                            <TableCell>{recipe.ibu}</TableCell>
                            <TableCell>R$ {recipe.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant={recipe.status === 'Ativa' ? 'default' : 'secondary'}>
                                {recipe.status}
                              </Badge>
                            </TableCell>
                             <TableCell>
                               <div className="flex gap-2">
                                 <Button size="sm" variant="outline">
                                   <Edit className="w-4 h-4" />
                                 </Button>
                                 <Button 
                                   size="sm" 
                                   variant="outline"
                                   onClick={() => deleteRecipe(recipe.id)}
                                 >
                                   <Trash2 className="w-4 h-4" />
                                 </Button>
                               </div>
                             </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados da Cervejaria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="brewery-name">Nome da Cervejaria</Label>
                        <Input id="brewery-name" placeholder="Nome da sua cervejaria" />
                      </div>
                      <div>
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input id="cnpj" placeholder="00.000.000/0000-00" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" placeholder="(11) 99999-9999" />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" placeholder="contato@cervejaria.com" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Endereço</Label>
                      <Input id="address" placeholder="Endereço completo" />
                    </div>
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea id="description" placeholder="Conte sobre sua cervejaria..." />
                    </div>
                    <Button>Salvar Dados</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <div className="lg:col-span-1">
              <Chat title="Chat com Fábrica" recipient="Cervejaria Independente" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GypsyBrewery;