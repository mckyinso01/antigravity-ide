import React, { useState } from 'react';
import type { SkuItem } from '../types';
import { 
  X, 
  ScanLine, 
  Camera, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Keyboard
} from 'lucide-react';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  skus: SkuItem[];
  onScannedSku: (sku: SkuItem) => void;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  skus,
  onScannedSku
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState('');
  const [matchedSku, setMatchedSku] = useState<SkuItem | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioProfile, setAudioProfile] = useState<'ZEBRA' | 'HONEYWELL' | 'DATALOGIC'>('ZEBRA');
  const [scanSuccessAnim, setScanSuccessAnim] = useState(false);
  const [scanErrorAnim, setScanErrorAnim] = useState(false);
  const [mispickMessage, setMispickMessage] = useState<string | null>(null);

  // Play synthetic warehouse scanner beep based on hardware profile
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (audioProfile === 'ZEBRA') {
        // Zebra TC52 crisp dual-pitch chime (880Hz -> 1760Hz)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        osc.frequency.setValueAtTime(1760, audioCtx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.14);
      } else if (audioProfile === 'HONEYWELL') {
        // Honeywell Dolphin warm resonant bell tone (1200Hz)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.18);
      } else {
        // Datalogic Memor Green Spot laser confirmation (2000Hz)
        osc.type = 'square';
        osc.frequency.setValueAtTime(2000, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.09);
      }
    } catch {
      // Audio context fallback
    }
  };

  // Play 220Hz low sawtooth mispick error buzz
  const playMispickBuzz = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc.frequency.setValueAtTime(180, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.45, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.28);
    } catch {
      // Audio fallback
    }
  };

  const handleScanCode = (code: string) => {
    const clean = code.trim().toLowerCase();
    if (!clean) return;

    const found = skus.find(s => 
      s.barcode.toLowerCase() === clean || 
      s.skuCode.toLowerCase() === clean || 
      s.rfidTag.toLowerCase() === clean
    );

    if (found) {
      playBeep();
      setMatchedSku(found);
      setMispickMessage(null);
      setScanSuccessAnim(true);
      setTimeout(() => setScanSuccessAnim(false), 1500);
      onScannedSku(found);
    } else {
      playMispickBuzz();
      setMatchedSku(null);
      setMispickMessage(`MISPICK / UNKNOWN BARCODE: "${code}"`);
      setScanErrorAnim(true);
      setTimeout(() => setScanErrorAnim(false), 1800);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode) handleScanCode(inputCode);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[460px] max-w-full z-50 bg-[#070B14]/98 border-l border-[#2A4374] shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col h-full overflow-y-auto animate-slideLeft font-sans">
      {/* Header */}
      <div className="h-14 border-b border-[#1E2D4D] bg-[#0D1527] px-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#5BC0BE]/20 border border-[#5BC0BE]/40 flex items-center justify-center text-[#5BC0BE]">
            <ScanLine size={18} />
          </div>
          <div>
            <h3 className="font-mono font-bold text-sm text-white">Smart Barcode & RFID Scanner</h3>
            <span className="text-[10px] text-[#5BC0BE] font-mono">WASM Real-Time Decoder • Sub-50ms</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#121D36] transition-all cursor-pointer"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={16} className="text-emerald-400" /> : <VolumeX size={16} />}
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#121D36] transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Viewfinder Video Simulator */}
      <div className="p-5 space-y-4 flex-1">
        <div className="relative h-56 rounded-xl bg-[#0D1527] border-2 border-dashed border-[#1E2D4D] flex flex-col items-center justify-center overflow-hidden">
          {/* Viewfinder Reticle */}
          <div className="absolute inset-8 border border-white/20 rounded-lg pointer-events-none flex flex-col justify-between p-2">
            <div className="flex justify-between">
              <span className="w-3 h-3 border-t-2 border-l-2 border-[#5BC0BE]"></span>
              <span className="w-3 h-3 border-t-2 border-r-2 border-[#5BC0BE]"></span>
            </div>
            <div className="flex justify-between">
              <span className="w-3 h-3 border-b-2 border-l-2 border-[#5BC0BE]"></span>
              <span className="w-3 h-3 border-b-2 border-r-2 border-[#5BC0BE]"></span>
            </div>
          </div>

          {/* Red Laser Scanning Beam */}
          <div className="absolute left-0 right-0 h-0.5 bg-rose-500 shadow-[0_0_12px_#f43f5e] animate-laser"></div>

          <Camera size={36} className="text-slate-600 mb-2 opacity-50" />
          <span className="text-xs text-slate-400 font-mono">Point camera at GS1 Barcode or RFID Tag</span>
          <span className="text-[10px] text-[#5BC0BE] font-mono mt-1">Ready for Bluetooth / USB Laser Input</span>

          {/* Success flash */}
          {scanSuccessAnim && (
            <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-xs flex items-center justify-center animate-in fade-in duration-100">
              <div className="bg-[#070B14] border border-emerald-400 text-emerald-300 font-mono text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-2xl">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <div>
                  <div className="font-bold text-white">VALID BARCODE CONFIRMED</div>
                  <div className="text-[10px] text-emerald-400">{audioProfile} Audio Chime (880Hz) • 0.024s</div>
                </div>
              </div>
            </div>
          )}

          {/* Error / Mispick flash */}
          {scanErrorAnim && (
            <div className="absolute inset-0 bg-rose-500/25 backdrop-blur-xs flex items-center justify-center animate-in fade-in duration-100">
              <div className="bg-[#070B14] border border-rose-500 text-rose-300 font-mono text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-2xl">
                <X size={16} className="text-rose-500" />
                <div>
                  <div className="font-bold text-rose-200">MISPICK DETECTED</div>
                  <div className="text-[10px] text-rose-400">220Hz Low Warning Buzz</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hardware Sound Profile Selector */}
        <div className="space-y-1 bg-[#0D1527] p-2.5 rounded-xl border border-[#1E2D4D]">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400 font-bold">SCANNER AUDIO PROFILE:</span>
            <span className="text-[#5BC0BE] font-bold">{audioProfile}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <button
              onClick={() => setAudioProfile('ZEBRA')}
              className={`py-1 px-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                audioProfile === 'ZEBRA'
                  ? 'bg-[#5BC0BE] text-[#070B14] shadow-xs'
                  : 'bg-[#121D36] text-slate-400 hover:text-white border border-[#1E2D4D]'
              }`}
            >
              Zebra TC52 (880Hz)
            </button>
            <button
              onClick={() => setAudioProfile('HONEYWELL')}
              className={`py-1 px-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                audioProfile === 'HONEYWELL'
                  ? 'bg-[#5BC0BE] text-[#070B14] shadow-xs'
                  : 'bg-[#121D36] text-slate-400 hover:text-white border border-[#1E2D4D]'
              }`}
            >
              Honeywell (1.2kHz)
            </button>
            <button
              onClick={() => setAudioProfile('DATALOGIC')}
              className={`py-1 px-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                audioProfile === 'DATALOGIC'
                  ? 'bg-[#5BC0BE] text-[#070B14] shadow-xs'
                  : 'bg-[#121D36] text-slate-400 hover:text-white border border-[#1E2D4D]'
              }`}
            >
              Datalogic (2kHz)
            </button>
          </div>
        </div>

        {/* Quick-Click Sample Barcodes to Test Instantly */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400 font-bold">1-Click Test Scenarios:</span>
            <button
              onClick={() => handleScanCode('MISPICK-INVALID-CODE-999')}
              className="text-rose-400 hover:text-rose-300 font-bold text-[10px] underline cursor-pointer"
              title="Test 220Hz Mispick Error Buzz"
            >
              ⚠️ Test 220Hz Mispick Buzz
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {skus.slice(0, 4).map((sku) => (
              <button
                key={sku.id}
                onClick={() => handleScanCode(sku.barcode)}
                className="p-2.5 rounded-xl bg-[#0D1527] hover:bg-[#121D36] border border-[#1E2D4D] hover:border-[#5BC0BE] text-left transition-all cursor-pointer font-mono text-[10px]"
              >
                <div className="font-bold text-white truncate">{sku.skuCode}</div>
                <div className="text-slate-400 truncate">{sku.barcode}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Input Fallback */}
        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Keyboard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Manual Barcode / RFID Tag..."
              className="w-full bg-[#0D1527] border border-[#1E2D4D] focus:border-[#5BC0BE] text-white text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none font-mono"
            />
          </div>
          <button
            type="submit"
            className="bg-[#5BC0BE] hover:bg-[#6FFFE9] text-[#070B14] font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer font-mono glow-mint"
          >
            Verify
          </button>
        </form>

        {/* Mispick Banner */}
        {mispickMessage && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-600 text-rose-200 text-xs font-mono flex items-center gap-2 animate-shake">
            <X size={16} className="text-rose-400 shrink-0" />
            <div>
              <div className="font-bold">{mispickMessage}</div>
              <div className="text-[10px] text-rose-300">Audio Warning: 220Hz low tone sounded. Check SKU tag.</div>
            </div>
          </div>
        )}

        {/* Matched SKU Result Card */}
        {matchedSku && (
          <div className="p-3.5 rounded-xl bg-[#121D36] border border-[#5BC0BE] space-y-1.5 animate-in fade-in zoom-in duration-150 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#5BC0BE] font-bold flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-400" />
                VERIFIED SKU MATCH
              </span>
              <span className="text-emerald-400 font-bold">{matchedSku.stockQty} In Stock</span>
            </div>
            <h4 className="text-white font-sans font-bold text-xs">{matchedSku.name}</h4>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300 pt-1">
              <div>Primary Bin: <strong className="text-[#6FFFE9]">{matchedSku.primaryBin}</strong></div>
              <div>Turnover: <strong className="text-emerald-400">{matchedSku.turnoverRate}x/yr</strong></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
