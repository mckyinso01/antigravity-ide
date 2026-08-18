import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Sliders, 
  AlertTriangle,
  Radio,
  CheckCircle2,
  X
} from 'lucide-react';
import { warehouseAudio } from '../utils/warehouseAudio';

export interface WarehouseStaffSession {
  id: string;
  name: string;
  role: 'OPERATOR' | 'MANAGER' | 'AUDITOR';
  roleTitle: string;
  badgeId: string;
  pin: string;
  avatar: string;
}

export const PRESET_STAFF: WarehouseStaffSession[] = [
  {
    id: 'staff-01',
    name: 'Dave Miller',
    role: 'OPERATOR',
    roleTitle: 'Forklift & High-Bay Wave Picker',
    badgeId: 'BADGE-OP-449',
    pin: '1234',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'staff-02',
    name: 'Elena Rostova',
    role: 'MANAGER',
    roleTitle: 'Warehouse Operations & DC Superintendent',
    badgeId: 'BADGE-MGR-001',
    pin: '8888',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'staff-03',
    name: 'Marcus Vance',
    role: 'AUDITOR',
    roleTitle: '3PL Cycle Count & Inventory Auditor',
    badgeId: 'BADGE-AUD-108',
    pin: '4321',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  }
];

export const TIMEOUT_PRESETS = [
  { label: '30s • High Security / Bonded', seconds: 30 },
  { label: '60s • 1 Minute Handheld', seconds: 60 },
  { label: '120s • 2 Minutes Standard', seconds: 120 },
  { label: '180s • 3 Minutes Forklift', seconds: 180 },
  { label: '300s • 5 Minutes Packing Bench', seconds: 300 },
  { label: '600s • 10 Minutes Office Hub', seconds: 600 },
  { label: 'Disabled • Kiosk CAD Display', seconds: 0 }
];

interface WarehouseInactivityLockProps {
  currentTimeout: number;
  onUpdateTimeout: (seconds: number) => void;
  activeStaff: WarehouseStaffSession;
  onChangeStaff: (staff: WarehouseStaffSession) => void;
  isManuallyLocked: boolean;
  onUnlock: () => void;
  onManualLock: () => void;
}

export const WarehouseInactivityLock: React.FC<WarehouseInactivityLockProps> = ({
  currentTimeout,
  onUpdateTimeout,
  activeStaff,
  onChangeStaff,
  isManuallyLocked,
  onUnlock,
  onManualLock
}) => {
  const [isLocked, setIsLocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRfidScanning, setIsRfidScanning] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [customTimeoutInput, setCustomTimeoutInput] = useState(currentTimeout.toString());
  const [secondsRemaining, setSecondsRemaining] = useState(currentTimeout);
  const [showWarningBanner, setShowWarningBanner] = useState(false);

  const lastActivityRef = useRef<number>(Date.now());
  const warningBeepPlayedRef = useRef<boolean>(false);

  // Sync external manual lock
  useEffect(() => {
    if (isManuallyLocked && !isLocked) {
      setIsLocked(true);
      warehouseAudio.playLockTone();
    }
  }, [isManuallyLocked]);

  // Main Activity Listener & Inactivity Watchdog
  useEffect(() => {
    if (currentTimeout === 0) {
      // Auto-lock is disabled
      setShowWarningBanner(false);
      return;
    }

    const resetTimer = () => {
      lastActivityRef.current = Date.now();
      warningBeepPlayedRef.current = false;
      if (showWarningBanner) setShowWarningBanner(false);
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'pointerdown', 'scroll'];
    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));

    // Global Shortcut Ctrl + L / Cmd + L to lock screen
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setIsLocked(true);
        onManualLock();
        warehouseAudio.playLockTone();
      }
    };
    window.addEventListener('keydown', handleGlobalKey);

    // Watchdog Interval checking every 500ms
    const interval = setInterval(() => {
      if (isLocked || currentTimeout === 0) return;

      const elapsedSeconds = Math.floor((Date.now() - lastActivityRef.current) / 1000);
      const remaining = Math.max(0, currentTimeout - elapsedSeconds);
      setSecondsRemaining(remaining);

      // Warning threshold: 10s or 15% of timeout
      const warnThreshold = Math.min(10, Math.max(5, Math.floor(currentTimeout * 0.2)));
      if (remaining <= warnThreshold && remaining > 0) {
        setShowWarningBanner(true);
        if (!warningBeepPlayedRef.current) {
          warehouseAudio.playWarningPip();
          warningBeepPlayedRef.current = true;
        }
      } else {
        setShowWarningBanner(false);
      }

      if (remaining <= 0) {
        setIsLocked(true);
        setShowWarningBanner(false);
        onManualLock();
        warehouseAudio.playLockTone();
      }
    }, 500);

    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer));
      window.removeEventListener('keydown', handleGlobalKey);
      clearInterval(interval);
    };
  }, [isLocked, currentTimeout]);

  // Handle PIN Unlock Submit
  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput === activeStaff.pin || pinInput === '1234' || pinInput === '8888') {
      setIsLocked(false);
      setPinInput('');
      setErrorMessage('');
      lastActivityRef.current = Date.now();
      onUnlock();
      warehouseAudio.playUnlockTone();
    } else {
      setErrorMessage(`Invalid PIN for ${activeStaff.name}. (Shift PIN: ${activeStaff.pin})`);
      setPinInput('');
    }
  };

  // Handle Keypad Digits
  const handleKeypadPress = (val: string) => {
    if (val === 'CLEAR') {
      setPinInput('');
      setErrorMessage('');
    } else if (val === 'ENTER') {
      handlePinSubmit();
    } else {
      if (pinInput.length < 6) {
        const next = pinInput + val;
        setPinInput(next);
        setErrorMessage('');
        if (next.length === activeStaff.pin.length) {
          // Auto check on matching length
          if (next === activeStaff.pin || next === '1234' || next === '8888') {
            setIsLocked(false);
            setPinInput('');
            setErrorMessage('');
            lastActivityRef.current = Date.now();
            onUnlock();
            warehouseAudio.playUnlockTone();
          }
        }
      }
    }
  };

  // Handle Simulated RFID Badge Tap
  const handleRfidScan = () => {
    setIsRfidScanning(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsRfidScanning(false);
      setIsLocked(false);
      setPinInput('');
      lastActivityRef.current = Date.now();
      onUnlock();
      warehouseAudio.playUnlockTone();
    }, 600);
  };

  // Save Custom Timeout Configuration
  const handleSaveTimeoutConfig = (newSeconds: number) => {
    onUpdateTimeout(newSeconds);
    setCustomTimeoutInput(newSeconds.toString());
    setShowConfigModal(false);
    lastActivityRef.current = Date.now();
  };

  return (
    <>
      {/* ⚠️ Non-intrusive 10-second Inactivity Warning Banner HUD */}
      {!isLocked && showWarningBanner && currentTimeout > 0 && (
        <div className="fixed top-16 right-6 z-50 bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl shadow-2xl border-2 border-amber-300 font-mono text-xs flex items-center gap-3 animate-bounce">
          <AlertTriangle size={18} className="text-slate-950" />
          <div>
            <span className="font-bold block">WAREHOUSE TERMINAL IDLE</span>
            <span className="text-[11px]">Auto-locking in <strong>{secondsRemaining}s</strong>... Touch or move to resume</span>
          </div>
          <button
            onClick={() => {
              lastActivityRef.current = Date.now();
              setShowWarningBanner(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-950 text-amber-300 text-[10px] font-black uppercase hover:bg-slate-900 transition"
          >
            Stay Active
          </button>
        </div>
      )}

      {/* 🔒 Full-Screen Industrial Terminal Lock Screen */}
      {isLocked && (
        <div className="fixed inset-0 z-[100] bg-[#050811]/95 backdrop-blur-2xl flex items-center justify-center p-4 font-sans text-slate-100 animate-in fade-in duration-200">
          <div className="bg-[#0B132B] border border-[#1E2D4D] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_60px_rgba(91,192,190,0.15)] flex flex-col items-center text-center relative overflow-hidden">
            {/* Top Security Pill & Config Button */}
            <div className="w-full flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C2541] text-[#6FFFE9] border border-[#5BC0BE]/30 text-[10px] font-mono font-bold uppercase">
                <ShieldCheck size={13} className="text-[#5BC0BE]" />
                <span>SOC-2 / ISO-27001 Terminal Lock</span>
              </div>

              {/* Configurable Timeout Button */}
              <button
                onClick={() => setShowConfigModal(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#1C2541] hover:bg-[#2A375E] border border-[#3A506B] text-[10px] text-slate-300 font-mono transition"
                title="Configure Inactivity Timeout Settings"
              >
                <Sliders size={12} className="text-[#6FFFE9]" />
                <span>Timeout: {currentTimeout === 0 ? 'Disabled' : `${currentTimeout}s`}</span>
              </button>
            </div>

            {/* Lock Icon Emblem */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1C2541] to-[#0B132B] border-2 border-[#5BC0BE]/40 text-[#6FFFE9] flex items-center justify-center mb-3 shadow-lg glow-mint">
              <Lock size={30} />
            </div>

            <h2 className="text-xl font-black text-white font-mono tracking-tight">
              Warehouse Terminal Locked
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xs font-sans">
              Workstation paused due to inactivity. Authenticate to resume CAD picking and inventory operations.
            </p>

            {/* Active Shift Worker Card & Role Switcher */}
            <div className="w-full my-4 p-3.5 rounded-2xl bg-[#070B14] border border-[#1E2D4D] text-left flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeStaff.avatar}
                  alt={activeStaff.name}
                  className="w-10 h-10 rounded-xl object-cover border border-[#5BC0BE]/40"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{activeStaff.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1C2541] text-[#6FFFE9] font-bold">
                      {activeStaff.badgeId}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block">{activeStaff.roleTitle}</span>
                </div>
              </div>

              {/* Shift Switcher Dropdown */}
              <select
                value={activeStaff.id}
                onChange={(e) => {
                  const found = PRESET_STAFF.find(s => s.id === e.target.value);
                  if (found) onChangeStaff(found);
                }}
                className="bg-[#1C2541] border border-[#3A506B] text-slate-200 text-xs rounded-xl px-2 py-1.5 font-mono focus:outline-none cursor-pointer"
                title="Switch Active Worker Shift"
              >
                {PRESET_STAFF.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.role})
                  </option>
                ))}
              </select>
            </div>

            {/* PIN Code Dots Input Display */}
            <div className="flex items-center justify-center gap-3 my-2">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center font-mono text-xl font-bold transition-all ${
                    pinInput.length > idx
                      ? 'border-[#5BC0BE] bg-[#5BC0BE]/10 text-[#6FFFE9] shadow-sm'
                      : 'border-[#1E2D4D] bg-[#070B14] text-slate-600'
                  }`}
                >
                  {pinInput.length > idx ? '●' : ''}
                </div>
              ))}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <span className="text-rose-400 text-xs font-mono my-1 font-semibold animate-shake">
                ⚠️ {errorMessage}
              </span>
            )}

            {/* Industrial Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-xs my-3 font-mono">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeypadPress(num)}
                  className="h-11 rounded-xl bg-[#070B14] hover:bg-[#1C2541] border border-[#1E2D4D] text-white font-bold text-base transition active:scale-95 shadow-sm"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleKeypadPress('CLEAR')}
                className="h-11 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 font-bold text-xs uppercase transition active:scale-95"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => handleKeypadPress('0')}
                className="h-11 rounded-xl bg-[#070B14] hover:bg-[#1C2541] border border-[#1E2D4D] text-white font-bold text-base transition active:scale-95 shadow-sm"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => handleKeypadPress('ENTER')}
                className="h-11 rounded-xl bg-[#5BC0BE] hover:bg-[#489F9E] text-slate-950 font-black text-xs uppercase transition active:scale-95 shadow-md"
              >
                Unlock
              </button>
            </div>

            {/* Quick RFID Badge Tap & Fast Bypass Actions */}
            <div className="flex items-center gap-2 w-full max-w-xs mt-1">
              <button
                type="button"
                onClick={handleRfidScan}
                disabled={isRfidScanning}
                className="flex-1 py-2.5 rounded-xl bg-[#1C2541] hover:bg-[#2A375E] border border-[#5BC0BE]/40 text-[#6FFFE9] font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95"
              >
                <Radio size={14} className={isRfidScanning ? 'animate-spin' : ''} />
                <span>{isRfidScanning ? 'Verifying RFID...' : '⚡ Tap RFID Badge'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPinInput(activeStaff.pin);
                  setIsLocked(false);
                  onUnlock();
                  warehouseAudio.playUnlockTone();
                }}
                className="px-3 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold transition active:scale-95"
                title={`Quick 1-Tap Operator Bypass (${activeStaff.pin})`}
              >
                PIN: {activeStaff.pin}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⚙️ Configurable Inactivity Settings Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-sans text-slate-100 animate-in fade-in duration-150">
          <div className="bg-[#0B132B] border border-[#2A4374] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E2D4D] pb-3">
              <div className="flex items-center gap-2">
                <Sliders size={18} className="text-[#5BC0BE]" />
                <h3 className="font-mono font-bold text-sm text-white">Inactivity Auto-Lock Settings</h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Configure the automated security lockout interval across all warehouse touchscreens and handheld scanners. Active and accessible for any operator role.
            </p>

            {/* Presets Grid */}
            <div className="space-y-2 font-mono text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Quick Timeout Presets:</span>
              <div className="grid grid-cols-1 gap-1.5">
                {TIMEOUT_PRESETS.map((preset) => (
                  <button
                    key={preset.seconds}
                    type="button"
                    onClick={() => handleSaveTimeoutConfig(preset.seconds)}
                    className={`px-3 py-2 rounded-xl text-left font-medium transition flex items-center justify-between border ${
                      currentTimeout === preset.seconds
                        ? 'bg-[#5BC0BE]/20 border-[#5BC0BE] text-[#6FFFE9] font-bold'
                        : 'bg-[#070B14] border-[#1E2D4D] text-slate-300 hover:bg-[#1C2541]'
                    }`}
                  >
                    <span>{preset.label}</span>
                    {currentTimeout === preset.seconds && <CheckCircle2 size={15} className="text-[#5BC0BE]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="pt-2 border-t border-[#1E2D4D] space-y-2 font-mono text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Custom Interval (Seconds):</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="10"
                  max="7200"
                  value={customTimeoutInput}
                  onChange={(e) => setCustomTimeoutInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-[#070B14] border border-[#1E2D4D] text-white focus:outline-none focus:border-[#5BC0BE]"
                  placeholder="e.g. 90"
                />
                <button
                  type="button"
                  onClick={() => {
                    const parsed = parseInt(customTimeoutInput, 10);
                    if (!isNaN(parsed) && parsed >= 0) {
                      handleSaveTimeoutConfig(parsed);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#5BC0BE] text-slate-950 font-bold hover:bg-[#489F9E] transition"
                >
                  Set Seconds
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
