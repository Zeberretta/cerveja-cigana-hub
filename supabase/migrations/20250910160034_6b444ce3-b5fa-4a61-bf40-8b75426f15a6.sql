-- Add trigger to automatically update marketplace_items when products/recipes/equipments are created
CREATE OR REPLACE FUNCTION update_marketplace_items() 
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update marketplace item
  INSERT INTO marketplace_items (
    id,
    name,
    category,
    unit_price,
    unit,
    available_quantity,
    seller_user_id,
    seller_type,
    seller_name,
    status,
    item_type,
    created_at
  ) VALUES (
    NEW.id,
    NEW.name,
    NEW.category,
    NEW.price,
    NEW.unit,
    COALESCE(NEW.stock, 1),
    NEW.user_id,
    'fornecedor',
    'Vendedor',
    NEW.status,
    CASE 
      WHEN TG_TABLE_NAME = 'products' THEN 'product'
      WHEN TG_TABLE_NAME = 'recipes' THEN 'recipe'
      WHEN TG_TABLE_NAME = 'equipments' THEN 'equipment'
    END,
    NEW.created_at
  )
  ON CONFLICT (id) 
  DO UPDATE SET
    name = NEW.name,
    category = NEW.category,
    unit_price = NEW.price,
    unit = NEW.unit,
    available_quantity = COALESCE(NEW.stock, 1),
    status = NEW.status;
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for products table
CREATE TRIGGER products_marketplace_trigger
  AFTER INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_marketplace_items();

-- Create triggers for recipes table  
CREATE TRIGGER recipes_marketplace_trigger
  AFTER INSERT OR UPDATE ON recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_marketplace_items();

-- Create triggers for equipments table
CREATE TRIGGER equipments_marketplace_trigger
  AFTER INSERT OR UPDATE ON equipments
  FOR EACH ROW
  EXECUTE FUNCTION update_marketplace_items();

-- Insert some sample marketplace data
INSERT INTO marketplace_items (
  name, category, unit_price, unit, available_quantity, 
  seller_user_id, seller_type, seller_name, status, item_type
) VALUES 
  ('Lúpulo Cascade', 'Lúpulos', 25.90, 'kg', 50, gen_random_uuid(), 'fornecedor', 'Fornecedor Alpha', 'Disponível', 'product'),
  ('Malte Pilsen', 'Maltes', 4.50, 'kg', 1000, gen_random_uuid(), 'fornecedor', 'Maltaria Beta', 'Disponível', 'product'),
  ('Levedura Safale US-05', 'Leveduras', 12.90, 'unidade', 200, gen_random_uuid(), 'fornecedor', 'Bio Leveduras', 'Disponível', 'product'),
  ('Receita IPA Tropical', 'Receitas', 150.00, 'receita', 1, gen_random_uuid(), 'cigano', 'Cervejaria Cigana XYZ', 'Disponível', 'recipe'),
  ('Tanque Fermentador 500L', 'Equipamentos', 2500.00, 'unidade', 3, gen_random_uuid(), 'fabrica', 'Fábrica Steel', 'Disponível', 'equipment')
ON CONFLICT DO NOTHING;