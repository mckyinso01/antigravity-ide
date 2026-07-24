import React from 'react';
import { X, ShieldCheck, AlertTriangle, FileText, Camera, CheckCircle2, ChevronRight } from 'lucide-react';

interface DriverInspectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  truckData: {
    id: string;
    vehicleName: string;
    driverName: string;
    speed: string;
    fatigueStatus: string;
    fuelLevel: string;
    dtcCode: string;
    location: string;
  } | null;
  onOpenLevel3: () => void;
}

export const DriverInspectionDrawer: React.FC<DriverInspectionDrawerProps> = ({
  isOpen,
  onClose,
  truckData,
  onOpenLevel3
}) => {
  if (!isOpen || !truckData) return null;

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 space-y-6 overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-teal-600 uppercase tracking-wider">
              <span>Level 2 Inspection Drawer</span>
              <span>•</span>
              <span>FMCSA DVIR Compliant</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{truckData.vehicleName}</h3>
            <p className="text-xs text-slate-500 font-medium">Assigned Driver: <span className="text-slate-800 font-bold">{truckData.driverName}</span></p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center btn-spring"
            aria-label="Close Level 2 Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telematics Real-Time Telemetry Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500">Live GPS Location</span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{truckData.location}</p>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500">Current Velocity</span>
            <p className="text-sm font-bold text-teal-700 mt-0.5">{truckData.speed}</p>
          </div>
        </div>

        {/* AI Driver Fatigue & Safety Status */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>360° AI Driver Coaching Status</span>
            </div>
            <span className="bg-emerald-200 text-emerald-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              {truckData.fatigueStatus}
            </span>
          </div>
          <p className="text-xs text-emerald-950 leading-relaxed">
            AI In-Cab camera inference verified: Driver attentiveness score 98.4%. Zero fatigue or cell phone usage detected over past 4 hours.
          </p>
        </div>

        {/* Digital Pre-Trip Inspection Report (DVIR) */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Digital Pre-Trip DVIR Checklist</span>
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-slate-800">Automatic Emergency Braking (AEB)</span>
              </div>
              <span className="font-bold text-emerald-700">Passed</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-slate-800">Tire Pressure & Tread Depth Log</span>
              </div>
              <span className="font-bold text-emerald-700">110 PSI</span>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="font-medium text-amber-900">Engine Diagnostic Code ({truckData.dtcCode})</span>
              </div>
              <span className="font-bold text-amber-700">Pending Review</span>
            </div>
          </div>
        </div>

        {/* Level 3 Drilldown Action Node */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Need DTC Fault Code Analysis?</span>
            <span className="font-semibold text-teal-600">Level 3 Leaf Inspection</span>
          </div>

          <button
            onClick={onOpenLevel3}
            className="btn-spring w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md shadow-teal-500/20 flex items-center justify-center space-x-2"
          >
            <span>Open Level 3 Engine DTC Inspection</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
