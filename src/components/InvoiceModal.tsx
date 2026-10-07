import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Printer, ShieldCheck, Download } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const InvoiceModal: React.FC = () => {
  const { invoiceOrder, setInvoiceOrder, formatPrice } = useStore();

  if (!invoiceOrder) return null;

  const handlePrint = () => {
    playAnimusSound('click');
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e1017] border border-amber-900/60 rounded-lg shadow-2xl text-stone-200 p-6 sm:p-8 space-y-6">
        
        {/* Top Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-amber-400">
              Brotherhood Official Requisition Scroll
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded bg-stone-900 border border-stone-800 hover:border-stone-600 text-stone-300 hover:text-white"
              title="Print Scroll"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playAnimusSound('click');
                setInvoiceOrder(null);
              }}
              className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll Body */}
        <div className="space-y-6 font-mono text-xs">
          
          {/* Header Info */}
          <div className="flex justify-between items-start">
            <div>
              <div className="font-display text-lg font-bold text-stone-100 uppercase">
                Sanctum of the Creed
              </div>
              <div className="text-stone-500 text-[11px] mt-0.5">
                Masyaf Central Smithy & Reliquary Guild
              </div>
              <div className="text-stone-500 text-[11px]">
                bKash Merchant Account: 01712-889900
              </div>
            </div>

            <div className="text-right">
              <div className="text-stone-400 text-[11px]">Requisition Number</div>
              <div className="text-base font-bold text-amber-400">{invoiceOrder.id}</div>
              <div className="text-stone-500 text-[11px]">{invoiceOrder.createdAt}</div>
            </div>
          </div>

          {/* Recipient Details */}
          <div className="p-3.5 rounded bg-stone-950 border border-stone-800 grid grid-cols-2 gap-4">
            <div>
              <div className="text-stone-500 uppercase text-[10px]">Safehouse Destination</div>
              <div className="font-bold text-stone-200 mt-0.5">{invoiceOrder.customer.name}</div>
              <div className="text-stone-400 text-[11px]">{invoiceOrder.customer.address}</div>
              <div className="text-stone-400 text-[11px]">{invoiceOrder.customer.city}, {invoiceOrder.customer.postalCode}</div>
              <div className="text-stone-400 text-[11px]">Phone: {invoiceOrder.customer.phone}</div>
            </div>

            <div>
              <div className="text-stone-500 uppercase text-[10px]">Payment Verification</div>
              <div className="text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>bKash Verified</span>
              </div>
              <div className="text-stone-400 text-[11px]">
                TrxID: <span className="text-[#ff4b98] font-bold">{invoiceOrder.payment.bkashTrxId || 'COD'}</span>
              </div>
              <div className="text-stone-400 text-[11px]">
                Status: <span className="text-amber-400 capitalize">{invoiceOrder.status.replace(/_/g, ' ')}</span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-stone-800 rounded overflow-hidden">
            <div className="grid grid-cols-12 bg-stone-900 p-2 text-stone-400 text-[10px] uppercase font-bold">
              <div className="col-span-6">Armory Artifact</div>
              <div className="col-span-2 text-center">Era</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Price</div>
            </div>

            <div className="divide-y divide-stone-800/80 bg-stone-950/60">
              {(invoiceOrder.items || []).map((it, idx) => (
                <div key={idx} className="grid grid-cols-12 p-2.5 text-stone-200 items-center">
                  <div className="col-span-6 font-medium text-stone-100 truncate">{it.product?.name || 'Armory Artifact'}</div>
                  <div className="col-span-2 text-center text-stone-400 text-[11px] truncate">{(it.product?.era || 'Universal Era').split(',')[0]}</div>
                  <div className="col-span-2 text-center">{it.quantity}</div>
                  <div className="col-span-2 text-right tabular-nums">{formatPrice((it.product?.priceBDT || 0) * it.quantity)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Breakdown */}
          <div className="space-y-1.5 pt-2 border-t border-stone-800 text-stone-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-stone-200 tabular-nums">{formatPrice(invoiceOrder.subtotalBDT)}</span>
            </div>
            <div className="flex justify-between">
              <span>Encrypted Courier Dispatch</span>
              <span className="text-stone-200">{invoiceOrder.deliveryFeeBDT === 0 ? 'Free' : formatPrice(invoiceOrder.deliveryFeeBDT)}</span>
            </div>
            {invoiceOrder.discountBDT > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Brotherhood Oath Discount</span>
                <span>-{formatPrice(invoiceOrder.discountBDT)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-stone-100">
              <span>Total Paid via bKash</span>
              <span className="text-amber-400 tabular-nums">{formatPrice(invoiceOrder.totalBDT)}</span>
            </div>
          </div>

          {/* Mentor Seal Stamp */}
          <div className="pt-4 flex items-center justify-between text-[11px] text-stone-500">
            <div className="italic font-display">
              "Nothing is true, everything is permitted."
            </div>
            <div className="text-right">
              <span className="text-red-500 font-bold block uppercase">Brotherhood Master Smith Stamp</span>
              <span>Authorized Masyaf Vault</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
