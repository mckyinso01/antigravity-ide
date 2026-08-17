import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  Trash2, 
  Check, 
  Sparkles,
  User,
  RefreshCw
} from 'lucide-react';
import { db, type StaffMember } from '../db';
import { useToast } from '../contexts/ToastContext';
import { clinicalAudio } from '../utils/clinicalAudio';

interface StaffPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: StaffMember | null;
  onPhotoUpdated?: (updatedStaff: StaffMember) => void;
}

// Helper to generate crisp, offline-ready vector clinical avatars
const makeClinicalSvg = (roleCode: string, bg1: string, bg2: string, scrub: string, skin: string, hair: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
    <defs>
      <linearGradient id="bg_${roleCode}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
      <linearGradient id="scrub_${roleCode}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${scrub}"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect width="120" height="120" rx="26" fill="url(#bg_${roleCode})"/>
    
    <!-- Hair Base -->
    <circle cx="60" cy="46" r="26" fill="${hair}"/>
    
    <!-- Head / Face -->
    <circle cx="60" cy="48" r="21" fill="${skin}"/>
    
    <!-- Hair Front Trim -->
    <path d="M 40 42 Q 60 26 80 42 Q 60 36 40 42 Z" fill="${hair}"/>

    <!-- Eyes -->
    <circle cx="53" cy="48" r="2.5" fill="#0F172A"/>
    <circle cx="67" cy="48" r="2.5" fill="#0F172A"/>

    <!-- Friendly Smile -->
    <path d="M 54 56 Q 60 61 66 56" fill="none" stroke="#9F1239" stroke-width="1.8" stroke-linecap="round"/>

    <!-- Shoulders & Clinical Scrubs -->
    <path d="M 20 120 C 20 84, 100 84, 100 120 Z" fill="url(#scrub_${roleCode})"/>
    <path d="M 46 84 L 60 102 L 74 84 Z" fill="${skin}"/>

    <!-- Stethoscope -->
    <path d="M 42 78 Q 60 106 78 78" fill="none" stroke="#E2E8F0" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="60" cy="98" r="4.5" fill="#F59E0B" stroke="#0F172A" stroke-width="1.5"/>

    <!-- Clinical Badge Pill -->
    <rect x="22" y="100" width="76" height="16" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="1.2"/>
    <text x="60" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="900" fill="#38BDF8" text-anchor="middle" letter-spacing="0.5">${roleCode}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Curated authentic clinical portrait presets with 100% offline SVG avatars
const CLINICAL_AVATAR_PRESETS = [
  {
    id: 'preset-1',
    role: 'Charge Nurse',
    label: 'Charge RN Sarah',
    url: makeClinicalSvg('CHARGE RN', '#1E40AF', '#3B82F6', '#0284C7', '#FDE047', '#451A03'),
  },
  {
    id: 'preset-2',
    role: 'Critical Care RN',
    label: 'CCRN Elena',
    url: makeClinicalSvg('CCRN II', '#065F46', '#10B981', '#059669', '#FDBA74', '#78350F'),
  },
  {
    id: 'preset-3',
    role: 'Trauma Surgeon',
    label: 'Dr. Santos, MD',
    url: makeClinicalSvg('SURGEON MD', '#6B21A8', '#A855F7', '#7C3AED', '#FED7AA', '#1E293B'),
  },
  {
    id: 'preset-4',
    role: 'Intensivist MD',
    label: 'Dr. Chen, MD',
    url: makeClinicalSvg('INTENSIVIST', '#9A3412', '#F97316', '#EA580C', '#FEF08A', '#0F172A'),
  },
  {
    id: 'preset-5',
    role: 'Cardiologist',
    label: 'Dr. Hayes, MD',
    url: makeClinicalSvg('CARDIOLOGY', '#155E75', '#06B6D4', '#0891B2', '#FED7AA', '#475569'),
  },
  {
    id: 'preset-6',
    role: 'Trauma RN',
    label: 'RN Marcus',
    url: makeClinicalSvg('TRAUMA RN', '#1E3A8A', '#2563EB', '#3B82F6', '#93532F', '#09090B'),
  },
  {
    id: 'preset-7',
    role: 'Neurologist',
    label: 'Dr. Lin, MD',
    url: makeClinicalSvg('NEUROLOGY', '#831843', '#EC4899', '#DB2777', '#FEF08A', '#18181B'),
  },
  {
    id: 'preset-8',
    role: 'EVS Biohazard Lead',
    label: 'EVS Maria',
    url: makeClinicalSvg('EVS BIO-LEAD', '#3F6212', '#84CC16', '#65A30D', '#FDE047', '#3F3F46'),
  },
  {
    id: 'preset-9',
    role: 'PharmD Specialist',
    label: 'PharmD David',
    url: makeClinicalSvg('PHARMACY', '#713F12', '#EAB308', '#CA8A04', '#FFEDD5', '#292524'),
  },
  {
    id: 'preset-10',
    role: 'Operations Director',
    label: 'Director Robert',
    url: makeClinicalSvg('OPS ADMIN', '#0F172A', '#334155', '#1E293B', '#FED7AA', '#94A3B8'),
  },
  {
    id: 'preset-11',
    role: 'Flight Paramedic',
    label: 'Flight Medic John',
    url: makeClinicalSvg('AIR MEDIC', '#991B1B', '#EF4444', '#DC2626', '#FED7AA', '#713F12'),
  },
  {
    id: 'preset-12',
    role: 'Triage Nurse',
    label: 'Triage RN Brenda',
    url: makeClinicalSvg('TRIAGE RN', '#1E3A8A', '#6366F1', '#4F46E5', '#FDE047', '#7C2D12'),
  }
];

const GRADIENT_PALETTES = [
  'from-blue-600 to-indigo-700',
  'from-emerald-600 to-teal-700',
  'from-purple-600 to-pink-700',
  'from-rose-600 to-red-700',
  'from-amber-600 to-orange-700',
  'from-cyan-600 to-blue-700',
  'from-slate-700 to-slate-900',
  'from-violet-600 to-indigo-900',
];

export const StaffPhotoModal: React.FC<StaffPhotoModalProps> = ({
  isOpen,
  onClose,
  staff,
  onPhotoUpdated,
}) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null);
  const [selectedGradient, setSelectedGradient] = useState<string>('from-blue-600 to-indigo-700');
  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'initials'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (staff) {
      setPreviewPhotoUrl(staff.photoUrl || null);
      setSelectedGradient(staff.avatarColor || 'from-blue-600 to-indigo-700');
      setActiveTab(staff.photoUrl ? 'upload' : 'presets');
    }
  }, [staff, isOpen]);

  if (!isOpen || !staff) return null;

  // Process File to Base64 Data URL
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (.png, .jpg, .webp)', 'warn');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image is larger than 5MB. Please choose a smaller image.', 'warn');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPreviewPhotoUrl(result);
        clinicalAudio.playSuccessChime();
        showToast('Photo loaded successfully. Click "Save Photo" to apply.', 'info');
      }
      setIsProcessing(false);
    };
    reader.onerror = () => {
      showToast('Failed to read image file.', 'error');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Save changes to Dexie DB
  const handleSave = async () => {
    try {
      setIsProcessing(true);
      await db.staff.update(staff.id, {
        photoUrl: previewPhotoUrl || undefined,
        avatarColor: selectedGradient,
      });

      const updated = await db.staff.get(staff.id);
      if (updated) {
        onPhotoUpdated?.(updated);
      }

      clinicalAudio.playSuccessChime();
      showToast(`✓ Updated profile photo for ${staff.fullName}`, 'success');
      onClose();
    } catch (err) {
      console.error('Failed to update staff photo in DB:', err);
      showToast('Failed to save photo to database', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Remove Photo (reset to initials)
  const handleRemovePhoto = () => {
    setPreviewPhotoUrl(null);
    setActiveTab('initials');
    clinicalAudio.playDrawerSwoosh();
    showToast('Photo cleared. Avatar will use initials.', 'info');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl bg-white rounded-3xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Top Header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Camera size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold">Staff Profile Photo Manager</h3>
                <p className="text-xs text-slate-400">
                  Update credential portrait for <strong className="text-blue-400">{staff.fullName}</strong> ({staff.employeeId})
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5 text-xs custom-scrollbar">
            
            {/* Live Interactive Avatar Preview Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar Preview Bubble */}
                <div className="relative group">
                  {previewPhotoUrl ? (
                    <img
                      src={previewPhotoUrl}
                      alt={staff.fullName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${selectedGradient} text-white font-black text-xl flex items-center justify-center shadow-md`}>
                      {staff.avatarInitials || staff.fullName.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  {/* Camera Icon Overlay */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md border-2 border-white cursor-pointer transition-transform hover:scale-110"
                    title="Upload new image"
                  >
                    <Upload size={11} />
                  </button>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">{staff.fullName}</h4>
                  <span className="text-xs font-semibold text-blue-700 block">{staff.jobTitle}</span>
                  <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">{staff.department} • {staff.employeeId}</span>
                </div>
              </div>

              {previewPhotoUrl && (
                <button
                  onClick={handleRemovePhoto}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Remove current photo"
                >
                  <Trash2 size={13} />
                  <span>Clear Photo</span>
                </button>
              )}
            </div>

            {/* Hidden Real File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'upload' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload size={14} />
                <span>Upload File</span>
              </button>

              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'presets' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles size={14} className="text-amber-500" />
                <span>Clinical Portraits ({CLINICAL_AVATAR_PRESETS.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('initials')}
                className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'initials' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User size={14} />
                <span>Initials Badge</span>
              </button>
            </div>

            {/* TAB 1: FILE UPLOAD DROPZONE */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50/50 scale-[0.99]'
                      : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 shadow-xs">
                    <ImageIcon size={24} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Click to browse or drag & drop staff photo here
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Supports PNG, JPG, JPEG, WEBP up to 5MB
                  </p>
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-2xs flex items-center gap-1.5"
                  >
                    <Upload size={13} />
                    <span>Select Image File</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: PRESET CLINICAL PORTRAITS */}
            {activeTab === 'presets' && (
              <div className="space-y-2">
                <p className="text-[11px] text-slate-500 font-medium">
                  Select an authentic high-resolution clinical portrait preset:
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-64 overflow-y-auto p-1 custom-scrollbar">
                  {CLINICAL_AVATAR_PRESETS.map((preset) => {
                    const isSelected = previewPhotoUrl === preset.url;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setPreviewPhotoUrl(preset.url);
                          clinicalAudio.playDrawerSwoosh();
                        }}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all p-0.5 cursor-pointer group flex flex-col items-center ${
                          isSelected
                            ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <span className="text-[9px] font-bold text-slate-700 mt-1 truncate max-w-full px-1">
                          {preset.label}
                        </span>
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: INITIALS BADGE COLOR PALETTE */}
            {activeTab === 'initials' && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-500 font-medium">
                  Choose a gradient palette for initials-based hospital badges:
                </p>
                <div className="grid grid-cols-4 gap-2.5">
                  {GRADIENT_PALETTES.map((grad, i) => {
                    const isSelected = selectedGradient === grad && !previewPhotoUrl;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSelectedGradient(grad);
                          setPreviewPhotoUrl(null);
                          clinicalAudio.playDrawerSwoosh();
                        }}
                        className={`h-12 rounded-xl bg-linear-to-br ${grad} text-white font-bold text-sm flex items-center justify-center border-2 transition-all cursor-pointer relative ${
                          isSelected ? 'border-blue-500 ring-2 ring-blue-500/40 scale-105 shadow-md' : 'border-transparent hover:scale-102'
                        }`}
                      >
                        {staff.avatarInitials || staff.fullName.slice(0, 2).toUpperCase()}
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white text-blue-700 flex items-center justify-center shadow-xs">
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200 font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Saving to DB...</span>
                </>
              ) : (
                <>
                  <Check size={14} />
                  <span>Save Profile Photo</span>
                </>
              )}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
