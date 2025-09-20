import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Assuming you created this file
import { AuthChangeEvent, Session, User as SupabaseUser, AuthResponse } from '@supabase/supabase-js';

// --- Type Definitions ---

// This interface represents the data in your public.profiles table
interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  updated_at?: string;
}

interface AuthState {
  user: Profile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ user: SupabaseUser | null; session: Session | null }>;
  signUp: (userData: Omit<Profile, 'id' | 'updated_at'> & { password: string; email: string }) => Promise<{ user: SupabaseUser | null; session: Session | null }>;
  signOut: () => Promise<void>;
  updateUser: (userData: Partial<Profile>) => Promise<void>;
  clearError: () => void;
}

// --- Context Creation ---

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- AuthProvider Component ---

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //
    // 1. Initial Session Check
    //
    const getInitialSession = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      console.log('Initial session:', initialSession);
      setSession(initialSession);

      if (initialSession?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', initialSession.user.id)
          .single();
        
        console.log('Initial profile fetch:', { profile, profileError });
        
        if (profileError) {
          console.error('Initial profile fetch error:', profileError);
          setUser(null);
        } else {
          setUser(profile as Profile);
        }
      }
      setIsLoading(false);
    };

    getInitialSession();

    //
    // 2. Real-time Authentication Listener
    //
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth state change:', { event, session });
        setSession(session);
        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          console.log('Profile fetch result:', { profile, profileError });
          
          if (profileError) {
            console.error('Profile fetch error:', profileError);
            // If profile doesn't exist, don't set user (user will need to complete signup)
            setUser(null);
          } else {
            setUser(profile as Profile);
          }
        } else {
          setUser(null);
        }
      }
    );

    //
    // 3. Cleanup Subscription
    //
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // --- Core Authentication Functions ---

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
        const userFriendlyError = transformErrorMessage(signInError, 'signin');
        setError(userFriendlyError);
        setIsLoading(false);
        throw signInError;
    }
    setIsLoading(false);
    return data;
  };

  // const signUp = async (userData: Omit<Profile, 'id' | 'updated_at'> & { password: string; email: string }) => {
  //   setIsLoading(true);
  //   setError(null);
    
  //   try {
  //     // Sign up the user
  //     const { data: authData, error: signUpError } = await supabase.auth.signUp({
  //       email: userData.email,
  //       password: userData.password,
  //     });
      
  //     console.log('Auth signup result:', { authData, signUpError });
      
  //     if (signUpError) {
  //       console.error('Auth signup error:', signUpError);
  //       const userFriendlyError = transformErrorMessage(signUpError, 'signup');
  //       setError(userFriendlyError);
  //       setIsLoading(false);
  //       throw signUpError;
  //     }

  //     // Check if user was actually created
  //     if (!authData.user) {
  //       const userFriendlyError = 'Account creation failed. Please try again.';
  //       setError(userFriendlyError);
  //       setIsLoading(false);
  //       throw new Error(userFriendlyError);
  //     }

  //     // Check if profile already exists (in case user exists but profile doesn't)
  //     const { data: existingProfile, error: profileCheckError } = await supabase
  //       .from('profiles')
  //       .select('id')
  //       .eq('id', authData.user.id)
  //       .single();

  //     // If profile exists, that's actually fine - user can sign in
  //     if (existingProfile && !profileCheckError) {
  //       const userFriendlyError = 'An account with this email already exists. Please sign in instead or use a different email.';
  //       setError(userFriendlyError);
  //       setIsLoading(false);
  //       throw new Error(userFriendlyError);
  //     }

  //     // Create profile only if it doesn't exist
  //     console.log('Creating profile with data:', {
  //       id: authData.user.id,
  //       first_name: userData.first_name,
  //       last_name: userData.last_name,
  //       phone: userData.phone || null,
  //       address: userData.address || null,
  //       city: userData.city || null,
  //       state: userData.state || null,
  //       zip_code: userData.zip_code || null,
  //     });

  //     const { data: profileData, error: profileError } = await supabase
  //       .from('profiles')
  //       .insert({
  //         id: authData.user.id,
  //         first_name: userData.first_name,
  //         last_name: userData.last_name,
  //         phone: userData.phone || null,
  //         address: userData.address || null,
  //         city: userData.city || null,
  //         state: userData.state || null,
  //         zip_code: userData.zip_code || null,
  //       })
  //       .select()
  //       .single();

  //     console.log('Profile creation result:', { profileData, profileError });

  //     if (profileError) {
  //       console.error('Profile creation error:', profileError);
  //       // If it's a duplicate key error, user already exists
  //       if (profileError.message?.includes('duplicate key') || profileError.message?.includes('already exists')) {
  //         const userFriendlyError = 'An account with this email already exists. Please sign in instead or use a different email.';
  //         setError(userFriendlyError);
  //         setIsLoading(false);
  //         throw new Error(userFriendlyError);
  //       }
        
  //       // If profile creation fails, show the actual error
  //       const userFriendlyError = transformErrorMessage(profileError, 'signup');
  //       setError(userFriendlyError);
  //       setIsLoading(false);
  //       throw profileError;
  //     }

  //     // If we get here, both auth user and profile were created successfully
  //     // Update the local state with the new profile data
  //     if (profileData) {
  //       setUser(profileData as Profile);
  //     }
      
  //     setIsLoading(false);
  //     return authData;
  //   } catch (error) {
  //     // Ensure loading is set to false on any error
  //     setIsLoading(false);
  //     throw error;
  //   }
  // };
    // Replace the old function with this new one
