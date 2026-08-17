import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, X, ArrowRight, Building, KeyRound } from 'lucide-react';
import { DEFAULT_HOSPITAL_FLOORS } from '../db';
import { clinicalAudio } from '../utils/clinicalAudio';

interface Props {
  isOpen: boolean;
  floorNumber: number;
  onClose: () => void;
  onSuccess: (floorNum: number) => void;
}

export const AdminBlueprintAuthModal: React.FC<Props> = ({
  isOpen,
  floorNumber,
  onClose,
  onSuccess
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const floorMeta = DEFAULT_HOSPITAL_FLOORS.find(f => f.number === floorNumber) || {
    number: floorNumber,
    name: `Level ${floorNumber}: Hospital Ward`,
    department: 'Clinical Care Unit'
  };

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyAndSubmit(pin);
  };

  const verifyAndSubmit = (codeToVerify: string) => {
    const activeStaffPin = localStorage.getItem('staff_pin');
    // Accept standard master admin PIN '123', 'admin', '0000', or active user's PIN
    if (
      codeToVerify === '123' ||
      codeToVerify === 'admin' ||
      codeToVerify === '0000' ||
      codeToVerify === '1234' ||
      (activeStaffPin && codeToVerify === activeStaffPin)
    ) {
      clinicalAudio.playSuccessChime();
      onSuccess(floorNumber);
      onClose();
    } else {
      clinicalAudio.playAlertTone();
      setError(true);
      setErrorMessage('Invalid Security Passcode. Try PIN: 123 (Supervisor Master)');
    }
  };

  const handleQuickBypass = () => {
    setPin('123');
    verifyAndSubmit('123');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-slate-950/60 font-sans">
          {/* Backdrop click */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.13, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">Admin Blueprint Authorization</h3>
                  <p className="text-[11px] text-slate-400">Restricted Architectural CAD Editor</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Target Floor Banner */}
            <div className="p-3.5 bg-blue-50/80 border-b border-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building size={16} className="text-blue-700 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{floorMeta.name}</span>
                  <span className="text-[10px] text-blue-700 font-semibold">{floorMeta.department}</span>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-600 text-white font-black shadow-2xs">
                LEVEL {floorNumber}
              </span>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Lock size={13} className="text-slate-500" /> Enter 4-Digit Operations PIN / Passcode
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter PIN (Demo: 123)"
                  autoFocus
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono tracking-widest text-slate-900 bg-slate-50 focus:bg-white focus:outline-hidden transition-all ${
                    error
                      ? 'border-rose-400 ring-2 ring-rose-100'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                  }`}
                />
                {error && (
                  <p className="text-xs text-rose-600 font-semibold mt-1.5 animate-in fade-in duration-100">
                    {errorMessage}
                  </p>
                )}
              </div>

              {/* Quick Supervisor Bypass Button */}
              <button
                type="button"
                onClick={handleQuickBypass}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
              >
                <KeyRound size={13} className="text-blue-600" />
                <span>1-Click Supervisor Bypass (Demo PIN: 123)</span>
              </button>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Authorize &amp; Edit Level {floorNumber}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
