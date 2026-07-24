import React from 'react';
import { Laptop, Download, WifiOff, Zap } from 'lucide-react';

export const DesktopAppInstallShowcase: React.FC = () => {
  return (
    <div className="theme-glacial-frost p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-teal-600 uppercase tracking-wider">
            <Laptop className="w-4 h-4" />
            <span>Section 21 Native Desktop PWA Showcase</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">Install FleetPulse-AI as a Desktop Application</h3>
        </div>

        <button
          onClick={() => alert("FleetPulse-AI Desktop App Installation Package Triggered!")}
          className="btn-spring px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-sm"
        >
          <Download className="w-4 h-4 text-teal-400" />
          <span>Install Native Desktop App</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
          <div className="font-bold text-slate-900 flex items-center space-x-1.5">
            <Laptop className="w-4 h-4 text-teal-600" />
            <span>Standalone Window Experience</span>
          </div>
          <p className="text-slate-500 text-[11px]">Zero browser address bar clutter, dedicated taskbar icon, instant launch.</p>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
          <div className="font-bold text-slate-900 flex items-center space-x-1.5">
            <WifiOff className="w-4 h-4 text-teal-600" />
            <span>Offline Resilience (PWA Caching)</span>
          </div>
          <p className="text-slate-500 text-[11px]">IndexedDB offline telematics caching when driving through dead zones.</p>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
          <div className="font-bold text-slate-900 flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-teal-600" />
            <span>Sub-Millisecond Startup</span>
          </div>
          <p className="text-slate-500 text-[11px]">Speculation rules pre-rendering for 0ms teleportation speed.</p>
        </div>
      </div>
    </div>
  );
};
