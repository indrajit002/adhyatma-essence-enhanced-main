-- Update products table schema to match new product structure
-- This migration adds missing columns and updates existing ones

-- First, ensure the products table exists with proper structure
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image_url TEXT,
  category TEXT,
  colors TEXT[] DEFAULT '{}',
  rating DECIMAL(3,2) DEFAULT 0,
  reviewCount INTEGER DEFAULT 0,
  sizes INTEGER[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to existing table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS sizes INTEGER[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing columns to match new structure
-- Change size from TEXT to INTEGER array (sizes)
-- First, we need to handle existing data
UPDATE public.products 
SET sizes = CASE 
  WHEN size = 'Small' THEN ARRAY[8, 10, 12]
  WHEN size = 'Medium' THEN ARRAY[12, 15, 18]
  WHEN size = 'Large' THEN ARRAY[18, 20, 25]
  WHEN size = 'One Size' THEN ARRAY[10]
  WHEN size = 'Kit' THEN ARRAY[15]
  WHEN size = 'Set' THEN ARRAY[8, 10, 12, 15]
  WHEN size = '500ml' THEN ARRAY[500]
  ELSE ARRAY[10] -- Default size
END;

-- Now drop the old size column
ALTER TABLE public.products DROP COLUMN IF EXISTS size;

-- Update colors column to be empty array by default (since we removed color filtering)
UPDATE public.products SET colors = '{}' WHERE colors IS NULL;

-- Update the products table structure
ALTER TABLE public.products 
ALTER COLUMN colors SET DEFAULT '{}',
ALTER COLUMN sizes SET DEFAULT '{}',
ALTER COLUMN in_stock SET DEFAULT true,
ALTER COLUMN is_featured SET DEFAULT false;

-- Update RLS policies for admin product management
DROP POLICY IF EXISTS "Only admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Only admins can update products" ON public.products;
DROP POLICY IF EXISTS "Only admins can delete products" ON public.products;

-- Create admin-only policies
CREATE POLICY "Only admins can insert products" ON public.products
  FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can update products" ON public.products
  FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Only admins can delete products" ON public.products
  FOR DELETE USING (is_admin(auth.uid()));

-- Ensure products are viewable by everyone
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (true);

-- Update foreign key constraints to work with UUID
ALTER TABLE public.wishlist_items DROP CONSTRAINT IF EXISTS fk_wishlist_product;
ALTER TABLE public.wishlist_items ALTER COLUMN product_id TYPE UUID USING product_id::UUID;
ALTER TABLE public.wishlist_items ADD CONSTRAINT fk_wishlist_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;
ALTER TABLE public.order_items ALTER COLUMN product_id TYPE UUID USING product_id::UUID;
ALTER TABLE public.order_items ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

-- Grant necessary permissions
GRANT ALL ON public.products TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
