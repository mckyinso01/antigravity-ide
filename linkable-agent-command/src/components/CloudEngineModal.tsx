import React from 'react';
import { Cloud, ShieldCheck, X } from 'lucide-react';
import { CloudEngineTelemetry } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  telemetry: CloudEngineTelemetry;
}

export const CloudEngineModal: React.FC<Props> = ({ isOpen, onClose, telemetry }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-white/15 p-6 relative overflow-hidden shadow-2xl">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                24/7 Google Cloud Run Service Engine
              </h3>
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                STATUS: ONLINE_24_7 (PC-Independent)
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Technical Architecture Specs */}
        <div className="space-y-3 font-mono text-xs mb-6">
          <div className="p-3 rounded-xl bg-[#030712]/90 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400">Cloud Service Container:</span>
            <span className="text-white font-bold">{telemetry.serviceName}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#030712]/90 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400">GCP Region:</span>
            <span className="text-cyan-400">{telemetry.region}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#030712]/90 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400">Google Cloud Scheduler:</span>
            <span className="text-indigo-400 font-bold">cron(*/10 * * * *)</span>
          </div>

          <div className="p-3 rounded-xl bg-[#030712]/90 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400">Auto-Restart & SLA:</span>
            <span className="text-emerald-400 font-bold">99.98% High Availability</span>
          </div>
        </div>

        {/* Informational Callout */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-slate-300 font-sans leading-relaxed mb-6">
          <div className="font-bold text-emerald-400 font-mono mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> 24/7 Serverless Execution Guarantee
          </div>
          Ang buong lead parser daemon at follow-up dispatcher ay naka-deploy sa Google Cloud serverless container. Kahit i-shut down o i-restart ang iyong PC, patuloy itong magbabantay ng replies at magpapadala ng follow-ups ayon sa schedule.
        </div>

        {/* Modal Action Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-bold transition-all"
          >
            Close Telemetry View
          </button>
        </div>
      </div>
    </div>
  );
};
