import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth-context';

/**
 * Custom hook to access the authentication context.
 * Provides user data, session, auth status, and auth functions.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};