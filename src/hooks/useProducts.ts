import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getFeaturedProducts, type Product } from '@/data/products';

// Database product interface (snake_case)
interface DatabaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url: string;
  category: string;
  rating: number;
  reviewCount: number;
  sizes: number[];
  benefits: string[];
  is_featured: boolean;
  in_stock: boolean;
  created_at: string;
}

// Convert database product to application product format
const mapDatabaseProduct = (dbProduct: DatabaseProduct): Product => ({
  id: dbProduct.id,
  name: dbProduct.name,
  price: dbProduct.price,
  originalPrice: dbProduct.original_price || null,
  image: dbProduct.image_url,
  rating: dbProduct.rating,
  reviewCount: dbProduct.reviewCount,
  category: dbProduct.category as Product['category'],
  sizes: dbProduct.sizes,
  inStock: dbProduct.in_stock,
  featured: dbProduct.is_featured,
  description: dbProduct.description,
  benefits: dbProduct.benefits,
});

export const useProducts = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching products from Supabase...');
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Products fetched successfully:', data?.length || 0, 'products');
        const mappedProducts = (data || []).map(mapDatabaseProduct);
        setProductsData(mappedProducts);
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setProductsData([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products: productsData, loading, error };
};

export const useFeaturedProducts = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching featured products from Supabase...');
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Featured products fetched successfully:', data?.length || 0, 'products');
        const mappedProducts = (data || []).map(mapDatabaseProduct);
        setProductsData(mappedProducts);
      } catch (err) {
        console.error('Error loading featured products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load featured products');
        setProductsData([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return { products: productsData, loading, error };
};
