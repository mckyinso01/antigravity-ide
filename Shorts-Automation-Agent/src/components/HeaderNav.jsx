import React from 'react';
import { Video, Zap, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

export default function HeaderNav({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#030712]/90 backdrop-blur-xl px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('script')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
              <Video className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white font-display">
                Antigravity<span className="gradient-text-emerald">Shorts Studio</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold font-mono rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                v2.4 Cyber-Glass
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Autonomous $0.00 Open-Source & AI Short-Form Video Generator
            </p>
          </div>
        </div>

        {/* System Badges & Telemetry */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs font-mono">
            <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>0-Quota AI Engine Active ($0.00 Cost)</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Stripe LIVE Connected</span>
          </div>

          <a 
            href="https://gatzdevs.surge.sh" 
            target="_blank" 
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Target</span>
          </a>
        </div>
      </div>
    </header>
  );
}
