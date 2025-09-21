import { useContext } from 'react';
import { WishlistContext } from '@/contexts/wishlist-context';

/**
 * Custom hook to access the wishlist context.
 * Provides wishlist data and functions for managing wishlist items.
 */
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
