import React from 'react';
import { X, Code, Download, Key, ShieldCheck } from 'lucide-react';

interface SourceCodeLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourceCodeLicenseModal: React.FC<SourceCodeLicenseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-6 animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Commercial License Model #3</span>
              <h3 className="text-lg font-extrabold text-slate-900">Perpetual Source Code & Full IP Buyout ($6,999)</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
            <span>Private Repository SSH Deploy Key</span>
            <span className="text-emerald-400 font-bold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified IP Transfer</span>
            </span>
          </div>
          <p className="text-indigo-300 font-semibold break-all">git clone git@github.com:enterprise-buyout/fleetpulse-ai-full-source.git</p>
        </div>

        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-slate-900">What is included in the $6,999 Source Code Buyout:</h4>
          <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
            <li>100% Unrestricted IP Ownership & Copyright Assignment</li>
            <li>Full React + TypeScript + Vite + Tailwind CSS Source Files</li>
            <li>PostgreSQL & SQLite Schema Migrations & OpenAPI 3.1 REST Specs</li>
            <li>Production `docker-compose.yml` and Kubernetes Helm chart configs</li>
          </ul>
        </div>

        <button
          onClick={() => alert("Downloading FleetPulse-AI Full Source Code Bundle (ZIP + Git SSH Key)...")}
          className="btn-spring w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download Full Source Code Archive & IP Certificate</span>
        </button>

      </div>
    </div>
  );
};
