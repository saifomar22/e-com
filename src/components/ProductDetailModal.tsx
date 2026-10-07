import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, Shield, Plus, Minus, ShoppingBag, Zap, Check } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';
import { ProductReviewsSection } from './ProductReviewsSection';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice,
    setIsCheckoutOpen
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [copiedNote, setCopiedNote] = useState(false);

  if (!selectedProduct) return null;

  const isFavorite = wishlist.includes(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
  };

  const handleInstantBuy = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0d0f14] border border-stone-800 rounded-lg shadow-2xl text-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={() => {
            playAnimusSound('click');
            setSelectedProduct(null);
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded bg-black/60 border border-stone-800 hover:border-stone-600 text-stone-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Lore */}
          <div className="relative bg-[#07080b] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-800">
            <div className="relative aspect-[4/3] rounded overflow-hidden border border-stone-800/80">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 border border-stone-800 text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                {selectedProduct.specs.rarity}
              </span>
            </div>

            {/* Lore Quote Box */}
            <div className="mt-6 p-4 rounded bg-stone-900/40 border border-stone-800/60 creed-sheen">
              <div className="text-[10px] font-mono uppercase text-red-400 tracking-wider mb-1">
                Animus Codex Synchronization
              </div>
              <p className="font-display italic text-xs text-stone-300 leading-relaxed">
                {selectedProduct.loreSnippet}
              </p>
              <div className="mt-2 text-[10px] font-mono text-stone-500">
                Origin: {selectedProduct.era}
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                <span className="uppercase text-red-500 font-semibold">{selectedProduct.category}</span>
                <span>·</span>
                <span>{selectedProduct.era}</span>
              </div>

              <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold text-stone-100">
                {selectedProduct.name}
              </h2>

              {/* Price & Rating */}
              <div className="mt-3 flex items-baseline gap-4">
                <span className="text-2xl font-semibold font-mono tabular-nums text-amber-400">
                  {formatPrice(selectedProduct.priceBDT)}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  ★ {selectedProduct.rating} ({selectedProduct.reviewsCount} Brotherhood reviews)
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Specifications Matrix */}
              <div className="mt-6 pt-5 border-t border-stone-800/80 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-400 font-medium">
                  Forging & Armament Specifications
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-stone-900/60 border border-stone-800/60">
                    <span className="text-stone-500 block text-[10px] uppercase font-mono">Dimensions</span>
                    <span className="text-stone-200 font-medium">{selectedProduct.specs.dimensions}</span>
                  </div>
                  <div className="p-2 rounded bg-stone-900/60 border border-stone-800/60">
                    <span className="text-stone-500 block text-[10px] uppercase font-mono">Weight</span>
                    <span className="text-stone-200 font-medium">{selectedProduct.specs.weight}</span>
                  </div>
                  <div className="p-2 rounded bg-stone-900/60 border border-stone-800/60">
                    <span className="text-stone-500 block text-[10px] uppercase font-mono">SKU / Serial</span>
                    <span className="text-amber-400 font-mono text-[11px] font-medium">{selectedProduct.sku}</span>
                  </div>
                  <div className="p-2 rounded bg-stone-900/60 border border-stone-800/60">
                    <span className="text-stone-500 block text-[10px] uppercase font-mono">Warranty</span>
                    <span className="text-stone-200 font-medium text-[11px]">{selectedProduct.specs.warranty}</span>
                  </div>
                </div>

                <div className="mt-2">
                  <span className="text-stone-500 block text-[10px] uppercase font-mono mb-1">Materials</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.materials.map((mat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[11px] rounded bg-stone-900 border border-stone-800 text-stone-300"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Customer Reviews Section */}
              <ProductReviewsSection product={selectedProduct} />
            </div>

            {/* Purchase Action Section */}
            <div className="mt-8 pt-5 border-t border-stone-800 space-y-3">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400 font-medium">Quantity</span>
                <div className="flex items-center gap-3 border border-stone-800 rounded bg-stone-900 px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-stone-400 hover:text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-mono tabular-nums font-semibold text-stone-200 min-w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-stone-400 hover:text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="py-2.5 px-4 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-100 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Satchel</span>
                </button>

                <button
                  onClick={handleInstantBuy}
                  className="py-2.5 px-4 rounded bg-red-700 hover:bg-red-600 text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-red-950"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Instant bKash</span>
                </button>
              </div>

              {/* Mobile Payment Note */}
              <div className="text-[11px] text-center text-stone-400 flex items-center justify-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Instant bKash payment verification · Nationwide safehouse courier</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
