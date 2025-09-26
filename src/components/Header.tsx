import { useState, useEffect } from 'react';
// 1. Import useLocation from react-router-dom
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X, LogOut, Heart } from 'lucide-react';
import logoImage from '@/assets/logo.png';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state, toggleCart } = useCart();
  const { user, signOut } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  // 2. Get the current location using the hook
  const location = useLocation();

  const handleSignOut = async () => {
    console.log('🚪 Header: handleSignOut called');
    console.log('🚪 Header: signOut function:', typeof signOut);
    
    try {
      console.log('🚪 Header: Starting signout process...');
      const result = await signOut();
      console.log('✅ Header: Signout result:', result);
      console.log('✅ Header: Signout successful, navigating to home...');
      // Navigate to home page after signout
      navigate('/', { replace: true });
    } catch (error) {
      console.error('❌ Header: Error signing out:', error);
      console.error('❌ Header: Error details:', error);
      // Even if signout fails, try to navigate to home
      try {
        navigate('/', { replace: true });
      } catch (navError) {
        console.error('❌ Navigation also failed:', navError);
        window.location.href = '/';
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/', isExternal: false },
    { label: 'Our Story', href: '/our-story', isExternal: false },
    { label: 'Shop', href: '/shop', isExternal: false },
    { label: 'Collections', href: '/collections', isExternal: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-soft border-b border-[#d1bccd]'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-center py-4 md:py-6 relative">
          <Link to="/" className="absolute left-0 flex items-center gap-2 md:gap-4 group cursor-pointer">
            <div className="relative">
              <img 
                src={logoImage} 
                alt="Adhyatma Logo" 
                className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-300 object-contain" 
              />
              <div className="absolute inset-0 bg-gradient-lilac rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-lg md:text-2xl font-cormorant-light text-mystic font-bold">
              Adhyatma
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="relative text-mystic hover:text-muted-foreground transition-all duration-300 font-madefor-medium text-lg tracking-wide group font-bold"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-rose group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="absolute right-0 hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-mystic hover:text-muted-foreground hover:bg-lilac/20 transition-all duration-300 font-madefor-medium font-bold"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user.first_name}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    console.log('🚪 Button clicked!', e);
                    handleSignOut();
                  }}
                  className="text-mystic hover:text-red-600 hover:bg-red-50 transition-all duration-300 font-madefor-medium font-bold"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              // 3. Add the 'state' prop to the Login link to pass the current location
              <Link to="/signin" state={{ from: location }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                    className="text-mystic hover:text-muted-foreground hover:bg-lilac/20 transition-all duration-300 font-medium font-bold"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            <Link to="/wishlist">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-mystic hover:text-muted-foreground hover:bg-lilac/20 relative transition-all duration-300 group"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-rose text-xs text-white rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-mystic hover:text-muted-foreground hover:bg-lilac/20 relative transition-all duration-300 group"
              onClick={toggleCart}
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              {state.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-rose text-xs text-white rounded-full flex items-center justify-center animate-pulse">
                  {state.totalItems}
                </span>
              )}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 md:hidden text-mystic"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </nav>

        {isMobileMenuOpen && (
           <div className="md:hidden py-4 border-t border-[#d1bccd] bg-white/95 backdrop-blur-xl">
            <div className="space-y-2 mb-6">
              {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block py-3 px-4 text-mystic hover:text-muted-foreground hover:bg-lilac/10 transition-colors duration-200 font-madefor-medium font-bold rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 px-4">
              {user ? (
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Link to="/profile" className="flex-1">
                     <Button variant="ghost" size="sm" className="text-mystic w-full font-bold justify-start">
                      <User className="w-4 h-4 mr-2" />
                      {user.first_name}
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      console.log('🚪 Mobile Button clicked!', e);
                      handleSignOut();
                    }}
                     className="text-mystic hover:text-red-600 hover:bg-red-50 flex-1 font-bold justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                // Also add the 'state' prop to the mobile Login link
                <Link to="/signin" state={{ from: location }} className="flex-1">
                     <Button variant="ghost" size="sm" className="text-mystic w-full font-bold justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                </Link>
              )}
              <div className="flex gap-2">
                <Link to="/wishlist">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-mystic hover:text-muted-foreground hover:bg-lilac/10 relative"
                  >
                    <Heart className="w-5 h-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-rose text-xs text-white rounded-full flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-mystic hover:text-muted-foreground hover:bg-lilac/10 relative"
                  onClick={toggleCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {state.totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-rose text-xs text-white rounded-full flex items-center justify-center">
                      {state.totalItems}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;