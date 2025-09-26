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
    <section className={`py-24 relative overflow-hidden ${isPrimary ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-[#d1bccd]'}`}>
      {/* Background Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isPrimary ? 'bg-purple-500' : 'bg-[#b094b2]'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          isPrimary ? 'bg-pink-500' : 'bg-[#d1bccd]'
        }`} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-cormorant-light mb-8 ${
            isPrimary ? 'text-white' : 'bg-gradient-to-r from-[#8a6b8d] via-[#a085a3] to-[#8a6b8d] bg-clip-text text-transparent'
          }`}>
            {title}
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full mb-8 ${
            isPrimary ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-[#b094b2] to-[#d1bccd]'
          }`}></div>
          <p className={`text-xl mb-12 leading-relaxed font-madefor-medium ${
            isPrimary ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              className={`px-12 py-6 text-xl rounded-full font-arial tracking-wide transition-all duration-500 hover:scale-105 transform ${
                isPrimary 
                  ? 'bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-gray-200 shadow-2xl' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl'
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
                className="px-12 py-6 text-xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full font-arial tracking-wide backdrop-blur-sm"
                onClick={() => window.location.href = '/our-story'}
              >
                Learn More
              </Button>
            )}
          </div>
          
          {isPrimary && (
            <div className="mt-12 flex items-center justify-center space-x-3 text-gray-300">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-madefor-medium">Trusted by 10,000+ crystal lovers worldwide</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
