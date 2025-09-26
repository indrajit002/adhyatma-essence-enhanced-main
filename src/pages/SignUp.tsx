import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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
  const [signupStatus, setSignupStatus] = useState<'idle' | 'creating-user' | 'creating-profile' | 'success' | 'error'>('idle');
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
    setSignupStatus('idle');
    
    // Add browser detection and debugging
    const userAgent = navigator.userAgent;
    const isChrome = userAgent.includes('Chrome') && !userAgent.includes('Edge');
    const isIncognito = window.navigator.storage && window.navigator.storage.estimate ? true : false;
    
    if (!validateForm()) {
      return;
    }

    try {
      setSignupStatus('creating-user');
      
      // Add timeout protection for Chrome
      const signupPromise = signUp({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password
      });
      
      // Add timeout for Chrome compatibility (reduced to 10 seconds)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Signup timeout after 10 seconds')), 10000)
      );
      
      const result = await Promise.race([signupPromise, timeoutPromise]);
      
      setSignupStatus('success');
      
      // Show success state briefly before redirecting (reduced delay)
      setTimeout(() => {
        try {
          navigate('/confirm-email', { state: { email: formData.email }, replace: true });
        } catch (navError) {
          console.error('❌ Navigation failed:', navError);
          // Fallback: try window.location
          window.location.href = '/confirm-email';
        }
      }, 800); // Reduced from 1500ms to 800ms

    } catch (error) {
      console.error('❌ Sign up failed:', error);
      setSignupStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center text-[#b094b2] hover:text-[#b094b2]/80 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-3xl font-cormorant-light text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">
                Join us and start your crystal journey
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-cormorant-light text-gray-900">
                  Sign Up
                </CardTitle>
                <CardDescription>
                  Create your account to get started
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Status Indicator */}
                {signupStatus !== 'idle' && (
                  <div className="mb-6 p-4 rounded-lg border-2 border-dashed">
                    {signupStatus === 'creating-user' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-3 text-[#b094b2]">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="font-medium">Creating your account...</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#b094b2] h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 text-center">Setting up your profile and preferences...</p>
                      </div>
                    )}
                    {signupStatus === 'success' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-3 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">Account created successfully! Redirecting...</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 text-center">Taking you to the confirmation page...</p>
                      </div>
                    )}
                    {signupStatus === 'error' && (
                      <div className="flex items-center justify-center space-x-3 text-red-600">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">Something went wrong. Please try again.</span>
                      </div>
                    )}
                  </div>
                )}

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
                <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity duration-300 ${signupStatus === 'creating-user' ? 'opacity-75' : 'opacity-100'}`}>
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
                          disabled={signupStatus === 'creating-user' || signupStatus === 'success'}
                          className={`pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-[#b094b2] focus:ring-[#b094b2] ${
                            errors.first_name ? 'border-red-500' : ''
                          } ${signupStatus === 'creating-user' || signupStatus === 'success' ? 'bg-gray-50' : ''}`}
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
                          disabled={signupStatus === 'creating-user' || signupStatus === 'success'}
                          className={`pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-[#b094b2] focus:ring-[#b094b2] ${
                            errors.last_name ? 'border-red-500' : ''
                          } ${signupStatus === 'creating-user' || signupStatus === 'success' ? 'bg-gray-50' : ''}`}
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
                        disabled={signupStatus === 'creating-user' || signupStatus === 'success'}
                        className={`pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-[#b094b2] focus:ring-[#b094b2] ${
                          errors.email ? 'border-red-500' : ''
                        } ${signupStatus === 'creating-user' || signupStatus === 'success' ? 'bg-gray-50' : ''}`}
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
                        disabled={signupStatus === 'creating-user' || signupStatus === 'success'}
                        className={`pl-10 pr-12 py-3 rounded-lg border-gray-200 focus:border-[#b094b2] focus:ring-[#b094b2] ${
                          errors.password ? 'border-red-500' : ''
                        } ${signupStatus === 'creating-user' || signupStatus === 'success' ? 'bg-gray-50' : ''}`}
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
                        disabled={signupStatus === 'creating-user' || signupStatus === 'success'}
                        className={`pl-10 pr-12 py-3 rounded-lg border-gray-200 focus:border-[#b094b2] focus:ring-[#b094b2] ${
                          errors.confirmPassword ? 'border-red-500' : ''
                        } ${signupStatus === 'creating-user' || signupStatus === 'success' ? 'bg-gray-50' : ''}`}
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
                      disabled={signupStatus === 'creating-user' || signupStatus === 'success'}
                      className={`h-4 w-4 text-[#b094b2] focus:ring-[#b094b2] border-gray-300 rounded ${
                        signupStatus === 'creating-user' || signupStatus === 'success' ? 'opacity-50' : ''
                      }`}
                      required
                    />
                    <Label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <Link to="/terms" className="text-[#b094b2] hover:text-[#b094b2]/80">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-[#b094b2] hover:text-[#b094b2]/80">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                      signupStatus === 'creating-user' 
                        ? 'bg-[#b094b2] cursor-not-allowed' 
                        : signupStatus === 'success'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-[#b094b2] hover:bg-[#b094b2]/80'
                    } text-white disabled:opacity-50`}
                    disabled={isLoading || signupStatus === 'creating-user' || signupStatus === 'success'}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {signupStatus === 'creating-user' && <Loader2 className="w-4 h-4 animate-spin" />}
                      {signupStatus === 'success' && <CheckCircle className="w-4 h-4" />}
                      <span>
                        {signupStatus === 'creating-user' 
                          ? 'Creating Account...' 
                          : signupStatus === 'success'
                          ? 'Account Created!'
                          : 'Create Account'
                        }
                      </span>
                    </div>
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      to="/signin" 
                      className="text-[#b094b2] hover:text-[#b094b2]/80 font-medium"
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
    </div>
  );
};

export default SignUp;