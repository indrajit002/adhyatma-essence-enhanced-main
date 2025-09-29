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
import SizeDisplay from '@/components/SizeDisplay';

const CollectionDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Mock collection data - in real app, this would come from API
  const collectionData = {
    'healing-crystals': {
      name: 'Healing Crystals',
      description: 'Powerful stones for physical and emotional healing. Each crystal is carefully selected for its unique energy properties and healing benefits.',
      image: '/src/assets/healing-crystals.jpg',
      bannerImage: '/src/assets/healing-crystals.jpg',
      productCount: 24,
      featured: true,
      colors: ['Purple', 'Pink', 'Clear', 'Green', 'Blue'],
      priceRange: '₹15 - ₹120',
      category: 'Healing',
      benefits: ['Emotional Healing', 'Physical Wellness', 'Energy Balance', 'Stress Relief']
    },
    'natural-crystals': {
      name: 'Natural Crystals',
      description: 'Raw, unpolished crystals in their natural form. These stones maintain their original energy and connection to the earth.',
      image: '/src/assets/natural-crystals.jpg',
      bannerImage: '/src/assets/natural-crystals.jpg',
      productCount: 18,
      featured: false,
      colors: ['Green', 'Blue', 'White', 'Brown', 'Gray'],
      priceRange: '₹25 - ₹200',
      category: 'Natural',
      benefits: ['Grounding', 'Natural Energy', 'Earth Connection', 'Raw Power']
    }
  };

  const collection = collectionData[id as keyof typeof collectionData] || collectionData['healing-crystals'];

  // Mock products data
  const products = [
    {
      id: '1',
      name: 'Amethyst Cluster',
      price: 45,
      originalPrice: 60,
      image: '/src/assets/healing-crystals.jpg',
      rating: 4.8,
      reviewCount: 124,
      colors: ['Purple'],
      size: 'Medium',
      inStock: true,
      featured: true,
      description: 'Beautiful amethyst cluster for meditation and healing'
    },
    {
      id: '2',
      name: 'Rose Quartz Heart',
      price: 25,
      originalPrice: 35,
      image: '/src/assets/healing-crystals.jpg',
      rating: 4.9,
      reviewCount: 89,
      colors: ['Pink'],
      size: 'Small',
      inStock: true,
      featured: false,
      description: 'Gentle rose quartz heart for love and compassion'
    },
    {
      id: '3',
      name: 'Clear Quartz Point',
      price: 35,
      originalPrice: 45,
      image: '/src/assets/healing-crystals.jpg',
      rating: 4.7,
      reviewCount: 156,
      colors: ['Clear'],
      size: 'Large',
      inStock: true,
      featured: true,
      description: 'Powerful clear quartz point for energy amplification'
    },
    {
      id: '4',
      name: 'Green Aventurine',
      price: 20,
      originalPrice: 30,
      image: '/src/assets/healing-crystals.jpg',
      rating: 4.6,
      reviewCount: 67,
      colors: ['Green'],
      size: 'Medium',
      inStock: false,
      featured: false,
      description: 'Lucky green aventurine for prosperity and growth'
    }
  ];

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
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

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
                    <option value="rating">Highest Rated</option>
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
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#b094b2] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      {product.rating} ({product.reviewCount})
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

      <Footer />
    </div>
  );
};

export default CollectionDetail;
