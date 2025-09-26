import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CallToActionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink?: string;
  variant?: 'primary' | 'secondary';
  showIcon?: boolean;
}

const CallToAction = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink = '#shop',
  variant = 'primary',
  showIcon = true
}: CallToActionProps) => {
  const isPrimary = variant === 'primary';
  
  return (
    <section className={`py-16 sm:py-20 md:py-24 relative overflow-hidden ${isPrimary ? 'bg-gradient-to-br from-gray-800 via-mystic to-gray-800' : 'bg-gradient-ethereal'}`}>
      {/* Background Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-3xl opacity-15 ${
          isPrimary ? 'bg-lilac' : 'bg-mystic'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full blur-3xl opacity-15 ${
          isPrimary ? 'bg-rose' : 'bg-lilac'
        }`} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cormorant-light mb-4 sm:mb-6 md:mb-8 leading-tight ${
            isPrimary ? 'text-white' : 'bg-gradient-mystic bg-clip-text text-transparent'
          }`}>
            {title}
          </h2>
          <div className={`w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full mb-6 sm:mb-8 ${
            isPrimary ? 'bg-gradient-lilac' : 'bg-gradient-mystic'
          }`}></div>
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-12 leading-relaxed font-madefor-medium px-2 sm:px-4 ${
            isPrimary ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Button 
              className={`w-full sm:w-auto px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg lg:text-xl rounded-full font-arial tracking-wide transition-all duration-500 hover:scale-105 transform shadow-lg hover:shadow-xl ${
                isPrimary 
                  ? 'bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-gray-200' 
                  : 'bg-gradient-mystic hover:bg-gradient-lilac text-white'
              }`}
              onClick={() => {
                const targetElement = document.querySelector(buttonLink);
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {buttonText}
              {showIcon && <ArrowRight className="w-6 h-6 ml-3" />}
            </Button>
            
            {isPrimary && (
              <Button 
                variant="outline" 
                className="w-full sm:w-auto px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg lg:text-xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full font-arial tracking-wide backdrop-blur-sm shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/our-story'}
              >
                Learn More
              </Button>
            )}
          </div>
          
          {isPrimary && (
            <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-gray-300 px-4">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-lilac" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-madefor-medium text-center sm:text-left">Trusted by 10,000+ crystal lovers worldwide</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
