import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to the Crystal Family! ✨",
        description: "You've successfully joined our newsletter.",
      });
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-gray-800">
            Let's Stay in Touch
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 border border-gray-300 focus:border-gray-500 rounded-none"
            />
            <Button 
              type="submit" 
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-none font-medium tracking-wide"
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