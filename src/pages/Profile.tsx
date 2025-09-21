// src/pages/Profile.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Package, Heart, Settings, LogOut, Edit, Save, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import { supabase } from '@/lib/supabaseClient';

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

  // Fetch orders when the 'orders' tab is active
  useEffect(() => {
    if (activeTab === 'orders' && user) {
      const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) {
            console.error("Error fetching orders:", error);
          } else if (data) {
            setOrders(data);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
        setLoadingOrders(false);
      };

      fetchOrders();
    }
  }, [activeTab, user]);

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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-lobster text-gray-800 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {profileData.firstName} {profileData.lastName}
                      </h3>
                      <p className="text-gray-600">{profileData.email}</p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-1">
                        <TabsTrigger value="profile" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Profile
                        </TabsTrigger>
                        <TabsTrigger value="orders" className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Orders
                        </TabsTrigger>
                        <TabsTrigger value="wishlist" className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Wishlist
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Settings
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  {/* Profile Tab */}
                  <TabsContent value="profile">
                    <Card className="shadow-lg">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-2xl font-lobster text-gray-800">Profile Information</CardTitle>
                            <CardDescription>Manage your personal information</CardDescription>
                          </div>
                          {!isEditing ? (
                            <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                              <Edit className="w-4 h-4" />
                              Edit Profile
                            </Button>
                          ) : (
                            <div className="flex gap-2">
                              <Button onClick={handleSave} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                                <Save className="w-4 h-4" />
                                Save
                              </Button>
                              <Button onClick={handleCancel} variant="outline" className="flex items-center gap-2">
                                <X className="w-4 h-4" />
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={profileData.firstName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={profileData.lastName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              value={profileData.email}
                              disabled
                              className="mt-1 bg-gray-50"
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={profileData.phone}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              name="address"
                              value={profileData.address}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={profileData.city}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              name="state"
                              value={profileData.state}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={profileData.zipCode}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Member Since</Label>
                            <Input
                              value={profileData.joinDate}
                              disabled
                              className="mt-1 bg-gray-50"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Orders Tab */}
                  <TabsContent value="orders">
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl font-lobster text-gray-800">Order History</CardTitle>
                        <CardDescription>View your past and current orders</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {loadingOrders ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                            <p>Loading your order history...</p>
                          </div>
                        ) : orders.length === 0 ? (
                          <div className="text-center py-8">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Orders Yet</h3>
                            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                            <Link to="/shop">
                              <Button className="bg-purple-600 hover:bg-purple-700">
                                Start Shopping
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {orders.map((order) => (
                              <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-semibold text-gray-800">Order #{order.id.substring(0, 8).toUpperCase()}</h3>
                                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                  <span>Date: {new Date(order.created_at).toLocaleDateString()}</span>
                                  <span className="font-semibold">₹{order.total_amount.toFixed(2)}</span>
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
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl font-lobster text-gray-800">Wishlist</CardTitle>
                        <CardDescription>Items you've saved for later</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {wishlistItems.length === 0 ? (
                          <div className="text-center py-8">
                            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Wishlist is Empty</h3>
                            <p className="text-gray-600 mb-4">Start adding items to your wishlist!</p>
                            <Link to="/shop">
                              <Button className="bg-purple-600 hover:bg-purple-700">
                                Browse Products
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {wishlistItems.map((item) => (
                              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center space-x-4">
                                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg"/>
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-lg font-bold text-purple-600">₹{item.price.toFixed(2)}</p>
                                  </div>
                                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                                    Add to Cart
                                  </Button>
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
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl font-lobster text-gray-800">Account Settings</CardTitle>
                        <CardDescription>Manage your account preferences</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h3 className="font-semibold text-gray-800">Sign Out</h3>
                              <p className="text-gray-600">Sign out of your account</p>
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
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;