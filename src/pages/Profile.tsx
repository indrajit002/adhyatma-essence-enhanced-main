import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  ShoppingBag, 
  Heart, 
  Settings,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/auth-context';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const { user, updateUser, signOut } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    joinDate: user?.joinDate || ''
  });

  const [orderHistory] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 89.99,
      items: 2
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 156.50,
      items: 3
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Processing',
      total: 45.99,
      items: 1
    }
  ]);

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
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Update user data in context
    updateUser({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-3xl font-playfair font-bold text-gray-800 mb-2">
                My Profile
              </h1>
              <p className="text-gray-600">
                Manage your account and view your orders
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                          activeTab === 'profile' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <User className="w-5 h-5 mr-3" />
                        Profile
                      </button>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                          activeTab === 'orders' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <ShoppingBag className="w-5 h-5 mr-3" />
                        Orders
                      </button>
                      <button
                        onClick={() => setActiveTab('wishlist')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                          activeTab === 'wishlist' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Heart className="w-5 h-5 mr-3" />
                        Wishlist
                      </button>
                      <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                          activeTab === 'settings' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Settings className="w-5 h-5 mr-3" />
                        Settings
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {activeTab === 'profile' && (
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl font-playfair text-gray-800">
                            Profile Information
                          </CardTitle>
                          <CardDescription>
                            Manage your personal information
                          </CardDescription>
                        </div>
                        {!isEditing ? (
                          <Button
                            onClick={() => setIsEditing(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Profile
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSave}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button
                              onClick={handleCancel}
                              variant="outline"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                            First Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              id="firstName"
                              name="firstName"
                              value={profileData.firstName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                            Last Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              id="lastName"
                              name="lastName"
                              value={profileData.lastName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={profileData.email}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Phone Number
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              id="phone"
                              name="phone"
                              value={profileData.phone}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                          Address
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                          <Input
                            id="address"
                            name="address"
                            value={profileData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                          Member since: {profileData.joinDate}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'orders' && (
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-playfair text-gray-800">
                        Order History
                      </CardTitle>
                      <CardDescription>
                        View your past and current orders
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {orderHistory.map((order) => (
                          <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-800">Order {order.id}</h3>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>Date: {order.date}</span>
                              <span>{order.items} item{order.items > 1 ? 's' : ''}</span>
                              <span className="font-semibold">₹{order.total}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'wishlist' && (
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-playfair text-gray-800">
                        Wishlist
                      </CardTitle>
                      <CardDescription>
                        Items you've saved for later
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {wishlist.map((item) => (
                          <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-lg font-bold text-purple-600">₹{item.price}</p>
                              </div>
                              <Button
                                size="sm"
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'settings' && (
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-playfair text-gray-800">
                        Account Settings
                      </CardTitle>
                      <CardDescription>
                        Manage your account preferences
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Security</h3>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                          Change Password
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            Email notifications
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            Order updates
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Marketing emails
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Account</h3>
                        <Button
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => {
                            signOut();
                            navigate('/');
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
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
