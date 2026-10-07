import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartTotalBDT,
    setIsCheckoutOpen,
    formatPrice,
    showToast
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'CREED10' || clean === 'MASYAF') {
      setDiscountPercent(10);
      showToast('Sanctum Oath Accepted: 10% Brotherhood Discount Applied!', 'success');
      playAnimusSound('sync');
    } else {
      showToast('Invalid Creed glyph code. Try "CREED10".', 'warn');
    }
  };

  const discountAmount = Math.round((cartTotalBDT * discountPercent) / 100);
  const deliveryFee = cartTotalBDT > 10000 || cartTotalBDT === 0 ? 0 : 120;
  const grandTotal = Math.max(0, cartTotalBDT - discountAmount + (cart.length > 0 ? deliveryFee : 0));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c0e13] border-l border-stone-800 flex flex-col justify-between text-stone-200 shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <h2 className="font-display text-base font-bold text-stone-100 uppercase tracking-wider">
                Armory Satchel ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => {
                playAnimusSound('click');
                setIsCartOpen(false);
              }}
              className="p-1.5 rounded hover:bg-stone-900 text-stone-400 hover:text-stone-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-800/80">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-12 h-12 rounded-full border border-stone-800 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-6 h-6 text-stone-600" />
                </div>
                <h3 className="font-display text-sm font-semibold text-stone-300 uppercase">
                  Satchel is Empty
                </h3>
                <p className="mt-1 text-xs text-stone-500 max-w-xs">
                  Your blade sheath is vacant. Visit the Armory vault to equip weapons and relics.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-4 py-2 rounded bg-stone-900 border border-stone-700 text-xs text-stone-200 hover:text-white"
                >
                  Return to Armory
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                  <div className="w-16 h-16 rounded overflow-hidden bg-stone-950 border border-stone-800 shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-xs font-semibold text-stone-200 truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] font-mono tabular-nums text-amber-400 mt-0.5">
                      {formatPrice(item.product.priceBDT)}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center border border-stone-800 rounded bg-stone-900/80">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-400 hover:text-white text-xs"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 text-xs font-mono tabular-nums text-stone-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-400 hover:text-white text-xs"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-stone-500 hover:text-red-400 transition-colors ml-auto"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-[#090b0e] space-y-3">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Oath Code (try 'CREED10')"
                    className="w-full pl-7 pr-2 py-1.5 text-xs rounded bg-stone-900 border border-stone-800 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-600 font-mono"
                  />
                  <Tag className="w-3 h-3 text-stone-500 absolute left-2 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium"
                >
                  Apply
                </button>
              </form>

              {/* Price rows */}
              <div className="space-y-1.5 text-xs text-stone-400 font-mono pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200 tabular-nums">{formatPrice(cartTotalBDT)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Brotherhood Oath (10%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Safehouse Dispatch</span>
                  <span>{deliveryFee === 0 ? 'Free Courier' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-semibold text-stone-100">
                  <span>Total Amount</span>
                  <span className="text-amber-400 font-mono tabular-nums">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* bKash Prompt Notice */}
              <div className="p-2.5 rounded bg-[#e2136e]/10 border border-[#e2136e]/30 text-[11px] text-stone-300 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#ff4b98] block">bKash Mobile Payment</span>
                  <span className="text-stone-400 text-[10px]">Merchant: 01712-889900</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#e2136e]/30 text-[#ff4b98] font-mono text-[10px] font-bold">
                  Instant
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  playAnimusSound('click');
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3 rounded bg-red-700 hover:bg-red-600 text-stone-100 font-display font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-950/60"
              >
                <span>Proceed to Secure bKash Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
