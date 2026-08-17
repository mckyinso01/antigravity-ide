import { useState, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { useEmergency } from '../contexts/EmergencyContext';
import { 
  Activity, 
  BedDouble, 
  Clock, 
  ShieldAlert, 
  Plus, 
  TrendingUp, 
  Search, 
  MapPin,
  HeartPulse,
  Syringe,
  ArrowRightLeft,
  FileText,
  UserCheck,
  X,
  Flame,
  Layers,
  Eye,
  EyeOff
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type BedData, type MedicationOrder } from '../db';
import { PatientAdmissionModal } from '../components/PatientAdmissionModal';
import { UserShiftMenu } from '../components/UserShiftMenu';
import { NewStaffModal } from '../components/NewStaffModal';
import { DynamicPatientAvatar } from '../components/DynamicPatientAvatar';
import { clinicalAudio } from '../utils/clinicalAudio';
import { calculateMEWS, maskPatientName } from '../utils/clinicalCalculators';

export const DashboardView = memo(() => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isCodeBlue, triggerCodeBlue } = useEmergency();

  // 1. LIVE DEXIE SUBSCRIPTIONS
  const beds = useLiveQuery(() => db.beds.toArray(), []) || [];
  const rooms = useLiveQuery(() => db.rooms.toArray(), []) || [];
  const evsTasks = useLiveQuery(() => db.evsTasks.toArray(), []) || [];

  // 2. MODAL & INTERACTION STATES
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBedForDossier, setSelectedBedForDossier] = useState<BedData | null>(null);
  
  // Drilldown Modals
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [showCriticalModal, setShowCriticalModal] = useState(false);
  const [showEVSModal, setShowEVSModal] = useState(false);
  const [showACLSModal, setShowACLSModal] = useState(false);
  const [showStaffingModal, setShowStaffingModal] = useState(false);
  const [showSbarModal, setShowSbarModal] = useState(false);
  const [showNewStaffModal, setShowNewStaffModal] = useState(false);
  const [selectedDeptModal, setSelectedDeptModal] = useState<string | null>(null);
  const [isPrivacyShieldActive, setIsPrivacyShieldActive] = useState(false);

  // In-Dossier Action States
  const [isLoggingVitals, setIsLoggingVitals] = useState(false);
  const [freshBp, setFreshBp] = useState('120/80');
  const [freshHr, setFreshHr] = useState<number>(75);
  const [freshSpo2, setFreshSpo2] = useState<number>(98);
  const [freshTemp, setFreshTemp] = useState<number>(37.0);

  const [isTransferringBed, setIsTransferringBed] = useState(false);
  const [targetTransferBedId, setTargetTransferBedId] = useState<string>('');

  // 3. COMPUTED AGGREGATES (ZERO-MOCK DATA)
  const totalBeds = beds.length || 1;
  const occupiedBeds = beds.filter(b => b.status === 'occupied').length;
  const availableBeds = beds.filter(b => b.status === 'empty').length;
  const cleaningBeds = beds.filter(b => b.status === 'cleaning').length;
  const criticalBeds = beds.filter(b => b.acuity === 'critical').length;
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100) || 0;

  const pendingEVS = evsTasks.filter(t => t.status === 'pending').length;

  // Departmental Dynamic Calculations
  const icuBeds = useMemo(() => beds.filter(b => {
    const r = rooms.find(room => room.id === b.room);
    return r?.department === 'ICU' || b.id.includes('401') || b.id.includes('101');
  }), [beds, rooms]);

  const telemetryBeds = useMemo(() => beds.filter(b => {
    const r = rooms.find(room => room.id === b.room);
    return r?.department === 'Med-Surg' || b.id.includes('402') || b.id.includes('403') || b.id.includes('105');
  }), [beds, rooms]);

  const isolationBeds = useMemo(() => beds.filter(b => {
    const r = rooms.find(room => room.id === b.room);
    return r?.department === 'Isolation' || b.id.includes('404') || b.id.includes('108');
  }), [beds, rooms]);

  // Filtered Active Patients
  const activePatients = useMemo(() => {
    const occupied = beds.filter(b => b.status === 'occupied');
    if (!searchQuery.trim()) return occupied;
    const q = searchQuery.toLowerCase();
    return occupied.filter(b => 
      (b.patientName && b.patientName.toLowerCase().includes(q)) ||
      (b.id && b.id.toLowerCase().includes(q)) ||
      (b.patientSafety?.mrn && b.patientSafety.mrn.toLowerCase().includes(q)) ||
      (b.patientSafety?.assignedDoctor && b.patientSafety.assignedDoctor.toLowerCase().includes(q)) ||
      (b.room && b.room.toLowerCase().includes(q))
    );
  }, [beds, searchQuery]);

  // 4. HANDLERS & ACTIONS
  const handleNavigateToMap = (bed: BedData) => {
    const floor = bed.floorNumber || (bed.id.startsWith('B-4') ? 4 : (bed.id.startsWith('B-5') ? 5 : 1));
    localStorage.setItem('pristine_active_floor', String(floor));
    localStorage.setItem('pristine_selected_bed', bed.id);
    clinicalAudio.playDrawerSwoosh();
    navigate('/');
  };

  const handleOpenDossier = (bed: BedData) => {
    setSelectedBedForDossier(bed);
    setIsLoggingVitals(false);
    setIsTransferringBed(false);
    if (bed.patientSafety?.vitals) {
      setFreshBp(bed.patientSafety.vitals.bp || '120/80');
      setFreshHr(bed.patientSafety.vitals.hr || 75);
      setFreshSpo2(bed.patientSafety.vitals.spo2 || 98);
      setFreshTemp(bed.patientSafety.vitals.temp || 37.0);
    }
    clinicalAudio.playDrawerSwoosh();
  };

  const handleSaveFreshVitals = async () => {
    if (!selectedBedForDossier) return;
    try {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const updatedAcuity = (freshHr > 110 || freshSpo2 < 92 || freshTemp > 38.5) ? 'critical' : 'stable';

      await db.beds.update(selectedBedForDossier.id, {
        acuity: updatedAcuity,
        patientSafety: {
          ...selectedBedForDossier.patientSafety!,
          vitals: {
            bp: freshBp,
            hr: Number(freshHr),
            spo2: Number(freshSpo2),
            temp: Number(freshTemp),
            lastRecorded: now
          }
        }
      });

      const refreshed = await db.beds.get(selectedBedForDossier.id);
      if (refreshed) setSelectedBedForDossier(refreshed);

      clinicalAudio.playSuccessChime();
      showToast(`Fresh vitals logged for ${selectedBedForDossier.patientName} (${now})`, 'success');
      setIsLoggingVitals(false);
    } catch (err) {
      console.error(err);
      showToast('Failed to record vitals', 'error');
    }
  };

  const handleAdministerMed = async (medIndex: number) => {
    if (!selectedBedForDossier || !selectedBedForDossier.patientSafety?.medicationsSchedule) return;
    try {
      const schedule = [...selectedBedForDossier.patientSafety.medicationsSchedule];
      if (schedule[medIndex]) {
        schedule[medIndex].status = 'given';
        await db.beds.update(selectedBedForDossier.id, {
          patientSafety: {
            ...selectedBedForDossier.patientSafety,
            medicationsSchedule: schedule
          }
        });
        const refreshed = await db.beds.get(selectedBedForDossier.id);
        if (refreshed) setSelectedBedForDossier(refreshed);
        clinicalAudio.playSuccessChime();
        showToast(`Administered ${schedule[medIndex].name}`, 'success');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExecuteBedTransfer = async () => {
    if (!selectedBedForDossier || !targetTransferBedId) {
      showToast('Please select a destination bed', 'warn');
      return;
    }

    try {
      const targetBed = await db.beds.get(targetTransferBedId);
      if (!targetBed || targetBed.status !== 'empty') {
        showToast('Target bed is no longer available', 'error');
        return;
      }

      await db.beds.update(targetTransferBedId, {
        status: 'occupied',
        acuity: selectedBedForDossier.acuity,
        patientName: selectedBedForDossier.patientName,
        patientSafety: selectedBedForDossier.patientSafety
      });

      await db.beds.update(selectedBedForDossier.id, {
        status: 'cleaning',
        acuity: 'none',
        patientName: undefined,
        patientSafety: undefined,
        evsStatus: 'pending'
      });

      await db.evsTasks.add({
        id: `EVS-${Date.now().toString().slice(-4)}`,
        room: selectedBedForDossier.room,
        bedId: selectedBedForDossier.id,
        floorNumber: selectedBedForDossier.floorNumber || 1,
        priority: 'urgent',
        status: 'pending',
        isolationType: selectedBedForDossier.patientSafety?.isolation || 'none',
        ppeRequired: ['Gloves', 'Gown'],
        chemicalProtocol: 'Standard Quaternary Ammonium Disinfectant',
        requestTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dischargeReason: `Patient Transfer to ${targetTransferBedId}`
      });

      clinicalAudio.playSuccessChime();
      showToast(`Transferred ${selectedBedForDossier.patientName} to Bay ${targetTransferBedId}`, 'success');
      setSelectedBedForDossier(null);
      setIsTransferringBed(false);
    } catch (err) {
      console.error(err);
      showToast('Transfer failed', 'error');
    }
  };

  const handleCertifyCleanEVS = async (bedId: string) => {
    try {
      await db.beds.update(bedId, {
        status: 'empty',
        acuity: 'none',
        evsStatus: 'completed'
      });
      const task = evsTasks.find(t => t.bedId === bedId && t.status === 'pending');
      if (task) {
        await db.evsTasks.update(task.id, { status: 'completed' });
      }
      clinicalAudio.playSuccessChime();
      showToast(`Bay ${bedId} sanitized and certified ready for admission!`, 'success');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* TOP HEADER */}
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-bold text-slate-900 tracking-tight">Executive Operations Dashboard</h1>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
            Real-Time Hospital Telemetry
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search ward, doctor, MRN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white w-48 transition-all"
            />
          </div>

          {/* HIPAA PRIVACY SHIELD TOGGLE */}
          <button 
            onClick={() => {
              setIsPrivacyShieldActive(!isPrivacyShieldActive);
              clinicalAudio.playDrawerSwoosh();
              showToast(isPrivacyShieldActive ? 'HIPAA Privacy Shield: Disabled (Full Names Visible)' : '🛡️ HIPAA Privacy Shield: Active (Names Masked)', 'info');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
              isPrivacyShieldActive 
                ? 'bg-purple-100 border-purple-400 text-purple-900' 
                : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
            }`}
            title="Toggle HIPAA Privacy Shield (Masks patient names on shared monitors)"
          >
            {isPrivacyShieldActive ? <EyeOff size={14} className="text-purple-700" /> : <Eye size={14} className="text-slate-600" />}
            <span>{isPrivacyShieldActive ? 'HIPAA Shield: ON' : 'HIPAA Shield: OFF'}</span>
          </button>

          {/* SBAR HANDOVER BUTTON */}
          <button 
            onClick={() => setShowSbarModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 shadow-2xs transition-all cursor-pointer"
            title="Generate SBAR Shift Handover Summary"
          >
            <FileText size={14} className="text-blue-600" /> SBAR Shift Handover
          </button>

          <div className="h-4 w-px bg-slate-200"></div>

          <button 
            onClick={() => setShowAdmissionModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <Plus size={14} /> New Admission
          </button>

          {/* USER PROFILE & FAST SHIFT HANDOVER MENU */}
          <div className="pl-1 border-l border-slate-200">
            <UserShiftMenu
              onOpenSbarHandover={() => setShowSbarModal(true)}
              onOpenNewStaffModal={() => setShowNewStaffModal(true)}
            />
          </div>
        </div>
      </header>

      {/* DASHBOARD BODY */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 custom-scrollbar font-sans">
        
        {/* 1. INTERACTIVE KPI CARDS RIBBON */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Occupancy Card */}
          <div 
            onClick={() => setShowCapacityModal(true)}
            className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
                Live Bed Occupancy
              </span>
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BedDouble size={16} />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-950 font-sans">{occupiedBeds}/{totalBeds}</span>
              <span className="text-xs font-bold text-blue-600">({occupancyRate}%)</span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${occupancyRate}%` }}
              ></div>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 font-medium flex items-center justify-between">
              <span>{availableBeds} available • {cleaningBeds} cleaning</span>
              <span className="text-blue-600 font-bold group-hover:underline text-[10px]">Inspect ➔</span>
            </span>
          </div>

          {/* Critical Patients Card */}
          <div 
            onClick={() => setShowCriticalModal(true)}
            className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-rose-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 group-hover:text-rose-600 transition-colors">
                Critical Acuity Load
              </span>
              <span className="p-1.5 rounded-lg bg-rose-50 text-rose-700 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Activity size={16} />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-rose-600 font-sans">{criticalBeds}</span>
              <span className="text-xs font-medium text-slate-500">High-Priority Patients</span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-rose-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.round((criticalBeds / totalBeds) * 100)}%` }}
              ></div>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 font-medium flex items-center justify-between">
              <span>Continuous Telemetry Active</span>
              <span className="text-rose-600 font-bold group-hover:underline text-[10px]">Roster ➔</span>
            </span>
          </div>

          {/* EVS Turnaround Card */}
          <div 
            onClick={() => setShowEVSModal(true)}
            className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 group-hover:text-amber-600 transition-colors">
                EVS Disinfection Queue
              </span>
              <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Clock size={16} />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-950 font-sans">{pendingEVS}</span>
              <span className="text-xs font-medium text-slate-500">Pending Cleans</span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, pendingEVS * 25)}%` }}
              ></div>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 font-medium flex items-center justify-between">
              <span>Avg Turnaround: 18 mins</span>
              <span className="text-amber-600 font-bold group-hover:underline text-[10px]">Dispatch ➔</span>
            </span>
          </div>

          {/* Emergency Readiness Card */}
          <div 
            onClick={() => setShowACLSModal(true)}
            className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                ACLS Emergency State
              </span>
              <span className={`p-1.5 rounded-lg ${isCodeBlue ? 'bg-rose-600 text-white animate-pulse' : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors'}`}>
                <ShieldAlert size={16} />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className={`text-xl font-bold font-sans ${isCodeBlue ? 'text-rose-600 animate-pulse' : 'text-emerald-700'}`}>
                {isCodeBlue ? 'CODE BLUE ACTIVE' : 'ALL CLEAR'}
              </span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${isCodeBlue ? 'bg-rose-600' : 'bg-emerald-500'}`}
                style={{ width: '100%' }}
              ></div>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 font-medium flex items-center justify-between">
              <span>Crash Carts 100% Stocked</span>
              <span className="text-emerald-700 font-bold group-hover:underline text-[10px]">Protocol ➔</span>
            </span>
          </div>

        </div>

        {/* 2. MAIN 2-COLUMN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
          
          {/* LEFT 2 COLUMNS: DYNAMIC DEPARTMENT BREAKDOWN & ACTIVE INPATIENT TABLE */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            
            {/* DYNAMIC DEPARTMENTAL BREAKDOWN CARDS */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Departmental Capacity &amp; Patient Flow</h3>
                  <p className="text-xs text-slate-500">Live census computed directly from active hospital floor bays</p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {occupiedBeds} Active Patients
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* ICU Card */}
                <div 
                  onClick={() => setSelectedDeptModal('ICU')}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-rose-300 hover:bg-rose-50/30 transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Flame size={14} className="text-rose-500" /> ICU Resuscitation
                    </span>
                    <span className="font-bold text-rose-600">
                      {icuBeds.length ? Math.round((icuBeds.filter(b => b.status === 'occupied').length / icuBeds.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="mt-2.5 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all" 
                      style={{ width: `${icuBeds.length ? (icuBeds.filter(b => b.status === 'occupied').length / icuBeds.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500 font-medium">
                    <span>{icuBeds.filter(b => b.status === 'occupied').length} of {icuBeds.length} Bays Active</span>
                    <span className="text-rose-600 font-bold group-hover:underline">Inspect ➔</span>
                  </div>
                </div>

                {/* Med-Surg / Telemetry Card */}
                <div 
                  onClick={() => setSelectedDeptModal('Med-Surg')}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Layers size={14} className="text-blue-500" /> Telemetry &amp; Stepdown
                    </span>
                    <span className="font-bold text-blue-600">
                      {telemetryBeds.length ? Math.round((telemetryBeds.filter(b => b.status === 'occupied').length / telemetryBeds.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="mt-2.5 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all" 
                      style={{ width: `${telemetryBeds.length ? (telemetryBeds.filter(b => b.status === 'occupied').length / telemetryBeds.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500 font-medium">
                    <span>{telemetryBeds.filter(b => b.status === 'occupied').length} of {telemetryBeds.length} Beds Active</span>
                    <span className="text-blue-600 font-bold group-hover:underline">Inspect ➔</span>
                  </div>
                </div>

                {/* Isolation Suites Card */}
                <div 
                  onClick={() => setSelectedDeptModal('Isolation')}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/30 transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <ShieldAlert size={14} className="text-amber-500" /> Isolation Suites
                    </span>
                    <span className="font-bold text-amber-600">
                      {isolationBeds.length ? Math.round((isolationBeds.filter(b => b.status === 'occupied').length / isolationBeds.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="mt-2.5 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all" 
                      style={{ width: `${isolationBeds.length ? (isolationBeds.filter(b => b.status === 'occupied').length / isolationBeds.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500 font-medium">
                    <span>{isolationBeds.filter(b => b.status === 'occupied').length} of {isolationBeds.length} Suites Active</span>
                    <span className="text-amber-600 font-bold group-hover:underline">Inspect ➔</span>
                  </div>
                </div>

              </div>
            </div>

            {/* INTERACTIVE ACTIVE INPATIENT CENSUS TABLE */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Active Inpatient Census</h3>
                  <p className="text-xs text-slate-500">Click any row to open the complete clinical dossier and bed location</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Showing {activePatients.length} Active Patients
                </span>
              </div>

              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-100 select-none">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Patient</th>
                      <th className="py-2.5 px-3 font-semibold">Bed &amp; Spatial Location</th>
                      <th className="py-2.5 px-3 font-semibold">Acuity</th>
                      <th className="py-2.5 px-3 font-semibold">Attending MD</th>
                      <th className="py-2.5 px-3 font-semibold">Verified Vitals</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {activePatients.map((bed: BedData) => {
                      const safety = bed.patientSafety;
                      const isCrit = bed.acuity === 'critical';
                      const floor = bed.floorNumber || (bed.id.startsWith('B-4') ? 4 : 1);
                      const mews = calculateMEWS(safety?.vitals);
                      const displayName = maskPatientName(bed.patientName, isPrivacyShieldActive);

                      return (
                        <tr 
                          key={bed.id} 
                          onClick={() => handleOpenDossier(bed)}
                          className={`hover:bg-blue-50/50 transition-colors cursor-pointer ${
                            isCrit ? 'bg-rose-50/20' : ''
                          }`}
                        >
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <DynamicPatientAvatar
                                photoUrl={safety?.photoUrl}
                                patientName={bed.patientName}
                                bedId={bed.id}
                                size="sm"
                                shape="circle"
                                acuity={isCrit ? 'critical' : 'stable'}
                                allowUpload={true}
                              />
                              <div>
                                <span className="font-bold text-slate-950 block">{displayName}</span>
                                <span className="text-[10px] text-slate-500 font-mono">{safety?.mrn || 'MRN-PENDING'} • {safety?.age || 50}yo {safety?.gender || 'Adult'}</span>
                              </div>
                            </div>
                          </td>
                          
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono text-[11px]">
                                {bed.id}
                              </span>
                              <span className="text-[11px] text-slate-600 truncate max-w-[140px]">
                                Level {floor} • {bed.room}
                              </span>
                            </div>
                          </td>

                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                isCrit 
                                  ? 'bg-rose-100 text-rose-800 border-rose-300' 
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isCrit ? 'bg-rose-600 animate-ping' : 'bg-emerald-500'}`}></span>
                                {isCrit ? 'Critical' : 'Stable'}
                              </span>

                              {/* MEWS SCORE BADGE */}
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono border ${mews.badgeClass}`} title={`MEWS Deterioration Score: ${mews.score} (${mews.recommendation})`}>
                                MEWS {mews.score}
                              </span>
                            </div>
                          </td>

                          <td className="py-2.5 px-3 text-slate-700 font-medium">
                            {safety?.assignedDoctor || 'Dr. Angela Santos, MD'}
                          </td>

                          <td className="py-2.5 px-3">
                            <div className="text-[11px] font-mono flex items-center gap-2">
                              <span className={`font-semibold ${isCrit ? 'text-rose-700' : 'text-slate-900'}`}>
                                {safety?.vitals?.bp || '120/80'}
                              </span>
                              <span className="text-slate-300">•</span>
                              <span className="text-slate-700 font-semibold">{safety?.vitals?.hr || 75} bpm</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-blue-600 font-semibold">{safety?.vitals?.spo2 || 98}%</span>
                            </div>
                          </td>

                          <td className="py-2.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button 
                                onClick={() => handleNavigateToMap(bed)}
                                className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-700 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1"
                                title="Locate on Live Hospital Map"
                              >
                                <MapPin size={13} /> Map
                              </button>
                              <button 
                                onClick={() => handleOpenDossier(bed)}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold border border-slate-200 shadow-2xs transition-all cursor-pointer"
                              >
                                Dossier
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* RIGHT 1 COLUMN: QUICK ACTIONS & CLINICAL INTELLIGENCE */}
          <div className="flex flex-col gap-4">
            
            {/* QUICK ACTIONS CARD */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Rapid Clinical Actions</h3>
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setShowAdmissionModal(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-between transition-colors cursor-pointer border border-blue-200"
                >
                  <span className="flex items-center gap-2">
                    <Plus size={15} /> 1-Click Patient Admission
                  </span>
                  <span className="text-[10px] bg-blue-200/60 px-1.5 py-0.5 rounded font-bold">Wizard</span>
                </button>

                <button 
                  onClick={() => {
                    if (isCodeBlue) {
                      showToast('Code Blue is currently active!', 'error');
                    } else {
                      triggerCodeBlue('Trauma Bay 102');
                      showToast('🚨 Code Blue Resuscitation Drill Initiated!', 'error');
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-between transition-colors cursor-pointer border border-rose-200"
                >
                  <span className="flex items-center gap-2">
                    <ShieldAlert size={15} /> Emergency Code Blue Drill
                  </span>
                  <span className="text-[10px] bg-rose-200/60 px-1.5 py-0.5 rounded font-bold">STAT</span>
                </button>

                <button 
                  onClick={() => setShowEVSModal(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-between transition-colors cursor-pointer border border-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <Clock size={15} /> EVS Sanitation &amp; Decon Queue
                  </span>
                  <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-bold">{pendingEVS} Pending</span>
                </button>
              </div>
            </div>

            {/* INTERACTIVE CLINICAL COMPLIANCE & SAFETY GAUGES */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-900">Clinical Safety Indicators</h3>
                  <TrendingUp size={16} className="text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 mb-4">Click any indicator to inspect shift staffing and compliance</p>
                
                <div className="flex flex-col gap-3">
                  <div 
                    onClick={() => setShowStaffingModal(true)}
                    className="p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-700">Medication Timeliness</span>
                      <span className="text-emerald-700 font-bold">99.4%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '99.4%' }}></div>
                    </div>
                  </div>

                  <div 
                    onClick={() => setShowStaffingModal(true)}
                    className="p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-700">Nurse-to-Patient Ratio</span>
                      <span className="text-blue-700 font-bold">1:2 (Optimal) ➔</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>

                  <div 
                    onClick={() => setShowACLSModal(true)}
                    className="p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-700">Code Blue Response Velocity</span>
                      <span className="text-emerald-700 font-bold">&lt; 85s</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Hospital Standard: <strong>Level 1 Trauma Verified</strong></span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. RIGHT DRAWER 1: COMPREHENSIVE CLINICAL PATIENT DOSSIER & LOCATION */}
      {/* ========================================================================= */}
      {selectedBedForDossier && (
        <>
          <div 
            onClick={() => setSelectedBedForDossier(null)}
            className="fixed inset-0 z-40 bg-slate-900/20 transition-opacity animate-in fade-in duration-200"
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] md:w-[540px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 ease-out">
            
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <DynamicPatientAvatar
                  photoUrl={selectedBedForDossier.patientSafety?.photoUrl}
                  patientName={selectedBedForDossier.patientName}
                  bedId={selectedBedForDossier.id}
                  size="md"
                  shape="circle"
                  acuity={selectedBedForDossier.acuity === 'critical' ? 'critical' : 'stable'}
                  allowUpload={true}
                />
                <div>
                  <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                    {selectedBedForDossier.patientName}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      selectedBedForDossier.acuity === 'critical' ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    }`}>
                      {selectedBedForDossier.acuity === 'critical' ? 'Critical' : 'Stable'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    {selectedBedForDossier.patientSafety?.mrn || 'MRN-PENDING'} • {selectedBedForDossier.patientSafety?.age} yo • {selectedBedForDossier.patientSafety?.gender}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleNavigateToMap(selectedBedForDossier)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <MapPin size={14} /> View on Map
                </button>
                <button 
                  onClick={() => setSelectedBedForDossier(null)}
                  className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto custom-scrollbar flex flex-col gap-5 flex-1">
              
              {/* SPATIAL LOCATION & MINI-RADAR CARD */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Assigned Spatial Location</span>
                  <span className="text-sm font-bold text-slate-900">
                    Level {selectedBedForDossier.floorNumber || (selectedBedForDossier.id.startsWith('B-4') ? 4 : 1)} • {selectedBedForDossier.room}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-xs">
                      Bay {selectedBedForDossier.id}
                    </span>
                    <span className="text-xs text-slate-500">
                      Attending: <strong>{selectedBedForDossier.patientSafety?.assignedDoctor || 'Dr. Angela Santos, MD'}</strong>
                    </span>
                  </div>
                </div>

                {/* SVG Mini-Radar Visual */}
                <div className="w-36 h-20 bg-white border border-slate-200 rounded-lg p-1.5 relative flex items-center justify-center shrink-0 shadow-2xs">
                  <div className="text-[9px] font-bold text-slate-400 absolute top-1 left-1.5">RADAR</div>
                  <svg className="w-full h-full" viewBox="0 0 120 60">
                    <rect x="5" y="5" width="110" height="50" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" rx="3" />
                    <rect x="50" y="5" width="20" height="50" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="2 2" />
                    {/* Active Bed Pin */}
                    <rect 
                      x="75" y="15" width="28" height="30" 
                      fill={selectedBedForDossier.acuity === 'critical' ? '#FEE2E2' : '#E0F2FE'} 
                      stroke={selectedBedForDossier.acuity === 'critical' ? '#EF4444' : '#0284C7'} 
                      strokeWidth="2" 
                      rx="2" 
                    />
                    <text x="89" y="32" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#0F172A">
                      {selectedBedForDossier.id.split('-').slice(-1)[0] || 'BED'}
                    </text>
                  </svg>
                </div>
              </div>

              {/* VERIFIED DISCRETE CLINICAL VITALS LOG */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <HeartPulse size={14} className="text-rose-600" /> Verified Clinical Vitals
                  </h4>
                  <button 
                    onClick={() => setIsLoggingVitals(prev => !prev)}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} /> {isLoggingVitals ? 'Cancel' : 'Log Fresh Vitals'}
                  </button>
                </div>

                {isLoggingVitals ? (
                  <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-xl flex flex-col gap-3">
                    <span className="text-xs font-bold text-blue-900">Record Bedside Measurement</span>
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-600">BP (mmHg)</label>
                        <input 
                          type="text" value={freshBp} onChange={e => setFreshBp(e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-600">HR (bpm)</label>
                        <input 
                          type="number" value={freshHr} onChange={e => setFreshHr(Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-600">SpO₂ (%)</label>
                        <input 
                          type="number" value={freshSpo2} onChange={e => setFreshSpo2(Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-600">Temp (°C)</label>
                        <input 
                          type="number" step="0.1" value={freshTemp} onChange={e => setFreshTemp(Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono font-bold"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleSaveFreshVitals}
                      className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg cursor-pointer"
                    >
                      Save Vitals to Medical Record
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">BP</span>
                      <span className="text-sm font-black text-slate-900 block font-mono">
                        {selectedBedForDossier.patientSafety?.vitals?.bp || '120/80'}
                      </span>
                      <span className="text-[9px] font-medium text-emerald-700">Normotensive</span>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">HR</span>
                      <span className="text-sm font-black text-slate-900 block font-mono">
                        {selectedBedForDossier.patientSafety?.vitals?.hr || 75} bpm
                      </span>
                      <span className="text-[9px] font-medium text-slate-600">Sinus</span>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">SpO₂</span>
                      <span className="text-sm font-black text-slate-900 block font-mono">
                        {selectedBedForDossier.patientSafety?.vitals?.spo2 || 98}%
                      </span>
                      <span className="text-[9px] font-medium text-blue-700">Room Air</span>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Temp</span>
                      <span className="text-sm font-black text-slate-900 block font-mono">
                        {selectedBedForDossier.patientSafety?.vitals?.temp || 37.0} °C
                      </span>
                      <span className="text-[9px] font-medium text-slate-600">Oral</span>
                    </div>
                  </div>
                )}

                {/* MEWS CLINICAL DECISION SUPPORT SCORE */}
                {(() => {
                  const mews = calculateMEWS(selectedBedForDossier.patientSafety?.vitals);
                  return (
                    <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                      mews.score >= 5 ? 'bg-rose-50 border-rose-300 text-rose-900' :
                      mews.score >= 3 ? 'bg-amber-50 border-amber-300 text-amber-900' :
                      'bg-emerald-50 border-emerald-300 text-emerald-900'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${mews.badgeClass}`}>
                          MEWS: {mews.score}
                        </span>
                        <div>
                          <span className="font-bold block text-xs">Early Warning Score ({mews.riskLevel} RISK)</span>
                          <span className="text-[11px] opacity-90">{mews.recommendation}</span>
                        </div>
                      </div>
                      {mews.triggerSepsisAlert && (
                        <span className="px-2 py-1 bg-rose-600 text-white font-bold rounded text-[10px] animate-pulse">
                          STAT Sepsis Protocol
                        </span>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* SAFETY & CLINICAL ORDERS */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1.5">
                  <span className="font-bold text-slate-800">Safety Precautions</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10px]">
                      Fall Risk Armed
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold text-[10px]">
                      Isolation: {selectedBedForDossier.patientSafety?.isolation || 'None'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-semibold text-[10px]">
                      Allergies: {selectedBedForDossier.patientSafety?.allergies?.join(', ') || 'NKDA'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1.5">
                  <span className="font-bold text-slate-800">Active Apparatus</span>
                  <div className="text-[11px] text-slate-600 space-y-0.5">
                    <div>• IV Infusion (Normal Saline @ 100mL/h)</div>
                    <div>• Cardiac Telemetry Lead II</div>
                  </div>
                </div>
              </div>

              {/* eMAR MEDICATION TIMELINE */}
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Syringe size={14} className="text-blue-600" /> Medication Administration
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-100 text-[11px]">
                      <tr>
                        <th className="py-2 px-3">Medication</th>
                        <th className="py-2 px-2">Dose / Route</th>
                        <th className="py-2 px-3 text-right">Status / Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(selectedBedForDossier.patientSafety?.medicationsSchedule || [
                        { name: 'Normal Saline IV', dose: '1000mL Continuous', route: 'IV', time: '10:00 AM', status: 'due' }
                      ]).map((med: MedicationOrder, idx: number) => (
                        <tr key={idx}>
                          <td className="py-2 px-3 font-bold text-slate-900">{med.name}</td>
                          <td className="py-2 px-2 text-slate-600">{med.dose}</td>
                          <td className="py-2 px-3 text-right">
                            {med.status === 'given' ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                ✓ Administered
                              </span>
                            ) : (
                              <button 
                                onClick={() => handleAdministerMed(idx)}
                                className="px-2.5 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold cursor-pointer"
                              >
                                Administer
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* BED TRANSFER CONTROLS */}
              {isTransferringBed ? (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex flex-col gap-2.5">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <ArrowRightLeft size={14} /> Select Vacant Bed Destination
                  </span>
                  <select 
                    value={targetTransferBedId}
                    onChange={e => setTargetTransferBedId(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                  >
                    <option value="">-- Choose Available Bed --</option>
                    {beds.filter(b => b.status === 'empty').map(b => (
                      <option key={b.id} value={b.id}>
                        Bay {b.id} (Level {b.floorNumber || 4} • {b.room})
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleExecuteBedTransfer}
                      className="flex-1 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Confirm Transfer
                    </button>
                    <button 
                      onClick={() => setIsTransferringBed(false)}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setIsTransferringBed(true)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <ArrowRightLeft size={14} /> Transfer Patient to Another Bed Bay
                </button>
              )}

            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 4. RIGHT DRAWER 2: HOSPITAL-WIDE CAPACITY & WARD BREAKDOWN */}
      {/* ========================================================================= */}
      {showCapacityModal && (
        <>
          <div 
            onClick={() => setShowCapacityModal(false)}
            className="fixed inset-0 z-40 bg-slate-900/30 transition-opacity animate-in fade-in duration-100"
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-100 ease-out">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <BedDouble size={16} className="text-blue-600" /> Hospital Ward &amp; Floor Capacity
              </h3>
              <button onClick={() => setShowCapacityModal(false)} className="p-1 rounded-xl hover:bg-slate-200 text-slate-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4 overflow-y-auto flex-1 custom-scrollbar">
              {[1, 2, 4, 5].map(floorNum => {
                const floorBeds = beds.filter(b => (b.floorNumber ?? (b.id.startsWith('B-4') ? 4 : 1)) === floorNum);
                const occ = floorBeds.filter(b => b.status === 'occupied').length;
                const tot = floorBeds.length || 1;
                const pct = Math.round((occ / tot) * 100);
                return (
                  <div key={floorNum} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">🏢 Floor Level {floorNum}</span>
                      <span className="font-bold text-blue-600">{occ}/{tot} Beds ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
                    </div>
                    <button 
                      onClick={() => {
                        localStorage.setItem('pristine_active_floor', String(floorNum));
                        setShowCapacityModal(false);
                        navigate('/');
                      }}
                      className="mt-1 text-right text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                    >
                      Jump to Level {floorNum} Map ➔
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 5. RIGHT DRAWER 3: STAT CRITICAL PATIENT ROSTER */}
      {/* ========================================================================= */}
      {showCriticalModal && (
        <>
          <div 
            onClick={() => setShowCriticalModal(false)}
            className="fixed inset-0 z-40 bg-slate-900/30 transition-opacity animate-in fade-in duration-100"
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-100 ease-out">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-rose-50 shrink-0">
              <h3 className="font-bold text-sm text-rose-900 flex items-center gap-2">
                <Activity size={16} className="text-rose-600" /> STAT High-Priority Critical Roster
              </h3>
              <button onClick={() => setShowCriticalModal(false)} className="p-1 rounded-xl hover:bg-rose-100 text-rose-700 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3 overflow-y-auto flex-1 custom-scrollbar">
              {beds.filter(b => b.acuity === 'critical').map(bed => (
                <div 
                  key={bed.id} 
                  onClick={() => {
                    setShowCriticalModal(false);
                    handleOpenDossier(bed);
                  }}
                  className="p-3.5 bg-white hover:bg-rose-50/50 rounded-xl border border-rose-200 flex items-center justify-between cursor-pointer transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <DynamicPatientAvatar
                      photoUrl={bed.patientSafety?.photoUrl}
                      patientName={bed.patientName}
                      bedId={bed.id}
                      size="sm"
                      shape="circle"
                      acuity="critical"
                      allowUpload={true}
                    />
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">{bed.patientName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Bay {bed.id} • {bed.room}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-rose-700 block">
                      HR: {bed.patientSafety?.vitals?.hr || 118} bpm
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Open Dossier ➔</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 6. RIGHT DRAWER 4: EVS SANITIZATION & DECONTAMINATION QUEUE */}
      {/* ========================================================================= */}
      {showEVSModal && (
        <>
          <div 
            onClick={() => setShowEVSModal(false)}
            className="fixed inset-0 z-40 bg-slate-900/30 transition-opacity animate-in fade-in duration-100"
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-100 ease-out">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-amber-50 shrink-0">
              <h3 className="font-bold text-sm text-amber-900 flex items-center gap-2">
                <Clock size={16} className="text-amber-600" /> EVS Decontamination Dispatch Queue
              </h3>
              <button onClick={() => setShowEVSModal(false)} className="p-1 rounded-xl hover:bg-amber-100 text-amber-700 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3 overflow-y-auto flex-1 custom-scrollbar">
              {beds.filter(b => b.status === 'cleaning').map(bed => (
                <div key={bed.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">Bay {bed.id} ({bed.room})</span>
                    <span className="text-[10px] text-amber-700 font-semibold">Terminal Disinfection Pending</span>
                  </div>
                  <button 
                    onClick={() => handleCertifyCleanEVS(bed.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                  >
                    ✓ Certify Clean
                  </button>
                </div>
              ))}
              {beds.filter(b => b.status === 'cleaning').length === 0 && (
                <div className="text-center py-12 text-slate-400 text-xs font-medium">
                  ✓ All hospital bays are sanitized and certified for intake!
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 7. RIGHT DRAWER 5: DEPARTMENT WARD CENSUS INSPECTOR */}
      {/* ========================================================================= */}
      {selectedDeptModal && (
        <>
          <div 
            onClick={() => setSelectedDeptModal(null)}
            className="fixed inset-0 z-40 bg-slate-900/30 transition-opacity animate-in fade-in duration-100"
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-100 ease-out">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <h3 className="font-bold text-sm text-slate-900">
                {selectedDeptModal} Department Bay Roster
              </h3>
              <button onClick={() => setSelectedDeptModal(null)} className="p-1 rounded-xl hover:bg-slate-200 text-slate-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-2.5 overflow-y-auto flex-1 custom-scrollbar">
              {beds.filter(b => {
                if (selectedDeptModal === 'ICU') return b.id.includes('401') || b.id.includes('101');
                if (selectedDeptModal === 'Isolation') return b.id.includes('404') || b.id.includes('108');
                return b.id.includes('402') || b.id.includes('403') || b.id.includes('105');
              }).map(bed => (
                <div 
                  key={bed.id} 
                  onClick={() => {
                    setSelectedDeptModal(null);
                    if (bed.status === 'occupied') handleOpenDossier(bed);
                    else handleNavigateToMap(bed);
                  }}
                  className="p-3 bg-slate-50 hover:bg-blue-50/60 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">Bay {bed.id}</span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {bed.patientName ? `Patient: ${bed.patientName}` : 'Bay Vacant / Ready'}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    bed.status === 'occupied' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {bed.status === 'occupied' ? 'Occupied' : 'Vacant'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 8. RIGHT DRAWER 6: SBAR SHIFT HANDOVER AGGREGATOR */}
      {/* ========================================================================= */}
      {showSbarModal && (
        <>
          <div 
            onClick={() => setShowSbarModal(false)}
            className="fixed inset-0 z-40 bg-slate-900/30 transition-opacity animate-in fade-in duration-100"
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[520px] md:w-[560px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-100 ease-out">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FileText size={16} className="text-blue-600" /> SBAR Nurse Shift Handover Document
              </h3>
              <button onClick={() => setShowSbarModal(false)} className="p-1 rounded-xl hover:bg-slate-200 text-slate-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 overflow-y-auto custom-scrollbar font-mono text-xs text-slate-800 space-y-4 bg-slate-50/50 flex-1">
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-900 text-sm">CLINICAL SHIFT HANDOVER (SBAR)</div>
                <div className="text-[11px] text-slate-500">Generated: {new Date().toLocaleString()} • Charge RN Sarah</div>
                <div className="text-[11px] text-blue-700 font-bold">Total Inpatients: {occupiedBeds} | Critical Load: {criticalBeds}</div>
              </div>

              {activePatients.map(bed => (
                <div key={bed.id} className="p-3 bg-white border border-slate-200 rounded-xl space-y-1.5">
                  <div className="font-bold text-slate-900 flex justify-between">
                    <span>[S] {bed.patientName} ({bed.id} • {bed.room})</span>
                    <span className={bed.acuity === 'critical' ? 'text-rose-600' : 'text-emerald-700'}>
                      {bed.acuity.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <strong>[B]ackground:</strong> MRN: {bed.patientSafety?.mrn} | {bed.patientSafety?.age}yo {bed.patientSafety?.gender} | Isolation: {bed.patientSafety?.isolation}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <strong>[A]ssessment:</strong> BP: {bed.patientSafety?.vitals?.bp} | HR: {bed.patientSafety?.vitals?.hr} bpm | SpO2: {bed.patientSafety?.vitals?.spo2}% | Temp: {bed.patientSafety?.vitals?.temp}°C
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <strong>[R]ecommendation:</strong> MD: {bed.patientSafety?.assignedDoctor} | Continue continuous vitals monitoring &amp; scheduled IV meds.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 9. RIGHT DRAWER 7: SHIFT STAFFING & CLINICAL SAFETY INDICATORS */}
      {/* ========================================================================= */}
      {showStaffingModal && (
        <>
          <div 
            onClick={() => setShowStaffingModal(false)}
            className="fixed inset-0 z-40 bg-slate-900/30 transition-opacity animate-in fade-in duration-100"
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-100 ease-out">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-blue-50 shrink-0">
              <h3 className="font-bold text-sm text-blue-900 flex items-center gap-2">
                <UserCheck size={16} className="text-blue-600" /> Shift Staffing &amp; Nurse Allocation
              </h3>
              <button onClick={() => setShowStaffingModal(false)} className="p-1 rounded-xl hover:bg-blue-100 text-blue-700 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3.5 overflow-y-auto flex-1 custom-scrollbar">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-900 block">Nurse-to-Patient Ratio</span>
                <span className="text-lg font-black text-blue-700 font-mono">1:2 (Optimal Safety Tier)</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Compliant with Level 1 Trauma &amp; ICU Critical Care Mandates.</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-700">Active Roving Nurses on Duty:</div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl flex justify-between items-center shadow-2xs">
                  <div>
                    <span className="font-bold text-slate-900 block">RN Clara Davis (BSN, CCRN)</span>
                    <span className="text-[10px] text-slate-500">ICU &amp; Stepdown Bays (B-401-1, B-402-3)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">On Shift</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl flex justify-between items-center shadow-2xs">
                  <div>
                    <span className="font-bold text-slate-900 block">RN John Reyes (BSN)</span>
                    <span className="text-[10px] text-slate-500">Acute Inpatient &amp; Isolation (B-403-3, B-404-1)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">On Shift</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 10. RIGHT DRAWER 8: ACLS EMERGENCY READINESS */}
      {/* ========================================================================= */}
      {showACLSModal && (
        <>
          <div 
            onClick={() => setShowACLSModal(false)}
            className="fixed inset-0 z-40 bg-slate-900/30 transition-opacity animate-in fade-in duration-100"
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-100 ease-out">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-emerald-50 shrink-0">
              <h3 className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                <ShieldAlert size={16} className="text-emerald-600" /> ACLS Emergency Readiness
              </h3>
              <button onClick={() => setShowACLSModal(false)} className="p-1 rounded-xl hover:bg-emerald-100 text-emerald-700 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3.5 text-xs overflow-y-auto flex-1 custom-scrollbar">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block">Crash Cart Verification</span>
                <span className="text-emerald-700 font-bold text-sm">✓ 100% Sealed &amp; Certified (06:00 AM)</span>
                <p className="text-[10px] text-slate-500 mt-1">Epinephrine, Amiodarone, Defibrillator Pads &amp; Suction inspected.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block">Code Blue Velocity</span>
                <span className="text-blue-700 font-bold text-sm">&lt; 85s Hospital Target Response</span>
                <p className="text-[10px] text-slate-500 mt-1">Trauma Resuscitation Team automatically paged on trigger.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ADMISSION MODAL */}
      <PatientAdmissionModal 
        isOpen={showAdmissionModal}
        onClose={() => setShowAdmissionModal(false)}
        availableBeds={beds.filter(b => b.status === 'empty')}
        onSuccess={() => {
          setShowAdmissionModal(false);
          showToast('Patient successfully admitted!', 'success');
        }}
      />

      {/* NEW HOSPITAL EMPLOYEE ONBOARDING MODAL */}
      <NewStaffModal
        isOpen={showNewStaffModal}
        onClose={() => setShowNewStaffModal(false)}
        onStaffRegistered={(staff) => {
          showToast(`Welcome to Pristine OS, ${staff.fullName}!`, 'success');
        }}
      />
    </div>
  );
});
