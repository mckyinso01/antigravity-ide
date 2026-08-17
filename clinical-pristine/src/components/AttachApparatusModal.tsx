import React, { useState } from 'react';
import { 
  X, 
  Activity, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { db, type BedData } from '../db';
import { useToast } from '../contexts/ToastContext';
import { clinicalAudio } from '../utils/clinicalAudio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bed: BedData | null;
  onApparatusUpdated?: (apparatusList: string[]) => void;
}

interface ApparatusPreset {
  name: string;
  category: 'Infusion & Vascular' | 'Airway & Ventilation' | 'Cardiac & Neuro Monitoring' | 'Renal, Drainage & Wounds';
  icon: string;
  defaultSettings: string;
}

const APPARATUS_PRESETS: ApparatusPreset[] = [
  // Infusion & Vascular
  { name: 'Dual-Channel IV Infusion Pump', category: 'Infusion & Vascular', icon: 'droplets', defaultSettings: 'Normal Saline 0.9% @ 100 mL/h (Channel A)' },
  { name: 'Norepinephrine Continuous Infusion Pump', category: 'Infusion & Vascular', icon: 'zap', defaultSettings: 'Titrating 4-12 mcg/min for MAP >= 65' },
  { name: 'Triple-Lumen Central Venous Catheter (CVC)', category: 'Infusion & Vascular', icon: 'activity', defaultSettings: 'Right Internal Jugular • Patent Lines' },
  { name: 'Radial Arterial Line', category: 'Infusion & Vascular', icon: 'activity', defaultSettings: 'Left Radial • Continuous Waveform & Transducer Zeroed' },

  // Airway & Ventilation
  { name: 'Mechanical Ventilator (Servo-U)', category: 'Airway & Ventilation', icon: 'wind', defaultSettings: 'SIMV Mode • FiO2 40% • PEEP 5 • Rate 14/min' },
  { name: 'High-Flow Nasal Cannula (Optiflow)', category: 'Airway & Ventilation', icon: 'wind', defaultSettings: '15 L/min Flow • 35% FiO2 Saturation' },
  { name: 'BiPAP Non-Invasive Ventilation', category: 'Airway & Ventilation', icon: 'wind', defaultSettings: 'IPAP 12 cmH2O / EPAP 4 cmH2O' },

  // Cardiac & Monitoring
  { name: '12-Lead Cardiac Telemetry Monitor', category: 'Cardiac & Neuro Monitoring', icon: 'heart', defaultSettings: 'Lead II Active • Continuous ST-Segment Analysis' },
  { name: 'Continuous SpO2 Pulse Oximeter Sensor', category: 'Cardiac & Neuro Monitoring', icon: 'gauge', defaultSettings: 'Forehead / Right Index Sensor' },
  { name: 'Continuous ICP (Intracranial Pressure) Sensor', category: 'Cardiac & Neuro Monitoring', icon: 'gauge', defaultSettings: 'Target ICP < 15 mmHg • Drain Closed' },

  // Renal & Drainage
  { name: 'CRRT Continuous Hemodiafiltration Machine', category: 'Renal, Drainage & Wounds', icon: 'droplets', defaultSettings: 'CVVHDF Mode • Blood Flow 150 mL/min • Anticoagulated' },
  { name: 'Closed-System Temperature-Sensing Foley Catheter', category: 'Renal, Drainage & Wounds', icon: 'droplets', defaultSettings: 'Core Body Temp 37.2°C • Clear Yellow Output' },
  { name: 'Chest Tube Water-Seal Drainage System', category: 'Renal, Drainage & Wounds', icon: 'wind', defaultSettings: '-20 cmH2O Continuous Suction • No Air Leak' },
  { name: 'Wound VAC Negative Pressure Therapy', category: 'Renal, Drainage & Wounds', icon: 'activity', defaultSettings: '-125 mmHg Continuous Negative Pressure' }
];

