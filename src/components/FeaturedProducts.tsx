import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { type Product } from '@/data/products';
import WishlistIcon from '@/components/WishlistIcon';

const FeaturedProducts = () => {
  const { addItem } = useCart();
  const { products: featuredProducts, loading, error } = useFeaturedProducts();

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cormorant-light mb-4 bg-gradient-mystic bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 font-madefor-medium">
              Loading our most loved crystals and healing stones...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mystic"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cormorant-light mb-4 bg-gradient-mystic bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 font-madefor-medium">
              Unable to load featured products. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cormorant-light mb-4 bg-gradient-mystic bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 font-madefor-medium">
            Discover our most loved crystals and healing stones
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100 overflow-hidden mobile-card">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.name} - ${product.description}`}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                  width="300"
                  height="256"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm bg-[#b094b2]/90 text-white">
                    Featured
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <Button 
                    size="icon" 
                    className="w-12 h-12 bg-white/95 hover:bg-white text-[#b094b2] rounded-full shadow-lg backdrop-blur-sm"
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image
                    })}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <WishlistIcon product={product} />
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-cormorant-light mb-2 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-3">
                  {product.description}
                </p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg md:text-xl font-madefor-medium text-gray-800">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="mobile-button-primary bg-gray-800 hover:bg-gray-700 text-white rounded-full font-arial mobile-touch"
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image
                    })}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            variant="outline" 
            className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-3 rounded-none font-arial tracking-wide"
            onClick={() => window.location.href = '/shop'}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
