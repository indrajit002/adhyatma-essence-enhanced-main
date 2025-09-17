import { Button } from '@/components/ui/button';
import { Heart, Leaf, Users, Award } from 'lucide-react';

const AboutPreview = () => {
  const stats = [
    {
      icon: Heart,
      number: '15+',
      label: 'Years of Experience',
      description: 'Dedicated to crystal healing and spiritual wellness'
    },
    {
      icon: Leaf,
      number: '100%',
      label: 'Ethically Sourced',
      description: 'All crystals sourced from responsible suppliers'
    },
    {
      icon: Users,
      number: '50K+',
      label: 'Happy Customers',
      description: 'Trusted by crystal lovers worldwide'
    },
    {
      icon: Award,
      number: '500+',
      label: 'Crystal Varieties',
      description: 'Extensive collection of healing stones'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-lobster font-normal mb-6 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 bg-clip-text text-transparent">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed font-lobster">
              Founded in 2009, Adhyatma began as a small family business with a simple mission: 
              to bring the healing power of crystals to people's lives. What started as a passion 
              for spiritual wellness has grown into a trusted source for ethically sourced, 
              high-quality crystals.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We believe that every crystal has a story and the power to transform lives. 
              That's why we carefully select each stone, ensuring it meets our high standards 
              for quality, authenticity, and ethical sourcing.
            </p>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-3 rounded-none font-lobster tracking-wide"
            >
              Learn More About Us
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-gray-600" />
                </div>
                <div className="text-3xl font-lobster text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-lobster text-gray-800 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
