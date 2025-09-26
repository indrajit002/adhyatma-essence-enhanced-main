import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { OrderService } from '@/services/orderService';
import { Package } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CheckoutSimple() {
  const { state: cartState, clearCart } = useCart();
  const { items: cart, totalAmount } = cartState;
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Simple form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isSubmittingRef.current = false;
    };
  }, []);

  // Simple input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form submission with proper debouncing
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmittingRef.current) {
      return;
    }
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create an order.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    isSubmittingRef.current = true;
    
    try {
      
      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalAmount: totalAmount,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
      };
      
      const order = await OrderService.createOrder(orderData, user.id);
      
      clearCart();
      toast({
        title: "Order Created!",
        description: `Your order #${order.id} has been created successfully.`,
        variant: "default",
      });
      
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('❌ Order creation failed:', error);
      toast({
        title: "Order Failed",
        description: `Failed to create order: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl font-cormorant-light text-gray-900 mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-8">Add some items to your cart first.</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-cormorant-light text-gray-900 mb-8 text-center">Simple Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Simple Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-cormorant-light text-gray-900">Shipping Information</CardTitle>
                  <CardDescription>Enter your delivery details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your street address"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Enter state"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="Enter ZIP code"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#b094b2] hover:bg-[#b094b2]/80"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Order...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Package className="w-4 h-4 mr-2" />
                          Create Order
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-cormorant-light text-gray-900">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
