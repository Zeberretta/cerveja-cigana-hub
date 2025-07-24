-- Create enum for user types
CREATE TYPE public.user_type AS ENUM ('cigano', 'fabrica', 'fornecedor', 'bar');

-- Create profiles table for all users
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type public.user_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cigano registrations table
CREATE TABLE public.cigano_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_razao_social TEXT NOT NULL,
  cnpj_cpf TEXT NOT NULL,
  inscricao_estadual TEXT,
  endereco_completo TEXT NOT NULL,
  estimativa_producao_mensal TEXT NOT NULL,
  tempo_atuacao TEXT NOT NULL,
  telefone_whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  link_untappd TEXT,
  link_instagram TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create fabrica registrations table
CREATE TABLE public.fabrica_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_razao_social TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  inscricao_estadual TEXT,
  registro_mapa TEXT NOT NULL,
  endereco_completo TEXT NOT NULL,
  capacidade_producao_mensal TEXT NOT NULL,
  tempo_atuacao TEXT NOT NULL,
  telefone_whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  logo_url TEXT,
  link_instagram TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create fornecedor registrations table
CREATE TABLE public.fornecedor_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_razao_social TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  registro_mapa TEXT NOT NULL,
  endereco_completo TEXT NOT NULL,
  capacidade_producao_mensal TEXT NOT NULL,
  tempo_atuacao TEXT NOT NULL,
  telefone_whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  logo_url TEXT,
  link_instagram TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bar registrations table
CREATE TABLE public.bar_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_razao_social TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  endereco_completo TEXT NOT NULL,
  demanda_media_mensal TEXT NOT NULL,
  tempo_atuacao TEXT NOT NULL,
  telefone_whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  logo_url TEXT,
  link_instagram TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cigano_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fabrica_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fornecedor_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bar_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for cigano registrations
CREATE POLICY "Users can view their own cigano registration" 
ON public.cigano_registrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cigano registration" 
ON public.cigano_registrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cigano registration" 
ON public.cigano_registrations 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for fabrica registrations
CREATE POLICY "Users can view their own fabrica registration" 
ON public.fabrica_registrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own fabrica registration" 
ON public.fabrica_registrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own fabrica registration" 
ON public.fabrica_registrations 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for fornecedor registrations
CREATE POLICY "Users can view their own fornecedor registration" 
ON public.fornecedor_registrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own fornecedor registration" 
ON public.fornecedor_registrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own fornecedor registration" 
ON public.fornecedor_registrations 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for bar registrations
CREATE POLICY "Users can view their own bar registration" 
ON public.bar_registrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bar registration" 
ON public.bar_registrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bar registration" 
ON public.bar_registrations 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cigano_registrations_updated_at
  BEFORE UPDATE ON public.cigano_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fabrica_registrations_updated_at
  BEFORE UPDATE ON public.fabrica_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fornecedor_registrations_updated_at
  BEFORE UPDATE ON public.fornecedor_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bar_registrations_updated_at
  BEFORE UPDATE ON public.bar_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for logos
INSERT INTO storage.buckets (id, name, public) VALUES ('logos', 'logos', true);

-- Create policies for logo uploads
CREATE POLICY "Users can upload their own logos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view all logos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'logos');

CREATE POLICY "Users can update their own logos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);