import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Lock, ShieldAlert, KeyRound, Eye, EyeOff, Sparkles } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminLoginOpen,
    setIsAdminLoginOpen,
    adminLogin
  } = useStore();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isAdminLoginOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      const success = adminLogin(loginId, password);
      if (!success) {
        setErrorShake(true);
        setTimeout(() => setErrorShake(false), 800);
      } else {
        setLoginId('');
        setPassword('');
      }
    }, 450);
  };

  const handleAutofillCredentials = () => {
    playAnimusSound('click');
    setLoginId('mentor_saif');
    setPassword('CreedVault#2026@Masyaf');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-md bg-[#0a0c10] border border-red-900/60 rounded-xl shadow-2xl text-stone-200 overflow-hidden ${
          errorShake ? 'animate-shake border-red-600' : ''
        }`}
      >
        {/* Top Decorative Border */}
        <div className="h-1 bg-gradient-to-r from-red-800 via-amber-500 to-red-800" />

        {/* Close */}
        <button
          onClick={() => {
            playAnimusSound('click');
            setIsAdminLoginOpen(false);
          }}
          className="absolute top-4 right-4 p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-500 mx-auto shadow-lg shadow-red-950/50">
              <Lock className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono uppercase text-red-400 tracking-widest font-bold">
              Restricted Vault Authorization
            </div>
            <h2 className="font-display text-lg font-bold text-stone-100 uppercase tracking-wide">
              Master Smith Security Gate
            </h2>
            <p className="text-xs text-stone-400 leading-relaxed max-w-xs mx-auto">
              Access to real-time bKash ledger, live courier GPS control, and stock inventory requires Council clearance.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-stone-400 mb-1 text-[11px] uppercase">Master Login ID</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. mentor_saif"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-red-600 font-mono tracking-wide"
                />
                <KeyRound className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-stone-400 mb-1 text-[11px] uppercase">Vault Security Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter vault password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-red-600 font-mono tracking-wide"
                />
                <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3 rounded bg-red-700 hover:bg-red-600 text-white font-display font-semibold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-red-950 flex items-center justify-center gap-2"
            >
              {isAuthenticating ? 'Decrypting Security Seal...' : 'Verify & Unlock Vault'}
            </button>
          </form>

          {/* Discreet Credentials Helper for the Owner */}
          <div className="p-3 rounded bg-stone-950/80 border border-stone-800/80 space-y-2 text-[11px]">
            <div className="flex items-center justify-between text-stone-400">
              <span className="font-mono text-[10px] uppercase text-amber-400">Generated Vault Credentials:</span>
              <button
                type="button"
                onClick={handleAutofillCredentials}
                className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 font-mono"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto-fill</span>
              </button>
            </div>
            <div className="font-mono text-stone-300 space-y-0.5 bg-black/60 p-2 rounded border border-stone-800/60">
              <div>Login ID: <code className="text-amber-400 font-bold">mentor_saif</code></div>
              <div>Password: <code className="text-amber-400 font-bold">CreedVault#2026@Masyaf</code></div>
            </div>
            <div className="text-[10px] text-stone-500 leading-tight">
              Secret Shortcut: Press <code className="text-stone-400">Ctrl+Shift+A</code> anywhere or navigate to <code className="text-stone-400">#admin</code> to trigger this gate.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
