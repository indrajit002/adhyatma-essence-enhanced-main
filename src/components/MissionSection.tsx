import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MissionSection = () => {
  const missionRef = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="mission" className="py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50" aria-labelledby="mission-heading">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-16 scroll-animate" ref={missionRef}>
            <h2 id="mission-heading" className="text-5xl md:text-6xl font-lobster font-normal mb-6 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="relative scroll-animate" ref={missionRef}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 md:p-20 shadow-2xl border border-white/20">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20"></div>
                
                <p className="text-xl md:text-2xl leading-relaxed text-gray-700 mb-10 font-lobster">
                  At <span className="font-semibold text-purple-600">Adhyatma</span>, we are devoted to offering ethically sourced, energetically charged crystals 
                  that serve as tools for healing, mindfulness, and spiritual growth. Through education, 
                  intention, and authentic connection, we empower individuals to align with their highest 
                  selves and walk the path of inner peace and purpose.
                </p>
                
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full font-lobster tracking-wide text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
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