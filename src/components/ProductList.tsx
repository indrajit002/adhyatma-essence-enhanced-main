import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Edit, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import ImagePreview from '@/components/ImagePreview';
import SizeDisplay from '@/components/SizeDisplay';
import { Product } from '@/data/products';

// Database product interface (snake_case)
interface DatabaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url: string;
  category: string;
  colors: string[];
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
  colors: dbProduct.colors || [],
  inStock: dbProduct.in_stock,
  featured: dbProduct.is_featured,
  description: dbProduct.description,
  benefits: dbProduct.benefits,
});

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const mappedProducts = (data || []).map(mapDatabaseProduct);
      setProducts(mappedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No products found.</p>
        <Button onClick={fetchProducts}>Refresh</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Products ({products.length})</h3>
        <Button onClick={fetchProducts} variant="outline">
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <ImagePreview
              src={product.image}
              alt={product.name}
              size="lg"
              className="w-full"
            />
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                <div className="flex space-x-1">
                  {product.featured && (
                    <Badge variant="secondary" className="text-xs">Featured</Badge>
                  )}
                  {!product.inStock && (
                    <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                  )}
                </div>
              </div>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#b094b2]">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-600">
                  <p><strong>Category:</strong> {product.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <strong>Sizes:</strong>
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.map((size, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {size}mm
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>


                {product.benefits.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Benefits:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.benefits.slice(0, 3).map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                      {product.benefits.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{product.benefits.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;