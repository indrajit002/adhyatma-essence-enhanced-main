import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, description }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addItem({ id, name, price, image });
    
    toast({
      title: 'Added to cart',
      description: `${name} has been added to your cart.`,
    });
  };
  
  const handleBuyNow = () => {
    addItem({ id, name, price, image });
    navigate('/checkout');
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-mystic transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-lobster text-foreground">
            {name}
          </h3>
          <span className="text-lg font-lobster">₹{price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <div className="flex justify-between items-center gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            className="rounded-full flex-1 font-lobster" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-full flex-1 font-lobster" 
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