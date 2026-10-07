import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BKASH_CONFIG } from '../data/products';
import { PaymentMethod } from '../types';
import { X, Copy, Check, ShieldCheck, ArrowRight, Smartphone, AlertCircle, Sparkles } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartTotalBDT,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsTrackingOpen,
    createOrder,
    profile,
    formatPrice,
    showToast
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [copiedNumber, setCopiedNumber] = useState(false);

  // Form Fields
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.safehouseAddress);
  const [city, setCity] = useState(profile.safehouseCity || 'Dhaka');
  const [postalCode, setPostalCode] = useState('1209');
  const [notes, setNotes] = useState('Leave with the Brotherhood guard at the gate');

  // bKash Specific Fields
  const [bkashSender, setBkashSender] = useState('01712334455');
  const [bkashTrxId, setBkashTrxId] = useState('');
  const [isTrxVerified, setIsTrxVerified] = useState(false);
  const [trxChecking, setTrxChecking] = useState(false);

  if (!isCheckoutOpen || cart.length === 0) return null;

  const deliveryFee = cartTotalBDT > 10000 ? 0 : 120;
  const totalAmount = cartTotalBDT + deliveryFee;

  const handleCopyBkash = () => {
    navigator.clipboard.writeText(BKASH_CONFIG.merchantNumber);
    setCopiedNumber(true);
    showToast(`Copied bKash Number: ${BKASH_CONFIG.merchantNumber}`, 'success');
    playAnimusSound('click');
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleDemoTrxId = () => {
    const randomTrx = BKASH_CONFIG.sampleTrxIds[Math.floor(Math.random() * BKASH_CONFIG.sampleTrxIds.length)];
    setBkashTrxId(randomTrx);
    setIsTrxVerified(true);
    showToast(`Generated Test bKash TrxID: ${randomTrx}`, 'info');
    playAnimusSound('sync');
  };

  const handleVerifyTrxId = () => {
    if (!bkashTrxId || bkashTrxId.trim().length < 8) {
      showToast('Please enter a valid 8-10 character bKash TrxID', 'warn');
      return;
    }
    setTrxChecking(true);
    setTimeout(() => {
      setTrxChecking(false);
      setIsTrxVerified(true);
      playAnimusSound('success');
      showToast(`bKash Gateway Verified: ৳${totalAmount.toLocaleString()} Confirmed`, 'success');
    }, 800);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      showToast('Please fulfill all safehouse delivery coordinates.', 'warn');
      return;
    }

    if (paymentMethod === 'bkash') {
      if (!bkashTrxId || bkashTrxId.trim().length < 6) {
        showToast('Please enter a valid bKash Transaction ID (e.g. 9AB8X7K4J2).', 'warn');
        return;
      }
    }

    playAnimusSound('blade');

    const newOrder = createOrder({
      customer: {
        name,
        email: profile.email,
        phone,
        address,
        city,
        postalCode,
        notes
      },
      items: cart,
      subtotalBDT: cartTotalBDT,
      deliveryFeeBDT: deliveryFee,
      discountBDT: 0,
      totalBDT: totalAmount,
      payment: {
        method: paymentMethod,
        bkashSenderNumber: paymentMethod === 'bkash' ? bkashSender : undefined,
        bkashTrxId: paymentMethod === 'bkash' ? bkashTrxId.trim().toUpperCase() : undefined,
        isVerified: paymentMethod === 'bkash' ? true : false,
        verifiedAt: new Date().toISOString()
      }
    });

    setIsCheckoutOpen(false);
    setIsTrackingOpen(true);
    showToast(`Order ${newOrder.id} successfully forged! Real-time courier dispatched.`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl my-8 bg-[#0c0e14] border border-stone-800 rounded-lg shadow-2xl text-stone-200 overflow-hidden">
        
        {/* Top Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-[#08090d]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h2 className="font-display text-base sm:text-lg font-bold text-stone-100 uppercase tracking-wider">
              Brotherhood Safehouse Checkout
            </h2>
          </div>
          <button
            onClick={() => {
              playAnimusSound('click');
              setIsCheckoutOpen(false);
            }}
            className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-7 space-y-6">
          
          {/* Section 1: Recipient Safehouse Coordinates */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono uppercase text-red-500 font-bold">01.</span>
              <h3 className="font-display text-sm font-semibold text-stone-200 uppercase">
                Safehouse Destination Coordinates
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-mono text-[11px]">Assassin / Recipient Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-mono text-[11px]">Contact Mobile Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-600 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-400 mb-1 font-mono text-[11px]">Safehouse Street Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-mono text-[11px]">City / District</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-600"
                >
                  <option value="Dhaka">Dhaka (Central Brotherhood)</option>
                  <option value="Chittagong">Chittagong Port Vault</option>
                  <option value="Sylhet">Sylhet Highlands Sanctuary</option>
                  <option value="Rajshahi">Rajshahi Outpost</option>
                  <option value="Khulna">Khulna Delta Camp</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-mono text-[11px]">Postal Code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-600 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Integration (bKash Primary) */}
          <div className="pt-4 border-t border-stone-800/80">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono uppercase text-red-500 font-bold">02.</span>
              <h3 className="font-display text-sm font-semibold text-stone-200 uppercase">
                Secure Mobile Payment Gateway
              </h3>
            </div>

            {/* Payment Method Radio Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* bKash Card */}
              <div
                onClick={() => setPaymentMethod('bkash')}
                className={`cursor-pointer p-3.5 rounded border transition-all ${
                  paymentMethod === 'bkash'
                    ? 'bg-[#e2136e]/15 border-[#e2136e] shadow-md shadow-[#e2136e]/20'
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#ff3a90]">bKash Mobile</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#e2136e] text-white text-[9px] font-bold font-mono">
                    RECOMMENDED
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-stone-300">
                  Instant Verification · 01712-889900
                </div>
              </div>

              {/* Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`cursor-pointer p-3.5 rounded border transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-950/20 border-amber-600 shadow-md'
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">Cash on Delivery</span>
                </div>
                <div className="mt-1 text-[11px] text-stone-400">
                  Pay at Safehouse Gate
                </div>
              </div>

              {/* Card / Token */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`cursor-pointer p-3.5 rounded border transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-stone-800/80 border-stone-500 shadow-md'
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-300">Precursor Card</span>
                </div>
                <div className="mt-1 text-[11px] text-stone-400">
                  Visa / Mastercard 3DS
                </div>
              </div>
            </div>

            {/* bKash Interactive Payment Box */}
            {paymentMethod === 'bkash' && (
              <div className="mt-4 p-4 rounded-lg bg-gradient-to-b from-[#180812] to-[#0d0910] border border-[#e2136e]/40 space-y-4">
                
                {/* Official bKash Number Highlight Banner */}
                <div className="p-3.5 rounded bg-[#e2136e]/20 border border-[#e2136e]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#ff61a6] font-semibold">
                      <Smartphone className="w-4 h-4 text-[#ff2d88]" />
                      Official Sanctum bKash Merchant Number
                    </div>
                    <div className="text-lg font-mono font-bold text-white tracking-wider mt-0.5">
                      {BKASH_CONFIG.merchantNumber}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      bKash Merchant Account · 24/7 Real-Time Automated Webhook
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyBkash}
                      className="px-3 py-1.5 rounded bg-[#e2136e] hover:bg-[#d01064] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {copiedNumber ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedNumber ? 'Copied!' : 'Copy Number'}</span>
                    </button>
                  </div>
                </div>

                {/* Step-by-Step Payment Instructions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-stone-300">
                  <div className="p-2.5 rounded bg-black/40 border border-stone-800">
                    <span className="text-red-400 font-bold block mb-0.5">Step 1</span>
                    Dial *247# or open bKash App, select <b>Make Payment</b> or <b>Send Money</b>.
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-stone-800">
                    <span className="text-red-400 font-bold block mb-0.5">Step 2</span>
                    Enter <b>{BKASH_CONFIG.merchantNumber}</b> and amount <b>{formatPrice(totalAmount)}</b>. Reference: <b>CREED</b>.
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-stone-800">
                    <span className="text-red-400 font-bold block mb-0.5">Step 3</span>
                    Confirm with your PIN. Paste your 10-digit <b>Transaction ID (TrxID)</b> below.
                  </div>
                </div>

                {/* Sender & TrxID Input Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                  <div>
                    <label className="block text-stone-400 mb-1 font-mono text-[11px]">Your bKash Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 01712334455"
                      value={bkashSender}
                      onChange={(e) => setBkashSender(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-black border border-stone-800 text-stone-100 font-mono focus:outline-none focus:border-[#e2136e]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-stone-400 font-mono text-[11px]">bKash TrxID (Transaction ID)</label>
                      <button
                        type="button"
                        onClick={handleDemoTrxId}
                        className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        Generate Demo TrxID
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="e.g. 9AB8X7K4J2"
                        value={bkashTrxId}
                        onChange={(e) => {
                          setBkashTrxId(e.target.value.toUpperCase());
                          setIsTrxVerified(false);
                        }}
                        className="w-full px-3 py-2 rounded bg-black border border-stone-800 text-stone-100 font-mono tracking-wider focus:outline-none focus:border-[#e2136e]"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyTrxId}
                        disabled={trxChecking || isTrxVerified}
                        className={`px-3 py-2 rounded text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
                          isTrxVerified
                            ? 'bg-emerald-900/60 border border-emerald-600 text-emerald-300'
                            : 'bg-[#e2136e] hover:bg-[#c90f61] text-white'
                        }`}
                      >
                        {trxChecking ? 'Verifying...' : isTrxVerified ? '✓ Verified' : 'Verify TrxID'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Verification Confirmation Banner */}
                {isTrxVerified && (
                  <div className="p-3 rounded bg-emerald-950/40 border border-emerald-600/60 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      <b>bKash Payment Verified!</b> Transaction ID <b>{bkashTrxId}</b> is confirmed with Sanctum Merchant {BKASH_CONFIG.merchantNumber}.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 3: Order Cost Summary */}
          <div className="p-4 rounded bg-stone-900/40 border border-stone-800/80 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-stone-400">
              <span>Items Total ({cart.reduce((a, b) => a + b.quantity, 0)} weapons/relics)</span>
              <span className="text-stone-200 tabular-nums">{formatPrice(cartTotalBDT)}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Encrypted Courier Dispatch</span>
              <span className="text-stone-200">{deliveryFee === 0 ? 'Free Brotherhood Courier' : formatPrice(deliveryFee)}</span>
            </div>
            <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-stone-100">
              <span>Final Total to Pay</span>
              <span className="text-amber-400 font-mono tabular-nums">{formatPrice(totalAmount)}</span>
            </div>
          </div>

          {/* Final Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded bg-red-700 hover:bg-red-600 text-white font-display font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xl shadow-red-950"
          >
            <span>Seal Order & Launch Real-Time Courier Tracking</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-center text-stone-500 font-mono">
            Protected by the Creed Code of Honor · Real-Time GPS Tracking Enabled
          </p>
        </form>

      </div>
    </div>
  );
};
