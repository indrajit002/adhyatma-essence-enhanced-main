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
    <section className={`py-24 relative overflow-hidden ${isPrimary ? 'bg-gradient-to-br from-gray-800 via-[#a085a3] to-gray-800' : 'bg-gradient-to-br from-gray-50 via-white to-[#d1bccd]'}`}>
      {/* Background Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 ${
          isPrimary ? 'bg-[#c4a8c6]' : 'bg-[#b094b2]'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 ${
          isPrimary ? 'bg-[#e0d0e2]' : 'bg-[#d1bccd]'
        }`} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cormorant-light mb-6 md:mb-8 ${
            isPrimary ? 'text-white' : 'bg-gradient-to-r from-[#8a6b8d] via-[#a085a3] to-[#8a6b8d] bg-clip-text text-transparent'
          }`}>
            {title}
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full mb-8 ${
            isPrimary ? 'bg-gradient-to-r from-[#c4a8c6] to-[#e0d0e2]' : 'bg-gradient-to-r from-[#b094b2] to-[#d1bccd]'
          }`}></div>
          <p className={`text-base sm:text-lg md:text-xl mb-8 md:mb-12 leading-relaxed font-madefor-medium px-4 ${
            isPrimary ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              className={`px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl rounded-full font-arial tracking-wide transition-all duration-500 hover:scale-105 transform ${
                isPrimary 
                  ? 'bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-gray-200 shadow-2xl' 
                  : 'bg-gradient-to-r from-[#c4a8c6] to-[#e0d0e2] hover:from-[#b094b2] hover:to-[#d1bccd] text-white shadow-2xl'
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
                className="px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full font-arial tracking-wide backdrop-blur-sm"
                onClick={() => window.location.href = '/our-story'}
              >
                Learn More
              </Button>
            )}
          </div>
          
          {isPrimary && (
            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-gray-300">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#c4a8c6]" />
              <span className="text-sm sm:text-base md:text-lg font-madefor-medium text-center sm:text-left">Trusted by 10,000+ crystal lovers worldwide</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
