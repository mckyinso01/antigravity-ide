import React from 'react';
import { Cloud, Zap, Shield, Bell, RefreshCw } from 'lucide-react';
import { CloudEngineTelemetry } from '../types';

interface Props {
  telemetry: CloudEngineTelemetry;
  onToggleAutoPilot: () => void;
  onOpenCloudModal: () => void;
  onOpenTelegramModal: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const HeaderNavbar: React.FC<Props> = ({
  telemetry,
  onToggleAutoPilot,
  onOpenCloudModal,
  onOpenTelegramModal,
  onRefresh,
  isRefreshing,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030712]/90 backdrop-blur-xl px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
      {/* Brand Identity */}
      <div className="flex items-center gap-3.5">
        <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-cyan via-accent-electric to-blue-600 p-[1px] shadow-[0_0_20px_rgba(0,245,255,0.4)]">
          <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center font-bold font-display text-accent-cyan text-base">
            ⚡
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#030712] animate-radar" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold font-display tracking-tight text-white flex items-center gap-1.5">
              LinkableAI
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-cyan-950/80 text-accent-cyan border border-cyan-500/30">
                COMMAND_OS
              </span>
            </h1>
          </div>
          <p className="text-[11px] font-mono text-slate-400">
            24/7 Autonomous Agentic Lead & Outreach Cloud Engine
          </p>
        </div>
      </div>

      {/* Cloud & Telemetry Indicators */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* 24/7 Cloud Status Pill */}
        <button
          onClick={onOpenCloudModal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500 transition-all text-xs font-mono group"
        >
          <Cloud className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="text-slate-300">CLOUD_RUN:</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            24/7 ACTIVE
          </span>
        </button>

        {/* Deliverability Shield */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>SHIELD:</span>
          <span className="text-cyan-400 font-bold">100% HEALTHY</span>
        </div>

        {/* Telegram Instant Mobile Alert Button */}
        <button
          onClick={onOpenTelegramModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-indigo-500/30 hover:border-indigo-400 transition-all text-xs font-mono text-indigo-300"
        >
          <Bell className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
          <span>MOBILE_ALERTS</span>
        </button>

        {/* Auto-Pilot Toggle Button */}
        <button
          onClick={onToggleAutoPilot}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
            telemetry.autoPilotEnabled
              ? 'bg-gradient-to-r from-accent-cyan to-blue-600 text-black shadow-[0_0_15px_rgba(0,245,255,0.4)]'
              : 'bg-slate-800 text-slate-400 border border-white/10'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          {telemetry.autoPilotEnabled ? 'AUTO-PILOT: ON' : 'MANUAL REVIEW'}
        </button>

        {/* Sync / Refresh */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-2 rounded-xl bg-slate-900/80 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all disabled:opacity-50"
          title="Refresh Live Telemetry"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-accent-cyan' : ''}`} />
        </button>
      </div>
    </header>
  );
};
