# Adhyatma Crystal Store - Supabase Backend Setup Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Database Schema Design](#database-schema-design)
3. [Supabase Project Setup](#supabase-project-setup)
4. [Database Tables Creation](#database-tables-creation)
5. [Authentication Setup](#authentication-setup)
6. [Row Level Security (RLS)](#row-level-security-rls)
7. [API Endpoints](#api-endpoints)
8. [Frontend Integration](#frontend-integration)
9. [Environment Configuration](#environment-configuration)
10. [Testing & Validation](#testing--validation)

---

## 🎯 Overview

This guide will help you set up Supabase as the backend for your Adhyatma Crystal Store, replacing the current mock data with a real database and authentication system.

### Current Frontend Structure Analysis
- **Authentication**: Mock auth with localStorage persistence
- **Products**: Hardcoded product data in components
- **Cart**: Local state management with localStorage
- **Collections**: Static collection data
- **User Data**: Mock user profiles

### Backend Requirements
- **Database**: PostgreSQL with Supabase
- **Authentication**: Supabase Auth with email/password
- **Storage**: Supabase Storage for product images
- **Real-time**: Real-time subscriptions for cart updates
- **API**: Auto-generated REST and GraphQL APIs

---

## 🗄️ Database Schema Design

### Core Tables

#### 1. **profiles** (User Profiles)
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. **categories**
```sql
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. **products**
```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  sku TEXT UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  is_in_stock BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  weight DECIMAL(8,2),
  dimensions JSONB, -- {length, width, height}
  colors TEXT[],
  sizes TEXT[],
  benefits TEXT[],
  category_id UUID REFERENCES categories(id),
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 4. **product_images**
```sql
CREATE TABLE product_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 5. **collections**
```sql
CREATE TABLE collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 6. **collection_products**
```sql
CREATE TABLE collection_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collection_id, product_id)
);
```

#### 7. **cart_items**
```sql
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

#### 8. **orders**
```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 9. **order_items**
```sql
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 10. **reviews**
```sql
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

---

## 🚀 Supabase Project Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `adhyatma-crystal-store`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for project initialization (2-3 minutes)

### Step 2: Get Project Credentials
1. Go to **Settings** → **API**
2. Copy the following credentials:
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 3: Install Supabase CLI (Optional but Recommended)
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Initialize project (run in your project root)
supabase init

# Link to your remote project
supabase link --project-ref your-project-ref
```

---

## 🗃️ Database Tables Creation

### Step 1: Access SQL Editor
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Click "New Query"

### Step 2: Create Tables
Copy and run the following SQL scripts in order:

#### 1. Enable UUID Extension
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

#### 2. Create Categories Table
```sql
-- Create categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Healing Crystals', 'healing-crystals', 'Crystals for healing and meditation', 1),
('Natural Crystals', 'natural-crystals', 'Natural, unprocessed crystals', 2),
('Crystal Jewelry', 'crystal-jewelry', 'Crystal bracelets, necklaces, and pendants', 3),
('Decorative', 'decorative', 'Crystal trees and decorative pieces', 4),
('Crystal Kits', 'crystal-kits', 'Complete crystal sets and kits', 5),
('Accessories', 'accessories', 'Crystal bottles and accessories', 6);
```

#### 3. Create Collections Table
```sql
-- Create collections table
CREATE TABLE collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample collections
INSERT INTO collections (name, slug, description, sort_order) VALUES
('Healing Crystals', 'healing-crystals', 'Discover our collection of healing crystals', 1),
('Natural Crystals', 'natural-crystals', 'Raw, natural crystals in their purest form', 2),
('Crystal Bracelets', 'crystal-bracelets', 'Beautiful crystal bracelets for daily wear', 3),
('Crystal Trees', 'crystal-trees', 'Decorative crystal trees for your space', 4),
('Crystal Kits', 'crystal-kits', 'Complete crystal healing kits', 5),
('Crystal Bottles', 'crystal-bottles', 'Crystal-infused water bottles', 6);
```

#### 4. Create Products Table
```sql
-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  sku TEXT UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  is_in_stock BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  weight DECIMAL(8,2),
  dimensions JSONB,
  colors TEXT[],
  sizes TEXT[],
  benefits TEXT[],
  category_id UUID REFERENCES categories(id),
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_in_stock ON products(is_in_stock);
```

#### 5. Create Product Images Table
```sql
-- Create product_images table
CREATE TABLE product_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_product_images_product ON product_images(product_id);
```

#### 6. Create Collection Products Table
```sql
-- Create collection_products table
CREATE TABLE collection_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collection_id, product_id)
);
```

#### 7. Create Cart Items Table
```sql
-- Create cart_items table
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create index for better performance
CREATE INDEX idx_cart_items_user ON cart_items(user_id);
```

#### 8. Create Orders Table
```sql
-- Create orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
```

#### 9. Create Order Items Table
```sql
-- Create order_items table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_order_items_order ON order_items(order_id);
```

#### 10. Create Reviews Table
```sql
-- Create reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create index for better performance
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
```

#### 11. Create Profiles Table
```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

---

## 🔐 Authentication Setup

### Step 1: Configure Authentication
1. Go to **Authentication** → **Settings**
2. Configure the following:

#### General Settings
- **Site URL**: `http://localhost:8080` (for development)
- **Redirect URLs**: 
  - `http://localhost:8080/auth/callback`
  - `https://your-domain.com/auth/callback`

#### Email Settings
- **Enable email confirmations**: ✅
- **Enable email change confirmations**: ✅
- **Enable secure email change**: ✅

#### Provider Settings
- **Email**: ✅ Enabled
- **Phone**: ❌ Disabled (unless needed)

### Step 2: Create Database Functions

#### User Profile Creation Function
```sql
-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 🛡️ Row Level Security (RLS)

### Step 1: Enable RLS on All Tables
```sql
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
```

### Step 2: Create RLS Policies

#### Categories (Public Read)
```sql
-- Categories are publicly readable
CREATE POLICY "Categories are publicly readable" ON categories
  FOR SELECT USING (true);
```

#### Collections (Public Read)
```sql
-- Collections are publicly readable
CREATE POLICY "Collections are publicly readable" ON collections
  FOR SELECT USING (true);
```

#### Products (Public Read)
```sql
-- Products are publicly readable
CREATE POLICY "Products are publicly readable" ON products
  FOR SELECT USING (true);
```

#### Product Images (Public Read)
```sql
-- Product images are publicly readable
CREATE POLICY "Product images are publicly readable" ON product_images
  FOR SELECT USING (true);
```

#### Collection Products (Public Read)
```sql
-- Collection products are publicly readable
CREATE POLICY "Collection products are publicly readable" ON collection_products
  FOR SELECT USING (true);
```

#### Cart Items (User-specific)
```sql
-- Users can only see their own cart items
CREATE POLICY "Users can view own cart items" ON cart_items
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own cart items
CREATE POLICY "Users can insert own cart items" ON cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own cart items
CREATE POLICY "Users can update own cart items" ON cart_items
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own cart items
CREATE POLICY "Users can delete own cart items" ON cart_items
  FOR DELETE USING (auth.uid() = user_id);
```

#### Orders (User-specific)
```sql
-- Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own orders
CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders
CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);
```

#### Order Items (User-specific)
```sql
-- Users can only see their own order items
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );
```

#### Reviews (User-specific)
```sql
-- Users can view all reviews
CREATE POLICY "Reviews are publicly readable" ON reviews
  FOR SELECT USING (true);

-- Users can insert their own reviews
CREATE POLICY "Users can insert own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);
```

#### Profiles (User-specific)
```sql
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

---

## 🔌 API Endpoints

### Auto-generated REST API
Supabase automatically generates REST API endpoints for all tables:

#### Base URL
```
https://your-project-ref.supabase.co/rest/v1/
```

#### Common Endpoints

##### Products
```typescript
// Get all products
GET /products?select=*

// Get products by category
GET /products?category_id=eq.{category_id}

// Get featured products
GET /products?is_featured=eq.true

// Get single product
GET /products?id=eq.{product_id}

// Search products
GET /products?name=ilike.*{search_term}*
```

##### Categories
```typescript
// Get all categories
GET /categories?select=*

// Get active categories
GET /categories?is_active=eq.true
```

##### Collections
```typescript
// Get all collections
GET /collections?select=*

// Get collection with products
GET /collections?id=eq.{collection_id}&select=*,collection_products(*,products(*))
```

##### Cart Items
```typescript
// Get user's cart items
GET /cart_items?select=*,products(*)

// Add item to cart
POST /cart_items
{
  "product_id": "uuid",
  "quantity": 1
}

// Update cart item quantity
PATCH /cart_items?id=eq.{item_id}
{
  "quantity": 2
}

// Remove item from cart
DELETE /cart_items?id=eq.{item_id}
```

##### Orders
```typescript
// Get user's orders
GET /orders?select=*,order_items(*)

// Create new order
POST /orders
{
  "order_number": "ORD-123456",
  "total_amount": 99.99,
  "shipping_address": {...},
  "payment_method": "stripe"
}
```

---

## 🎨 Frontend Integration

### Step 1: Install Supabase Client
```bash
npm install @supabase/supabase-js
```

### Step 2: Create Supabase Client
Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone?: string
          address?: string
          avatar_url?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone?: string
          address?: string
          avatar_url?: string
        }
        Update: {
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          address?: string
          avatar_url?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description?: string
          short_description?: string
          price: number
          original_price?: number
          sku?: string
          stock_quantity: number
          is_in_stock: boolean
          is_featured: boolean
          is_active: boolean
          weight?: number
          dimensions?: any
          colors?: string[]
          sizes?: string[]
          benefits?: string[]
          category_id?: string
          rating: number
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          slug: string
          description?: string
          short_description?: string
          price: number
          original_price?: number
          sku?: string
          stock_quantity?: number
          is_in_stock?: boolean
          is_featured?: boolean
          is_active?: boolean
          weight?: number
          dimensions?: any
          colors?: string[]
          sizes?: string[]
          benefits?: string[]
          category_id?: string
        }
        Update: {
          name?: string
          slug?: string
          description?: string
          short_description?: string
          price?: number
          original_price?: number
          sku?: string
          stock_quantity?: number
          is_in_stock?: boolean
          is_featured?: boolean
          is_active?: boolean
          weight?: number
          dimensions?: any
          colors?: string[]
          sizes?: string[]
          benefits?: string[]
          category_id?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          product_id: string
          quantity?: number
        }
        Update: {
          quantity?: number
        }
      }
      // ... other tables
    }
  }
}
```

### Step 3: Update Environment Variables
Create `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 4: Create API Service Layer
Create `src/services/api.ts`:

