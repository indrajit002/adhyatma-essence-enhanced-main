import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import WishlistIcon from '@/components/WishlistIcon';
import { Product } from '@/data/products';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addItem({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      image: product.image 
    });
    
    toast.success('Added to cart', {
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleBuyNow = () => {
    addItem({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      image: product.image 
    });
    navigate('/checkout');
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-mystic transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        <div className="absolute top-3 right-3">
          <WishlistIcon product={product} />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-cormorant-light text-foreground">
            {product.name}
          </h3>
          <span className="text-lg font-madefor-medium">₹{product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {product.description}
        </p>
        <div className="flex justify-between items-center gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            className="rounded-full flex-1 font-arial" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-full flex-1 font-arial" 
            onClick={handleBuyNow}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;