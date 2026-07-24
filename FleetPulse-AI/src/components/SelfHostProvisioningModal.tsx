import React, { useState } from 'react';
import { X, Server, Trash2, CheckCircle2, Terminal } from 'lucide-react';
import { purgeClientState } from '../utils/purgeClientState';

interface SelfHostProvisioningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SelfHostProvisioningModal: React.FC<SelfHostProvisioningModalProps> = ({ isOpen, onClose }) => {
  const [purgeStatus, setPurgeStatus] = useState<string | null>(null);
  const [isPurging, setIsPurging] = useState(false);

  if (!isOpen) return null;

  const handlePurge = async () => {
    setIsPurging(true);
    const result = await purgeClientState();
    setIsPurging(false);
    setPurgeStatus(result.message);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-6 animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Commercial License Model #1</span>
              <h3 className="text-lg font-extrabold text-slate-900">Enterprise Self-Host / On-Premise Provisioning</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700 font-mono">
          <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-200">
            <span>Docker Compose Deployment Token</span>
            <span className="text-emerald-700 font-bold">● Active Key</span>
          </div>
          <p className="text-slate-900 font-bold">docker pull registry.fleetpulse-ai.io/enterprise/v1.0:latest</p>
        </div>

        {/* 3-Step Sanitization Engine (Section 3 Requirement) */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
            <Trash2 className="w-4 h-4 text-red-600" />
            <span>3-Step Automated Client State Purge & Reset Wizard</span>
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed">
            Purges all demo SQLite/IndexedDB fleet records, wipes LocalStorage/SessionStorage, and seeds clean Super-Admin credentials.
          </p>

          <button
            onClick={handlePurge}
            disabled={isPurging}
            className="btn-spring w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2"
          >
            <span>{isPurging ? 'Executing 3-Step Purge...' : 'Purge Demo State & Seed Clean Super-Admin'}</span>
          </button>

          {purgeStatus && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl font-medium flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{purgeStatus}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
