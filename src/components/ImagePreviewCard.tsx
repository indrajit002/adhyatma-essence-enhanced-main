// src/components/ImagePreviewCard.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Trash2, Copy, Download, UploadCloud } from 'lucide-react';
import ImagePreviewModal from './ImagePreviewModal';

interface ImagePreviewCardProps {
  imageUrl: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  onRemove?: () => void;
  showActions?: boolean;
  className?: string;
}

const ImagePreviewCard: React.FC<ImagePreviewCardProps> = ({
  imageUrl,
  alt = "Image preview",
  size = 'md',
  onRemove,
  showActions = true,
  className = "",
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const copyImageUrl = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!imageUrl) {
    return (
      <div className={`${sizeClasses[size]} border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm bg-gray-50 ${className}`}>
        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>No Image</span>
      </div>
    );
  }

  return (
    <>
      <Card className={`relative group ${className}`}>
        <CardContent className="p-2">
          <div className="relative">
            <img
              src={imageUrl}
              alt={alt}
              className={`${sizeClasses[size]} object-cover rounded-lg border-2 border-gray-200 shadow-sm`}
            />
            
            {/* Overlay with actions */}
            {showActions && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setShowModal(true)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={copyImageUrl}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={downloadImage}
                    className="h-8 w-8 p-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  {onRemove && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={onRemove}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Preview Modal */}
      <ImagePreviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        imageUrl={imageUrl}
        onCopyUrl={copyImageUrl}
        onDownload={downloadImage}
        onOpenInNewTab={() => window.open(imageUrl, '_blank')}
        isZoomed={isZoomed}
        onToggleZoom={() => setIsZoomed(!isZoomed)}
      />
    </>
  );
};

export default ImagePreviewCard;
