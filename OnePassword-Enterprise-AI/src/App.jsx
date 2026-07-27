import React, { useState, useEffect } from 'react';
import ZeroKnowledgeVaultConsole from './components/ZeroKnowledgeVaultConsole';
import SOC2ComplianceAuditor from './components/SOC2ComplianceAuditor';
import SecretLeakageScanner from './components/SecretLeakageScanner';
import SecurityAuditTrailLedger from './components/SecurityAuditTrailLedger';
import TelemetryErrorLogger from './components/TelemetryErrorLogger';
import ToastNotificationSystem from './components/ToastNotificationSystem';
import TransactionEvidenceModal from './components/TransactionEvidenceModal';
import PayloadDebuggerDrawer from './components/PayloadDebuggerDrawer';
import ExportReportWizardModal from './components/ExportReportWizardModal';
import GlobalCommandPaletteModal from './components/GlobalCommandPaletteModal';

export default function App() {
  const getInitialTabFromHash = () => {
    const hash = window.location.hash.replace('#/', '').toLowerCase();
    if (['vault', 'auditor', 'scanner', 'ledger'].includes(hash)) {
      return hash;
    }
    return 'vault';
  };

  const [activeTab, setActiveTab] = useState(getInitialTabFromHash);
  const [isRailCollapsed, setIsRailCollapsed] = useState(false);
  const [toasts, setToasts] = useState([]);
  
  // Modals and Drawers State
  const [inspectSecretItem, setInspectSecretItem] = useState(null);
  const [isDebuggerDrawerOpen, setIsDebuggerDrawerOpen] = useState(false);
  const [isExportWizardOpen, setIsExportWizardOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const showToast = (message, type = 'success', title = '1Password Alert') => {
    const newToast = {
      id: `toast_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      title,
      message,
      type
    };
    setToasts((prev) => [newToast, ...prev]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const handleDismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.location.hash = `/${tabId}`;
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').toLowerCase();
      if (['vault', 'auditor', 'scanner', 'ledger'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-screen min-h-screen bg-[#0D0F12] flex flex-col text-slate-100 selection:bg-[#145FE4] selection:text-white relative font-sans">
      
      {/* Top Telemetry Sentinel */}
      <TelemetryErrorLogger onReportError={(err) => showToast(err.message, 'error', 'Telemetry Error Intercepted')} />

      {/* Main Fluid Shell */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Navigation Rail */}
        <aside className={`bg-[#1B2A4A] border-r border-[#30363D] flex flex-col justify-between transition-all duration-200 ${isRailCollapsed ? 'w-20' : 'w-64'}`}>
          
          {/* Top Logo */}
          <div>
            <div className="p-6 border-b border-[#30363D] flex items-center justify-between">
              {!isRailCollapsed ? (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#145FE4] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20">
                    1P
                  </div>
                  <div>
                    <h1 className="font-black text-sm text-white tracking-tight">1Password®</h1>
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold block">v2.1.0 Platinum Edition</span>
                  </div>
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-[#145FE4] mx-auto flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20">
                  1P
                </div>
              )}
              <button 
                onClick={() => setIsRailCollapsed(!isRailCollapsed)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Toggle Sidebar Collapse"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRailCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                </svg>
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="p-4 space-y-1.5">
              <div className="text-[10px] font-extrabold text-[#145FE4] uppercase tracking-wider px-3 pb-1">1Password® Vault</div>
              {[
                { id: 'vault', label: 'Zero-Knowledge Vault', icon: '🛡️', desc: 'AES-256-GCM Web Crypto' },
                { id: 'auditor', label: 'SOC2 & ISO Auditor', icon: '📋', desc: '10-Point Security Scanner' },
                { id: 'scanner', label: 'Secret Exposure Scanner', icon: '🔍', desc: 'Sub-10ms Git & Env Regex' },
                { id: 'ledger', label: 'Security Audit Ledger', icon: '🔐', desc: 'Cryptographic SHA-256 Log' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group ${
                    activeTab === item.id 
                      ? 'bg-[#145FE4]/20 text-[#48CAE4] font-bold border border-[#145FE4]/40 shadow-sm' 
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-white font-medium'
                  }`}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  {!isRailCollapsed && (
                    <div className="overflow-hidden">
                      <div className="text-xs truncate">{item.label}</div>
                      <div className="text-[10px] text-slate-500 font-normal truncate">{item.desc}</div>
                    </div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[#30363D] space-y-2">
            <button
              onClick={() => setIsExportWizardOpen(true)}
              className="w-full py-2 bg-[#145FE4]/20 hover:bg-[#145FE4]/30 text-[#48CAE4] border border-[#145FE4]/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>📊 Export Audit Wizard</span>
            </button>
            {!isRailCollapsed && (
              <div className="text-[10px] text-center text-slate-500 font-mono pt-1">
                1Password Live: gatzdevs.surge.sh
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#0D0F12]">
          
          {/* Header Bar */}
          <header className="bg-[#1B2A4A] border-b border-[#30363D] px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="px-3.5 py-2 bg-[#0D0F12] text-slate-400 rounded-xl text-xs font-medium flex items-center gap-6 border border-[#30363D] hover:border-[#145FE4] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search 1Password vault secrets, SOC2 controls, audit logs...</span>
                </span>
                <kbd className="px-2 py-0.5 bg-[#1B2A4A] text-slate-400 border border-[#30363D] rounded text-[10px] font-mono">
                  Ctrl+K
                </kbd>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDebuggerDrawerOpen(true)}
                className="px-3 py-1.5 bg-[#0D0F12] border border-[#30363D] hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>🐞 Raw Payload Inspector</span>
              </button>

              <span className="px-3 py-1.5 bg-[#145FE4]/20 text-[#48CAE4] text-xs font-bold rounded-lg border border-[#145FE4]/40">
                🔌 Mode: Real DB Connection (0 Mock Data)
              </span>
            </div>
          </header>

          {/* Dynamic Active View Component */}
          <div className="p-8">
            {activeTab === 'vault' && (
              <ZeroKnowledgeVaultConsole onInspectSecret={(sec) => setInspectSecretItem(sec)} />
            )}

            {activeTab === 'auditor' && (
              <SOC2ComplianceAuditor />
            )}

            {activeTab === 'scanner' && (
              <SecretLeakageScanner />
            )}

            {activeTab === 'ledger' && (
              <SecurityAuditTrailLedger />
            )}
          </div>

        </main>
      </div>

      {/* Floating Modals, Drawers & Toast Notifications */}
      <ToastNotificationSystem toasts={toasts} onDismissToast={handleDismissToast} />

      <TransactionEvidenceModal
        item={inspectSecretItem}
        onClose={() => setInspectSecretItem(null)}
        onShowToast={showToast}
      />

      <PayloadDebuggerDrawer
        isOpen={isDebuggerDrawerOpen}
        onClose={() => setIsDebuggerDrawerOpen(false)}
      />

      <ExportReportWizardModal
        isOpen={isExportWizardOpen}
        onClose={() => setIsExportWizardOpen(false)}
        onShowToast={showToast}
      />

      <GlobalCommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleTabChange}
        onShowToast={showToast}
      />

    </div>
  );
}
