-- Create beers table for marketplace
CREATE TABLE public.beers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brewery_user_id uuid NOT NULL,
  name text NOT NULL,
  brewery_name text NOT NULL,
  style text NOT NULL,
  abv numeric NOT NULL,
  ibu integer NOT NULL,
  price numeric NOT NULL,
  description text,
  rating numeric DEFAULT 0,
  total_ratings integer DEFAULT 0,
  available boolean DEFAULT true,
  image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on beers
ALTER TABLE public.beers ENABLE ROW LEVEL SECURITY;

-- Create policies for beers
CREATE POLICY "Beers are publicly viewable" 
ON public.beers 
FOR SELECT 
USING (true);

CREATE POLICY "Brewery users can create their own beers" 
ON public.beers 
FOR INSERT 
WITH CHECK (auth.uid() = brewery_user_id);

CREATE POLICY "Brewery users can update their own beers" 
ON public.beers 
FOR UPDATE 
USING (auth.uid() = brewery_user_id);

CREATE POLICY "Brewery users can delete their own beers" 
ON public.beers 
FOR DELETE 
USING (auth.uid() = brewery_user_id);

-- Create beer reviews table
CREATE TABLE public.beer_reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  beer_id uuid NOT NULL REFERENCES public.beers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(beer_id, user_id)
);

-- Enable RLS on beer reviews
ALTER TABLE public.beer_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for beer reviews
CREATE POLICY "Reviews are publicly viewable" 
ON public.beer_reviews 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create reviews" 
ON public.beer_reviews 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" 
ON public.beer_reviews 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" 
ON public.beer_reviews 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER update_beers_updated_at
BEFORE UPDATE ON public.beers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample beer data from cigano breweries
INSERT INTO public.beers (brewery_user_id, name, brewery_name, style, abv, ibu, price, description, rating, total_ratings, available, created_at) VALUES 
-- Sample data for demo purposes
((SELECT user_id FROM cigano_registrations LIMIT 1), 'IPA Tropical', 'Cervejaria Artesanal', 'IPA', 6.5, 45, 12.50, 'Uma IPA com notas tropicais e amargor equilibrado', 4.8, 127, true, now()),
((SELECT user_id FROM cigano_registrations LIMIT 1), 'Pilsen Premium', 'Brasil Craft', 'Pilsen', 4.8, 25, 8.90, 'Pilsen refrescante com malte nacional de alta qualidade', 4.6, 98, true, now()),
((SELECT user_id FROM cigano_registrations LIMIT 1), 'Stout Imperial', 'Hop Lovers', 'Stout', 8.2, 60, 15.00, 'Stout encorpada com notas de chocolate e café', 4.9, 156, false, now()),
((SELECT user_id FROM cigano_registrations LIMIT 1), 'Weiss Tradicional', 'Bavária Craft', 'Weiss', 5.2, 18, 10.50, 'Weiss alemã tradicional com trigo e banana', 4.7, 89, true, now());