import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Shield, KeyRound, CheckCircle2, Phone, Mail } from 'lucide-react';
import { db, type StaffMember, DEFAULT_HOSPITAL_FLOORS } from '../db';
import { clinicalAudio } from '../utils/clinicalAudio';
import { useToast } from '../contexts/ToastContext';

interface NewStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStaffRegistered?: (newStaff: StaffMember) => void;
}

export const NewStaffModal = ({ isOpen, onClose, onStaffRegistered }: NewStaffModalProps) => {
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [employeeId, setEmployeeId] = useState(() => `EMP-${Math.floor(10000 + Math.random() * 90000)}`);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'nurse' | 'doctor' | 'admin' | 'evs' | 'respiratory' | 'pharmacy'>('nurse');
  const [jobTitle, setJobTitle] = useState('Staff Nurse II');
  const [department, setDepartment] = useState('Emergency & Trauma Resuscitation');
  const [assignedFloor, setAssignedFloor] = useState<number>(1);
  const [pin, setPin] = useState('123');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [autoLogin, setAutoLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-generate username and title when role/name changes
  const handleNameChange = (name: string) => {
    setFullName(name);
    if (!username || username.startsWith('user_')) {
      const sanitized = name.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 16);
      if (sanitized) setUsername(sanitized);
    }
  };

  const handleRoleChange = (newRole: typeof role) => {
    setRole(newRole);
    if (newRole === 'nurse') setJobTitle('Staff Nurse II');
    else if (newRole === 'doctor') setJobTitle('Attending Physician');
    else if (newRole === 'admin') setJobTitle('Ward Operations Supervisor');
    else if (newRole === 'evs') setJobTitle('EVS Decontamination Lead');
    else if (newRole === 'pharmacy') setJobTitle('Clinical Pharmacist');
  };

  const handleFloorChange = (floorNum: number) => {
    setAssignedFloor(floorNum);
    const floorMeta = DEFAULT_HOSPITAL_FLOORS.find(f => f.number === floorNum);
    if (floorMeta) {
      setDepartment(floorMeta.department);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !username.trim() || !pin.trim()) {
      showToast('Please complete all required identity fields', 'warn');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate initials
      const initials = fullName
        .split(' ')
        .filter(Boolean)
        .map(w => w[0].toUpperCase())
        .slice(0, 2)
        .join('') || 'RN';

      const colorPalette = [
        'from-blue-600 to-indigo-700',
        'from-emerald-600 to-teal-700',
        'from-purple-600 to-pink-700',
        'from-rose-600 to-red-700',
        'from-amber-600 to-orange-700',
        'from-cyan-600 to-blue-700'
      ];
      const avatarColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];

      const newStaff: StaffMember = {
        id: `staff-${Date.now().toString().slice(-6)}`,
        employeeId: employeeId.trim() || `EMP-${Date.now().toString().slice(-5)}`,
        username: username.trim().toLowerCase(),
        fullName: fullName.trim(),
        role,
        jobTitle: jobTitle.trim(),
        department: department.trim(),
        assignedFloor,
        pin: pin.trim(),
        avatarInitials: initials,
        avatarColor,
        registeredAt: new Date().toISOString(),
        lastActiveShift: `Active Shift • Floor ${assignedFloor}`,
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
      };

      // Persist to Dexie Database
      await db.staff.put(newStaff);

      // Store in LocalStorage if Auto-login is selected
      if (autoLogin) {
        localStorage.setItem('auth_token', `token_${newStaff.username}_${Date.now()}`);
        localStorage.setItem('staff_role', newStaff.role);
        localStorage.setItem('staff_name', newStaff.fullName);
        localStorage.setItem('staff_id', newStaff.id);
        localStorage.setItem('staff_username', newStaff.username);
        localStorage.setItem('staff_floor', String(newStaff.assignedFloor || 1));
      }

      clinicalAudio.playSuccessChime();
      showToast(`Badge registered for ${newStaff.fullName} (${newStaff.employeeId})`, 'success');
      
      onStaffRegistered?.(newStaff);
      onClose();
    } catch (err) {
      console.error(err);
      showToast('Registration failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/60 font-sans">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl bg-white rounded-3xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold">New Employee Badge Registration</h3>
                  <p className="text-xs text-slate-400">Onboard hospital staff & persist credentials for mobile/desktop</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 flex flex-col gap-4 text-xs">
              
              {/* Row 1: Full Name & Employee Badge ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Full Legal / Clinical Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brenda Miller, BSN, RN"
                    value={fullName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-medium text-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Hospital Employee Badge ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EMP-98240"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold text-blue-700 bg-slate-50 text-xs"
                  />
                </div>
              </div>

              {/* Row 2: Role Preset & Job Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Clinical Role / Privilege Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => handleRoleChange(e.target.value as typeof role)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-800 text-xs bg-white cursor-pointer"
                  >
                    <option value="nurse">🩺 Staff Nurse / RN</option>
                    <option value="doctor">👨‍⚕️ Attending Physician / MD</option>
                    <option value="admin">🏢 Clinical Operations / Admin</option>
                    <option value="evs">🧹 EVS Sanitation Specialist</option>
                    <option value="respiratory">🫁 Respiratory Care Practitioner</option>
                    <option value="pharmacy">💊 Clinical Pharmacist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Job Title / Designation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Charge Nurse (Night Shift)"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900 text-xs"
                  />
                </div>
              </div>

              {/* Row 3: Assigned Ward Floor & Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Primary Assigned Floor
                  </label>
                  <select
                    value={assignedFloor}
                    onChange={(e) => handleFloorChange(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-800 text-xs bg-white cursor-pointer"
                  >
                    {DEFAULT_HOSPITAL_FLOORS.map(floor => (
                      <option key={floor.number} value={floor.number}>
                        L{floor.number}: {floor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Department / Unit
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900 text-xs bg-slate-50"
                  />
                </div>
              </div>

              {/* Row 4: Username & Security PIN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-blue-50/60 rounded-2xl border border-blue-200">
                <div>
                  <label className="block text-blue-950 font-bold mb-1 flex items-center gap-1">
                    <KeyRound size={13} className="text-blue-700" />
                    Username Handle <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. nurse_brenda"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-blue-300 font-mono font-bold text-slate-900 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-blue-950 font-bold mb-1 flex items-center gap-1">
                    <Shield size={13} className="text-blue-700" />
                    4-Digit Badge PIN / Passcode <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={8}
                    placeholder="e.g. 1234 (Demo default: 123)"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-blue-300 font-mono font-bold text-slate-900 text-xs bg-white tracking-widest"
                  />
                </div>
              </div>

              {/* Row 5: Optional Contact (Phone & Email) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
                    <Phone size={12} /> Contact Mobile / Hospital Pager
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
                    <Mail size={12} /> Hospital Institutional Email
                  </label>
                  <input
                    type="email"
                    placeholder="brenda.miller@pristine-hospital.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              {/* Immediate Login Checkbox */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={autoLogin}
                  onChange={(e) => setAutoLogin(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <span className="font-semibold text-slate-700">
                  Log in immediately and begin active clinical shift as this employee
                </span>
              </label>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 size={15} />
                  {isSubmitting ? 'Registering...' : 'Save & Register Badge'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
