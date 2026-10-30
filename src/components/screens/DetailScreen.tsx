import React, { useState } from 'react';
import { ProductItem } from '../../types';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  Check, 
  Copy, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface DetailScreenProps {
  product: ProductItem;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: ProductItem, color: string, size: string, quantity: number) => void;
  onShowToast: (message: string) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  product,
  onBack,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onShowToast,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [showUrlFlyout, setShowUrlFlyout] = useState(false);

  const currentImageUrl = product.images[selectedImageIndex] || product.images[0];

  const handleCopyHotlink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    onShowToast('Direct image hotlink copied to clipboard!');
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
  };

  return (
    <div className="w-full flex-1 flex flex-col relative pb-28">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-neutral-950/80 backdrop-blur-md flex items-center justify-between border-b border-neutral-800/60">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">
          {product.brand}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(product.id)}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-neutral-300'
              }`}
            />
          </button>
          <button
            onClick={() => setShowUrlFlyout(!showUrlFlyout)}
            title="Inspect direct hotlink URLs"
            className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 hover:text-indigo-300 transition"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hotlink URL Inspector Drawer Flyout */}
      {showUrlFlyout && (
        <div className="mx-4 mt-3 p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-indigo-300 flex items-center gap-1.5">
              <span>⚡</span> Hotlinked Image CDN
            </span>
            <button
              onClick={() => setShowUrlFlyout(false)}
              className="text-[11px] text-neutral-400 hover:text-white"
            >
              Close
            </button>
          </div>
          <p className="text-[11px] text-neutral-300 break-all font-mono bg-neutral-900/80 p-2 rounded-lg border border-neutral-800">
            {currentImageUrl}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleCopyHotlink(currentImageUrl)}
              className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition"
            >
              {copiedUrl === currentImageUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Hotlink URL
                </>
              )}
            </button>
            <a
              href={currentImageUrl}
              target="_blank"
              rel="noreferrer"
              className="py-1.5 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-[11px] flex items-center gap-1 transition"
            >
              Open <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Main Product Image Carousel */}
      <div className="relative w-full aspect-4/3 bg-neutral-900 border-b border-neutral-800 overflow-hidden group">
        <img
          src={currentImageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Quick Hotlink Copy on Image */}
        <button
          onClick={() => handleCopyHotlink(currentImageUrl)}
          className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 border border-white/10 hover:bg-black/90 transition shadow-lg"
        >
          {copiedUrl === currentImageUrl ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>Hotlink URL</span>
        </button>

        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-neutral-900/90 text-white backdrop-blur-md border border-neutral-700">
            {product.badge}
          </span>
        )}
      </div>

      {/* Gallery Thumbnails */}
      {product.images.length > 1 && (
        <div className="flex gap-2.5 px-4 pt-3 overflow-x-auto hide-scrollbar">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                selectedImageIndex === idx
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                  : 'border-neutral-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Details & Specs Container */}
      <div className="px-4 pt-4 space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              {product.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-neutral-500">({product.reviewsCount} verified reviews)</span>
            </div>
          </div>
          <h1 className="text-lg font-bold text-white mt-1 leading-snug">{product.name}</h1>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-2xl font-black text-white">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm line-through text-neutral-500">
                ${product.originalPrice}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              In Stock & Ready
            </span>
          </div>
        </div>

        {/* Color Variants */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300">
              Color Finish: <span className="text-white font-bold">{selectedColor}</span>
            </label>
            <div className="flex gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition ${
                    selectedColor === color.name
                      ? 'border-indigo-500 bg-indigo-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sizes / Options */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300">
              Configuration / Size: <span className="text-white font-bold">{selectedSize}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    selectedSize === size
                      ? 'bg-neutral-100 text-neutral-950 border-white'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="space-y-1.5 pt-1">
          <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
            Overview & Engineering
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed">{product.description}</p>
        </div>

        {/* Value Perks */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
            <Truck className="w-4 h-4 mx-auto text-indigo-400 mb-1" />
            <p className="text-[10px] font-bold text-white">Free Air Cargo</p>
            <p className="text-[9px] text-neutral-400">2-3 business days</p>
          </div>
          <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
            <ShieldCheck className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
            <p className="text-[10px] font-bold text-white">2-Yr Warranty</p>
            <p className="text-[9px] text-neutral-400">Official coverage</p>
          </div>
          <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
            <RotateCcw className="w-4 h-4 mx-auto text-amber-400 mb-1" />
            <p className="text-[10px] font-bold text-white">30-Day Trial</p>
            <p className="text-[9px] text-neutral-400">Hassle-free return</p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800 flex items-center gap-3">
        {/* Quantity Stepper */}
        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-2 py-1">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white font-bold"
          >
            -
          </button>
          <span className="w-6 text-center text-xs font-bold text-white font-mono">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white font-bold"
          >
            +
          </button>
        </div>

        {/* Add to Bag Button */}
        <button
          onClick={handleAdd}
          className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
        >
          <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};
