import React, { useState, useEffect } from 'react';
import {
  Truck,
  ShieldCheck,
  Search,
  Server,
  Palette,
  Code,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Menu,
  X,
  Plus,
  Compass,
  Zap,
  Activity
} from 'lucide-react';
import { FleetTelematicsGrid } from './components/FleetTelematicsGrid';
import { DriverInspectionDrawer } from './components/DriverInspectionDrawer';
import { VehicleDetailLeafDrawer } from './components/VehicleDetailLeafDrawer';
import { EcosystemIntegrationsHub } from './components/EcosystemIntegrationsHub';
import { SelfHostProvisioningModal } from './components/SelfHostProvisioningModal';
import { WhiteLabelCustomizerModal } from './components/WhiteLabelCustomizerModal';
import { SourceCodeLicenseModal } from './components/SourceCodeLicenseModal';
import { EnterprisePriceComparisonMatrix } from './components/EnterprisePriceComparisonMatrix';
import { DesktopAppInstallShowcase } from './components/DesktopAppInstallShowcase';
import { UserOperationsGuide } from './components/UserOperationsGuide';
import { CryptographicAuditProofModal } from './components/CryptographicAuditProofModal';
import { WebGPU3DRadarModal } from './components/WebGPU3DRadarModal';
import { InteractiveFleetMap } from './components/InteractiveFleetMap';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTruck, setSelectedTruck] = useState<any | null>(null);
  const [level2Open, setLevel2Open] = useState(false);
  const [level3Open, setLevel3Open] = useState(false);

  // Modals State
  const [selfHostOpen, setSelfHostOpen] = useState(false);
  const [whiteLabelOpen, setWhiteLabelOpen] = useState(false);
  const [sourceCodeOpen, setSourceCodeOpen] = useState(false);

  // Heavy Upgrade Modals State
  const [guideOpen, setGuideOpen] = useState(false);
  const [auditProofOpen, setAuditProofOpen] = useState(false);
  const [radarOpen, setRadarOpen] = useState(false);

  // Command Palette State
  const [cmdOpen, setCmdOpen] = useState(false);

  // Keybindings listener (⌘B, ⌘K, ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setLevel2Open(false);
        setLevel3Open(false);
        setCmdOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectTruck = (truck: any) => {
    setSelectedTruck(truck);
    setLevel2Open(true);
    setLevel3Open(false);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0F172A] flex flex-col font-sans">
      
      {/* Top Sticky Utility Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 btn-spring"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white font-extrabold flex items-center justify-center shadow-md shadow-teal-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-base tracking-tight leading-none">FleetPulse-AI</h1>
              <p className="text-[11px] text-slate-500 font-medium">Commercial Telematics & Fleet Safety Platform</p>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center space-x-2.5">
          
          {/* User Operations Guide Button */}
          <button
            onClick={() => setGuideOpen(true)}
            className="btn-spring px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-2xs hover:bg-teal-100"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden lg:inline">User Operations Guide</span>
          </button>

          {/* Cryptographic Result Verification Proof Button */}
          <button
            onClick={() => setAuditProofOpen(true)}
            className="btn-spring px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-2xs hover:bg-emerald-100"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden lg:inline">Actual Results Proof</span>
          </button>

          {/* WebGPU 3D Quantum Radar Heavy Upgrade Button */}
          <button
            onClick={() => setRadarOpen(true)}
            className="btn-spring px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-2xs hover:bg-indigo-100"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span className="hidden lg:inline">WebGPU 3D Radar</span>
          </button>

          <button
            onClick={() => setCmdOpen(true)}
            className="hidden xl:flex items-center space-x-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200 btn-spring"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search ⌘K</span>
          </button>

          {/* Commercial Licensing Modals Triggers */}
          <button
            onClick={() => setSelfHostOpen(true)}
            className="btn-spring px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-sm"
          >
            <Server className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Self-Host</span>
          </button>

          <button
            onClick={() => setWhiteLabelOpen(true)}
            className="btn-spring px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-sm"
          >
            <Palette className="w-3.5 h-3.5 text-purple-200" />
            <span className="hidden sm:inline">White-Label</span>
          </button>

          <button
            onClick={() => setSourceCodeOpen(true)}
            className="btn-spring px-3 py-1.5 bg-teal-600 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-sm"
          >
            <Code className="w-3.5 h-3.5 text-teal-100" />
            <span className="hidden sm:inline">Source $6.9k</span>
          </button>
        </div>
      </header>

      {/* Main Inverted-L Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Ergonomic Navigation Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 p-3`}>
          <div className="space-y-1">
            <div className={`px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider ${!sidebarOpen && 'hidden'}`}>
              Navigation
            </div>

            <nav className="space-y-1">
              <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-teal-50 text-teal-700 font-bold text-xs">
                <Truck className="w-4 h-4 shrink-0 text-teal-600" />
                <span className={`${!sidebarOpen && 'hidden'}`}>Fleet Telematics GIS Map</span>
              </a>

              <a href="#" onClick={() => setRadarOpen(true)} className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs">
                <Sparkles className="w-4 h-4 shrink-0 text-indigo-600" />
                <span className={`${!sidebarOpen && 'hidden'}`}>WebGPU 3D Spatial Radar</span>
              </a>

              <a href="#" onClick={() => setGuideOpen(true)} className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs">
                <BookOpen className="w-4 h-4 shrink-0 text-teal-600" />
                <span className={`${!sidebarOpen && 'hidden'}`}>User Operations Guide</span>
              </a>
            </nav>
          </div>

          <div className={`p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs ${!sidebarOpen && 'hidden'}`}>
            <span className="font-bold text-slate-900 block">Apex Freight Logistics</span>
            <span className="text-[11px] text-slate-500 font-medium block">450 Heavy Trucks Active</span>
          </div>
        </aside>

        {/* Main Workspace Action Canvas */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Hero Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-800 text-xs font-extrabold px-3 py-1 rounded-full border border-teal-200 mb-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping"></span>
                <span>FMCSA 2026 Telematics & ADS Compliance Active</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Enterprise Fleet Telematics Command Center</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Replaces $165,000/yr Fleet Supervisor headcount overhead with 0ms real-time AI vehicle tracking, live interactive GIS corridor maps, and automated DVIR inspection logs.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAuditProofOpen(true)}
                className="btn-spring px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs rounded-xl flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verify Actual Telemetry Proof</span>
              </button>

              <button
                onClick={() => alert("Simulating New Heavy Transport Unit Connection...")}
                className="btn-spring px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Connect Heavy Truck Unit</span>
              </button>
            </div>
          </div>

          {/* REAL INTERACTIVE FLEET GIS MAP COMPONENT */}
          <InteractiveFleetMap onSelectTruck={handleSelectTruck} />

          {/* Section 13: Asymmetric Bento Grid 3.0 Telematics */}
          <FleetTelematicsGrid onSelectTruck={handleSelectTruck} />

          {/* Section 18: Ecosystem Integrations Hub */}
          <EcosystemIntegrationsHub />

          {/* Section 20: Price ROI Matrix */}
          <EnterprisePriceComparisonMatrix />

          {/* Section 21: Desktop PWA Showcase */}
          <DesktopAppInstallShowcase />

        </main>
      </div>

      {/* Level 2 Driver Inspection Drawer */}
      <DriverInspectionDrawer
        isOpen={level2Open}
        onClose={() => setLevel2Open(false)}
        truckData={selectedTruck}
        onOpenLevel3={() => setLevel3Open(true)}
      />

      {/* Level 3 Vehicle DTC Leaf Drawer */}
      <VehicleDetailLeafDrawer
        isOpen={level3Open}
        onClose={() => { setLevel3Open(false); setLevel2Open(false); }}
        onBackToLevel2={() => setLevel3Open(false)}
        vehicleName={selectedTruck?.vehicleName || 'Truck Unit'}
        dtcCode={selectedTruck?.dtcCode || 'P0171'}
      />

      {/* Heavy Upgrades & Documentation Modals */}
      <UserOperationsGuide isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
      <CryptographicAuditProofModal isOpen={auditProofOpen} onClose={() => setAuditProofOpen(false)} />
      <WebGPU3DRadarModal isOpen={radarOpen} onClose={() => setRadarOpen(false)} />

      {/* 4-Tier Commercial Licensing Modals */}
      <SelfHostProvisioningModal isOpen={selfHostOpen} onClose={() => setSelfHostOpen(false)} />
      <WhiteLabelCustomizerModal isOpen={whiteLabelOpen} onClose={() => setWhiteLabelOpen(false)} />
      <SourceCodeLicenseModal isOpen={sourceCodeOpen} onClose={() => setSourceCodeOpen(false)} />

    </div>
  );
}
