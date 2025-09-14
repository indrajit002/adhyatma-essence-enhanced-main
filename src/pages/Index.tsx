import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ShippingBanner from '@/components/ShippingBanner';
import MissionSection from '@/components/MissionSection';
import ProductCategories from '@/components/ProductCategories';
import FeaturedProducts from '@/components/FeaturedProducts';
import AboutPreview from '@/components/AboutPreview';
import CoreValues from '@/components/CoreValues';
import TestimonialsSection from '@/components/TestimonialsSection';
import CallToAction from '@/components/CallToAction';
import BlogSection from '@/components/BlogSection';
import ContactInfo from '@/components/ContactInfo';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ShippingBanner />
        <MissionSection />
        <ProductCategories />
        <FeaturedProducts />
        <AboutPreview />
        <CoreValues />
        <TestimonialsSection />
        <CallToAction 
          title="Ready to Begin Your Crystal Journey?"
          subtitle="Discover the perfect crystals for your spiritual growth and healing. Start with our curated collections or let our experts guide you."
          buttonText="Shop Now"
          buttonLink="#shop"
          variant="primary"
        />
        <BlogSection />
        <ContactInfo />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;