```typescript
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Product = Database['public']['Tables']['products']['Row']
type ProductInsert = Database['public']['Tables']['products']['Insert']
type CartItem = Database['public']['Tables']['cart_items']['Row']
type CartItemInsert = Database['public']['Tables']['cart_items']['Insert']

export class ApiService {
  // Products
  static async getProducts(filters?: {
    category?: string
    featured?: boolean
    search?: string
    limit?: number
  }) {
    let query = supabase
      .from('products')
      .select(`
        *,
        product_images(*),
        categories(*)
      `)
      .eq('is_active', true)

    if (filters?.category) {
      query = query.eq('category_id', filters.category)
    }

    if (filters?.featured) {
      query = query.eq('is_featured', true)
    }

    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  }

  static async getProduct(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*),
        categories(*),
        reviews(*, profiles(*))
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Categories
  static async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (error) throw error
    return data
  }

  // Collections
  static async getCollections() {
    const { data, error } = await supabase
      .from('collections')
      .select(`
        *,
        collection_products(
          *,
          products(*, product_images(*))
        )
      `)
      .eq('is_active', true)
      .order('sort_order')

    if (error) throw error
    return data
  }

  // Cart
  static async getCartItems() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products(*, product_images(*))
      `)
      .eq('user_id', user.id)

    if (error) throw error
    return data
  }

  static async addToCart(productId: string, quantity: number = 1) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: user.id,
        product_id: productId,
        quantity
      })

    if (error) throw error
    return data
  }

  static async updateCartItem(itemId: string, quantity: number) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)

    if (error) throw error
    return data
  }

  static async removeFromCart(itemId: string) {
    const { data, error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)

    if (error) throw error
    return data
  }

  static async clearCart() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)

    if (error) throw error
    return data
  }

  // Orders
  static async createOrder(orderData: {
    order_number: string
    total_amount: number
    shipping_address: any
    billing_address?: any
    payment_method: string
    items: Array<{
      product_id: string
      product_name: string
      product_price: number
      quantity: number
      total_price: number
    }>
  }) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        ...orderData
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      ...item
    }))

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return { order, items }
  }

  static async getOrders() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }
}
```

---

## 🔧 Environment Configuration

### Step 1: Update Vite Config
Update `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
  define: {
    global: 'globalThis',
  },
});
```

### Step 2: Update Package.json
Add Supabase dependency:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    // ... other dependencies
  }
}
```

