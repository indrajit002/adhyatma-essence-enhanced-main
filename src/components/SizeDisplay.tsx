import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SizeDisplayProps {
  sizes: number[];
  className?: string;
  variant?: 'default' | 'secondary' | 'outline';
}

const SizeDisplay: React.FC<SizeDisplayProps> = ({ 
  sizes, 
  className = '', 
  variant = 'outline' 
}) => {
  if (!sizes || sizes.length === 0) {
    return <span className="text-gray-500 text-sm">No sizes available</span>;
  }

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {sizes.map((size, index) => (
        <Badge 
          key={index} 
          variant={variant}
          className="text-xs font-medium"
        >
          {size}mm
        </Badge>
      ))}
    </div>
  );
};

export default SizeDisplay;
