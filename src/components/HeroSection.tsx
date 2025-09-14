import { Button } from '@/components/ui/button';
import CrystalLogo from './CrystalLogo';
import AnimatedCrystalLogo from './AnimatedCrystalLogo';
import { useLenis } from '@/hooks/useLenis';

const HeroSection = () => {
  const { scrollTo } = useLenis();

  const handleScrollToShop = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      scrollTo(shopSection, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        offset: -80, // Account for fixed header
      });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="Hero section with main call to action"
    >
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/20 via-transparent to-transparent" />
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 z-10" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-200/40 to-rose-200/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-200/40 to-purple-200/40 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 left-1/2 w-32 h-32 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-xl animate-float" style={{ animationDelay: '6s' }} />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center max-w-5xl">
        {/* Animated Crystal SVG at the top */}
        <div className="mb-16">
          <div className="relative inline-block">
            <AnimatedCrystalLogo />
          </div>
        </div>
        
        {/* Text content centered below the SVG */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-playfair font-bold bg-gradient-to-r from-gray-800 via-purple-800 to-gray-800 bg-clip-text text-transparent leading-tight">
              ADHYATMA
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 font-light tracking-wide">
              Sacred Stones for Modern Soul
            </p>
            
            <h2 className="text-xl md:text-2xl text-gray-600 font-normal tracking-wider">
              Crystal Store
            </h2>
          </div>
          
          <div className="mt-16 space-y-6">
            <Button 
              className="px-12 py-6 text-xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-full font-medium tracking-wide transition-all duration-500 hover:shadow-2xl hover:scale-105 transform"
              onClick={handleScrollToShop}
              aria-label="Shop our collection of healing crystals"
            >
              SHOP NOW
            </Button>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Ethically Sourced</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span>Expert Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <button 
          onClick={handleScrollToShop}
          className="flex flex-col items-center space-y-2 text-gray-400 animate-bounce hover:text-gray-600 transition-colors duration-300 cursor-pointer group"
        >
          <span className="text-sm font-medium group-hover:text-gray-600">Explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2 group-hover:border-gray-400 transition-colors duration-300">
            <div className="w-1 h-3 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors duration-300" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;