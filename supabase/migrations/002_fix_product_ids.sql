-- Fix product IDs to match application data
-- This migration updates the products table to use string IDs instead of UUIDs

-- First, let's update the products table to use TEXT for id instead of UUID
ALTER TABLE public.products ALTER COLUMN id TYPE TEXT;

-- Update the wishlist_items table to also use TEXT for product_id
ALTER TABLE public.wishlist_items ALTER COLUMN product_id TYPE TEXT;

-- Update the order_items table to also use TEXT for product_id
ALTER TABLE public.order_items ALTER COLUMN product_id TYPE TEXT;

-- Insert sample products that match your application data
-- This will populate the database with products that have string IDs like '1', '2', etc.

INSERT INTO public.products (id, name, description, price, original_price, image_url, category, colors, rating, reviewCount, size, benefits, is_featured) VALUES
('1', 'Amethyst Cluster', 'Large amethyst cluster for meditation and energy cleansing', 89.99, 119.99, '/src/assets/healing-crystals.jpg', 'healing', ARRAY['Purple'], 4.8, 124, 'Large', ARRAY['Stress Relief', 'Spiritual Growth', 'Protection'], true),
('2', 'Rose Quartz Heart', 'Beautiful rose quartz heart for love and emotional healing', 45.99, NULL, '/src/assets/crystal-bracelets.jpg', 'healing', ARRAY['Pink'], 4.9, 89, 'Medium', ARRAY['Love', 'Emotional Healing', 'Self-Care'], false),
('3', 'Black Tourmaline', 'Protective black tourmaline crystal for grounding', 42.99, NULL, '/src/assets/natural-crystals.jpg', 'natural', ARRAY['Black'], 4.7, 156, 'Small', ARRAY['Protection', 'Grounding', 'Energy Cleansing'], false),
('4', 'Clear Quartz Point', 'High-quality clear quartz point for amplification', 35.99, 49.99, '/src/assets/crystal-trees.jpg', 'natural', ARRAY['Clear'], 4.6, 203, 'Medium', ARRAY['Amplification', 'Clarity', 'Energy'], true),
('5', 'Crystal Bracelet Set', 'Set of 3 crystal bracelets for daily wear', 67.99, 89.99, '/src/assets/crystal-bracelets.jpg', 'jewelry', ARRAY['Multi'], 4.8, 78, 'One Size', ARRAY['Daily Protection', 'Style', 'Energy'], false),
('6', 'Crystal Tree', 'Beautiful crystal tree for home decoration', 125.99, 149.99, '/src/assets/crystal-trees.jpg', 'decorative', ARRAY['Multi'], 4.9, 45, 'Large', ARRAY['Home Energy', 'Decoration', 'Feng Shui'], true),
('7', 'Crystal Kit', 'Complete crystal starter kit with guide', 89.99, 119.99, '/src/assets/crystal-kits.jpg', 'kits', ARRAY['Multi'], 4.7, 92, 'Kit', ARRAY['Learning', 'Variety', 'Guidance'], false),
('8', 'Crystal Bottle', 'Infused crystal water bottle', 39.99, 54.99, '/src/assets/crystal-bottles.jpg', 'accessories', ARRAY['Clear'], 4.5, 167, '500ml', ARRAY['Hydration', 'Energy', 'Wellness'], false),
('9', 'Tumbled Stones Set', 'Collection of tumbled healing stones', 29.99, 39.99, '/src/assets/tumbled-stones.jpg', 'healing', ARRAY['Multi'], 4.4, 134, 'Set', ARRAY['Variety', 'Pocket Size', 'Healing'], false),
('10', 'Selenite Wand', 'Cleansing selenite wand for energy work', 24.99, NULL, '/src/assets/natural-crystals.jpg', 'natural', ARRAY['White'], 4.6, 98, 'Medium', ARRAY['Cleansing', 'Energy Work', 'Meditation'], false);

-- Update the foreign key constraints to work with TEXT
ALTER TABLE public.wishlist_items DROP CONSTRAINT IF EXISTS fk_wishlist_product;
ALTER TABLE public.wishlist_items ADD CONSTRAINT fk_wishlist_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;
ALTER TABLE public.order_items ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

-- Update RLS policies to work with the new structure
DROP POLICY IF EXISTS "Users can view their own wishlist items" ON public.wishlist_items;
DROP POLICY IF EXISTS "Users can insert their own wishlist items" ON public.wishlist_items;
DROP POLICY IF EXISTS "Users can delete their own wishlist items" ON public.wishlist_items;

CREATE POLICY "Users can view their own wishlist items" ON public.wishlist_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wishlist items" ON public.wishlist_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlist items" ON public.wishlist_items
  FOR DELETE USING (auth.uid() = user_id);

-- Ensure products are viewable by everyone
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (true);
