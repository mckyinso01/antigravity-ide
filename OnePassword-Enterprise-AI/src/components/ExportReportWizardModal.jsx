import React, { useState } from 'react';

export default function ExportReportWizardModal({ isOpen, onClose, onShowToast }) {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportTarget, setExportTarget] = useState('datadog');

  if (!isOpen) return null;

  const handleExecuteExport = () => {
    onClose();
    if (onShowToast) {
      onShowToast(`1Password Audit Report Exported as ${exportFormat.toUpperCase()} to ${exportTarget.toUpperCase()}!`, 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1B2A4A] border border-[#30363D] rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-scale-up">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0D0F12] border-b border-[#30363D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <h3 className="text-sm font-bold text-white">Multi-Format Compliance Export Wizard</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-sm font-bold">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs font-mono">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase mb-2">Select Export Report File Format</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'pdf', label: 'RSA PDF Summary', icon: '📄' },
                { id: 'json', label: 'Raw JSON Block', icon: '📦' },
                { id: 'cef', label: 'ArcSight CEF Log', icon: '🛡️' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setExportFormat(f.id)}
                  className={`p-3 rounded-xl border text-center font-bold transition-all ${
                    exportFormat === f.id
                      ? 'bg-[#145FE4]/20 text-[#48CAE4] border-[#145FE4]'
                      : 'bg-[#0D0F12] text-slate-400 border-[#30363D] hover:bg-slate-800'
                  }`}
                >
                  <div className="text-base mb-1">{f.icon}</div>
                  <div className="text-[11px]">{f.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase mb-2">Select SIEM / Log Aggregator Target</label>
            <select
              value={exportTarget}
              onChange={(e) => setExportTarget(e.target.value)}
              className="w-full p-3 bg-[#0D0F12] border border-[#30363D] rounded-xl text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#145FE4]"
            >
              <option value="datadog">Datadog Enterprise SIEM Log Pipeline</option>
              <option value="splunk">Splunk Enterprise Security Indexer</option>
              <option value="arcsight">HP ArcSight CEF Collector</option>
              <option value="local">Local Disk (.txt / .json Download)</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0D0F12] border-t border-[#30363D] flex items-center justify-between">
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold">
            Cancel
          </button>
          <button
            onClick={handleExecuteExport}
            className="px-5 py-2 bg-[#145FE4] hover:bg-[#2563EB] text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2"
          >
            <span>⚡ Execute Export Dispatch</span>
          </button>
        </div>

      </div>
    </div>
  );
}

