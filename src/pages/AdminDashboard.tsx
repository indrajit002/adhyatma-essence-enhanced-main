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

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const isAdmin = useIsAdmin();
  const [activeTab, setActiveTab] = useState('products');

  // Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Access Denied</CardTitle>
            <CardDescription className="text-center">
              You don't have permission to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-[#b094b2]" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.first_name}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={signOut}
              className="text-gray-600 hover:text-gray-900"
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
