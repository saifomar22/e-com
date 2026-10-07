import React from 'react';
import { useStore } from '../context/StoreContext';
import { PolicyType } from '../types';
import { X, ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const CommercialPoliciesModal: React.FC = () => {
  const { activePolicyModal, setActivePolicyModal } = useStore();

  if (!activePolicyModal) return null;

  const titles: Record<PolicyType, { title: string; subtitle: string; icon: any }> = {
    terms: {
      title: 'Terms of Service & Armory Regulations',
      subtitle: 'Commercial Buyer Agreement & Guild Standards',
      icon: ShieldCheck
    },
    shipping: {
      title: 'Nationwide Delivery & Stealth Logistics',
      subtitle: '64 Districts Courier Protocol & Timelines',
      icon: Truck
    },
    refund: {
      title: 'Return, Refund & Warranty Policy',
      subtitle: '7-Day Safehouse Guarantee & bKash Reversal',
      icon: RotateCcw
    },
    privacy: {
      title: 'Sanctuary Privacy & Secrecy Policy',
      subtitle: 'Encrypted Recipient Data & Cyber Compliance',
      icon: Lock
    }
  };

  const current = titles[activePolicyModal];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0c0e14] border border-amber-900/60 rounded-lg shadow-2xl text-stone-200 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-500">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-amber-500 font-bold tracking-wider">
                {current.subtitle}
              </div>
              <h3 className="font-display text-base font-bold text-stone-100 uppercase">
                {current.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playAnimusSound('click');
              setActivePolicyModal(null);
            }}
            className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Policy Content */}
        <div className="text-xs text-stone-300 space-y-4 leading-relaxed font-sans">
          {activePolicyModal === 'terms' && (
            <>
              <p>
                <b>1. Legal Ownership & Replica Certification:</b> All items sold through Sanctum of the Creed are officially cataloged collectible art pieces, functional historical stage gear, and First Civilization memorabilia. Buyers must be at least 18 years of age.
              </p>
              <p>
                <b>2. Pricing & Currency:</b> All prices are listed primarily in Bangladesh Taka (BDT ৳) with secondary USD ($) equivalents. Prices include all forging inspection duties and VAT.
              </p>
              <p>
                <b>3. bKash Payment Terms:</b> Payment is recognized only upon verification of an authorized 10-character bKash Transaction ID (TrxID) sent to Merchant account <code>01712-889900</code>. Fraudulent or recycled TrxIDs will trigger an immediate order cancellation and security log.
              </p>
              <p>
                <b>4. Code of the Creed:</b> Replicas are intended for display, historical fencing, theatrical reenactment, and private collection. We disclaim liability for unlawful usage.
              </p>
            </>
          )}

          {activePolicyModal === 'shipping' && (
            <>
              <p>
                <b>1. Delivery Coverage:</b> We provide nationwide courier delivery across all 64 districts in Bangladesh through our trusted encrypted courier network (Stealth Express & Pathao/RedX integration).
              </p>
              <p>
                <b>2. Timelines:</b>
                <br />• <b>Dhaka Metro:</b> 24 Hours guaranteed safehouse dispatch.
                <br />• <b>Chittagong & Divisional Centers:</b> 48 Hours.
                <br />• <b>Regional Upazilas:</b> 48–72 Hours.
              </p>
              <p>
                <b>3. Discreet Packaging Guarantee:</b> Every parcel is vacuum-sealed in shock-absorbent multi-layer industrial packaging with plain external labeling. No weapons imagery or sensitive markings appear on the outer package.
              </p>
              <p>
                <b>4. Free Delivery Threshold:</b> All orders exceeding ৳10,000 qualify for free express safehouse dispatch. Standard fee for smaller orders is ৳120.
              </p>
            </>
          )}

          {activePolicyModal === 'refund' && (
            <>
              <p>
                <b>1. 7-Day Inspection Period:</b> If your hidden blade mechanism, Damascus blade, or artifact exhibits a manufacturing fault upon arrival, contact us within 7 days for a 1-to-1 immediate replacement.
              </p>
              <p>
                <b>2. 2-Year Smithy Guarantee:</b> All high-carbon Damascus steel blades and spring mechanisms carry a 2-Year Guild Warranty against structural steel fracturing or mechanical failure under standard handling.
              </p>
              <p>
                <b>3. bKash Refund Protocol:</b> Approved returns are credited directly back to the customer's bKash phone number within 24 hours of item return inspection.
              </p>
              <p>
                <b>4. Return Shipping:</b> In the event of a verified defect, Sanctum of the Creed pays all return courier transit fees.
              </p>
            </>
          )}

          {activePolicyModal === 'privacy' && (
            <>
              <p>
                <b>1. Zero Surveillance:</b> We collect only the essential coordinates needed to deliver your parcel (Name, Phone, Address). We do not sell, rent, or monetize customer records under any circumstances.
              </p>
              <p>
                <b>2. Cryptographic Storage:</b> All order records, bKash transaction signatures, and recipient phone numbers are encrypted with AES-256 standard protocols.
              </p>
              <p>
                <b>3. Safehouse Purge:</b> Upon successful courier delivery confirmation, customers may request a complete erasure of their safehouse address from our database at any time.
              </p>
            </>
          )}
        </div>

        <div className="pt-3 border-t border-stone-800 flex justify-end">
          <button
            onClick={() => setActivePolicyModal(null)}
            className="px-4 py-2 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
