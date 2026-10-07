import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BKASH_CONFIG } from '../data/products';
import { X, Copy, Check, Smartphone, ShieldCheck, QrCode, ArrowRight } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const BkashInfoModal: React.FC = () => {
  const { isBkashGuideOpen, setIsBkashGuideOpen, showToast } = useStore();
  const [copied, setCopied] = useState(false);

  if (!isBkashGuideOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(BKASH_CONFIG.merchantNumber);
    setCopied(true);
    showToast(`Copied bKash Number: ${BKASH_CONFIG.merchantNumber}`, 'success');
    playAnimusSound('click');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0e0a12] border border-[#e2136e]/50 rounded-lg shadow-2xl text-stone-200 p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2d88] animate-ping" />
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#ff61a6]">
              bKash Mobile Payment Integration
            </h3>
          </div>
          <button
            onClick={() => {
              playAnimusSound('click');
              setIsBkashGuideOpen(false);
            }}
            className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Number Box */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-[#2a0b1c] to-[#160610] border border-[#e2136e]/60 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-[#ff80ba] uppercase">Official Sanctum Merchant</div>
            <div className="text-xl font-mono font-bold text-white tracking-wider mt-0.5">
              {BKASH_CONFIG.merchantNumber}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              Account Type: <b>bKash Merchant</b> · 24/7 Webhook
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-2 rounded bg-[#e2136e] hover:bg-[#c90f61] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Simulated QR Code for Mobile Scanning */}
        <div className="p-4 rounded bg-black/60 border border-stone-800 flex items-center gap-4">
          <div className="w-24 h-24 bg-white p-1.5 rounded flex items-center justify-center shrink-0">
            {/* SVG Representation of bKash QR code */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect width="100" height="100" fill="white" />
              {/* Corner markers */}
              <rect x="5" y="5" width="30" height="30" fill="#e2136e" />
              <rect x="10" y="10" width="20" height="20" fill="white" />
              <rect x="15" y="15" width="10" height="10" fill="#e2136e" />

              <rect x="65" y="5" width="30" height="30" fill="#e2136e" />
              <rect x="70" y="10" width="20" height="20" fill="white" />
              <rect x="75" y="15" width="10" height="10" fill="#e2136e" />

              <rect x="5" y="65" width="30" height="30" fill="#e2136e" />
              <rect x="10" y="70" width="20" height="20" fill="white" />
              <rect x="15" y="75" width="10" height="10" fill="#e2136e" />

              {/* Data modules */}
              <rect x="42" y="10" width="16" height="8" fill="#e2136e" />
              <rect x="45" y="25" width="10" height="10" fill="#e2136e" />
              <rect x="42" y="45" width="16" height="16" fill="#e2136e" />
              <rect x="65" y="45" width="10" height="10" fill="#e2136e" />
              <rect x="80" y="65" width="12" height="12" fill="#e2136e" />
              <rect x="45" y="75" width="12" height="12" fill="#e2136e" />
            </svg>
          </div>

          <div className="text-xs text-stone-300">
            <div className="font-bold text-white flex items-center gap-1.5 mb-1">
              <QrCode className="w-3.5 h-3.5 text-[#ff4b98]" />
              <span>Scan via bKash App</span>
            </div>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Open the bKash app on your phone, tap <b>Scan QR</b>, and point at this code to automatically populate the merchant number and checkout instantly.
            </p>
          </div>
        </div>

        {/* How It Works Steps */}
        <div className="space-y-2.5 text-xs">
          <div className="text-stone-400 font-mono uppercase text-[10px] tracking-wider">
            Step-by-step Execution
          </div>

          <div className="p-2.5 rounded bg-stone-900/40 border border-stone-800 flex gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#e2136e]/20 text-[#ff4b98] font-bold font-mono flex items-center justify-center shrink-0 text-[11px]">1</span>
            <div>
              <span className="text-stone-200 font-semibold block">Dial *247# or Open App</span>
              <span className="text-stone-400 text-[11px]">Select "Make Payment" (Merchant) or "Send Money".</span>
            </div>
          </div>

          <div className="p-2.5 rounded bg-stone-900/40 border border-stone-800 flex gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#e2136e]/20 text-[#ff4b98] font-bold font-mono flex items-center justify-center shrink-0 text-[11px]">2</span>
            <div>
              <span className="text-stone-200 font-semibold block">Enter Number & Amount</span>
              <span className="text-stone-400 text-[11px]">Enter <b>01712-889900</b>, order total amount, and Reference: <b>CREED</b>.</span>
            </div>
          </div>

          <div className="p-2.5 rounded bg-stone-900/40 border border-stone-800 flex gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#e2136e]/20 text-[#ff4b98] font-bold font-mono flex items-center justify-center shrink-0 text-[11px]">3</span>
            <div>
              <span className="text-stone-200 font-semibold block">Confirm PIN & Copy TrxID</span>
              <span className="text-stone-400 text-[11px]">Copy the 10-character SMS Transaction ID (e.g. 9AB8X7K4J2) and paste in our checkout to immediately initiate courier tracking.</span>
            </div>
          </div>
        </div>

        {/* Security badge */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-emerald-400 text-[11px] font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>SSL 256-bit Encrypted Mobile Gateway · 100% Guaranteed Transaction Security</span>
        </div>

      </div>
    </div>
  );
};
