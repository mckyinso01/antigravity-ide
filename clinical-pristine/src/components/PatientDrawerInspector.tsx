import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  BedDouble, 
  Siren, 
  LogOut, 
  Pill, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Maximize2, 
  Minimize2,
  Droplet,
  FileText,
  Syringe,
  PanelLeft,
  PanelRight,
  Square,
  Database,
  Copy,
  AlertTriangle,
  ShieldAlert,
  Ban,
  Zap,
  CheckCircle2,
  Sparkles,
  Activity
} from 'lucide-react';
import { db, type RoomData, type BedData } from '../db';
import { useToast } from '../contexts/ToastContext';
import { useEmergency } from '../contexts/EmergencyContext';
import { BloodTransfusionModal } from './BloodTransfusionModal';
import { SbarHandoverModal } from './SbarHandoverModal';
import { PhlebotomyBarcodeModal } from './PhlebotomyBarcodeModal';
import { LabTatCountdown } from './LabTatCountdown';
import { DynamicPatientAvatar } from './DynamicPatientAvatar';
import { AddMedicationModal } from './AddMedicationModal';
import { AttachApparatusModal } from './AttachApparatusModal';

interface Props {
  room: RoomData | null;
  bedsInRoom: BedData[];
  selectedBedId: string | null;
  onSelectBed: (bedId: string) => void;
  onClose: () => void;
  onOpenAdmissionForBed?: (bedId: string) => void;
}

