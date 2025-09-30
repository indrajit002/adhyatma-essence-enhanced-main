import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  ShoppingCart, 
  ArrowLeft,
  ChevronDown,
  SortAsc
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import SizeDisplay from '@/components/SizeDisplay';

const CollectionDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { products: allProducts, loading: productsLoading, error: productsError } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Collection descriptions for different categories
  const collectionDescriptions: { [key: string]: string } = {
    'all': 'Complete collection of all our crystal products, carefully curated for their healing properties and beauty.',
    'bracelet': 'Elegant crystal bracelets for daily energy and style. Each piece is designed to bring positive energy and healing to your everyday life.',
    'rudraksh': 'Sacred Rudraksh beads for spiritual protection and meditation. These powerful beads have been used for centuries in spiritual practices.',
    'frames': 'Beautiful crystal frames for displaying sacred images. Perfect for creating a sacred space in your home.',
    'anklet': 'Delicate crystal anklets for grounding and protection. Wear these beautiful pieces to stay connected to the earth\'s energy.',
    'pyramid': 'Powerful crystal pyramids for energy amplification. These sacred geometric shapes help focus and amplify crystal energy.',
    'tower-and-tumbles': 'Crystal towers and tumbled stones for energy work. Perfect for beginners and experienced practitioners alike.',
    'raw-stones': 'Natural, unpolished crystals in their pure form. These stones maintain their original energy and connection to the earth.',
    'selenite-plates': 'Cleansing selenite plates for crystal charging. Essential tools for maintaining the energy of your crystal collection.',
    'geode': 'Stunning crystal geodes for home decoration. These natural formations bring beauty and energy to any space.',
    'mala': 'Sacred prayer beads for meditation and mindfulness. Each mala is carefully crafted for spiritual practice.',
    'hangers': 'Crystal hangers for car and home protection. Keep positive energy flowing in your spaces.',
    'tumble-set': 'Curated sets of tumbled crystals for beginners. Perfect for starting your crystal journey.',
    'trees': 'Beautiful crystal trees for home decoration and energy. These decorative pieces bring positive energy to any room.'
  };

  // Dynamic collection data based on category
  const getCollectionData = (categoryId: string) => {
    const categoryProducts = categoryId === 'all' ? allProducts : allProducts.filter(p => p.category === categoryId);
    const prices = categoryProducts.map(p => p.price);
    const minPrice = categoryProducts.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = categoryProducts.length > 0 ? Math.max(...prices) : 0;
    
    const categoryNames: { [key: string]: string } = {
      'all': 'All Products',
      'bracelet': 'Bracelet',
      'rudraksh': 'Rudraksh',
      'frames': 'Frames',
      'anklet': 'Anklet',
      'pyramid': 'Pyramid',
      'tower-and-tumbles': 'Tower and Tumbles',
      'raw-stones': 'Raw Stones',
      'selenite-plates': 'Selenite Plates',
      'geode': 'Geode',
      'mala': 'Mala',
      'hangers': 'Hangers',
      'tumble-set': 'Tumble Set',
      'trees': 'Trees'
    };

    // Get unique colors from products in this category
    const uniqueColors = [...new Set(categoryProducts.flatMap(p => Array.isArray(p.colors) ? p.colors : []))];
    
    return {
      name: categoryNames[categoryId] || 'Collection',
      description: collectionDescriptions[categoryId] || `Explore our ${categoryNames[categoryId]?.toLowerCase() || 'crystal'} collection`,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=300&fit=crop&crop=center',
      bannerImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=400&fit=crop&crop=center',
      productCount: categoryProducts.length,
      featured: true,
      colors: uniqueColors.length > 0 ? uniqueColors : ['Mixed'],
      priceRange: categoryProducts.length > 0 ? `₹${minPrice} - ₹${maxPrice}` : '₹0 - ₹0',
      category: categoryNames[categoryId] || 'Collection',
      benefits: ['Quality', 'Authentic', 'Healing']
    };
  };

  const collection = getCollectionData(id || 'bracelet');

  // Filter products by collection category
  const collectionCategory = id || 'bracelet';
  const products = collectionCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === collectionCategory);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Loading state
  if (productsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#b094b2] mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Collection</h2>
              <p className="text-gray-600">Please wait while we fetch the products...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (productsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Collection</h2>
              <p className="text-gray-600 mb-4">{productsError}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Collection Banner */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={collection.bannerImage}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="max-w-4xl">
            <Button
              variant="ghost"
              className="text-white hover:text-white mb-4 p-0"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collections
            </Button>
            <h1 className="text-4xl md:text-6xl font-cormorant-light text-white mb-4 drop-shadow-lg">
              {collection.name}
            </h1>
            <p className="text-xl text-gray-200 mb-6 max-w-2xl">
              {collection.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {collection.productCount} Products
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {collection.priceRange}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {collection.category}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Benefits */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-cormorant-light text-center mb-8 text-gray-900">
              Collection Benefits
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {collection.benefits.map((benefit, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-[#d1bccd] to-[#d1bccd] rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#b094b2] to-[#d1bccd] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">{benefit}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Filters and Search */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-full border-gray-200 focus:border-[#b094b2] focus:ring-[#b094b2]"
                />
              </div>
              
              {/* Sort */}
              <div className="flex gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-full px-4 py-3 pr-8 focus:border-[#b094b2] focus:ring-[#b094b2]"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                
                {/* View Mode */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="rounded-full"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="rounded-full"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

          </div>

          {/* Products Grid/List */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-1/3 h-48' : 'h-64'
                }`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {product.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-[#b094b2] to-[#d1bccd] text-white">
                        Featured
                      </Badge>
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive" className="text-lg px-4 py-2">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-10 h-10 bg-white/90 hover:bg-white rounded-full"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart className={`w-5 h-5 ${
                        wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`} />
                    </Button>
                  </div>
                </div>
                
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#b094b2] transition-colors duration-300 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">Sizes:</span>
                      <div className="flex flex-wrap gap-1">
                        {product.sizes.map((size, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {size}mm
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Sizes:</span>
                      <SizeDisplay sizes={product.sizes} variant="secondary" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Colors:</span>
                      <span className="font-semibold text-gray-800">{product.colors.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    {product.originalPrice > product.price && (
                      <Badge variant="destructive" className="text-xs">
                        Save ₹{product.originalPrice - product.price}
                      </Badge>
                    )}
                  </div>
                  
                  <Button
                    className="w-full bg-gradient-to-r from-[#b094b2] to-[#d1bccd] hover:from-[#b094b2]/80 hover:to-[#d1bccd]/80 text-white px-6 py-3 rounded-full font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:scale-105 transform disabled:opacity-50"
                    disabled={!product.inStock}
                    onClick={() => {
                      if (product.inStock) {
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image
                        });
                      }
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedColors([]);
                  setPriceRange([0, 500]);
                }}
                className="bg-gradient-to-r from-[#b094b2] to-[#d1bccd] hover:from-[#b094b2]/80 hover:to-[#d1bccd]/80 text-white px-8 py-3 rounded-full"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default CollectionDetail;
