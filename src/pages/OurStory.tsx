import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Users, 
  Globe, 
  Award, 
  Leaf, 
  Sparkles,
  ArrowRight,
  Quote,
  Star
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import healingCrystalsImg from '@/assets/healing-crystals.jpg';
import naturalCrystalsImg from '@/assets/natural-crystals.jpg';
import crystalKitsImg from '@/assets/crystal-kits.jpg';
import crystalBraceletsImg from '@/assets/crystal-bracelets.jpg';
import crystalTreesImg from '@/assets/crystal-trees.jpg';
import crystalBottlesImg from '@/assets/crystal-bottles.jpg';

const OurStory = () => {
  const heroRef = useScrollAnimation({ threshold: 0.1 });
  const missionRef = useScrollAnimation({ threshold: 0.2 });
  const valuesRef = useScrollAnimation({ threshold: 0.2 });
  const timelineRef = useScrollAnimation({ threshold: 0.2 });
  const teamRef = useScrollAnimation({ threshold: 0.2 });
  const testimonialsRef = useScrollAnimation({ threshold: 0.2 });
  const ctaRef = useScrollAnimation({ threshold: 0.2 });

  const values = [
    {
      icon: Heart,
      title: 'Ethical Sourcing',
      description: 'We work directly with miners and suppliers who share our commitment to fair labor practices and environmental responsibility.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Leaf,
      title: 'Environmental Care',
      description: 'Every crystal is sourced with respect for the earth, ensuring minimal environmental impact and sustainable practices.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'We support local communities where our crystals are sourced, contributing to education and economic development.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Each crystal undergoes careful inspection and energetic cleansing before reaching our customers.',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'The Beginning',
      description: 'Founded with a vision to make healing crystals accessible while maintaining the highest ethical standards.',
      image: healingCrystalsImg
    },
    {
      year: '2019',
      title: 'First Partnership',
      description: 'Established our first direct partnership with ethical crystal miners in Brazil and Madagascar.',
      image: naturalCrystalsImg
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched our online platform, making healing crystals accessible to customers worldwide.',
      image: crystalKitsImg
    },
    {
      year: '2021',
      title: 'Community Growth',
      description: 'Reached 10,000 customers and launched our educational crystal care program.',
      image: crystalBraceletsImg
    },
    {
      year: '2022',
      title: 'Sustainability Initiative',
      description: 'Introduced our carbon-neutral shipping program and sustainable packaging solutions.',
      image: crystalTreesImg
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded to serve customers in 25 countries with localized crystal collections.',
      image: crystalBottlesImg
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      image: healingCrystalsImg,
      bio: 'A certified crystal therapist with 15 years of experience in energy healing and crystal therapy.',
      specialties: ['Crystal Therapy', 'Energy Healing', 'Ethical Sourcing']
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Sourcing',
      image: naturalCrystalsImg,
      bio: 'Geologist and ethical sourcing expert who ensures every crystal meets our high standards.',
      specialties: ['Geology', 'Ethical Sourcing', 'Quality Control']
    },
    {
      name: 'Priya Sharma',
      role: 'Customer Experience Director',
      image: crystalKitsImg,
      bio: 'Dedicated to creating meaningful connections between customers and their healing journey.',
      specialties: ['Customer Care', 'Crystal Education', 'Community Building']
    }
  ];

  const testimonials = [
    {
      text: "Adhyatma has transformed my spiritual practice. The quality and energy of their crystals is unmatched.",
      author: "Emma Thompson",
      location: "Melbourne, Australia",
      rating: 5
    },
    {
      text: "I love knowing that my crystals are ethically sourced. It makes my practice feel more authentic.",
      author: "David Kim",
      location: "Seoul, South Korea",
      rating: 5
    },
    {
      text: "The educational resources and customer service are exceptional. I've learned so much about crystal care.",
      author: "Maria Santos",
      location: "Barcelona, Spain",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 via-transparent to-pink-100/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center scroll-animate" ref={heroRef}>
            <div className="mb-8">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-lg mb-6 inline-block">
                Our Story
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 md:mb-8 bg-gradient-to-r from-gray-800 via-purple-800 to-gray-800 bg-clip-text text-transparent leading-tight">
              The Journey of Adhyatma
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 md:mb-12 max-w-4xl mx-auto px-4">
              Born from a deep reverence for the earth's gifts and a commitment to ethical practices, 
              Adhyatma has grown into a trusted source for healing crystals worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button 
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-medium tracking-wide transition-all duration-300 hover:shadow-xl hover:scale-105 transform w-full sm:w-auto"
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
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-full font-medium tracking-wide transition-all duration-300 w-full sm:w-auto"
              >
                Watch Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="scroll-animate" ref={missionRef}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6 md:mb-8 text-gray-800 leading-tight">
                  Our Mission
                </h2>
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed">
                  <p>
                    At <span className="font-semibold text-purple-600">Adhyatma</span>, we believe that crystals are more than beautiful objects – 
                    they are powerful tools for healing, growth, and transformation. Our mission is to make these 
                    ancient gifts accessible to everyone while maintaining the highest standards of ethical sourcing 
                    and environmental responsibility.
                  </p>
                  <p>
                    We work directly with miners and suppliers who share our values, ensuring that every crystal 
                    in our collection is sourced with respect for both the earth and the communities that call 
                    these places home.
                  </p>
                  <p>
                    Through education, intention, and authentic connection, we empower individuals to align with 
                    their highest selves and walk the path of inner peace and purpose.
                  </p>
                </div>
              </div>
              <div className="scroll-animate" ref={missionRef}>
                <div className="relative">
                  <img 
                    src={healingCrystalsImg} 
                    alt="Our crystal collection" 
                    className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Ethically Sourced</h3>
                    <p className="text-lg">Every crystal tells a story</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 scroll-animate" ref={valuesRef}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4 sm:mb-6 text-gray-800 leading-tight">
                Our Values
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                These core principles guide everything we do, from sourcing crystals to serving our customers.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {values.map((value, index) => (
                <div key={index} className="scroll-animate" ref={valuesRef}>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-center group h-full">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">{value.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 scroll-animate" ref={timelineRef}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4 sm:mb-6 text-gray-800 leading-tight">
                Our Journey
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                From humble beginnings to a global community of crystal lovers.
              </p>
            </div>
            <div className="space-y-8 sm:space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col lg:flex-row gap-6 sm:gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:w-1/2 scroll-animate" ref={timelineRef}>
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                      <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-2 sm:gap-4">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 sm:px-4 py-1 text-sm sm:text-lg w-fit">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="lg:w-1/2 scroll-animate" ref={timelineRef}>
                    <img 
                      src={milestone.image} 
                      alt={milestone.title} 
                      className="rounded-2xl shadow-lg w-full h-48 sm:h-56 lg:h-64 object-cover hover:shadow-2xl transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 scroll-animate" ref={teamRef}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4 sm:mb-6 text-gray-800 leading-tight">
                Meet Our Team
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                The passionate individuals behind Adhyatma's mission.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {team.map((member, index) => (
                <div key={index} className="scroll-animate" ref={teamRef}>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-center group h-full">
                    <div className="relative mb-4 sm:mb-6">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover mx-auto shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-purple-200/30 to-pink-200/30 mx-auto blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">{member.name}</h3>
                    <p className="text-purple-600 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{member.role}</p>
                    <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{member.bio}</p>
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                      {member.specialties.map((specialty, specIndex) => (
                        <Badge key={specIndex} variant="outline" className="text-xs px-2 py-1">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 scroll-animate" ref={testimonialsRef}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4 sm:mb-6 text-gray-800 leading-tight">
                What Our Community Says
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Hear from the amazing people who have joined us on this journey.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="scroll-animate" ref={testimonialsRef}>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 relative h-full">
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-purple-200 absolute top-4 right-4 sm:top-6 sm:right-6" />
                    <div className="flex items-center mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <h4 className="font-bold text-gray-800 text-base sm:text-lg">{testimonial.author}</h4>
                      <p className="text-gray-600 text-sm sm:text-base">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center scroll-animate" ref={ctaRef}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6 sm:mb-8 leading-tight">
              Join Our Community
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4">
              Be part of a global community dedicated to healing, growth, and positive change. 
              Discover the perfect crystals for your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <Button 
                className="px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-gray-200 rounded-full font-medium tracking-wide transition-all duration-500 hover:shadow-2xl hover:scale-105 transform w-full sm:w-auto"
                onClick={() => {
                  const shopSection = document.getElementById('shop');
                  if (shopSection) {
                    shopSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                Start Your Journey
              </Button>
              <Button 
                variant="outline"
                className="px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full font-medium tracking-wide backdrop-blur-sm w-full sm:w-auto"
              >
                Learn About Crystals
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStory;
