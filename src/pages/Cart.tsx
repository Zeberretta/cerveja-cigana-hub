import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/Seo';

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleQuantityChange = (itemId: string, change: number) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + change);
    }
  };

  const createOrder = async (sellerId: string, sellerItems: typeof items) => {
    const orderData = {
      buyer_user_id: user!.id,
      seller_user_id: sellerId,
      quantity: sellerItems.reduce((sum, item) => sum + item.quantity, 0),
      unit_price: sellerItems.reduce((sum, item) => sum + item.price, 0) / sellerItems.length,
      total_amount: sellerItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      delivery_address: deliveryAddress || null,
      notes: notes || null
    };

    const { error } = await supabase
      .from('orders')
      .insert([orderData]);

    if (error) throw error;

    // Create notification for seller
    await supabase
      .from('notifications')
      .insert([{
        user_id: sellerId,
        title: 'Novo Pedido',
        message: `Você recebeu um novo pedido de ${sellerItems.length} item(s)`,
        type: 'info'
      }]);
  };

  const handleCheckout = async () => {
    if (!user || items.length === 0) return;

    setLoading(true);
    try {
      // Group items by seller
      const itemsBySeller = items.reduce((acc, item) => {
        if (!acc[item.seller_id]) {
          acc[item.seller_id] = [];
        }
        acc[item.seller_id].push(item);
        return acc;
      }, {} as Record<string, typeof items>);

      // Create separate orders for each seller
      for (const [sellerId, sellerItems] of Object.entries(itemsBySeller)) {
        await createOrder(sellerId, sellerItems);
      }

      clearCart();
      toast({
        title: 'Pedidos criados com sucesso!',
        description: 'Seus pedidos foram enviados para os vendedores'
      });
      
      navigate('/pedidos');
    } catch (error) {
      console.error('Error creating orders:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível finalizar os pedidos',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-background">
        <Seo 
          title="Carrinho | Cerveja Cigana Hub"
          description="Seu carrinho de compras"
        />
        
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-8">
              Adicione alguns produtos do marketplace para começar
            </p>
            <Button onClick={() => navigate('/marketplace')}>
              Ir para o Marketplace
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Group items by seller for display
  const itemsBySeller = items.reduce((acc, item) => {
    if (!acc[item.seller_id]) {
      acc[item.seller_id] = {
        seller_name: item.seller_name,
        items: []
      };
    }
    acc[item.seller_id].items.push(item);
    return acc;
  }, {} as Record<string, { seller_name: string; items: typeof items }>);

  return (
    <div className="min-h-screen pt-20 bg-background">
      <Seo 
        title="Carrinho | Cerveja Cigana Hub"
        description="Seu carrinho de compras"
      />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
          <Button variant="outline" onClick={clearCart}>
            <Trash2 className="h-4 w-4 mr-2" />
            Limpar Carrinho
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(itemsBySeller).map(([sellerId, { seller_name, items: sellerItems }]) => (
              <Card key={sellerId}>
                <CardHeader>
                  <CardTitle className="text-lg">Vendedor: {seller_name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sellerItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          R$ {item.price.toFixed(2)} por {item.unit}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-12 text-center">{item.quantity}</span>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Endereço de Entrega (opcional)
                    </label>
                    <Input
                      placeholder="Endereço completo..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Observações (opcional)
                    </label>
                    <Textarea
                      placeholder="Adicione observações sobre o pedido..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {loading ? 'Processando...' : 'Finalizar Pedido'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Ao finalizar, seus pedidos serão enviados para cotação
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;