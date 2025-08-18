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
import { Package, Truck, BarChart3, Plus, Edit, Trash2, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  unit: string;
  status: string;
}

const Supplier = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const form = useForm();

  useEffect(() => {
    if (user) {
      loadSupplierData();
    }
  }, [user]);

  const loadSupplierData = async () => {
    try {
      // Load real products data
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      setProducts(productsData || []);

      // Load orders where user is the seller
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('seller_user_id', user?.id)
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

  const addProduct = async (data: any) => {
    try {
      const { error } = await supabase
        .from('products')
        .insert({
          user_id: user?.id,
          name: data.name,
          category: data.category,
          stock: parseInt(data.stock),
          price: parseFloat(data.price),
          unit: data.unit,
          status: data.stock > 100 ? 'Disponível' : data.stock > 0 ? 'Estoque Baixo' : 'Esgotado'
        });
        
      if (error) throw error;
      
      // Reload products data
      await loadSupplierData();
      setIsAddingProduct(false);
      form.reset();
      
      toast({
        title: "Produto adicionado",
        description: "Produto cadastrado com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar produto",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { variant: 'destructive' as const, label: 'Esgotado' };
    if (stock < 100) return { variant: 'secondary' as const, label: 'Estoque Baixo' };
    return { variant: 'default' as const, label: 'Disponível' };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-8 h-8 text-accent" />
            <h1 className="text-2xl font-bold text-foreground">Dashboard Fornecedor</h1>
          </div>
          <Button asChild variant="outline">
            <Link to="/">Voltar</Link>
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Produtos Ativos</p>
                      <p className="text-3xl font-bold text-accent">{products.filter(p => p.status !== 'Esgotado').length}</p>
                    </div>
                    <Package className="w-8 h-8 text-accent/60" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pedidos Recebidos</p>
                      <p className="text-3xl font-bold text-primary">{orders.length}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-primary/60" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pedidos Pendentes</p>
                      <p className="text-3xl font-bold text-brewery">{orders.filter(o => o.status === 'pending').length}</p>
                    </div>
                    <Truck className="w-8 h-8 text-brewery/60" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Alerta Estoque</p>
                      <p className="text-3xl font-bold text-destructive">{products.filter(p => p.status === 'Estoque Baixo' || p.status === 'Esgotado').length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-destructive/60" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Produtos com Estoque Baixo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {products.filter(p => p.status === 'Estoque Baixo' || p.status === 'Esgotado').map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={getStockStatus(product.stock).variant}>
                            {product.stock} {product.unit}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Cervejaria Artesanal SP</h4>
                        <p className="text-sm text-muted-foreground">Malte Pilsen - 500kg</p>
                      </div>
                      <Badge>Pendente</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Brasil Craft</h4>
                        <p className="text-sm text-muted-foreground">Lúpulo Cascade - 25kg</p>
                      </div>
                      <Badge variant="secondary">Enviado</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Catálogo de Produtos</h2>
              <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Produto
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cadastrar Produto</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(addProduct)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Produto</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Ex: Malte Pilsen" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione a categoria" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Maltes">Maltes</SelectItem>
                                <SelectItem value="Lúpulos">Lúpulos</SelectItem>
                                <SelectItem value="Leveduras">Leveduras</SelectItem>
                                <SelectItem value="Adjuntos">Adjuntos</SelectItem>
                                <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="stock"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estoque</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" placeholder="1000" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="unit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unidade</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Unidade" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="kg">kg</SelectItem>
                                  <SelectItem value="unidade">unidade</SelectItem>
                                  <SelectItem value="litro">litro</SelectItem>
                                </SelectContent>
                              </Select>
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
                            <FormLabel>Preço por Unidade (R$)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" placeholder="4.50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsAddingProduct(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">Salvar Produto</Button>
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
                      <TableHead>Produto</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.stock} {product.unit}</TableCell>
                        <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={getStockStatus(product.stock).variant}>
                            {getStockStatus(product.stock).label}
                          </Badge>
                        </TableCell>
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

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Central de Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Cervejaria Artesanal SP</TableCell>
                      <TableCell>Malte Pilsen</TableCell>
                      <TableCell>500 kg</TableCell>
                      <TableCell>R$ 2.250,00</TableCell>
                      <TableCell><Badge>Pendente</Badge></TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Confirmar</Button>
                          <Button size="sm" variant="outline">Rejeitar</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Brasil Craft</TableCell>
                      <TableCell>Lúpulo Cascade</TableCell>
                      <TableCell>25 kg</TableCell>
                      <TableCell>R$ 2.125,00</TableCell>
                      <TableCell><Badge variant="secondary">Enviado</Badge></TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Rastrear</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados da Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company-name">Nome da Empresa</Label>
                    <Input id="company-name" placeholder="Nome da sua empresa" />
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
                    <Input id="email" type="email" placeholder="contato@fornecedor.com" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" placeholder="Endereço completo" />
                </div>
                <div>
                  <Label htmlFor="description">Descrição da Empresa</Label>
                  <Textarea id="description" placeholder="Conte sobre sua empresa..." />
                </div>
                <Button>Salvar Dados</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Supplier;