const signUp = async (userData: Omit<Profile, 'id' | 'updated_at'> & { password: string; email: string }) => {
  setIsLoading(true);
  setError(null);

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      // This 'data' object passes metadata to your Supabase Trigger.
      // The trigger will use this to create the profile row automatically.
      data: {
        first_name: userData.first_name,
        last_name: userData.last_name,
      }
    }
  });

  if (signUpError) {
    const userFriendlyError = transformErrorMessage(signUpError, 'signup');
    setError(userFriendlyError);
    setIsLoading(false);
    throw signUpError;
  }

  setIsLoading(false);
  // The onAuthStateChange listener will automatically fetch the new profile for you
  return data;
};
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateUser = async (userData: Partial<Profile>) => {
    if (!user) throw new Error("No user is signed in to update.");

    const { data, error: updateError } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', user.id)
        .select()
        .single();
    
    if (updateError) {
        const userFriendlyError = transformErrorMessage(updateError, 'profile');
        setError(userFriendlyError);
        throw updateError;
    }

    if (data) {
        setUser(data as Profile);
    }
  };

  const clearError = () => setError(null);

  // --- Error Message Transformation ---
  
  const transformErrorMessage = (error: Error | { message?: string } | string, context: 'signin' | 'signup' | 'profile') => {
    if (!error) return null;
    
    const errorMessage = typeof error === 'string' ? error : (error.message || error.toString());
    
    // Common Supabase error patterns and their user-friendly translations
    const errorTranslations: { [key: string]: string } = {
      // Sign In Errors
      'Invalid login credentials': 'The email or password you entered is incorrect. Please check your credentials and try again.',
      'Email not confirmed': 'Please check your email and click the confirmation link before signing in.',
      'Invalid email or password': 'The email or password you entered is incorrect. Please check your credentials and try again.',
      'Too many requests': 'Too many login attempts. Please wait a few minutes before trying again.',
      'User not found': 'No account found with this email address. Please check your email or sign up for a new account.',
      
      // Sign Up Errors
      'User already registered': 'An account with this email already exists. Please sign in instead or use a different email.',
      'Password should be at least 6 characters': 'Password must be at least 6 characters long.',
      'Signup is disabled': 'New account registration is currently disabled. Please contact support.',
      'Email address is invalid': 'Please enter a valid email address.',
      'Password is too weak': 'Please choose a stronger password with at least 6 characters.',
      
      // Network/Connection Errors
      'Failed to fetch': 'Unable to connect to the server. Please check your internet connection and try again.',
      'Network error': 'Network connection error. Please check your internet connection and try again.',
      'Request timeout': 'The request timed out. Please try again.',
      
      // Database Errors
      'duplicate key value violates unique constraint': 'This email is already registered. Please sign in instead or use a different email.',
      'relation "profiles" does not exist': 'Database configuration error. Please contact support.',
      'permission denied for table profiles': 'Database permission error. Please contact support.',
      'column "city" does not exist': 'Database schema needs to be updated. Please contact support.',
      'column "state" does not exist': 'Database schema needs to be updated. Please contact support.',
      'column "zip_code" does not exist': 'Database schema needs to be updated. Please contact support.',
      'insert or update on table "profiles" violates foreign key constraint': 'Database configuration error. Please contact support.',
    };
    
    // Check for exact matches first
    for (const [technicalError, userFriendlyMessage] of Object.entries(errorTranslations)) {
      if (errorMessage.toLowerCase().includes(technicalError.toLowerCase())) {
        return userFriendlyMessage;
      }
    }
    
    // Check for partial matches
    if (errorMessage.includes('credentials')) {
      return 'The email or password you entered is incorrect. Please check your credentials and try again.';
    }
    
    if (errorMessage.includes('email')) {
      return 'There was an issue with your email address. Please check it and try again.';
    }
    
    if (errorMessage.includes('password')) {
      return 'There was an issue with your password. Please check it and try again.';
    }
    
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    }
    
    // Default fallback - return a generic user-friendly message
    return 'Something went wrong. Please try again or contact support if the problem persists.';
  };

  // --- Context Value ---

  const value: AuthContextType = {
    user,
    session,
    isAuthenticated: !!user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    updateUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Initializing Authentication</h2>
            <p className="text-gray-600">Setting up your crystal journey...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// --- Custom Hook ---

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

