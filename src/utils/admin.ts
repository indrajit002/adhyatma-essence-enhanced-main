import { useAuth } from '@/hooks/useAuth';

/**
 * Hook to check if the current user is an admin
 */
export const useIsAdmin = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  return isAuthenticated && isAdmin;
};

/**
 * Utility function to check if a user profile has admin privileges
 */
export const isUserAdmin = (user: { is_admin?: boolean } | null): boolean => {
  return user?.is_admin === true;
};

/**
 * Admin email - the only admin user
 * You can change this to your admin email
 */
export const ADMIN_EMAIL = 'admin@adhyatmaessence.com';

/**
 * Check if an email is the admin email
 */
export const isAdminEmail = (email: string): boolean => {
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
};
