import { useState } from 'react';
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
  SlidersHorizontal,
  ChevronDown,
  X
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { categories, colors, type Product } from '@/data/products';

const Shop = () => {
  const { addItem } = useCart();
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(product.category || '') ||
                           selectedCategories.includes('all');
    const matchesColor = selectedColors.length === 0 || 
                        (product.colors && product.colors.some(color => selectedColors.includes(color)));
    
    return matchesSearch && matchesPrice && matchesCategory && matchesColor;
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

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#b094b2] mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Products</h2>
              <p className="text-gray-600">Please wait while we fetch the latest products...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Products</h2>
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
      <section className="pt-32 pb-12 bg-gradient-to-br from-[#d1bccd] via-white to-[#d1bccd]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cormorant-light mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-[#8a6b8d] to-gray-900 bg-clip-text text-transparent">
              Crystal Shop
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Discover our carefully curated collection of healing crystals, each chosen for their unique energy and beauty.
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search crystals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-full border-gray-200 focus:border-[#b094b2] focus:ring-[#b094b2] w-full"
                />
              </div>
              <Button
                variant="outline"
                className="px-6 py-3 rounded-full border-gray-200 hover:border-[#b094b2] hover:text-[#b094b2] md:hidden w-full md:w-auto"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar Filters */}
            <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg sticky top-24 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Filters</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-800 mb-4">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                          selectedCategories.includes(category.id)
                            ? 'bg-[#d1bccd] text-[#b094b2] border border-[#b094b2]'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-800 mb-4">Colors</h4>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                          selectedColors.includes(color)
                            ? 'bg-[#d1bccd] text-[#b094b2] border border-[#b094b2]'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-800 mb-4">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-20"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-20"
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      ${priceRange[0]} - ${priceRange[1]}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedColors([]);
                    setPriceRange([0, 200]);
                    setSearchTerm('');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              {/* Sort and View Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-gray-600 text-sm sm:text-base">
                    Showing {sortedProducts.length} of {products.length} products
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 pr-8 focus:border-[#b094b2] focus:ring-[#b094b2] w-full sm:w-auto text-sm"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className="rounded-lg w-10 h-10"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className="rounded-lg w-10 h-10"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              <div className={`grid gap-4 md:gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col ${
                      viewMode === 'list' ? 'flex-row' : ''
                    }`}
                  >
                    {/* Image Container - Fixed Height */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-1/3 h-48 sm:h-56' : 'h-48 sm:h-56 md:h-64'
                    }`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
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
                    </div>
                    
                    {/* Content Container - Flexible Height */}
                    <div className={`p-4 md:p-6 flex flex-col flex-grow ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      {/* Header with Title and Rating */}
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 flex-1 pr-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 flex-shrink-0">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          {product.rating} ({product.reviewCount})
                        </div>
                      </div>  
                      
                      
                      {/* Description - Flexible Height */}
                      <p className="text-gray-600 mb-4 text-sm flex-grow">
                        {product.description}
                      </p>
                      
                      {/* Price Section - Fixed at Bottom */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl md:text-2xl font-bold text-gray-800">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-base md:text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        {product.originalPrice && (
                          <Badge variant="destructive" className="text-xs">
                            Save ₹{(product.originalPrice - product.price).toFixed(2)}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Button - Fixed at Bottom */}
                      <Button
                        className="w-full bg-[#b094b2] hover:bg-[#b094b2]/80 text-white py-2 md:py-3 rounded-lg font-medium text-sm md:text-base disabled:opacity-50"
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
                      setSelectedCategories([]);
                      setSelectedColors([]);
                      setPriceRange([0, 200]);
                    }}
                    className="bg-gradient-to-r from-[#b094b2] to-[#d1bccd] hover:from-[#b094b2]/80 hover:to-[#d1bccd]/80 text-white px-8 py-3 rounded-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Shop;
