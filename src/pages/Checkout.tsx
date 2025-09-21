// src/pages/Checkout.tsx

import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient'; // 1. Import Supabase client

// Define the shape of your form data
type FormData = {
 firstName: string;
 lastName: string;
 email: string;
 address: string;
 city: string;
 state: string;
 zipCode: string;
};

// Define the shape for form validation errors
type FormErrors = {
 [key in keyof FormData]?: string;
};

export default function Checkout() {
 // --- HOOKS ---
const { state: cartState, clearCart } = useCart();
 const { items: cart, totalAmount } = cartState;
 const { user, session, isAuthenticated, isLoading } = useAuth();
 const { toast } = useToast();
 const navigate = useNavigate();
 const location = useLocation();
 // --- STATE MANAGEMENT ---
 const [formData, setFormData] = useState<FormData>({
  firstName: user?.first_name || '',
 lastName: user?.last_name || '',
 email: session?.user?.email || '',
 address: user?.address || '',
 city: user?.city || '',
 state: user?.state || '',
 zipCode: user?.zip_code || '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- EFFECTS ---
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to proceed to checkout.",
        variant: "destructive",
      });
      navigate('/signin', { state: { from: location } });
    }
  }, [isAuthenticated, isLoading, navigate, location, toast]);

  useEffect(() => {
    if (user && session) {
      setFormData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: session.user?.email || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zip_code || '',
      });
    }
  }, [user, session]);

  // --- LOADING & EMPTY CART CHECKS ---
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading secure checkout...</p>
      </div>
    );
  }
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-playfair font-bold mb-6 text-gray-800">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-8">Add products to your cart before checking out.</p>
            <Button onClick={() => navigate('/shop')} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg">
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // --- HANDLER FUNCTIONS ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // 2. UPDATED: This function now saves the order to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !user) {
      toast({ title: "Please fix the errors in the form.", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Step 1: Create the main order record
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          shipping_address: { ...formData }
        })
        .select('id')
        .single();

      if (orderError) throw orderError;
      const newOrderId = orderData.id;

      // Step 2: Prepare the individual order items
      const orderItems = cart.map(item => ({
        order_id: newOrderId,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price
      }));

      // Step 3: Insert all order items
      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (orderItemsError) throw orderItemsError;

      // Step 4: Success!
      clearCart();
      toast({
        title: 'Order Placed Successfully!',
        description: 'Thank you for your purchase. You can view your order in your profile.',
      });
      navigate('/profile');
    } catch (error: any) {
      console.error("Checkout Error:", error);
      toast({
        title: 'Order Error',
        description: `Something went wrong: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... Header content ... */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ... Form cards ... */}
              </form>
            </div>
            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                          {/* 3. FIXED Currency Symbol */}
                        <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <p>Subtotal</p>
                      <p>₹{totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <p>Shipping</p>
                      <p>Free</p>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4">
                      <p>Total</p>
                      <p>₹{totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}