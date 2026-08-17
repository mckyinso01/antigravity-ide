import React, { useState } from 'react';
import { 
  Settings, 
  Server, 
  Database, 
  Download, 
  Copy
} from 'lucide-react';

interface SettingsViewProps {
  warehouseName: string;
  onUpdateWarehouseName: (name: string) => void;
  onExportJson: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  warehouseName,
  onUpdateWarehouseName,
  onExportJson
}) => {
  const [nameInput, setNameInput] = useState(warehouseName);
  const [copied, setCopied] = useState(false);

  const dockerCommand = `docker run -d \\
  --name omnistock-wms \\
  -p 8080:80 \\
  -e CLUSTER_MODE=p2p_mesh \\
  -e DB_SYNC=indexeddb_local \\
  ghcr.io/omnistock-enterprise/core:v2.6.4`;

  const handleCopyDocker = () => {
    navigator.clipboard.writeText(dockerCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWarehouseName(nameInput);
    alert('✅ Warehouse facility metadata updated!');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#070B14] overflow-hidden font-sans">
      {/* Header */}
      <div className="h-14 border-b border-[#1E2D4D] bg-[#0D1527] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
            <Settings size={18} />
          </div>
          <div>
            <h2 className="font-mono font-bold text-sm text-white">Warehouse Facility & Cluster Settings</h2>
            <span className="text-[10px] text-slate-400 font-mono">On-Premise Deployment & Database Backup</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl font-mono text-xs">
        {/* Facility Details Form */}
        <div className="bg-[#0D1527] border border-[#1E2D4D] rounded-2xl p-6 space-y-4 shadow-xl">
          <span className="text-xs font-bold text-[#5BC0BE] block">FACILITY BLUEPRINT METADATA</span>
          <form onSubmit={handleSave} className="space-y-3.5">
            <div>
              <label className="text-slate-400 block mb-1">Facility Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-[#070B14] border border-[#1E2D4D] text-white p-2.5 rounded-xl font-bold"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Active Dock Gates</label>
                <input
                  type="text"
                  disabled
                  value="4 Inbound / 2 Outbound"
                  className="w-full bg-[#070B14] border border-[#1E2D4D] text-slate-400 p-2.5 rounded-xl"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Racking Aisles</label>
                <input
                  type="text"
                  disabled
                  value="Aisles A to F (192 Bins)"
                  className="w-full bg-[#070B14] border border-[#1E2D4D] text-slate-400 p-2.5 rounded-xl"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#5BC0BE] hover:bg-[#6FFFE9] text-[#070B14] font-bold px-4 py-2 rounded-xl transition-all cursor-pointer glow-mint"
            >
              Save Configuration
            </button>
          </form>
        </div>

        {/* Self-Host Docker Deployment */}
        <div className="bg-[#0D1527] border border-[#1E2D4D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
              <Server size={15} />
              SELF-HOSTED ON-PREMISE CONTAINER DEPLOYMENT
            </span>
            <button
              onClick={handleCopyDocker}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#121D36] hover:bg-[#1E2D4D] border border-[#2A4374] text-slate-200 rounded-lg text-[10px] transition-all cursor-pointer"
            >
              <Copy size={12} />
              <span>{copied ? 'Copied!' : 'Copy Docker Run'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E2D4D] text-slate-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
            <pre>{dockerCommand}</pre>
          </div>
        </div>

        {/* Database Export & Backup */}
        <div className="bg-[#0D1527] border border-[#1E2D4D] rounded-2xl p-6 space-y-3 shadow-xl">
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <Database size={15} />
            DATABASE SNAPSHOT & EXPORT
          </span>
          <p className="text-slate-300 font-sans text-xs">
            Export the complete state of all warehouse racking bins, SKUs, active pick orders, and 3PL client billing logs as a portable JSON snapshot.
          </p>

          <button
            onClick={onExportJson}
            className="flex items-center gap-1.5 bg-[#121D36] hover:bg-[#1E2D4D] border border-[#2A4374] text-slate-200 px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-xs"
          >
            <Download size={15} className="text-[#5BC0BE]" />
            <span>Download Database Snapshot (.JSON)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
