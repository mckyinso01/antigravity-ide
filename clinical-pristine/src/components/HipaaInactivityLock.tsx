import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  Radio, 
  ShieldAlert, 
  ShieldCheck, 
  Sliders, 
  CheckCircle2, 
  X,
  AlertTriangle 
} from 'lucide-react';
import { clinicalAudio } from '../utils/clinicalAudio';

export interface ClinicalStaffSession {
  id: string;
  name: string;
  role: 'NURSE' | 'PHYSICIAN' | 'RESPIRATORY_THERAPIST' | 'ADMIN';
  title: string;
  badgeId: string;
  pin: string;
  department: string;
}

export const CLINICAL_PRESET_STAFF: ClinicalStaffSession[] = [
  {
    id: 'staff-nurse-01',
    name: 'Sarah Vance, BSN, RN',
    role: 'NURSE',
    title: 'Charge Nurse • ICU & Resuscitation',
    badgeId: 'RN-88219',
    pin: '123',
    department: 'Floor 4 ICU'
  },
  {
    id: 'staff-md-02',
    name: 'Dr. Arthur Chen, MD, FCCP',
    role: 'PHYSICIAN',
    title: 'Attending Intensivist & Pulmonary Fellow',
    badgeId: 'MD-00412',
    pin: '8888',
    department: 'Critical Care Medicine'
  },
  {
    id: 'staff-rt-03',
    name: 'Marcus Reed, RRT',
    role: 'RESPIRATORY_THERAPIST',
    title: 'Senior Respiratory Care Specialist',
    badgeId: 'RT-33910',
    pin: '4321',
    department: 'Ventilator & Airway Unit'
  }
];

export const CLINICAL_TIMEOUT_PRESETS = [
  { label: '30s • High Security / Pediatric ICU', seconds: 30 },
  { label: '60s • 1 Minute Mobile COW Cart', seconds: 60 },
  { label: '120s • 2 Minutes Nurse Station', seconds: 120 },
  { label: '300s • 5 Minutes Standard HIPAA', seconds: 300 },
  { label: '600s • 10 Minutes Physician Office', seconds: 600 },
  { label: 'Disabled • Wall Status Board Display', seconds: 0 }
];

interface HipaaInactivityLockProps {
  timeoutSeconds?: number;
  onTimeoutChange?: (seconds: number) => void;
}

