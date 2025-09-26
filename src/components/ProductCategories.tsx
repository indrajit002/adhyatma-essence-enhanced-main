import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import naturalCrystals from '@/assets/natural-crystals.jpg';
import healingCrystals from '@/assets/healing-crystals.jpg';
import crystalBottles from '@/assets/crystal-bottles.jpg';
import crystalKits from '@/assets/crystal-kits.jpg';
import crystalBracelets from '@/assets/crystal-bracelets.jpg';
import tumbledStones from '@/assets/tumbled-stones.jpg';
import crystalTrees from '@/assets/crystal-trees.jpg';

const ProductCategories = () => {
  const navigate = useNavigate();
  
  const categories = [
    {
      id: 'natural-crystals',
      name: 'Natural Crystals',
      image: naturalCrystals,
      description: 'Pure, unpolished crystals straight from Earth',
    },
    {
      id: 'healing-crystals',
      name: 'Healing Crystals',
      image: healingCrystals,
      description: 'Energetically charged crystals for wellness',
    },
    {
      id: 'crystal-bottles',
      name: 'Crystal Bottles',
      image: crystalBottles,
      description: 'Infuse your water with crystal energy',
    },
    {
      id: 'crystal-kits',
      name: 'Crystal Kits & Sets',
      image: crystalKits,
      description: 'Curated collections for your practice',
    },
    {
      id: 'crystal-bracelets',
      name: 'Crystal Chips & Bracelets',
      image: crystalBracelets,
      description: 'Wearable crystal energy',
    },
    {
      id: 'tumbled-stones',
      name: 'Tumbled Stones',
      image: tumbledStones,
      description: 'Smooth, polished pocket companions',
    },
    {
      id: 'crystal-trees',
      name: 'Crystal Trees',
      image: crystalTrees,
      description: 'Decorative energy enhancers',
    },
  ];

  return (
    <section id="shop" className="py-20 bg-white" aria-labelledby="shop-heading">
      <div className="container mx-auto px-6">
        <header className="text-center mb-16">
          <h2 id="shop-heading" className="text-4xl md:text-5xl font-cormorant-light mb-4 bg-gradient-to-r from-[#8a6b8d] via-[#a085a3] to-[#8a6b8d] bg-clip-text text-transparent">
            Shop By Category
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {categories.map((category) => (
            <article key={category.id} className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100" role="listitem">
              <div className="relative overflow-hidden">
                <img
                  src={category.image}
                  alt={`${category.name} - ${category.description}`}
                  className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                  width="400"
                  height="256"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#b094b2]/20 to-[#d1bccd]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5 text-[#b094b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-cormorant-light mb-3 text-gray-800 group-hover:text-[#b094b2] transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed font-madefor-medium">
                  {category.description}
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-[#b094b2] to-[#d1bccd] hover:from-[#b094b2]/80 hover:to-[#d1bccd]/80 text-white px-6 py-3 rounded-full font-arial tracking-wide text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
                  onClick={() => navigate(`/collections/${category.id}`)}
                >
                  Explore Collection
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;