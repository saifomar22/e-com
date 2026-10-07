import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';
import {
  X,
  Compass,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Shield,
  FileText,
  Play,
  RotateCcw,
  Zap,
  ArrowRight
} from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const OrderTrackingView: React.FC = () => {
  const {
    orders,
    activeTrackingId,
    setActiveTrackingId,
    isTrackingOpen,
    setIsTrackingOpen,
    updateOrderStatus,
    setInvoiceOrder,
    formatPrice,
    showToast
  } = useStore();

  const [searchOrderId, setSearchOrderId] = useState(activeTrackingId || 'CREED-8924');
  const [isSimulatingLive, setIsSimulatingLive] = useState(false);

  // Sync active tracking ID
  useEffect(() => {
    if (activeTrackingId) {
      setSearchOrderId(activeTrackingId);
    }
  }, [activeTrackingId]);

  if (!isTrackingOpen) return null;

  const currentOrder = orders.find(o => o.id.toUpperCase() === searchOrderId.trim().toUpperCase()) || orders[0];

  if (!currentOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
        <div className="relative w-full max-w-md bg-[#0a0c10] border border-stone-800 rounded-lg shadow-2xl text-stone-200 p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full border border-stone-800 flex items-center justify-center mx-auto text-amber-500">
            <Compass className="w-6 h-6 animate-spin" />
          </div>
          <h3 className="font-display text-base font-bold text-stone-100 uppercase">
            No Active Telemetry Found
          </h3>
          <p className="text-xs text-stone-400">
            No active orders are currently tracked in the Brotherhood archives. Equip gear from the Armory to initialize courier GPS tracking.
          </p>
          <button
            onClick={() => {
              playAnimusSound('click');
              setIsTrackingOpen(false);
            }}
            className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white text-xs font-semibold uppercase"
          >
            Close Tracking
          </button>
        </div>
      </div>
    );
  }

  const stages: { key: OrderStatus; label: string; desc: string }[] = [
    { key: 'verifying_payment', label: 'bKash Verification', desc: 'Gateway confirmation' },
    { key: 'payment_confirmed', label: 'Payment Confirmed', desc: 'Cleared by merchant' },
    { key: 'forging_armory', label: 'Armory Forging', desc: 'Damascus inspection' },
    { key: 'courier_dispatched', label: 'Courier En Route', desc: 'Dispatched from hub' },
    { key: 'out_for_delivery', label: 'Sector Approach', desc: 'Near destination' },
    { key: 'delivered', label: 'Safehouse Delivered', desc: 'Securely synchronized' }
  ];

  const getStageIndex = (status: OrderStatus) => {
    return stages.findIndex(s => s.key === status);
  };

  const currentStageIndex = getStageIndex(currentOrder.status);

  // Simulation step advancer
  const advanceSimulation = () => {
    playAnimusSound('blade');
    const nextIdx = currentStageIndex + 1;
    if (nextIdx < stages.length) {
      updateOrderStatus(currentOrder.id, stages[nextIdx].key);
    } else {
      updateOrderStatus(currentOrder.id, 'courier_dispatched');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(o => o.id.toUpperCase() === searchOrderId.trim().toUpperCase());
    if (found) {
      setActiveTrackingId(found.id);
      playAnimusSound('click');
      showToast(`Synchronized with order: ${found.id}`, 'success');
    } else {
      showToast(`Order "${searchOrderId}" not found in Brotherhood archive`, 'warn');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl my-6 bg-[#0a0c10] border border-stone-800 rounded-lg shadow-2xl text-stone-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-[#07080b] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-red-950/70 border border-red-700/60 flex items-center justify-center">
              <Compass className="w-4 h-4 text-red-500 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-red-400 tracking-wider">
                Real-Time Animus GPS Telemetry
              </div>
              <h2 className="font-display text-base sm:text-lg font-bold text-stone-100 uppercase tracking-wide">
                Live Courier Radar · {currentOrder.id}
              </h2>
            </div>
          </div>

          {/* Quick Order Search and Close */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="flex gap-1.5">
              <input
                type="text"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                placeholder="Order ID..."
                className="w-32 sm:w-40 px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-800 text-stone-200 font-mono focus:outline-none focus:border-red-600"
              />
              <button
                type="submit"
                className="px-2.5 py-1 text-xs rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium"
              >
                Track
              </button>
            </form>

            <button
              onClick={() => {
                playAnimusSound('click');
                setIsTrackingOpen(false);
              }}
              className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Top Quick Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded bg-stone-900/60 border border-stone-800">
              <span className="text-stone-500 block text-[10px] uppercase">Status</span>
              <span className="text-amber-400 font-bold uppercase mt-0.5 block truncate">
                {currentOrder.status.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="p-3 rounded bg-stone-900/60 border border-stone-800">
              <span className="text-stone-500 block text-[10px] uppercase">ETA to Safehouse</span>
              <span className="text-stone-200 font-bold mt-0.5 block">
                {currentOrder.courier.etaMinutes > 0 ? `${currentOrder.courier.etaMinutes} Minutes` : 'Delivered'}
              </span>
            </div>
            <div className="p-3 rounded bg-stone-900/60 border border-stone-800">
              <span className="text-stone-500 block text-[10px] uppercase">bKash TrxID</span>
              <span className="text-[#ff4b98] font-bold mt-0.5 block truncate">
                {currentOrder.payment.bkashTrxId || 'COD Verified'}
              </span>
            </div>
            <div className="p-3 rounded bg-stone-900/60 border border-stone-800">
              <span className="text-stone-500 block text-[10px] uppercase">Order Amount</span>
              <span className="text-stone-200 font-bold mt-0.5 block tabular-nums">
                {formatPrice(currentOrder.totalBDT)}
              </span>
            </div>
          </div>

          {/* Interactive Radar Tactical Map */}
          <div className="relative rounded-lg overflow-hidden border border-stone-800 bg-[#07080b] h-64 sm:h-80 flex flex-col justify-between p-4 animus-grid-bg">
            
            {/* Top Overlay Stats */}
            <div className="flex items-center justify-between text-xs z-10">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/80 border border-stone-800 text-stone-300 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-mono text-[11px]">
                  Sector: <b>{currentOrder.courier.currentDistrict}</b>
                </span>
              </div>

              {/* Simulation Stage Controller */}
              <button
                onClick={advanceSimulation}
                className="px-3 py-1 rounded bg-red-950/80 hover:bg-red-900 border border-red-700/80 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
                title="Advance courier progression to test real-time update"
              >
                <Play className="w-3 h-3 text-red-400 fill-current" />
                <span>Simulate Next Stage</span>
              </button>
            </div>

            {/* Tactical Map Visual Canvas */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Glowing Radar Radial Gradient */}
                  <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#c01525" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#c01525" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="20%" y1="0%" x2="20%" y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="80%" y1="0%" x2="80%" y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0%" y1="35%" x2="100%" y2="35%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

                {/* Dispatch Route Trail */}
                <path
                  d="M 15 25 Q 35 40 55 48 T 82 75"
                  fill="none"
                  stroke="#c01525"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />

                {/* Origin: Masyaf Vault Point */}
                <circle cx="15%" cy="25%" r="6" fill="#1e222b" stroke="#a37a34" strokeWidth="2" />
                <text x="15%" y="20%" fill="#a37a34" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  VAULT ORIGIN
                </text>

                {/* Waypoint Destination Safehouse */}
                <circle cx="82%" cy="75%" r="8" fill="#1e222b" stroke="#10b981" strokeWidth="2" />
                <text x="82%" y="88%" fill="#10b981" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  {currentOrder.customer.city.toUpperCase()} SAFEHOUSE
                </text>

                {/* Dynamic Live Courier Beacon */}
                <circle
                  cx={`${currentOrder.courier.coords.x}%`}
                  cy={`${currentOrder.courier.coords.y}%`}
                  r="24"
                  fill="url(#radarGlow)"
                  className="animate-ping"
                  style={{ transformOrigin: `${currentOrder.courier.coords.x}% ${currentOrder.courier.coords.y}%` }}
                />
                <circle
                  cx={`${currentOrder.courier.coords.x}%`}
                  cy={`${currentOrder.courier.coords.y}%`}
                  r="8"
                  fill="#c01525"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </svg>

              {/* Dynamic Courier Overlay Tooltip */}
              <div
                className="absolute z-20 transform -translate-x-1/2 -translate-y-12 transition-all duration-700 pointer-events-auto"
                style={{
                  left: `${currentOrder.courier.coords.x}%`,
                  top: `${currentOrder.courier.coords.y}%`
                }}
              >
                <div className="px-2 py-1 rounded bg-black/90 border border-red-500/80 text-[10px] font-mono text-white whitespace-nowrap shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span>{currentOrder.courier.code}</span>
                  <span className="text-amber-400">({currentOrder.courier.etaMinutes}m ETA)</span>
                </div>
              </div>
            </div>

            {/* Bottom Radar Bar */}
            <div className="z-10 flex flex-wrap items-center justify-between gap-2 text-xs bg-black/80 backdrop-blur-sm p-2.5 rounded border border-stone-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-stone-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-mono text-[11px]">{currentOrder.customer.address}, {currentOrder.customer.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-stone-400 text-[11px]">Encrypted Comm:</span>
                <a
                  href={`tel:${currentOrder.courier.phone}`}
                  className="font-mono text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  {currentOrder.courier.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="p-4 sm:p-5 rounded-lg bg-stone-900/40 border border-stone-800 space-y-4">
            <h3 className="font-display text-xs font-bold text-stone-300 uppercase tracking-wider">
              Brotherhood Chronological Progression
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {stages.map((stage, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div
                    key={stage.key}
                    className={`p-3 rounded border text-xs flex flex-col justify-between transition-all ${
                      isCurrent
                        ? 'bg-red-950/60 border-red-600 text-white shadow-md'
                        : isPassed
                        ? 'bg-stone-900/80 border-stone-700 text-stone-200'
                        : 'bg-stone-950/40 border-stone-800/40 text-stone-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] uppercase">0{idx + 1}</span>
                        {isPassed && <CheckCircle2 className="w-3 h-3 text-red-500" />}
                      </div>
                      <div className="font-semibold text-xs leading-snug">{stage.label}</div>
                    </div>
                    <div className="text-[10px] text-stone-400 mt-2">{stage.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Items & Invoice Action */}
          <div className="p-4 sm:p-5 rounded-lg bg-stone-900/40 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono text-stone-400 uppercase">Items Sealed in Satchel</div>
              <div className="mt-1 flex flex-wrap gap-2">
                {currentOrder.items.map((it, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-xs text-stone-300 font-mono"
                  >
                    {it.quantity}x {it.product.name}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                playAnimusSound('click');
                setInvoiceOrder(currentOrder);
              }}
              className="px-4 py-2 rounded bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>View Brotherhood Scroll Invoice</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
