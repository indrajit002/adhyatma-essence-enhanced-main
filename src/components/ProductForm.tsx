// src/components/ProductForm.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Trash2, UploadCloud, Eye, CheckCircle, AlertCircle, Download, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "../../api/uploadthing/core";
import ImagePreview from '@/components/ImagePreview';
import ImagePreviewModal from '@/components/ImagePreviewModal';
import ImagePreviewCard from '@/components/ImagePreviewCard';

interface ProductFormProps {
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
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

  const copyImageUrl = async () => {
    try {
      await navigator.clipboard.writeText(formData.image);
      setCopySuccess(true);
      setSubmitError(null);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      setSubmitError('Failed to copy URL to clipboard');
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = formData.image;
    link.download = `product-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  console.log("🔍 ProductForm render - formData.image:", formData.image);
  console.log("🔍 ProductForm render - isUploading:", isUploading);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && <Alert variant="destructive"><AlertDescription>{submitError}</AlertDescription></Alert>}
      {submitSuccess && <Alert className="border-green-200 bg-green-50"><AlertDescription className="text-green-800">Product created successfully!</AlertDescription></Alert>}
      {copySuccess && <Alert className="border-blue-200 bg-blue-50"><AlertDescription className="text-blue-800">Image URL copied to clipboard!</AlertDescription></Alert>}

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
                  <ImagePreviewCard
                    imageUrl={formData.image}
                    alt="Product preview"
                    size="lg"
                    onRemove={() => setFormData({ ...formData, image: '' })}
                    showActions={true}
                  />
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowImagePreview(true)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(formData.image, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <UploadCloud className="h-4 w-4" />
                      Open Tab
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={copyImageUrl}
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy URL
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={downloadImage}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
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
                  
                  {/* @ts-expect-error UploadThing type issue - will be resolved with proper setup */}
                  <UploadDropzone
                    endpoint="imageUploader"
                    onUploadBegin={() => {
                      console.log("🚀 Upload started");
                      setIsUploading(true);
                      setSubmitError(null);
                    }}
                    onClientUploadComplete={(res) => {
                      console.log("✅ Upload completed:", res);
                      setIsUploading(false);
                      if (res && res.length > 0) {
                        console.log("📸 Image URL:", res[0].url);
                        setFormData(prev => ({ ...prev, image: res[0].url }));
                      }
                    }}
                    onUploadError={(error: Error) => {
                      console.error("❌ Upload failed:", error);
                      setIsUploading(false);
                      setSubmitError(`Image upload failed: ${error.message}`);
                    }}
                    className="p-4 ut-label:text-lg ut-label:text-mystic ut-upload-icon:text-mystic/70 ut-button:bg-mystic ut-button:ut-readying:bg-mystic/80"
                    content={{
                       uploadIcon: <UploadCloud className="w-12 h-12 text-gray-400" />,
                       label: "Drag 'n' drop or click to upload",
                       allowedContent: "4MB max file size",
                    }}
                  />
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
      <ImagePreviewModal
        isOpen={showImagePreview}
        onClose={() => setShowImagePreview(false)}
        imageUrl={formData.image}
        onCopyUrl={copyImageUrl}
        onDownload={downloadImage}
        onOpenInNewTab={() => window.open(formData.image, '_blank')}
        isZoomed={imageZoomed}
        onToggleZoom={() => setImageZoomed(!imageZoomed)}
      />
    </form>
  );
};

export default ProductForm;