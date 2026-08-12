import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  BedDouble, 
  ClipboardList, 
  Settings, 
  ShieldAlert, 
  Menu,
  Stethoscope,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useEmergency } from './contexts/EmergencyContext';
import { Login } from './pages/Login';
import { CommandCenter } from './pages/CommandCenter';
import { BedManagement } from './pages/BedManagement';
import { EVSApp } from './pages/EVSApp';
import { AlertsApp } from './pages/AlertsApp';
import { NotFound } from './pages/NotFound';
import { SystemSpecsModal } from './components/SystemSpecsModal';
import { SettingsPanel } from './components/SettingsPanel';

const LicensingBar = ({ onOpenSpecs }: { onOpenSpecs: () => void }) => (
  <div className="fixed bottom-0 left-0 w-full bg-pristine-bg border-t border-pristine-cardBorder z-50 px-4 py-2 flex items-center justify-between text-xs text-pristine-textMuted">
    <div className="flex items-center space-x-2">
      <Terminal size={14} className="text-pristine-accent" />
      <span className="font-mono font-bold tracking-widest text-pristine-text">CLINICAL PRISTINE OS</span>
      <span>|</span>
      <span>v1.0.0-zero-defect</span>
    </div>
    <div className="flex space-x-6">
      <button className="hover:text-pristine-accent transition-colors">SOFTWARE FACTORY</button>
      <button className="hover:text-pristine-accent transition-colors">Self-Host ($4,999)</button>
      <button className="hover:text-pristine-accent transition-colors">White-Label</button>
      <button className="hover:text-pristine-accent transition-colors">Hosted Cloud SaaS ($299/mo)</button>
      <button onClick={onOpenSpecs} className="hover:text-pristine-accent transition-colors">📋 System Specs</button>
    </div>
  </div>
);

const Sidebar = ({ isCollapsed, toggle, onOpenSettings }: { isCollapsed: boolean, toggle: () => void, onOpenSettings: () => void }) => {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: <Activity size={20} />, label: 'Command Center' },
    { path: '/beds', icon: <BedDouble size={20} />, label: 'Bed Management' },
    { path: '/evs', icon: <ClipboardList size={20} />, label: 'EVS Field App' },
    { path: '/alerts', icon: <ShieldAlert size={20} />, label: 'Security & Alerts' },
  ];

  const { isCodeBlue } = useEmergency();
  
  return (
    <motion.div 
      animate={{ width: isCollapsed ? 70 : 250 }}
      className={`h-full backdrop-blur-xl border-r flex flex-col transition-all duration-300 ${isCodeBlue ? 'bg-rose-950/40 border-rose-900' : 'bg-pristine-card/90 border-pristine-cardBorder'}`}
    >
      <div className="p-4 flex items-center justify-between border-b border-pristine-cardBorder">
        {!isCollapsed && (
          <div className="flex items-center space-x-2 text-pristine-accent">
            <Stethoscope size={24} className={isCodeBlue ? 'text-rose-500' : ''} />
            <span className={`font-bold text-lg ${isCodeBlue ? 'text-rose-100' : 'text-pristine-text'}`}>Pristine OS</span>
          </div>
        )}
        <button onClick={toggle} className="p-2 hover:bg-white/5 rounded-lg text-pristine-textMuted hover:text-white transition-colors">
          <Menu size={20} />
        </button>
      </div>

      <div className="flex-1 py-4 flex flex-col gap-2 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                isActive 
                  ? (isCodeBlue ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(225,29,72,0.2)]' : 'bg-pristine-accent/10 text-pristine-accent border border-pristine-accent/20') 
                  : (isCodeBlue ? 'text-rose-200/50 hover:bg-rose-500/10 hover:text-rose-200 border border-transparent' : 'text-pristine-textMuted hover:bg-white/5 hover:text-pristine-text border border-transparent')
              }`}
            >
              {item.icon}
              {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      <div className={`p-4 border-t ${isCodeBlue ? 'border-rose-900' : 'border-pristine-cardBorder'}`}>
        <button onClick={onOpenSettings} className="flex items-center space-x-3 text-pristine-textMuted hover:text-white transition-colors w-full p-2">
          <Settings size={20} />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </motion.div>
  );
};

function App() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const { isCodeBlue } = useEmergency();

  return (
    <div className={`w-screen h-screen overflow-hidden flex font-sans pb-[40px] transition-colors duration-500 ${isCodeBlue ? 'bg-[#1a0505]' : 'bg-[#050811]'}`}>
      {!isLoginPage && <Sidebar isCollapsed={isSidebarCollapsed} toggle={() => setSidebarCollapsed(!isSidebarCollapsed)} onOpenSettings={() => setIsSettingsOpen(true)} />}
      
      <main className="flex-1 relative h-full overflow-hidden flex flex-col">
        <AnimatePresence>
          {isCodeBlue && !isLoginPage && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-rose-600 text-white px-4 py-2 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.4)] z-40 shrink-0"
            >
              <ShieldAlert size={18} className="animate-pulse" />
              <span className="font-bold tracking-widest text-sm">CODE BLUE: GLOBAL OVERRIDE ACTIVE</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex-1 relative overflow-hidden">
          <ErrorBoundary>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<CommandCenter />} />
            <Route path="/beds" element={<BedManagement />} />
            <Route path="/evs" element={<EVSApp />} />
            <Route path="/alerts" element={<AlertsApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
        </div>
      </main>

      <LicensingBar onOpenSpecs={() => setIsSpecsOpen(true)} />
      <SystemSpecsModal isOpen={isSpecsOpen} onClose={() => setIsSpecsOpen(false)} />
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default App;
