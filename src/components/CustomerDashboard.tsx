import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Shield,
  Clock,
  Compass,
  FileText,
  Heart,
  Settings,
  ShoppingBag,
  Award,
  Zap,
  Check,
  ChevronRight
} from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const CustomerDashboard: React.FC = () => {
  const {
    profile,
    updateProfile,
    orders,
    wishlist,
    products,
    addToCart,
    isDashboardOpen,
    setIsDashboardOpen,
    setIsTrackingOpen,
    setActiveTrackingId,
    setInvoiceOrder,
    formatPrice,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile' | 'tenets'>('orders');

  // Profile Edit State
  const [alias, setAlias] = useState(profile.assassinAlias);
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.safehouseAddress);
  const [city, setCity] = useState(profile.safehouseCity);

  if (!isDashboardOpen) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      assassinAlias: alias,
      name,
      phone,
      safehouseAddress: address,
      safehouseCity: city
    });
    playAnimusSound('sync');
  };

  const handleTrackOrder = (orderId: string) => {
    setActiveTrackingId(orderId);
    setIsDashboardOpen(false);
    setIsTrackingOpen(true);
    playAnimusSound('click');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl my-6 bg-[#0a0c10] border border-stone-800 rounded-lg shadow-2xl text-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 bg-[#07080b] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-red-950 to-neutral-900 border border-red-700/60 flex items-center justify-center p-2 text-red-500 shadow-md">
              <Shield className="w-full h-full text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg sm:text-xl font-bold text-stone-100 uppercase tracking-wide">
                  {profile.name}
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-[10px] font-mono font-bold text-amber-400 uppercase">
                  {profile.rank}
                </span>
              </div>
              <div className="text-xs text-stone-400 font-mono mt-0.5 flex items-center gap-2">
                <span>Codename: {profile.assassinAlias}</span>
                <span>·</span>
                <span className="text-emerald-400 font-semibold">{profile.syncLevel}% Animus Sync</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playAnimusSound('click');
              setIsDashboardOpen(false);
            }}
            className="p-2 rounded hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 border-b border-stone-800 bg-[#08090d] flex items-center gap-4 sm:gap-6 text-xs font-medium tracking-wide overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-red-600 text-stone-100 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-red-500" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'border-red-600 text-stone-100 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-red-500" />
            <span>Armory Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-red-600 text-stone-100 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-amber-500" />
            <span>Safehouse Coordinates</span>
          </button>

          <button
            onClick={() => setActiveTab('tenets')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'tenets'
                ? 'border-red-600 text-stone-100 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>The Creed Tenets</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* TAB 1: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-12 text-center text-stone-500 border border-dashed border-stone-800 rounded">
                  <p className="text-sm font-display uppercase">No Armory Requisitions On File</p>
                </div>
              ) : (
                orders.map(order => (
                  <div
                    key={order.id}
                    className="p-4 sm:p-5 rounded-lg bg-stone-900/40 border border-stone-800 hover:border-stone-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-sm font-bold text-stone-100">{order.id}</span>
                        <span className="text-xs text-stone-400 font-mono">· {order.createdAt}</span>
                        <span className="px-2 py-0.5 rounded bg-black/80 border border-stone-700 text-[10px] font-mono text-amber-400 uppercase">
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {(order.items || []).map((item, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-stone-300 font-mono">
                            <span className="text-amber-500 font-bold">{item.quantity}x</span>
                            <span>{item.product?.name || 'Armory Artifact'}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2 text-xs text-stone-400 font-mono flex items-center gap-3">
                        <span>bKash TrxID: <b className="text-[#ff4b98]">{order.payment.bkashTrxId || 'COD'}</b></span>
                        <span>·</span>
                        <span>Total: <b className="text-stone-200 tabular-nums">{formatPrice(order.totalBDT)}</b></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto">
                      <button
                        onClick={() => handleTrackOrder(order.id)}
                        className="px-3.5 py-2 rounded bg-red-800 hover:bg-red-700 text-stone-100 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Compass className="w-3.5 h-3.5 text-red-300 animate-pulse" />
                        <span>Track Live</span>
                      </button>

                      <button
                        onClick={() => setInvoiceOrder(order)}
                        className="p-2 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                        title="View Scroll Invoice"
                      >
                        <FileText className="w-4 h-4 text-amber-400" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="py-12 text-center text-stone-500 border border-dashed border-stone-800 rounded">
                  <p className="text-sm font-display uppercase">Wishlist is empty</p>
                  <p className="text-xs text-stone-600 mt-1">Tap the heart on any blade or relic in the catalog.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlistProducts.map(prod => (
                    <div key={prod.id} className="p-4 rounded-lg bg-stone-900/40 border border-stone-800 flex flex-col justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded object-cover border border-stone-800 shrink-0"
                        />
                        <div>
                          <h4 className="font-display text-xs font-semibold text-stone-200 line-clamp-1">{prod.name}</h4>
                          <div className="text-xs font-mono tabular-nums text-amber-400 mt-0.5">
                            {formatPrice(prod.priceBDT)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="mt-3 w-full py-1.5 rounded bg-stone-800 hover:bg-red-800 text-stone-200 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Satchel</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SAFEHOUSE PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="max-w-2xl space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1 font-mono">Assassin Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-mono">Brotherhood Codename</label>
                  <input
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-mono">Encrypted Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-mono">Safehouse Sector / City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-stone-400 mb-1 font-mono">Default Delivery Safehouse Street</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 px-5 py-2 rounded bg-amber-700 hover:bg-amber-600 text-stone-100 text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Update Safehouse Credentials
              </button>
            </form>
          )}

          {/* TAB 4: THE CREED TENETS */}
          {activeTab === 'tenets' && (
            <div className="space-y-4 max-w-2xl text-stone-300">
              <div className="p-4 rounded bg-stone-900/60 border border-amber-900/40">
                <div className="text-xs font-mono uppercase text-amber-400 tracking-wider mb-1">The Maxim</div>
                <p className="font-display italic text-sm text-stone-200">
                  "Nothing is true, everything is permitted."
                </p>
                <p className="mt-1 text-xs text-stone-400">
                  To say that nothing is true is to realize that the foundations of society are fragile. To say that everything is permitted is to understand that we are the architects of our actions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded bg-stone-900/40 border border-stone-800">
                  <div className="text-red-500 font-mono font-bold uppercase mb-1">Tenet I</div>
                  <div className="font-semibold text-stone-200 mb-1">Stay Your Blade</div>
                  <p className="text-stone-400 text-[11px]">
                    Never spill the blood of an innocent person. The Brotherhood stands as a safeguard for all humanity.
                  </p>
                </div>

                <div className="p-3.5 rounded bg-stone-900/40 border border-stone-800">
                  <div className="text-red-500 font-mono font-bold uppercase mb-1">Tenet II</div>
                  <div className="font-semibold text-stone-200 mb-1">Hide in Plain Sight</div>
                  <p className="text-stone-400 text-[11px]">
                    Blend with the crowd. Let silence precede your steps and shadows cover your withdrawal.
                  </p>
                </div>

                <div className="p-3.5 rounded bg-stone-900/40 border border-stone-800">
                  <div className="text-red-500 font-mono font-bold uppercase mb-1">Tenet III</div>
                  <div className="font-semibold text-stone-200 mb-1">Never Compromise</div>
                  <p className="text-stone-400 text-[11px]">
                    Never jeopardize the brotherhood or disclose the location of the armory vaults and safehouses.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
