import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import AlertMessage from '@/components/AlertMessage';
import { useAuth } from '@/hooks/useAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation(); 
  const from = location.state?.from?.pathname || '/profile';
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Only clear field-level errors when user starts typing
    // Don't clear context-level errors (like "wrong password") automatically
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any existing errors when submitting
    clearError();
    setFieldErrors({});
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await signIn(formData.email, formData.password);
      setShowSuccess(true);
      // Navigate after showing success message
      setTimeout(() => {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }, 1500);
    } catch (error) {
      // Error is handled by the context and will persist until next submission
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-3xl font-playfair font-bold text-gray-800 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Login to your account to continue shopping
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-playfair text-gray-800">
                  Login
                </CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {showSuccess && (
                  <AlertMessage
                    type="success"
                    title="Welcome Back!"
                    message="You have successfully signed in. Redirecting you now..."
                    onClose={() => setShowSuccess(false)}
                  />
                )}
                {error && (
                  <AlertMessage
                    type="error"
                    title="Login Failed"
                    message={error}
                    suggestions={[
                      'Check your email and password',
                      'Make sure your account is verified',
                      'Try resetting your password'
                    ]}
                    onClose={clearError}
                  />
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 ${
                          fieldErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                        required
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`pl-10 pr-12 py-3 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 ${
                          fieldErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p className="text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <Label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                        Remember me
                      </Label>
                    </div>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-purple-600 hover:text-purple-700"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging In...' : 'Login'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link 
                      to="/signup" 
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SignIn;
