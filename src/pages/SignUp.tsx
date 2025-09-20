import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AlertMessage from '@/components/AlertMessage';
import { useAuth } from '@/hooks/useAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { signUp, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setErrors({});
    
    if (!validateForm()) {
      return;
    }

    try {
      await signUp({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password
      });

      // **THIS IS THE CORRECTED PART**
      // Always navigate to the confirmation page after successful sign-up,
      // and pass the email along so the page can display it.
      navigate('/confirm-email', { state: { email: formData.email }, replace: true });

    } catch (error) {
      // Error is handled by the auth context and displayed in the UI
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      
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
                Create Account
              </h1>
              <p className="text-gray-600">
                Join us and start your crystal journey
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-playfair text-gray-800">
                  Sign Up
                </CardTitle>
                <CardDescription>
                  Create your account to get started
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {error && (
                  <AlertMessage
                    type="error"
                    title="Account Creation Failed"
                    message={error}
                    suggestions={[
                      'Check if email is already registered',
                      'Ensure password is at least 6 characters',
                      'Verify email format is correct',
                      'Try using a different email address'
                    ]}
                    onClose={clearError}
                  />
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="first_name"
                          name="first_name"
                          type="text"
                          placeholder="First name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          className={`pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 ${
                            errors.first_name ? 'border-red-500' : ''
                          }`}
                          required
                        />
                      </div>
                      {errors.first_name && (
                        <p className="text-sm text-red-500">{errors.first_name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">
                        Last Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="last_name"
                          name="last_name"
                          type="text"
                          placeholder="Last name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          className={`pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 ${
                            errors.last_name ? 'border-red-500' : ''
                          }`}
                          required
                        />
                      </div>
                      {errors.last_name && (
                        <p className="text-sm text-red-500">{errors.last_name}</p>
                      )}
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
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
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
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`pl-10 pr-12 py-3 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 ${
                          errors.password ? 'border-red-500' : ''
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
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`pl-10 pr-12 py-3 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 ${
                          errors.confirmPassword ? 'border-red-500' : ''
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      required
                    />
                    <Label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <Link to="/terms" className="text-purple-600 hover:text-purple-700">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-purple-600 hover:text-purple-700">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      to="/signin" 
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;