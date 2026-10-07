import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Plus, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, setSelectedProduct, formatPrice } = useStore();
  const [imageLoaded, setImageLoaded] = useState(true);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorite = wishlist.includes(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleToggleWish = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => {
        playAnimusSound('click');
        setSelectedProduct(product);
      }}
      className="group cursor-pointer flex flex-col bg-[#0f1117] hover:bg-[#141720] border border-stone-800/90 hover:border-amber-900/60 rounded-md overflow-hidden transition-all duration-200 transform hover:-translate-y-0.5 shadow-md shadow-black/40"
    >
      {/* Visual Slot - 65% height on neutral dark backdrop */}
      <div className="relative aspect-[4/3] w-full bg-[#0a0b0e] overflow-hidden flex items-center justify-center">
        {imageLoaded ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageLoaded(false)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-stone-900 to-black text-stone-400">
            <Sparkles className="w-8 h-8 text-amber-500/60 mb-2" />
            <span className="text-xs uppercase tracking-wider font-display text-stone-300">{product.name}</span>
            <span className="text-[10px] text-stone-500 mt-1">Armory Forge Item</span>
          </div>
        )}

        {/* Top Floating Controls */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Subtle Era / Rarity label */}
          <span className="pointer-events-auto px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-stone-800 text-[10px] font-mono tracking-wide text-amber-400 uppercase">
            {product.specs.rarity}
          </span>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWish}
            className={`pointer-events-auto p-1.5 rounded bg-black/75 backdrop-blur-sm border border-stone-800 transition-colors ${
              isFavorite ? 'text-red-500 border-red-900/50' : 'text-stone-400 hover:text-stone-200 hover:border-stone-700'
            }`}
            title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Hover Quick Add Overlay Bar */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <button
            onClick={handleAdd}
            className="pointer-events-auto w-full py-2 px-3 rounded bg-red-700/90 hover:bg-red-600 text-white font-medium text-xs tracking-wider uppercase backdrop-blur-sm flex items-center justify-center gap-1.5 shadow-lg transition-colors"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Satchel</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Clean unboxed metadata with bullet separators */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-mono">
            <span className="capitalize">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.era}</span>
          </div>

          {/* Product Name */}
          <h3 className="mt-1.5 font-display text-sm font-semibold text-stone-100 group-hover:text-amber-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Subtle description preview */}
          <p className="mt-1 text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer with Price and Stock */}
        <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
          <div>
            <div className="text-base font-semibold font-mono tabular-nums text-stone-100">
              {formatPrice(product.priceBDT)}
            </div>
            <div className="text-[10px] text-stone-400">
              {product.inStock ? `${product.stockCount} left in forge` : 'Out of stock'}
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-amber-400/90 font-mono">
            <span>★</span>
            <span>{product.rating}</span>
            <span className="text-stone-400 text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
