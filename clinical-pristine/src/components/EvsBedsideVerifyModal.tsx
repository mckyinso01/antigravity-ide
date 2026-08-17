import React, { useState } from 'react';
import { QrCode, ShieldCheck, CheckCircle2, X, AlertTriangle, KeyRound } from 'lucide-react';
import { clinicalAudio } from '../utils/clinicalAudio';

interface EvsBedsideVerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    room: string;
    bedId?: string;
    chemicalProtocol?: string;
    isolationType?: string;
  } | null;
  onVerifiedRelease: (verificationData: {
    scannedQr: string;
    disinfectantLot: string;
    evsBadgePin: string;
  }) => Promise<void>;
}

export const EvsBedsideVerifyModal: React.FC<EvsBedsideVerifyModalProps> = ({
  isOpen,
  onClose,
  task,
  onVerifiedRelease
}) => {
  const [scannedQr, setScannedQr] = useState('');
  const [disinfectantLot, setDisinfectantLot] = useState('EPA-REG-HOSP-BLEACH-LOT-9821');
  const [evsBadgePin, setEvsBadgePin] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !task) return null;

  const targetQr = `BED-QR-${task.bedId || task.room}`;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setErrorMsg('');
    setTimeout(() => {
      setScannedQr(targetQr);
      setIsScanning(false);
      clinicalAudio.playSuccessChime();
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scannedQr) {
      setErrorMsg('Bedside Doorway QR / Barcode scan is mandatory to prevent ghost cleans.');
      return;
    }
    if (scannedQr !== targetQr) {
      setErrorMsg(`Invalid QR scanned! Expected ${targetQr} for this room.`);
      return;
    }
    if (!disinfectantLot.trim()) {
      setErrorMsg('Chemical Sanitizer Lot # is required for infection control audit.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onVerifiedRelease({
        scannedQr,
        disinfectantLot,
        evsBadgePin: evsBadgePin || '123'
      });
      clinicalAudio.playSuccessChime();
      onClose();
    } catch {
      setErrorMsg('Failed to release bed. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden font-sans">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-md">
              <ShieldCheck size={26} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display">Bedside Sanitation Verification Gate</h2>
              <p className="text-xs text-emerald-100">Anti-Ghost Clean Physical Presence Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Target Bay Spec */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Target Clinical Location</span>
              <div className="text-sm font-bold text-slate-900 font-display">
                {task.room} {task.bedId ? `• Bed ${task.bedId}` : ''}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Protocol: <span className="font-semibold text-emerald-700">{task.chemicalProtocol || 'Standard Hospital Disinfection'}</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
              {task.isolationType && task.isolationType !== 'none' ? `Isolation: ${task.isolationType.toUpperCase()}` : 'Terminal Clean'}
            </span>
          </div>

          {/* QR Barcode Verification */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>1. Bedside Physical QR / NFC Scan</span>
              <span className="text-[10px] text-emerald-600 font-semibold font-mono">{targetQr}</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={scannedQr}
                onChange={(e) => setScannedQr(e.target.value)}
                placeholder="Scan bedside doorway QR code..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <QrCode size={16} />
                <span>{isScanning ? 'Scanning...' : 'Scan Badge'}</span>
              </button>
            </div>
          </div>

          {/* Chemical Lot Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Chemical Disinfectant Batch / UV-C Sensor Lot #
            </label>
            <input
              type="text"
              value={disinfectantLot}
              onChange={(e) => setDisinfectantLot(e.target.value)}
              placeholder="e.g. EPA-REG-HOSP-BLEACH-LOT-9821"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* EVS Staff PIN */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>3. EVS Specialist Confirmation PIN</span>
              <span className="text-[10px] text-slate-400">Demo PIN: 123</span>
            </label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                value={evsBadgePin}
                onChange={(e) => setEvsBadgePin(e.target.value)}
                placeholder="Enter 3-digit PIN"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertTriangle size={16} className="text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 size={16} />
              <span>{isSubmitting ? 'Verifying...' : 'Certify & Release Bed'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