---

## 🧪 Testing & Validation

### Step 1: Test Database Connection
Create `src/utils/testSupabase.ts`:

```typescript
import { supabase } from '@/lib/supabase'

export async function testSupabaseConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Supabase connection failed:', error)
      return false
    }

    console.log('Supabase connection successful!')
    return true
  } catch (error) {
    console.error('Supabase connection error:', error)
    return false
  }
}

// Test authentication
export async function testAuthentication() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Auth test failed:', error)
      return false
    }

    console.log('Auth test successful:', user ? 'User logged in' : 'No user')
    return true
  } catch (error) {
    console.error('Auth test error:', error)
    return false
  }
}
```

### Step 2: Test API Endpoints
Create `src/utils/testApi.ts`:

```typescript
import { ApiService } from '@/services/api'

export async function testApiEndpoints() {
  try {
    console.log('Testing API endpoints...')

    // Test products
    const products = await ApiService.getProducts({ limit: 5 })
    console.log('Products:', products.length)

    // Test categories
    const categories = await ApiService.getCategories()
    console.log('Categories:', categories.length)

    // Test collections
    const collections = await ApiService.getCollections()
    console.log('Collections:', collections.length)

    console.log('All API tests passed!')
    return true
  } catch (error) {
    console.error('API test failed:', error)
    return false
  }
}
```

