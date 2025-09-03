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
import { Factory, Calendar, Users, TrendingUp, Plus, Edit, Trash2, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/DashboardHeader";
import Chat from "@/components/Chat";
import { equipmentSchema, productionScheduleSchema, type EquipmentData, type ProductionScheduleData } from "@/lib/validationSchemas";

interface Equipment {
  id: string;
  name: string;
  type: string;
  capacity: number;
  status: string;
}

interface Schedule {
  id: string;
  gypsy: string;
  recipe: string;
  date: string;
  volume: number;
  status: string;
}

const FactoryPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [isAddingEquipment, setIsAddingEquipment] = useState(false);
  const [factoryData, setFactoryData] = useState<any>(null);

  const equipmentForm = useForm<EquipmentData>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: "",
      type: "",
      capacity: 1,
    },
  });

  const scheduleForm = useForm<ProductionScheduleData>({
    resolver: zodResolver(productionScheduleSchema),
    defaultValues: {
      gypsy_name: "",
      recipe_name: "",
      production_date: "",
      volume: 50,
    },
  });

  useEffect(() => {
    if (user) {
      loadFactoryData();
    }
  }, [user]);

  const loadFactoryData = async () => {
    try {
      // Load factory registration data
      const { data: factory } = await supabase
        .from('fabrica_registrations')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();
      
      setFactoryData(factory);
      
      // Load real equipment data
      const { data: equipmentData } = await supabase
        .from('equipments')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      setEquipment(equipmentData || []);
      
      // Load real schedule data
      const { data: scheduleData } = await supabase
        .from('production_schedule')
        .select('*')
        .eq('factory_user_id', user?.id)
        .order('production_date', { ascending: true });
      
      const formattedSchedule = scheduleData?.map(item => ({
        id: item.id,
        gypsy: item.gypsy_name,
        recipe: item.recipe_name,
        date: item.production_date,
        volume: item.volume,
        status: item.status
      })) || [];
      
      setSchedule(formattedSchedule);
      
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

  const addEquipment = async (data: any) => {
    try {
      const { error } = await supabase
        .from('equipments')
        .insert({
          user_id: user?.id,
          name: data.name,
          type: data.type,
          capacity: parseInt(data.capacity),
          status: 'Disponível'
        });
        
      if (error) throw error;
      
      // Reload equipment data
      await loadFactoryData();
      setIsAddingEquipment(false);
      equipmentForm.reset();
      
      toast({
        title: "Equipamento adicionado",
        description: "Equipamento cadastrado com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar equipamento",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteEquipment = async (equipmentId: string) => {
    try {
      const { error } = await supabase
        .from('equipments')
        .delete()
        .eq('id', equipmentId)
        .eq('user_id', user?.id);
        
      if (error) throw error;
      
      // Reload equipment data
      await loadFactoryData();
      
      toast({
        title: "Equipamento removido",
        description: "Equipamento removido com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao remover equipamento",
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
        title="Dashboard Fábrica"
        icon={<Factory className="w-8 h-8 text-brewery" />}
        onChatToggle={() => setShowChat(!showChat)}
        showChat={showChat}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="schedule">Agenda</TabsTrigger>
                <TabsTrigger value="equipment">Equipamentos</TabsTrigger>
                <TabsTrigger value="pricing">Preços</TabsTrigger>
                <TabsTrigger value="profile">Perfil</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Equipamentos</p>
                          <p className="text-3xl font-bold text-brewery">{equipment.length}</p>
                        </div>
                        <Factory className="w-8 h-8 text-brewery/60" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Disponíveis</p>
                          <p className="text-3xl font-bold text-primary">{equipment.filter(e => e.status === 'Disponível').length}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-primary/60" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Agendamentos</p>
                          <p className="text-3xl font-bold text-accent">{schedule.length}</p>
                        </div>
                        <Calendar className="w-8 h-8 text-accent/60" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Confirmados</p>
                          <p className="text-3xl font-bold text-hero">{schedule.filter(s => s.status === 'Confirmado').length}</p>
                        </div>
                        <Users className="w-8 h-8 text-hero/60" />
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
                      {schedule.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{item.recipe} - {item.volume}L</h4>
                            <p className="text-sm text-muted-foreground">{item.gypsy}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={item.status === 'Confirmado' ? 'default' : 'secondary'}>
                              {item.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cronograma de Produção</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cigano</TableHead>
                          <TableHead>Receita</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Volume (L)</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {schedule.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.gypsy}</TableCell>
                            <TableCell>{item.recipe}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.volume}</TableCell>
                            <TableCell>
                              <Badge variant={item.status === 'Confirmado' ? 'default' : 'secondary'}>
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">Confirmar</Button>
                                <Button size="sm" variant="outline">Editar</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="equipment" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Equipamentos</h2>
                  <Dialog open={isAddingEquipment} onOpenChange={setIsAddingEquipment}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Equipamento
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cadastrar Equipamento</DialogTitle>
                      </DialogHeader>
                      <Form {...equipmentForm}>
                        <form onSubmit={equipmentForm.handleSubmit(addEquipment)} className="space-y-4">
                          <FormField
                            control={equipmentForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome do Equipamento</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Ex: Tanque 3" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={equipmentForm.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tipo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Fermentador">Fermentador</SelectItem>
                                    <SelectItem value="Mosturador">Mosturador</SelectItem>
                                    <SelectItem value="Brassagem">Equipamento de Brassagem</SelectItem>
                                    <SelectItem value="Envase">Linha de Envase</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={equipmentForm.control}
                            name="capacity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Capacidade (L)</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" placeholder="1000" onChange={(e) => field.onChange(parseInt(e.target.value))} value={field.value} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsAddingEquipment(false)}>
                              Cancelar
                            </Button>
                            <Button type="submit">Salvar</Button>
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
                          <TableHead>Tipo</TableHead>
                          <TableHead>Capacidade (L)</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {equipment.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.capacity}</TableCell>
                            <TableCell>
                              <Badge variant={item.status === 'Disponível' ? 'default' : 
                                            item.status === 'Em Uso' ? 'secondary' : 'destructive'}>
                                {item.status}
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
                                  onClick={() => deleteEquipment(item.id)}
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

              <TabsContent value="pricing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preços dos Serviços</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price-per-liter">Preço por Litro (R$)</Label>
                        <Input id="price-per-liter" type="number" step="0.01" placeholder="2.50" />
                      </div>
                      <div>
                        <Label htmlFor="setup-fee">Taxa de Setup (R$)</Label>
                        <Input id="setup-fee" type="number" step="0.01" placeholder="500.00" />
                      </div>
                      <div>
                        <Label htmlFor="minimum-batch">Lote Mínimo (L)</Label>
                        <Input id="minimum-batch" type="number" placeholder="500" />
                      </div>
                      <div>
                        <Label htmlFor="lead-time">Prazo Médio (dias)</Label>
                        <Input id="lead-time" type="number" placeholder="15" />
                      </div>
                    </div>
                    <Button>Atualizar Preços</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados da Fábrica</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <Label htmlFor="factory-name">Nome da Fábrica</Label>
                         <Input 
                           id="factory-name" 
                           placeholder="Nome da sua fábrica"
                           defaultValue={factoryData?.nome_razao_social || ''}
                         />
                       </div>
                       <div>
                         <Label htmlFor="cnpj">CNPJ</Label>
                         <Input 
                           id="cnpj" 
                           placeholder="00.000.000/0000-00"
                           defaultValue={factoryData?.cnpj || ''}
                         />
                       </div>
                       <div>
                         <Label htmlFor="capacity">Capacidade de Produção</Label>
                         <Input 
                           id="capacity" 
                           placeholder="Capacidade mensal"
                           defaultValue={factoryData?.capacidade_producao_mensal || ''}
                         />
                      </div>
                      <div>
                        <Label htmlFor="established">Ano de Fundação</Label>
                        <Input id="established" type="number" placeholder="2015" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Endereço</Label>
                      <Input id="address" placeholder="Endereço completo da fábrica" />
                    </div>
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea id="description" placeholder="Descreva sua fábrica e diferenciais..." />
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

export default FactoryPage;