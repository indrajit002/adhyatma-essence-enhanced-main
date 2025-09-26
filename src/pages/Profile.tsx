// src/pages/Profile.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Package, Heart, Settings, LogOut, Edit, Save, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import { OrderService } from '@/services/orderService';
import ApiDebounceManager from '@/utils/apiDebounce';

// 2. Define a type for your order data
type Order = {
  id: string;
  created_at: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  total_amount: number;
  // You can add more fields here if you select them
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const { user, session, updateUser, signOut, isLoading } = useAuth();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  // Add state for orders and loading status
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const isFetchingOrdersRef = useRef(false);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    joinDate: ''
  });
  
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zip_code || '',
        joinDate: user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'Recently joined'
      });
    }
  }, [user]);

  // Fetch orders when the 'orders' tab is active (with debouncing)
  useEffect(() => {
    if (activeTab === 'orders' && user && !ordersLoaded && !isFetchingOrdersRef.current) {
      const fetchOrders = async () => {
        isFetchingOrdersRef.current = true;
        setLoadingOrders(true);
        
        try {
          
          // Use debounced API call
          const userOrders = await ApiDebounceManager.debounce(
            `getUserOrders-${user.id}`,
            () => OrderService.getUserOrders(user.id),
            200
          );
          
          // Transform orders to match the expected format
          const transformedOrders: Order[] = userOrders.map(order => ({
            id: order.id,
            created_at: order.createdAt,
            status: order.status.charAt(0).toUpperCase() + order.status.slice(1) as 'Processing' | 'Shipped' | 'Delivered',
            total_amount: order.totalAmount
          }));
          
          setOrders(transformedOrders);
          setOrdersLoaded(true);
        } catch (error) {
          console.error("❌ Error fetching orders:", error);
        } finally {
          setLoadingOrders(false);
          isFetchingOrdersRef.current = false;
        }
      };

      fetchOrders();
    }
  }, [activeTab, user, ordersLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isFetchingOrdersRef.current = false;
    };
  }, []);

  // Function to refresh orders
  const refreshOrders = React.useCallback(async () => {
    if (!user || isFetchingOrdersRef.current) return;
    
    isFetchingOrdersRef.current = true;
    setOrdersLoaded(false);
    setOrders([]);
    setLoadingOrders(true);
    
    try {
      // Cancel any existing request for this user
      ApiDebounceManager.cancel(`getUserOrders-${user.id}`);
      
      const userOrders = await ApiDebounceManager.debounce(
        `getUserOrders-${user.id}`,
        () => OrderService.getUserOrders(user.id),
        100
      );
      
      const transformedOrders: Order[] = userOrders.map(order => ({
        id: order.id,
        created_at: order.createdAt,
        status: order.status.charAt(0).toUpperCase() + order.status.slice(1) as 'Processing' | 'Shipped' | 'Delivered',
        total_amount: order.totalAmount
      }));
      
      setOrders(transformedOrders);
      setOrdersLoaded(true);
    } catch (error) {
      console.error("❌ Error refreshing orders:", error);
    } finally {
      setLoadingOrders(false);
      isFetchingOrdersRef.current = false;
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUser({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone: profileData.phone,
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        zip_code: profileData.zipCode
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setProfileData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zip_code || '',
        joinDate: user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'Recently joined'
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#b094b2] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Profile</h2>
          <p className="text-gray-600">Please wait...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    navigate('/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 md:mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-cormorant-light text-gray-900 mb-3">My Profile</h1>
              <p className="text-base sm:text-lg text-gray-600 px-4">Manage your account settings and preferences</p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#b094b2] to-[#d1bccd] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6">
                    <div className="text-center mb-6 md:mb-8">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#b094b2] via-[#b094b2] to-[#d1bccd] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-[#d1bccd]">
                        <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1">
                        {profileData.firstName} {profileData.lastName}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm mb-3 break-all">{profileData.email}</p>
                      <div className="inline-flex items-center px-2 md:px-3 py-1 bg-gradient-to-r from-[#d1bccd] to-[#d1bccd] text-[#b094b2] rounded-full text-xs font-medium">
                        <div className="w-2 h-2 bg-[#b094b2] rounded-full mr-2"></div>
                        Member since {profileData.joinDate}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-200 text-left group text-sm md:text-base ${
                          activeTab === 'profile'
                            ? 'bg-gradient-to-r from-[#b094b2] to-[#d1bccd] text-white shadow-lg transform scale-105'
                            : 'text-gray-700 hover:bg-[#d1bccd] hover:text-[#b094b2] hover:transform hover:scale-105'
                        }`}
                      >
                        <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-white' : 'text-gray-600 group-hover:text-[#b094b2]'}`} />
                        <span className="font-medium">Profile</span>
                        {activeTab === 'profile' && (
                          <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </button>
                      
                      <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                          activeTab === 'orders'
                            ? 'bg-gradient-to-r from-[#b094b2] to-[#d1bccd] text-white shadow-lg transform scale-105'
                            : 'text-gray-700 hover:bg-[#d1bccd] hover:text-[#b094b2] hover:transform hover:scale-105'
                        }`}
                      >
                        <Package className={`w-5 h-5 ${activeTab === 'orders' ? 'text-white' : 'text-gray-600 group-hover:text-[#b094b2]'}`} />
                        <span className="font-medium">Orders</span>
                        {activeTab === 'orders' && (
                          <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </button>
                      
                      <button
                        onClick={() => setActiveTab('wishlist')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                          activeTab === 'wishlist'
                            ? 'bg-gradient-to-r from-[#b094b2] to-[#d1bccd] text-white shadow-lg transform scale-105'
                            : 'text-gray-700 hover:bg-[#d1bccd] hover:text-[#b094b2] hover:transform hover:scale-105'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${activeTab === 'wishlist' ? 'text-white' : 'text-gray-600 group-hover:text-[#b094b2]'}`} />
                        <span className="font-medium">Wishlist</span>
                        {activeTab === 'wishlist' && (
                          <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </button>
                      
                      <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                          activeTab === 'settings'
                            ? 'bg-gradient-to-r from-[#b094b2] to-[#d1bccd] text-white shadow-lg transform scale-105'
                            : 'text-gray-700 hover:bg-[#d1bccd] hover:text-[#b094b2] hover:transform hover:scale-105'
                        }`}
                      >
                        <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-white' : 'text-gray-600 group-hover:text-[#b094b2]'}`} />
                        <span className="font-medium">Settings</span>
                        {activeTab === 'settings' && (
                          <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  {/* Profile Tab */}
                  <TabsContent value="profile">
                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader className="bg-gradient-to-r from-[#d1bccd] to-[#d1bccd] rounded-t-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-2xl font-cormorant-light text-gray-900">Profile Information</CardTitle>
                            <CardDescription>Manage your personal information and preferences</CardDescription>
                          </div>
                          {!isEditing ? (
                            <Button 
                              onClick={() => setIsEditing(true)} 
                              className="flex items-center gap-2 bg-[#b094b2] hover:bg-[#b094b2]/80"
                            >
                              <Edit className="w-4 h-4" />
                              Edit Profile
                            </Button>
                          ) : (
                            <div className="flex gap-2">
                              <Button 
                                onClick={handleSave} 
                                className="flex items-center gap-2 bg-[#b094b2] hover:bg-[#b094b2]/80"
                              >
                                <Save className="w-4 h-4" />
                                Save Changes
                              </Button>
                              <Button 
                                onClick={handleCancel} 
                                variant="outline" 
                                className="flex items-center gap-2 border-gray-300 hover:bg-gray-50"
                              >
                                <X className="w-4 h-4" />
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={profileData.firstName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`mt-1 ${!isEditing ? 'bg-gray-50' : 'bg-white border-gray-300 focus:border-[#b094b2] focus:ring-[#b094b2]'}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={profileData.lastName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`mt-1 ${!isEditing ? 'bg-gray-50' : 'bg-white border-gray-300 focus:border-[#b094b2] focus:ring-[#b094b2]'}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              value={profileData.email}
                              disabled
                              className="mt-1 bg-gray-50 border-gray-200"
                            />
                            <p className="text-xs text-gray-500 mt-1">Email address cannot be changed</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={profileData.phone}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`mt-1 ${!isEditing ? 'bg-gray-50' : 'bg-white border-gray-300 focus:border-[#b094b2] focus:ring-[#b094b2]'}`}
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="address" className="text-sm font-medium text-gray-700">Street Address</Label>
                            <Input
                              id="address"
                              name="address"
                              value={profileData.address}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`mt-1 ${!isEditing ? 'bg-gray-50' : 'bg-white border-gray-300 focus:border-[#b094b2] focus:ring-[#b094b2]'}`}
                              placeholder="Enter your street address"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={profileData.city}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`mt-1 ${!isEditing ? 'bg-gray-50' : 'bg-white border-gray-300 focus:border-[#b094b2] focus:ring-[#b094b2]'}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state" className="text-sm font-medium text-gray-700">State</Label>
                            <Input
                              id="state"
                              name="state"
                              value={profileData.state}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`mt-1 ${!isEditing ? 'bg-gray-50' : 'bg-white border-gray-300 focus:border-[#b094b2] focus:ring-[#b094b2]'}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">ZIP Code</Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={profileData.zipCode}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`mt-1 ${!isEditing ? 'bg-gray-50' : 'bg-white border-gray-300 focus:border-[#b094b2] focus:ring-[#b094b2]'}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Member Since</Label>
                            <Input
                              value={profileData.joinDate}
                              disabled
                              className="mt-1 bg-gray-50 border-gray-200"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Orders Tab */}
                  <TabsContent value="orders">
                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader className="bg-gradient-to-r from-[#d1bccd] to-[#d1bccd] rounded-t-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-2xl font-cormorant-light text-gray-900">Order History</CardTitle>
                            <CardDescription>Track your past and current orders</CardDescription>
                          </div>
                          <Button 
                            onClick={refreshOrders} 
                            disabled={loadingOrders || isFetchingOrdersRef.current}
                            variant="outline"
                            size="sm"
                            className="border-[#b094b2] text-[#b094b2] hover:bg-[#d1bccd]"
                          >
                            {loadingOrders ? 'Loading...' : 'Refresh'}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        {loadingOrders ? (
                          <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b094b2] mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading your order history...</p>
                          </div>
                        ) : orders.length === 0 ? (
                          <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#d1bccd] to-[#d1bccd] rounded-full flex items-center justify-center mx-auto mb-6">
                              <Package className="w-10 h-10 text-[#b094b2]" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
                            <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start your crystal journey!</p>
                            <Link to="/shop">
                              <Button className="bg-[#b094b2] hover:bg-[#b094b2]/80 px-6 py-2">
                                Start Shopping
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {orders.map((order) => (
                              <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 bg-white">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#d1bccd] to-[#d1bccd] rounded-full flex items-center justify-center">
                                      <Package className="w-5 h-5 text-[#b094b2]" />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-gray-800">Order #{order.id.substring(0, 8).toUpperCase()}</h3>
                                      <p className="text-sm text-gray-500">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                  <Badge className={`${getStatusColor(order.status)} px-3 py-1`}>{order.status}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-gray-600">
                                    <span>Total Amount: </span>
                                    <span className="font-semibold text-lg text-[#b094b2]">₹{order.total_amount.toFixed(2)}</span>
                                  </div>
                                  <Button variant="outline" size="sm" className="border-[#b094b2] text-[#b094b2] hover:bg-[#d1bccd]">
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Wishlist Tab */}
                  <TabsContent value="wishlist">
                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader className="bg-gradient-to-r from-[#d1bccd] to-[#d1bccd] rounded-t-lg">
                        <CardTitle className="text-2xl font-cormorant-light text-gray-900">Wishlist</CardTitle>
                        <CardDescription>Your favorite crystals and spiritual items</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        {wishlistItems.length === 0 ? (
                          <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#d1bccd] to-[#d1bccd] rounded-full flex items-center justify-center mx-auto mb-6">
                              <Heart className="w-10 h-10 text-[#b094b2]" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Wishlist is Empty</h3>
                            <p className="text-gray-600 mb-6">Start adding your favorite crystals to your wishlist!</p>
                            <Link to="/shop">
                              <Button className="bg-[#b094b2] hover:bg-[#b094b2]/80 px-6 py-2">
                                Browse Products
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {wishlistItems.map((item) => (
                              <div key={item.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 bg-white">
                                <div className="flex items-center space-x-4">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-20 h-20 object-cover rounded-xl shadow-sm"
                                  />
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                                    <p className="text-xl font-bold text-[#b094b2]">₹{item.price.toFixed(2)}</p>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <Button size="sm" className="bg-[#b094b2] hover:bg-[#b094b2]/80 text-white">
                                      Add to Cart
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Settings Tab */}
                  <TabsContent value="settings">
                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader className="bg-gradient-to-r from-[#d1bccd] to-[#d1bccd] rounded-t-lg">
                        <CardTitle className="text-2xl font-cormorant-light text-gray-900">Account Settings</CardTitle>
                        <CardDescription>Manage your account preferences and security</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          {/* Account Information */}
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800">Account Information</h3>
                                <p className="text-sm text-gray-600">Your basic account details</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Email:</span>
                                <span className="ml-2 font-medium">{profileData.email}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Member Since:</span>
                                <span className="ml-2 font-medium">{profileData.joinDate}</span>
                              </div>
                            </div>
                          </div>

                          {/* Security Settings */}
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <Settings className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800">Security</h3>
                                <p className="text-sm text-gray-600">Manage your account security</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <Button variant="outline" className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50">
                                Change Password
                              </Button>
                              <Button variant="outline" className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50">
                                Two-Factor Authentication
                              </Button>
                            </div>
                          </div>

                          {/* Sign Out */}
                          <div className="bg-gradient-to-r from-red-50 to-[#d1bccd] p-6 rounded-xl border border-red-100">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                  <LogOut className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-800">Sign Out</h3>
                                  <p className="text-sm text-gray-600">Sign out of your account</p>
                                </div>
                              </div>
                              <Button 
                                variant="outline" 
                                onClick={handleSignOut}
                                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;