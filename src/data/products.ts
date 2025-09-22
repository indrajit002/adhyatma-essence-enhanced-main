import healingCrystalsImg from '@/assets/healing-crystals.jpg';
import naturalCrystalsImg from '@/assets/natural-crystals.jpg';
import crystalBraceletsImg from '@/assets/crystal-bracelets.jpg';
import crystalTreesImg from '@/assets/crystal-trees.jpg';
import crystalKitsImg from '@/assets/crystal-kits.jpg';
import crystalBottlesImg from '@/assets/crystal-bottles.jpg';
import tumbledStonesImg from '@/assets/tumbled-stones.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  rating: number;
  reviewCount: number;
  category: 'healing' | 'natural' | 'jewelry' | 'decorative' | 'kits' | 'accessories';
  colors: string[];
  size: string;
  inStock: boolean;
  featured: boolean;
  description: string;
  benefits: string[];
}

export const products: Product[] = [
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
    category: 'jewelry',
    colors: ['Pink'],
    size: 'Medium',
    inStock: true,
    featured: true,
    description: 'Beautiful rose quartz heart for love and emotional healing',
    benefits: ['Love', 'Emotional Healing', 'Self-Care']
  },
  {
    id: '3',
    name: 'Clear Quartz Point',
    price: 32.99,
    originalPrice: 45.99,
    image: naturalCrystalsImg,
    rating: 4.7,
    reviewCount: 156,
    category: 'natural',
    colors: ['Clear'],
    size: 'Small',
    inStock: true,
    featured: false,
    description: 'High-quality clear quartz point for energy amplification',
    benefits: ['Energy Amplification', 'Clarity', 'Focus']
  },
  {
    id: '4',
    name: 'Green Aventurine Tumbled Stone',
    price: 18.99,
    originalPrice: null,
    image: tumbledStonesImg,
    rating: 4.6,
    reviewCount: 203,
    category: 'natural',
    colors: ['Green'],
    size: 'Small',
    inStock: true,
    featured: false,
    description: 'Smooth tumbled aventurine for luck and prosperity',
    benefits: ['Luck', 'Prosperity', 'Opportunity']
  },
  {
    id: '5',
    name: 'Crystal Tree',
    price: 125.99,
    originalPrice: 159.99,
    image: crystalTreesImg,
    rating: 4.9,
    reviewCount: 67,
    category: 'decorative',
    colors: ['Mixed'],
    size: 'Large',
    inStock: true,
    featured: true,
    description: 'Handcrafted crystal tree for home decoration and energy',
    benefits: ['Home Energy', 'Decorative', 'Positive Vibes']
  },
  {
    id: '6',
    name: 'Crystal Healing Kit',
    price: 89.99,
    originalPrice: 120.99,
    image: crystalKitsImg,
    rating: 4.8,
    reviewCount: 145,
    category: 'kits',
    colors: ['Mixed'],
    size: 'Medium',
    inStock: true,
    featured: true,
    description: 'Complete crystal healing kit with guide and storage',
    benefits: ['Complete Kit', 'Learning', 'Variety']
  },
  {
    id: '7',
    name: 'Crystal Water Bottle',
    price: 55.99,
    originalPrice: null,
    image: crystalBottlesImg,
    rating: 4.5,
    reviewCount: 98,
    category: 'accessories',
    colors: ['Clear', 'Pink'],
    size: 'Medium',
    inStock: true,
    featured: false,
    description: 'Infuse your water with crystal energy for wellness',
    benefits: ['Wellness', 'Hydration', 'Energy']
  },
  {
    id: '8',
    name: 'Black Tourmaline',
    price: 42.99,
    originalPrice: null,
    image: naturalCrystalsImg,
    rating: 4.7,
    reviewCount: 112,
    category: 'natural',
    colors: ['Black'],
    size: 'Medium',
    inStock: true,
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
    description: 'Vibrant citrine cluster for abundance and creativity',
    benefits: ['Abundance', 'Creativity', 'Success']
  },
  {
    id: '10',
    name: 'Selenite Wand',
    price: 28.99,
    originalPrice: 38.99,
    image: naturalCrystalsImg,
    rating: 4.8,
    reviewCount: 134,
    category: 'natural',
    colors: ['White'],
    size: 'Medium',
    inStock: true,
    featured: false,
    description: 'Pure selenite wand for cleansing and charging other crystals',
    benefits: ['Cleansing', 'Charging', 'Purity']
  },
  {
    id: '11',
    name: 'Lapis Lazuli Sphere',
    price: 95.99,
    originalPrice: 125.99,
    image: healingCrystalsImg,
    rating: 4.9,
    reviewCount: 78,
    category: 'healing',
    colors: ['Blue', 'Gold'],
    size: 'Large',
    inStock: true,
    featured: true,
    description: 'Beautiful lapis lazuli sphere for wisdom and communication',
    benefits: ['Wisdom', 'Communication', 'Truth']
  },
  {
    id: '12',
    name: 'Tumbled Stone Set',
    price: 35.99,
    originalPrice: 49.99,
    image: tumbledStonesImg,
    rating: 4.7,
    reviewCount: 167,
    category: 'kits',
    colors: ['Mixed'],
    size: 'Small',
    inStock: true,
    featured: false,
    description: 'Collection of 7 different tumbled stones for daily use',
    benefits: ['Variety', 'Daily Use', 'Collection']
  },
  {
    id: '13',
    name: 'Crystal Bracelet Set',
    price: 65.99,
    originalPrice: 89.99,
    image: crystalBraceletsImg,
    rating: 4.8,
    reviewCount: 142,
    category: 'jewelry',
    colors: ['Mixed', 'Purple', 'Rose'],
    size: 'One Size',
    inStock: true,
    featured: true,
    description: 'Wearable crystal jewelry for daily energy. This set includes multiple bracelets with different healing properties.',
    benefits: ['Daily Energy', 'Wearable', 'Multiple Crystals']
  },
  {
    id: '14',
    name: 'Citrine Abundance Crystal',
    price: 42.99,
    originalPrice: 55.99,
    image: healingCrystalsImg,
    rating: 4.6,
    reviewCount: 134,
    category: 'healing',
    colors: ['Yellow', 'Gold'],
    size: 'Medium',
    inStock: true,
    featured: false,
    description: 'Manifest abundance and prosperity with this golden citrine crystal. Known as the merchant\'s stone, it attracts wealth and success.',
    benefits: ['Abundance', 'Prosperity', 'Success']
  },
  {
    id: '15',
    name: 'Crystal Infused Water Bottle',
    price: 39.99,
    originalPrice: 49.99,
    image: crystalBottlesImg,
    rating: 4.5,
    reviewCount: 76,
    category: 'accessories',
    colors: ['Clear', 'Blue', 'Pink'],
    size: '500ml',
    inStock: true,
    featured: false,
    description: 'Infused water bottle with crystal energy. This unique bottle combines hydration with crystal healing properties.',
    benefits: ['Hydration', 'Crystal Energy', 'Portable']
  }
];

export const categories = [
  { id: 'all', name: 'All Products', count: 15 },
  { id: 'healing', name: 'Healing Crystals', count: 4 },
  { id: 'natural', name: 'Natural Crystals', count: 4 },
  { id: 'jewelry', name: 'Crystal Jewelry', count: 2 },
  { id: 'decorative', name: 'Decorative', count: 1 },
  { id: 'kits', name: 'Crystal Kits', count: 2 },
  { id: 'accessories', name: 'Accessories', count: 2 }
];

export const colors = [
  'Purple', 'Pink', 'Clear', 'Green', 'Blue', 'White', 'Black', 'Yellow', 'Orange', 'Gold', 'Mixed'
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

