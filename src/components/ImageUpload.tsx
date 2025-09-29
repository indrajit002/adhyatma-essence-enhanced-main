import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { uploadFile } from '@/lib/uploadthing-client';

interface ImageUploadProps {
  onImageSelect: (url: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageSelect, 
  currentImage, 
  className 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (4MB max)
    if (file.size > 4 * 1024 * 1024) {
      setError('File size must be less than 4MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const imageUrl = await uploadFile(file);
      onImageSelect(imageUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    onImageSelect('');
  };

  return (
    <div className={cn("space-y-4", className)}>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {currentImage ? (
        <Card>
          <CardContent className="p-4">
            <div className="relative group">
              <img
                src={currentImage}
                alt="Product preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Click to change image
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={cn(
            "border-2 border-dashed transition-colors",
            dragActive
              ? "border-[#b094b2] bg-[#b094b2]/5"
              : "border-gray-300 hover:border-gray-400"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              {isUploading ? (
                <Loader2 className="h-12 w-12 text-[#b094b2] animate-spin" />
              ) : (
                <div className="p-4 rounded-full bg-gray-100">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {isUploading ? 'Uploading...' : 'Upload Product Image'}
                </h3>
                <p className="text-sm text-gray-600">
                  Drag and drop an image here, or click to select
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WEBP up to 4MB
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                disabled={isUploading}
                onClick={() => document.getElementById('file-upload')?.click()}
                className="mt-4"
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Choose File'}
              </Button>

              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                disabled={isUploading}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
