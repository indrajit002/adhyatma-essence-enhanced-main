import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface ProductFormProps {
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'bracelet',
    size: '',
    image: '',
    benefits: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const id = 'product-' + Date.now();
      const productData = {
        id,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        original_price: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        image_url: formData.image,
        category: formData.category,
        colors: [],
        rating: 0,
        reviewCount: 0,
        size: formData.size,
        benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b),
        is_featured: false,
        in_stock: true,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('products')
        .insert([productData]);

      if (error) {
        throw error;
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'bracelet',
        size: '',
        image: '',
        benefits: '',
      });
      
      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating product:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <Alert variant="destructive">
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      {submitSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            Product created successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential product details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Rose Quartz Bracelet"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the product and its properties..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="originalPrice">Original Price (₹)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category & Properties</CardTitle>
            <CardDescription>Product classification and attributes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="bracelet">Bracelet</option>
                <option value="rudraksh">Rudraksh</option>
                <option value="frames">Frames</option>
                <option value="anklet">Anklet</option>
                <option value="pyramid">Pyramid</option>
                <option value="tower-and-tumbles">Tower and Tumbles</option>
                <option value="raw-stones">Raw Stones</option>
                <option value="selenite-plates">Selenite Plates</option>
                <option value="geode">Geode</option>
                <option value="mala">Mala</option>
                <option value="hangers">Hangers</option>
                <option value="tumble-set">Tumble Set</option>
                <option value="trees">Trees</option>
              </select>
            </div>

            <div>
              <Label htmlFor="size">Size *</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
                placeholder="e.g., Small, Medium, Large"
                required
              />
            </div>


            <div>
              <Label htmlFor="benefits">Benefits (comma-separated) *</Label>
              <Input
                id="benefits"
                value={formData.benefits}
                onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                placeholder="e.g., Love, Emotional Healing, Self-Care"
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Product
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;