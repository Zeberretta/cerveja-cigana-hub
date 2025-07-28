-- Create orders table for marketplace transactions
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_user_id UUID NOT NULL,
  seller_user_id UUID NOT NULL,
  product_id UUID REFERENCES public.products(id),
  recipe_id UUID REFERENCES public.recipes(id),
  equipment_id UUID REFERENCES public.equipments(id),
  quantity INTEGER NOT NULL,
  unit_price NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  delivery_address TEXT,
  delivery_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  read BOOLEAN NOT NULL DEFAULT false,
  related_order_id UUID REFERENCES public.orders(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create messages table for chat system
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_user_id UUID NOT NULL,
  receiver_user_id UUID NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  related_order_id UUID REFERENCES public.orders(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create marketplace_items view combining all sellable items
CREATE VIEW public.marketplace_items AS
SELECT 
  'product' as item_type,
  p.id,
  p.name,
  p.category,
  p.price as unit_price,
  p.unit,
  p.stock as available_quantity,
  p.status,
  p.user_id as seller_user_id,
  p.created_at,
  COALESCE(fr.nome_razao_social, bar.nome_razao_social, fab.nome_razao_social, cig.nome_razao_social) as seller_name,
  prof.user_type as seller_type
FROM products p
LEFT JOIN profiles prof ON p.user_id = prof.user_id
LEFT JOIN fornecedor_registrations fr ON p.user_id = fr.user_id
LEFT JOIN bar_registrations bar ON p.user_id = bar.user_id
LEFT JOIN fabrica_registrations fab ON p.user_id = fab.user_id
LEFT JOIN cigano_registrations cig ON p.user_id = cig.user_id
WHERE p.status = 'Disponível' AND p.stock > 0

UNION ALL

SELECT 
  'recipe' as item_type,
  r.id,
  r.name,
  r.style as category,
  r.price as unit_price,
  'receita' as unit,
  1 as available_quantity,
  r.status,
  r.user_id as seller_user_id,
  r.created_at,
  COALESCE(cig.nome_razao_social, fab.nome_razao_social) as seller_name,
  prof.user_type as seller_type
FROM recipes r
LEFT JOIN profiles prof ON r.user_id = prof.user_id
LEFT JOIN cigano_registrations cig ON r.user_id = cig.user_id
LEFT JOIN fabrica_registrations fab ON r.user_id = fab.user_id
WHERE r.status = 'Aprovada'

UNION ALL

SELECT 
  'equipment' as item_type,
  e.id,
  e.name,
  e.type as category,
  0 as unit_price,
  'unidade' as unit,
  1 as available_quantity,
  e.status,
  e.user_id as seller_user_id,
  e.created_at,
  COALESCE(fab.nome_razao_social, cig.nome_razao_social) as seller_name,
  prof.user_type as seller_type
FROM equipments e
LEFT JOIN profiles prof ON e.user_id = prof.user_id
LEFT JOIN fabrica_registrations fab ON e.user_id = fab.user_id
LEFT JOIN cigano_registrations cig ON e.user_id = cig.user_id
WHERE e.status = 'Disponível';

-- Enable RLS for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Orders policies
CREATE POLICY "Users can view orders they are involved in" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = buyer_user_id OR auth.uid() = seller_user_id);

CREATE POLICY "Users can create orders as buyers" 
ON public.orders 
FOR INSERT 
WITH CHECK (auth.uid() = buyer_user_id);

CREATE POLICY "Users can update orders they are involved in" 
ON public.orders 
FOR UPDATE 
USING (auth.uid() = buyer_user_id OR auth.uid() = seller_user_id);

-- Enable RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Notifications policies
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Enable RLS for messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Messages policies
CREATE POLICY "Users can view messages they sent or received" 
ON public.messages 
FOR SELECT 
USING (auth.uid() = sender_user_id OR auth.uid() = receiver_user_id);

CREATE POLICY "Users can send messages" 
ON public.messages 
FOR INSERT 
WITH CHECK (auth.uid() = sender_user_id);

CREATE POLICY "Users can update messages they received" 
ON public.messages 
FOR UPDATE 
USING (auth.uid() = receiver_user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();