import { useAuth } from '@/hooks/useAuth';

const AuthDebug = () => {
  const { user, session, status, isAuthenticated, isLoading, error } = useAuth();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <div>Status: <span className="text-yellow-400">{status}</span></div>
        <div>Authenticated: <span className={isAuthenticated ? 'text-green-400' : 'text-red-400'}>{isAuthenticated ? 'Yes' : 'No'}</span></div>
        <div>Loading: <span className={isLoading ? 'text-yellow-400' : 'text-gray-400'}>{isLoading ? 'Yes' : 'No'}</span></div>
        <div>User: <span className="text-blue-400">{user ? `${user.first_name} ${user.last_name}` : 'None'}</span></div>
        <div>Session: <span className="text-blue-400">{session ? 'Active' : 'None'}</span></div>
        {error && <div>Error: <span className="text-red-400">{error}</span></div>}
      </div>
    </div>
  );
};

export default AuthDebug;
