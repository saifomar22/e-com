import React from 'react';
import { useStore } from '../context/StoreContext';
import { Shield, Smartphone, Compass, Globe, Heart, Lock } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const Footer: React.FC = () => {
  const {
    setIsTrackingOpen,
    setIsBkashGuideOpen,
    setIsHostingGuideOpen,
    setIsDashboardOpen,
    setIsSupportOpen,
    openAdminPortal,
    setActivePolicyModal,
    setSelectedCategory
  } = useStore();

  const handleNav = (cat: string) => {
    playAnimusSound('click');
    setSelectedCategory(cat as any);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePolicy = (pol: 'terms' | 'shipping' | 'refund' | 'privacy') => {
    playAnimusSound('click');
    setActivePolicyModal(pol);
  };

  return (
    <footer className="bg-[#07080b] border-t border-stone-800/80 text-stone-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Col */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-950 border border-red-700/60 flex items-center justify-center p-1">
              <svg viewBox="0 0 100 100" className="w-full h-full text-red-500 fill-current">
                <path d="M50 8 L18 80 L35 72 L50 48 L65 72 L82 80 Z" />
              </svg>
            </div>
            <span className="font-display font-bold text-sm tracking-wider text-stone-100 uppercase">
              Sanctum of the Creed
            </span>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed">
            Authentic masterwork Assassin's Creed weaponry, virgin wool cloaks, and ancient Precursor relics. Hand-forged Damascus steel with real-time encrypted courier tracking.
          </p>
          <div className="font-display italic text-xs text-stone-400">
            "Nothing is true, everything is permitted."
          </div>
        </div>

        {/* Armory Vault */}
        <div className="space-y-2 text-xs">
          <h4 className="font-display font-semibold text-stone-200 uppercase tracking-wider">
            Armory Vaults
          </h4>
          <ul className="space-y-1.5">
            <li>
              <button onClick={() => handleNav('blades')} className="hover:text-amber-400 transition-colors">
                Hidden Blades & Damascus Steel
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('relics')} className="hover:text-amber-400 transition-colors">
                Pieces of Eden & Codex Scrolls
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('apparel')} className="hover:text-amber-400 transition-colors">
                Master Assassin Cowls & Mantles
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('armor')} className="hover:text-amber-400 transition-colors">
                Ottoman Bracers & Vambraces
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Payment & Telemetry */}
        <div className="space-y-2 text-xs">
          <h4 className="font-display font-semibold text-stone-200 uppercase tracking-wider">
            bKash & Logistics
          </h4>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => {
                  playAnimusSound('click');
                  setIsBkashGuideOpen(true);
                }}
                className="text-[#ff4b98] hover:underline flex items-center gap-1.5"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>bKash Merchant: 01712-889900</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  playAnimusSound('click');
                  setIsTrackingOpen(true);
                }}
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-red-500" />
                <span>Real-Time Courier Radar</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  playAnimusSound('click');
                  setIsDashboardOpen(true);
                }}
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span>Brotherhood Sanctuary Dashboard</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Free Hosting & Deployment */}
        <div className="space-y-2 text-xs">
          <h4 className="font-display font-semibold text-stone-200 uppercase tracking-wider">
            Commercial Policies
          </h4>
          <ul className="space-y-1.5 text-stone-400">
            <li>
              <button onClick={() => handlePolicy('terms')} className="hover:text-amber-400 transition-colors">
                Terms of Service & Regulations
              </button>
            </li>
            <li>
              <button onClick={() => handlePolicy('shipping')} className="hover:text-amber-400 transition-colors">
                Nationwide 64-District Shipping
              </button>
            </li>
            <li>
              <button onClick={() => handlePolicy('refund')} className="hover:text-amber-400 transition-colors">
                7-Day Return & Damascus Warranty
              </button>
            </li>
            <li>
              <button onClick={() => handlePolicy('privacy')} className="hover:text-amber-400 transition-colors">
                Sanctuary Privacy Policy
              </button>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-mono gap-3">
        <div>
          © 2026 Sanctum of the Creed. Handcrafted with React 19 & Tailwind CSS.
        </div>
        <div className="flex items-center gap-3">
          <span>Official bKash: 01712-889900</span>
          <span>·</span>
          <span>Encrypted Safehouse Courier</span>
        </div>
      </div>
    </footer>
  );
};
