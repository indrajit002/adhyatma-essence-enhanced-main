import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight
} from 'lucide-react';
import Header from '@/components/Header';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import profileImage from '@/assets/profile/profile_1.png';

const OurStory = () => {
  const heroRef = useScrollAnimation({ threshold: 0.1 });
  const profileRef = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#b094b2]/20 via-transparent to-[#d1bccd]/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center scroll-animate" ref={heroRef}>
            <div className="mb-8">
              <Badge className="bg-gradient-to-r from-[#b094b2] to-[#d1bccd] text-white px-6 py-2 text-lg mb-6 inline-block">
                Our Story
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cormorant-light mb-6 md:mb-8 bg-gradient-to-r from-gray-900 via-[#8a6b8d] to-gray-900 bg-clip-text text-transparent leading-tight">
              The Journey of Adhyatma
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 md:mb-12 max-w-4xl mx-auto px-4 font-lato-light">
              Born from a deep reverence for the earth's gifts and a commitment to ethical practices, 
              Adhyatma has grown into a trusted source for healing crystals worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button 
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-[#b094b2] to-[#d1bccd] hover:from-[#b094b2]/80 hover:to-[#d1bccd]/80 text-white rounded-full font-arial tracking-wide transition-all duration-300 hover:shadow-xl hover:scale-105 transform w-full sm:w-auto"
                onClick={() => {
                  const shopSection = document.getElementById('shop');
                  if (shopSection) {
                    shopSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Explore Our Crystals
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2 border-[#b094b2] text-[#b094b2] hover:bg-[#b094b2] hover:text-white rounded-full font-arial tracking-wide transition-all duration-300 w-full sm:w-auto"
              >
                Watch Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Profile Section */}
      <section className="py-16 bg-gradient-to-br from-white to-[#f8f5f9]" ref={profileRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Round Image on Left */}
              <div className="w-full lg:w-2/5 flex justify-center">
                <div className="relative top-[-150px] max-sm:top-0">
                  <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img 
                      src={profileImage}
                      alt="Dipshikkha Baruahh - Founder & Spiritual Guide"
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#b094b2] to-[#d1bccd] text-white px-6 py-2 rounded-full shadow-lg">
                    <span className="font-arial font-medium">Founder</span>
                  </div>
                </div>
              </div>
              
              {/* Information on Right */}
              <div className="w-full lg:w-3/5 text-center lg:text-left">
                <Badge className="bg-gradient-to-r from-[#b094b2] to-[#d1bccd] text-white px-4 py-1 text-sm mb-4 inline-block">
                  Meet Our Founder
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cormorant-light text-gray-900 mb-6">
                  Dipshikkha Baruahh
                </h2>
                <h3 className="text-xl sm:text-2xl text-[#8a6b8d] font-lato-light mb-6 italic">
                  Spiritual Guide • Numerologist • Tarot Reader • Energy Healer
                </h3>
                
                <div className="space-y-6 text-gray-700 font-lato-light leading-relaxed">
                  <p className="text-lg sm:text-xl">
                    I'm <span className="font-semibold text-[#8a6b8d]">Dipshikkha Baruahh</span>, a dedicated spiritual practitioner 
                    with a profound passion for helping individuals discover their true path and achieve inner harmony.
                  </p>
                  
                  <p className="text-lg sm:text-xl">
                    With extensive training and intuitive gifts in <span className="font-semibold">numerology</span>, I guide people 
                    to understand their life's purpose, personal cycles, and hidden potentials through the sacred science of numbers. 
                    Each number carries unique vibrations that can reveal profound insights about your journey.
                  </p>
                  
                  <p className="text-lg sm:text-xl">
                    As a <span className="font-semibold">tarot reader</span>, I use the ancient wisdom of the cards to provide clarity 
                    and guidance during times of uncertainty. The tarot serves as a mirror to the soul, helping you see situations 
                    from new perspectives and make empowered decisions.
                  </p>
                  
                  <p className="text-lg sm:text-xl">
                    My work as an <span className="font-semibold">energy healer</span> focuses on restoring balance to your mind, 
                    body, and spirit. Through various energy work techniques, I help release blockages, heal emotional wounds, 
                    and align your energy with your highest good.
                  </p>
                  
                  <p className="text-lg sm:text-xl font-medium text-[#8a6b8d]">
                    My mission is to empower you with the tools and insights needed for spiritual growth, 
                    helping you find clarity, balance, and transformation on your unique life journey.
                  </p>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="px-8 py-3 bg-gradient-to-r from-[#b094b2] to-[#d1bccd] hover:from-[#b094b2]/80 hover:to-[#d1bccd]/80 text-white rounded-full font-arial transition-all duration-300"
                  >
                    Book a Session
                  </Button>
                  <Button 
                    variant="outline"
                    className="px-8 py-3 border-2 border-[#b094b2] text-[#b094b2] hover:bg-[#b094b2] hover:text-white rounded-full font-arial transition-all duration-300"
                  >
                    Learn About My Services
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OurStory;