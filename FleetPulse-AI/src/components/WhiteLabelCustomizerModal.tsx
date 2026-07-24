import React, { useState } from 'react';
import { X, Palette, Globe, CheckCircle2 } from 'lucide-react';

interface WhiteLabelCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhiteLabelCustomizerModal: React.FC<WhiteLabelCustomizerModalProps> = ({ isOpen, onClose }) => {
  const [agencyName, setAgencyName] = useState('Apex Freight Solutions');
  const [customDomain, setCustomDomain] = useState('telematics.apexfreight.com');
  const [brandColor, setBrandColor] = useState('#0D9488');
  const [isVerified, setIsVerified] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-6 animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Commercial License Model #2</span>
              <h3 className="text-lg font-extrabold text-slate-900">White-Label Agency Customizer ($1,499)</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-900 mb-1">Agency / Client Brand Name:</label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-900 mb-1">Custom CNAME Domain DNS Target:</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button
                onClick={() => setIsVerified(true)}
                className="btn-spring px-4 py-2.5 bg-slate-900 text-white font-bold rounded-xl shrink-0"
              >
                Validate DNS
              </button>
            </div>
            {isVerified && (
              <p className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CNAME Record points to `cname.fleetpulse-ai.io` (SSL Valid)</span>
              </p>
            )}
          </div>

          <div>
            <label className="block font-bold text-slate-900 mb-1">Primary Brand Accent Color:</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300"
              />
              <span className="font-mono font-bold text-slate-700">{brandColor}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => alert(`White-Label Agency Profile Saved! Re-branding applied to ${customDomain}`)}
          className="btn-spring w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md"
        >
          Save & Deploy White-Label Portal
        </button>

      </div>
    </div>
  );
};
