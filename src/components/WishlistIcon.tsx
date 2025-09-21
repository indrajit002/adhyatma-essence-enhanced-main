import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface WishlistIconProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

const WishlistIcon: React.FC<WishlistIconProps> = ({ 
  product, 
  size = 'md', 
  className,
  showText = false 
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-1 transition-colors duration-200 hover:scale-110',
        'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-full p-1',
        className
      )}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={cn(
          sizeClasses[size],
          'transition-colors duration-200',
          isWishlisted 
            ? 'fill-red-500 text-red-500' 
            : 'text-gray-400 hover:text-red-500'
        )}
      />
      {showText && (
        <span className={cn(
          'text-sm font-medium transition-colors duration-200',
          isWishlisted ? 'text-red-500' : 'text-gray-600'
        )}>
          {isWishlisted ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
};

export default WishlistIcon;
