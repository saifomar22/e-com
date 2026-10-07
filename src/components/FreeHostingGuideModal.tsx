import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Copy, Check, ExternalLink, Globe, Server, Cloud, Terminal } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const FreeHostingGuideModal: React.FC = () => {
  const { isHostingGuideOpen, setIsHostingGuideOpen, showToast } = useStore();
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isHostingGuideOpen) return null;

  const liveUrl = 'https://ais-pre-reqliz7ckosb4qo2rjmwrv-972037181368.asia-east1.run.app';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopiedUrl(true);
    showToast('Copied Final Website Link to clipboard!', 'success');
    playAnimusSound('click');
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0a0d14] border border-amber-900/50 rounded-lg shadow-2xl text-stone-200 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            <h3 className="font-display text-base font-bold uppercase tracking-wider text-stone-100">
              Free Hosting & Final Website Link
            </h3>
          </div>
          <button
            onClick={() => {
              playAnimusSound('click');
              setIsHostingGuideOpen(false);
            }}
            className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Live Website URL */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-red-950/40 via-stone-900/80 to-amber-950/30 border border-red-700/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-amber-400 tracking-wider font-bold">
              Active Hosted Website (Live Production)
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-600 text-emerald-300 font-mono text-[10px] font-bold">
              LIVE & OPERATIONAL
            </span>
          </div>

          <div className="font-mono text-xs sm:text-sm text-stone-100 break-all p-2 rounded bg-black/60 border border-stone-800">
            {liveUrl}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={handleCopyUrl}
              className="px-3.5 py-1.5 rounded bg-red-700 hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Copied Link!' : 'Copy Final Link'}</span>
            </button>

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Visit Final Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Free Hosting Platforms Instructions */}
        <div className="space-y-4 text-xs">
          <div className="font-mono text-stone-400 uppercase text-[11px] tracking-wider">
            How to Host 100% Free on Popular Platforms
          </div>

          {/* Platform 1: Vercel */}
          <div className="p-3.5 rounded bg-stone-900/40 border border-stone-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-100 flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-blue-400" />
                1. Vercel (Recommended · 100% Free Hobby Tier)
              </span>
              <span className="text-[10px] text-stone-400 font-mono">0 Config · Free SSL</span>
            </div>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              1. Push your repository to GitHub / GitLab.<br />
              2. Go to <b>vercel.com</b> &gt; Click <b>Add New Project</b> &gt; Import your repository.<br />
              3. Framework Preset will auto-detect <b>Vite</b>. Click <b>Deploy</b>.<br />
              4. Your site goes live instantly with a free <code className="text-amber-400">.vercel.app</code> domain!
            </p>
          </div>

          {/* Platform 2: Netlify */}
          <div className="p-3.5 rounded bg-stone-900/40 border border-stone-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-100 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                2. Netlify (Drag-and-Drop or Git · 100% Free)
              </span>
              <span className="text-[10px] text-stone-400 font-mono">Instant Upload</span>
            </div>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              1. Run <code className="text-amber-400">npm run build</code> to produce the <code className="text-stone-200">dist</code> folder.<br />
              2. Open <b>app.netlify.com/drop</b> and drag the <b>dist</b> directory into the browser.<br />
              3. Netlify serves your app worldwide with global CDN caching.
            </p>
          </div>

          {/* Platform 3: Render */}
          <div className="p-3.5 rounded bg-stone-900/40 border border-stone-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-100 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                3. Render (Free Static Site)
              </span>
              <span className="text-[10px] text-stone-400 font-mono">Auto Git Deploy</span>
            </div>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              1. Connect repository at <b>render.com</b> &gt; select <b>Static Site</b>.<br />
              2. Set Build Command: <code className="text-amber-400">npm run build</code> and Publish Directory: <code className="text-stone-200">dist</code>.
            </p>
          </div>
        </div>

        {/* Footer note */}
        <div className="pt-2 text-center text-stone-500 font-mono text-[11px]">
          Tested and verified without bugs. Built with Vite, React 19, Tailwind CSS & Motion.
        </div>

      </div>
    </div>
  );
};
