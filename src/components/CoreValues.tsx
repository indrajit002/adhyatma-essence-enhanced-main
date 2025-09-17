import { Heart, Sparkles, Zap, Leaf, Network } from 'lucide-react';

const CoreValues = () => {
  const values = [
    {
      icon: Heart,
      title: 'Intentional Living',
      description: 'Living with purpose and mindfulness',
    },
    {
      icon: Sparkles,
      title: 'Spiritual Integrity',
      description: 'Authentic connection to higher consciousness',
    },
    {
      icon: Zap,
      title: 'Empowerment',
      description: 'Awakening your inner strength',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Honoring Earth and ethical sourcing',
    },
    {
      icon: Network,
      title: 'Connection',
      description: 'Building a conscious community',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-lobster font-normal mb-8 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 bg-clip-text text-transparent">
            Core Values
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-lobster">
            Adhyatma is a crystal store born from a deep reverence for energy, intention, 
            and the quiet power of nature. We offer thoughtfully chosen stones that inspire 
            clarity, balance, and inner transformation. Guided by a mindful approach, Adhyatma 
            blends ancient wisdom with modern rituals — creating a space where every crystal 
            becomes a tool for connection, healing, and soulful living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="text-center group bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-purple-200"
            >
              <div className="relative mb-8 mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <value.icon className="w-10 h-10 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
                </div>
              </div>
              
              <h3 className="text-xl font-lobster mb-4 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;