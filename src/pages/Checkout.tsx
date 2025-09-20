import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MultiPaymentForm } from '@/components/MultiPaymentForm';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

  // Initialize form data directly from the authenticated user's profile
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

  // EFFECT 1: Protect the route. Redirect non-authenticated users.
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

  // EFFECT 2: Update form data when user data loads
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

  // Show a loading screen while authentication status is being checked
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading secure checkout...</p>
      </div>
    );
  }

  // Show an empty cart message if the cart is empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-playfair font-bold mb-6 text-gray-800">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-8">Add some products to your cart before checking out.</p>
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
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: "Please fix the errors in the form.", variant: "destructive" });
      return;
    }
    // This function is ready for when you integrate real payment
    // It ensures user details are valid before the payment form is used.
  };

  const handlePaymentSuccess = () => {
    clearCart();
    toast({
      title: 'Order Placed Successfully!',
      description: 'Thank you for your purchase.',
    });
    navigate('/');
  };

  const handlePaymentError = (message: string) => {
    toast({
      title: 'Payment Error',
      description: message || 'Something went wrong. Please try again.',
      variant: 'destructive',
    });
  };

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/shop" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
            <h1 className="text-3xl font-playfair font-bold text-gray-800 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your order securely</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/* Checkout Form */}
<div className="lg:col-span-2">
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Contact Information Card */}
    <Card>
      <CardHeader>
           <CardTitle>Contact Information</CardTitle>
  </CardHeader>
  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Label htmlFor="firstName">First Name</Label>
      <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className={errors.firstName ? 'border-red-500' : ''} />
      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
    </div>
    <div>
      <Label htmlFor="lastName">Last Name</Label>
      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={errors.lastName ? 'border-red-500' : ''} />
      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
    </div>
    <div className="md:col-span-2">
      <Label htmlFor="email">Email</Label>
               <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={errors.email ? 'border-red-500' : ''} />
               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
             </div>
           </CardContent>
         </Card>

                {/* Shipping Address Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleChange} className={errors.address ? 'border-red-500' : ''} />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} className={errors.city ? 'border-red-500' : ''} />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" value={formData.state} onChange={handleChange} className={errors.state ? 'border-red-500' : ''} />
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} className={errors.zipCode ? 'border-red-500' : ''} />
                        {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MultiPaymentForm
                      amount={totalAmount}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      isSubmitting={isSubmitting}
                      setIsSubmitting={setIsSubmitting}
                    />
                  </CardContent>
                </Card>
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
