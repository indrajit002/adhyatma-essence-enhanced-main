// src/pages/OrderConfirmation.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';
import { CheckCircle, Package, CalendarDays, Home, ShoppingBag, MapPin, CreditCard, Truck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrderService } from '@/services/orderService';
import { Order } from '@/types/order';

// Helper function to calculate an estimated delivery date
const getDeliveryEstimate = () => {
  const addBusinessDays = (startDate: Date, days: number) => {
    let currentDate = new Date(startDate);
    let added = 0;
    while (added < days) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0=Sun, 6=Sat
        added++;
      }
    }
    return currentDate;
  };

  const today = new Date();
  const estimatedArrivalStart = addBusinessDays(today, 5);
  const estimatedArrivalEnd = addBusinessDays(today, 7);
  
  const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return `${formatDate(estimatedArrivalStart)} - ${formatDate(estimatedArrivalEnd)}`;
};

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        navigate('/');
        return;
      }
      try {
        const orderData = await OrderService.getOrderById(orderId);
        if (orderData) {
          setOrder(orderData);
        } else {
          toast.error("Order Not Found", {
            description: "The order you're looking for doesn't exist.",
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error("Error", {
          description: "Failed to load order details.",
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-ethereal">
        <Header />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-mystic mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800">Loading Your Confirmation...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    // This state is shown if fetching fails or the order is not found
    return (
      <div className="min-h-screen bg-gradient-ethereal">
        <Header />
        <div className="pt-32 pb-20 container mx-auto text-center">
             <h1 className="text-3xl font-cormorant-light text-gray-900 mb-4">Order Not Found</h1>
             <p className="text-gray-600 mb-8">We couldn't find the order you were looking for.</p>
             <Link to="/"><Button>Go Home</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-ethereal">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* --- Success Header --- */}
            <div className="text-center mb-12 animate-fade-in-up">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl sm:text-5xl font-cormorant-light text-gray-900 mb-3">
                Thank you for your order, {order.shippingAddress.firstName}!
              </h1>
              <p className="text-lg text-gray-600">
                Your crystal journey is about to begin. A confirmation has been sent to your email.
              </p>
            </div>

            {/* --- Key Order Info --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                <div className="bg-lilac/20 p-3 rounded-full">
                  <Package className="w-6 h-6 text-mystic" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="font-semibold font-mono text-gray-800">{order.id.substring(0, 18).toUpperCase()}</p>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                <div className="bg-lilac/20 p-3 rounded-full">
                  <CalendarDays className="w-6 h-6 text-mystic" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-semibold text-gray-800">{getDeliveryEstimate()}</p>
                </div>
              </div>
            </div>

            {/* --- Main Order Receipt Card --- */}
            <Card className="shadow-xl border-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-cormorant-light text-gray-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                {/* Items List */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6"/>

                {/* Totals */}
                <div className="space-y-2 mb-6 text-gray-700">
                   <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p className="font-medium">₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p className="font-medium">Free</p>
                  </div>
                  <Separator className="my-2"/>
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <p>Total</p>
                    <p>₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>

                <Separator className="my-6"/>

                {/* Shipping and Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800">Shipping To</h4>
                    <div className="flex items-start space-x-3 text-gray-600 text-sm">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      </div>
                    </div>
                  </div>
                   <div>
                    <h4 className="font-semibold mb-3 text-gray-800">Payment</h4>
                    <div className="flex items-center space-x-3 text-gray-600 text-sm">
                       {order.paymentMethod === 'cod' ? (
                          <>
                            <Truck className="w-5 h-5 text-gray-400" />
                            <p>Cash on Delivery (COD)</p>
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5 text-gray-400" />
                            <p>Paid by Card</p>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* --- Bottom Actions --- */}
            <div className="mt-12 text-center space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Link to="/shop">
                    <Button size="lg" className="w-full sm:w-auto bg-mystic hover:bg-mystic/90">
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Continue Shopping
                    </Button>
                </Link>
                <Link to="/profile">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        <Package className="w-5 h-5 mr-2" />
                        View My Orders
                    </Button>
                </Link>
            </div>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}