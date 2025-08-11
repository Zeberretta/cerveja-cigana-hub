-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Policies: drop then create
DROP POLICY IF EXISTS "Testimonials are publicly readable" ON public.testimonials;
CREATE POLICY "Testimonials are publicly readable"
ON public.testimonials
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins can insert testimonials" ON public.testimonials;
CREATE POLICY "Admins can insert testimonials"
ON public.testimonials
FOR INSERT
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update testimonials" ON public.testimonials;
CREATE POLICY "Admins can update testimonials"
ON public.testimonials
FOR UPDATE
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete testimonials" ON public.testimonials;
CREATE POLICY "Admins can delete testimonials"
ON public.testimonials
FOR DELETE
USING (public.is_admin());

-- updated_at trigger
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Bootstrap admin function
CREATE OR REPLACE FUNCTION public.bootstrap_admin()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- If an admin already exists, only admins can call this
  IF EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.role = 'admin') THEN
    IF NOT public.is_admin() THEN
      RAISE EXCEPTION 'Only admins can call this function after an admin exists';
    END IF;
  END IF;

  -- Grant admin role to current user if not already
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  ) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (auth.uid(), 'admin')
    ON CONFLICT DO NOTHING;
  END IF;
END;
$$;