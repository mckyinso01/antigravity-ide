import React, { useState } from 'react';
import { 
  X, 
  Pill, 
  Plus,
  AlertTriangle, 
  Sparkles
} from 'lucide-react';
import { db, type BedData, type MedicationOrder } from '../db';
import { useToast } from '../contexts/ToastContext';
import { clinicalAudio } from '../utils/clinicalAudio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bed: BedData | null;
  onMedicationAdded?: (med: MedicationOrder) => void;
}

interface MedPreset {
  name: string;
  dose: string;
  route: string;
  category: 'Antibiotic' | 'Pressor' | 'Analgesic' | 'Cardiac/ACLS' | 'Fluids' | 'Sedation';
  defaultFrequency: string;
}

const COMMON_MED_PRESETS: MedPreset[] = [
  // Antibiotics
  { name: 'Cefazolin IVPB', dose: '2 g', route: 'IVPB', category: 'Antibiotic', defaultFrequency: 'Q8H' },
  { name: 'Vancomycin IVPB', dose: '1.5 g', route: 'IVPB', category: 'Antibiotic', defaultFrequency: 'Q12H' },
  { name: 'Ceftriaxone IV', dose: '1 g', route: 'IVPB', category: 'Antibiotic', defaultFrequency: 'Daily' },
  { name: 'Meropenem IVPB', dose: '1 g', route: 'IVPB', category: 'Antibiotic', defaultFrequency: 'Q8H' },
  
  // Vasoactive & Pressors
  { name: 'Norepinephrine Drip', dose: '4 mcg/min', route: 'Continuous Infusion', category: 'Pressor', defaultFrequency: 'Continuous' },
  { name: 'Epinephrine 1:10,000 IV Push', dose: '1 mg', route: 'IV Push', category: 'Pressor', defaultFrequency: 'STAT / Q3-5min' },
  { name: 'Vasopressin Infusion', dose: '0.03 units/min', route: 'Continuous Infusion', category: 'Pressor', defaultFrequency: 'Continuous' },

  // Analgesics & Sedation
  { name: 'Fentanyl IV Push', dose: '50 mcg', route: 'IV Push', category: 'Analgesic', defaultFrequency: 'PRN Severe Pain Q2H' },
  { name: 'Morphine Sulfate IV', dose: '4 mg', route: 'IV Push', category: 'Analgesic', defaultFrequency: 'PRN Pain Q3H' },
  { name: 'Propofol (Diprivan) Drip', dose: '20 mcg/kg/min', route: 'Continuous Infusion', category: 'Sedation', defaultFrequency: 'Continuous' },
  { name: 'Midazolam (Versed) IV', dose: '2 mg', route: 'IV Push', category: 'Sedation', defaultFrequency: 'PRN Agitation' },

  // Cardiac / ACLS
  { name: 'Amiodarone Bolus', dose: '300 mg', route: 'IV Push', category: 'Cardiac/ACLS', defaultFrequency: 'STAT ACLS' },
  { name: 'Metoprolol Tartrate PO', dose: '25 mg', route: 'Oral', category: 'Cardiac/ACLS', defaultFrequency: 'BID' },
  { name: 'Atropine Sulfate IV', dose: '1 mg', route: 'IV Push', category: 'Cardiac/ACLS', defaultFrequency: 'STAT Bradycardia' },

  // Fluids & Electrolytes
  { name: '0.9% Normal Saline', dose: '1000 mL', route: 'Continuous Infusion', category: 'Fluids', defaultFrequency: '@ 125 mL/h' },
  { name: 'Lactated Ringer\'s Solution', dose: '500 mL', route: 'Continuous Infusion', category: 'Fluids', defaultFrequency: 'STAT Bolus' },
  { name: 'Potassium Chloride IVPB', dose: '20 mEq', route: 'IVPB', category: 'Fluids', defaultFrequency: 'Over 2 Hours' },
];

