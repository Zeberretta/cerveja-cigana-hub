-- Promote specific user to admin
DO $$
DECLARE
  v_user uuid := 'e4d999cc-3b79-4b0a-91a3-258b5b30362b';
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = v_user AND role = 'admin'
  ) THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (v_user, 'admin');
  END IF;
END;
$$;