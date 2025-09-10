import { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import Seo from '@/components/Seo';

interface Order {
  id: string;
  buyer_user_id: string;
  seller_user_id: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  status: string;
  delivery_address?: string;
  delivery_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

const Orders = () => {
  const { user } = useAuth();
  const [buyerOrders, setBuyerOrders] = useState<Order[]>([]);
  const [sellerOrders, setSellerOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  const fetchOrders = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      
      // Fetch orders where user is buyer
      const { data: buyerData, error: buyerError } = await supabase
        .from('orders')
        .select('*')
        .eq('buyer_user_id', user.id)
        .order('created_at', { ascending: false });

      if (buyerError) throw buyerError;
      setBuyerOrders(buyerData || []);

      // Fetch orders where user is seller
      const { data: sellerData, error: sellerError } = await supabase
        .from('orders')
        .select('*')
        .eq('seller_user_id', user.id)
        .order('created_at', { ascending: false });

      if (sellerError) throw sellerError;
      setSellerOrders(sellerData || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os pedidos',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .eq('seller_user_id', user?.id);

      if (error) throw error;

      // Update local state
      setSellerOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // Send notification to buyer
      const order = sellerOrders.find(o => o.id === orderId);
      if (order) {
        await supabase
          .from('notifications')
          .insert([{
            user_id: order.buyer_user_id,
            title: 'Status do Pedido Atualizado',
            message: `Seu pedido foi ${newStatus === 'accepted' ? 'aceito' : newStatus === 'rejected' ? 'rejeitado' : 'atualizado'}`,
            type: newStatus === 'accepted' ? 'success' : newStatus === 'rejected' ? 'error' : 'info',
            related_order_id: orderId
          }]);
      }

      toast({
        title: 'Status atualizado',
        description: `Pedido ${newStatus === 'accepted' ? 'aceito' : newStatus === 'rejected' ? 'rejeitado' : 'atualizado'} com sucesso`
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status do pedido',
        variant: 'destructive'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendente', variant: 'secondary' as const, icon: Clock },
      accepted: { label: 'Aceito', variant: 'default' as const, icon: CheckCircle },
      rejected: { label: 'Rejeitado', variant: 'destructive' as const, icon: XCircle },
      completed: { label: 'Concluído', variant: 'default' as const, icon: Package }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const OrderCard = ({ order, showActions = false }: { order: Order; showActions?: boolean }) => (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Pedido #{order.id.slice(0, 8)}</CardTitle>
        {getStatusBadge(order.status)}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Quantidade:</span> {order.quantity}
          </div>
          <div>
            <span className="font-medium">Valor Total:</span> R$ {order.total_amount.toFixed(2)}
          </div>
          <div>
            <span className="font-medium">Data:</span> {new Date(order.created_at).toLocaleDateString('pt-BR')}
          </div>
          <div>
            <span className="font-medium">Status:</span> {order.status}
          </div>
        </div>

        {order.delivery_address && (
          <div>
            <span className="font-medium">Endereço de Entrega:</span>
            <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
          </div>
        )}

        {order.notes && (
          <div>
            <span className="font-medium">Observações:</span>
            <p className="text-sm text-muted-foreground">{order.notes}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detalhes do Pedido #{order.id.slice(0, 8)}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">ID do Pedido:</span>
                    <p className="text-sm">{order.id}</p>
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <div className="mt-1">{getStatusBadge(order.status)}</div>
                  </div>
                  <div>
                    <span className="font-medium">Quantidade:</span>
                    <p className="text-sm">{order.quantity}</p>
                  </div>
                  <div>
                    <span className="font-medium">Valor Total:</span>
                    <p className="text-sm">R$ {order.total_amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Data de Criação:</span>
                    <p className="text-sm">{new Date(order.created_at).toLocaleString('pt-BR')}</p>
                  </div>
                  <div>
                    <span className="font-medium">Última Atualização:</span>
                    <p className="text-sm">{new Date(order.updated_at).toLocaleString('pt-BR')}</p>
                  </div>
                </div>
                
                {order.delivery_address && (
                  <div>
                    <span className="font-medium">Endereço de Entrega:</span>
                    <p className="text-sm">{order.delivery_address}</p>
                  </div>
                )}
                
                {order.notes && (
                  <div>
                    <span className="font-medium">Observações:</span>
                    <p className="text-sm">{order.notes}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {showActions && order.status === 'pending' && (
            <>
              <Button
                size="sm"
                onClick={() => updateOrderStatus(order.id, 'accepted')}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Aceitar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => updateOrderStatus(order.id, 'rejected')}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Rejeitar
              </Button>
            </>
          )}

          {showActions && order.status === 'accepted' && (
            <Button
              size="sm"
              onClick={() => updateOrderStatus(order.id, 'completed')}
            >
              <Package className="h-4 w-4 mr-2" />
              Marcar como Concluído
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-background">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">Carregando pedidos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-background">
      <Seo 
        title="Meus Pedidos | Cerveja Cigana Hub"
        description="Gerencie seus pedidos de compra e venda"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Meus Pedidos</h1>
          <p className="text-muted-foreground">
            Gerencie seus pedidos de compra e venda
          </p>
        </div>

        <Tabs defaultValue="purchases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Minhas Compras ({buyerOrders.length})
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Minhas Vendas ({sellerOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchases" className="space-y-6">
            {buyerOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma compra encontrada</h3>
                <p className="text-muted-foreground">
                  Você ainda não fez nenhum pedido
                </p>
              </div>
            ) : (
              buyerOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            {sellerOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma venda encontrada</h3>
                <p className="text-muted-foreground">
                  Você ainda não recebeu nenhum pedido
                </p>
              </div>
            ) : (
              sellerOrders.map((order) => (
                <OrderCard key={order.id} order={order} showActions />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;