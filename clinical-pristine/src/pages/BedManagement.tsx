import { useState, memo } from 'react';
import { useToast } from '../contexts/ToastContext';
import { 
  Search, 
  UserPlus, 
  BedDouble, 
  Activity, 
  Filter, 
  Sparkles, 
  MoreHorizontal,
  Bell,
  Settings
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type BedData, type RoomData } from '../db';
import { PatientAdmissionModal } from '../components/PatientAdmissionModal';
import { PatientDrawerInspector } from '../components/PatientDrawerInspector';
import { DynamicPatientAvatar } from '../components/DynamicPatientAvatar';

export const BedManagement = memo(() => {
  const { showToast } = useToast();
  const beds = useLiveQuery(() => db.beds.toArray(), []) || [];
  const rooms = useLiveQuery(() => db.rooms.toArray(), []) || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'stable' | 'isolation' | 'empty' | 'cleaning'>('all');
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [selectedBedId, setSelectedBedId] = useState<string | null>(null);
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [preselectedBedForAdmission, setPreselectedBedForAdmission] = useState<string | undefined>(undefined);

  const totalBeds = beds.length || 13;
  const occupiedBeds = beds.filter(b => b.status === 'occupied').length;
  const availableBeds = beds.filter(b => b.status === 'empty').length;
  const criticalBeds = beds.filter(b => b.acuity === 'critical').length;
  const cleaningBeds = beds.filter(b => b.status === 'cleaning').length;

  const filteredBeds = beds.filter(b => {
    const matchesSearch = 
      (b.patientName && b.patientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.patientSafety?.mrn && b.patientSafety.mrn.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === 'critical') return b.acuity === 'critical';
    if (selectedFilter === 'stable') return b.acuity === 'stable' && b.status === 'occupied';
    if (selectedFilter === 'isolation') return b.patientSafety?.isolation && b.patientSafety.isolation !== 'none';
    if (selectedFilter === 'empty') return b.status === 'empty';
    if (selectedFilter === 'cleaning') return b.status === 'cleaning';
    return true;
  });

  const handleOpenBed = (bed: BedData) => {
    setSelectedBedId(bed.id);
    const room = rooms.find(r => r.id === bed.room) || {
      id: bed.room,
      name: bed.room,
      floorNumber: bed.floorNumber || 1,
      department: 'Emergency',
      status: bed.status,
      acuity: bed.acuity,
      x: 0,
      y: 0,
      w: 100,
      h: 100
    };
    setSelectedRoom(room);
  };

  const handleAutoTriage = async () => {
    const emptyBeds = await db.beds.where('status').equals('empty').toArray();
    if (emptyBeds.length === 0) {
      showToast('No empty beds available for auto-triage.', 'error');
      return;
    }

    const targetBed = emptyBeds[0];
    await db.beds.update(targetBed.id, {
      status: 'occupied',
      patientName: `ER Surge Patient ${Math.floor(Math.random() * 900) + 100}`,
      acuity: 'stable',
      patientSafety: {
        mrn: `MRN-${Math.floor(100000 + Math.random() * 900000)}`,
        age: 48,
        gender: 'Female',
        chiefComplaint: 'Acute Observation & Cardiac Telemetry',
        triageLevel: 3,
        allergies: [],
        fallRisk: false,
        npo: false,
        dnr: false,
        isolation: 'none',
        admittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        assignedDoctor: 'Dr. Gregory House, MD',
        activeApparatus: ['Standard IV Normal Saline'],
        pendingDoctorOrders: ['Electrolytes & CBC'],
        vitals: { bp: '122/82', hr: 74, spo2: 99, temp: 36.8, lastRecorded: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      }
    });

    showToast(`AI Auto-Triage: Admitted surge patient into ${targetBed.id}`, 'success');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* TOP HEADER */}
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-bold text-slate-900 tracking-tight">Patient Directory &amp; Bed Census</h1>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
            {occupiedBeds} Hospitalized Patients
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search patient name, MRN, bed..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white w-56 transition-all"
            />
          </div>

          <div className="h-4 w-px bg-slate-200"></div>

          <button 
            onClick={handleAutoTriage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold shadow-2xs transition-all cursor-pointer border border-slate-300"
          >
            <Sparkles size={14} className="text-blue-600" /> AI Auto-Triage
          </button>

          <button 
            onClick={() => {
              setPreselectedBedForAdmission(undefined);
              setShowAdmissionModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <UserPlus size={14} /> Admit Patient
          </button>

          <button className="text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <MoreHorizontal size={18} />
          </button>

          <button className="relative text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <Bell size={18} />
          </button>

          <button className="text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <Settings size={18} />
          </button>

          {/* USER AVATAR */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              NS
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">Nurse Sarah</span>
              <span className="text-[10px] text-slate-500 font-medium">Charge Nurse</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN BODY */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        
        {/* KPI RIBBON */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Total Hospital Census</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-slate-950 font-sans">{occupiedBeds}</span>
                <span className="text-xs text-slate-400 font-medium">/ {totalBeds} Beds</span>
              </div>
            </div>
            <span className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
              <BedDouble size={20} />
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Critical Resuscitation</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-rose-600 font-sans">{criticalBeds}</span>
                <span className="text-xs text-rose-600 font-bold">Priority 1</span>
              </div>
            </div>
            <span className="p-2.5 rounded-xl bg-rose-50 text-rose-700">
              <Activity size={20} />
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Available Open Beds</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-emerald-700 font-sans">{availableBeds}</span>
                <span className="text-xs text-emerald-700 font-bold">Ready</span>
              </div>
            </div>
            <span className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
              <BedDouble size={20} />
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Decontamination &amp; EVS</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-amber-600 font-sans">{cleaningBeds}</span>
                <span className="text-xs text-amber-600 font-bold">In-Progress</span>
              </div>
            </div>
            <span className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <Sparkles size={20} />
            </span>
          </div>

        </div>

        {/* FILTER BAR & TABLE CONTAINER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex-1 flex flex-col overflow-hidden">
          
          {/* FILTER PILLS */}
          <div className="p-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
                <Filter size={13} /> Filter:
              </span>
              
              {(['all', 'critical', 'stable', 'isolation', 'empty', 'cleaning'] as const).map((filterKey) => (
                <button
                  key={filterKey}
                  onClick={() => setSelectedFilter(filterKey)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    selectedFilter === filterKey 
                      ? 'bg-slate-900 text-white shadow-2xs' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filterKey === 'empty' ? 'Vacant' : filterKey === 'cleaning' ? 'Decontaminating' : filterKey}
                </button>
              ))}
            </div>

            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredBeds.length} of {beds.length} Bays
            </span>
          </div>

          {/* TABLE */}
          <div className="flex-1 overflow-x-auto p-4">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Patient Name</th>
                  <th className="py-2.5 px-3 font-semibold">Bed / Ward Location</th>
                  <th className="py-2.5 px-3 font-semibold">Status &amp; Acuity</th>
                  <th className="py-2.5 px-3 font-semibold">Attending Physician</th>
                  <th className="py-2.5 px-3 font-semibold">Telemetry &amp; Vitals</th>
                  <th className="py-2.5 px-3 font-semibold">Safety Directives</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredBeds.map(bed => {
                  const safety = bed.patientSafety;
                  const isCrit = bed.acuity === 'critical';
                  const isVacant = bed.status === 'empty';
                  const isCleaning = bed.status === 'cleaning';

                  return (
                    <tr key={bed.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* PATIENT AVATAR & NAME */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {bed.status === 'occupied' ? (
                            <DynamicPatientAvatar
                              photoUrl={safety?.photoUrl}
                              patientName={bed.patientName}
                              bedId={bed.id}
                              size="sm"
                              shape="circle"
                              acuity={isCrit ? 'critical' : 'stable'}
                              allowUpload={true}
                            />
                          ) : (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                              isVacant ? 'bg-slate-100 text-slate-400' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {isVacant ? '—' : '🧹'}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-slate-900 block text-xs">
                              {bed.patientName || (isVacant ? 'Vacant Bay Ready for Admission' : 'Terminal Cleaning in Progress')}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {safety?.mrn || (isVacant ? 'BAY-VACANT' : 'EVS-SCHEDULED')}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* LOCATION */}
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900">{bed.id}</span>
                        <span className="text-[10px] text-slate-500 block">{bed.room}</span>
                      </td>

                      {/* ACUITY */}
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isCrit ? 'bg-rose-100 text-rose-700' :
                          isVacant ? 'bg-slate-100 text-slate-600' :
                          isCleaning ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {isCrit ? 'Critical Acuity' : isVacant ? 'Vacant' : isCleaning ? 'Cleaning' : 'Stable'}
                        </span>
                      </td>

                      {/* DOCTOR */}
                      <td className="py-3 px-3 text-slate-700 font-medium">
                        {safety?.assignedDoctor || (isVacant ? '—' : 'EVS Team 1')}
                      </td>

                      {/* VITALS */}
                      <td className="py-3 px-3">
                        {safety?.vitals ? (
                          <div className="text-[11px] font-mono flex items-center gap-1.5">
                            <span className="text-emerald-700 font-semibold">{safety.vitals.hr} bpm</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-blue-600 font-semibold">{safety.vitals.spo2}% SpO2</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-mono">—</span>
                        )}
                      </td>

                      {/* SAFETY */}
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {safety?.fallRisk && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-bold">
                              Fall Risk
                            </span>
                          )}
                          {safety?.isolation && safety.isolation !== 'none' && (
                            <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[9px] font-bold">
                              {safety.isolation}
                            </span>
                          )}
                          {!safety?.fallRisk && (!safety?.isolation || safety.isolation === 'none') && (
                            <span className="text-[10px] text-slate-400">Standard Precautions</span>
                          )}
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="py-3 px-4 text-right">
                        {isVacant ? (
                          <button
                            onClick={() => {
                              setPreselectedBedForAdmission(bed.id);
                              setShowAdmissionModal(true);
                            }}
                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all cursor-pointer"
                          >
                            + Admit
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenBed(bed)}
                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all cursor-pointer"
                          >
                            Inspect Dossier
                          </button>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* ADMISSION MODAL */}
      <PatientAdmissionModal 
        isOpen={showAdmissionModal}
        onClose={() => setShowAdmissionModal(false)}
        preselectedBedId={preselectedBedForAdmission}
        availableBeds={beds.filter(b => b.status === 'empty')}
        onSuccess={() => {
          setShowAdmissionModal(false);
          showToast('Patient successfully admitted!', 'success');
        }}
      />

      {/* DRAWER INSPECTOR */}
      {selectedRoom && (
        <PatientDrawerInspector 
          room={selectedRoom}
          bedsInRoom={beds.filter(b => b.room === selectedRoom.id)}
          selectedBedId={selectedBedId}
          onSelectBed={(id) => setSelectedBedId(id)}
          onClose={() => {
            setSelectedRoom(null);
            setSelectedBedId(null);
          }}
          onOpenAdmissionForBed={(bedId) => {
            setPreselectedBedForAdmission(bedId);
            setShowAdmissionModal(true);
          }}
        />
      )}
    </div>
  );
});