export const AttachApparatusModal: React.FC<Props> = ({
  isOpen,
  onClose,
  bed,
  onApparatusUpdated
}) => {
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customName, setCustomName] = useState('');
  const [customSettings, setCustomSettings] = useState('');
  const [installerNurse, setInstallerNurse] = useState('Nurse Sarah Vance, RN');

  if (!isOpen || !bed) return null;

  const patientName = bed.patientName || 'Admitted Patient';
  const currentApparatus = bed.patientSafety?.activeApparatus || [];

  const handleAttachPreset = async (preset: ApparatusPreset) => {
    const fullEntry = `${preset.name} (${preset.defaultSettings})`;
    if (currentApparatus.includes(fullEntry)) {
      showToast('Apparatus is already attached to this patient', 'info');
      return;
    }

    try {
      const updated = [...currentApparatus, fullEntry];
      const existingSafety = bed.patientSafety || {
        mrn: `MRN-${bed.id}`,
        age: 45,
        chiefComplaint: 'Clinical Inpatient Care',
        triageLevel: 3,
        fallRisk: false,
        npo: false,
        dnr: false,
        isolation: 'none',
        admittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      await db.beds.update(bed.id, {
        patientSafety: {
          ...existingSafety,
          activeApparatus: updated
        }
      });

      clinicalAudio.playSuccessChime();
      showToast(`✓ Attached ${preset.name} to ${patientName}`, 'success');
      onApparatusUpdated?.(updated);
    } catch (err) {
      console.error('Failed to attach apparatus:', err);
      showToast('Error updating apparatus in database', 'error');
    }
  };

  const handleAddCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) {
      showToast('Please specify apparatus name', 'error');
      return;
    }

    const fullEntry = customSettings.trim() 
      ? `${customName.trim()} (${customSettings.trim()})`
      : customName.trim();

    try {
      const updated = [...currentApparatus, fullEntry];
      const existingSafety = bed.patientSafety || {
        mrn: `MRN-${bed.id}`,
        age: 45,
        chiefComplaint: 'Clinical Inpatient Care',
        triageLevel: 3,
        fallRisk: false,
        npo: false,
        dnr: false,
        isolation: 'none',
        admittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      await db.beds.update(bed.id, {
        patientSafety: {
          ...existingSafety,
          activeApparatus: updated
        }
      });

      clinicalAudio.playSuccessChime();
      showToast(`✓ Attached ${customName.trim()} to ${patientName}`, 'success');
      setCustomName('');
      setCustomSettings('');
      onApparatusUpdated?.(updated);
    } catch (err) {
      console.error('Failed to attach custom apparatus:', err);
      showToast('Error saving apparatus', 'error');
    }
  };

  const handleDetachApparatus = async (indexToRemove: number) => {
    const itemToRemove = currentApparatus[indexToRemove];
    try {
      const updated = currentApparatus.filter((_, idx) => idx !== indexToRemove);
      await db.beds.update(bed.id, {
        patientSafety: {
          ...bed.patientSafety!,
          activeApparatus: updated
        }
      });

      clinicalAudio.playDrawerSwoosh();
      showToast(`Disconnected ${itemToRemove}`, 'info');
      onApparatusUpdated?.(updated);
    } catch (err) {
      console.error('Failed to detach apparatus:', err);
    }
  };

  const filteredPresets = selectedCategory === 'All'
    ? APPARATUS_PRESETS
    : APPARATUS_PRESETS.filter(p => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150 select-none">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Activity size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">Medical Apparatus &amp; Clinical Device Manager</h3>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded">
                  {bed.id}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Patient: <strong className="text-white">{patientName}</strong> • Current Devices: <strong className="text-emerald-300">{currentApparatus.length} Active</strong>
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

        {/* MODAL BODY */}
        <div className="p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          
          {/* 1. CURRENTLY ATTACHED APPARATUS */}
          <div>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
              Currently Attached Patient Apparatus ({currentApparatus.length})
            </span>

            {currentApparatus.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400 font-medium">
                No active apparatus currently connected. Select a device below to attach.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentApparatus.map((app, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-2 shadow-2xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
                      <span className="text-xs font-bold text-emerald-950 truncate" title={app}>
                        {app}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDetachApparatus(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                      title="Disconnect / Discontinue Apparatus"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="h-px bg-slate-200 my-1"></div>

          {/* 2. DEVICE FORMULARY & 1-CLICK ATTACH */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={13} className="text-emerald-600" />
                Standard Clinical Device Formulary
              </label>

              {/* Category Pills */}
              <div className="flex items-center gap-1">
                {['All', 'Infusion & Vascular', 'Airway & Ventilation', 'Cardiac & Neuro Monitoring', 'Renal, Drainage & Wounds'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer truncate max-w-[130px] ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.replace(' & ', '/').replace(' Monitoring', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto custom-scrollbar p-0.5">
              {filteredPresets.map((preset, idx) => {
                const isAlreadyAttached = currentApparatus.some(a => a.startsWith(preset.name));
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                      isAlreadyAttached 
                        ? 'bg-slate-50 border-slate-200 opacity-60' 
                        : 'bg-white hover:bg-emerald-50/40 border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="block font-bold text-xs text-slate-900 truncate">
                        {preset.name}
                      </span>
                      <span className="text-[11px] text-slate-500 truncate block">
                        {preset.defaultSettings}
                      </span>
                      <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider">
                        {preset.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={isAlreadyAttached}
                      onClick={() => handleAttachPreset(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
                        isAlreadyAttached
                          ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                      }`}
                    >
                      {isAlreadyAttached ? <CheckCircle2 size={13} /> : <Plus size={13} />}
                      <span>{isAlreadyAttached ? 'Attached' : 'Attach'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-slate-200 my-1"></div>

          {/* 3. CUSTOM DEVICE ATTACHMENT */}
          <form onSubmit={handleAddCustom} className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Attach Custom / Specialized Device
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Device Name &amp; Model</label>
                <input
                  type="text"
                  placeholder="e.g. Edwards Vigileo Cardiac Output Monitor"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Parameters / Settings</label>
                <input
                  type="text"
                  placeholder="e.g. Stroke Volume Variation (SVV) target < 13%"
                  value={customSettings}
                  onChange={(e) => setCustomSettings(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Documenting Nurse:</span>
                <input
                  type="text"
                  value={installerNurse}
                  onChange={(e) => setInstallerNurse(e.target.value)}
                  className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-300 transition-all cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={!customName.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Plus size={14} /> Attach Device
                </button>
              </div>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
