# Supabase Database Setup

This directory contains the database migrations and setup files for the Adhyatma Essence application.

## Database Tables

### 1. `products` table
Stores product information including:
- `id` (TEXT, Primary Key)
- `name` (TEXT)
- `description` (TEXT)
- `price` (DECIMAL)
- `image` (TEXT)
- `category` (TEXT)
- `colors` (TEXT[])
- `size` (TEXT)
- `rating` (DECIMAL)
- `review_count` (INTEGER)
- `original_price` (DECIMAL)
- `in_stock` (BOOLEAN)
- `featured` (BOOLEAN)
- `benefits` (TEXT[])

### 2. `wishlist_items` table
Stores user wishlist items:
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to auth.users)
- `product_id` (TEXT, Foreign Key to products)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Setup Instructions

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. **First, run the contents of `001_create_wishlist_table.sql`** to create the initial tables
4. **Then, run the contents of `002_fix_product_ids.sql`** to fix the ID types and populate sample data
5. Both scripts should be run in order

### Option 2: Using Supabase CLI

1. Install Supabase CLI: `npm install -g supabase`
2. Login to Supabase: `supabase login`
3. Link your project: `supabase link --project-ref YOUR_PROJECT_REF`
4. Run migrations: `supabase db push`

### Option 3: Manual Setup

If you prefer to set up the tables manually, you can run the SQL commands one by one in your Supabase SQL editor.

## Migration Files

- `001_create_wishlist_table.sql` - Creates the initial database schema
- `002_fix_product_ids.sql` - Fixes ID types to match application data and populates sample products

## Row Level Security (RLS)

The tables are protected with Row Level Security policies:
- Users can only view/modify their own wishlist items
- Products are viewable by everyone
- All operations require authentication

## Fallback Mechanism

The application includes a fallback mechanism that uses localStorage when the database is not available or properly configured. This ensures the wishlist functionality works even without database setup.

## Troubleshooting

If you encounter 400 Bad Request errors:
1. Ensure the database tables are created
2. Check that RLS policies are properly set up
3. Verify your Supabase project URL and API key are correct
4. The application will automatically fall back to localStorage if database operations fail
