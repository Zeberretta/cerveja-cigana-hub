-- Create equipments table for factories
CREATE TABLE public.equipments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'Disponível',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recipes table for gypsy breweries
CREATE TABLE public.recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  style TEXT NOT NULL,
  abv DECIMAL(4,2) NOT NULL,
  ibu INTEGER NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Rascunho',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table for suppliers
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  price DECIMAL(8,2) NOT NULL,
  unit TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Disponível',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create production_schedule table for factories
CREATE TABLE public.production_schedule (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  factory_user_id UUID NOT NULL,
  gypsy_user_id UUID,
  gypsy_name TEXT NOT NULL,
  recipe_name TEXT NOT NULL,
  production_date DATE NOT NULL,
  volume INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pendente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.equipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_schedule ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for equipments
CREATE POLICY "Users can view their own equipments" 
ON public.equipments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own equipments" 
ON public.equipments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own equipments" 
ON public.equipments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own equipments" 
ON public.equipments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for recipes
CREATE POLICY "Users can view their own recipes" 
ON public.recipes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own recipes" 
ON public.recipes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recipes" 
ON public.recipes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recipes" 
ON public.recipes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for products
CREATE POLICY "Users can view their own products" 
ON public.products 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own products" 
ON public.products 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products" 
ON public.products 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products" 
ON public.products 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for production_schedule
CREATE POLICY "Factory users can view their own schedule" 
ON public.production_schedule 
FOR SELECT 
USING (auth.uid() = factory_user_id);

CREATE POLICY "Factory users can create schedule entries" 
ON public.production_schedule 
FOR INSERT 
WITH CHECK (auth.uid() = factory_user_id);

CREATE POLICY "Factory users can update their own schedule" 
ON public.production_schedule 
FOR UPDATE 
USING (auth.uid() = factory_user_id);

CREATE POLICY "Factory users can delete their own schedule" 
ON public.production_schedule 
FOR DELETE 
USING (auth.uid() = factory_user_id);

-- Create triggers for updated_at columns
CREATE TRIGGER update_equipments_updated_at
BEFORE UPDATE ON public.equipments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at
BEFORE UPDATE ON public.recipes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_production_schedule_updated_at
BEFORE UPDATE ON public.production_schedule
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();