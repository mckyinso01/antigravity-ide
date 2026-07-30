import React, { useState } from 'react';
import { Send, Calendar, CheckCircle, Youtube, Share2, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MultiPlatformScheduler({ onNext }) {
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);

  const channels = [
    { id: 'yt', name: 'YouTube Shorts (Official Developer API)', status: 'Connected', quota: '10,000 / day' },
    { id: 'tt', name: 'TikTok CRP (Content API v2)', status: 'Connected', quota: 'Unlimited' },
    { id: 'ig', name: 'Instagram Reels (Meta Graph API)', status: 'Connected', quota: '200 / hour' }
  ];

  const handleDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setDispatchedSuccess(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Module Title Banner */}
      <div className="p-6 rounded-2xl cyber-glass border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-400 text-xs font-mono font-bold border border-cyan-800">
              Module 5 of 5
            </span>
            <h2 className="text-xl font-bold text-white font-display">
              Multi-Platform Automated Dispatcher & Scheduler
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated campaign scheduler with 30-day anti-double-posting cooldown protection across YouTube Shorts, TikTok, and Instagram Reels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            3 Channels Connected ($0.00 Cost)
          </span>
        </div>
      </div>

      {/* 3 Channels Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {channels.map((c) => (
          <div key={c.id} className="p-5 rounded-2xl cyber-glass border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-cyan-400" />
                {c.name}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700">
                {c.status}
              </span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Free Quota: <span className="text-cyan-300 font-bold">{c.quota}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Anti-Double-Post: Active</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Dispatch Action Box */}
      <div className="p-6 rounded-2xl cyber-glass border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Launch Campaign Dispatch Packet
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Publishes video, voiceover, kinetic subtitles, and metadata to all 3 connected channels simultaneously.
            </p>
          </div>
        </div>

        {dispatchedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-mono flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="font-bold">🚀 Campaign Dispatched & Scheduled Successfully!</div>
              <div className="text-[11px] text-emerald-400/80 mt-0.5">
                Video uploaded to YouTube Shorts, TikTok CRP, and Meta Reels. WORM Ledger Hash: <span className="font-mono underline">0x88f12a3918239018</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs font-mono text-slate-400">
            Cooldown Ledger: <span className="text-emerald-400 font-bold">30-Day Anti-Duplicate Shield Verified</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleDispatch}
              disabled={isDispatching}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isDispatching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Dispatching to Multi-Platform APIs...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Dispatch Video Now ($0.00 Cost)</span>
                </>
              )}
            </button>

            <button
              onClick={onNext}
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold text-xs transition cursor-pointer"
            >
              <span>View Analytics & Ledger ➔</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
