import { Button } from '@/components/ui/button';

const BlogSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cormorant-light mb-6 bg-gradient-to-r from-[#8a6b8d] via-[#a085a3] to-[#8a6b8d] bg-clip-text text-transparent">
            Blog
          </h2>
          <p className="text-lg text-gray-600 font-madefor-medium">
            Check back soon
          </p>
          <p className="text-sm text-gray-500 mt-2 font-madefor-medium">
            Once posts are published, you'll see them here.
          </p>
          <Button 
            variant="outline" 
            className="mt-6 border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-none font-arial tracking-wide"
            onClick={() => window.location.href = '/blog'}
          >
            Read all
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
