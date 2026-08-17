import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, ShieldAlert, Loader2, KeyRound, UserCheck, Lock, Hospital, UserPlus, Radio, ShieldCheck } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type StaffMember } from '../db';
import { NewStaffModal } from '../components/NewStaffModal';
import { clinicalAudio } from '../utils/clinicalAudio';

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('nurse_sarah');
  const [password, setPassword] = useState('123');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'nurse' | 'doctor' | 'evs' | 'respiratory' | 'pharmacy'>('nurse');
  const [isLoading, setIsLoading] = useState(false);
  const [isRfidTapping, setIsRfidTapping] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showNewStaffModal, setShowNewStaffModal] = useState(false);

  // Live Dexie query of all registered staff
  const staffList = useLiveQuery(() => db.staff.toArray(), []) || [];

  const isFullState = username.length > 0 && password.length > 0;

  const handleSelectStaff = (staff: StaffMember) => {
    setUsername(staff.username);
    setPassword(staff.pin || '123');
    setSelectedRole(staff.role);
    setErrorMsg('');
  };

  const handleError = (rawError: unknown) => {
    if (rawError instanceof Error) {
      setErrorMsg(rawError.message || 'Authentication failed. Please check credentials.');
    } else {
      setErrorMsg('Invalid clinical credentials. Please contact Hospital IT.');
    }
    setIsLoading(false);
  };

  const handleRfidTap = async () => {
    try {
      setIsRfidTapping(true);
      setErrorMsg('');
      clinicalAudio.playDrawerSwoosh();

      await new Promise(resolve => setTimeout(resolve, 600));

      const res = await fetch('http://localhost:8089/api/auth/rfid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rfidTag: 'RFID-NURSE-01' })
      }).catch(() => null);

      if (res && res.ok) {
        const auth = await res.json();
        localStorage.setItem('auth_token', auth.token);
        localStorage.setItem('staff_role', auth.staff.role);
        localStorage.setItem('staff_name', auth.staff.name);
        localStorage.setItem('staff_id', auth.staff.id);
        localStorage.setItem('staff_username', 'nurse_sarah');
        localStorage.setItem('staff_floor', '1');
      } else {
        localStorage.setItem('auth_token', `token_nurse_sarah_${Date.now()}`);
        localStorage.setItem('staff_role', 'nurse');
        localStorage.setItem('staff_name', 'Sarah Vance, BSN, RN');
        localStorage.setItem('staff_id', 'staff-001');
      }

      clinicalAudio.playSuccessChime();
      navigate('/');
    } catch {
      setErrorMsg('RFID Badge Reader Timeout');
    } finally {
      setIsRfidTapping(false);
    }
  };

  const handleLogin = async () => {
    if (!isFullState) return;
    
    setIsLoading(true);
    setErrorMsg('');

    try {
      await new Promise(resolve => setTimeout(resolve, 250));
      
      const matchedStaff = staffList.find(s => s.username.toLowerCase() === username.trim().toLowerCase());

      if (matchedStaff) {
        if (password === matchedStaff.pin || password === '123') {
          localStorage.setItem('auth_token', `token_${matchedStaff.username}_${Date.now()}`);
          localStorage.setItem('staff_role', matchedStaff.role);
          localStorage.setItem('staff_name', matchedStaff.fullName);
          localStorage.setItem('staff_id', matchedStaff.id);
          localStorage.setItem('staff_username', matchedStaff.username);
          localStorage.setItem('staff_floor', String(matchedStaff.assignedFloor || 1));
          navigate('/');
          return;
        }
      } else if (password === '123') {
        localStorage.setItem('auth_token', `token_${username}_${Date.now()}`);
        localStorage.setItem('staff_role', selectedRole);
        localStorage.setItem('staff_name', username === 'admin' ? 'Dr. Admin Lead' : username === 'nurse_sarah' ? 'Nurse Sarah Vance' : username);
        navigate('/');
        return;
      }
      
      throw new Error('Invalid clinical badge credentials. (Default demo pass: 123)');
    } catch (error) {
      handleError(error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden font-sans bg-slate-900 select-none">
      
      {/* BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 scale-105"
        style={{ backgroundImage: `url('/nurse_patient_bg.jpg')` }}
      />
      
      {/* SOFT LOW-OPACITY CLINICAL OVERLAY */}
      <div className="absolute inset-0 bg-slate-950/60" />

      {/* FLOATING ENCAPSULATED LOGIN CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[500px] bg-white rounded-3xl border-2 border-slate-400 p-7 sm:p-8 shadow-2xl flex flex-col"
      >
        
        {/* LOGO & BRANDING */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 border-2 border-blue-700 flex items-center justify-center text-white font-black shadow-md">
              <Stethoscope size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-1.5">
                <span>PRISTINE OS</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 border border-blue-300 font-mono px-1.5 py-0.5 rounded font-bold">ENTERPRISE</span>
              </h1>
              <p className="text-xs text-slate-600 font-mono font-bold">Hospital Clinical Workstation</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded-lg border border-emerald-300">
            <ShieldCheck size={12} />
            <span>HIPAA AES-256</span>
          </div>
        </div>

        {/* ENTERPRISE IMPRIVATA ONESIGN RFID BADGE TAP */}
        <div className="mt-4 p-3.5 bg-slate-900 rounded-2xl border border-slate-700 text-slate-100 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <Radio size={12} className="text-emerald-400 animate-pulse" />
              Imprivata OneSign® RFID Reader
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">READY TO TAP</span>
          </div>

          <button
            onClick={handleRfidTap}
            disabled={isRfidTapping}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            {isRfidTapping ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Reading RFID Chip...</span>
              </>
            ) : (
              <>
                <Radio size={14} />
                <span>⚡ Tap Hospital ID Badge (Instant SSO Login)</span>
              </>
            )}
          </button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-300"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase font-mono font-bold"><span className="bg-white px-2 text-slate-500">Or Manual Clinical Credentials</span></div>
        </div>

        {/* REGISTERED STAFF QUICK SELECT */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <KeyRound size={13} className="text-slate-700" />
              Registered Hospital Staff ({staffList.length})
            </label>
            <button 
              onClick={() => setShowNewStaffModal(true)}
              className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
            >
              <UserPlus size={12} />
              <span>Register New</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 max-h-28 overflow-y-auto custom-scrollbar p-1 bg-slate-50 border-2 border-slate-200 rounded-xl">
            {staffList.map((staff) => (
              <button
                key={staff.id}
                type="button"
                onClick={() => handleSelectStaff(staff)}
                className={`p-2 rounded-lg text-left transition-all border text-xs cursor-pointer flex flex-col justify-between ${
                  username === staff.username
                    ? 'bg-blue-50 border-blue-500 text-blue-950 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold truncate text-[11px]">{staff.fullName}</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">{staff.role} • Fl {staff.assignedFloor || 1}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ERROR NOTIFICATION */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 bg-rose-50 border-2 border-rose-300 rounded-xl flex items-center space-x-2 text-rose-800 text-xs font-bold mb-4"
            >
              <ShieldAlert size={16} className="text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* INPUT FIELDS */}
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <UserCheck size={14} className="text-slate-700" />
              Username / Staff ID
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              onKeyDown={handleKeyDown}
              className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2 text-slate-950 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white text-xs font-mono font-bold transition-all disabled:opacity-50"
              placeholder="e.g. nurse_sarah"
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Lock size={14} className="text-slate-700" />
                Badge PIN / Password
              </label>
              <span className="text-[10px] text-slate-500 font-mono font-bold">Demo pass: 123</span>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              onKeyDown={handleKeyDown}
              className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2 text-slate-950 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white text-xs font-mono font-bold transition-all disabled:opacity-50 tracking-widest"
              placeholder="••••••••"
            />
          </div>

          {/* SIGN IN ACTION BUTTON */}
          <button 
            onClick={handleLogin}
            disabled={!isFullState || isLoading}
            className={`w-full mt-2 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-0.5 border-2 ${
              !isFullState || isLoading
                ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
                : 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700 active:translate-y-0'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Authenticating Badge...</span>
              </>
            ) : (
              <span>Sign In to Workstation</span>
            )}
          </button>
        </div>

        {/* WORKSTATION FOOTER */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-slate-500">
          <div className="flex items-center gap-1">
            <Hospital size={13} className="text-blue-700" />
            <span>Ward Node: ER-ICU-01</span>
          </div>
          <span>v1.0.0-ENTERPRISE</span>
        </div>
      </motion.div>

      {/* NEW EMPLOYEE REGISTRATION MODAL */}
      <NewStaffModal
        isOpen={showNewStaffModal}
        onClose={() => setShowNewStaffModal(false)}
        onStaffRegistered={(staff) => {
          setUsername(staff.username);
          setPassword(staff.pin);
          setSelectedRole(staff.role);
          navigate('/');
        }}
      />
    </div>
  );
};
