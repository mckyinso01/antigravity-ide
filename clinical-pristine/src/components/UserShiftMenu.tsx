import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { 
  LogOut, 
  FileText, 
  UserPlus, 
  ChevronDown, 
  KeyRound, 
  X
} from 'lucide-react';
import { db, type StaffMember } from '../db';
import { clinicalAudio } from '../utils/clinicalAudio';
import { useToast } from '../contexts/ToastContext';

interface UserShiftMenuProps {
  onOpenSbarHandover?: () => void;
  onOpenNewStaffModal?: () => void;
}

export const UserShiftMenu = ({ onOpenSbarHandover, onOpenNewStaffModal }: UserShiftMenuProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [showSwitchPinDialog, setShowSwitchPinDialog] = useState<StaffMember | null>(null);
  const [switchPinInput, setSwitchPinInput] = useState('');
  const [switchError, setSwitchError] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  // Live Dexie query of all registered hospital staff
  const staffList = useLiveQuery(() => db.staff.toArray(), []) || [];

  // Active user details from LocalStorage with fallback
  const currentUsername = localStorage.getItem('staff_username') || 'nurse_sarah';
  const currentStaff = staffList.find(s => s.username === currentUsername) || {
    id: 'staff-001',
    employeeId: 'EMP-98214',
    username: 'nurse_sarah',
    fullName: localStorage.getItem('staff_name') || 'Nurse Sarah Vance',
    role: (localStorage.getItem('staff_role') as any) || 'nurse',
    jobTitle: 'Charge Nurse',
    department: 'Emergency & Trauma Resuscitation',
    assignedFloor: Number(localStorage.getItem('staff_floor')) || 1,
    pin: '123',
    avatarInitials: 'NS',
    avatarColor: 'from-slate-900 to-slate-950',
    registeredAt: new Date().toISOString()
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowSwitchPinDialog(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    clinicalAudio.playDrawerSwoosh();
    localStorage.removeItem('auth_token');
    showToast('Signed out of clinical workstation', 'info');
    navigate('/login');
  };

  const handleInitiateSwitch = (staff: StaffMember) => {
    if (staff.username === currentStaff.username) {
      setIsOpen(false);
      return;
    }
    setShowSwitchPinDialog(staff);
    setSwitchPinInput('');
    setSwitchError('');
  };

  const handleConfirmSwitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showSwitchPinDialog) return;

    if (switchPinInput === showSwitchPinDialog.pin || switchPinInput === '123') {
      localStorage.setItem('auth_token', `token_${showSwitchPinDialog.username}_${Date.now()}`);
      localStorage.setItem('staff_role', showSwitchPinDialog.role);
      localStorage.setItem('staff_name', showSwitchPinDialog.fullName);
      localStorage.setItem('staff_id', showSwitchPinDialog.id);
      localStorage.setItem('staff_username', showSwitchPinDialog.username);
      localStorage.setItem('staff_floor', String(showSwitchPinDialog.assignedFloor || 1));

      clinicalAudio.playSuccessChime();
      showToast(`Shift handed over to ${showSwitchPinDialog.fullName} (${showSwitchPinDialog.jobTitle})`, 'success');
      
      setIsOpen(false);
      setShowSwitchPinDialog(null);
    } else {
      setSwitchError('Invalid badge PIN. (Demo PIN: 123)');
    }
  };

  return (
    <div className="relative font-sans select-none" ref={menuRef}>
      
      {/* TRIGGER PILL */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-300 transition-all cursor-pointer shadow-2xs group"
        title="Active Shift Employee Profile & Handover Menu"
      >
        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${currentStaff.avatarColor || 'from-slate-900 to-slate-950'} text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0`}>
          {currentStaff.avatarInitials || 'NS'}
        </div>
        
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1 truncate max-w-[130px]">
            {currentStaff.fullName.split(',')[0]}
          </span>
          <span className="text-[10px] text-slate-500 font-medium leading-tight truncate max-w-[130px]">
            {currentStaff.jobTitle}
          </span>
        </div>

        <ChevronDown size={13} className={`text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-84 bg-white rounded-2xl border border-slate-300 shadow-2xl z-50 overflow-hidden flex flex-col text-xs animate-in fade-in zoom-in-95 duration-150">
          
          {/* Active Employee Header Card */}
          <div className="p-3.5 bg-slate-900 text-white flex items-center gap-3 border-b border-slate-800">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${currentStaff.avatarColor || 'from-blue-600 to-indigo-700'} flex items-center justify-center text-white font-bold text-base shadow-xs shrink-0`}>
              {currentStaff.avatarInitials || 'RN'}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-mono text-[10px] text-blue-400 font-bold">{currentStaff.employeeId}</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold">
                  ● ACTIVE SHIFT
                </span>
              </div>
              <h4 className="text-sm font-bold text-white truncate">{currentStaff.fullName}</h4>
              <p className="text-[10.5px] text-slate-400 truncate">{currentStaff.department}</p>
            </div>
          </div>

          {/* Quick Actions List */}
          <div className="p-2 flex flex-col gap-1 border-b border-slate-200 bg-slate-50">
            {/* 1. SBAR SHIFT HANDOVER */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenSbarHandover?.();
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
            >
              <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                <FileText size={15} />
              </div>
              <div>
                <span className="block leading-tight">SBAR Shift Handover Protocol</span>
                <span className="text-[10px] text-slate-500 font-normal">Generate clinical handover summary for incoming nurse</span>
              </div>
            </button>

            {/* 2. REGISTER NEW STAFF */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenNewStaffModal?.();
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left font-bold text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <div className="p-1.5 rounded-lg bg-slate-200 text-slate-700">
                <UserPlus size={15} />
              </div>
              <div>
                <span className="block leading-tight">Register New Hospital Employee</span>
                <span className="text-[10px] text-slate-500 font-normal">Create badge credentials for mobile & desktop</span>
              </div>
            </button>
          </div>

          {/* Switch Active Staff / Incoming Nurse List */}
          <div className="p-2.5 flex flex-col gap-1.5 max-h-48 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between px-1 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Switch Shift / Handover To:</span>
              <span className="font-mono text-[9.5px] text-blue-600">{staffList.length} Registered</span>
            </div>

            {staffList.map(staff => {
              const isCurrent = staff.username === currentStaff.username;
              return (
                <button
                  key={staff.id}
                  onClick={() => handleInitiateSwitch(staff)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer ${
                    isCurrent 
                      ? 'bg-blue-50 border border-blue-200 text-blue-900 font-bold' 
                      : 'hover:bg-slate-100 text-slate-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${staff.avatarColor || 'from-slate-600 to-slate-800'} text-white flex items-center justify-center font-bold text-[10px] shrink-0`}>
                      {staff.avatarInitials}
                    </div>
                    <div className="truncate">
                      <span className="block font-bold text-xs truncate">{staff.fullName}</span>
                      <span className="text-[10px] text-slate-500 truncate block">{staff.jobTitle}</span>
                    </div>
                  </div>

                  {isCurrent ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold shrink-0">Current</span>
                  ) : (
                    <span className="text-[10px] text-blue-600 font-bold hover:underline shrink-0">Take Over ➔</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick PIN Dialog Popup (When switching user) */}
          {showSwitchPinDialog && (
            <div className="p-3 bg-blue-50 border-t border-blue-200 animate-in fade-in duration-100">
              <form onSubmit={handleConfirmSwitch} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-950 text-xs flex items-center gap-1">
                    <KeyRound size={13} className="text-blue-700" />
                    Enter PIN for {showSwitchPinDialog.fullName.split(' ')[0]}:
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setShowSwitchPinDialog(null)}
                    className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <input
                    type="password"
                    autoFocus
                    required
                    placeholder="Enter 4-digit PIN (123)"
                    value={switchPinInput}
                    onChange={(e) => setSwitchPinInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-blue-300 font-mono text-xs bg-white focus:outline-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs"
                  >
                    Switch Shift
                  </button>
                </div>

                {switchError && (
                  <span className="text-[10px] text-rose-600 font-bold">{switchError}</span>
                )}
              </form>
            </div>
          )}

          {/* Footer: Return to Login Screen */}
          <div className="p-2 border-t border-slate-200 bg-slate-100">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-slate-300 hover:border-rose-300 font-bold transition-all cursor-pointer shadow-2xs"
            >
              <LogOut size={14} />
              <span>Lock Workstation (Return to Login Screen)</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
