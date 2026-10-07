import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Shield, Compass, Smartphone, Search } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlist,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsTrackingOpen,
    setIsDashboardOpen,
    setIsBkashGuideOpen,
    setIsSupportOpen,
    isAdminAuthenticated,
    openAdminPortal,
    setSelectedCategory,
    setSearchQuery,
    profile
  } = useStore();

  const handleNavClick = (category: string) => {
    playAnimusSound('click');
    if (category === 'tracking') {
      setIsTrackingOpen(true);
    } else if (category === 'dashboard') {
      setIsDashboardOpen(true);
    } else {
      setSelectedCategory(category as any);
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#090a0df2] backdrop-blur-md border-b border-stone-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Zone 1: Brand title, single element */}
        <button
          onClick={() => {
            playAnimusSound('blade');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group flex items-center gap-2.5 focus:outline-none"
        >
          {/* Stylized Assassin Crest SVG */}
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-red-950 to-neutral-900 border border-red-700/60 flex items-center justify-center p-1 shadow-sm group-hover:border-red-600 transition-colors">
            <svg viewBox="0 0 100 100" className="w-full h-full text-red-500 fill-current">
              <path d="M50 8 L18 80 L35 72 L50 48 L65 72 L82 80 Z" />
              <path d="M50 56 L38 88 L50 82 L62 88 Z" opacity="0.8" />
            </svg>
          </div>
          <div>
            <span className="font-display font-bold text-lg md:text-xl tracking-wider text-stone-100 group-hover:text-red-400 transition-colors uppercase">
              Sanctum of the Creed
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium tracking-wide text-stone-300">
          <button
            onClick={() => handleNavClick('all')}
            className="hover:text-amber-400 transition-colors py-1 hover:underline underline-offset-4"
          >
            All Armory
          </button>
          <button
            onClick={() => handleNavClick('blades')}
            className="hover:text-amber-400 transition-colors py-1 hover:underline underline-offset-4"
          >
            Hidden Blades
          </button>
          <button
            onClick={() => handleNavClick('relics')}
            className="hover:text-amber-400 transition-colors py-1 hover:underline underline-offset-4"
          >
            Isu Relics
          </button>
          <button
            onClick={() => handleNavClick('apparel')}
            className="hover:text-amber-400 transition-colors py-1 hover:underline underline-offset-4"
          >
            Cloaks & Cowls
          </button>
          <button
            onClick={() => handleNavClick('tracking')}
            className="text-red-400 hover:text-red-300 font-medium transition-colors py-1 flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            Live Tracking
          </button>
          <button
            onClick={() => {
              playAnimusSound('click');
              setIsSupportOpen(true);
            }}
            className="hover:text-amber-400 transition-colors py-1 hover:underline underline-offset-4"
          >
            Support 24/7
          </button>
        </nav>

        {/* Zone 3: 1-2 primary action clusters */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Authenticated Admin Badge (Only Visible When Logged In) */}
          {isAdminAuthenticated && (
            <button
              onClick={() => {
                playAnimusSound('blade');
                openAdminPortal();
              }}
              title="Merchant & Smithy Administration Console"
              className="flex items-center gap-1 px-2 py-1 text-xs font-mono font-medium rounded border border-amber-800/80 bg-amber-950/50 text-amber-300 hover:bg-amber-900/60 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Admin (Live)</span>
            </button>
          )}

          {/* bKash Pay Quick Button */}
          <button
            onClick={() => {
              playAnimusSound('click');
              setIsBkashGuideOpen(true);
            }}
            title="bKash Payment Gateway Info"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#e2136e]/15 border border-[#e2136e]/40 text-[#ff4b98] hover:bg-[#e2136e]/25 text-xs font-semibold tracking-wide transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff2d88] animate-ping" />
            bKash 01712-889900
          </button>

          {/* Currency Toggle */}
          <button
            onClick={() => {
              playAnimusSound('click');
              setCurrency(currency === 'BDT' ? 'USD' : 'BDT');
            }}
            className="px-2 py-1 text-xs font-mono font-medium rounded border border-stone-800 bg-stone-900/80 text-stone-300 hover:text-amber-400 hover:border-stone-700 transition-colors"
            title="Toggle Currency"
          >
            {currency === 'BDT' ? '৳ BDT' : '$ USD'}
          </button>

          {/* Customer Dashboard Sanctuary button */}
          <button
            onClick={() => {
              playAnimusSound('click');
              setIsDashboardOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded border border-stone-800 bg-stone-900/60 text-stone-300 hover:text-amber-300 hover:border-amber-900/50 transition-colors"
            title="Assassin Sanctuary Dashboard"
          >
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Sanctuary</span>
          </button>

          {/* Cart Bag button */}
          <button
            onClick={() => {
              playAnimusSound('click');
              setIsCartOpen(true);
            }}
            className="relative px-3 py-1.5 rounded bg-red-950/80 hover:bg-red-900 border border-red-700/70 text-red-100 text-xs font-medium tracking-wide flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-red-300" />
            <span className="hidden sm:inline">Satchel</span>
            <span className="w-4 h-4 rounded-full bg-red-600 text-white font-mono text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