export const AddMedicationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  bed,
  onMedicationAdded
}) => {
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [medName, setMedName] = useState('');
  const [dose, setDose] = useState('');
  const [route, setRoute] = useState('IVPB');
  const [frequency, setFrequency] = useState('STAT');
  const [prescribingDoctor, setPrescribingDoctor] = useState(bed?.patientSafety?.assignedDoctor || 'Dr. Angela Santos, MD');
  const [administerImmediately, setAdministerImmediately] = useState(false);
  const [clinicalNotes, setClinicalNotes] = useState('');

  if (!isOpen || !bed) return null;

  const patientName = bed.patientName || 'Admitted Patient';
  const allergies = bed.patientSafety?.allergies || [];

  const handleSelectPreset = (preset: MedPreset) => {
    setMedName(preset.name);
    setDose(preset.dose);
    setRoute(preset.route);
    setFrequency(preset.defaultFrequency);
    clinicalAudio.playDrawerSwoosh();
  };

  // Check potential allergy conflict
  const hasPotentialAllergy = allergies.some(a => 
    a.toLowerCase() !== 'nkda' && 
    medName.toLowerCase().includes(a.toLowerCase().slice(0, 4))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName.trim() || !dose.trim()) {
      showToast('Please specify drug name and dosage', 'error');
      return;
    }

    try {
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMedOrder: MedicationOrder = {
        name: medName.trim(),
        dose: dose.trim(),
        route: route,
        time: nowTime,
        status: administerImmediately ? 'given' : 'due'
      };

      const existingSafety = bed.patientSafety || {
        mrn: `MRN-${bed.id}`,
        age: 45,
        chiefComplaint: 'Clinical Inpatient Care',
        triageLevel: 3,
        fallRisk: false,
        npo: false,
        dnr: false,
        isolation: 'none',
        admittedAt: nowTime
      };

      const currentMeds = existingSafety.medicationsSchedule || [];
      const updatedMeds = [...currentMeds, newMedOrder];

      await db.beds.update(bed.id, {
        patientSafety: {
          ...existingSafety,
          medicationsSchedule: updatedMeds
        }
      });

      clinicalAudio.playSuccessChime();
      showToast(
        administerImmediately 
          ? `✓ Prescribed & Administered ${newMedOrder.name} (${newMedOrder.dose}) to ${patientName}`
          : `✓ Scheduled ${newMedOrder.name} (${newMedOrder.dose}) for ${patientName}`,
        'success'
      );

      onMedicationAdded?.(newMedOrder);
      onClose();
    } catch (err) {
      console.error('Failed to add medication order:', err);
      showToast('Error saving medication order to database', 'error');
    }
  };

  const filteredPresets = selectedCategory === 'All' 
    ? COMMON_MED_PRESETS 
    : COMMON_MED_PRESETS.filter(p => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150 select-none">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* MODAL HEADER */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Pill size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">Prescribe &amp; Administer Medication</h3>
                <span className="text-[10px] font-mono font-bold bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded">
                  {bed.id}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Patient: <strong className="text-white">{patientName}</strong> • Attending: {prescribingDoctor}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* ALLERGIES BANNER */}
        {allergies.length > 0 && allergies[0] !== 'NKDA' && (
          <div className="bg-rose-50 border-b border-rose-200 px-4 py-2 flex items-center justify-between text-xs text-rose-900 font-medium">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-rose-600 shrink-0" />
              <span>
                <strong>Documented Patient Allergies:</strong> {allergies.join(', ')}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-200 text-rose-950 px-2 py-0.5 rounded">
              High Vigilance
            </span>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          
          {/* 1. CLINICAL PRESETS PICKER */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-500" />
                1-Click Formulary Presets
              </label>
              
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1">
                {['All', 'Antibiotic', 'Pressor', 'Analgesic', 'Cardiac/ACLS', 'Fluids'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredPresets.slice(0, 9).map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    medName === preset.name
                      ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20'
                      : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="block font-bold text-xs text-slate-900 truncate">
                      {preset.name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {preset.dose} • {preset.route}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-blue-700 mt-1 uppercase tracking-wider">
                    {preset.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-200 my-1"></div>

          {/* 2. CUSTOM / DETAILED ORDER FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            
            {hasPotentialAllergy && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center gap-2 text-xs text-amber-950 font-semibold animate-pulse">
                <AlertTriangle size={16} className="text-amber-700 shrink-0" />
                <span>Caution: Drug name may match documented allergy. Double-verify cross-sensitivity before administering.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Medication Name */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Medication Name &amp; Strength <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cefazolin 2g IVPB or Norepinephrine"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                />
              </div>

              {/* Dose */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Dosage / Concentration <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2 g, 100 mg, 4 mcg/min"
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Route */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Route</label>
                <select
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option value="IVPB">IVPB (Intravenous Piggyback)</option>
                  <option value="IV Push">IV Push (Direct Bolus)</option>
                  <option value="Continuous Infusion">Continuous Infusion Drip</option>
                  <option value="Oral">Oral (PO / Pill / Liquid)</option>
                  <option value="SubQ">Subcutaneous (SubQ)</option>
                  <option value="IM">Intramuscular (IM)</option>
                  <option value="Inhalation">Inhalation / Nebulizer</option>
                  <option value="Topical">Topical / Transdermal</option>
                </select>
              </div>

              {/* Frequency */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Schedule / Timing</label>
                <input
                  type="text"
                  placeholder="e.g. STAT, Q8H, PRN Q4H"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
                />
              </div>

              {/* Prescribing MD */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Attending Prescriber</label>
                <input
                  type="text"
                  value={prescribingDoctor}
                  onChange={(e) => setPrescribingDoctor(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Clinical Notes */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Clinical Indication / Special Instructions (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Infuse over 30 mins, hold if SBP < 90, monitor telemetry lead II"
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
              />
            </div>

            {/* Administer Now Checkbox */}
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="administer-now-check"
                  checked={administerImmediately}
                  onChange={(e) => setAdministerImmediately(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded-md focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="administer-now-check" className="text-xs font-bold text-blue-950 cursor-pointer">
                  Administer Dose Immediately at Bedside (Nurse Sign-off)
                </label>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                RN Witnessed
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-300 transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus size={15} />
                <span>{administerImmediately ? 'Sign & Administer Medication' : 'Schedule Medication Order'}</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
