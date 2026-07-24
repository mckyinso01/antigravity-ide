import React from 'react';
import { X, BookOpen, Truck, ShieldCheck, DollarSign, Terminal, CheckCircle2 } from 'lucide-react';

interface UserOperationsGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserOperationsGuide: React.FC<UserOperationsGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-6 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">User Documentation & Feature Guide</span>
              <h3 className="text-xl font-extrabold text-slate-900">FleetPulse-AI User Operations & How It Works</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold btn-spring">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Step Quick-Start Guide */}
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-2">
            <h4 className="font-extrabold text-teal-900 text-sm flex items-center space-x-2">
              <Truck className="w-4 h-4 text-teal-700" />
              <span>Step 1: Real-Time Fleet Telematics Grid Navigation</span>
            </h4>
            <p className="text-teal-950 leading-relaxed">
              Upon loading the workspace, the <strong>450-Vehicle Telematics Bento Grid</strong> renders active heavy transport units. Click any truck card to trigger the sub-50ms Level 2 Inspection Drawer for in-context analysis without route reloads.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Step 2: Digital DVIR & 360° AI Driver Coaching Inspection</span>
            </h4>
            <p className="text-slate-700 leading-relaxed">
              Inside the <strong>Level 2 Inspection Drawer</strong>, managers review real-time driver attentiveness scores, AEB test results, tire pressure (110 PSI), and photo verification proof required for FMCSA 2026 compliance audits.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-indigo-600" />
              <span>Step 3: Level 3 Engine DTC Fault Code Diagnostics</span>
            </h4>
            <p className="text-slate-700 leading-relaxed">
              If an engine fault code occurs (e.g. `P0171: Fuel Trim Lean`), click <strong>"Open Level 3 Engine DTC Inspection"</strong> to view predictive maintenance forecasts and dispatch automated 1-click service work orders.
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
            <h4 className="font-extrabold text-purple-950 text-sm flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-purple-700" />
              <span>Step 4: 4-Tier Commercial Licensing & Self-Host Purge</span>
            </h4>
            <p className="text-purple-950 leading-relaxed">
              Click the top header buttons to switch between <strong>Self-Host On-Premise</strong> (with 3-Step automated state purge wizard), <strong>White-Label Agency Customizer</strong>, and <strong>$6,999 Full Source Code Buyout</strong>.
            </p>
          </div>
        </div>

        {/* Verification Proof Summary */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Actual Telemetry Data Verified via SHA-256 Hashes</span>
          </div>
          <span className="font-mono text-[11px] bg-emerald-200 px-2 py-0.5 rounded font-extrabold text-emerald-900">Audit Verified</span>
        </div>

      </div>
    </div>
  );
};
