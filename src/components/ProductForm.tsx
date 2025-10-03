// src/components/ProductForm.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Trash2, UploadCloud, Eye, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import ImagePreview from '@/components/ImagePreview';

interface ProductFormProps {
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'bracelet',
    sizes: '',
    image: '',
    benefits: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      setSubmitError("Please upload a product image before submitting.");
      return;
    }
    if (isUploading) {
      setSubmitError("Please wait for the image upload to complete.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        original_price: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        image_url: formData.image,
        category: formData.category,
        colors: [],
        rating: 0,
        reviewCount: 0,
        sizes: formData.sizes.split(',').map(s => parseInt(s.trim())).filter(s => !isNaN(s) && s > 0),
        benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b),
        is_featured: false,
        in_stock: true,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('products').insert([productData]);
      if (error) throw error;

      setSubmitSuccess(true);
      setFormData({ name: '', description: '', price: '', originalPrice: '', category: 'bracelet', sizes: '', image: '', benefits: '' });
      
      if (onSuccess) onSuccess();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating product:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (4MB limit)
    if (file.size > 4 * 1024 * 1024) {
      setSubmitError("File size must be less than 4MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setSubmitError("Please select a valid image file");
      return;
    }

    setIsUploading(true);
    setSubmitError(null);

    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image: data.publicUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && <Alert variant="destructive"><AlertDescription>{submitError}</AlertDescription></Alert>}
      {submitSuccess && <Alert className="border-green-200 bg-green-50"><AlertDescription className="text-green-800">Product created successfully!</AlertDescription></Alert>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential product details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g., Rose Quartz Bracelet" required />
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe the product..." rows={4} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₹) *</Label>
                <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="0.00" required />
              </div>
              <div>
                <Label htmlFor="originalPrice">Original Price (₹)</Label>
                <Input id="originalPrice" type="number" step="0.01" value={formData.originalPrice} onChange={(e) => setFormData({...formData, originalPrice: e.target.value})} placeholder="0.00" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Product Image *</Label>
                {formData.image && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Image uploaded successfully</span>
                  </div>
                )}
              </div>
              
              {formData.image ? (
                <div className="space-y-3">
                  <div className="relative w-fit">
                    <ImagePreview src={formData.image} alt="Product preview" size="lg" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 rounded-full"
                      onClick={() => setFormData({ ...formData, image: '' })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowImagePreview(true)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Preview Image
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(formData.image, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <UploadCloud className="h-4 w-4" />
                      Open in New Tab
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <strong>Image URL:</strong> {formData.image}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <AlertCircle className="h-4 w-4" />
                    <span>No image uploaded yet. Please upload an image to continue.</span>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <UploadCloud className="w-12 h-12 text-gray-400" />
                      <div className="text-lg font-medium text-gray-700">
                        Click to upload or drag and drop
                      </div>
                      <div className="text-sm text-gray-500">
                        PNG, JPG, GIF up to 4MB
                      </div>
                    </label>
                  </div>
                </div>
              )}
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
              <select id="category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full mt-1 p-2 border border-input rounded-md" required>
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
              <Label htmlFor="sizes">Sizes (mm) *</Label>
              <Input id="sizes" value={formData.sizes} onChange={(e) => setFormData({...formData, sizes: e.target.value})} placeholder="e.g., 8, 10, 12 (comma-separated)" required />
            </div>
            <div>
              <Label htmlFor="benefits">Benefits (comma-separated) *</Label>
              <Input id="benefits" value={formData.benefits} onChange={(e) => setFormData({...formData, benefits: e.target.value})} placeholder="e.g., Love, Healing, Self-Care" required />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || isUploading}>
          {(isSubmitting || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isUploading ? "Uploading..." : isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </div>

      {/* Image Preview Modal */}
      {showImagePreview && formData.image && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Image Preview</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowImagePreview(false)}
              >
                Close
              </Button>
            </div>
            <div className="p-4">
              <img
                src={formData.image}
                alt="Product preview"
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Image URL:</strong> {formData.image}</p>
                <p><strong>Status:</strong> <span className="text-green-600">✓ Successfully uploaded</span></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default ProductForm;