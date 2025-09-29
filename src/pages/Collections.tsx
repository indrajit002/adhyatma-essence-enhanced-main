import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';

const Collections = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { products, loading: productsLoading, error: productsError } = useProducts();

  // Calculate dynamic product counts and price ranges for categories
  const getCategoryProductCount = (categoryId: string) => {
    if (categoryId === 'all') return products.length;
    return products.filter(p => p.category === categoryId).length;
  };

  const getCategoryPriceRange = (categoryId: string) => {
    if (categoryId === 'all') {
      if (products.length === 0) return '₹0 - ₹0';
      const prices = products.map(p => p.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return `₹${minPrice} - ₹${maxPrice}`;
    }
    
    const categoryProducts = products.filter(p => p.category === categoryId);
    if (categoryProducts.length === 0) return '₹0 - ₹0';
    
    const prices = categoryProducts.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return `₹${minPrice} - ₹${maxPrice}`;
  };

  // Collections based on actual categories with internet images
  const collections = [
    {
      id: 'all',
      name: 'All Products',
      description: 'Complete collection of all our crystal products',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('all'),
      featured: true,
      colors: ['Mixed'],
      priceRange: getCategoryPriceRange('all')
    },
    {
      id: 'bracelet',
      name: 'Bracelet',
      description: 'Elegant crystal bracelets for daily energy and style',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('bracelet'),
      featured: true,
      colors: ['Purple', 'Pink', 'Clear', 'Green'],
      priceRange: getCategoryPriceRange('bracelet')
    },
    {
      id: 'rudraksh',
      name: 'Rudraksh',
      description: 'Sacred Rudraksh beads for spiritual protection and meditation',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('rudraksh'),
      featured: false,
      colors: ['Brown', 'Dark Brown'],
      priceRange: getCategoryPriceRange('rudraksh')
    },
    {
      id: 'frames',
      name: 'Frames',
      description: 'Beautiful crystal frames for displaying sacred images',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('frames'),
      featured: false,
      colors: ['Gold', 'Silver', 'Wood'],
      priceRange: getCategoryPriceRange('frames')
    },
    {
      id: 'anklet',
      name: 'Anklet',
      description: 'Delicate crystal anklets for grounding and protection',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('anklet'),
      featured: false,
      colors: ['Silver', 'Gold', 'Mixed'],
      priceRange: getCategoryPriceRange('anklet')
    },
    {
      id: 'pyramid',
      name: 'Pyramid',
      description: 'Powerful crystal pyramids for energy amplification',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('pyramid'),
      featured: true,
      colors: ['Clear', 'Amethyst', 'Rose Quartz'],
      priceRange: getCategoryPriceRange('pyramid')
    },
    {
      id: 'tower-and-tumbles',
      name: 'Tower and Tumbles',
      description: 'Crystal towers and tumbled stones for energy work',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('tower-and-tumbles'),
      featured: false,
      colors: ['Mixed', 'Rainbow'],
      priceRange: getCategoryPriceRange('tower-and-tumbles')
    },
    {
      id: 'raw-stones',
      name: 'Raw Stones',
      description: 'Natural, unpolished crystals in their pure form',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('raw-stones'),
      featured: true,
      colors: ['Green', 'Blue', 'Purple', 'Clear'],
      priceRange: getCategoryPriceRange('raw-stones')
    },
    {
      id: 'selenite-plates',
      name: 'Selenite Plates',
      description: 'Cleansing selenite plates for crystal charging',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('selenite-plates'),
      featured: false,
      colors: ['White', 'Clear'],
      priceRange: getCategoryPriceRange('selenite-plates')
    },
    {
      id: 'geode',
      name: 'Geode',
      description: 'Stunning crystal geodes for home decoration',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('geode'),
      featured: true,
      colors: ['Purple', 'Pink', 'Clear', 'Mixed'],
      priceRange: getCategoryPriceRange('geode')
    },
    {
      id: 'mala',
      name: 'Mala',
      description: 'Sacred prayer beads for meditation and mindfulness',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('mala'),
      featured: false,
      colors: ['Brown', 'Mixed', 'Wood'],
      priceRange: getCategoryPriceRange('mala')
    },
    {
      id: 'hangers',
      name: 'Hangers',
      description: 'Crystal hangers for car and home protection',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('hangers'),
      featured: false,
      colors: ['Mixed', 'Clear'],
      priceRange: getCategoryPriceRange('hangers')
    },
    {
      id: 'tumble-set',
      name: 'Tumble Set',
      description: 'Curated sets of tumbled crystals for beginners',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('tumble-set'),
      featured: true,
      colors: ['Mixed', 'Rainbow'],
      priceRange: getCategoryPriceRange('tumble-set')
    },
    {
      id: 'trees',
      name: 'Trees',
      description: 'Beautiful crystal trees for home decoration and energy',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop&crop=center',
      productCount: getCategoryProductCount('trees'),
      featured: false,
      colors: ['Green', 'Pink', 'Clear', 'Mixed'],
      priceRange: getCategoryPriceRange('trees')
    }
  ];

  const categories = [
    { id: 'all', name: 'All Collections', count: collections.length },
    { id: 'featured', name: 'Featured', count: collections.filter(c => c.featured).length },
    { id: 'healing', name: 'Healing', count: collections.filter(c => c.name.toLowerCase().includes('healing')).length },
    { id: 'jewelry', name: 'Jewelry', count: collections.filter(c => c.name.toLowerCase().includes('bracelet')).length },
    { id: 'decorative', name: 'Decorative', count: collections.filter(c => c.name.toLowerCase().includes('tree') || c.name.toLowerCase().includes('bottle')).length }
  ];

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (collection.description && collection.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'featured' && collection.featured) ||
                           (selectedCategory === 'healing' && collection.name.toLowerCase().includes('healing')) ||
                           (selectedCategory === 'jewelry' && collection.name.toLowerCase().includes('bracelet')) ||
                           (selectedCategory === 'decorative' && (collection.name.toLowerCase().includes('tree') || collection.name.toLowerCase().includes('bottle')));
    
    return matchesSearch && matchesCategory;
  });

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#b094b2] mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Collections</h2>
              <p className="text-gray-600">Please wait while we fetch the latest collections...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Collections</h2>
              <p className="text-gray-600 mb-4">{productsError}</p>
              <Button onClick={() => window.location.reload()} className="bg-[#b094b2] hover:bg-[#b094b2]/80">
                Try Again
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd] py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cormorant-light mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-[#8a6b8d] to-gray-900 bg-clip-text text-transparent">
              Crystal Collections
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed px-4">
              Discover our carefully curated collections of healing crystals, each chosen for their unique energy and beauty.
            </p>
            
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search collections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-full border-gray-200 focus:border-[#b094b2] focus:ring-[#b094b2]"
                />
              </div>
              <Button
                variant="outline"
                className="px-6 py-3 rounded-full border-gray-200 hover:border-[#b094b2] hover:text-[#b094b2]"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 md:px-6 py-2 rounded-full transition-all duration-300 text-xs md:text-sm ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#b094b2] to-[#d1bccd] text-white shadow-lg'
                    : 'border-gray-200 hover:border-[#b094b2] hover:text-[#b094b2]'
                }`}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
            <p className="text-sm md:text-base text-gray-600">
              Showing {filteredCollections.length} collection{filteredCollections.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="rounded-full w-10 h-10"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-full w-10 h-10"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Collections Grid/List */}
          <div className={`grid gap-6 md:gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-1/3 h-48 sm:h-56' : 'h-48 sm:h-56 md:h-64'
                }`}>
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {collection.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-[#b094b2] to-[#d1bccd] text-white rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className={`p-4 md:p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 text-gray-800 group-hover:text-[#b094b2] transition-colors duration-300">
                    {collection.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                    {collection.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Products:</span>
                      <span className="font-semibold text-gray-800">{collection.productCount} items</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Price Range:</span>
                      <span className="font-semibold text-gray-800">{collection.priceRange}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Colors:</span>
                      <span className="font-semibold text-gray-800">{collection.colors.join(', ')}</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full bg-gradient-to-r from-[#b094b2] to-[#d1bccd] hover:from-[#b094b2]/80 hover:to-[#d1bccd]/80 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:scale-105 transform text-sm md:text-base"
                    onClick={() => navigate(`/collections/${collection.id}`)}
                  >
                    Explore Collection
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredCollections.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No collections found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
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

export default Collections;
