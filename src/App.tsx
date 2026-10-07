import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingView } from './components/OrderTrackingView';
import { CustomerDashboard } from './components/CustomerDashboard';
import { InvoiceModal } from './components/InvoiceModal';
import { BkashInfoModal } from './components/BkashInfoModal';
import { FreeHostingGuideModal } from './components/FreeHostingGuideModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { Shield, Sparkles, Smartphone, Compass, Flame } from 'lucide-react';
import { playAnimusSound } from './utils/audio';

function StorefrontContent() {
  const { setIsBkashGuideOpen, setIsTrackingOpen, setIsHostingGuideOpen } = useStore();

  return (
    <div className="min-h-screen bg-[#08090c] text-stone-200 flex flex-col font-sans selection:bg-red-800 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Story / Craftsmanship Section */}
        <section className="py-14 border-b border-stone-800/80 bg-[#090b0f] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-lg bg-[#0e1017] border border-stone-800 hover:border-amber-900/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-500 mb-4">
                    <Flame className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-stone-100 uppercase tracking-wide">
                    Hand-Forged Damascus Steel
                  </h3>
                  <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                    Every hidden blade and brotherhood dagger is folded with 288 layers of high-carbon spring steel, quenched in oil for 58–60 HRC hardness and razor-sharp edge retention.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] font-mono text-amber-400">
                  Dual-Action Springs Calibrated
                </div>
              </div>

              <div className="p-6 rounded-lg bg-[#0e1017] border border-stone-800 hover:border-[#e2136e]/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-[#e2136e]/15 border border-[#e2136e]/40 flex items-center justify-center text-[#ff3a90] mb-4">
                    <Smartphone className="w-5 h-5 text-[#ff2d88]" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-stone-100 uppercase tracking-wide">
                    bKash Instant Mobile Checkout
                  </h3>
                  <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                    Direct bKash payment to official merchant number <b className="text-white">01712-889900</b>. Instant SMS TrxID validation with automated encrypted order receipt generation.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playAnimusSound('click');
                    setIsBkashGuideOpen(true);
                  }}
                  className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] font-mono text-[#ff4b98] hover:underline text-left"
                >
                  View bKash Payment Guide →
                </button>
              </div>

              <div className="p-6 rounded-lg bg-[#0e1017] border border-stone-800 hover:border-red-700/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-500 mb-4">
                    <Compass className="w-5 h-5 text-red-400 animate-pulse" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-stone-100 uppercase tracking-wide">
                    Live Courier Radar Tracking
                  </h3>
                  <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                    Watch your armory parcel travel through district checkpoints in real-time. Interactive GPS radar map, live ETA countdown, and direct courier safehouse communication.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playAnimusSound('click');
                    setIsTrackingOpen(true);
                  }}
                  className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] font-mono text-red-400 hover:underline text-left"
                >
                  Launch Live Tracking Console →
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Product Catalog Grid */}
        <ProductGrid />

        {/* Hosting & Link Callout Banner */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-r from-stone-900 via-[#10121a] to-red-950/40 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                Deployment Ready · Zero Cost Hosting
              </span>
              <h3 className="mt-1 font-display text-lg sm:text-xl font-bold text-stone-100 uppercase">
                Host for Free on Vercel, Netlify or Cloud Run
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-stone-400 leading-relaxed">
                Complete production build ready for deployment. Includes verified bKash mobile checkout, real-time courier simulation, and customer dashboard.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  playAnimusSound('click');
                  setIsHostingGuideOpen(true);
                }}
                className="px-4 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Free Hosting Guide & Link
              </button>

              <button
                onClick={() => {
                  playAnimusSound('click');
                  setIsTrackingOpen(true);
                }}
                className="px-4 py-2.5 rounded bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Track Live Order
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <ProductDetailModal />
      <CheckoutModal />
      <OrderTrackingView />
      <CustomerDashboard />
      <InvoiceModal />
      <BkashInfoModal />
      <FreeHostingGuideModal />

      {/* Toast Notification Layer */}
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StorefrontContent />
    </StoreProvider>
  );
}
