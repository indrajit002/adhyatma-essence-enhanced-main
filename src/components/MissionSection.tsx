import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MissionSection = () => {
  const missionRef = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="mission" className="py-24 bg-gradient-ethereal" aria-labelledby="mission-heading">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-16 scroll-animate" ref={missionRef}>
            <h2 id="mission-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cormorant-light mb-4 md:mb-6 bg-gradient-mystic bg-clip-text text-transparent">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-mystic mx-auto rounded-full"></div>
          </div>
          
          <div className="relative scroll-animate" ref={missionRef}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 lg:p-20 shadow-2xl border border-white/20">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-mystic rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-lilac rounded-full opacity-20"></div>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700 mb-6 md:mb-10 font-madefor-medium px-2">
                  At <span className="font-semibold text-mystic">Adhyatma</span>, we are devoted to offering ethically sourced, energetically charged crystals 
                  that serve as tools for healing, mindfulness, and spiritual growth. Through education, 
                  intention, and authentic connection, we empower individuals to align with their highest 
                  selves and walk the path of inner peace and purpose.
                </p>
                
                <Button 
                  className="bg-gradient-mystic hover:bg-gradient-lilac text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-arial tracking-wide text-sm sm:text-base md:text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
                  onClick={() => window.location.href = '/our-story'}
                >
                  Discover Our Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;