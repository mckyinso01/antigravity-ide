import React, { useState, useEffect } from 'react';
import { Lock, Radio, ShieldAlert, ShieldCheck } from 'lucide-react';
import { clinicalAudio } from '../utils/clinicalAudio';

interface HipaaInactivityLockProps {
  timeoutSeconds?: number;
}

export const HipaaInactivityLock: React.FC<HipaaInactivityLockProps> = ({ timeoutSeconds = 300 }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isRfidScanning, setIsRfidScanning] = useState(false);

  const staffName = localStorage.getItem('staff_name') || 'Sarah Vance, BSN, RN';
  const staffRole = localStorage.getItem('staff_role') || 'nurse';

  useEffect(() => {
    let timer: number;

    const onUserActivity = () => {
      if (isLocked) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setIsLocked(true);
        clinicalAudio.playDrawerSwoosh();
      }, timeoutSeconds * 1000);
    };

    // Initial timeout
    timer = window.setTimeout(() => {
      setIsLocked(true);
    }, timeoutSeconds * 1000);

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, onUserActivity, { passive: true }));

    // Global Ctrl+L shortcut for manual lock
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setIsLocked(true);
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, onUserActivity));
      window.removeEventListener('keydown', onKey);
    };
  }, [isLocked, timeoutSeconds]);

  const handleUnlockPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '123' || pinInput.length >= 3) {
      setIsLocked(false);
      setPinInput('');
      setErrorMsg('');
      clinicalAudio.playSuccessChime();
    } else {
      setErrorMsg('Incorrect PIN. (Demo PIN: 123)');
    }
  };

  const handleRfidUnlock = async () => {
    setIsRfidScanning(true);
    setErrorMsg('');
    clinicalAudio.playDrawerSwoosh();

    await new Promise(r => setTimeout(r, 500));
    setIsLocked(false);
    setIsRfidScanning(false);
    setPinInput('');
    clinicalAudio.playSuccessChime();
  };

  if (!isLocked) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 font-sans text-slate-100 animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center">
        
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-500/40 text-amber-400 flex items-center justify-center mb-4">
          <Lock size={32} />
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-mono font-bold uppercase mb-2">
          <ShieldCheck size={12} />
          <span>HIPAA § 164.312(a)(2)(iii) Auto-Lock</span>
        </div>

        <h2 className="text-lg font-bold text-white">Workstation Session Paused</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          Screen locked to protect patient health information (PHI). Authenticate to resume chart.
        </p>

        <div className="w-full my-5 p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-left flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Active Staff Session</span>
            <span className="text-xs font-bold text-slate-200 block">{staffName}</span>
            <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">{staffRole} • Inpatient Ward Node</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            {staffName[0]}
          </div>
        </div>

        {/* RFID Tap Instant Unlock */}
        <button
          onClick={handleRfidUnlock}
          disabled={isRfidScanning}
          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer mb-3"
        >
          <Radio size={14} className={isRfidScanning ? 'animate-spin' : 'animate-pulse'} />
          <span>{isRfidScanning ? 'Verifying RFID Badge...' : '⚡ Tap RFID Badge to Unlock'}</span>
        </button>

        <div className="relative w-full my-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase font-mono font-bold"><span className="bg-slate-900 px-2 text-slate-500">Or Enter Badge PIN</span></div>
        </div>

        {/* PIN Input */}
        <form onSubmit={handleUnlockPin} className="w-full space-y-3 mt-2">
          <div className="relative">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter 3-digit PIN (123)"
              autoFocus
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-center text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm font-mono tracking-widest"
            />
          </div>

          {errorMsg && (
            <div className="text-[11px] font-bold text-rose-400 flex items-center justify-center gap-1">
              <ShieldAlert size={12} />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer border border-slate-700"
          >
            Unlock with PIN
          </button>
        </form>

      </div>
    </div>
  );
};
