import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import CrystalLogo from './CrystalLogo';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state, toggleCart } = useCart();
  const { user, signOut } = useAuth();

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
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <CrystalLogo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-2xl font-playfair font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent">
              Adhyatma
            </span>
          </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                link.isExternal ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium text-sm tracking-wide group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300" />
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="relative text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium text-sm tracking-wide group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              ))}
            </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 font-medium"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user.firstName}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut}
                  className="text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/signin">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 font-medium"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 relative transition-all duration-300 group"
              onClick={toggleCart}
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              {state.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 text-xs text-white rounded-full flex items-center justify-center animate-pulse">
                  {state.totalItems}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </nav>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              {navLinks.map((link) => (
                link.isExternal ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block py-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block py-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            <div className="flex gap-4 mt-4">
              {user ? (
                <div className="flex gap-4 w-full">
                  <Link to="/profile" className="flex-1">
                    <Button variant="ghost" size="sm" className="text-gray-700 w-full">
                      <User className="w-4 h-4 mr-2" />
                      {user.firstName}
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={signOut}
                    className="text-gray-700 hover:text-red-600 hover:bg-red-50 flex-1"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/signin" className="flex-1">
                  <Button variant="ghost" size="sm" className="text-gray-700 w-full">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
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