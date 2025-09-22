import { useState, useEffect } from 'react';
import { products, getFeaturedProducts, type Product } from '@/data/products';

export const useProducts = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setProductsData(products);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products');
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
        
        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const featuredProducts = getFeaturedProducts();
        setProductsData(featuredProducts);
      } catch (err) {
        console.error('Error loading featured products:', err);
        setError('Failed to load featured products');
        setProductsData([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return { products: productsData, loading, error };
};
