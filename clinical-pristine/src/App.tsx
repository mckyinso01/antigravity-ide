import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Map, 
  Contact2, 
  Users2, 
  AlertTriangle, 
  FileBarChart, 
  Settings, 
  Terminal,
  FileCode2,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useEmergency } from './contexts/EmergencyContext';
import { Login } from './pages/Login';
import { CommandCenter } from './pages/CommandCenter';
import { DashboardView } from './pages/DashboardView';
import { BedManagement } from './pages/BedManagement';
import { EVSApp } from './pages/EVSApp';
import { AlertsApp } from './pages/AlertsApp';
import { ReportsApp } from './pages/ReportsApp';
import { NotFound } from './pages/NotFound';
import { SystemSpecsModal } from './components/SystemSpecsModal';
import { SettingsPanel } from './components/SettingsPanel';
import { ProductionCleanSweepModal } from './components/ProductionCleanSweepModal';
import { HospitalClusterStatus } from './components/HospitalClusterStatus';
import { Hl7InterfaceConsoleModal } from './components/Hl7InterfaceConsoleModal';
import { UniversalEhrMigrationModal } from './components/UniversalEhrMigrationModal';
import { HipaaInactivityLock } from './components/HipaaInactivityLock';
import { initClinicalVisitorBeacon } from './utils/visitorEmailBeacon';
import { useUrlProspectSession } from './hooks/useUrlTabNavigation';
import { ExitSurveyModal } from './components/ExitSurveyModal';
import { SmartTooltip } from './components/SmartTooltip';
import { TrialStatusHeaderBadge } from './components/TrialStatusHeaderBadge';
import { TrialExpiryCoDesignModal } from './components/TrialExpiryCoDesignModal';
import { useEnterpriseTrial } from './hooks/useEnterpriseTrial';
import { codeIntegrityGuardian } from './utils/codeIntegrityGuardian';

const LicensingBar = ({ 
  onOpenSpecs, 
  onOpenCleanSweep,
  onOpenHl7Console,
  onOpenEhrMigration,
  onOpenExitSurvey,
  daysRemaining,
  isUnlockedPerpetual,
  onOpenCoDesignModal
}: { 
  onOpenSpecs: () => void; 
  onOpenCleanSweep: () => void; 
  onOpenHl7Console: () => void;
  onOpenEhrMigration: () => void;
  onOpenExitSurvey?: () => void;
  daysRemaining: number;
  isUnlockedPerpetual: boolean;
  onOpenCoDesignModal: () => void;
}) => {
  const isProduction = localStorage.getItem('clinical_pristine_production_mode') === 'true';
  const hospitalName = localStorage.getItem('clinical_pristine_hospital_name') || 'Pristine General Hospital';

  return (
    <div className="fixed bottom-1.5 left-2.5 right-2.5 rounded-xl bg-white border border-slate-300 z-50 px-3 md:px-4 py-1.5 flex items-center justify-between text-xs text-slate-600 font-sans shadow-2xs overflow-x-auto gap-3">
      <div className="flex items-center space-x-2.5 shrink-0">
        <Terminal size={14} className="text-blue-700 font-bold" />
        <span className="font-bold tracking-wide text-slate-900 hidden sm:inline">CLINICAL PRISTINE OS</span>
        <span className="text-slate-300 hidden sm:inline">|</span>
        {isProduction ? (
          <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
            🟢 PRODUCTION: {hospitalName}
          </span>
        ) : (
          <span className="font-medium text-slate-600 hidden md:inline">v1.0.0-hospital-workstation</span>
        )}

        {/* 7-Day Product-Led Reverse Trial Status Pill */}
        <TrialStatusHeaderBadge
          daysRemaining={daysRemaining}
          isUnlockedPerpetual={isUnlockedPerpetual}
          onOpenCoDesignModal={onOpenCoDesignModal}
        />

        {/* Live Enterprise Cluster Status & HL7 Gateway Telemetry */}
        <HospitalClusterStatus onOpenHl7Console={onOpenHl7Console} />
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-semibold text-slate-700 shrink-0">
        {/* 1-Click Universal EHR Legacy Migration Engine Trigger */}
        <SmartTooltip
          title="1-Click EHR Migration"
          content="Ingest inpatient rosters, bed assignments, and vitals from Epic Systems, Cerner Millennium, Meditech, or FHIR JSON in under 3 seconds."
        >
          <button 
            onClick={onOpenEhrMigration}
            className="hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-700 bg-gradient-to-r from-cyan-500 to-blue-600 text-[#070B14] hover:text-white font-bold flex items-center gap-1.5 cursor-pointer px-3 py-1 rounded-md shadow-sm transition-all shrink-0 font-mono"
          >
            <span>🔄 1-Click EHR Migration</span>
          </button>
        </SmartTooltip>

        <SmartTooltip
          title="HL7 / FHIR MLLP Stream"
          content="Inspect real-time ADT-A01 hospital admission feeds and HL7 v2.5.1 ER7 socket transactions on TCP Port 8089."
        >
          <button 
            onClick={onOpenHl7Console}
            className="hover:text-blue-700 text-slate-900 font-bold flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-300 shadow-2xs transition-all shrink-0"
          >
            <Server size={13} className="text-blue-700" />
            <span>HL7/FHIR Gateway</span>
          </button>
        </SmartTooltip>

        <SmartTooltip
          title="Factory Clean Sweep"
          content="Reset patient telemetry and beds to clean production hospital state for fresh clinical staff onboarding."
        >
          <button 
            onClick={onOpenCleanSweep}
            className="hover:bg-rose-100 text-rose-700 font-bold flex items-center gap-1 cursor-pointer bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-300 shadow-2xs transition-all shrink-0"
          >
            <span>🧹 Clean Sweep</span>
          </button>
        </SmartTooltip>

        <SmartTooltip
          title="System Architecture & Buyout"
          content="View sub-15ms spatial workstation specifications, 100% on-premises Docker bundle, and perpetual licensing buyout tiers."
        >
          <button onClick={onOpenSpecs} className="hover:text-blue-700 transition-colors font-bold text-slate-900 flex items-center gap-1.5 cursor-pointer bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-300 shadow-2xs hover:border-slate-400 shrink-0">
            <FileCode2 size={13} className="text-blue-700" /> <span className="hidden sm:inline">System</span> Specs
          </button>
        </SmartTooltip>

        {onOpenExitSurvey && (
          <SmartTooltip
            title="Leave Clinical Feedback"
            content="Share your 1-minute clinical review or request custom hospital modifications from Founder Mharc Gatan."
          >
            <button 
              onClick={onOpenExitSurvey} 
              className="hover:bg-blue-600 hover:text-white transition-all font-bold text-blue-700 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-300 shadow-2xs shrink-0"
            >
              <span>✨ Exit Demo</span>
            </button>
          </SmartTooltip>
        )}
      </div>
    </div>
  );
};

