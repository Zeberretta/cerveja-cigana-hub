-- Phase 1: Critical Security Fixes

-- 1. Drop and recreate marketplace_items view properly
DROP VIEW IF EXISTS public.marketplace_items;

-- Create a new marketplace_items view without SECURITY DEFINER
CREATE VIEW public.marketplace_items AS 
SELECT 
  p.id,
  p.name,
  p.category,
  p.price as unit_price,
  p.stock as available_quantity,
  p.unit,
  p.status,
  p.created_at,
  p.user_id as seller_user_id,
  COALESCE(cr.nome_razao_social, fr.nome_razao_social, fnr.nome_razao_social, br.nome_razao_social) as seller_name,
  COALESCE(
    CASE WHEN cr.id IS NOT NULL THEN 'cigano'::user_type END,
    CASE WHEN fr.id IS NOT NULL THEN 'fabrica'::user_type END,
    CASE WHEN fnr.id IS NOT NULL THEN 'fornecedor'::user_type END,
    CASE WHEN br.id IS NOT NULL THEN 'bar'::user_type END
  ) as seller_type,
  'product' as item_type
FROM public.products p
LEFT JOIN public.cigano_registrations cr ON p.user_id = cr.user_id
LEFT JOIN public.fabrica_registrations fr ON p.user_id = fr.user_id
LEFT JOIN public.fornecedor_registrations fnr ON p.user_id = fnr.user_id
LEFT JOIN public.bar_registrations br ON p.user_id = br.user_id
WHERE p.status = 'Disponível' AND p.stock > 0

UNION ALL

SELECT 
  e.id,
  e.name,
  e.type as category,
  NULL as unit_price,
  NULL as available_quantity,
  NULL as unit,
  e.status,
  e.created_at,
  e.user_id as seller_user_id,
  COALESCE(cr.nome_razao_social, fr.nome_razao_social, fnr.nome_razao_social, br.nome_razao_social) as seller_name,
  COALESCE(
    CASE WHEN cr.id IS NOT NULL THEN 'cigano'::user_type END,
    CASE WHEN fr.id IS NOT NULL THEN 'fabrica'::user_type END,
    CASE WHEN fnr.id IS NOT NULL THEN 'fornecedor'::user_type END,
    CASE WHEN br.id IS NOT NULL THEN 'bar'::user_type END
  ) as seller_type,
  'equipment' as item_type
FROM public.equipments e
LEFT JOIN public.cigano_registrations cr ON e.user_id = cr.user_id
LEFT JOIN public.fabrica_registrations fr ON e.user_id = fr.user_id
LEFT JOIN public.fornecedor_registrations fnr ON e.user_id = fnr.user_id
LEFT JOIN public.bar_registrations br ON e.user_id = br.user_id
WHERE e.status = 'Disponível'

UNION ALL

SELECT 
  r.id,
  r.name,
  r.style as category,
  r.price as unit_price,
  NULL as available_quantity,
  NULL as unit,
  r.status,
  r.created_at,
  r.user_id as seller_user_id,
  COALESCE(cr.nome_razao_social, fr.nome_razao_social, fnr.nome_razao_social, br.nome_razao_social) as seller_name,
  COALESCE(
    CASE WHEN cr.id IS NOT NULL THEN 'cigano'::user_type END,
    CASE WHEN fr.id IS NOT NULL THEN 'fabrica'::user_type END,
    CASE WHEN fnr.id IS NOT NULL THEN 'fornecedor'::user_type END,
    CASE WHEN br.id IS NOT NULL THEN 'bar'::user_type END
  ) as seller_type,
  'recipe' as item_type
FROM public.recipes r
LEFT JOIN public.cigano_registrations cr ON r.user_id = cr.user_id
LEFT JOIN public.fabrica_registrations fr ON r.user_id = fr.user_id
LEFT JOIN public.fornecedor_registrations fnr ON r.user_id = fnr.user_id
LEFT JOIN public.bar_registrations br ON r.user_id = br.user_id
WHERE r.status = 'Publicado';

-- 2. Create admin role system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (public.is_admin());

-- Add trigger for updated_at
CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();