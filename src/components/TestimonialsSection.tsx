import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Bhushan',
      location: 'Meerut, Uttar Pradesh',
      rating: 5,
      text: 'The amethyst cluster I purchased has completely transformed my meditation practice. The energy is so pure and calming. Adhyatma\'s crystals are truly special.',
      image: 'https://img.freepik.com/premium-photo/indian-girl-cheerful-studio-portrait_53876-55599.jpg'
    },
    {
      id: 2,
      name: 'Ananya Sharma',
      location: 'Ahmedabad, Gujarat',
      rating: 5,
      text: 'I\'ve been collecting crystals for years, and Adhyatma has the highest quality stones I\'ve found. Their customer service is exceptional too.',
      image: 'https://preview.redd.it/something-i-have-noticed-about-indian-women-is-that-a-lot-v0-4y07qs8caowd1.jpg?width=640&crop=smart&auto=webp&s=eb1dcafab5a04aafeb8ce3a8b7c75287b29e2e00'
    },
    {
      id: 3,
      name: 'Ritika Singh',
      location: 'Ludhiana, Punjab',
      rating: 5,
      text: 'The crystal water bottle set is amazing! I can feel the difference in my water\'s energy. My whole family loves it. Highly recommended!',
      image: 'https://preview.redd.it/something-i-have-noticed-about-indian-women-is-that-a-lot-v0-a2e1c13caowd1.jpg?width=640&crop=smart&auto=webp&s=31e68b49d79c838ffad91555990c0ccb38ded4eb'
    },
    {
      id: 4,
      name: 'Saanvi Choudhary',
      location: 'Gurugram, Haryana',
      rating: 5,
      text: 'The chakra healing kit has been a game-changer for my spiritual journey. Each crystal is perfectly selected and the energy is incredible.',
      image: 'https://qph.cf2.quoracdn.net/main-qimg-f4b67fa2a8154aff42b633195b028e1a-lq'
    },
    {
      id: 5,
      name: 'Aarohi Deshmukh',
      location: 'Pune, Maharashtra',
      rating: 5,
      text: 'I love how ethically sourced these crystals are. It makes me feel good knowing I\'m supporting responsible mining practices.',
      image: 'https://i.pinimg.com/736x/09/ee/97/09ee9790e4a873be73302693a56a9bf6.jpg'
    },
    {
      id: 6,
      name: 'Tanya Dubey',
      location: 'Bhopal, Madhya Pradesh',
      rating: 5,
      text: 'The packaging was beautiful and the crystals arrived perfectly protected. The care they put into every detail shows their dedication to quality.',
      image: 'https://i.pinimg.com/736x/0b/c7/e5/0bc7e5e8fa72ee88268fe4f049a0dedc.jpg'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-[#d1bccd]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cormorant-light mb-6 md:mb-8 bg-gradient-to-r from-[#8a6b8d] via-[#a085a3] to-[#8a6b8d] bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#b094b2] to-[#d1bccd] mx-auto rounded-full mb-6 md:mb-8"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 font-madefor-medium px-4">
            Join thousands of satisfied customers who have transformed their lives with our crystals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 group">
              <Quote className="w-10 h-10 text-[#d1bccd] absolute top-6 right-6 group-hover:text-[#b094b2] transition-colors duration-300" />
              
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 md:mb-8 leading-relaxed text-sm sm:text-base md:text-lg font-lato-light">
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
                  <h4 className="font-cormorant-light text-gray-800 text-base md:text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 font-madefor-medium text-sm md:text-base">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 text-gray-600">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-cormorant-light text-gray-800">10,000+</div>
              <div className="text-xs md:text-sm font-madefor-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-cormorant-light text-gray-800">4.9/5</div>
              <div className="text-xs md:text-sm font-madefor-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-cormorant-light text-gray-800">50+</div>
              <div className="text-xs md:text-sm font-madefor-medium">Countries Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
