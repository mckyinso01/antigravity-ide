import { useState, useEffect, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  HelpCircle, 
  MoreHorizontal,
  Settings
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, ensureHospitalDataSeeded, type RoomData, DEFAULT_HOSPITAL_FLOORS } from '../db';
import { useEmergency } from '../contexts/EmergencyContext';
import { useToast } from '../contexts/ToastContext';
import { PatientAdmissionModal } from '../components/PatientAdmissionModal';
import { PatientDrawerInspector } from '../components/PatientDrawerInspector';
import { EvacPlanScannerModal } from '../components/EvacPlanScannerModal';
import { AclsAuditLogModal } from '../components/AclsAuditLogModal';
import { HospitalProvisioningModal } from '../components/HospitalProvisioningModal';
import { KeyboardShortcutsModal } from '../components/KeyboardShortcutsModal';
import { CommandPaletteModal } from '../components/CommandPaletteModal';
import { FloorClonerModal } from '../components/FloorClonerModal';
import { SettingsPanel } from '../components/SettingsPanel';
import { BedCensusDrawer } from '../components/drawers/BedCensusDrawer';
import { EVSTasksDrawer } from '../components/drawers/EVSTasksDrawer';
import { SecurityAlertsDrawer } from '../components/drawers/SecurityAlertsDrawer';

import { ConceptBStatsRibbon } from '../components/ConceptBStatsRibbon';
import { ConceptBFloorplan } from '../components/ConceptBFloorplan';
import { ConceptBRightPanel } from '../components/ConceptBRightPanel';
import { ConceptBCADBuilder } from '../components/ConceptBCADBuilder';
import { UserShiftMenu } from '../components/UserShiftMenu';
import { NewStaffModal } from '../components/NewStaffModal';
import { AdminBlueprintAuthModal } from '../components/AdminBlueprintAuthModal';

export type ActiveDrawerType = 'none' | 'bed-census' | 'evs-tasks' | 'security-alerts' | 'room-inspector';

