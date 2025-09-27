import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome to the Crystal Family! ✨", {
        description: "You've successfully joined our newsletter.",
      });
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-cormorant-light mb-4 md:mb-6 bg-gradient-to-r from-[#8a6b8d] via-[#a085a3] to-[#8a6b8d] bg-clip-text text-transparent">
            Let's Stay in Touch
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-300 focus:border-gray-500 rounded-none text-sm md:text-base"
            />
            <Button 
              type="submit" 
              className="px-6 md:px-8 py-2 md:py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-none font-arial tracking-wide text-sm md:text-base"
            >
              Submit
            </Button>
          </form>
          
          <div className="flex items-center justify-center mt-4">
            <input type="checkbox" id="newsletter" className="mr-2" />
            <label htmlFor="newsletter" className="text-sm text-gray-600">
              Yes, subscribe me to your newsletter.
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;