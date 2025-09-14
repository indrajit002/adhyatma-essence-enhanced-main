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
import { useCart } from '@/contexts/cart-context';
import healingCrystalsImg from '@/assets/healing-crystals.jpg';
import naturalCrystalsImg from '@/assets/natural-crystals.jpg';
import crystalBraceletsImg from '@/assets/crystal-bracelets.jpg';
import crystalTreesImg from '@/assets/crystal-trees.jpg';
import crystalKitsImg from '@/assets/crystal-kits.jpg';
import crystalBottlesImg from '@/assets/crystal-bottles.jpg';

const Shop = () => {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);


  const categories = [
    { id: 'all', name: 'All Products', count: 12 },
    { id: 'healing', name: 'Healing Crystals', count: 3 },
    { id: 'natural', name: 'Natural Crystals', count: 3 },
    { id: 'jewelry', name: 'Crystal Jewelry', count: 2 },
    { id: 'decorative', name: 'Decorative', count: 2 },
    { id: 'kits', name: 'Crystal Kits', count: 1 },
    { id: 'accessories', name: 'Accessories', count: 1 }
  ];

  const colors = [
    'Purple', 'Pink', 'Clear', 'Green', 'Blue', 'White', 'Black', 'Yellow', 'Orange', 'Gold', 'Mixed'
  ];

  const products = [
    {
      id: '1',
      name: 'Amethyst Cluster',
      price: 89.99,
      originalPrice: 119.99,
      image: healingCrystalsImg,
      rating: 4.8,
      reviewCount: 124,
      category: 'healing',
      colors: ['Purple'],
      size: 'Large',
      inStock: true,
      featured: true,
      description: 'Large amethyst cluster for meditation and energy cleansing',
      benefits: ['Stress Relief', 'Spiritual Growth', 'Protection']
    },
    {
      id: '2',
      name: 'Rose Quartz Heart',
      price: 45.99,
      originalPrice: null,
      image: crystalBraceletsImg,
      rating: 4.9,
      reviewCount: 89,
      category: 'healing',
      colors: ['Pink'],
      size: 'Medium',
      inStock: true,
      featured: false,
      description: 'Carved rose quartz heart for love and emotional healing',
      benefits: ['Love', 'Emotional Healing', 'Self-Care']
    },
    {
      id: '3',
      name: 'Clear Quartz Point',
      price: 35.99,
      originalPrice: 45.99,
      image: naturalCrystalsImg,
      rating: 4.7,
      reviewCount: 156,
      category: 'natural',
      colors: ['Clear'],
      size: 'Large',
      inStock: true,
      featured: true,
      description: 'Powerful clear quartz point for energy amplification',
      benefits: ['Energy Amplification', 'Clarity', 'Healing']
    },
    {
      id: '4',
      name: 'Green Aventurine Bracelet',
      price: 25.99,
      originalPrice: 35.99,
      image: crystalBraceletsImg,
      rating: 4.6,
      reviewCount: 67,
      category: 'jewelry',
      colors: ['Green'],
      size: 'One Size',
      inStock: true,
      featured: false,
      description: 'Lucky green aventurine bracelet for prosperity and growth',
      benefits: ['Prosperity', 'Luck', 'Growth']
    },
    {
      id: '5',
      name: 'Crystal Tree',
      price: 129.99,
      originalPrice: null,
      image: crystalTreesImg,
      rating: 4.9,
      reviewCount: 43,
      category: 'decorative',
      colors: ['Mixed'],
      size: 'Large',
      inStock: true,
      featured: true,
      description: 'Beautiful crystal tree for home decoration and energy',
      benefits: ['Home Energy', 'Decoration', 'Positive Vibes']
    },
    {
      id: '6',
      name: 'Chakra Healing Kit',
      price: 89.99,
      originalPrice: 119.99,
      image: crystalKitsImg,
      rating: 4.8,
      reviewCount: 203,
      category: 'kits',
      colors: ['Mixed'],
      size: 'Complete Set',
      inStock: true,
      featured: true,
      description: '7 crystals for complete chakra alignment and healing',
      benefits: ['Chakra Healing', 'Complete Set', 'Energy Balance']
    },
    {
      id: '7',
      name: 'Crystal Water Bottle',
      price: 67.99,
      originalPrice: 89.99,
      image: crystalBottlesImg,
      rating: 4.7,
      reviewCount: 156,
      category: 'accessories',
      colors: ['Clear', 'Pink'],
      size: '500ml',
      inStock: true,
      featured: false,
      description: 'Infused water bottle with amethyst and rose quartz',
      benefits: ['Hydration', 'Energy Infusion', 'Portable']
    },
    {
      id: '8',
      name: 'Black Tourmaline',
      price: 55.99,
      originalPrice: null,
      image: naturalCrystalsImg,
      rating: 4.5,
      reviewCount: 78,
      category: 'natural',
      colors: ['Black'],
      size: 'Medium',
      inStock: false,
      featured: false,
      description: 'Protective black tourmaline for grounding and protection',
      benefits: ['Protection', 'Grounding', 'Negative Energy']
    },
    {
      id: '9',
      name: 'Citrine Cluster',
      price: 75.99,
      originalPrice: 95.99,
      image: healingCrystalsImg,
      rating: 4.6,
      reviewCount: 92,
      category: 'healing',
      colors: ['Yellow', 'Orange'],
      size: 'Medium',
      inStock: true,
      featured: false,
      description: 'Vibrant citrine cluster for abundance and manifestation',
      benefits: ['Abundance', 'Manifestation', 'Success']
    },
    {
      id: '10',
      name: 'Selenite Wand',
      price: 32.99,
      originalPrice: null,
      image: naturalCrystalsImg,
      rating: 4.4,
      reviewCount: 145,
      category: 'natural',
      colors: ['White', 'Clear'],
      size: 'Small',
      inStock: true,
      featured: false,
      description: 'Pure selenite wand for cleansing and charging other crystals',
      benefits: ['Cleansing', 'Charging', 'Purification']
    },
    {
      id: '11',
      name: 'Lapis Lazuli Sphere',
      price: 95.99,
      originalPrice: 125.99,
      image: crystalTreesImg,
      rating: 4.7,
      reviewCount: 78,
      category: 'decorative',
      colors: ['Blue', 'Gold'],
      size: 'Large',
      inStock: true,
      featured: true,
      description: 'Deep blue lapis lazuli sphere for wisdom and truth',
      benefits: ['Wisdom', 'Truth', 'Communication']
    },
    {
      id: '12',
      name: 'Crystal Pendant Set',
      price: 45.99,
      originalPrice: 65.99,
      image: crystalBraceletsImg,
      rating: 4.5,
      reviewCount: 203,
      category: 'jewelry',
      colors: ['Mixed'],
      size: 'One Size',
      inStock: true,
      featured: false,
      description: 'Set of 3 crystal pendants for daily wear and protection',
      benefits: ['Protection', 'Style', 'Portable']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(product.category) ||
                           selectedCategories.includes('all');
    const matchesColor = selectedColors.length === 0 || 
                        product.colors.some(color => selectedColors.includes(color));
    
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-gray-800 via-purple-800 to-gray-800 bg-clip-text text-transparent">
              Crystal Shop
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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
                  className="pl-10 pr-4 py-3 rounded-full border-gray-200 focus:border-purple-500 focus:ring-purple-500 w-full"
                />
              </div>
              <Button
                variant="outline"
                className="px-6 py-3 rounded-full border-gray-200 hover:border-purple-500 hover:text-purple-600 md:hidden w-full md:w-auto"
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
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
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
                            ? 'bg-purple-100 text-purple-700 border border-purple-200'
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
                            ? 'bg-purple-100 text-purple-700 border border-purple-200'
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
                      className="appearance-none bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 pr-8 focus:border-purple-500 focus:ring-purple-500 w-full sm:w-auto text-sm"
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
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-1/3 h-48' : 'h-72'
                    }`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {product.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
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
                    
                    <div className={`p-8 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {product.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          {product.rating} ({product.reviewCount})
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-base">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl font-bold text-gray-800">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        {product.originalPrice && (
                          <Badge variant="destructive" className="text-xs">
                            Save ₹{(product.originalPrice - product.price).toFixed(2)}
                          </Badge>
                        )}
                      </div>
                      
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium text-lg disabled:opacity-50"
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
                        <ShoppingCart className="w-5 h-5 mr-2" />
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
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
