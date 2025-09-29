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

## Step 3: Verify Setup

- ✅ Products table created with sample data
- ✅ Wishlist_items table created
- ✅ RLS policies enabled
- ✅ Wishlist automatically switches to database storage

## Troubleshooting

If you see errors:
1. Check that your Supabase project URL and API key are correct
2. Ensure you're logged in as a user
3. Check the browser console for specific error messages

The wishlist will continue to work with localStorage as a fallback if the database is not available.
