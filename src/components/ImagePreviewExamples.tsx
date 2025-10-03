// src/components/ImagePreviewExamples.tsx
// This file shows examples of how to use the image preview components

import React from 'react';
import ImagePreview from './ImagePreview';
import ImagePreviewCard from './ImagePreviewCard';
import ImagePreviewModal from './ImagePreviewModal';

const ImagePreviewExamples: React.FC = () => {
  const exampleImageUrl = "https://example.com/image.jpg";

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Image Preview Components Examples</h2>
      
      {/* Basic ImagePreview Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic ImagePreview (Simple)</h3>
        <div className="flex gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Small</p>
            <ImagePreview src={exampleImageUrl} alt="Small preview" size="sm" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Medium</p>
            <ImagePreview src={exampleImageUrl} alt="Medium preview" size="md" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Large</p>
            <ImagePreview src={exampleImageUrl} alt="Large preview" size="lg" />
          </div>
        </div>
      </section>

      {/* ImagePreviewCard Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4">ImagePreviewCard (Interactive)</h3>
        <div className="flex gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">With Actions</p>
            <ImagePreviewCard
              imageUrl={exampleImageUrl}
              alt="Card preview"
              size="md"
              showActions={true}
              onRemove={() => console.log('Remove clicked')}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Without Actions</p>
            <ImagePreviewCard
              imageUrl={exampleImageUrl}
              alt="Card preview"
              size="md"
              showActions={false}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">No Image State</p>
            <ImagePreviewCard
              imageUrl=""
              alt="No image"
              size="md"
              showActions={true}
            />
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Usage Examples</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">In Product Lists:</h4>
          <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
{`<ImagePreviewCard
  imageUrl={product.image_url}
  alt={product.name}
  size="md"
  showActions={true}
  onRemove={() => removeProduct(product.id)}
/>`}
          </pre>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <h4 className="font-medium mb-2">In Forms:</h4>
          <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
{`<ImagePreviewCard
  imageUrl={formData.image}
  alt="Product preview"
  size="lg"
  onRemove={() => setFormData({...formData, image: ''})}
  showActions={true}
/>`}
          </pre>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <h4 className="font-medium mb-2">Modal Usage:</h4>
          <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
{`<ImagePreviewModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  imageUrl={selectedImage}
  onCopyUrl={() => copyToClipboard(selectedImage)}
  onDownload={() => downloadImage(selectedImage)}
  onOpenInNewTab={() => window.open(selectedImage, '_blank')}
  isZoomed={isZoomed}
  onToggleZoom={() => setIsZoomed(!isZoomed)}
/>`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ImagePreviewExamples;
