-- Add admin role to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Create a function to check if a user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policy for admin-only product management
CREATE POLICY "Only admins can insert products" ON public.products
  FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can update products" ON public.products
  FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Only admins can delete products" ON public.products
  FOR DELETE USING (is_admin(auth.uid()));

-- Update existing RLS policy to allow everyone to read products
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.products TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
