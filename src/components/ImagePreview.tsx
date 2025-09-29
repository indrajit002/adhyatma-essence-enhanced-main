import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageIcon } from 'lucide-react';

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  src, 
  alt, 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  };

  const isDataUrl = src.startsWith('data:');
  const isExternalUrl = src.startsWith('http');

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className={`${sizeClasses[size]} relative bg-gray-100 flex items-center justify-center`}>
          {src ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          
          <div className={`${src ? 'hidden' : ''} flex flex-col items-center justify-center text-gray-400`}>
            <ImageIcon className="h-8 w-8 mb-2" />
            <span className="text-xs">No Image</span>
          </div>
          
          {src && (
            <div className="absolute top-1 right-1">
              <Badge variant="secondary" className="text-xs">
                {isDataUrl ? 'Base64' : isExternalUrl ? 'External' : 'Local'}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagePreview;
