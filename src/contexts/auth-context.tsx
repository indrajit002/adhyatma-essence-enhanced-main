import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { AuthChangeEvent, Session, User as SupabaseUser } from '@supabase/supabase-js';

// --- Type Definitions ---
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
  signUp: (userData: Omit<Profile, 'id' | 'updated_at' | 'phone' | 'address' | 'city' | 'state' | 'zip_code'> & { password: string; email: string }) => Promise<{ user: SupabaseUser | null; session: Session | null }>;
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

  const getProfile = useCallback(async (userId: string) => {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Profile fetch error:', profileError.message);
      setUser(null);
      setStatus('unauthenticated');
      return;
    }

    setUser(profile as Profile);
    setStatus('authenticated');
  }, []);

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        console.log("🔍 Checking for existing session...");
        
        // Check if Supabase is properly configured
        if (!supabase || !supabase.auth) {
          console.log("⚠️ Supabase not configured, skipping authentication");
          setStatus('unauthenticated');
          setInitialized(true);
          return;
        }
        
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("❌ Session error:", sessionError);
          setStatus('unauthenticated');
          return;
        }

        console.log("📋 Session check result:", initialSession ? "Session found" : "No session");

        if (initialSession?.user) {
          console.log("👤 User found, fetching profile...");
          await getProfile(initialSession.user.id);
        } else {
          console.log("🚪 No user, setting unauthenticated");
          setStatus('unauthenticated');
        }
      } catch (err) {
        console.error("❌ Error during initial session fetch:", err);
        setError("Failed to connect to the server.");
        setStatus('unauthenticated');
      }
    };

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log("⏰ Authentication timeout, setting unauthenticated");
      setStatus('unauthenticated');
      setInitialized(true);
    }, 10000); // 10 second timeout

    getInitialSession().finally(() => {
      clearTimeout(timeoutId);
      setInitialized(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        if (event === 'SIGNED_IN' && newSession?.user) {
          setStatus('loading'); // Set to loading while we fetch the profile
          await getProfile(newSession.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setStatus('unauthenticated');
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [getProfile]);

  const signIn = async (email: string, password: string) => {
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(transformErrorMessage(signInError, 'signin'));
      throw signInError;
    }
    return data;
  };

  const signUp = async (userData: Omit<Profile, 'id' | 'updated_at'> & { password: string; email: string }) => {
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
      setError(transformErrorMessage(signUpError, 'signup'));
      throw signUpError;
    }
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(transformErrorMessage(error, 'signout'));
    }
  };

  const updateUser = async (userData: Partial<Profile>) => {
    if (!user) throw new Error("No user is signed in to update.");

    const oldUser = user;
    setUser(prevUser => prevUser ? { ...prevUser, ...userData } : null);

    const { data, error: updateError } = await supabase
      .from('profiles')
      .update(userData)
      .eq('id', user.id)
      .select()
      .single();

    if (updateError) {
      setError(transformErrorMessage(updateError, 'profile'));
      setUser(oldUser);
      throw updateError;
    }

    if (data) {
      setUser(data as Profile);
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

  return (
    <AuthContext.Provider value={value}>
      {status === 'loading' && !initialized ? (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Initializing Authentication</h2>
            <p className="text-gray-600">Setting up your crystal journey...</p>
            
            <div className="mt-6 space-y-2">
              <button 
                onClick={() => {
                  console.log("🚀 Bypassing authentication for testing");
                  setStatus('unauthenticated');
                }} 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
              >
                Skip Authentication (Testing)
              </button>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                  <button 
                    onClick={() => setStatus('unauthenticated')} 
                    className="mt-2 text-red-600 underline text-sm hover:text-red-800"
                  >
                    Continue without authentication
                  </button>
                </div>
              )}
            </div>
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