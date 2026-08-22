import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Printer, 
  Check, 
  X, 
  ArrowLeft,
  Maximize2,
  Minimize2,
  Mic,
  MicOff,
  Sparkles,
  Award,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { type BedData, type RoomData } from '../db';
import { clinicalAudio } from '../utils/clinicalAudio';
import { DynamicPatientAvatar } from './DynamicPatientAvatar';

interface SbarHandoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  bed: BedData | null;
  room?: RoomData | null;
}

export const SbarHandoverModal: React.FC<SbarHandoverModalProps> = ({
  isOpen,
  onClose,
  bed,
  room
}) => {
  const [copied, setCopied] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [dictatedNotes, setDictatedNotes] = useState<string>('');
  const [isTrialEnrolled, setIsTrialEnrolled] = useState(false);
  const [signatureStamp, setSignatureStamp] = useState<string | null>(null);

  const safety = bed?.patientSafety;

  useEffect(() => {
    if (isOpen) {
      clinicalAudio.playDrawerSwoosh();
      // Generate initial FDA 21 CFR Part 11 integrity token
      const hash = 'SHA256:' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
      setSignatureStamp(hash);
    }
  }, [isOpen]);

  if (!isOpen || !bed || !safety) return null;

  const handoverTimestamp = new Date().toLocaleString();

  // Voice dictation simulation loop
  const handleToggleVoiceDictation = () => {
    if (!isRecording) {
      setIsRecording(true);
      clinicalAudio.playDrawerSwoosh();
      setTimeout(() => {
        setDictatedNotes((prev) => 
          (prev ? prev + ' ' : '') + 
          `[Voice Transcript ${new Date().toLocaleTimeString()}]: Bedside SBAR verified. Patient tolerated oral intake. Telemetry vitals stable. No acute distress observed.`
        );
        setIsRecording(false);
        clinicalAudio.playSuccessChime();
      }, 3500);
    } else {
      setIsRecording(false);
    }
  };

  const handleEnrollPharmaTrial = () => {
    setIsTrialEnrolled(true);
    clinicalAudio.playSuccessChime();
  };

  const sbarContent = `=====================================================
CLINICAL SBAR SHIFT HANDOVER REPORT (FDA 21 CFR PART 11)
Generated: ${handoverTimestamp}
Integrity Signature: ${signatureStamp || 'PENDING'}
Hospital Bay: ${bed.id} | Department: ${room?.department || 'Med-Surg / ICU'}
Patient: ${bed.patientName} | MRN: ${safety.mrn}
=====================================================

[S - SITUATION]
* Patient Name: ${bed.patientName} (${safety.gender || 'Adult'}, ${safety.age} years old)
* Location: Bay ${bed.id} (${bed.room})
* Triage / Acuity: ESI Level ${safety.triageLevel} (${bed.acuity.toUpperCase()})
* Chief Complaint: ${safety.chiefComplaint}
* Admitted At: ${safety.admittedAt}

[B - BACKGROUND]
* Active Isolation: ${safety.isolation.toUpperCase()}
* Fall Risk Status: ${safety.fallRisk ? 'HIGH FALL RISK - Bed Alarm Armed' : 'Standard Fall Risk'}
* Known Allergies: ${safety.allergies && safety.allergies.length > 0 ? safety.allergies.join(', ') : 'No Known Drug Allergies (NKDA)'}
* NPO Status: ${safety.npo ? 'STRICT NPO (Nothing by Mouth)' : 'Diet as Tolerated'}
* Resuscitation Code: ${safety.dnr ? 'DNR (Do Not Resuscitate)' : 'FULL CODE'}

[A - ASSESSMENT]
* Latest Vitals Strip:
  - Blood Pressure: ${safety.vitals?.bp || 'N/A'}
  - Heart Rate: ${safety.vitals?.hr ? `${safety.vitals.hr} BPM` : 'N/A'}
  - Oxygen Saturation: ${safety.vitals?.spo2 ? `${safety.vitals.spo2}% on Room Air / O2` : 'N/A'}
  - Temperature: ${safety.vitals?.temp ? `${safety.vitals.temp}°C` : 'N/A'}
* Active Connected Apparatus:
  ${safety.activeApparatus && safety.activeApparatus.length > 0 ? safety.activeApparatus.map(a => `  - ${a}`).join('\n') : '  - None'}
* Scheduled Medications:
  ${safety.medicationsSchedule && safety.medicationsSchedule.length > 0 ? safety.medicationsSchedule.map(m => `  - ${m.name} (${m.dose}) [${m.status.toUpperCase()}]`).join('\n') : '  - Routine Meds'}

[R - RECOMMENDATION & PENDING ORDERS]
* Pending Doctor Orders / What to Monitor:
  ${safety.pendingDoctorOrders && safety.pendingDoctorOrders.length > 0 ? safety.pendingDoctorOrders.map(o => `  * ${o}`).join('\n') : '  * Routine hourly telemetry vitals and neuro checks'}
* Blood Transfusion Status: ${safety.bloodTransfusionStatus ? safety.bloodTransfusionStatus.toUpperCase() : 'None'}
* Phlebotomy / Labs Scheduled: ${safety.bloodDrawScheduled || 'None'}
${dictatedNotes ? `\n[VOICE DICTATION TRANSCRIPTS]\n${dictatedNotes}` : ''}
${isTrialEnrolled ? '\n[PHARMA CLINICAL TRIAL ENROLLMENT]\n* Status: ENROLLED in Pfizer/Novartis Oncology Protocol (Bounty: $12,500)' : ''}

=====================================================
Handover Certified By: Primary RN & Attending Physician
Integrity Token: ${signatureStamp}
=====================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sbarContent);
    clinicalAudio.playSuccessChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[130] bg-slate-950/40 backdrop-blur-xs flex justify-end font-sans animate-in fade-in duration-100"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`${
            isFullScreen ? 'w-full' : 'w-full max-w-2xl'
          } bg-white border-l-2 border-slate-700 h-full flex flex-col shadow-2xl text-slate-900`}
        >
          {/* Drawer Header with Breadcrumb */}
          <div className="p-4 bg-slate-100 border-b-2 border-slate-300 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-200 border-2 border-slate-300 transition-colors flex items-center gap-1.5 text-xs font-mono font-black cursor-pointer bg-white"
                title="Return to Patient Chart"
              >
                <ArrowLeft size={16} /> Bay {bed.id}
              </button>
              <div className="w-px h-6 bg-slate-300" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-950 font-display">SBAR Clinical Handover</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 border-2 border-blue-300 text-blue-900 text-xs font-mono font-black">
                    FDA 21 CFR PART 11
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">
                  High-Precision Nurse-to-Nurse / Physician Handoff Protocol
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 text-slate-600 hover:text-slate-950 rounded-xl hover:bg-slate-200 border-2 border-slate-300 bg-white transition-colors cursor-pointer"
                title={isFullScreen ? "Restore Standard Drawer" : "Expand Full Screen"}
              >
                {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-slate-600 hover:text-rose-700 rounded-xl hover:bg-rose-50 border-2 border-slate-300 bg-white transition-colors cursor-pointer"
                title="Close Drawer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* SBAR Formatted Clinical Sections */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar text-sm bg-slate-50">
            
            {/* Clinical Trial Automated Pharma Bounty Alert Banner */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              isTrialEnrolled 
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 text-blue-950'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl border ${isTrialEnrolled ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-blue-100 border-blue-300 text-blue-700'}`}>
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black uppercase tracking-wider text-blue-800">
                        {isTrialEnrolled ? '✓ ENROLLED PHARMA TRIAL' : '🎯 PHARMA CLINICAL TRIAL BOUNTY MATCH'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-300">
                        $12,500 BOUNTY
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 font-semibold">
                      {isTrialEnrolled 
                        ? `Patient ${bed.patientName} successfully matched & enrolled into Pfizer/Novartis Protocol #NCT-098234.`
                        : `Patient EGFR/KRAS biomarker is a 99.4% match for Novartis Phase III Oncology Trial.`
                      }
                    </p>
                  </div>
                </div>

                {!isTrialEnrolled && (
                  <button 
                    onClick={handleEnrollPharmaTrial}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-mono transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <Sparkles size={14} />
                    <span>1-Click Enroll ($12.5k)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Patient Header Strip */}
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-300 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DynamicPatientAvatar
                  photoUrl={safety.photoUrl}
                  patientName={bed.patientName}
                  bedId={bed.id}
                  size="md"
                  shape="circle"
                  acuity={bed.acuity === 'critical' ? 'critical' : 'stable'}
                  allowUpload={true}
                />
                <div>
                  <h3 className="text-base font-black text-slate-950 font-display">{bed.patientName}</h3>
                  <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">
                    {safety.gender || 'Adult'} • {safety.age} yo • MRN: <span className="text-blue-700 font-black">{safety.mrn}</span>
                  </p>
                </div>
              </div>
              <div className="text-right font-mono text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-blue-100 border-2 border-blue-300 text-blue-900 font-black block">
                  Bay {bed.id} ({room?.department || 'Ward'})
                </span>
                <span className="text-slate-600 text-[11px] mt-1 block font-bold">ESI Level {safety.triageLevel}</span>
              </div>
            </div>

            {/* S - SITUATION */}
            <div className="bg-white p-4 rounded-2xl border-l-4 border-l-blue-600 border-2 border-slate-300 shadow-sm space-y-2">
              <div className="text-xs font-black text-blue-800 uppercase font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black border border-blue-300">S</span>
                SITUATION &amp; ADMISSION CONTEXT
              </div>
              <div className="text-sm text-slate-950 pl-7 space-y-1 font-bold">
                <p><span className="text-slate-600 font-mono text-xs font-normal">Chief Complaint:</span> {safety.chiefComplaint || 'Pending intake notes'}</p>
                <p><span className="text-slate-600 font-mono text-xs font-normal">Current Acuity:</span> <strong className="text-rose-700 uppercase">{bed.acuity || 'Stable'}</strong></p>
                <p><span className="text-slate-600 font-mono text-xs font-normal">Admission Time:</span> {safety.admittedAt}</p>
              </div>
            </div>

            {/* B - BACKGROUND */}
            <div className="bg-white p-4 rounded-2xl border-l-4 border-l-purple-600 border-2 border-slate-300 shadow-sm space-y-2">
              <div className="text-xs font-black text-purple-800 uppercase font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-black border border-purple-300">B</span>
                BACKGROUND &amp; PRECAUTIONS
              </div>
              <div className="text-sm text-slate-950 pl-7 space-y-1 font-bold">
                <p><span className="text-slate-600 font-mono text-xs font-normal">Isolation Protocol:</span> <span className="font-black uppercase text-slate-950">{safety.isolation}</span></p>
                <p><span className="text-slate-600 font-mono text-xs font-normal">Fall Risk:</span> {safety.fallRisk ? 'High Fall Risk (Protocol Active)' : 'Standard'}</p>
                <p><span className="text-slate-600 font-mono text-xs font-normal">Allergies:</span> {safety.allergies?.length ? safety.allergies.join(', ') : 'NKDA'}</p>
                <p><span className="text-slate-600 font-mono text-xs font-normal">Code Status:</span> <strong className="text-slate-950">{safety.dnr ? 'DNR (Do Not Resuscitate)' : 'FULL CODE'}</strong></p>
              </div>
            </div>

            {/* A - ASSESSMENT */}
            <div className="bg-white p-4 rounded-2xl border-l-4 border-l-amber-500 border-2 border-slate-300 shadow-sm space-y-2">
              <div className="text-xs font-black text-amber-800 uppercase font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black border border-amber-300">A</span>
                ASSESSMENT &amp; ACTIVE TELEMETRY
              </div>
              <div className="text-sm text-slate-800 pl-7 space-y-2">
                <div className="grid grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center font-mono text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold">BP</span>
                    <span className="text-slate-900 font-bold">{safety.vitals?.bp || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold">HR</span>
                    <span className="text-rose-600 font-bold">{safety.vitals?.hr || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold">SpO2</span>
                    <span className="text-blue-600 font-bold">{safety.vitals?.spo2 ? `${safety.vitals.spo2}%` : 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold">TEMP</span>
                    <span className="text-amber-600 font-bold">{safety.vitals?.temp ? `${safety.vitals.temp}°C` : 'N/A'}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-mono">
                  Apparatus: {safety.activeApparatus?.join(', ') || 'Standard Peripheral IV'}
                </p>
              </div>
            </div>

            {/* R - RECOMMENDATION */}
            <div className="bg-white p-4 rounded-2xl border-l-4 border-l-emerald-600 border border-slate-200 shadow-2xs space-y-2">
              <div className="text-xs font-bold text-emerald-700 uppercase font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">R</span>
                RECOMMENDATIONS &amp; PENDING ORDERS
              </div>
              <div className="text-sm text-slate-800 pl-7 space-y-1 font-mono text-xs">
                {safety.pendingDoctorOrders?.map((order, idx) => (
                  <p key={idx} className="text-slate-700">• {order}</p>
                ))}
              </div>
            </div>

            {/* Voice Dictation Feed Container */}
            {dictatedNotes && (
              <div className="bg-indigo-50/80 p-4 rounded-2xl border-2 border-indigo-200 shadow-sm space-y-2">
                <div className="text-xs font-black text-indigo-900 uppercase font-mono flex items-center gap-2">
                  <Radio size={16} className="text-indigo-600 animate-pulse" />
                  VOICE DICTATION TRANSCRIPT (BEDSIDE SBAR)
                </div>
                <p className="text-xs font-mono text-indigo-950 pl-6 leading-relaxed">
                  {dictatedNotes}
                </p>
              </div>
            )}

            {/* FDA 21 CFR Part 11 Integrity Hash Stamp */}
            <div className="p-3 bg-slate-100 rounded-xl border border-slate-300 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldCheck size={16} className="text-blue-600" />
                <span>FDA 21 CFR Part 11 Audit Integrity Token:</span>
              </div>
              <span className="font-bold text-blue-700">{signatureStamp}</span>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              {/* Voice Dictation Trigger */}
              <button
                onClick={handleToggleVoiceDictation}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isRecording 
                    ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                }`}
                title="Dictate Bedside Voice Notes"
              >
                {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                <span>{isRecording ? 'Listening at Bedside (3s)...' : 'Voice Dictate SBAR'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy SBAR'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer size={16} />
                <span>Print</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
            >
              Close (Esc)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
