import React, { useState } from 'react';
import { Network, CheckCircle, RefreshCw, Key, ShieldCheck } from 'lucide-react';

export const EcosystemIntegrationsHub: React.FC = () => {
  const [connectors, setConnectors] = useState([
    { id: 'samsara', name: 'Samsara 2026 Telematics API', category: 'GPS & Telematics', status: 'connected', latency: '0.4ms' },
    { id: 'geotab', name: 'Geotab GO Focus Pro Engine', category: 'Engine Diagnostics', status: 'connected', latency: '0.6ms' },
    { id: 'fmcsa', name: 'FMCSA DOT Electronic Logging Vault', category: 'Regulatory Audit', status: 'connected', latency: '1.2ms' },
    { id: 'slack', name: 'Slack Enterprise Safety Alerts', category: 'Incident Dispatch', status: 'connected', latency: '0.3ms' },
    { id: 'quickbooks', name: 'QuickBooks Fuel & Maintenance Ledger', category: 'Financial Sync', status: 'connected', latency: '0.9ms' }
  ]);

  const [isSyncing, setIsSyncing] = useState(false);

  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="theme-glacial-frost p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-teal-600 uppercase tracking-wider">
            <Network className="w-4 h-4" />
            <span>Section 18 Ecosystem Integrations Hub</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">5 Enterprise Telematics Connectors</h3>
        </div>

        <button
          onClick={triggerSync}
          disabled={isSyncing}
          className="btn-spring px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm hover:bg-slate-800"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing Connectors...' : 'Sync All Telemetry'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
        {connectors.map(c => (
          <div key={c.id} className="p-3.5 bg-white border border-slate-200/80 rounded-xl space-y-2 hover:border-teal-400 transition-colors shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">{c.category}</span>
              <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span>{c.latency}</span>
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-xs">{c.name}</h4>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>AES-256 Encrypted</span>
              </span>
              <span className="font-semibold text-teal-700 cursor-pointer hover:underline">Config ➔</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
