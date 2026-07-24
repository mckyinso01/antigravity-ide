import React from 'react';
import { X, Sparkles, Cpu, Radio, ShieldCheck } from 'lucide-react';

interface WebGPU3DRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebGPU3DRadarModal: React.FC<WebGPU3DRadarModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-6 animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Stage 11 Heavy Upgrade</span>
              <h3 className="text-xl font-extrabold text-slate-900">WebGPU 3D Quantum Spatial Fleet Telematics Radar</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold btn-spring">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulated WebGPU Spatial Canvas View */}
        <div className="relative h-64 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:16px_16px] opacity-30 animate-pulse"></div>
          
          <div className="relative z-10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 border-2 border-teal-400 flex items-center justify-center mx-auto animate-ping">
              <Radio className="w-8 h-8 text-teal-300" />
            </div>
            <p className="text-xs font-bold text-teal-300 tracking-wider uppercase font-mono">
              WebGPU Compute Shader Engine Rendering 450 Transport Nodes @ 120 FPS
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 block">GPU Acceleration</span>
            <p className="text-slate-500 text-[11px]">Compute shaders process 450 vehicle telemetry vectors with 0 CPU overhead.</p>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 block">Spatial Collision Radar</span>
            <p className="text-slate-500 text-[11px]">Predictive 3D airspace & highway proximity detection within 0.5 miles.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
