import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Package, Star, DollarSign, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface ProductStats {
  totalProducts: number;
  featuredProducts: number;
  outOfStock: number;
  averagePrice: number;
  averageRating: number;
  totalReviews: number;
  categoryCounts: { [key: string]: number };
}

const ProductStats: React.FC = () => {
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data: products, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        throw error;
      }

      if (!products) {
        setStats({
          totalProducts: 0,
          featuredProducts: 0,
          outOfStock: 0,
          averagePrice: 0,
          averageRating: 0,
          totalReviews: 0,
          categoryCounts: {},
        });
        return;
      }

      const totalProducts = products.length;
      const featuredProducts = products.filter(p => p.is_featured).length;
      const outOfStock = products.filter(p => !p.in_stock).length;
      const averagePrice = products.length > 0 
        ? products.reduce((sum, p) => sum + p.price, 0) / products.length 
        : 0;
      const averageRating = products.length > 0 
        ? products.reduce((sum, p) => sum + p.rating, 0) / products.length 
        : 0;
      const totalReviews = products.reduce((sum, p) => sum + p.reviewCount, 0);

      // Count products by category
      const categoryCounts: { [key: string]: number } = {};
      products.forEach(product => {
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
      });

      setStats({
        totalProducts,
        featuredProducts,
        outOfStock,
        averagePrice,
        averageRating,
        totalReviews,
        categoryCounts,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading statistics...</span>
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

  if (!stats) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No statistics available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Products in your store
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Products</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredProducts}</div>
            <p className="text-xs text-muted-foreground">
              Highlighted products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.averagePrice.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Per product
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Out of 5 stars
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>Current stock levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span>In Stock</span>
              <Badge variant="secondary">
                {stats.totalProducts - stats.outOfStock}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Out of Stock</span>
              <Badge variant={stats.outOfStock > 0 ? "destructive" : "secondary"}>
                {stats.outOfStock}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Reviews</span>
              <Badge variant="outline">
                {stats.totalReviews}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Products by category</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(stats.categoryCounts).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(stats.categoryCounts)
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, count]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="capitalize">{category.replace('-', ' ')}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No products in any category yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Add new products using the "Add Product" tab</p>
            <p>• Manage existing products in the "Products" tab</p>
            <p>• Update product information and pricing as needed</p>
            <p>• Monitor inventory levels and restock when necessary</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductStats;