import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldAlert, CheckCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-fadeIn pointer-events-none">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#0e1017] border border-amber-900/60 shadow-2xl text-stone-100 text-xs font-mono max-w-sm backdrop-blur-md">
        {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
        {toast.type === 'warn' && <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />}
        {toast.type === 'info' && <Info className="w-4 h-4 text-red-400 shrink-0" />}
        <span className="leading-snug">{toast.message}</span>
      </div>
    </div>
  );
};
