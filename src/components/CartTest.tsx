import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

const CartTest = () => {
  const { state, addItem, removeItem, updateQuantity, clearCart, toggleCart } = useCart();
  const { items, totalItems, totalAmount } = state;

  const testProducts = [
    {
      id: 'test-1',
      name: 'Test Crystal 1',
      price: 25.99,
      image: '/src/assets/healing-crystals.jpg'
    },
    {
      id: 'test-2',
      name: 'Test Crystal 2',
      price: 45.99,
      image: '/src/assets/natural-crystals.jpg'
    },
    {
      id: 'test-3',
      name: 'Test Crystal 3',
      price: 15.99,
      image: '/src/assets/tumbled-stones.jpg'
    }
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Cart Functionality Test</h1>
        
        {/* Cart Summary */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Cart Summary</h2>
            <div className="flex items-center gap-4">
              <span className="text-lg font-medium">
                Items: {totalItems} | Total: ₹{totalAmount.toFixed(2)}
              </span>
              <Button onClick={toggleCart} className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                View Cart ({totalItems})
              </Button>
            </div>
          </div>
          
          {items.length > 0 && (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">₹{item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Test Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {testProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg p-6 shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-purple-600 mb-4">₹{product.price}</p>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => addItem(product)}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        {/* Test Actions */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              onClick={() => addItem(testProducts[0], 3)}
            >
              Add 3x Test Crystal 1
            </Button>
            <Button
              variant="outline"
              onClick={() => addItem(testProducts[1], 2)}
            >
              Add 2x Test Crystal 2
            </Button>
            <Button
              variant="outline"
              onClick={() => addItem(testProducts[2], 5)}
            >
              Add 5x Test Crystal 3
            </Button>
            <Button
              variant="destructive"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Cart State Debug */}
        <div className="bg-white rounded-lg p-6 shadow-lg mt-8">
          <h2 className="text-xl font-semibold mb-4">Cart State Debug</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CartTest;
