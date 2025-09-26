import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { AuthChangeEvent, Session, User as SupabaseUser } from '@supabase/supabase-js';

// --- Type Definitions ---
interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  updated_at?: string;
}

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  user: Profile | null;
  session: Session | null;
  status: AuthStatus;
  error: string | null;
}

interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ user: SupabaseUser | null; session: Session | null }>;
  signUp: (userData: Omit<Profile, 'id' | 'updated_at'> & { password: string; email: string }) => Promise<{ user: SupabaseUser | null; session: Session | null }>;
  signOut: () => Promise<void>;
  updateUser: (userData: Partial<Profile>) => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [isProcessingProfile, setIsProcessingProfile] = useState(false);

  const getProfile = useCallback(async (userId: string) => {
    if (isProcessingProfile) {
      return;
    }
    
    setIsProcessingProfile(true);
    
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('❌ Profile fetch error:', profileError);
        
        // If profile doesn't exist, create it from auth user data
        if (profileError.code === 'PGRST116') {
          console.log('⚠️ Profile not found, creating new profile...');
          
          // Get the current user from auth
          const { data: { user: authUser } } = await supabase.auth.getUser();
          
          if (authUser) {
            console.log('✅ Creating profile for user:', authUser.id);
            const { error: createError } = await supabase
              .from('profiles')
              .insert({
                id: authUser.id,
                first_name: authUser.user_metadata?.first_name || '',
                last_name: authUser.user_metadata?.last_name || '',
                email: authUser.email || '',
              });

            if (createError) {
              console.error("❌ Failed to create missing profile:", createError);
              const tempProfile: Profile = {
                id: authUser.id,
                first_name: authUser.user_metadata?.first_name || '',
                last_name: authUser.user_metadata?.last_name || '',
                email: authUser.email || '',
                updated_at: new Date().toISOString()
              };
              setUser(tempProfile);
              setStatus('authenticated');
              return;
            }
            
            // Fetch the newly created profile
            const { data: newProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', userId)
              .single();
              
            if (newProfile) {
              console.log('✅ Profile created and fetched successfully');
              setUser(newProfile as Profile);
              setStatus('authenticated');
              return;
            }
          }
        }
        
        // If we can't fetch or create profile, create a temporary one from auth data
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const tempProfile: Profile = {
            id: authUser.id,
            first_name: authUser.user_metadata?.first_name || '',
            last_name: authUser.user_metadata?.last_name || '',
            email: authUser.email || '',
            updated_at: new Date().toISOString()
          };
          setUser(tempProfile);
          setStatus('authenticated');
          return;
        }
        
        // If we can't get auth user, sign out
        await supabase.auth.signOut();
        setUser(null);
        setStatus('unauthenticated');
        return;
      }
      
      setUser(profile as Profile);
      setStatus('authenticated');
    } catch (error) {
      console.error("❌ Profile fetch exception:", error);
      
      // Instead of signing out immediately, try to create a temporary profile
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const tempProfile: Profile = {
            id: authUser.id,
            first_name: authUser.user_metadata?.first_name || '',
            last_name: authUser.user_metadata?.last_name || '',
            email: authUser.email || '',
            updated_at: new Date().toISOString()
          };
          setUser(tempProfile);
          setStatus('authenticated');
          return;
        }
      } catch (authError) {
        console.error("❌ Failed to get auth user:", authError);
      }
      
      // Only sign out if we can't create a temporary profile
      await supabase.auth.signOut();
      setUser(null);
      setStatus('unauthenticated');
    } finally {
      setIsProcessingProfile(false);
    }
  }, [isProcessingProfile]);

  useEffect(() => {
    let isMounted = true;
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      if (isMounted) {
        setStatus('unauthenticated');
        setInitialized(true);
      }
    }, 10000); // 10 second timeout
    
    const getInitialSession = async () => {
      try {
        
        // Check if Supabase is properly configured
        if (!supabase || !supabase.auth) {
          if (isMounted) {
            setStatus('unauthenticated');
            setInitialized(true);
          }
          return;
        }
        
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("❌ Session error:", sessionError);
          if (isMounted) {
            setStatus('unauthenticated');
          }
          return;
        }

        if (initialSession?.user && isMounted) {
          await getProfile(initialSession.user.id);
        } else if (isMounted) {
          setStatus('unauthenticated');
        }
      } catch (err) {
        console.error("❌ Error during initial session fetch:", err);
        if (isMounted) {
          setError("Failed to connect to the server.");
          setStatus('unauthenticated');
        }
      }
    };


    getInitialSession().finally(() => {
      if (isMounted) {
        clearTimeout(timeoutId);
        setInitialized(true);
      }
    });
    
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('🔄 Auth state change:', event, newSession?.user?.id);
        setSession(newSession);
        
        if (event === 'SIGNED_IN' && newSession?.user) {
          // This handles both SIGNED_IN and SIGNED_UP events
          console.log('✅ User signed up/in, fetching profile...');
          setStatus('loading'); // Set to loading while we fetch the profile
          setSession(newSession); // Ensure session is set immediately
          await getProfile(newSession.user.id);
        } else if (event === 'SIGNED_OUT') {
          console.log('❌ User signed out');
          setUser(null);
          setSession(null);
          setStatus('unauthenticated');
        } else if (event === 'TOKEN_REFRESHED' && newSession?.user) {
          console.log('🔄 Token refreshed, checking profile...');
          // Only refresh profile if we don't already have user data
          if (!user || user.id !== newSession.user.id) {
            await getProfile(newSession.user.id);
          }
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [getProfile, user]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting to sign in...');
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      
      if (signInError) {
        console.error("❌ Sign in error:", signInError);
        setError(transformErrorMessage(signInError, 'signin'));
        throw signInError;
      }
      
      console.log('✅ Sign in successful, data:', data);
      // The onAuthStateChange listener will handle the state update
      return data;
    } catch (error) {
      console.error("❌ Sign in exception:", error);
      throw error;
    }
  };

  const signUp = async (userData: { first_name: string; last_name: string; email: string; password: string }) => {
    
    try {
      // Add Chrome-specific timeout and retry logic
      const signUpWithRetry = async (retries = 3) => {
        for (let i = 0; i < retries; i++) {
          try {
            const { data, error: signUpError } = await supabase.auth.signUp({
              email: userData.email,
              password: userData.password,
              options: {
                data: {
                  first_name: userData.first_name,
                  last_name: userData.last_name,
                }
              }
            });
            
            if (signUpError) {
              console.error(`❌ Signup attempt ${i + 1} failed:`, signUpError);
              if (i === retries - 1) throw signUpError;
              // Wait before retry
              await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
              continue;
            }
            
            return { data, error: null };
          } catch (error) {
            console.error(`❌ Signup attempt ${i + 1} exception:`, error);
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          }
        }
      };
      
      const { data, error: signUpError } = await signUpWithRetry();

      if (signUpError) {
        console.error("❌ Sign up error:", signUpError);
        setError(transformErrorMessage(signUpError, 'signup'));
        throw signUpError;
      }

      // If auth user is created, try to create their profile (non-blocking)
      if (data.user) {
        console.log('✅ User created, setting up profile...');
        
        // Create profile asynchronously without blocking the main flow
        (async () => {
          try {
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
              });
            
            if (profileError) {
              console.error("⚠️ Failed to create profile for new user:", profileError);
            } else {
              console.log('✅ Profile created successfully');
            }
          } catch (profileError) {
            console.error("⚠️ Profile creation exception:", profileError);
          }
        })();
      }

      return data;
    } catch (error) {
      console.error("❌ Sign up exception:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('🚪 Attempting to sign out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("❌ Sign out error:", error);
        setError(transformErrorMessage(error, 'signout'));
        return;
      }
      
      console.log('✅ Sign out successful, refreshing page...');
      // Refresh the page after successful sign out
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("❌ Sign out exception:", error);
      setError(transformErrorMessage(error as Error, 'signout'));
    }
  };

  const updateUser = async (userData: Partial<Profile>) => {
    if (!user) throw new Error("No user is signed in to update.");

    const oldUser = user;
    setUser(prevUser => prevUser ? { ...prevUser, ...userData } : null);

    try {
      const { data, error: updateError } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', user.id)
        .select()
        .single();

      if (updateError) {
        console.error("❌ Failed to update profile in Supabase:", updateError);
        
        // Update the local user state with the new data
        const updatedUser = { ...oldUser, ...userData, updated_at: new Date().toISOString() };
        setUser(updatedUser);
        return;
      }

      if (data) {
        setUser(data as Profile);
      }
    } catch (error) {
      console.error("❌ Profile update exception:", error);
      
      // Update the local user state with the new data
      const updatedUser = { ...oldUser, ...userData, updated_at: new Date().toISOString() };
      setUser(updatedUser);
    }
  };

  const clearError = () => setError(null);

  const transformErrorMessage = (error: Error | { message?: string } | string, context: 'signin' | 'signup' | 'profile' | 'signout') => {
    if (!error) return "An unknown error occurred.";
    const errorMessage = typeof error === 'string' ? error : (error.message || error.toString());
    
    const errorTranslations: { [key: string]: string } = {
        'Invalid login credentials': 'The email or password you entered is incorrect.',
        'Email not confirmed': 'Please check your email and click the confirmation link before signing in.',
        'User already registered': 'An account with this email already exists. Please sign in instead.',
        'Password should be at least 6 characters': 'Password must be at least 6 characters long.',
        'Failed to fetch': 'Unable to connect to the server. Please check your internet connection.',
        'duplicate key value violates unique constraint': 'This email is already registered.',
        'NetworkError': 'A network error occurred. Please check your connection and try again.',
        'Token has expired': 'Your session has expired. Please sign in again.'
    };
    
    for (const [technicalError, userFriendlyMessage] of Object.entries(errorTranslations)) {
      if (errorMessage.toLowerCase().includes(technicalError.toLowerCase())) {
        return userFriendlyMessage;
      }
    }
    
    return 'An unexpected error occurred. Please try again or contact support.';
  };

  const value: AuthContextType = {
    user,
    session,
    status,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    error,
    signIn,
    signUp,
    signOut,
    updateUser,
    clearError,
  };

  // Debug logging for authentication state
  useEffect(() => {
    console.log('🔍 Auth state changed:', {
      status,
      isAuthenticated: status === 'authenticated',
      hasUser: !!user,
      hasSession: !!session,
      userId: user?.id,
      userEmail: user?.email
    });
  }, [status, user, session]);

  return (
    <AuthContext.Provider value={value}>
      {status === 'loading' && !initialized ? (
        <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#b094b2] mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Initializing Authentication</h2>
            <p className="text-gray-600">Setting up your crystal journey...</p>
            
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
                <p className="text-red-600 text-sm">{error}</p>
                <p className="text-gray-500 text-xs mt-2">
                  Please check your internet connection and try refreshing the page.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// Export the AuthProvider as default
export default AuthProvider;
