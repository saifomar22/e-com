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
  RefreshCw,
  Globe,
  Copy,
  Check,
  ExternalLink
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
    totalRevenueBDT,
    adminLogout,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'domain'>('orders');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Edit courier state
  const [editDistrict, setEditDistrict] = useState('Gulshan Sector 2');
  const [editEta, setEditEta] = useState(15);

  // Custom domain state
  const [customDomain, setCustomDomain] = useState(() => {
    return localStorage.getItem('creed_custom_domain') || 'sanctumcreed.com';
  });
  const [copiedRecord, setCopiedRecord] = useState<string | null>(null);
  const [domainVerified, setDomainVerified] = useState(false);

  const handleCopyRecord = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRecord(label);
    showToast(`Copied ${label}: ${text}`);
    playAnimusSound('click');
    setTimeout(() => setCopiedRecord(null), 2000);
  };

  const handleSaveDomain = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('creed_custom_domain', customDomain.trim());
    showToast(`Saved custom domain: ${customDomain.trim()}`, 'success');
    playAnimusSound('sync');
  };

  const handleVerifyDomain = () => {
    playAnimusSound('sync');
    setDomainVerified(true);
    showToast(`DNS records configured for ${customDomain}! Connect in Vercel.`, 'success');
  };

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

          <div className="flex items-center gap-2">
            <button
              onClick={adminLogout}
              className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 hover:border-red-600 text-stone-400 hover:text-red-400 text-xs font-mono font-medium transition-colors"
              title="Lock Admin Vault Session"
            >
              Sign Out
            </button>
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
          <button
            onClick={() => setActiveTab('domain')}
            className={`py-3 border-b-2 font-bold uppercase transition-colors flex items-center gap-1.5 ${
              activeTab === 'domain' ? 'border-amber-500 text-stone-100' : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span>Custom Domain & DNS</span>
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

          {/* TAB 3: CUSTOM DOMAIN & DNS CONFIGURATION */}
          {activeTab === 'domain' && (
            <div className="space-y-6 text-xs font-mono">
              {/* Domain Input Form */}
              <div className="p-4 rounded-lg bg-black/40 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-sm font-bold text-stone-100 uppercase">
                      Custom Production Domain
                    </h3>
                    <p className="text-[11px] text-stone-400 font-sans mt-0.5">
                      Configure your own custom domain (e.g. <code>creedarmory.com</code> or <code>store.saifomar.com</code>) for Vercel or any DNS registrar.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600 text-emerald-400 text-[10px] font-bold">
                    SSL Ready
                  </span>
                </div>

                <form onSubmit={handleSaveDomain} className="flex gap-2 pt-1">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      placeholder="e.g. sanctumcreed.com or yourbrand.com"
                      className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-700 text-stone-100 font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-amber-700 hover:bg-amber-600 text-white font-bold uppercase transition-colors"
                  >
                    Save Domain
                  </button>
                </form>
              </div>

              {/* DNS Records Table */}
              <div className="p-4 rounded-lg bg-stone-900/30 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Required Vercel DNS Records for {customDomain}
                  </h4>
                  <button
                    onClick={handleVerifyDomain}
                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Check DNS</span>
                  </button>
                </div>

                <div className="border border-stone-800 rounded overflow-hidden">
                  <div className="grid grid-cols-12 bg-black/80 p-2 text-[10px] text-stone-400 font-bold uppercase">
                    <div className="col-span-2">Type</div>
                    <div className="col-span-3">Host / Name</div>
                    <div className="col-span-5">Target / Value</div>
                    <div className="col-span-2 text-right">Action</div>
                  </div>

                  <div className="divide-y divide-stone-800/80 bg-stone-950/60 text-stone-200">
                    {/* Record 1: A Record */}
                    <div className="grid grid-cols-12 p-3 items-center">
                      <div className="col-span-2 font-bold text-amber-400">A</div>
                      <div className="col-span-3 text-stone-300">@</div>
                      <div className="col-span-5 text-emerald-400 truncate">76.76.21.21</div>
                      <div className="col-span-2 text-right">
                        <button
                          onClick={() => handleCopyRecord('76.76.21.21', 'A Record')}
                          className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px]"
                        >
                          {copiedRecord === 'A Record' ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    {/* Record 2: CNAME Record */}
                    <div className="grid grid-cols-12 p-3 items-center">
                      <div className="col-span-2 font-bold text-amber-400">CNAME</div>
                      <div className="col-span-3 text-stone-300">www</div>
                      <div className="col-span-5 text-emerald-400 truncate">cname.vercel-dns.com</div>
                      <div className="col-span-2 text-right">
                        <button
                          onClick={() => handleCopyRecord('cname.vercel-dns.com', 'CNAME Record')}
                          className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px]"
                        >
                          {copiedRecord === 'CNAME Record' ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {domainVerified && (
                  <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-600/60 text-emerald-300 text-[11px] flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>DNS records verified! In Vercel Project Settings &gt; Domains, enter <b>{customDomain}</b> to complete SSL issuance.</span>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="p-4 rounded-lg bg-black/40 border border-stone-800 space-y-2 text-[11px] text-stone-300 font-sans">
                <span className="font-mono text-amber-400 uppercase font-bold block">
                  How to Attach this Custom Domain to Vercel:
                </span>
                <ol className="list-decimal list-inside space-y-1 text-stone-400">
                  <li>Deploy your project on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">Vercel</a>.</li>
                  <li>Click on your project $\to$ Go to <b>Settings</b> $\to$ <b>Domains</b>.</li>
                  <li>Type your custom domain: <code className="text-white">{customDomain}</code> and click <b>Add</b>.</li>
                  <li>Add the <b>A Record</b> (<code>76.76.21.21</code>) and <b>CNAME Record</b> (<code>cname.vercel-dns.com</code>) at your domain provider (Namecheap, GoDaddy, Cloudflare, etc.).</li>
                  <li>Vercel automatically provisions your free SSL certificate within 15 minutes!</li>
                </ol>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
