# Quick Database Setup for Wishlist

## Current Status
The wishlist is currently using localStorage for immediate functionality. To enable database storage, follow these steps:

## Step 1: Run Database Migration

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the following SQL:

```sql
-- Create products table with string IDs
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image_url TEXT,
  category TEXT,
  colors TEXT[],
  rating DECIMAL(2,1) DEFAULT 0,
  reviewCount INTEGER DEFAULT 0,
  size TEXT,
  benefits TEXT[],
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wishlist_items table
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Insert sample products
INSERT INTO public.products (id, name, description, price, original_price, image_url, category, colors, rating, reviewCount, size, benefits, is_featured) VALUES
('1', 'Amethyst Cluster', 'Large amethyst cluster for meditation and energy cleansing', 89.99, 119.99, '/src/assets/healing-crystals.jpg', 'healing', ARRAY['Purple'], 4.8, 124, 'Large', ARRAY['Stress Relief', 'Spiritual Growth', 'Protection'], true),
('2', 'Rose Quartz Heart', 'Beautiful rose quartz heart for love and emotional healing', 45.99, NULL, '/src/assets/crystal-bracelets.jpg', 'healing', ARRAY['Pink'], 4.9, 89, 'Medium', ARRAY['Love', 'Emotional Healing', 'Self-Care'], false),
('3', 'Black Tourmaline', 'Protective black tourmaline crystal for grounding', 42.99, NULL, '/src/assets/natural-crystals.jpg', 'natural', ARRAY['Black'], 4.7, 156, 'Small', ARRAY['Protection', 'Grounding', 'Energy Cleansing'], false);

-- Enable Row Level Security
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own wishlist items" ON public.wishlist_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wishlist items" ON public.wishlist_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlist items" ON public.wishlist_items
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (true);
```

4. Click **Run** to execute the SQL

## Step 2: Test Database Connection

After running the migration, the wishlist will automatically start using the database. You can verify this by:

1. Adding items to your wishlist
2. Refreshing the page - items should persist
3. Checking the browser console for "Using database for wishlist" messages

## Step 3: Update Product Schema

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the following SQL to update the products table:

```sql
-- Update products table schema to match new product structure
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

-- Update existing data
UPDATE public.products 
SET sizes = CASE 
  WHEN size = 'Small' THEN ARRAY[8, 10, 12]
  WHEN size = 'Medium' THEN ARRAY[12, 15, 18]
  WHEN size = 'Large' THEN ARRAY[18, 20, 25]
  WHEN size = 'One Size' THEN ARRAY[10]
  WHEN size = 'Kit' THEN ARRAY[15]
  WHEN size = 'Set' THEN ARRAY[8, 10, 12, 15]
  WHEN size = '500ml' THEN ARRAY[500]
  ELSE ARRAY[10]
END;

-- Drop old size column
ALTER TABLE public.products DROP COLUMN IF EXISTS size;

-- Update defaults
ALTER TABLE public.products 
ALTER COLUMN colors SET DEFAULT '{}',
ALTER COLUMN sizes SET DEFAULT '{}',
ALTER COLUMN in_stock SET DEFAULT true,
ALTER COLUMN is_featured SET DEFAULT false;

-- Update foreign key constraints to work with UUID
ALTER TABLE public.wishlist_items DROP CONSTRAINT IF EXISTS fk_wishlist_product;
ALTER TABLE public.wishlist_items ALTER COLUMN product_id TYPE UUID USING product_id::UUID;
ALTER TABLE public.wishlist_items ADD CONSTRAINT fk_wishlist_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;
ALTER TABLE public.order_items ALTER COLUMN product_id TYPE UUID USING product_id::UUID;
ALTER TABLE public.order_items ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
```

4. Click **Run** to execute the SQL

## Step 4: Set Up Storage for Images (Optional)

**Note**: This step is optional. If you skip it, images will use base64 encoding as a fallback.

1. Go to **Storage** in your Supabase Dashboard
2. Click **"New bucket"**
3. Configure:
   - **Name**: `product-images`
   - **Public**: ✅ **Yes**
   - **File size limit**: `4 MB`
   - **Allowed MIME types**: `image/*`
4. Click **"Create bucket"**

### Set Up Storage Policies

Go to **Storage** > **Policies** and create these policies:

```sql
-- Allow public read access
CREATE POLICY "Public read access for product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload product images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- Allow admins to manage images
CREATE POLICY "Admins can manage product images" ON storage.objects
FOR ALL USING (
  bucket_id = 'product-images' 
  AND is_admin(auth.uid())
);
```

## Step 5: Set Up Admin Role

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the following SQL to set up admin functionality:

```sql
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
```

4. Click **Run** to execute the SQL

## Step 6: Set Up Admin User

To make yourself an admin:

1. Go to **Authentication** > **Users** in your Supabase Dashboard
2. Find your user account
3. Go to **SQL Editor** and run:

```sql
-- Replace 'your-user-id-here' with your actual user ID from the auth.users table
UPDATE public.profiles 
SET is_admin = true 
WHERE id = 'your-user-id-here';
```

## Step 7: Verify Setup

- ✅ Products table created with sample data
- ✅ Product schema updated with new columns
- ✅ Storage bucket created (optional)
- ✅ Wishlist_items table created
- ✅ RLS policies enabled
- ✅ Admin role system set up
- ✅ Admin user configured
- ✅ Wishlist automatically switches to database storage

## Troubleshooting

If you see errors:
1. Check that your Supabase project URL and API key are correct
2. Ensure you're logged in as a user
3. Check the browser console for specific error messages

The wishlist will continue to work with localStorage as a fallback if the database is not available.