const Sidebar = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
  const location = useLocation();
  const navItems = [
    { path: '/dashboard', icon: <LayoutGrid size={18} />, label: 'Dashboard' },
    { path: '/', icon: <Map size={18} />, label: 'Hospital Map' },
    { path: '/beds', icon: <Contact2 size={18} />, label: 'Patient Directory' },
    { path: '/evs', icon: <Users2 size={18} />, label: 'Staffing' },
    { path: '/alerts', icon: <AlertTriangle size={18} />, label: 'Alerts' },
    { path: '/reports', icon: <FileBarChart size={18} />, label: 'Reports' },
  ];

  return (
    <aside className="w-16 md:w-56 bg-white border-r border-slate-300 flex flex-col justify-between p-3 font-sans shrink-0 z-30 shadow-xs">
      <div className="space-y-6">
        <div className="flex items-center space-x-3 px-2 py-1">
          <div className="w-8 h-8 rounded-xl bg-blue-600 border border-blue-700 flex items-center justify-center text-white font-black text-base shadow-xs shrink-0">
            +
          </div>
          <div className="hidden md:block">
            <span className="font-bold text-sm text-slate-950 block leading-tight">Pristine OS</span>
            <span className="text-[10px] text-slate-500 font-mono font-bold block">Hospital Workstation</span>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs font-black'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950 border border-transparent'
                }`}
              >
                <div className={`shrink-0 ${isActive ? 'text-blue-700' : 'text-slate-500'}`}>
                  {item.icon}
                </div>
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2 border-t border-slate-200 pt-3">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
        >
          <Settings size={18} className="text-slate-700 shrink-0" />
          <span className="hidden md:inline">Settings</span>
        </button>
      </div>
    </aside>
  );
};

function App() {
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCleanSweepOpen, setIsCleanSweepOpen] = useState(false);
  const [isHl7ConsoleOpen, setIsHl7ConsoleOpen] = useState(false);
  const [isEhrMigrationOpen, setIsEhrMigrationOpen] = useState(false);
  const [isExitSurveyOpen, setIsExitSurveyOpen] = useState(false);
  const [isCoDesignOpen, setIsCoDesignOpen] = useState(false);

  const { daysRemaining, isExpired, isUnlockedPerpetual, requestExtension } = useEnterpriseTrial();
  const prospectSession = useUrlProspectSession('hospital');
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const { isCodeBlue } = useEmergency();

  // 0. Initialize Anti-Tamper Code Integrity Guardian
  useEffect(() => {
    codeIntegrityGuardian.initialize();
  }, []);

  // Auto-prompt Co-Design & Buyout Review if trial expired
  useEffect(() => {
    if (isExpired && !sessionStorage.getItem('cp_trial_expired_prompted')) {
      setIsCoDesignOpen(true);
      sessionStorage.setItem('cp_trial_expired_prompted', 'true');
    }
  }, [isExpired]);

  // 1. Exit-Intent Mouseleave Trigger
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !sessionStorage.getItem('clinical_survey_shown')) {
        setIsExitSurveyOpen(true);
        sessionStorage.setItem('clinical_survey_shown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // 2. Modal Browser Back-Button Trapping
  useEffect(() => {
    const isAnyModalOpen = Boolean(isSpecsOpen || isSettingsOpen || isCleanSweepOpen || isHl7ConsoleOpen || isEhrMigrationOpen || isExitSurveyOpen || isCoDesignOpen);
    if (isAnyModalOpen) {
      window.history.pushState({ modalOpen: true }, '');
      const handleModalPop = () => {
        setIsSpecsOpen(false);
        setIsSettingsOpen(false);
        setIsCleanSweepOpen(false);
        setIsHl7ConsoleOpen(false);
        setIsEhrMigrationOpen(false);
        setIsExitSurveyOpen(false);
        setIsCoDesignOpen(false);
      };
      window.addEventListener('popstate', handleModalPop, { once: true });
      return () => window.removeEventListener('popstate', handleModalPop);
    }
  }, [isSpecsOpen, isSettingsOpen, isCleanSweepOpen, isHl7ConsoleOpen, isEhrMigrationOpen, isExitSurveyOpen, isCoDesignOpen]);

  useEffect(() => {
    initClinicalVisitorBeacon('Clinical Pristine OS');
  }, []);

  return (
    <div className={`w-screen h-screen overflow-hidden flex flex-col font-sans pb-[38px] transition-colors duration-300 ${isCodeBlue ? 'bg-rose-100' : 'bg-[#F4F5F7]'}`}>
      <div className="flex-1 flex overflow-hidden w-full h-full">
        {!isLoginPage && <Sidebar onOpenSettings={() => setIsSettingsOpen(true)} />}
        
        <main className="flex-1 relative h-full flex flex-col overflow-hidden bg-[#F4F5F7]">
          <AnimatePresence>
            {isCodeBlue && !isLoginPage && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-rose-600 text-white px-4 py-2 flex items-center justify-center gap-2 shadow-md z-40 shrink-0 font-mono text-xs font-bold border-b-2 border-rose-800"
              >
                <span>CODE BLUE: GLOBAL RESUSCITATION OVERRIDE ACTIVE</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex-1 relative overflow-hidden flex flex-col">
            <ErrorBoundary>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<CommandCenter />} />
                <Route path="/dashboard" element={<DashboardView />} />
                <Route path="/beds" element={<BedManagement />} />
                <Route path="/evs" element={<EVSApp />} />
                <Route path="/alerts" element={<AlertsApp />} />
                <Route path="/reports" element={<ReportsApp />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </div>
        </main>
      </div>

      <LicensingBar 
        onOpenSpecs={() => setIsSpecsOpen(true)} 
        onOpenCleanSweep={() => setIsCleanSweepOpen(true)}
        onOpenHl7Console={() => setIsHl7ConsoleOpen(true)}
        onOpenEhrMigration={() => setIsEhrMigrationOpen(true)}
        onOpenExitSurvey={() => setIsExitSurveyOpen(true)}
        daysRemaining={daysRemaining}
        isUnlockedPerpetual={isUnlockedPerpetual}
        onOpenCoDesignModal={() => setIsCoDesignOpen(true)}
      />
      
      <SystemSpecsModal isOpen={isSpecsOpen} onClose={() => setIsSpecsOpen(false)} />
      
      {/* 7-Day Product-Led Reverse Trial Expiry & Co-Design Modal */}
      <TrialExpiryCoDesignModal
        isOpen={isCoDesignOpen}
        onClose={() => setIsCoDesignOpen(false)}
        daysRemaining={daysRemaining}
        isExpired={isExpired}
        onRequestExtension={requestExtension}
        onOpenLicensingModal={() => setIsSpecsOpen(true)}
      />

      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onOpenCleanSweep={() => setIsCleanSweepOpen(true)}
      />
      <ProductionCleanSweepModal 
        isOpen={isCleanSweepOpen}
        onClose={() => setIsCleanSweepOpen(false)}
        onSuccess={() => {
          setTimeout(() => {
            window.location.reload();
          }, 300);
        }}
      />
      
      {/* Universal Legacy EHR / EMR 1-Click Migration Engine Modal */}
      <UniversalEhrMigrationModal
        isOpen={isEhrMigrationOpen}
        onClose={() => setIsEhrMigrationOpen(false)}
      />

      {/* Enterprise Epic & Cerner HL7 v2.5.1 / FHIR Ingestion Gateway Console */}
      <Hl7InterfaceConsoleModal
        isOpen={isHl7ConsoleOpen}
        onClose={() => setIsHl7ConsoleOpen(false)}
      />

      {/* Automatic 5-Minute Inactivity Screen Privacy Shield */}
      <HipaaInactivityLock timeoutSeconds={300} />

      {/* 📋 Exit-Intent & Walkthrough Micro-Survey Modal */}
      <ExitSurveyModal
        isOpen={isExitSurveyOpen}
        onClose={() => setIsExitSurveyOpen(false)}
        prospectSession={prospectSession}
        appName="Clinical Pristine OS"
      />
    </div>
  );
}

export default App;
