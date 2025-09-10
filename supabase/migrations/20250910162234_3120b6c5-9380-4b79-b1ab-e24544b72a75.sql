-- Drop the view if it exists
DROP VIEW IF EXISTS marketplace_items;

-- Create marketplace_items as a proper table
CREATE TABLE public.marketplace_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit_price NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  available_quantity INTEGER DEFAULT 1,
  seller_user_id UUID NOT NULL,
  seller_type TEXT NOT NULL,
  seller_name TEXT NOT NULL,
  status TEXT DEFAULT 'Disponível',
  item_type TEXT NOT NULL CHECK (item_type IN ('product', 'recipe', 'equipment')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Marketplace items are publicly viewable" 
ON public.marketplace_items 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own marketplace items" 
ON public.marketplace_items 
FOR INSERT 
WITH CHECK (auth.uid() = seller_user_id);

CREATE POLICY "Users can update their own marketplace items" 
ON public.marketplace_items 
FOR UPDATE 
USING (auth.uid() = seller_user_id);

CREATE POLICY "Users can delete their own marketplace items" 
ON public.marketplace_items 
FOR DELETE 
USING (auth.uid() = seller_user_id);

-- Insert sample data
INSERT INTO marketplace_items (
  name, category, unit_price, unit, available_quantity, 
  seller_user_id, seller_type, seller_name, status, item_type
) VALUES 
  ('Lúpulo Cascade', 'Lúpulos', 25.90, 'kg', 50, gen_random_uuid(), 'fornecedor', 'Fornecedor Alpha', 'Disponível', 'product'),
  ('Malte Pilsen', 'Maltes', 4.50, 'kg', 1000, gen_random_uuid(), 'fornecedor', 'Maltaria Beta', 'Disponível', 'product'),
  ('Levedura Safale US-05', 'Leveduras', 12.90, 'unidade', 200, gen_random_uuid(), 'fornecedor', 'Bio Leveduras', 'Disponível', 'product'),
  ('Receita IPA Tropical', 'Receitas', 150.00, 'receita', 1, gen_random_uuid(), 'cigano', 'Cervejaria Cigana XYZ', 'Disponível', 'recipe'),
  ('Tanque Fermentador 500L', 'Equipamentos', 2500.00, 'unidade', 3, gen_random_uuid(), 'fabrica', 'Fábrica Steel', 'Disponível', 'equipment'),
  ('Mangueira Silicone', 'Equipamentos', 35.00, 'metro', 100, gen_random_uuid(), 'fornecedor', 'Equipamentos Pro', 'Disponível', 'product'),
  ('Receita Porter Clássica', 'Receitas', 120.00, 'receita', 1, gen_random_uuid(), 'cigano', 'Mestre Cervejeiro', 'Disponível', 'recipe');