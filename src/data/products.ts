// Product data for the crystal shop
// Add new products here manually

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
  originalPrice?: number;
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
  },
  
  // Example of how to add more products:
  // {
  //   id: '13',
  //   name: 'Your New Product Name',
  //   price: 99.99,
  //   originalPrice: 129.99, // Optional - set to null if no discount
  //   image: yourImageImport, // Import the image at the top
  //   rating: 4.8,
  //   reviewCount: 150,
  //   category: 'healing', // Must be one of: 'healing' | 'natural' | 'jewelry' | 'decorative' | 'kits' | 'accessories'
  //   colors: ['Purple', 'Blue'], // Array of color strings
  //   size: 'Large',
  //   inStock: true,
  //   featured: true, // Set to true to show in featured products
  //   description: 'Your product description here',
  //   benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3']
  // }
];

// Helper functions for product data
export const getProductsByCategory = (category: string) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductsInStock = () => {
  return products.filter(product => product.inStock);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

// Categories data
export const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'healing', name: 'Healing Crystals', count: products.filter(p => p.category === 'healing').length },
  { id: 'natural', name: 'Natural Crystals', count: products.filter(p => p.category === 'natural').length },
  { id: 'jewelry', name: 'Crystal Jewelry', count: products.filter(p => p.category === 'jewelry').length },
  { id: 'decorative', name: 'Decorative', count: products.filter(p => p.category === 'decorative').length },
  { id: 'kits', name: 'Crystal Kits', count: products.filter(p => p.category === 'kits').length },
  { id: 'accessories', name: 'Accessories', count: products.filter(p => p.category === 'accessories').length }
];

// Available colors
export const colors = [
  'Purple', 'Pink', 'Clear', 'Green', 'Blue', 'White', 'Black', 'Yellow', 'Orange', 'Gold', 'Mixed'
];
