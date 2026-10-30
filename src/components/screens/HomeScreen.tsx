import React, { useState } from 'react';
import { ProductItem } from '../../types';
import { 
  Search, 
  Heart, 
  Star, 
  Sparkles, 
  Filter, 
  ArrowRight, 
  Share2, 
  Check, 
  Copy,
  ExternalLink
} from 'lucide-react';

interface HomeScreenProps {
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onShowToast: (message: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onSelectProduct,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const categories = ['All', 'Audio', 'Watches', 'Footwear', 'Bags', 'Home'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featuredProduct = products.find((p) => p.featured) || products[0];

  const handleCopyHotlink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    onShowToast('Hotlinked image URL copied to clipboard!');
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="w-full flex-1 flex flex-col px-4 pt-3 pb-8 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
            Exclusive Collection
          </span>
          <h2 className="text-xl font-extrabold tracking-tight">Studio Curations</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/50 hover:ring-indigo-400 transition cursor-pointer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-neutral-900" />
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 absolute left-3.5 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search headphones, chronos, sneakers..."
          className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-neutral-100 placeholder:text-neutral-500 transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 text-xs text-neutral-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Featured Editorial Hero Card */}
      {featuredProduct && selectedCategory === 'All' && !searchQuery && (
        <div 
          onClick={() => onSelectProduct(featuredProduct)}
          className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl border border-neutral-800 bg-neutral-900"
        >
          {/* Main Hotlink Image */}
          <div className="relative h-60 w-full overflow-hidden">
            <img
              src={featuredProduct.images[0]}
              alt={featuredProduct.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-600/90 text-white backdrop-blur-md shadow-md">
                {featuredProduct.badge || 'Featured'}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-neutral-900/80 text-neutral-300 backdrop-blur-md border border-neutral-700/60">
                ★ {featuredProduct.rating}
              </span>
            </div>

            {/* Quick Hotlink Copy Button */}
            <button
              onClick={(e) => handleCopyHotlink(e, featuredProduct.images[0])}
              title="Copy hotlinked image URL"
              className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white/90 backdrop-blur-md transition border border-white/10"
            >
              {copiedUrl === featuredProduct.images[0] ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Hero Content info */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">{featuredProduct.brand}</span>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white">${featuredProduct.price}</span>
                {featuredProduct.originalPrice && (
                  <span className="text-xs line-through text-neutral-500">
                    ${featuredProduct.originalPrice}
                  </span>
                )}
              </div>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition">
              {featuredProduct.name}
            </h3>
            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
              {featuredProduct.description}
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Specs & Gallery <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(featuredProduct);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md transition"
              >
                Instant Bag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-neutral-100 text-neutral-950 shadow-sm'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Product Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            {selectedCategory === 'All' ? 'All Curated Pieces' : `${selectedCategory} Collection`} ({filteredProducts.length})
          </h3>
          <span className="text-[11px] text-indigo-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Live Hotlinks
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-neutral-900/40 rounded-3xl border border-neutral-800 p-6">
            <p className="text-sm font-semibold text-neutral-300">No items match your search</p>
            <p className="text-xs text-neutral-500 mt-1">Try searching for other categories or terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {filteredProducts.map((product) => {
              const isFav = favorites.includes(product.id);
              const mainImg = product.images[0];

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-neutral-900/90 rounded-2xl overflow-hidden border border-neutral-800/80 hover:border-neutral-700 flex flex-col justify-between cursor-pointer transition shadow-md"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
                    <img
                      src={mainImg}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-neutral-300 hover:text-white transition"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-neutral-300'
                        }`}
                      />
                    </button>

                    {/* Copy Hotlink Button */}
                    <button
                      onClick={(e) => handleCopyHotlink(e, mainImg)}
                      title="Copy hotlinked image URL"
                      className="absolute bottom-2 left-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-neutral-300 hover:text-white transition opacity-0 group-hover:opacity-100"
                    >
                      {copiedUrl === mainImg ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>

                    {product.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-900/80 backdrop-blur-md text-neutral-200 border border-neutral-700/50">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 truncate">
                        {product.brand}
                      </p>
                      <h4 className="text-xs font-bold text-neutral-100 line-clamp-1 group-hover:text-indigo-400 transition">
                        {product.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-xs font-extrabold text-white">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-[10px] line-through text-neutral-500 ml-1.5">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-[10px] text-amber-400 font-semibold">
                        ★ {product.rating}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
