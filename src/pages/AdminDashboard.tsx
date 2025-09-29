import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/utils/admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Package, BarChart3, Users, Settings } from 'lucide-react';
import ProductForm from '@/components/ProductForm';
import ProductList from '@/components/ProductList';
import ProductStats from '@/components/ProductStats';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const isAdmin = useIsAdmin();
  const [activeTab, setActiveTab] = useState('products');

  // Debug logging for admin status
  console.log('Admin Dashboard Debug:', {
    user: user ? { id: user.id, email: user.email, is_admin: user.is_admin } : null,
    isAdmin,
    isAuthenticated: !!user
  });

  // Check if user is authenticated and has admin privileges
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Authentication Required</CardTitle>
            <CardDescription className="text-center">
              Please sign in to access the admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.href = '/signin'}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-2 border-red-500 shadow-2xl">
          <CardHeader className="text-center bg-red-500 text-white rounded-t-lg">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <CardTitle className="text-2xl font-bold">⚠️ WARNING ⚠️</CardTitle>
            </div>
            <CardDescription className="text-red-100 text-lg font-semibold">
              UNAUTHORIZED ACCESS ATTEMPT
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 text-center bg-white">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">
                🚫 ACCESS DENIED 🚫
              </h3>
              <p className="text-lg font-semibold text-gray-800 mb-2">
                You don't have permission to access this page.
              </p>
              <p className="text-lg font-semibold text-gray-800 mb-4">
                Only administrators can access the admin panel.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700 font-bold">
                  ⚠️ This action has been logged and monitored ⚠️
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <Button 
                onClick={() => window.history.back()}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 text-lg"
              >
                🏃‍♂️ GO BACK IMMEDIATELY
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="w-full border-red-500 text-red-600 hover:bg-red-50 font-bold py-3 px-6 text-lg"
              >
                🏠 Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
      <Header />
      
      {/* Admin Header - with top padding to account for fixed header */}
      <div className="bg-gradient-to-r from-[#b094b2] to-[#d1bccd] shadow-lg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-black/20 rounded-full">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
                <p className="text-black text-lg">Welcome back, {user?.first_name}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={signOut}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert className="mb-6">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            You are logged in as an administrator. You can manage products, view statistics, and configure settings.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="add-product" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Add Product</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Statistics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>
                  View, edit, and manage all products in your store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-product" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>
                  Create a new product for your crystal store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Statistics</CardTitle>
                <CardDescription>
                  Overview of your store's performance and metrics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductStats />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>
                  Configure your admin account and store settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Account Information</h3>
                    <p className="text-sm text-gray-600">
                      <strong>Name:</strong> {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Email:</strong> {user?.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Role:</strong> Administrator
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Store Categories</h3>
                    <p className="text-sm text-gray-600">
                      Your store currently supports 13 product categories: Bracelet, Rudraksh, Frames, Anklet, Pyramid, Tower and Tumbles, Raw Stones, Selenite Plates, Geode, Mala, Hangers, Tumble Set, and Trees.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      
    </div>
  );
};

export default AdminDashboard;