export const HipaaInactivityLock: React.FC<HipaaInactivityLockProps> = ({ 
  timeoutSeconds: initialTimeout = 300,
  onTimeoutChange
}) => {
  const [timeoutSeconds, setTimeoutSeconds] = useState<number>(() => {
    const saved = localStorage.getItem('clinical_autolock_seconds');
    return saved !== null ? parseInt(saved, 10) : initialTimeout;
  });

  const [activeStaff, setActiveStaff] = useState<ClinicalStaffSession>(() => {
    const saved = localStorage.getItem('clinical_active_staff');
    return saved ? JSON.parse(saved) : CLINICAL_PRESET_STAFF[0];
  });

  const [isLocked, setIsLocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [isRfidScanning, setIsRfidScanning] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [customTimeoutInput, setCustomTimeoutInput] = useState(timeoutSeconds.toString());
  const [secondsRemaining, setSecondsRemaining] = useState(timeoutSeconds);
  const [showWarningBanner, setShowWarningBanner] = useState(false);

  const lastActivityRef = useRef<number>(Date.now());

  // Handle rate limiting countdown
  useEffect(() => {
    if (lockoutTimer > 0) {
      const t = setTimeout(() => setLockoutTimer(lockoutTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [lockoutTimer]);

  // Main Activity Listener & Inactivity Watchdog
  useEffect(() => {
    if (timeoutSeconds === 0) {
      setShowWarningBanner(false);
      return;
    }

    const resetTimer = () => {
      lastActivityRef.current = Date.now();
      if (showWarningBanner) setShowWarningBanner(false);
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));

    // Global Ctrl+L shortcut for manual lock
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setIsLocked(true);
        clinicalAudio.playDrawerSwoosh();
      }
    };
    window.addEventListener('keydown', onKey);

    // Watchdog check every 500ms
    const interval = setInterval(() => {
      if (isLocked || timeoutSeconds === 0) return;

      const elapsed = Math.floor((Date.now() - lastActivityRef.current) / 1000);
      const remaining = Math.max(0, timeoutSeconds - elapsed);
      setSecondsRemaining(remaining);

      // Warning threshold: 10s or 15% of timeout
      const warnThreshold = Math.min(10, Math.max(5, Math.floor(timeoutSeconds * 0.15)));
      if (remaining <= warnThreshold && remaining > 0) {
        setShowWarningBanner(true);
      } else {
        setShowWarningBanner(false);
      }

      if (remaining <= 0) {
        setIsLocked(true);
        setShowWarningBanner(false);
        clinicalAudio.playDrawerSwoosh();
      }
    }, 500);

    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer));
      window.removeEventListener('keydown', onKey);
      clearInterval(interval);
    };
  }, [isLocked, timeoutSeconds]);

  const handleUnlockPin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (lockoutTimer > 0) return;

    // Strict PIN check against active staff PIN, or universal clinic demo PIN 123
    if (pinInput === activeStaff.pin || pinInput === '123' || pinInput === '8888') {
      setIsLocked(false);
      setPinInput('');
      setErrorMsg('');
      setFailedAttempts(0);
      lastActivityRef.current = Date.now();
      clinicalAudio.playSuccessChime();
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 3) {
        setLockoutTimer(15);
        setErrorMsg('Too many failed attempts. Workstation locked for 15s.');
      } else {
        setErrorMsg(`Incorrect PIN for ${activeStaff.name}. (${3 - newAttempts} attempts left. PIN: ${activeStaff.pin})`);
      }
      setPinInput('');
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
    setFailedAttempts(0);
    lastActivityRef.current = Date.now();
    clinicalAudio.playSuccessChime();
  };

  const handleSaveTimeoutConfig = (newSeconds: number) => {
    setTimeoutSeconds(newSeconds);
    setCustomTimeoutInput(newSeconds.toString());
    localStorage.setItem('clinical_autolock_seconds', newSeconds.toString());
    if (onTimeoutChange) onTimeoutChange(newSeconds);
    setShowConfigModal(false);
    lastActivityRef.current = Date.now();
  };

  const handleChangeStaff = (staff: ClinicalStaffSession) => {
    setActiveStaff(staff);
    localStorage.setItem('clinical_active_staff', JSON.stringify(staff));
    localStorage.setItem('staff_name', staff.name);
    localStorage.setItem('staff_role', staff.role.toLowerCase());
  };

  return (
    <>
      {/* ⚠️ Non-intrusive Inactivity Warning Banner */}
      {!isLocked && showWarningBanner && timeoutSeconds > 0 && (
        <div className="fixed top-16 right-6 z-[150] bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl shadow-2xl border-2 border-amber-300 font-mono text-xs flex items-center gap-3 animate-bounce">
          <AlertTriangle size={18} className="text-slate-950 shrink-0" />
          <div>
            <span className="font-bold block uppercase">HIPAA Session Inactivity Warning</span>
            <span className="text-[11px]">Auto-locking in <strong>{secondsRemaining}s</strong>... Touch screen or move mouse</span>
          </div>
          <button
            onClick={() => {
              lastActivityRef.current = Date.now();
              setShowWarningBanner(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-950 text-amber-300 text-[10px] font-black uppercase hover:bg-slate-900 transition cursor-pointer"
          >
            Stay Logged In
          </button>
        </div>
      )}

      {/* 🔒 Full-Screen HIPAA Inactivity Lock Overlay */}
      {isLocked && (
        <div className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 font-sans text-slate-100 animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center">
            
            {/* Top Bar: Security Badge & Timeout Config Trigger */}
            <div className="w-full flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-mono font-bold uppercase">
                <ShieldCheck size={12} />
                <span>HIPAA § 164.312(a)(2)(iii) Auto-Lock</span>
              </div>

              <button
                onClick={() => setShowConfigModal(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-[10px] text-slate-300 font-mono transition cursor-pointer"
                title="Configure Inactivity Timeout Settings"
              >
                <Sliders size={12} className="text-teal-400" />
                <span>Timeout: {timeoutSeconds === 0 ? 'Disabled' : `${timeoutSeconds}s`}</span>
              </button>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-500/40 text-amber-400 flex items-center justify-center mb-3">
              <Lock size={32} />
            </div>

            <h2 className="text-lg font-bold text-white">Workstation Session Paused</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Screen locked to protect patient health information (PHI). Authenticate to resume chart.
            </p>

            {/* Active Staff Shift Card & Role Switcher */}
            <div className="w-full my-4 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-left flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Active Staff Session</span>
                <span className="text-xs font-bold text-slate-200 block">{activeStaff.name}</span>
                <span className="text-[10px] font-mono text-teal-400 uppercase font-bold">
                  {activeStaff.badgeId} • {activeStaff.department}
                </span>
              </div>

              <select
                value={activeStaff.id}
                onChange={(e) => {
                  const found = CLINICAL_PRESET_STAFF.find(s => s.id === e.target.value);
                  if (found) handleChangeStaff(found);
                }}
                className="bg-slate-900 border border-slate-600 text-slate-200 text-xs rounded-xl px-2 py-1.5 font-mono focus:outline-none cursor-pointer"
              >
                {CLINICAL_PRESET_STAFF.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name.split(' ')[0]} ({s.role})
                  </option>
                ))}
              </select>
            </div>

            {/* RFID Tap Instant Unlock */}
            <button
              onClick={handleRfidUnlock}
              disabled={isRfidScanning || lockoutTimer > 0}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer mb-2 disabled:opacity-50"
            >
              <Radio size={14} className={isRfidScanning ? 'animate-spin' : 'animate-pulse'} />
              <span>{isRfidScanning ? 'Verifying RFID Badge...' : '⚡ Tap RFID Hospital Badge'}</span>
            </button>

            <div className="relative w-full my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-mono font-bold"><span className="bg-slate-900 px-2 text-slate-500">Or Enter Badge PIN</span></div>
            </div>

            {/* PIN Input */}
            <form onSubmit={handleUnlockPin} className="w-full space-y-2.5 mt-1">
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  disabled={lockoutTimer > 0}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder={lockoutTimer > 0 ? `Locked (${lockoutTimer}s)` : `Enter PIN (${activeStaff.pin})`}
                  autoFocus
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-center text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm font-mono tracking-widest disabled:bg-slate-900"
                />
              </div>

              {errorMsg && (
                <div className="text-[11px] font-bold text-rose-400 flex items-center justify-center gap-1">
                  <ShieldAlert size={12} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={lockoutTimer > 0}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer border border-slate-700 disabled:opacity-50"
                >
                  Unlock Workstation
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPinInput(activeStaff.pin);
                    setIsLocked(false);
                    setErrorMsg('');
                    clinicalAudio.playSuccessChime();
                  }}
                  className="px-3 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-bold cursor-pointer transition"
                  title="Quick Demo PIN Bypass"
                >
                  PIN: {activeStaff.pin}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ⚙️ Clinical Auto-Lock Settings Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-sans text-slate-100 animate-in fade-in duration-150">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders size={18} className="text-teal-400" />
                <h3 className="font-mono font-bold text-sm text-white">HIPAA Inactivity Auto-Lock Settings</h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Configurable inactivity security threshold to comply with hospital HIPAA workstation privacy policies. Active for all nursing nodes and COW laptop stations.
            </p>

            <div className="space-y-2 font-mono text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Preset Timeout Intervals:</span>
              <div className="grid grid-cols-1 gap-1.5">
                {CLINICAL_TIMEOUT_PRESETS.map((preset) => (
                  <button
                    key={preset.seconds}
                    type="button"
                    onClick={() => handleSaveTimeoutConfig(preset.seconds)}
                    className={`px-3 py-2 rounded-xl text-left font-medium transition flex items-center justify-between border cursor-pointer ${
                      timeoutSeconds === preset.seconds
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{preset.label}</span>
                    {timeoutSeconds === preset.seconds && <CheckCircle2 size={15} className="text-teal-400" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2 font-mono text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Set Custom Timeout (Seconds):</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="10"
                  max="7200"
                  value={customTimeoutInput}
                  onChange={(e) => setCustomTimeoutInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
                  placeholder="e.g. 180"
                />
                <button
                  type="button"
                  onClick={() => {
                    const parsed = parseInt(customTimeoutInput, 10);
                    if (!isNaN(parsed) && parsed >= 0) {
                      handleSaveTimeoutConfig(parsed);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-500 transition cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

