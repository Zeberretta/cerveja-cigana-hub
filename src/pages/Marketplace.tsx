import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Seo from '@/components/Seo';

interface MarketplaceItem {
  id: string;
  name: string;
  category: string;
  unit_price: number;
  unit: string;
  available_quantity: number;
  seller_name: string;
  seller_user_id: string;
  seller_type: string;
  status: string;
  item_type: 'product' | 'recipe' | 'equipment';
}

const Marketplace = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchMarketplaceItems();
  }, []);

  const fetchMarketplaceItems = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select('*')
        .eq('status', 'Disponível')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems((data || []) as MarketplaceItem[]);
    } catch (error) {
      console.error('Error fetching marketplace items:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os itens do marketplace',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MarketplaceItem, quantity = 1) => {
    if (!user) {
      toast({
        title: 'Login necessário',
        description: 'Faça login para adicionar itens ao carrinho',
        variant: 'destructive'
      });
      return;
    }

    if (item.seller_user_id === user.id) {
      toast({
        title: 'Não permitido',
        description: 'Você não pode comprar seus próprios produtos',
        variant: 'destructive'
      });
      return;
    }

    addToCart({
      name: item.name,
      price: item.unit_price,
      quantity,
      unit: item.unit,
      seller_id: item.seller_user_id,
      seller_name: item.seller_name,
      type: item.item_type
    });

    toast({
      title: 'Item adicionado',
      description: `${item.name} foi adicionado ao carrinho`
    });
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.seller_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesType = typeFilter === 'all' || item.item_type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.unit_price - b.unit_price;
      case 'seller':
        return a.seller_name.localeCompare(b.seller_name);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const categories = [...new Set(items.map(item => item.category))];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">Carregando marketplace...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-background">
      <Seo 
        title="Marketplace | Cerveja Cigana Hub"
        description="Encontre produtos, receitas e equipamentos para sua cervejaria"
      />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
          <p className="text-muted-foreground">
            Encontre produtos, receitas e equipamentos para sua cervejaria
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="product">Produtos</SelectItem>
              <SelectItem value="recipe">Receitas</SelectItem>
              <SelectItem value="equipment">Equipamentos</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nome</SelectItem>
              <SelectItem value="price">Preço</SelectItem>
              <SelectItem value="seller">Vendedor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{item.name}</CardTitle>
                  <Badge variant="secondary">{item.item_type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.seller_name}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{item.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.5</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-2xl font-bold">
                    R$ {item.unit_price.toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground">/{item.unit}</span>
                  </p>
                  
                  {item.available_quantity && (
                    <p className="text-sm text-muted-foreground">
                      {item.available_quantity} {item.unit} disponíveis
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full"
                  disabled={!user || item.seller_user_id === user?.id}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum item encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou termos de busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;