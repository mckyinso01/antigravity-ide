import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  X, 
  Check,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { db, type BedData, type PatientSafetyInfo } from '../db';
import { useToast } from '../contexts/ToastContext';
import { clinicalAudio } from '../utils/clinicalAudio';
import { DynamicPatientAvatar } from './DynamicPatientAvatar';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  availableBeds: BedData[];
  preselectedBedId?: string;
  onSuccess?: () => void;
}

export const PatientAdmissionModal = ({ isOpen, onClose, availableBeds, preselectedBedId, onSuccess }: Props) => {
  const { showToast } = useToast();
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const [patientName, setPatientName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [mrn] = useState(`MRN-${Math.floor(100000 + Math.random() * 900000)}`);
  const [age, setAge] = useState<number>(54);
  const [chiefComplaint, setChiefComplaint] = useState('Acute Dyspnea & Chest Pain');
  const [triageLevel, setTriageLevel] = useState<1 | 2 | 3 | 4 | 5>(2);
  const [selectedBedId, setSelectedBedId] = useState<string>(preselectedBedId || (availableBeds[0]?.id || ''));
  const [isolation, setIsolation] = useState<'none' | 'contact' | 'airborne' | 'droplet' | 'cdiff'>('none');
  const [fallRisk, setFallRisk] = useState(true);
  const [npo, setNpo] = useState(false);
  const [dnr, setDnr] = useState(false);
  const [allergiesText, setAllergiesText] = useState('Penicillin, Sulfa');
  const [apparatusText, setApparatusText] = useState('IV Infusion (D5LR @ 80mL/h), Telemetry Lead II');
  const [pendingOrdersText, setPendingOrdersText] = useState('Stat Troponin-I Lab, 12-Lead ECG');
  const [assignedDoctor] = useState('Dr. Angela Santos, MD (Cardiology)');
  const [assignedNurse] = useState('Staff Nurse John R.');

  // Vitals
  const [bp, setBp] = useState('142/88');
  const [hr, setHr] = useState<number>(98);
  const [spo2, setSpo2] = useState<number>(94);
  const [temp, setTemp] = useState<number>(38.2);

  useEffect(() => {
    if (isOpen) {
      clinicalAudio.playDrawerSwoosh();
      if (preselectedBedId) {
        setSelectedBedId(preselectedBedId);
      } else if (availableBeds.length > 0) {
        setSelectedBedId(availableBeds[0].id);
      }
    }
  }, [isOpen, preselectedBedId, availableBeds]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      showToast('Please enter the patient legal name.', 'warn');
      return;
    }
    if (!selectedBedId) {
      showToast('Please select an available bed.', 'warn');
      return;
    }

    try {
      const targetBed = availableBeds.find(b => b.id === selectedBedId) || await db.beds.get(selectedBedId);
      
      const acuity = triageLevel <= 2 ? 'critical' : 'stable';
      
      const safetyInfo: PatientSafetyInfo = {
        mrn,
        age,
        gender,
        photoUrl: photoUrl || undefined,
        chiefComplaint,
        triageLevel,
        allergies: allergiesText ? allergiesText.split(',').map(s => s.trim()).filter(Boolean) : [],
        fallRisk,
        npo,
        dnr,
        isolation,
        admittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        assignedDoctor,
        assignedNurse,
        activeApparatus: apparatusText ? apparatusText.split(',').map(s => s.trim()).filter(Boolean) : ['Standard IV Access'],
        pendingDoctorOrders: pendingOrdersText ? pendingOrdersText.split(',').map(s => s.trim()).filter(Boolean) : ['Baseline Lab Work'],
        medicationsSchedule: [
          { name: 'Normal Saline IV', dose: '1000mL', route: 'Continuous IV', time: '10:00 AM', status: 'due' }
        ],
        vitals: {
          bp,
          hr,
          spo2,
          temp,
          lastRecorded: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      };

      await db.beds.update(selectedBedId, {
        status: 'occupied',
        acuity,
        patientName,
        patientSafety: safetyInfo
      });

      if (targetBed?.room) {
        await db.rooms.update(targetBed.room, { status: 'occupied' });
      }

      clinicalAudio.playSuccessChime();
      showToast(`Admitted ${patientName} to Bed ${selectedBedId}`, 'success');
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Admission error:', err);
      showToast('Failed to admit patient to bed.', 'error');
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[120] bg-slate-900/30 flex justify-end font-sans animate-in fade-in duration-100"
        onClick={onClose}
      >
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.13, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`${
            isFullScreen ? 'w-full' : 'w-full max-w-xl md:max-w-2xl'
          } bg-white border-l-2 border-slate-700 h-full flex flex-col shadow-2xl text-slate-900`}
        >
          {/* Drawer Header */}
          <div className="p-4 bg-slate-100 border-b-2 border-slate-300 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-blue-400 text-blue-700 flex items-center justify-center font-black shadow-xs">
                <UserPlus size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-950 font-display">
                    Admit Patient &amp; Bay Allocation
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 border-2 border-blue-300 text-blue-900 text-xs font-mono font-black">
                    {mrn}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">
                  ER Triage Protocol • Clinical Intake &amp; Bay Assignment
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
                className="p-2 rounded-xl text-slate-600 hover:text-rose-700 hover:bg-rose-50 border-2 border-slate-300 bg-white transition-colors cursor-pointer"
                title="Close Drawer (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Form Body */}
          <form id="admission-form" onSubmit={handleSubmit} className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar text-sm bg-slate-50">
            {/* Section 1: Patient Identity */}
            <div className="space-y-4">
              <div className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <span className="text-blue-700">01</span> PATIENT DEMOGRAPHICS &amp; IDENTITY
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-slate-300 shadow-sm flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <DynamicPatientAvatar 
                    photoUrl={photoUrl} 
                    patientName={patientName || 'New Patient'} 
                    size="xl" 
                    allowUpload={true} 
                    onPhotoUploaded={(url) => setPhotoUrl(url)} 
                  />
                  <span className="text-[10px] text-slate-600 font-mono font-bold">Photo ID</span>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <div className="sm:col-span-2">
                    <label className="text-xs text-slate-700 block mb-1.5 font-bold">Patient Full Legal Name *</label>
                    <input 
                      type="text"
                      value={patientName}
                      onChange={e => setPatientName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      required
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2 text-slate-950 focus:border-blue-600 outline-none text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-700 block mb-1.5 font-bold">Gender</label>
                    <select
                      value={gender}
                      onChange={e => setGender(e.target.value as any)}
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2 text-slate-950 outline-none focus:border-blue-600 text-xs font-bold"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other / Non-Binary</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-700 block mb-1.5 font-bold">Age (Years)</label>
                    <input 
                      type="number"
                      value={age}
                      onChange={e => setAge(Number(e.target.value))}
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2 text-slate-950 focus:border-blue-600 outline-none text-xs font-mono font-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Clinical Acuity & Bed Allocation */}
            <div className="space-y-4 pt-2 border-t-2 border-slate-200">
              <div className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <span className="text-blue-700">02</span> CLINICAL ACUITY &amp; BAY ALLOCATION
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-slate-300 shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-700 block mb-1.5 font-bold">Emergency Triage Severity (ESI Level)</label>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setTriageLevel(lvl as any)}
                          className={`py-2 rounded-xl text-xs font-black font-mono transition-all border-2 cursor-pointer ${
                            triageLevel === lvl
                              ? (lvl <= 2 ? 'bg-rose-600 text-white border-rose-700 shadow-xs' : 'bg-blue-600 text-white border-blue-700 shadow-xs')
                              : 'bg-slate-50 border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                          }`}
                        >
                          L{lvl}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-slate-700 mt-1 block font-mono font-bold">
                      {triageLevel === 1 ? 'Level 1: Immediate Resuscitation / Trauma' :
                       triageLevel === 2 ? 'Level 2: Emergent / Critical Monitoring' :
                       triageLevel === 3 ? 'Level 3: Urgent / Multiple Resources' : 'Level 4-5: Stable / Non-Urgent'}
                    </span>
                  </div>

                  <div>
                    <label className="text-xs text-slate-700 block mb-1.5 font-bold">Allocated Bed Bay *</label>
                    <select
                      value={selectedBedId}
                      onChange={e => setSelectedBedId(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2 text-slate-950 outline-none focus:border-blue-600 text-xs font-mono font-black"
                    >
                      {availableBeds.map(b => (
                        <option key={b.id} value={b.id}>
                          {b.id} ({b.room}) • {b.status.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-700 block mb-1.5 font-bold">Chief Complaint / Primary Diagnosis *</label>
                  <input 
                    type="text"
                    value={chiefComplaint}
                    onChange={e => setChiefComplaint(e.target.value)}
                    placeholder="e.g. Acute STEMI, Respiratory Distress, Post-Op Monitoring"
                    required
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2 text-slate-950 focus:border-blue-600 outline-none text-xs font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Baseline Admission Vitals */}
            <div className="space-y-4 pt-2 border-t-2 border-slate-200">
              <div className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <span className="text-blue-700">03</span> BASELINE ADMISSION VITALS
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-slate-300 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-700 block mb-1 font-bold">BP (mmHg)</label>
                    <input 
                      type="text"
                      value={bp}
                      onChange={e => setBp(e.target.value)}
                      placeholder="120/80"
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-1.5 text-slate-950 font-mono font-black text-xs outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-700 block mb-1 font-bold">HR (bpm)</label>
                    <input 
                      type="number"
                      value={hr}
                      onChange={e => setHr(Number(e.target.value))}
                      placeholder="75"
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-1.5 text-rose-700 font-mono font-black text-xs outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-700 block mb-1 font-bold">SpO2 (%)</label>
                    <input 
                      type="number"
                      value={spo2}
                      onChange={e => setSpo2(Number(e.target.value))}
                      placeholder="98"
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-1.5 text-blue-700 font-mono font-black text-xs outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-700 block mb-1 font-bold">Temp (°C)</label>
                    <input 
                      type="number"
                      step="0.1"
                      value={temp}
                      onChange={e => setTemp(Number(e.target.value))}
                      placeholder="37.0"
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-1.5 text-amber-700 font-mono font-black text-xs outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Clinical Safety Precautions & Care Orders */}
            <div className="space-y-4 pt-2 border-t-2 border-slate-200">
              <div className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <span className="text-blue-700">04</span> CLINICAL SAFETY &amp; ORDERS
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-slate-300 shadow-sm space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-bold">
                  <button
                    type="button"
                    onClick={() => setFallRisk(!fallRisk)}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      fallRisk ? 'bg-rose-100 border-rose-400 text-rose-950 font-black' : 'bg-slate-50 border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="text-xs">Fall Risk</div>
                    <div className="text-[11px] mt-0.5">{fallRisk ? 'High Risk' : 'Standard'}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNpo(!npo)}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      npo ? 'bg-amber-100 border-amber-400 text-amber-950 font-black' : 'bg-slate-50 border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="text-xs">NPO (Nil Per Os)</div>
                    <div className="text-[11px] mt-0.5">{npo ? 'Strict NPO' : 'Diet Allowed'}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDnr(!dnr)}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      dnr ? 'bg-purple-100 border-purple-400 text-purple-950 font-black' : 'bg-slate-50 border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="text-xs">DNR / DNI</div>
                    <div className="text-[11px] mt-0.5">{dnr ? 'Do Not Resuscitate' : 'Full Code'}</div>
                  </button>

                  <div>
                    <select
                      value={isolation}
                      onChange={e => setIsolation(e.target.value as any)}
                      className="w-full h-full bg-slate-50 border-2 border-slate-300 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-950 outline-none focus:border-blue-600"
                    >
                      <option value="none">Isolation: None</option>
                      <option value="contact">Contact Precaution</option>
                      <option value="airborne">Airborne Precaution</option>
                      <option value="droplet">Droplet Precaution</option>
                      <option value="cdiff">C. Diff Special Protocol</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-700 block mb-1.5 font-bold">Allergies</label>
                  <input 
                    type="text"
                    value={allergiesText}
                    onChange={e => setAllergiesText(e.target.value)}
                    placeholder="e.g. Penicillin, Sulfa, Latex"
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2 text-slate-950 focus:border-blue-600 outline-none text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-700 block mb-1.5 font-bold">Attached Equipment &amp; Apparatus</label>
                  <input 
                    type="text"
                    value={apparatusText}
                    onChange={e => setApparatusText(e.target.value)}
                    placeholder="e.g. IV Infusion (D5LR @ 80mL/h), Telemetry Lead II"
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2 text-slate-950 focus:border-blue-600 outline-none text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-700 block mb-1.5 font-bold">Pending Doctor Orders &amp; Lab Requests</label>
                  <input 
                    type="text"
                    value={pendingOrdersText}
                    onChange={e => setPendingOrdersText(e.target.value)}
                    placeholder="e.g. Stat Cardiac Troponin-I, 12-Lead ECG @ 10:00 AM"
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2 text-slate-950 focus:border-blue-600 outline-none text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Sticky Bottom Action Footer */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="admission-form"
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Check size={16} /> Finalize Admission &amp; Allocate Bay
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