export const CommandCenter = memo(() => {
  const { showToast } = useToast();
  
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [selectedBedId, setSelectedBedId] = useState<string | null>(null);
  const [preselectedBedForAdmission, setPreselectedBedForAdmission] = useState<string | undefined>(undefined);
  const { isCodeBlue, triggerCodeBlue, standDownCodeBlue } = useEmergency();

  // Zero-Tab Switching Right Drawers State
  const [activeRightDrawer, setActiveRightDrawer] = useState<ActiveDrawerType>('none');
  
  // Modals state
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showEvacScannerModal, setShowEvacScannerModal] = useState(false);
  const [showAclsModal, setShowAclsModal] = useState(false);
  const [showProvisioningModal, setShowProvisioningModal] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNewStaffModal, setShowNewStaffModal] = useState(false);

  const [showBlueprintAuthModal, setShowBlueprintAuthModal] = useState(false);
  const [targetFloorToEdit, setTargetFloorToEdit] = useState<number>(1);
  const [isBuilderMode, setIsBuilderMode] = useState(false);
  const [currentFloorNumber, setCurrentFloorNumber] = useState<number>(() => {
    const saved = localStorage.getItem('pristine_active_floor');
    return saved ? Number(saved) : 1;
  });
  const [showFloorCloner, setShowFloorCloner] = useState(false);
  const [isHipaaMasked, setIsHipaaMasked] = useState<boolean>(() => {
    return localStorage.getItem('pristine_hipaa_shield') === 'true';
  });

  const handleToggleHipaa = () => {
    setIsHipaaMasked(prev => {
      const next = !prev;
      localStorage.setItem('pristine_hipaa_shield', String(next));
      showToast(`HIPAA Privacy Shield ${next ? 'Activated (PHI Masked)' : 'Deactivated (Full Name Shown)'}`, 'info');
      return next;
    });
  };

  // Global ER Keyboard Command Deck Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowShortcutsModal(prev => !prev);
      } else if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setPreselectedBedForAdmission(undefined);
        setShowAdmissionModal(true);
      } else if (e.altKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        if (isCodeBlue) standDownCodeBlue();
        else triggerCodeBlue('Emergency Resuscitation (Hotkeyed)');
      } else if (e.altKey && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        setShowEvacScannerModal(true);
      } else if (e.key === 'Escape') {
        setShowCommandPalette(false);
        setShowShortcutsModal(false);
        setShowAdmissionModal(false);
        setShowEvacScannerModal(false);
        setShowAclsModal(false);
        setShowProvisioningModal(false);
        setShowSettingsModal(false);
        setActiveRightDrawer('none');
        setSelectedRoom(null);
        setSelectedBedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCodeBlue, standDownCodeBlue, triggerCodeBlue]);


  useEffect(() => {
    const initFloorData = async () => {
      try {
        await ensureHospitalDataSeeded();
      } catch (err) {
        console.error("Init Floor Data Error:", err);
      }
    };
    initFloorData();
  }, []);

  const allRooms = useLiveQuery(() => db.rooms.toArray()) || [];
  const allBeds = useLiveQuery(() => db.beds.toArray()) || [];

  const rooms = allRooms.filter(r => (r.floorNumber ?? 1) === currentFloorNumber);
  const beds = allBeds.filter(b => (b.floorNumber ?? 1) === currentFloorNumber);

  const handleSelectFloor = (floorNum: number) => {
    setCurrentFloorNumber(floorNum);
    localStorage.setItem('pristine_active_floor', String(floorNum));
    const floorMeta = DEFAULT_HOSPITAL_FLOORS.find(f => f.number === floorNum);
    if (floorMeta) {
      showToast(`Switched to ${floorMeta.name} (${floorMeta.department})`, 'info');
    }
  };

  const availableBeds = beds.filter(b => b.status === 'empty');

  const handleOpenBedDossier = (bedId: string) => {
    const targetBed = beds.find(b => b.id === bedId);
    if (targetBed) {
      const targetRoom = rooms.find(r => r.id === targetBed.room);
      if (targetRoom) {
        setSelectedRoom(targetRoom);
      }
    }
    setSelectedBedId(bedId);
    setActiveRightDrawer('none');
  };
  const occupiedBeds = beds.filter(b => b.status === 'occupied');
  const availableBedsList = beds.filter(b => b.status === 'empty');
  const criticalBedsList = beds.filter(b => b.acuity === 'critical');
  const stableBedsList = beds.filter(b => b.acuity === 'stable');

  const occupiedCount = occupiedBeds.length;
  const availableCount = availableBedsList.length;
  const criticalCount = criticalBedsList.length;
  const stableCount = stableBedsList.length;
  const totalBedsCount = beds.length;
  const avgAcuityDisplay = totalBedsCount > 0 ? `${criticalCount}/${occupiedCount || 0}` : '0/0';

  const selectedBedObject = beds.find(b => b.id === selectedBedId) || (beds.length > 0 ? (beds.find(b => b.status === 'occupied') || beds[0]) : null);

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col font-sans bg-[#F4F5F7]">
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* CONCEPT B: TOP HEADER (Hospital Map + Top Right Utility Icons) */}
          <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 shrink-0 z-30">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
              Hospital Map
            </h1>

            {/* Top Right Utility Controls */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowCommandPalette(true)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                title="Options"
              >
                <MoreHorizontal size={18} />
              </button>

              <button 
                onClick={() => setActiveRightDrawer(activeRightDrawer === 'security-alerts' ? 'none' : 'security-alerts')}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors relative cursor-pointer"
                title="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
              </button>

              <button 
                onClick={() => setShowSettingsModal(true)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title="Settings"
              >
                <Settings size={18} />
              </button>

              <button 
                onClick={() => setShowShortcutsModal(true)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors relative cursor-pointer"
                title="Help & Shortcuts"
              >
                <HelpCircle size={18} />
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">?</span>
              </button>

              {/* USER PROFILE & SHIFT HANDOVER MENU */}
              <UserShiftMenu onOpenNewStaffModal={() => setShowNewStaffModal(true)} />
            </div>
          </header>

          {/* MAIN 2-CARD WORKSPACE (EXACT CONCEPT B CLONE) */}
          <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden bg-[#F4F5F7]">
            
            {/* LEFT MAIN CARD: LIVE OCCUPANCY STATS & ARCHITECTURAL FLOORPLAN */}
            <div className="flex-1 bg-white border border-slate-300 rounded-2xl shadow-xs p-4 flex flex-col overflow-hidden min-w-0">
              <ConceptBStatsRibbon
                occupiedCount={occupiedCount}
                availableCount={availableCount}
                totalBedsCount={totalBedsCount}
                criticalCount={criticalCount}
                stableCount={stableCount}
                avgAcuity={avgAcuityDisplay}
                isBuilderMode={isBuilderMode}
                onToggleBuilderMode={(enabled) => {
                  if (enabled) {
                    setTargetFloorToEdit(currentFloorNumber);
                    setShowBlueprintAuthModal(true);
                  } else {
                    setIsBuilderMode(false);
                  }
                }}
                onSelectBlueprint={() => showToast(`Hospital Blueprint Mode active`, 'info')}
                isHipaaMasked={isHipaaMasked}
                onToggleHipaa={handleToggleHipaa}
              />

              <div className="flex-1 flex flex-col overflow-hidden relative">
                {isBuilderMode ? (
                  <ConceptBCADBuilder
                    rooms={rooms}
                    floorLevel={currentFloorNumber}
                    onSelectFloor={handleSelectFloor}
                    onExitBuilder={() => setIsBuilderMode(false)}
                  />
                ) : (
                  <ConceptBFloorplan
                    floorNumber={currentFloorNumber}
                    selectedBedId={selectedBedId}
                    onSelectFloor={handleSelectFloor}
                    onOpenFloorEditor={(floorNum) => {
                      setTargetFloorToEdit(floorNum);
                      setShowBlueprintAuthModal(true);
                    }}
                    isHipaaMasked={isHipaaMasked}
                    onSelectBed={(bedId) => {
                      setSelectedBedId(bedId);
                      const matchedBed = beds.find(b => b.id.toLowerCase().includes(bedId.toLowerCase()) || bedId.toLowerCase().includes(b.id.toLowerCase()));
                      if (matchedBed) {
                        const matchedRoom = rooms.find(r => r.id === matchedBed.room);
                        if (matchedRoom) setSelectedRoom(matchedRoom);
                      }
                    }}
                  />
                )}
              </div>
            </div>

            {/* RIGHT CARD: CONCEPT B PATIENT DETAILS DOSSIER */}
            {!isBuilderMode && (
              <ConceptBRightPanel
                selectedBed={selectedBedObject}
                selectedRoom={selectedRoom || (selectedBedObject ? rooms.find(r => r.id === selectedBedObject.room) : null) || rooms[0]}
                onOpenDossier={(bedId) => handleOpenBedDossier(bedId)}
                onOpenAdmission={(bedId) => {
                  setPreselectedBedForAdmission(bedId || selectedBedId || undefined);
                  setShowAdmissionModal(true);
                }}
              />
            )}
          </div>

          {/* RIGHT-SIDE SLIDE-OVER DRAWERS (ZERO TAB-SWITCHING) */}
          <AnimatePresence>
            {/* Drawer 1: Patient / Room Deep Inspector */}
            {activeRightDrawer === 'room-inspector' && selectedRoom && (
              <PatientDrawerInspector 
                room={selectedRoom}
                bedsInRoom={beds.filter(b => b.room === selectedRoom.id)}
                selectedBedId={selectedBedId}
                onSelectBed={(id) => setSelectedBedId(id)}
                onClose={() => setActiveRightDrawer('none')}
                onOpenAdmissionForBed={(bedId) => {
                  setPreselectedBedForAdmission(bedId);
                  setShowAdmissionModal(true);
                }}
              />
            )}

            {/* Drawer 2: Bed Census & Capacity */}
            {activeRightDrawer === 'bed-census' && (
              <BedCensusDrawer
                isOpen={true}
                onClose={() => setActiveRightDrawer('none')}
                beds={beds}
                currentFloorNumber={currentFloorNumber}
                onSelectBed={(bedId) => {
                  const targetBed = beds.find(b => b.id === bedId);
                  if (targetBed) {
                    const targetRoom = rooms.find(r => r.id === targetBed.room);
                    if (targetRoom) setSelectedRoom(targetRoom);
                    setSelectedBedId(bedId);
                  }
                }}
                onAdmitPatient={(bedId) => {
                  setPreselectedBedForAdmission(bedId);
                  setShowAdmissionModal(true);
                }}
              />
            )}

            {/* Drawer 3: EVS Tasks Disinfection Queue */}
            {activeRightDrawer === 'evs-tasks' && (
              <EVSTasksDrawer
                isOpen={true}
                onClose={() => setActiveRightDrawer('none')}
              />
            )}

            {/* Drawer 4: Security & Clinical Alarms */}
            {activeRightDrawer === 'security-alerts' && (
              <SecurityAlertsDrawer
                isOpen={true}
                onClose={() => setActiveRightDrawer('none')}
              />
            )}
          </AnimatePresence>
        </div>

      {/* ADMIN BLUEPRINT AUTHORIZATION MODAL */}
      <AdminBlueprintAuthModal
        isOpen={showBlueprintAuthModal}
        floorNumber={targetFloorToEdit}
        onClose={() => setShowBlueprintAuthModal(false)}
        onSuccess={(floorNum) => {
          setCurrentFloorNumber(floorNum);
          setIsBuilderMode(true);
          showToast(`Admin Authorized • Editing Level ${floorNum} Blueprint`, 'success');
        }}
      />

      {/* Floating Non-Destructive Patient Admission Pod */}
      <PatientAdmissionModal 
        isOpen={showAdmissionModal}
        onClose={() => {
          setShowAdmissionModal(false);
          setPreselectedBedForAdmission(undefined);
        }}
        availableBeds={availableBeds}
        preselectedBedId={preselectedBedForAdmission}
      />

      {/* Evacuation Map Blueprint Scanner Modal */}
      <EvacPlanScannerModal 
        isOpen={showEvacScannerModal}
        onClose={() => setShowEvacScannerModal(false)}
      />

      {/* ACLS Code Blue Resuscitation Audit Log Modal */}
      <AclsAuditLogModal 
        isOpen={showAclsModal}
        onClose={() => setShowAclsModal(false)}
      />

      {/* Gate 21 Hospital Provisioning & Clean Reset Modal */}
      <HospitalProvisioningModal 
        isOpen={showProvisioningModal}
        onClose={() => setShowProvisioningModal(false)}
      />

      {/* ER Keyboard Command Deck & Cheat Sheet */}
      <KeyboardShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />

      {/* Universal Command Palette Spotlight (Ctrl+K) */}
      <CommandPaletteModal
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onSelectBed={(bedId, roomId) => {
          if (roomId) {
            const foundRoom = rooms.find(r => r.id === roomId);
            if (foundRoom) setSelectedRoom(foundRoom);
          }
          setSelectedBedId(bedId);
          setShowCommandPalette(false);
        }}
        onOpenAdmission={() => {
          setPreselectedBedForAdmission(undefined);
          setShowAdmissionModal(true);
        }}
        onToggleCodeBlue={() => {
          if (isCodeBlue) standDownCodeBlue();
          else triggerCodeBlue('Emergency Resuscitation (Command Palette)');
        }}
        isCodeBlue={isCodeBlue}
        onOpenEvac={() => setShowEvacScannerModal(true)}
        onOpenAcls={() => setShowAclsModal(true)}
        onOpenFacility={() => setShowProvisioningModal(true)}
        onOpenShortcuts={() => setShowShortcutsModal(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
      />

      {/* SYSTEM SETTINGS & AI RULES DRAWER */}
      <SettingsPanel
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      {/* FLOOR CLONER MODAL */}
      <FloorClonerModal
        isOpen={showFloorCloner}
        onClose={() => setShowFloorCloner(false)}
        currentFloorNumber={currentFloorNumber}
        onFloorCloned={(target) => {
          handleSelectFloor(target);
        }}
        showToast={showToast}
      />

      {/* NEW EMPLOYEE REGISTRATION MODAL */}
      <NewStaffModal
        isOpen={showNewStaffModal}
        onClose={() => setShowNewStaffModal(false)}
        onStaffRegistered={(staff) => {
          showToast(`Registered and onboarded ${staff.fullName}!`, 'success');
        }}
      />
    </div>
  );
});