### Step 3: Run Tests
Add to your main component or create a test page:

```typescript
import { useEffect } from 'react'
import { testSupabaseConnection, testAuthentication } from '@/utils/testSupabase'
import { testApiEndpoints } from '@/utils/testApi'

export function TestSupabase() {
  useEffect(() => {
    const runTests = async () => {
      await testSupabaseConnection()
      await testAuthentication()
      await testApiEndpoints()
    }
    
    runTests()
  }, [])

  return <div>Check console for test results</div>
}
```

---

## 📝 Next Steps

### 1. Update Frontend Components
- Replace mock data with API calls
- Update authentication context
- Implement real-time cart updates
- Add error handling and loading states

### 2. Add Sample Data
- Upload product images to Supabase Storage
- Insert sample products, categories, and collections
- Test the complete flow

### 3. Implement Real-time Features
- Real-time cart updates
- Order status notifications
- Inventory updates

### 4. Add Advanced Features
- Product reviews and ratings
- Wishlist functionality
- Order tracking
- Admin dashboard

---

## 🚨 Important Notes

1. **Security**: Always use RLS policies and never expose service role key in frontend
2. **Performance**: Use proper indexing and query optimization
3. **Backup**: Regular database backups are essential
4. **Monitoring**: Set up monitoring for database performance
5. **Testing**: Test all functionality thoroughly before production

---

## 📞 Support

If you encounter any issues:
1. Check Supabase logs in the dashboard
2. Verify RLS policies are correct
3. Ensure environment variables are set
4. Check network connectivity
5. Review API documentation

This setup provides a solid foundation for your crystal store backend with Supabase!
