import { useState, useEffect } from 'react';

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  productCount: number;
  colors: string[];
  priceRange: string;
}

// Collections data - manually managed
const collections: Collection[] = [
  {
    id: 'healing-crystals',
    name: 'Healing Crystals',
    slug: 'healing-crystals',
    description: 'Powerful stones for physical and emotional healing',
    image: '/src/assets/healing-crystals.jpg',
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productCount: 24,
    colors: ['Purple', 'Pink', 'Clear'],
    priceRange: '₹15 - ₹120'
  },
  {
    id: 'natural-crystals',
    name: 'Natural Crystals',
    slug: 'natural-crystals',
    description: 'Raw, unpolished crystals in their natural form',
    image: '/src/assets/natural-crystals.jpg',
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productCount: 18,
    colors: ['Green', 'Blue', 'White'],
    priceRange: '₹25 - ₹200'
  },
  {
    id: 'tumbled-stones',
    name: 'Tumbled Stones',
    slug: 'tumbled-stones',
    description: 'Smooth, polished stones perfect for meditation',
    image: '/src/assets/tumbled-stones.jpg',
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productCount: 32,
    colors: ['Mixed', 'Rainbow'],
    priceRange: '₹8 - ₹45'
  },
  {
    id: 'crystal-trees',
    name: 'Crystal Trees',
    slug: 'crystal-trees',
    description: 'Beautiful decorative crystal formations',
    image: '/src/assets/crystal-trees.jpg',
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productCount: 12,
    colors: ['Green', 'Pink', 'Clear'],
    priceRange: '₹35 - ₹150'
  },
  {
    id: 'crystal-bracelets',
    name: 'Crystal Bracelets',
    slug: 'crystal-bracelets',
    description: 'Wearable crystal jewelry for daily energy',
    image: '/src/assets/crystal-bracelets.jpg',
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productCount: 28,
    colors: ['Mixed', 'Purple', 'Rose'],
    priceRange: '₹20 - ₹80'
  },
  {
    id: 'crystal-kits',
    name: 'Crystal Kits',
    slug: 'crystal-kits',
    description: 'Curated sets for specific intentions',
    image: '/src/assets/crystal-kits.jpg',
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productCount: 15,
    colors: ['Mixed'],
    priceRange: '₹45 - ₹180'
  },
  {
    id: 'crystal-bottles',
    name: 'Crystal Bottles',
    slug: 'crystal-bottles',
    description: 'Infused water bottles with crystal energy',
    image: '/src/assets/crystal-bottles.jpg',
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productCount: 8,
    colors: ['Clear', 'Blue', 'Pink'],
    priceRange: '₹30 - ₹95'
  }
];

export const useCollections = () => {
  const [collectionsData, setCollectionsData] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 200));
        
        setCollectionsData(collections);
      } catch (err) {
        console.error('Error loading collections:', err);
        setError('Failed to load collections');
        setCollectionsData([]);
      } finally {
        setLoading(false);
      }
    };

    loadCollections();
  }, []);

  return { collections: collectionsData, loading, error };
};

export const useCollection = (id: string) => {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCollection = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 150));
        
        const foundCollection = collections.find(c => c.id === id);
        setCollection(foundCollection || null);
      } catch (err) {
        console.error('Error loading collection:', err);
        setError('Failed to load collection');
        setCollection(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCollection();
    }
  }, [id]);

  return { collection, loading, error };
};
