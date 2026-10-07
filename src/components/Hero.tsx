import React from 'react';
import { useStore } from '../context/StoreContext';
import { HERO_IMAGE } from '../data/products';
import { Compass, ShieldCheck, Zap, ArrowDown, ExternalLink } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const Hero: React.FC = () => {
  const { setIsTrackingOpen, setIsBkashGuideOpen, setIsHostingGuideOpen } = useStore();

  const scrollToCatalog = () => {
    playAnimusSound('blade');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden border-b border-stone-800/80">
      {/* Background Hero Image with Dark Moody Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Assassin's Creed Sanctum"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/70 to-[#08090c]/30" />
        <div className="absolute inset-0 animus-grid-bg opacity-40 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        {/* Subtle Creed Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded border border-amber-900/60 bg-black/60 backdrop-blur-sm text-amber-400 text-xs tracking-widest uppercase font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          Brotherhood Sanctioned Armory & Relics
        </div>

        {/* Display Headline */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-100 max-w-4xl mx-auto uppercase leading-tight text-balance">
          We Work in the Dark <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-400">
            To Serve The Light
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Arm yourself with battle-balanced Damascus hidden blades, virgin wool cowls, and illuminated Pieces of Eden. Seamless bKash mobile payments with real-time encrypted courier tracking.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={scrollToCatalog}
            className="px-6 py-3 rounded bg-red-700 hover:bg-red-600 text-stone-100 font-display font-semibold text-sm tracking-wider uppercase transition-all shadow-lg shadow-red-950/50 flex items-center gap-2 group"
          >
            <span>Explore Armory</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              playAnimusSound('click');
              setIsTrackingOpen(true);
            }}
            className="px-5 py-3 rounded border border-stone-700 hover:border-amber-500/70 bg-stone-900/80 hover:bg-stone-800 text-stone-200 font-medium text-sm tracking-wide transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Track Live Dispatch</span>
          </button>

          <button
            onClick={() => {
              playAnimusSound('click');
              setIsBkashGuideOpen(true);
            }}
            className="px-4 py-3 rounded border border-[#e2136e]/60 bg-[#e2136e]/15 hover:bg-[#e2136e]/25 text-[#ff61a6] font-medium text-sm tracking-wide transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-[#ff2d88]" />
            <span>bKash 01712-889900</span>
          </button>
        </div>

        {/* Adjacency Trust Grid */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-3xl mx-auto">
          <div className="p-2.5">
            <div className="text-xs uppercase tracking-wider text-amber-400 font-medium">bKash Integrated</div>
            <div className="text-sm font-semibold text-stone-200 mt-0.5">01712-889900</div>
            <div className="text-[11px] text-stone-400 mt-0.5">Instant TrxID Verification</div>
          </div>
          <div className="p-2.5">
            <div className="text-xs uppercase tracking-wider text-amber-400 font-medium">Courier Tracking</div>
            <div className="text-sm font-semibold text-stone-200 mt-0.5">Live Radar Map</div>
            <div className="text-text-[11px] text-stone-400 mt-0.5">Minute-by-minute ETA</div>
          </div>
          <div className="p-2.5">
            <div className="text-xs uppercase tracking-wider text-amber-400 font-medium">Forged Steel</div>
            <div className="text-sm font-semibold text-stone-200 mt-0.5">Damascus & 5160</div>
            <div className="text-[11px] text-stone-400 mt-0.5">Real Functional Blades</div>
          </div>
          <div className="p-2.5">
            <div className="text-xs uppercase tracking-wider text-amber-400 font-medium">Free Hosting</div>
            <button
              onClick={() => {
                playAnimusSound('click');
                setIsHostingGuideOpen(true);
              }}
              className="text-sm font-semibold text-red-400 hover:text-red-300 mt-0.5 flex items-center gap-1 group text-left"
            >
              <span>Vercel & Netlify</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <div className="text-[11px] text-stone-400 mt-0.5">Deploy Instructions</div>
          </div>
        </div>

      </div>
    </section>
  );
};
