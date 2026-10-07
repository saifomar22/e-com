import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';
import {
  X,
  ShieldAlert,
  CheckCircle,
  PackageCheck,
  TrendingUp,
  MapPin,
  Clock,
  Trash2,
  Edit3,
  DollarSign,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const AdminPanelModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    orders,
    products,
    updateOrderStatus,
    verifyOrderPayment,
    updateCourierLocation,
    deleteOrder,
    updateProductStock,
    formatPrice,
    totalRevenueBDT
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Edit courier state
  const [editDistrict, setEditDistrict] = useState('Gulshan Sector 2');
  const [editEta, setEditEta] = useState(15);

  if (!isAdminModalOpen) return null;

  const pendingBkashOrders = orders.filter(o => o.payment.method === 'bkash' && !o.payment.isVerified);
  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');

  const handleUpdateCourier = (orderId: string) => {
    updateCourierLocation(orderId, editDistrict, editEta, { x: 65, y: 55 });
    playAnimusSound('sync');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl my-6 bg-[#090b10] border border-amber-800/80 rounded-lg shadow-2xl text-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-[#06070a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-950 border border-amber-600 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-amber-500 font-bold tracking-wider">
                Commercial Merchant Backend Console
              </div>
              <h2 className="font-display text-base sm:text-lg font-bold text-stone-100 uppercase">
                Master Smith Armory Administration
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              playAnimusSound('click');
              setIsAdminModalOpen(false);
            }}
            className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top KPI Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 border-b border-stone-800 bg-stone-950/40 text-xs font-mono">
          <div className="p-3.5 rounded bg-stone-900/60 border border-stone-800">
            <span className="text-stone-500 block text-[10px] uppercase">Gross Revenue</span>
            <span className="text-base font-bold text-amber-400 mt-1 block tabular-nums">
              {formatPrice(totalRevenueBDT)}
            </span>
          </div>

          <div className="p-3.5 rounded bg-stone-900/60 border border-stone-800">
            <span className="text-stone-500 block text-[10px] uppercase">Pending bKash Approvals</span>
            <span className={`text-base font-bold mt-1 block ${pendingBkashOrders.length > 0 ? 'text-[#ff4b98] animate-pulse' : 'text-stone-300'}`}>
              {pendingBkashOrders.length} Orders
            </span>
          </div>

          <div className="p-3.5 rounded bg-stone-900/60 border border-stone-800">
            <span className="text-stone-500 block text-[10px] uppercase">Active Dispatches</span>
            <span className="text-base font-bold text-emerald-400 mt-1 block">
              {activeOrders.length} In Transit
            </span>
          </div>

          <div className="p-3.5 rounded bg-stone-900/60 border border-stone-800">
            <span className="text-stone-500 block text-[10px] uppercase">Forged Catalog SKUs</span>
            <span className="text-base font-bold text-stone-200 mt-1 block">
              {products.length} Products Active
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-4 sm:px-6 border-b border-stone-800 bg-[#07080b] flex gap-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 border-b-2 font-bold uppercase transition-colors ${
              activeTab === 'orders' ? 'border-amber-500 text-stone-100' : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Orders & bKash Verification ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3 border-b-2 font-bold uppercase transition-colors ${
              activeTab === 'inventory' ? 'border-amber-500 text-stone-100' : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Inventory Stock Management ({products.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.map(order => (
                <div
                  key={order.id}
                  className="p-4 rounded-lg bg-stone-900/40 border border-stone-800 hover:border-stone-700 transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-stone-100">{order.id}</span>
                      <span className="text-xs text-stone-400 font-mono">· {order.createdAt}</span>
                      <span className="px-2 py-0.5 rounded bg-black border border-stone-700 text-[10px] font-mono text-amber-400 uppercase">
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-stone-300 font-semibold tabular-nums">
                        {formatPrice(order.totalBDT)}
                      </span>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="p-1.5 rounded hover:bg-red-950 text-stone-500 hover:text-red-400"
                        title="Delete order record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Customer & bKash info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-2.5 rounded bg-black/40 border border-stone-800/60">
                      <span className="text-stone-500 text-[10px] uppercase block">Customer / Safehouse</span>
                      <div className="text-stone-200 font-bold mt-0.5">{order.customer.name}</div>
                      <div className="text-stone-400 text-[11px] truncate">{order.customer.address}, {order.customer.city}</div>
                      <div className="text-stone-400 text-[11px]">Phone: {order.customer.phone}</div>
                    </div>

                    <div className="p-2.5 rounded bg-black/40 border border-stone-800/60">
                      <span className="text-stone-500 text-[10px] uppercase block">Payment & bKash TrxID</span>
                      <div className="mt-0.5 flex items-center justify-between">
                        <span className="text-[#ff4b98] font-bold">{order.payment.bkashTrxId || 'N/A'}</span>
                        {order.payment.isVerified ? (
                          <span className="text-emerald-400 text-[10px] font-bold">✓ Verified</span>
                        ) : (
                          <button
                            onClick={() => verifyOrderPayment(order.id)}
                            className="px-2 py-0.5 rounded bg-[#e2136e] hover:bg-[#c90f61] text-white text-[10px] font-bold"
                          >
                            Approve TrxID
                          </button>
                        )}
                      </div>
                      <div className="text-stone-400 text-[11px] mt-0.5">Sender: {order.payment.bkashSenderNumber || 'COD'}</div>
                    </div>

                    <div className="p-2.5 rounded bg-black/40 border border-stone-800/60">
                      <span className="text-stone-500 text-[10px] uppercase block">Workflow Stage Control</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="mt-1 w-full bg-stone-900 border border-stone-700 text-stone-200 rounded px-2 py-1 text-xs focus:outline-none"
                      >
                        <option value="verifying_payment">bKash Verification</option>
                        <option value="payment_confirmed">Payment Confirmed</option>
                        <option value="forging_armory">Armory Forging</option>
                        <option value="courier_dispatched">Courier Dispatched</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Telemetry quick updater */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800/60 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-stone-400">Courier: <b>{order.courier.name}</b> in <b>{order.courier.currentDistrict}</b> ({order.courier.etaMinutes}m ETA)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="New District"
                        value={editDistrict}
                        onChange={(e) => setEditDistrict(e.target.value)}
                        className="w-32 px-2 py-0.5 rounded bg-black border border-stone-700 text-[11px] text-stone-200"
                      />
                      <input
                        type="number"
                        placeholder="ETA"
                        value={editEta}
                        onChange={(e) => setEditEta(Number(e.target.value))}
                        className="w-14 px-2 py-0.5 rounded bg-black border border-stone-700 text-[11px] text-stone-200"
                      />
                      <button
                        onClick={() => handleUpdateCourier(order.id)}
                        className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] font-bold"
                      >
                        Update GPS
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="divide-y divide-stone-800/80">
              {products.map(prod => (
                <div key={prod.id} className="py-3.5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded object-cover border border-stone-800"
                    />
                    <div>
                      <h4 className="font-display text-xs font-semibold text-stone-100">{prod.name}</h4>
                      <div className="text-[11px] font-mono text-stone-400">
                        SKU: <span className="text-amber-400">{prod.sku}</span> · {formatPrice(prod.priceBDT)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-right">
                      <span className="text-stone-500 block text-[10px] uppercase">In Forge Stock</span>
                      <span className={`font-bold ${prod.stockCount <= 5 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {prod.stockCount} units
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateProductStock(prod.id, -1)}
                        className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => updateProductStock(prod.id, 5)}
                        className="px-2.5 py-1 rounded bg-amber-900/60 hover:bg-amber-800 border border-amber-700 text-amber-200 font-bold"
                      >
                        +5 Stock
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
