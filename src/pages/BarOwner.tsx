import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
import { Link } from "react-router-dom";
import { Store, Star, Search, ShoppingCart, Plus, Edit, Trash2, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import Chat from "@/components/Chat";

interface Beer {
  id: string;
  name: string;
  brewery: string;
  style: string;
  abv: number;
  ibu: number;
  price: number;
  rating: number;
  available: boolean;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  taps: number;
  manager: string;
}

const BarOwner = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [beers, setBeers] = useState<Beer[]>([]);

  const [branches, setBranches] = useState<Branch[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [isAddingBranch, setIsAddingBranch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      loadBarData();
    }
  }, [user]);

  const loadBarData = async () => {
    try {
      // Load real branches data
      const { data: branchesData } = await supabase
        .from('bar_branches')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      const formattedBranches = branchesData?.map(branch => ({
        id: branch.id,
        name: branch.name,
        address: branch.address,
        taps: branch.taps,
        manager: branch.manager || 'Não definido'
      })) || [];
      
      setBranches(formattedBranches);

      // Load real beer data from marketplace
      const { data: beersData } = await supabase
        .from('beers')
        .select('*')
        .eq('available', true)
        .order('rating', { ascending: false });
      
      const formattedBeers = beersData?.map(beer => ({
        id: beer.id,
        name: beer.name,
        brewery: beer.brewery_name,
        style: beer.style,
        abv: Number(beer.abv),
        ibu: beer.ibu,
        price: Number(beer.price),
        rating: Number(beer.rating),
        available: beer.available
      })) || [];
      
      setBeers(formattedBeers);

      // Load orders where user is the buyer
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('buyer_user_id', user?.id)
        .order('created_at', { ascending: false });
      
      setOrders(ordersData || []);
      
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

  const form = useForm();

  const addBranch = async (data: any) => {
    try {
      const { error } = await supabase
        .from('bar_branches')
        .insert({
          user_id: user?.id,
          name: data.name,
          address: data.address,
          taps: parseInt(data.taps),
          manager: data.manager
        });
        
      if (error) throw error;
      
      // Reload branches data
      await loadBarData();
      setIsAddingBranch(false);
      form.reset();
      
      toast({
        title: "Filial adicionada",
        description: "Filial cadastrada com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar filial",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredBeers = beers.filter(beer => 
    beer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beer.brewery.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beer.style.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-8 h-8 text-hero" />
            <h1 className="text-2xl font-bold text-foreground">Dashboard Bar</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowChat(!showChat)} variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Voltar</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="catalog">Catálogo</TabsTrigger>
                <TabsTrigger value="branches">Filiais</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações</TabsTrigger>
                <TabsTrigger value="profile">Perfil</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Filiais</p>
                          <p className="text-3xl font-bold text-hero">{branches.length}</p>
                        </div>
                        <Store className="w-8 h-8 text-hero/60" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Torneiras</p>
                          <p className="text-3xl font-bold text-primary">{branches.reduce((acc, branch) => acc + branch.taps, 0)}</p>
                        </div>
                        <ShoppingCart className="w-8 h-8 text-primary/60" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Cervejas Ativas</p>
                          <p className="text-3xl font-bold text-brewery">{beers.filter(b => b.available).length}</p>
                        </div>
                        <Star className="w-8 h-8 text-brewery/60" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Avaliação Média</p>
                          <p className="text-3xl font-bold text-accent">4.7</p>
                        </div>
                        <Star className="w-8 h-8 text-accent/60" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cervejas Mais Populares</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {beers.filter(b => b.available).slice(0, 3).map((beer) => (
                          <div key={beer.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-semibold">{beer.name}</h4>
                              <p className="text-sm text-muted-foreground">{beer.brewery}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{beer.rating}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Status das Filiais</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {branches.map((branch) => (
                          <div key={branch.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-semibold">{branch.name}</h4>
                              <p className="text-sm text-muted-foreground">{branch.taps} torneiras</p>
                            </div>
                            <Badge>Ativo</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="catalog" className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar cervejas por nome, cervejaria ou estilo..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    Filtros Avançados
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBeers.map((beer) => (
                    <Card key={beer.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{beer.name}</h3>
                            <p className="text-sm text-muted-foreground">{beer.brewery}</p>
                          </div>
                          <Badge variant={beer.available ? "default" : "secondary"}>
                            {beer.available ? "Disponível" : "Indisponível"}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Estilo:</span>
                            <span className="font-medium">{beer.style}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>ABV:</span>
                            <span className="font-medium">{beer.abv}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>IBU:</span>
                            <span className="font-medium">{beer.ibu}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Preço:</span>
                            <span className="font-medium">R$ {beer.price.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{beer.rating}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Avaliar</Button>
                            <Button size="sm">Comprar</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="branches" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Minhas Filiais</h2>
                  <Dialog open={isAddingBranch} onOpenChange={setIsAddingBranch}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Filial
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cadastrar Nova Filial</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(addBranch)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome da Filial</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Ex: Bar Centro" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Endereço</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Rua, número, bairro" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="taps"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Número de Torneiras</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" placeholder="8" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="manager"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gerente</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Nome do responsável" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsAddingBranch(false)}>
                              Cancelar
                            </Button>
                            <Button type="submit">Salvar Filial</Button>
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
                          <TableHead>Endereço</TableHead>
                          <TableHead>Torneiras</TableHead>
                          <TableHead>Gerente</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {branches.map((branch) => (
                          <TableRow key={branch.id}>
                            <TableCell className="font-medium">{branch.name}</TableCell>
                            <TableCell>{branch.address}</TableCell>
                            <TableCell>{branch.taps}</TableCell>
                            <TableCell>{branch.manager}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
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

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Minhas Avaliações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">IPA Tropical</h4>
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Cervejaria Artesanal SP</p>
                        <p className="text-sm">"Excelente cerveja, muito bem balanceada. Nossos clientes adoraram!"</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">Pilsen Premium</h4>
                          <div className="flex items-center gap-1">
                            {[1,2,3,4].map((star) => (
                              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="w-4 h-4 text-gray-300" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Brasil Craft</p>
                        <p className="text-sm">"Boa cerveja para o dia a dia, preço justo."</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados do Estabelecimento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bar-name">Nome do Bar</Label>
                        <Input id="bar-name" placeholder="Nome do seu estabelecimento" />
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
                        <Input id="email" type="email" placeholder="contato@bar.com" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Endereço Principal</Label>
                      <Input id="address" placeholder="Endereço completo" />
                    </div>
                    <div>
                      <Label htmlFor="beer-preferences">Estilos de Cerveja Preferidos</Label>
                      <Textarea id="beer-preferences" placeholder="Descreva os estilos que mais vendem no seu bar..." />
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
              <Chat title="Chat com Ciganos" recipient="Cervejaria Artesanal SP" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarOwner;