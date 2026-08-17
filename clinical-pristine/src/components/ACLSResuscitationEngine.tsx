import React, { useState, useEffect, useRef, memo } from 'react';
import { 
  Zap, 
  Clock, 
  Activity, 
  Pill, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Download, 
  FileText, 
  Radio, 
  Flame, 
  ChevronRight, 
  ShieldCheck, 
  Droplets, 
  Layers 
} from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { clinicalAudio } from '../utils/clinicalAudio';
import { db } from '../db';

export type CardiacRhythmType = 'VFIB' | 'PVT' | 'ASYSTOLE' | 'PEA' | 'NSR_ROSC';

interface ResuscitationEvent {
  id: string;
  timestamp: string;
  secondOffset: number;
  type: 'cpr' | 'shock' | 'drug' | 'rhythm' | 'lab' | 'rosc' | 'system';
  title: string;
  detail: string;
  aclsCategory: string;
}

interface Props {
  patientRoom?: string;
  patientName?: string;
  onStandDown?: () => void;
}

export const ACLSResuscitationEngine: React.FC<Props> = memo(({
  patientRoom = 'ICU Resuscitation Suite 101',
  patientName = 'Eleanor Vance (MRN-202400)',
  onStandDown
}) => {
  const { showToast } = useToast();

  // Primary ACLS Timer States
  const [isActive, setIsActive] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [rhythmCycleSeconds, setRhythmCycleSeconds] = useState(120); // 2-min cycle
  const [epiCountdownSeconds, setEpiCountdownSeconds] = useState(180); // 3-min cycle
  
  // Resuscitation Clinical States
  const [rhythm, setRhythm] = useState<CardiacRhythmType>('VFIB');
  const [isRoscAchieved, setIsRoscAchieved] = useState(false);
  const [selectedEnergyJoules, setSelectedEnergyJoules] = useState(200);
  const [isCharging, setIsCharging] = useState(false);
  const [isCharged, setIsCharged] = useState(false);
  const [shocksDeliveredCount, setShocksDeliveredCount] = useState(0);
  const [cprMetronomeActive, setCprMetronomeActive] = useState(false);
  const [cprRate] = useState(110); // 110 bpm AHA optimal target

  // Live Telemetry Numbers
  const [telemetryHR, setTelemetryHR] = useState(0);
  const [telemetryBP, setTelemetryBP] = useState('---/---');
  const [telemetrySpO2, setTelemetrySpO2] = useState('---%');
  const [telemetryEtCO2, setTelemetryEtCO2] = useState(14); // mmHg

  // Reversible Causes (5 H's and 5 T's) Checklist
  const [causesChecklist, setCausesChecklist] = useState<{ [key: string]: boolean }>({
    'Hypovolemia': false,
    'Hypoxia': false,
    'Hydrogen Ion (Acidosis)': true,
    'Hypo/Hyperkalemia': true,
    'Hypothermia': false,
    'Tension Pneumothorax': false,
    'Tamponade (Cardiac)': false,
    'Toxins': false,
    'Thrombosis (Pulmonary)': false,
    'Thrombosis (Coronary)': true,
  });

  // Arterial Blood Gas (ABG) Lab Results
  const [showAbgPanel, setShowAbgPanel] = useState(false);
  const [abgData] = useState({
    pH: '7.18',
    pCO2: '54 mmHg',
    pO2: '62 mmHg',
    HCO3: '18 mEq/L',
    Lactate: '6.8 mmol/L',
    Potassium: '5.8 mmol/L',
    Glucose: '142 mg/dL',
    Interpretation: 'Severe Mixed Respiratory & Metabolic Acidosis with Hyperkalemia'
  });

  // Chronological Event Log Stream
  const [eventLog, setEventLog] = useState<ResuscitationEvent[]>(() => [
    {
      id: 'EV-0',
      timestamp: new Date().toLocaleTimeString(),
      secondOffset: 0,
      type: 'system',
      title: 'ACLS Emergency Code Blue Declared',
      detail: `Cardiac arrest confirmed at ${patientRoom}. Resuscitation deck initialized.`,
      aclsCategory: 'INITIAL RECOGNITION'
    }
  ]);

  // Audio & Timer Refs
  const timerIntervalRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const addEvent = (type: ResuscitationEvent['type'], title: string, detail: string, aclsCategory: string) => {
    const newEv: ResuscitationEvent = {
      id: `EV-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      secondOffset: totalSeconds,
      type,
      title,
      detail,
      aclsCategory
    };
    setEventLog(prev => [newEv, ...prev]);
  };

  // Stopwatch & 2-Min / 3-Min Resuscitation Timers
  useEffect(() => {
    if (isActive && !isRoscAchieved) {
      timerIntervalRef.current = window.setInterval(() => {
        setTotalSeconds(s => s + 1);

        setRhythmCycleSeconds(r => {
          if (r <= 1) {
            clinicalAudio.playAlertTone();
            showToast('⏰ 2-MINUTE CPR CYCLE COMPLETE: Pause CPR, Check Pulse & Rhythm Analysis!', 'error');
            addEvent('system', '2-Minute CPR Cycle Elapsed', 'Pause compressions. Evaluate monitor for shockable rhythm.', 'CYCLE EXPIRATION');
            return 120;
          }
          return r - 1;
        });

        setEpiCountdownSeconds(e => {
          if (e <= 1) {
            clinicalAudio.playAlertTone();
            showToast('💉 EPINEPHRINE 1mg IV/IO DUE NOW (3-5 Minute Interval).', 'warn');
            addEvent('drug', 'Epinephrine 1mg IV/IO Due', 'Administer 1mg (1:10,000) IV push followed by 20mL NS flush.', 'MEDICATION PROTOCOL');
            return 180;
          }
          return e - 1;
        });

      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isActive, isRoscAchieved]);

  // CPR Metronome Click Generator (110 BPM Lookahead Precision Engine)
  useEffect(() => {
    if (cprMetronomeActive && isActive && !isRoscAchieved) {
      clinicalAudio.startPrecisionMetronome(cprRate);
    } else {
      clinicalAudio.stopPrecisionMetronome();
    }

    return () => {
      clinicalAudio.stopPrecisionMetronome();
    };
  }, [cprMetronomeActive, cprRate, isActive, isRoscAchieved]);

  // Real-Time Animated Lead II ECG Sweep Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x = 0;
    const height = canvas.height;
    const width = canvas.width;
    const midY = height / 2;

    const renderECG = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(x, 0, 8, height);

      let y = midY;

      if (rhythm === 'VFIB') {
        const chaos1 = Math.sin(x * 0.15) * 24;
        const chaos2 = Math.sin(x * 0.38 + 1.2) * 14;
        const noise = (Math.random() - 0.5) * 10;
        y = midY + chaos1 + chaos2 + noise;
      } else if (rhythm === 'PVT') {
        const t = (x % 30) / 30;
        y = midY + Math.sin(t * Math.PI * 2) * 32 + (Math.random() - 0.5) * 4;
      } else if (rhythm === 'ASYSTOLE') {
        y = midY + Math.sin(x * 0.02) * 3 + (Math.random() - 0.5) * 1.5;
      } else if (rhythm === 'PEA') {
        const cycle = x % 65;
        if (cycle < 10) y = midY - Math.sin(cycle * 0.3) * 6;
        else if (cycle >= 15 && cycle < 20) y = midY + 4;
        else if (cycle >= 20 && cycle < 25) y = midY - 38;
        else if (cycle >= 25 && cycle < 30) y = midY + 14;
        else if (cycle >= 35 && cycle < 50) y = midY - Math.sin((cycle - 35) * 0.2) * 10;
        else y = midY;
      } else if (rhythm === 'NSR_ROSC') {
        const cycle = x % 80;
        if (cycle < 12) y = midY - Math.sin(cycle * 0.26) * 7;
        else if (cycle >= 18 && cycle < 22) y = midY + 5;
        else if (cycle >= 22 && cycle < 28) y = midY - 48;
        else if (cycle >= 28 && cycle < 34) y = midY + 16;
        else if (cycle >= 42 && cycle < 60) y = midY - Math.sin((cycle - 42) * 0.17) * 12;
        else y = midY;
      }

      ctx.lineWidth = 2.2;
      ctx.strokeStyle = rhythm === 'NSR_ROSC' ? '#10B981' : rhythm === 'ASYSTOLE' ? '#F43F5E' : '#38BDF8';
      ctx.beginPath();
      ctx.moveTo(x - 2 < 0 ? 0 : x - 2, y);
      ctx.lineTo(x, y);
      ctx.stroke();

      x = (x + 2) % width;
      animFrameRef.current = requestAnimationFrame(renderECG);
    };

    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, width, height);

    animFrameRef.current = requestAnimationFrame(renderECG);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [rhythm]);

  // Defibrillator Step 1: Charge Capacitor
  const handleChargeDefibrillator = () => {
    if (isCharging || isCharged) return;
    setIsCharging(true);
    showToast(`⚡ Charging Biphasic Defibrillator to ${selectedEnergyJoules} Joules... STAND CLEAR!`, 'warn');
    clinicalAudio.playDefibCharge(2.0);

    setTimeout(() => {
      setIsCharging(false);
      setIsCharged(true);
      showToast(`⚡ DEFIBRILLATOR CHARGED & READY (${selectedEnergyJoules}J). Confirm all clear before shock discharge.`, 'error');
      addEvent('shock', `Defibrillator Capacitor Charged (${selectedEnergyJoules}J)`, 'Pads placed anterolateral. Safety perimeter established.', 'DEFIBRILLATION');
    }, 2000);
  };

  // Defibrillator Step 2: Shock Discharge
  const handleDeliverShock = () => {
    if (!isCharged) {
      showToast('Capacitor not charged! Click "Charge Defibrillator" first.', 'info');
      return;
    }

    clinicalAudio.playDefibShock();
    setShocksDeliveredCount(c => c + 1);
    setIsCharged(false);
    showToast(`⚡ SHOCK #${shocksDeliveredCount + 1} DELIVERED AT ${selectedEnergyJoules}J! Resume chest compressions IMMEDIATELY.`, 'warn');
    addEvent('shock', `Shock #${shocksDeliveredCount + 1} Delivered (${selectedEnergyJoules}J Biphasic)`, 'Shock discharged successfully. Zero pause - CPR resumed immediately.', 'DEFIBRILLATION');

    setTelemetryEtCO2(prev => Math.min(32, prev + 3));
    setRhythmCycleSeconds(120);
  };

  // Drug Administration: Epinephrine 1mg
  const handleGiveEpinephrine = () => {
    setEpiCountdownSeconds(180);
    clinicalAudio.playSuccessChime();
    showToast('💉 Epinephrine 1mg IV Push administered with 20mL NS flush. 3-min cycle timer reset.', 'success');
    addEvent('drug', 'Epinephrine 1mg IV Push Given', 'Administered via peripheral IV with 20mL saline flush & limb elevation.', 'PHARMACOPEIA');
  };

  // Drug Administration: Amiodarone 300mg / 150mg
  const handleGiveAmiodarone = (dose: number) => {
    clinicalAudio.playSuccessChime();
    showToast(`💉 Amiodarone ${dose}mg IV Bolus administered.`, 'success');
    addEvent('drug', `Amiodarone ${dose}mg IV Push`, `First-line antiarrhythmic bolus for refractory VF/pVT.`, 'PHARMACOPEIA');
  };

  // Drug Administration: Sodium Bicarbonate / Calcium / Magnesium
  const handleGiveSpecialtyDrug = (name: string, dose: string) => {
    clinicalAudio.playSuccessChime();
    showToast(`💉 ${name} ${dose} administered for metabolic correction.`, 'info');
    addEvent('drug', `${name} ${dose} IV`, `Targeted therapy for reversible cause.`, 'PHARMACOPEIA');
  };

  // Trigger Return of Spontaneous Circulation (ROSC)
  const handleAchieveROSC = async () => {
    setIsRoscAchieved(true);
    setRhythm('NSR_ROSC');
    setTelemetryHR(78);
    setTelemetryBP('118/74');
    setTelemetrySpO2('98%');
    setTelemetryEtCO2(42);
    setCprMetronomeActive(false);

    clinicalAudio.playRoscFanfare();
    showToast('🎉 ROSC ACHIEVED! Palpable carotid pulse confirmed. Normal Sinus Rhythm established.', 'success');
    addEvent('rosc', 'Return of Spontaneous Circulation (ROSC)', 'Abrupt surge in EtCO2 to 42 mmHg. Palpable radial pulse. Normal Sinus Rhythm at 78 bpm. Initiating post-resuscitation care.', 'POST-CARDIAC ARREST CARE');

    try {
      await db.aclsLogs.add({
        id: `LOG-ACLS-${Date.now()}`,
        codeLeader: 'Dr. Gregory House, MD (ACLS Director)',
        codeDocumenter: 'Nurse Sarah Jenkins, RN',
        eventDate: new Date().toLocaleDateString(),
        arrestTime: new Date().toLocaleTimeString(),
        initialRhythm: 'Ventricular Fibrillation (VF)',
        shocksDelivered: Array.from({ length: shocksDeliveredCount }).map((_, i) => ({
          time: `Cycle ${i + 1}`,
          energyJoules: selectedEnergyJoules
        })),
        medicationsAdministered: eventLog.filter(e => e.type === 'drug').map(d => ({
          time: d.timestamp,
          medication: d.title,
          dose: d.detail
        })),
        cprMinutes: Math.ceil(totalSeconds / 60) || 4,
        outcome: 'ROSC',
        summaryNotes: `High-quality ACLS protocol executed. 200J Biphasic defibrillation delivered x${shocksDeliveredCount}. Epinephrine and Amiodarone administered. ROSC verified with EtCO2 spike to 42 mmHg.`
      });
    } catch (err) {
      console.warn('Auto-save ACLS log error:', err);
    }
  };

  // Reset drill
  const handleResetDrill = () => {
    setIsActive(false);
    setIsRoscAchieved(false);
    setTotalSeconds(0);
    setRhythmCycleSeconds(120);
    setEpiCountdownSeconds(180);
    setShocksDeliveredCount(0);
    setIsCharged(false);
    setIsCharging(false);
    setCprMetronomeActive(false);
    setRhythm('VFIB');
    setTelemetryHR(0);
    setTelemetryBP('---/---');
    setTelemetrySpO2('---%');
    setTelemetryEtCO2(14);
    showToast('Resuscitation simulation reset to standby.', 'info');
  };

  return (
    <div className="bg-[#0B1120] text-slate-100 rounded-3xl border-2 border-slate-800 shadow-2xl overflow-hidden flex flex-col font-sans">
      
      {/* FDA Statutory CDS Compliance Notice */}
      <div className="w-full bg-slate-950 px-4 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span className="flex items-center gap-1.5 text-slate-300">
          <ShieldCheck size={12} className="text-blue-400 shrink-0" />
          <strong>FDA Clinical Decision Support (CDS) Notice:</strong> Cognitive workflow assistant based on AHA Guidelines. Attending physician protocol supersedes all timers.
        </span>
        <span className="text-slate-500 hidden sm:inline">21 U.S.C. § 360j(o)(1)(E) Non-Device CDS</span>
      </div>

      {/* 1. TOP HEADER & METRONOME COMMAND STRIP */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Patient & Arrest Location */}
        <div className="flex items-center gap-3">
          <div className={`w-3.5 h-3.5 rounded-full ${isRoscAchieved ? 'bg-emerald-500 shadow-[0_0_12px_#10B981]' : isActive ? 'bg-rose-500 animate-ping' : 'bg-slate-500'}`} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white tracking-tight font-display">
                ACLS Resuscitation Deck: {patientRoom}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono ${
                isRoscAchieved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : isActive ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {isRoscAchieved ? '🎉 ROSC ACTIVE' : isActive ? '🚨 CODE BLUE IN PROGRESS' : 'STANDBY'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Patient: <strong className="text-slate-200">{patientName}</strong> • AHA ACLS Guidelines Compliant
            </p>
          </div>
        </div>

        {/* Center: Live Timers */}
        <div className="flex items-center gap-3 font-mono text-xs">
          
          {/* Total Arrest Time */}
          <div className="bg-[#1E293B] border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-inner">
            <Clock size={15} className="text-rose-400" />
            <div>
              <span className="text-[9px] block text-slate-400 font-bold uppercase">Total Arrest Time</span>
              <span className="text-sm font-black text-rose-300">{formatTime(totalSeconds)}</span>
            </div>
          </div>

          {/* 2-Min Rhythm Check Timer */}
          <div className="bg-[#1E293B] border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-inner">
            <Activity size={15} className="text-blue-400" />
            <div>
              <span className="text-[9px] block text-slate-400 font-bold uppercase">2-Min CPR Check</span>
              <span className={`text-sm font-black ${rhythmCycleSeconds <= 15 ? 'text-rose-400 animate-pulse' : 'text-blue-300'}`}>
                {formatTime(rhythmCycleSeconds)}
              </span>
            </div>
          </div>

          {/* 3-Min Epinephrine Cycle */}
          <div className="bg-[#1E293B] border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-inner">
            <Pill size={15} className="text-purple-400" />
            <div>
              <span className="text-[9px] block text-slate-400 font-bold uppercase">Next Epi 1mg</span>
              <span className={`text-sm font-black ${epiCountdownSeconds <= 20 ? 'text-purple-300 animate-pulse' : 'text-purple-400'}`}>
                {formatTime(epiCountdownSeconds)}
              </span>
            </div>
          </div>

        </div>

        {/* Right: Master Drill Controls */}
        <div className="flex items-center gap-2 font-sans">
          
          {!isActive ? (
            <button
              onClick={() => {
                setIsActive(true);
                setCprMetronomeActive(true);
                showToast('🚨 Code Blue Resuscitation Drill Started!', 'error');
                addEvent('system', 'Resuscitation Timer Started', 'CPR Metronome engaged at 110 bpm.', 'ACLS INITIATION');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Zap size={14} /> Start ACLS Code Blue
            </button>
          ) : !isRoscAchieved ? (
            <button
              onClick={handleAchieveROSC}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer animate-bounce"
            >
              <ShieldCheck size={14} /> Confirm Pulse &amp; ROSC
            </button>
          ) : (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-600/40">
              <CheckCircle2 size={14} /> Spontaneous Rhythm Maintained
            </span>
          )}

          <button
            onClick={handleResetDrill}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700 cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw size={15} />
          </button>

          {onStandDown && (
            <button
              onClick={onStandDown}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
            >
              Close Studio
            </button>
          )}

        </div>

      </div>

      {/* MAIN 3-COLUMN STUDIO WORKSPACE */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-hidden min-h-0">
        
        {/* COLUMN 1: LIVE CARDIAC TELEMETRY MONITOR (5 COLS) */}
        <div className="lg:col-span-5 bg-[#111827] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-xl overflow-hidden min-h-0">
          
          <div>
            {/* Monitor Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Radio size={16} className="text-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-black text-slate-200 tracking-wider">
                  LEAD II TELEMETRY • 25mm/s • 10mm/mV
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold">
                  {rhythm}
                </span>
              </div>
            </div>

            {/* Sweep Canvas ECG */}
            <div className="relative w-full h-36 bg-[#030712] rounded-xl my-3 border border-slate-800 overflow-hidden">
              <canvas 
                ref={canvasRef} 
                width={500} 
                height={144} 
                className="w-full h-full block"
              />
              <div className="absolute top-2 left-2 pointer-events-none text-[10px] font-mono font-bold text-emerald-500">
                ECG LEAD II
              </div>
            </div>

            {/* Live Numerical Readouts Grid */}
            <div className="grid grid-cols-4 gap-2 font-mono text-center mb-2">
              <div className="bg-[#1E293B] p-2 rounded-xl border border-slate-700">
                <span className="text-[9px] text-slate-400 block font-bold">HEART RATE</span>
                <span className="text-lg font-black text-emerald-400">{telemetryHR} <span className="text-[10px] font-normal text-slate-400">bpm</span></span>
              </div>
              <div className="bg-[#1E293B] p-2 rounded-xl border border-slate-700">
                <span className="text-[9px] text-slate-400 block font-bold">ART BP</span>
                <span className="text-base font-black text-rose-400">{telemetryBP}</span>
              </div>
              <div className="bg-[#1E293B] p-2 rounded-xl border border-slate-700">
                <span className="text-[9px] text-slate-400 block font-bold">SpO2 PULSE</span>
                <span className="text-lg font-black text-blue-400">{telemetrySpO2}</span>
              </div>
              <div className="bg-[#1E293B] p-2 rounded-xl border border-slate-700">
                <span className="text-[9px] text-slate-400 block font-bold">EtCO2</span>
                <span className={`text-lg font-black ${telemetryEtCO2 >= 40 ? 'text-emerald-400' : telemetryEtCO2 >= 20 ? 'text-amber-400' : 'text-slate-400'}`}>
                  {telemetryEtCO2} <span className="text-[10px] font-normal">mmHg</span>
                </span>
              </div>
            </div>
          </div>

          {/* CPR METRONOME & COMPRESSION GUIDE */}
          <div className="bg-[#1E293B] p-3 rounded-xl border border-slate-700 mt-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${cprMetronomeActive ? 'bg-amber-400 animate-ping' : 'bg-slate-600'}`} />
                <span className="text-xs font-bold text-slate-200 font-mono">High-Quality CPR Metronome</span>
              </div>
              <button
                onClick={() => setCprMetronomeActive(!cprMetronomeActive)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold font-mono transition-all cursor-pointer ${
                  cprMetronomeActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cprMetronomeActive ? <span className="flex items-center gap-1"><Volume2 size={12} /> 110 BPM ACTIVE</span> : <span className="flex items-center gap-1"><VolumeX size={12} /> MUTED</span>}
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400">
              <div>Depth: <strong className="text-white">5–6 cm (2.0–2.4 in)</strong></div>
              <div>Rate: <strong className="text-white">100–120 /min</strong></div>
              <div>Recoil: <strong className="text-emerald-400">Full Chest Recoil</strong></div>
            </div>
          </div>

          {/* Rhythm Selector Switcher */}
          <div className="pt-3 border-t border-slate-800">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1.5">
              Rhythm Engine Simulation State:
            </span>
            <div className="grid grid-cols-5 gap-1.5 font-mono text-[10px]">
              {(['VFIB', 'PVT', 'ASYSTOLE', 'PEA', 'NSR_ROSC'] as CardiacRhythmType[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRhythm(r);
                    if (r === 'NSR_ROSC') handleAchieveROSC();
                    else setIsRoscAchieved(false);
                    showToast(`Rhythm changed to ${r}`, 'info');
                    addEvent('rhythm', `Rhythm Transitioned: ${r}`, `Clinical cardiac rhythm simulated on Lead II.`, 'CARDIAC MONITORING');
                  }}
                  className={`py-1.5 px-1 rounded-lg font-bold transition-all cursor-pointer text-center truncate ${
                    rhythm === r ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {r === 'NSR_ROSC' ? 'NSR/ROSC' : r}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* COLUMN 2: DEFIBRILLATOR & ACLS PHARMACOPEIA (4 COLS) */}
        <div className="lg:col-span-4 bg-[#111827] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-xl overflow-y-auto custom-scrollbar min-h-0 space-y-4">
          
          {/* DEFIBRILLATOR SECTION */}
          <div className="bg-[#1E293B] border-2 border-slate-700 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs font-mono">
                <Zap size={16} />
                <span>AHA BIPHASIC DEFIBRILLATOR</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Shocks: <strong className="text-white text-xs">{shocksDeliveredCount}</strong>
              </span>
            </div>

            {/* Energy Selector */}
            <div className="flex items-center justify-between gap-1.5 font-mono text-xs">
              {[120, 150, 200, 360].map(j => (
                <button
                  key={j}
                  onClick={() => setSelectedEnergyJoules(j)}
                  className={`flex-1 py-1 rounded-md font-bold transition-all cursor-pointer ${
                    selectedEnergyJoules === j ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {j}J
                </button>
              ))}
            </div>

            {/* Dual Action Shock Cockpit */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleChargeDefibrillator}
                disabled={isCharging || isCharged}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 ${
                  isCharged 
                    ? 'bg-emerald-600 text-white cursor-default' 
                    : isCharging 
                      ? 'bg-amber-600 text-white animate-pulse' 
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-md'
                }`}
              >
                <Zap size={14} />
                <span>{isCharged ? '⚡ CHARGED' : isCharging ? 'CHARGING...' : `CHARGE ${selectedEnergyJoules}J`}</span>
              </button>

              <button
                onClick={handleDeliverShock}
                disabled={!isCharged}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 ${
                  isCharged 
                    ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-lg cursor-pointer' 
                    : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                }`}
              >
                <Flame size={14} />
                <span>DISCHARGE SHOCK</span>
              </button>
            </div>
          </div>

          {/* ACLS DRUG PROTOCOL BUTTONS */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
                <Pill size={14} className="text-purple-400" />
                ACLS Resuscitation Pharmacopeia
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <button
                onClick={handleGiveEpinephrine}
                className="p-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-700/60 text-purple-200 text-left transition-all cursor-pointer font-bold"
              >
                <span className="block text-[11px] text-white">Epinephrine 1mg IV</span>
                <span className="text-[9px] text-purple-300 font-normal">Every 3-5 mins (1:10,000)</span>
              </button>

              <button
                onClick={() => handleGiveAmiodarone(300)}
                className="p-2.5 rounded-xl bg-blue-950/60 hover:bg-blue-900 border border-blue-700/60 text-blue-200 text-left transition-all cursor-pointer font-bold"
              >
                <span className="block text-[11px] text-white">Amiodarone 300mg</span>
                <span className="text-[9px] text-blue-300 font-normal">1st dose refractory VF/pVT</span>
              </button>

              <button
                onClick={() => handleGiveAmiodarone(150)}
                className="p-2.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/40 text-blue-300 text-left transition-all cursor-pointer font-bold"
              >
                <span className="block text-[11px] text-white">Amiodarone 150mg</span>
                <span className="text-[9px] text-blue-300 font-normal">2nd dose repeat</span>
              </button>

              <button
                onClick={() => handleGiveSpecialtyDrug('Sodium Bicarbonate', '50 mEq')}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-left transition-all cursor-pointer font-bold"
              >
                <span className="block text-[11px] text-white">Sodium Bicarb 50mEq</span>
                <span className="text-[9px] text-slate-400 font-normal">Acidosis / Hyperkalemia</span>
              </button>

              <button
                onClick={() => handleGiveSpecialtyDrug('Calcium Chloride', '1g')}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-left transition-all cursor-pointer font-bold"
              >
                <span className="block text-[11px] text-white">Calcium Chloride 1g</span>
                <span className="text-[9px] text-slate-400 font-normal">Hyperkalemia cardioprotect</span>
              </button>

              <button
                onClick={() => handleGiveSpecialtyDrug('Magnesium Sulfate', '2g')}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-left transition-all cursor-pointer font-bold"
              >
                <span className="block text-[11px] text-white">Magnesium 2g IV</span>
                <span className="text-[9px] text-slate-400 font-normal">Torsades de Pointes</span>
              </button>
            </div>
          </div>

          {/* POINT-OF-CARE ABG LAB TOGGLE */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => setShowAbgPanel(!showAbgPanel)}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold font-mono text-slate-200 flex items-center justify-between cursor-pointer transition-all"
            >
              <span className="flex items-center gap-1.5">
                <Droplets size={14} className="text-rose-400" />
                Point-of-Care Blood Gas (ABG) Lab
              </span>
              <ChevronRight size={14} className={`transition-transform ${showAbgPanel ? 'rotate-90' : ''}`} />
            </button>

            {showAbgPanel && (
              <div className="mt-2 bg-[#0F172A] border border-slate-800 p-3 rounded-xl text-xs font-mono space-y-1.5 text-slate-300">
                <div className="grid grid-cols-3 gap-1 text-[11px]">
                  <div>pH: <strong className="text-rose-400">{abgData.pH}</strong></div>
                  <div>pCO2: <strong className="text-amber-400">{abgData.pCO2}</strong></div>
                  <div>pO2: <strong className="text-blue-400">{abgData.pO2}</strong></div>
                  <div>HCO3: <strong className="text-rose-400">{abgData.HCO3}</strong></div>
                  <div>Lactate: <strong className="text-rose-400">{abgData.Lactate}</strong></div>
                  <div>K+: <strong className="text-amber-400">{abgData.Potassium}</strong></div>
                </div>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                  Diag: <span className="text-slate-200 font-semibold">{abgData.Interpretation}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* COLUMN 3: 5 H'S & 5 T'S CHECKLIST & LIVE CHRONOLOGICAL EVENT LOG (3 COLS) */}
        <div className="lg:col-span-3 bg-[#111827] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-xl overflow-hidden min-h-0 space-y-3">
          
          {/* 5 H's and 5 T's Checklist */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 font-mono flex items-center gap-1">
                <Layers size={13} className="text-blue-400" />
                5 H's &amp; 5 T's Reversible Causes
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono max-h-32 overflow-y-auto custom-scrollbar pr-1">
              {Object.entries(causesChecklist).map(([cause, checked]) => (
                <button
                  key={cause}
                  onClick={() => {
                    setCausesChecklist(prev => ({ ...prev, [cause]: !prev[cause] }));
                    showToast(`${cause} marked as ${!checked ? 'Identified/Treated' : 'Ruled out'}.`, 'info');
                  }}
                  className={`p-1.5 rounded text-left flex items-center gap-1 transition-all cursor-pointer truncate ${
                    checked ? 'bg-amber-950/60 border border-amber-600/60 text-amber-300 font-bold' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${checked ? 'bg-amber-400' : 'bg-slate-600'}`} />
                  <span className="truncate">{cause}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chronological Resuscitation Timeline Log */}
          <div className="flex-1 flex flex-col min-h-0 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between pb-1.5">
              <span className="text-xs font-bold text-slate-200 font-mono flex items-center gap-1">
                <FileText size={13} className="text-emerald-400" />
                Resuscitation Event Log
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {eventLog.length} Events
              </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1 text-[11px] font-mono">
              {eventLog.map(ev => (
                <div 
                  key={ev.id}
                  className="p-2 rounded-xl bg-[#1E293B] border border-slate-700/80 space-y-0.5"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 font-bold">{ev.timestamp}</span>
                    <span className={`px-1.5 py-0.2 rounded font-black uppercase text-[8px] ${
                      ev.type === 'shock' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : ev.type === 'drug' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : ev.type === 'rosc' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {ev.aclsCategory}
                    </span>
                  </div>
                  <div className="text-slate-200 font-bold">{ev.title}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{ev.detail}</div>
                </div>
              ))}
            </div>

            {/* Export Summary Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(eventLog, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `ACLS_Resuscitation_Log_${patientRoom.replace(/\s+/g, '_')}_${Date.now()}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                  showToast('Code Blue Event Log exported to JSON.', 'success');
                }}
                className="w-full py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-700"
              >
                <Download size={13} /> Export ACLS Event Debrief
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
});
