import { useState, useEffect } from 'react';
// 1. Import useLocation from react-router-dom
import { Link, useLocation } from 'react-router-dom';
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
  // 2. Get the current location using the hook
  const location = useLocation();

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
        <nav className="flex items-center justify-between py-6">
          <Link to="/" className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <img 
                src={logoImage} 
                alt="Adhyatma Logo" 
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 object-contain" 
              />
              <div className="absolute inset-0 bg-gradient-lilac rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-2xl font-lobster font-normal text-[#6b4c6f]">
              Adhyatma
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="relative text-[#b094b2] hover:text-[#d1bccd] transition-all duration-300 font-lobster text-sm tracking-wide group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-rose group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-[#b094b2] hover:text-[#d1bccd] hover:bg-[#d1bccd]/20 transition-all duration-300 font-lobster"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user.first_name}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut}
                  className="text-[#b094b2] hover:text-red-500 hover:bg-red-50 transition-all duration-300 font-lobster"
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
                    className="text-[#b094b2] hover:text-[#d1bccd] hover:bg-[#d1bccd]/20 transition-all duration-300 font-medium"
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
                className="text-[#b094b2] hover:text-[#d1bccd] hover:bg-[#d1bccd]/20 relative transition-all duration-300 group"
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
              className="text-[#b094b2] hover:text-[#d1bccd] hover:bg-[#d1bccd]/20 relative transition-all duration-300 group"
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
            className="md:hidden text-[#b094b2]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </nav>

        {isMobileMenuOpen && (
           <div className="md:hidden py-4 border-t border-[#d1bccd]">
            {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block py-3 text-[#b094b2] hover:text-[#d1bccd] transition-colors duration-200 font-lobster"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
            ))}
            <div className="flex gap-4 mt-4">
              {user ? (
                <div className="flex gap-4 w-full">
                  <Link to="/profile" className="flex-1">
                     <Button variant="ghost" size="sm" className="text-[#b094b2] w-full">
                      <User className="w-4 h-4 mr-2" />
                      {user.first_name}
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={signOut}
                     className="text-[#b094b2] hover:text-red-500 hover:bg-red-50 flex-1"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                // Also add the 'state' prop to the mobile Login link
                <Link to="/signin" state={{ from: location }} className="flex-1">
                     <Button variant="ghost" size="sm" className="text-[#b094b2] w-full">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                </Link>
              )}
              <Link to="/wishlist">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-700 relative"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gray-800 text-xs text-white rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-700 relative"
                onClick={toggleCart}
              >
                <ShoppingCart className="w-5 h-5" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gray-800 text-xs text-white rounded-full flex items-center justify-center">
                    {state.totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;