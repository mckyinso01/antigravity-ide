import React, { useState, useRef } from 'react';
import { Camera, Loader2, Plus } from 'lucide-react';
import { db } from '../db';
import { useToast } from '../contexts/ToastContext';
import { clinicalAudio } from '../utils/clinicalAudio';

export interface DynamicPatientAvatarProps {
  photoUrl?: string | null;
  patientName?: string;
  bedId?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  acuity?: 'critical' | 'stable' | 'none';
  allowUpload?: boolean;
  onPhotoUploaded?: (newUrl: string) => void;
  className?: string;
  title?: string;
}

export const DynamicPatientAvatar: React.FC<DynamicPatientAvatarProps> = ({
  photoUrl,
  patientName = 'Patient',
  bedId,
  size = 'md',
  shape = 'rounded',
  acuity,
  allowUpload = false,
  onPhotoUploaded,
  className = '',
  title
}) => {
  const { showToast } = useToast();
  const [imgError, setImgError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Dimension presets
  const sizeClasses = {
    xs: 'w-6 h-6 text-[9px]',
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-11 h-11 text-xs',
    lg: 'w-14 h-14 text-sm',
    xl: 'w-20 h-20 text-base'
  };

  const roundedClasses = {
    circle: 'rounded-full',
    rounded: size === 'xs' ? 'rounded-md' : size === 'sm' ? 'rounded-lg' : size === 'xl' ? 'rounded-2xl' : 'rounded-xl'
  };

  // Generate clean 2-letter initials
  const getInitials = (name?: string) => {
    if (!name || name.trim() === '' || name.toLowerCase().includes('vacant')) return 'PT';
    const clean = name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Nurse)\s+/i, '').trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(patientName);

  // Deterministic aesthetic gradient background based on initials
  const getAvatarGradient = () => {
    if (acuity === 'critical') return 'bg-gradient-to-br from-rose-500 to-rose-700 text-white border-rose-300';
    if (acuity === 'stable') return 'bg-gradient-to-br from-amber-500 to-amber-700 text-white border-amber-300';

    const gradients = [
      'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-blue-300',
      'bg-gradient-to-br from-teal-600 to-emerald-700 text-white border-teal-300',
      'bg-gradient-to-br from-purple-600 to-indigo-800 text-white border-purple-300',
      'bg-gradient-to-br from-sky-600 to-blue-800 text-white border-sky-300',
      'bg-gradient-to-br from-slate-700 to-slate-900 text-white border-slate-400'
    ];
    const charCodeSum = initials.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return gradients[charCodeSum % gradients.length];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WebP).', 'error');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setImgError(false);

      if (bedId) {
        try {
          const currentBed = await db.beds.get(bedId);
          if (currentBed) {
            await db.beds.update(bedId, {
              patientSafety: {
                ...(currentBed.patientSafety || {
                  mrn: `MRN-${Math.floor(100000 + Math.random() * 900000)}`,
                  age: 45,
                  chiefComplaint: 'Observation',
                  triageLevel: 3,
                  admittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  fallRisk: false,
                  npo: false,
                  dnr: false,
                  isolation: 'none'
                }),
                photoUrl: dataUrl
              }
            });
          }
        } catch (err) {
          console.error('Error updating patient photo in Dexie:', err);
        }
      }

      clinicalAudio.playSuccessChime();
      showToast(`Clinical portrait updated for ${patientName}`, 'success');
      onPhotoUploaded?.(dataUrl);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allowUpload && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const hasValidPhoto = Boolean(photoUrl && !imgError && photoUrl.trim() !== '');

  return (
    <div className={`relative inline-block select-none shrink-0 ${className}`}>
      {allowUpload && (
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      )}

      {hasValidPhoto ? (
        <div 
          onClick={allowUpload ? triggerUpload : undefined}
          className={`relative overflow-hidden border border-slate-200 shadow-2xs ${sizeClasses[size]} ${roundedClasses[shape]} ${
            allowUpload ? 'cursor-pointer group hover:ring-2 hover:ring-blue-500' : ''
          }`}
          title={title || `${patientName}${allowUpload ? ' — Click to change photo' : ''}`}
        >
          <img 
            src={photoUrl!} 
            alt={patientName} 
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
          {allowUpload && (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              {isUploading ? (
                <Loader2 size={size === 'xs' || size === 'sm' ? 12 : 16} className="animate-spin text-white" />
              ) : (
                <Camera size={size === 'xs' || size === 'sm' ? 12 : 16} />
              )}
            </div>
          )}
        </div>
      ) : (
        /* INITIALS BADGE WITH OPTIONAL CAMERA HOVER */
        <div 
          onClick={allowUpload ? triggerUpload : undefined}
          className={`relative flex items-center justify-center font-bold tracking-wider font-mono shadow-2xs border ${
            getAvatarGradient()
          } ${sizeClasses[size]} ${roundedClasses[shape]} ${
            allowUpload ? 'cursor-pointer group hover:ring-2 hover:ring-blue-500' : ''
          }`}
          title={title || `${patientName}${allowUpload ? ' — Click (+) to upload photo' : ''}`}
        >
          {isUploading ? (
            <Loader2 size={size === 'xs' || size === 'sm' ? 12 : 16} className="animate-spin text-white" />
          ) : (
            <span>{initials}</span>
          )}

          {allowUpload && !isUploading && (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white rounded-inherit">
              {size === 'xl' || size === 'lg' ? (
                <div className="flex flex-col items-center">
                  <Plus size={size === 'xl' ? 20 : 16} className="animate-pulse" />
                  <span className="text-[8px] font-mono uppercase font-bold tracking-tight">Add Photo</span>
                </div>
              ) : (
                <Camera size={size === 'xs' || size === 'sm' ? 11 : 14} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
