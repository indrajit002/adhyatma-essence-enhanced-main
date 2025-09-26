import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'California, USA',
      rating: 5,
      text: 'The amethyst cluster I purchased has completely transformed my meditation practice. The energy is so pure and calming. Adhyatma\'s crystals are truly special.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'New York, USA',
      rating: 5,
      text: 'I\'ve been collecting crystals for years, and Adhyatma has the highest quality stones I\'ve found. Their customer service is exceptional too.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'Texas, USA',
      rating: 5,
      text: 'The crystal water bottle set is amazing! I can feel the difference in my water\'s energy. My whole family loves it. Highly recommended!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'David Thompson',
      location: 'Florida, USA',
      rating: 5,
      text: 'The chakra healing kit has been a game-changer for my spiritual journey. Each crystal is perfectly selected and the energy is incredible.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      location: 'Washington, USA',
      rating: 5,
      text: 'I love how ethically sourced these crystals are. It makes me feel good knowing I\'m supporting responsible mining practices.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'James Wilson',
      location: 'Oregon, USA',
      rating: 5,
      text: 'The packaging was beautiful and the crystals arrived perfectly protected. The care they put into every detail shows their dedication to quality.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-[#d1bccd]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-cormorant-light mb-8 bg-gradient-to-r from-[#8a6b8d] via-[#a085a3] to-[#8a6b8d] bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#b094b2] to-[#d1bccd] mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 font-madefor-medium">
            Join thousands of satisfied customers who have transformed their lives with our crystals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 group">
              <Quote className="w-10 h-10 text-[#d1bccd] absolute top-6 right-6 group-hover:text-[#b094b2] transition-colors duration-300" />
              
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-8 leading-relaxed text-lg font-lato-light">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-[#d1bccd]"
                  />
                  <div className="absolute inset-0 w-14 h-14 rounded-full bg-gradient-to-r from-[#b094b2]/30 to-[#d1bccd]/30 blur-sm"></div>
                </div>
                <div>
                  <h4 className="font-cormorant-light text-gray-800 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 font-madefor-medium">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-8 text-gray-600">
            <div className="text-center">
              <div className="text-3xl font-cormorant-light text-gray-800">10,000+</div>
              <div className="text-sm font-madefor-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-cormorant-light text-gray-800">4.9/5</div>
              <div className="text-sm font-madefor-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-cormorant-light text-gray-800">50+</div>
              <div className="text-sm font-madefor-medium">Countries Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