export const PatientDrawerInspector = ({
  room,
  bedsInRoom,
  selectedBedId,
  onSelectBed,
  onClose,
  onOpenAdmissionForBed
}: Props) => {
  const { showToast } = useToast();
  const { triggerCodeBlue } = useEmergency();
  
  const [dockPosition, setDockPosition] = useState<'right' | 'left' | 'float'>('right');
  const [expandedBedDossier, setExpandedBedDossier] = useState<string | null>(selectedBedId);
  const [isWideView, setIsWideView] = useState(false);
  const [newApparatusInput, setNewApparatusInput] = useState('');
  const [showAddApparatus, setShowAddApparatus] = useState<string | null>(null);

  // Advanced Clinical Modals State
  const [transfusionTargetBed, setTransfusionTargetBed] = useState<BedData | null>(null);
  const [sbarTargetBed, setSbarTargetBed] = useState<BedData | null>(null);
  const [phlebotomyTargetBed, setPhlebotomyTargetBed] = useState<BedData | null>(null);
  const [medTargetBed, setMedTargetBed] = useState<BedData | null>(null);
  const [apparatusTargetBed, setApparatusTargetBed] = useState<BedData | null>(null);
  const [showDataSourceBedId, setShowDataSourceBedId] = useState<string | null>(null);

  // Hotkey listener inside drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        const target = bedsInRoom.find(b => b.id === selectedBedId) || bedsInRoom[0];
        if (target) setSbarTargetBed(target);
      } else if (e.altKey && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        const target = bedsInRoom.find(b => b.id === selectedBedId) || bedsInRoom[0];
        if (target) setTransfusionTargetBed(target);
      } else if (e.altKey && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        const target = bedsInRoom.find(b => b.id === selectedBedId) || bedsInRoom[0];
        if (target) setPhlebotomyTargetBed(target);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bedsInRoom, selectedBedId]);

  if (!room) return null;

  const handleDischarge = async (bed: BedData) => {
    if (!bed.patientSafety) return;
    
    // Create EVS Task for cleaning
    await db.evsTasks.add({
      id: `EVS-${Date.now()}`,
      room: bed.room,
      bedId: bed.id,
      priority: bed.acuity === 'critical' ? 'stat' : 'urgent',
      status: 'pending',
      requestTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isolationType: bed.patientSafety.isolation,
      ppeRequired: bed.patientSafety.isolation !== 'none' ? ['N95 Respirator', 'Fluid-Resistant Gown', 'Nitrile Gloves'] : ['Standard Gloves'],
      chemicalProtocol: bed.patientSafety.isolation === 'cdiff' ? 'EPA-Spocidin Bleach Protocol' : 'Virex II 256 Quaternary Disinfectant'
    });

    // Update Bed to Cleaning
    await db.beds.update(bed.id, {
      status: 'cleaning',
      acuity: 'none',
      patientName: undefined,
      patientSafety: undefined
    });

    // Update Room if needed
    const otherBeds = bedsInRoom.filter(b => b.id !== bed.id);
    const anyOccupied = otherBeds.some(b => b.status === 'occupied');
    if (!anyOccupied) {
      await db.rooms.update(room.id, {
        status: 'cleaning',
        acuity: 'none'
      });
    }

    showToast(`Patient discharged from ${bed.id}. EVS Sanitization task dispatched.`, 'success');
  };

  const handleAddApparatus = async (bedId: string) => {
    if (!newApparatusInput.trim()) return;
    const bed = bedsInRoom.find(b => b.id === bedId);
    if (!bed || !bed.patientSafety) return;

    const currentApparatus = bed.patientSafety.activeApparatus || [];
    const updated = [...currentApparatus, newApparatusInput.trim()];

    await db.beds.update(bedId, {
      patientSafety: {
        ...bed.patientSafety,
        activeApparatus: updated
      }
    });

    setNewApparatusInput('');
    setShowAddApparatus(null);
    showToast(`Apparatus '${newApparatusInput}' attached to ${bedId}`, 'success');
  };

  const handleMarkMedGiven = async (bedId: string, medIndex: number) => {
    const bed = bedsInRoom.find(b => b.id === bedId);
    if (!bed || !bed.patientSafety || !bed.patientSafety.medicationsSchedule) return;

    const med = bed.patientSafety.medicationsSchedule[medIndex];
    if (med.status === 'given') {
      const confirmDuplicate = window.confirm(`⚠️ Clinical Safety Warning: '${med.name}' is already charted as ADMINISTERED. Confirm duplicate repeat dose administration?`);
      if (!confirmDuplicate) return;
    }

    const updatedMeds = [...bed.patientSafety.medicationsSchedule];
    updatedMeds[medIndex].status = 'given';

    await db.beds.update(bedId, {
      patientSafety: {
        ...bed.patientSafety,
        medicationsSchedule: updatedMeds
      }
    });

    showToast(`Medication '${med.name}' logged as ADMINISTERED.`, 'success');
  };

  return (
    <>
      <motion.div
        initial={dockPosition === 'left' ? { x: -100, opacity: 0 } : { x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={dockPosition === 'left' ? { x: -100, opacity: 0 } : { x: 100, opacity: 0 }}
        transition={{ duration: 0.13, ease: [0.16, 1, 0.3, 1] }}
        className={`${
          dockPosition === 'float'
            ? 'fixed top-14 right-6 bottom-14 z-40 rounded-3xl border-2 border-slate-700 shadow-2xl overflow-hidden'
            : dockPosition === 'left'
            ? 'border-r-2 border-slate-700 order-first'
            : 'border-l-2 border-slate-700'
        } bg-white h-full flex flex-col shrink-0 relative z-30 font-body shadow-2xl ${
          isWideView ? 'w-[620px]' : 'w-[480px]'
        }`}
      >
        {/* Drawer Top Header */}
        <div className="p-4 md:p-5 border-b-2 border-slate-300 flex items-center justify-between bg-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-400 flex items-center justify-center text-blue-700 font-black font-mono shadow-xs">
              {room.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-950 font-display">{room.name}</h2>
                {room.department && (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border-2 border-blue-300 font-black">
                    {room.department}
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-slate-600 font-bold">
                {bedsInRoom.length} Bed Bays • {bedsInRoom.filter(b => b.status === 'occupied').length} Active Patients
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Dock Position Toggles */}
            <div className="flex items-center bg-white border-2 border-slate-300 rounded-xl p-0.5 mr-1 shadow-xs">
              <button
                onClick={() => setDockPosition('left')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${dockPosition === 'left' ? 'bg-blue-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-950'}`}
                title="Dock Left"
              >
                <PanelLeft size={14} />
              </button>
              <button
                onClick={() => setDockPosition('right')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${dockPosition === 'right' ? 'bg-blue-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-950'}`}
                title="Dock Right"
              >
                <PanelRight size={14} />
              </button>
              <button
                onClick={() => setDockPosition('float')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${dockPosition === 'float' ? 'bg-blue-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-950'}`}
                title="Float HUD"
              >
                <Square size={14} />
              </button>
            </div>

            <button
              onClick={() => setIsWideView(!isWideView)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition-colors cursor-pointer border-2 border-slate-300 bg-white"
              title={isWideView ? 'Compact View' : 'Expand Dossier View'}
            >
              {isWideView ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer border-2 border-slate-300 bg-white"
              title="Close Drawer (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Room Clinical Status Summary Strip */}
        <div className="px-5 py-2.5 bg-slate-100 border-b-2 border-slate-300 flex items-center justify-between text-xs font-mono font-bold">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-[11px] font-black">ROOM STATUS:</span>
            <span className={`px-2.5 py-0.5 rounded-md font-black uppercase text-[10px] ${
              room.status === 'occupied' ? (room.acuity === 'critical' ? 'bg-rose-100 text-rose-950 border-2 border-rose-400' : 'bg-blue-100 text-blue-950 border-2 border-blue-400') :
              room.status === 'cleaning' ? 'bg-amber-100 text-amber-950 border-2 border-amber-400' :
              'bg-slate-200 text-slate-900 border-2 border-slate-400'
            }`}>
              {room.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-[11px] font-black">ACUITY:</span>
            <span className={`font-black uppercase text-xs ${
              room.acuity === 'critical' ? 'text-rose-700' : 'text-slate-950'
            }`}>
              {room.acuity}
            </span>
          </div>
        </div>

        {/* Beds List in this Room */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {bedsInRoom.length === 0 ? (
            <div className="p-8 text-center text-slate-600 font-mono text-xs font-bold">
              No beds assigned to this room yet. Use Builder mode or Admission to configure.
            </div>
          ) : (
            bedsInRoom.map((bed) => {
              const isOccupied = bed.status === 'occupied';
              const isExpanded = expandedBedDossier === bed.id;
              const isSelected = selectedBedId === bed.id;
              const safety = bed.patientSafety;

              return (
                <motion.div
                  key={bed.id}
                  layout
                  className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50/40 shadow-xl ring-2 ring-blue-500' 
                      : 'border-slate-400 bg-white hover:border-slate-700 shadow-md hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                  onClick={() => onSelectBed(bed.id)}
                >
                  {/* Level 1: Glance Summary Header */}
                  <div className="p-3.5 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      {isOccupied ? (
                        <DynamicPatientAvatar 
                          photoUrl={safety?.photoUrl} 
                          patientName={bed.patientName} 
                          bedId={bed.id} 
                          size="md" 
                          allowUpload={true} 
                        />
                      ) : (
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                          bed.status === 'cleaning' ? 'bg-amber-100 text-amber-950 border-2 border-amber-400' : 'bg-slate-100 text-slate-700 border-2 border-slate-300'
                        }`}>
                          <BedDouble size={20} />
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-950 font-mono text-sm">{bed.id}</span>
                          {isOccupied && (
                            <span className="text-slate-950 font-black text-sm font-display">
                              {bed.patientName || 'Occupied Patient'}
                            </span>
                          )}
                        </div>

                        {isOccupied && safety ? (
                          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600 mt-0.5 font-bold">
                            <span>{safety.gender || 'Adult'} • {safety.age} yo</span>
                            <span>•</span>
                            <span className="text-slate-950 font-black">{safety.mrn}</span>
                            <span>•</span>
                            <span className={`font-black ${safety.triageLevel <= 2 ? 'text-rose-700' : 'text-blue-700'}`}>
                              ESI L{safety.triageLevel}
                            </span>
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-600 mt-0.5 font-bold flex items-center gap-1">
                            {bed.status === 'cleaning' ? (
                              <span className="text-amber-800 flex items-center gap-1">
                                <Sparkles size={13} className="text-amber-600 animate-spin" />
                                EVS Disinfection in progress
                              </span>
                            ) : (
                              <span className="text-emerald-800 flex items-center gap-1">
                                <CheckCircle2 size={13} className="text-emerald-600" />
                                Ready for patient intake
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expand Toggle & Quick Action Bar */}
                    {isOccupied && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedBedDossier(isExpanded ? null : bed.id);
                          }}
                          className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer border-2 border-slate-300 bg-white"
                          title={isExpanded ? 'Collapse' : 'Expand Full Chart'}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Level 1 Bottom: Vitals Pill & Active Apparatus Tags */}
                  {isOccupied && safety && (
                    <div className="px-3.5 pb-3 pt-1 space-y-2">
                      {/* Live Vitals Mini-Strip */}
                      {safety.vitals && (
                        <div className="grid grid-cols-4 gap-1.5 p-2.5 rounded-xl bg-slate-100 border-2 border-slate-300 text-center text-xs font-mono">
                          <div>
                            <span className="text-[9px] text-slate-600 block font-bold">BP</span>
                            <span className="text-slate-950 font-black">{safety.vitals.bp}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-600 block font-bold">HR</span>
                            <span className="text-rose-700 font-black">{safety.vitals.hr}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-600 block font-bold">SpO2</span>
                            <span className="text-blue-700 font-black">{safety.vitals.spo2}%</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-600 block font-bold">TEMP</span>
                            <span className="text-amber-700 font-black">{safety.vitals.temp}°C</span>
                          </div>
                        </div>
                      )}

                      {/* QUICK CLINICAL WORKFLOW SHORTCUTS */}
                      <div className="grid grid-cols-3 gap-2 pt-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSbarTargetBed(bed);
                          }}
                          className="px-2 py-2 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-400 hover:border-slate-800 text-slate-950 text-xs font-mono font-black flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                          title="Generate SBAR Handover Report"
                        >
                          <FileText size={14} className="text-blue-700" /> 
                          <span>SBAR</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setTransfusionTargetBed(bed);
                          }}
                          className="px-2 py-2 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-400 hover:border-slate-800 text-slate-950 text-xs font-mono font-black flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                          title="2-Nurse Dual Sign-Off Blood Transfusion"
                        >
                          <Droplet size={14} className="text-rose-700" /> 
                          <span>Dual-Sign</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPhlebotomyTargetBed(bed);
                          }}
                          className="px-2 py-2 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-400 hover:border-slate-800 text-slate-950 text-xs font-mono font-black flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                          title="Order of Draw & Barcode Specimen Tubes"
                        >
                          <Syringe size={14} className="text-purple-700" /> 
                          <span>Phlebotomy</span>
                        </button>
                      </div>

                      {/* Active Apparatus Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] pt-1 font-mono">
                        <span className="text-slate-700 font-black uppercase text-[9px]">APPARATUS:</span>
                        {safety.activeApparatus && safety.activeApparatus.length > 0 ? (
                          safety.activeApparatus.map((app, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-950 border-2 border-blue-300 font-black flex items-center gap-1">
                              <Activity size={11} className="text-blue-700" />
                              {app}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-500 italic">No equipment logged</span>
                        )}
                      </div>

                      {/* Pending Diagnostic Orders & Lab TAT */}
                      <div className="space-y-1.5 pt-1">
                        {safety.bloodDrawScheduled && (
                          <div className="space-y-1">
                            <span className="text-blue-700 font-black uppercase text-[9px] flex items-center justify-between">
                              <span>ACTIVE PHLEBOTOMY STAT LAB:</span>
                              <span className="text-[8px] text-slate-600 font-mono font-bold">TAT SLA: 30M</span>
                            </span>
                            <LabTatCountdown labName={safety.bloodDrawScheduled} targetMinutes={30} />
                          </div>
                        )}

                        {safety.pendingDoctorOrders && safety.pendingDoctorOrders.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-amber-800 font-black uppercase text-[9px] block">PENDING ACTIONS &amp; HINIHINTAY:</span>
                            {safety.pendingDoctorOrders.map((ord, idx) => (
                              <div key={idx} className="p-2 rounded-xl bg-amber-50 text-amber-950 border-2 border-amber-400 text-xs font-mono font-bold flex items-center justify-between">
                                <span>{ord}</span>
                                {ord.toLowerCase().includes('troponin') && (
                                  <LabTatCountdown labName="Troponin STAT" targetMinutes={25} />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Level 2: Expanded Clinical Dossier (Medications, Shift Notes & Care Plan) */}
                  <AnimatePresence>
                    {isOccupied && isExpanded && safety && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t-2 border-slate-300 bg-slate-50 p-4 space-y-4 text-xs"
                      >
                        {/* Chief Complaint & Safety Alerts */}
                        <div>
                          <div className="text-[10px] text-slate-600 uppercase font-black mb-1">CHIEF COMPLAINT:</div>
                          <p className="text-slate-950 font-bold bg-white p-3 rounded-xl border-2 border-slate-300 shadow-xs">
                            {safety.chiefComplaint}
                          </p>
                        </div>

                        {/* Safety Tags */}
                        <div className="flex flex-wrap gap-2 text-xs">
                          {safety.isolation && safety.isolation !== 'none' && (
                            <span className="px-2.5 py-1 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-950 font-black uppercase flex items-center gap-1.5">
                              <AlertTriangle size={13} className="text-amber-800" /> {safety.isolation} Isolation
                            </span>
                          )}
                          {safety.fallRisk && (
                            <span className="px-2.5 py-1 rounded-xl bg-rose-100 border-2 border-rose-400 text-rose-950 font-black flex items-center gap-1.5">
                              <ShieldAlert size={13} className="text-rose-800" /> High Fall Risk
                            </span>
                          )}
                          {safety.npo && (
                            <span className="px-2.5 py-1 rounded-xl bg-purple-100 border-2 border-purple-400 text-purple-950 font-black flex items-center gap-1.5">
                              <Ban size={13} className="text-purple-800" /> Strict NPO
                            </span>
                          )}
                          {safety.allergies && safety.allergies.length > 0 && (
                            <span className="px-2.5 py-1 rounded-xl bg-rose-100 border-2 border-rose-400 text-rose-950 font-black flex items-center gap-1.5">
                              <Zap size={13} className="text-rose-800" /> Allergies: {safety.allergies.join(', ')}
                            </span>
                          )}
                        </div>

                        {/* eMAR Medication Administration Schedule */}
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-900 font-black uppercase mb-1.5">
                            <span className="flex items-center gap-1 text-blue-700">
                              <Pill size={14} /> eMAR MEDICATION TIMELINE
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-600 font-mono text-[10px] font-bold">Shift Administration</span>
                              <button
                                onClick={() => setMedTargetBed(bed)}
                                className="px-2 py-0.5 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-900 font-black text-[10px] flex items-center gap-1 border border-blue-300 transition-colors cursor-pointer"
                              >
                                <Plus size={11} /> + Prescribe Med
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            {safety.medicationsSchedule && safety.medicationsSchedule.length > 0 ? (
                              safety.medicationsSchedule.map((med, idx) => (
                                <div 
                                  key={idx} 
                                  className="flex items-center justify-between p-3 rounded-xl bg-white border-2 border-slate-300 text-xs shadow-xs"
                                >
                                  <div>
                                    <div className="font-black text-slate-950 text-xs">{med.name}</div>
                                    <div className="text-[11px] text-slate-600 font-mono font-bold">
                                      {med.dose} • {med.route} • Sched: {med.time}
                                    </div>
                                  </div>

                                  {med.status === 'given' ? (
                                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 border-2 border-emerald-400 text-emerald-950 font-black text-[11px] flex items-center gap-1">
                                      <Check size={13} className="text-emerald-700" /> Given
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => handleMarkMedGiven(bed.id, idx)}
                                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black border-2 border-blue-700 transition-all cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                    >
                                      Log Given
                                    </button>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="p-3 bg-white rounded-xl border-2 border-slate-300 text-slate-600 text-xs font-bold">
                                1. Ceftriaxone 1g IV (Scheduled 10:00 AM)<br/>
                                2. Metoprolol 25mg PO (Given 08:00 AM)
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Apparatus Request Tool */}
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-900 font-black uppercase mb-1.5">
                            <span className="text-emerald-800">EQUIPMENT &amp; APPARATUS DOCK</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setApparatusTargetBed(bed)}
                                className="px-2 py-0.5 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-black text-[10px] flex items-center gap-1 border border-emerald-300 transition-colors cursor-pointer"
                              >
                                <Activity size={11} /> + Device Manager
                              </button>
                              <button
                                onClick={() => setShowAddApparatus(showAddApparatus === bed.id ? null : bed.id)}
                                className="text-xs text-emerald-700 hover:text-emerald-900 font-black flex items-center gap-0.5 cursor-pointer"
                              >
                                <Plus size={13} /> Quick Add
                              </button>
                            </div>
                          </div>

                          {showAddApparatus === bed.id && (
                            <div className="flex gap-1.5 p-2 bg-white rounded-xl border-2 border-emerald-400 mb-2 shadow-sm">
                              <input
                                type="text"
                                value={newApparatusInput}
                                onChange={e => setNewApparatusInput(e.target.value)}
                                placeholder="e.g. Alaris IV Pump, Telemetry Lead"
                                className="flex-1 bg-slate-50 border-2 border-slate-300 rounded-lg px-2.5 py-1 text-slate-950 text-xs outline-none focus:border-emerald-600 font-bold"
                              />
                              <button
                                onClick={() => handleAddApparatus(bed.id)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-black text-xs border-2 border-emerald-700 cursor-pointer shadow-xs"
                              >
                                Attach
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Care Team Handover */}
                        <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-white border-2 border-slate-300 shadow-xs">
                          <div>
                            <span className="text-slate-600 block text-[10px] font-bold">ATTENDING PHYSICIAN</span>
                            <span className="text-slate-950 font-black">{safety.assignedDoctor || 'Dr. A. Santos, MD'}</span>
                          </div>
                          <div>
                            <span className="text-slate-600 block text-[10px] font-bold">CHARGE / FLOOR NURSE</span>
                            <span className="text-slate-950 font-black">{safety.assignedNurse || 'Nurse J. Reyes, RN'}</span>
                          </div>
                        </div>

                        {/* Live Clinical Data Source Inspector */}
                        <div className="rounded-xl border-2 border-slate-400 bg-white overflow-hidden shadow-sm">
                          <div 
                            onClick={() => setShowDataSourceBedId(showDataSourceBedId === bed.id ? null : bed.id)}
                            className="p-2.5 bg-slate-100 hover:bg-slate-200 flex items-center justify-between cursor-pointer text-xs font-mono transition-colors border-b-2 border-slate-300"
                          >
                            <div className="flex items-center gap-2 text-blue-700 font-black">
                              <Database size={14} />
                              <span>LIVE DATA SOURCE (DEXIE / INDEXEDDB)</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-bold">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span>Live Stream</span>
                              {showDataSourceBedId === bed.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </div>
                          </div>

                          {showDataSourceBedId === bed.id && (
                            <div className="p-3 bg-slate-50 font-mono text-xs text-slate-900 space-y-2 border-t-2 border-slate-300">
                              <div className="flex items-center justify-between text-[11px] text-slate-700 border-b-2 border-slate-200 pb-1.5 font-bold">
                                <span>TABLE: <strong className="text-blue-700">db.beds</strong> (Key: {bed.id})</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(JSON.stringify(bed, null, 2));
                                    showToast('Raw JSON copied to clipboard', 'info');
                                  }}
                                  className="flex items-center gap-1 text-blue-700 hover:text-blue-900 font-black cursor-pointer"
                                >
                                  <Copy size={12} /> Copy JSON
                                </button>
                              </div>
                              <pre className="max-h-48 overflow-y-auto custom-scrollbar text-[11px] text-slate-950 bg-white p-2.5 rounded-lg border-2 border-slate-300 whitespace-pre-wrap font-mono font-bold">
                                {JSON.stringify(bed, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>

                        {/* Action Controls */}
                        <div className="flex gap-2 pt-2 border-t-2 border-slate-200">
                          <button
                            onClick={() => triggerCodeBlue(`${bed.room} (${bed.id})`)}
                            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md border-2 border-rose-700 hover:-translate-y-0.5 transition-all cursor-pointer uppercase"
                          >
                            <Siren size={15} />
                            <span>Trigger Code Blue</span>
                          </button>

                          <button
                            onClick={() => handleDischarge(bed)}
                            className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md border-2 border-emerald-700 hover:-translate-y-0.5 transition-all cursor-pointer uppercase"
                          >
                            <LogOut size={15} />
                            <span>Discharge &amp; Clean</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Cleaning / Biohazard Sanitization Lock State */}
                  {!isOccupied && (bed.status === 'cleaning' || bed.evsStatus === 'pending' || bed.evsStatus === 'in-progress') && (
                    <div className="p-3 bg-amber-50 border-t-2 border-amber-300 flex items-center justify-between">
                      <span className="text-amber-900 font-black text-xs flex items-center gap-1.5">
                        <ShieldAlert size={16} className="text-amber-700 animate-pulse" />
                        Biohazard Cleaning In Progress (Locked)
                      </span>
                      <button
                        onClick={() => {
                          const reason = window.prompt("Charge Nurse STAT Emergency Override. Enter clinical justification:");
                          if (reason) {
                            onOpenAdmissionForBed?.(bed.id);
                          }
                        }}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-[11px] uppercase tracking-wider cursor-pointer border border-amber-700 shadow-xs"
                      >
                        STAT Override
                      </button>
                    </div>
                  )}

                  {/* Clean & Ready Empty Bed State */}
                  {!isOccupied && bed.status === 'empty' && bed.evsStatus !== 'pending' && bed.evsStatus !== 'in-progress' && (
                    <div className="p-3 bg-slate-50 border-t-2 border-slate-300 flex items-center justify-between">
                      <span className="text-emerald-800 font-black text-xs flex items-center gap-1.5">
                        <CheckCircle2 size={15} className="text-emerald-700" />
                        Bed is Clean &amp; Ready
                      </span>
                      <button
                        onClick={() => onOpenAdmissionForBed?.(bed.id)}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md border-2 border-blue-700 hover:-translate-y-0.5"
                      >
                        + Admit to this Bed
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Advanced Clinical Modals */}
      <BloodTransfusionModal 
        isOpen={!!transfusionTargetBed}
        onClose={() => setTransfusionTargetBed(null)}
        bed={transfusionTargetBed}
      />

      <SbarHandoverModal 
        isOpen={!!sbarTargetBed}
        onClose={() => setSbarTargetBed(null)}
        bed={sbarTargetBed}
        room={room}
      />

      <PhlebotomyBarcodeModal 
        isOpen={!!phlebotomyTargetBed}
        onClose={() => setPhlebotomyTargetBed(null)}
        bed={phlebotomyTargetBed}
      />

      <AddMedicationModal
        isOpen={!!medTargetBed}
        onClose={() => setMedTargetBed(null)}
        bed={medTargetBed}
      />

      <AttachApparatusModal
        isOpen={!!apparatusTargetBed}
        onClose={() => setApparatusTargetBed(null)}
        bed={apparatusTargetBed}
      />
    </>
  );
};
