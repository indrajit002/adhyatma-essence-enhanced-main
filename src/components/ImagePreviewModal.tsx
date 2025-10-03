// src/components/ImagePreviewModal.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud, Copy, Download, ZoomIn, X } from 'lucide-react';

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onCopyUrl: () => void;
  onDownload: () => void;
  onOpenInNewTab: () => void;
  isZoomed: boolean;
  onToggleZoom: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  onCopyUrl,
  onDownload,
  onOpenInNewTab,
  isZoomed,
  onToggleZoom,
}) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ZoomIn className="h-5 w-5" />
            Image Preview
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleZoom}
              className="flex items-center gap-2"
            >
              <ZoomIn className="h-4 w-4" />
              {isZoomed ? 'Fit' : 'Zoom'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onCopyUrl}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy URL
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Close
            </Button>
          </div>
        </div>

        {/* Image Content */}
        <div className="p-4 overflow-auto max-h-[80vh]">
          <div className="flex justify-center">
            <img
              src={imageUrl}
              alt="Product preview"
              className={`${isZoomed ? 'w-full h-auto' : 'max-w-full max-h-[70vh]'} object-contain mx-auto rounded-lg shadow-lg`}
              onClick={onToggleZoom}
              style={{ cursor: 'pointer' }}
            />
          </div>

          {/* Image Information */}
          <div className="mt-6 space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Image Information</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Status:</strong> <span className="text-green-600">✓ Successfully uploaded</span></p>
                <p><strong>URL:</strong> <span className="font-mono text-xs break-all">{imageUrl}</span></p>
                <p><strong>Click image to zoom in/out</strong></p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenInNewTab}
                className="flex items-center gap-2"
              >
                <UploadCloud className="h-4 w-4" />
                Open in New Tab
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onCopyUrl}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy URL
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onDownload}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Image
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
