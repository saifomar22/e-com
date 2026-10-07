import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_SUPPORT, BKASH_CONFIG } from '../data/products';
import { X, MessageSquare, Phone, Mail, ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const SupportDrawer: React.FC = () => {
  const { isSupportOpen, setIsSupportOpen, setIsBkashGuideOpen } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!isSupportOpen) return null;

  const faqs = [
    {
      q: 'How do I pay with bKash and where is the bKash number?',
      a: `Our official bKash merchant number is ${BKASH_CONFIG.merchantNumber}. During checkout, send the order total amount with reference "CREED", then paste the 10-character Transaction ID (TrxID) in the verification box to immediately dispatch your courier.`
    },
    {
      q: 'Is courier delivery stealthy and discreet?',
      a: 'Yes. All armaments and relics are vacuum-sealed in plain, unmarked shockproof boxes. No weapon illustrations or visible tags appear on the outer container.'
    },
    {
      q: 'How does real-time order tracking work?',
      a: 'Once your bKash payment is verified, your order is assigned to an encrypted courier (e.g. Brother Tariq). You can view the live GPS radar map, ETA countdown, and contact the courier directly via phone.'
    },
    {
      q: 'Are the Damascus blades real and functional?',
      a: 'All blades are forged from genuine 1095 & 15N20 folded Damascus steel or tempered 5160 carbon spring steel. They are battle-balanced and heat-treated to 58–60 HRC hardness.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0d13] border-l border-stone-800 flex flex-col justify-between text-stone-200 shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-[#07080b]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <h2 className="font-display text-base font-bold text-stone-100 uppercase tracking-wider">
                Brotherhood Support Dispatch
              </h2>
            </div>
            <button
              onClick={() => {
                playAnimusSound('click');
                setIsSupportOpen(false);
              }}
              className="p-1.5 rounded hover:bg-stone-900 text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="space-y-3">
              <a
                href={STORE_SUPPORT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-600/60 hover:bg-emerald-950/70 text-emerald-200 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-white block">Direct WhatsApp Dispatch</span>
                    <span className="text-[11px] text-emerald-300 font-mono">Instant Support · {STORE_SUPPORT.phone}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={`tel:${STORE_SUPPORT.phone}`}
                className="p-3.5 rounded-lg bg-stone-900/60 border border-stone-800 hover:border-amber-900/60 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center font-bold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-stone-100 block">Hotline Call Assistance</span>
                    <span className="text-[11px] text-stone-400 font-mono">bKash & Logistics: {STORE_SUPPORT.phone}</span>
                  </div>
                </div>
              </a>
            </div>

            {/* bKash Fast Track Info */}
            <div className="p-4 rounded-lg bg-[#e2136e]/10 border border-[#e2136e]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#ff4b98]">bKash Payment Support</span>
                <span className="text-[10px] font-mono text-stone-400">Merchant Account</span>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                Need verification for an existing payment or sent money to <b className="text-white">{BKASH_CONFIG.merchantNumber}</b>? Our automated webhook verifies transactions instantly, or contact us for live assistance.
              </p>
              <button
                onClick={() => {
                  playAnimusSound('click');
                  setIsSupportOpen(false);
                  setIsBkashGuideOpen(true);
                }}
                className="text-xs text-[#ff61a6] font-semibold hover:underline block pt-1"
              >
                Open Full bKash Payment Guide →
              </button>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-2.5">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-stone-400">
                Frequently Asked Inquiries
              </h3>

              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="rounded border border-stone-800 bg-stone-900/30 overflow-hidden text-xs">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full p-3 text-left font-semibold text-stone-200 flex items-center justify-between hover:bg-stone-800/40"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-amber-500 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="p-3 pt-0 text-[11px] text-stone-400 leading-relaxed border-t border-stone-800/60 bg-black/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-800 bg-[#07080b] flex items-center justify-between text-[11px] text-stone-500 font-mono">
            <span>24/7 Brotherhood Support</span>
            <span>Masyaf Armory Desk</span>
          </div>

        </div>
      </div>
    </div>
  );
};
