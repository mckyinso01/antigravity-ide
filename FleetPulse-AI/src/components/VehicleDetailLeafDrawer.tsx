import React from 'react';
import { X, Wrench, ShieldAlert, Cpu, CheckCircle2, ArrowLeft } from 'lucide-react';

interface VehicleDetailLeafDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLevel2: () => void;
  vehicleName: string;
  dtcCode: string;
}

export const VehicleDetailLeafDrawer: React.FC<VehicleDetailLeafDrawerProps> = ({
  isOpen,
  onClose,
  onBackToLevel2,
  vehicleName,
  dtcCode
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 space-y-6 overflow-y-auto border-l border-slate-300 animate-in slide-in-from-right duration-300">
        
        {/* Level 3 Breadcrumb Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <button onClick={onBackToLevel2} className="text-teal-600 font-bold hover:underline flex items-center space-x-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Level 2 Drawer</span>
              </button>
              <span className="text-slate-400">/</span>
              <span className="font-bold text-slate-700">Level 3 Engine DTC Leaf</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{vehicleName} — Diagnostics</h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center btn-spring"
            aria-label="Close Level 3 Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DTC Fault Code Card */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span>Fault Code: {dtcCode}</span>
            </div>
            <span className="bg-amber-200 text-amber-950 text-xs font-bold px-2.5 py-0.5 rounded-full">Moderate Priority</span>
          </div>
          <p className="text-xs text-amber-950 leading-relaxed">
            P0171: Fuel Trim System Too Lean (Bank 1). AI Predictive Model suggests air intake filter replacement within 450 miles to prevent 8.4% fuel inefficiency.
          </p>
        </div>

        {/* Predictive Engine Wear Breakdown */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
            <Cpu className="w-4 h-4 text-teal-600" />
            <span>AI Predictive Health Forecast</span>
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Brake Pad Wear Remaining</span>
                <span className="font-bold text-teal-700">74% (Est. 18,200 mi)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full w-[74%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Transmission Fluid Integrity</span>
                <span className="font-bold text-emerald-700">91% (Optimal)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full w-[91%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-200">
          <button
            onClick={() => alert("Work Order #WO-8914 Created & Dispatched to Regional Service Center!")}
            className="btn-spring w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center space-x-2"
          >
            <Wrench className="w-4 h-4 text-teal-400" />
            <span>Dispatch Automated Service Work Order</span>
          </button>
        </div>

      </div>
    </div>
  );
};
