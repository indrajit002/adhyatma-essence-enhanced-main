import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';
import { Check, Package, Home, ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrderService } from '@/services/orderService';
import { Order } from '@/types/order';

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
      <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#b094b2] mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Order Details</h2>
              <p className="text-gray-600">Please wait while we fetch your order information...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h1 className="text-3xl font-cormorant-light text-gray-900 mb-4">Order Not Found</h1>
              <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
              <Link to="/">
                <Button className="bg-[#b094b2] hover:bg-[#b094b2]/80">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-[#d1bccd] text-[#b094b2]';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Confirmed';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-cormorant-light text-gray-900 mb-2">Order Confirmed!</h1>
              <p className="text-gray-600 text-lg">Thank you for your purchase. Your order has been successfully created.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Information */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-cormorant-light text-gray-900">Order Details</CardTitle>
                    <CardDescription>Order #{order.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-mono text-sm">{order.id}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Status:</span>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Order Date:</span>
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-semibold uppercase">{order.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="text-lg font-semibold">₹{order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-cormorant-light text-gray-900">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-600">₹{item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-cormorant-light text-gray-900">Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                          <p className="text-gray-600">{order.shippingAddress.address}</p>
                          <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{order.shippingAddress.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-cormorant-light text-gray-900">What's Next?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600 text-sm">
                        You will receive a confirmation email with your order details shortly.
                      </p>
                      
                      <div className="space-y-3">
                        <Link to="/" className="w-full">
                          <Button className="w-full bg-[#b094b2] hover:bg-[#b094b2]/80">
                            <Home className="w-4 h-4 mr-2" />
                            Continue Shopping
                          </Button>
                        </Link>
                        
                        <Link to="/shop" className="w-full">
                          <Button variant="outline" className="w-full">
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Browse More Crystals
                          </Button>
                        </Link>
                      </div>

                      <Separator />

                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Need help with your order?</p>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>+1 (555) 123-4567</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
