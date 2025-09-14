import { Button } from '@/components/ui/button';

const BlogSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-800">
            Blog
          </h2>
          <p className="text-lg text-gray-600">
            Check back soon
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Once posts are published, you'll see them here.
          </p>
          <Button 
            variant="outline" 
            className="mt-6 border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-none font-medium tracking-wide"
          >
            Read all
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
