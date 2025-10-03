// src/components/ImagePreview.tsx
import React from 'react';

interface ImagePreviewProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, size = 'md' }) => {
  if (!src) {
    return (
      <div className={`${sizeClasses[size]} border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm bg-gray-50`}>
        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>No Image</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} object-cover rounded-lg border-2 border-gray-200 shadow-sm`}
    />
  );
};

export default ImagePreview;