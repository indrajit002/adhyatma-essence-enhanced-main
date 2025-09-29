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
  category: 'bracelet' | 'rudraksh' | 'frames' | 'anklet' | 'pyramid' | 'tower-and-tumbles' | 'raw-stones' | 'selenite-plates' | 'geode' | 'mala' | 'hangers' | 'tumble-set' | 'trees';
  size: string;
  inStock: boolean;
  featured: boolean;
  description: string;
  benefits: string[];
}

export const products: Product[] = [];

export const categories = [
  { id: 'all', name: 'All Products', count: 0 },
  { id: 'bracelet', name: 'Bracelet', count: 0 },
  { id: 'rudraksh', name: 'Rudraksh', count: 0 },
  { id: 'frames', name: 'Frames', count: 0 },
  { id: 'anklet', name: 'Anklet', count: 0 },
  { id: 'pyramid', name: 'Pyramid', count: 0 },
  { id: 'tower-and-tumbles', name: 'Tower and Tumbles', count: 0 },
  { id: 'raw-stones', name: 'Raw Stones', count: 0 },
  { id: 'selenite-plates', name: 'Selenite Plates', count: 0 },
  { id: 'geode', name: 'Geode', count: 0 },
  { id: 'mala', name: 'Mala', count: 0 },
  { id: 'hangers', name: 'Hangers', count: 0 },
  { id: 'tumble-set', name: 'Tumble Set', count: 0 },
  { id: 'trees', name: 'Trees', count: 0 }
];


export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

