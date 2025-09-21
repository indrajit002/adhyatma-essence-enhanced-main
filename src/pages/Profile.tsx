// src/pages/Profile.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// ... other component imports
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient'; // 1. Import Supabase

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
  const { user, session, updateUser, signOut } = useAuth();
  const navigate = useNavigate();

  // 3. Add state for orders and loading status
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
    if (user && session) {
      setProfileData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: session.user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zip_code || '',
        joinDate: session.user.created_at ? new Date(session.user.created_at).toLocaleDateString() : ''
      });
    }
  }, [user, session]);

  // 4. Fetch orders when the 'orders' tab is active
  useEffect(() => {
    if (activeTab === 'orders' && user) {
      const fetchOrders = async () => {
        setLoadingOrders(true);
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
        setLoadingOrders(false);
      };

      fetchOrders();
    }
  }, [activeTab, user]);

  const [wishlist] = useState([
    {
      id: '1',  
      name: 'Amethyst Cluster',
      price: 89.99,
      image: '/src/assets/healing-crystals.jpg'
    },
    {
      id: '2',
      name: 'Rose Quartz Heart',
      price: 45.99,
      image: '/src/assets/crystal-bracelets.jpg'
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser({
      first_name: profileData.firstName,
      last_name: profileData.lastName,
      phone: profileData.phone,
      address: profileData.address,
      city: profileData.city,
      state: profileData.state,
      zip_code: profileData.zipCode
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user && session) {
        setProfileData({
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            email: session.user.email || '',
            phone: user.phone || '',
            address: user.address || '',
            city: user.city || '',
            state: user.state || '',
            zipCode: user.zip_code || '',
            joinDate: session.user.created_at ? new Date(session.user.created_at).toLocaleDateString() : ''
        });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* ... Header and Sidebar ... */}

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* ... Profile Tab ... */}

              {/* 5. UPDATED: Orders Tab now uses dynamic data */}
              {activeTab === 'orders' && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-playfair text-gray-800">Order History</CardTitle>
                    <CardDescription>View your past and current orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingOrders ? (
                      <div className="text-center py-8">
                        <p>Loading your order history...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-8">
                        <p>You haven't placed any orders yet.</p>
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
                              {/* 6. FIXED Currency Symbol */}
                              <span className="font-semibold">₹{order.total_amount.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-playfair text-gray-800">Wishlist</CardTitle>
                    <CardDescription>{"Items you've saved for later"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlist.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg"/>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800">{item.name}</h3>
                              {/* 7. FIXED Currency Symbol */}
                              <p className="text-lg font-bold text-purple-600">₹{item.price.toFixed(2)}</p>
                            </div>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* ... Settings Tab ... */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;