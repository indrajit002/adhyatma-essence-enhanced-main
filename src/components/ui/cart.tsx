import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Cart() {
  const { state, removeItem, updateQuantity, clearCart, toggleCart } = useCart();
  const { items, totalItems, totalAmount, isOpen } = state;
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background shadow-xl transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Cart Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-medium">Shopping Cart ({totalItems})</h2>
          <Button variant="ghost" size="icon" onClick={toggleCart} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-2">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mt-1">Add items to your cart to see them here</p>
              <Button onClick={toggleCart} className="mt-6 font-lobster">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.id} className="flex py-4 px-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm font-medium">₹{item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex flex-1 items-end justify-between">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t px-4 py-4 sm:px-6">
            <div className="flex justify-between text-base font-medium">
              <p>Subtotal</p>
              <p>₹{totalAmount.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">Shipping and taxes calculated at checkout.</p>
            <div className="mt-4 space-y-2">
              <Button 
                className="w-full font-lobster"
                onClick={() => {
                  toggleCart();
                  navigate('/checkout');
                }}
              >
                Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full font-lobster"
                onClick={toggleCart}
              >
                Continue Shopping
              </Button>
              <Button
                variant="ghost"
                className="w-full text-sm font-lobster"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CartOverlay() {
  const { state, toggleCart } = useCart();
  
  if (!state.isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
      onClick={toggleCart}
    />
  );
}