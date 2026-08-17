import React, { useState, useEffect } from 'react';
import { clusterClient } from '../services/clusterClient';

interface HospitalClusterStatusProps {
  onOpenHl7Console: () => void;
}

export const HospitalClusterStatus: React.FC<HospitalClusterStatusProps> = ({ onOpenHl7Console }) => {
  const [status, setStatus] = useState(clusterClient.getStatus());

  useEffect(() => {
    const unsubscribe = clusterClient.subscribe(() => {
      setStatus(clusterClient.getStatus());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <button
      onClick={onOpenHl7Console}
      className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900 text-slate-100 hover:bg-slate-800 border border-slate-700 shadow-sm transition-all cursor-pointer text-xs font-mono group"
      title="Open Enterprise Cluster & HL7 MLLP Gateway Console"
    >
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status.isConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${status.isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
        </span>
        <span className="font-bold text-slate-200 text-[11px] hidden sm:inline">
          {status.isConnected ? 'ENTERPRISE CLUSTER' : 'STANDALONE NODE'}
        </span>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold border-l border-slate-700 pl-2">
        <span className="text-emerald-400 font-mono">{status.latencyMs}ms</span>
        <span className="hidden md:inline">• {status.activeNodesCount} Active Terminals</span>
        <span className="text-blue-400 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-800 hidden lg:inline">
          HL7 MLLP
        </span>
      </div>
    </button>
  );
};
