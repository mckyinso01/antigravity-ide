import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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
  Activity,
  DollarSign,
  Navigation,
  ChevronUp,
  ChevronDown,
  PhoneCall,
  AlertTriangle,
  FileText,
  Wrench,
  Settings
} from 'lucide-react';
import { DriverInspectionDrawer } from './DriverInspectionDrawer';
import { VehicleDetailLeafDrawer } from './VehicleDetailLeafDrawer';
import { EcosystemIntegrationsHub } from './EcosystemIntegrationsHub';
import { SelfHostProvisioningModal } from './SelfHostProvisioningModal';
import { WhiteLabelCustomizerModal } from './WhiteLabelCustomizerModal';
import { SourceCodeLicenseModal } from './SourceCodeLicenseModal';
import { UserOperationsGuide } from './UserOperationsGuide';
import { CryptographicAuditProofModal } from './CryptographicAuditProofModal';
import { WebGPU3DRadarModal } from './WebGPU3DRadarModal';

export const GrabDriverStyleLayout: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Bottom Sheet State ('collapsed' | 'peek' | 'expanded')
  const [bottomSheetState, setBottomSheetState] = useState<'collapsed' | 'peek' | 'expanded'>('peek');
  const [selectedTruck, setSelectedTruck] = useState<any | null>(null);

  // Level 2 & 3 Drawers State
  const [level2Open, setLevel2Open] = useState(false);
  const [level3Open, setLevel3Open] = useState(false);

  // Modals State
  const [selfHostOpen, setSelfHostOpen] = useState(false);
  const [whiteLabelOpen, setWhiteLabelOpen] = useState(false);
  const [sourceCodeOpen, setSourceCodeOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [auditProofOpen, setAuditProofOpen] = useState(false);
  const [radarOpen, setRadarOpen] = useState(false);

  const trucks = [
    {
      id: 'TRK-901',
      vehicleName: 'Freightliner Cascadia #901',
      driverName: 'Marcus Vance',
      speed: '62 mph',
      fatigueStatus: 'Optimal Attentiveness (98.4%)',
      fuelLevel: '82%',
      dtcCode: 'None',
      location: 'I-95 North, Richmond VA',
      eta: '18 mins',
      lat: 37.5407,
      lng: -77.4360
    },
    {
      id: 'TRK-902',
      vehicleName: 'Volvo VNL 860 Heavy #902',
      driverName: 'Elena Rostova',
      speed: '58 mph',
      fatigueStatus: 'Optimal Attentiveness (96.0%)',
      fuelLevel: '64%',
      dtcCode: 'P0171 Fuel Trim Lean',
      location: 'I-80 West, Davenport IA',
      eta: '42 mins',
      lat: 41.5236,
      lng: -90.5776
    },
    {
      id: 'TRK-903',
      vehicleName: 'Kenworth T680 Autonomous #903',
      driverName: 'ADS Autonomous Mode (CVSA Approved)',
      speed: '65 mph',
      fatigueStatus: 'System Self-Check (100%)',
      fuelLevel: '91%',
      dtcCode: 'None',
      location: 'I-10 East, Phoenix AZ',
      eta: '12 mins',
      lat: 33.4484,
      lng: -112.0740
    }
  ];

  // Set default selected truck
  useEffect(() => {
    if (!selectedTruck && trucks.length > 0) {
      setSelectedTruck(trucks[0]);
    }
  }, []);

  // Initialize Full-Bleed Leaflet GIS Map Background
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [38.5000, -96.0000],
        zoom: 5,
        zoomControl: false
      });

      // CartoDB Dark Matter for sleek Grab Driver dark aesthetic
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Add glowing truck pins
    trucks.forEach(t => {
      const isAlert = t.dtcCode !== 'None';
      const color = isAlert ? '#ef4444' : t.id === 'TRK-903' ? '#6366f1' : '#00b14f'; // Grab Emerald

      const customIcon = L.divIcon({
        className: 'grab-driver-pin',
        html: `
          <div style="
            position: relative;
            width: 44px;
            height: 44px;
            background: #0f172a;
            border: 2.5px solid ${color};
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
            cursor: pointer;
          ">
            <span style="
              position: absolute;
              top: -5px;
              right: -5px;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: ${color};
              box-shadow: 0 0 10px ${color};
              animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5">
              <rect x="1" y="3" width="15" height="13" rx="2"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22]
      });

      const marker = L.marker([t.lat, t.lng], { icon: customIcon }).addTo(map);
      marker.on('click', () => {
        setSelectedTruck(t);
        setBottomSheetState('peek');
      });
    });

  }, []);

  const handleOpenLevel2 = (t: any) => {
    setSelectedTruck(t);
    setLevel2Open(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#090D16] text-[#F8FAFC] font-sans">
      
      {/* LAYER 1: Full-Bleed Interactive GIS Map Background (100% Viewport) */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* LAYER 2: Floating Top Status Bar & Grab Driver Header */}
      <header className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Left Floating Brand & Status Pill */}
        <div className="pointer-events-auto flex items-center space-x-3 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 px-4 py-2.5 rounded-2xl shadow-2xl">
          <div className="w-10 h-10 rounded-xl bg-[#00B14F] text-white flex items-center justify-center font-extrabold shadow-md shadow-[#00B14F]/30">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00B14F] animate-ping"></span>
              <span className="text-[11px] font-extrabold text-[#00B14F] uppercase tracking-wider">DRIVER ONLINE</span>
            </div>
            <h1 className="text-sm font-extrabold text-white tracking-tight">FleetPulse-AI Super-App</h1>
          </div>
        </div>

        {/* Center Floating Earnings & Surge Multiplier Badge */}
        <div className="pointer-events-auto hidden md:flex items-center space-x-4 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 px-5 py-2.5 rounded-2xl shadow-2xl">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-[#00B14F]" />
            <span className="text-xs font-bold text-slate-400">Replaced Payroll:</span>
            <span className="text-sm font-extrabold text-white">$165,000 / yr</span>
          </div>

          <div className="h-4 w-px bg-slate-700"></div>

          <div className="flex items-center space-x-1.5 text-xs font-extrabold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
            <Zap className="w-3.5 h-3.5" />
            <span>⚡ 98.2% ROI Surge</span>
          </div>
        </div>

        {/* Right Floating Actions Dock */}
        <div className="pointer-events-auto flex items-center space-x-2">
          
          <button
            onClick={() => setGuideOpen(true)}
            className="btn-spring px-3.5 py-2 bg-slate-900/90 backdrop-blur-xl border border-slate-700 text-teal-400 text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-xl hover:bg-slate-800"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden lg:inline">Operations Guide</span>
          </button>

          <button
            onClick={() => setAuditProofOpen(true)}
            className="btn-spring px-3.5 py-2 bg-slate-900/90 backdrop-blur-xl border border-slate-700 text-emerald-400 text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-xl hover:bg-slate-800"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden lg:inline">Actual Proof</span>
          </button>

          <button
            onClick={() => setSelfHostOpen(true)}
            className="btn-spring px-3.5 py-2 bg-[#00B14F] text-white text-xs font-extrabold rounded-xl shadow-lg flex items-center space-x-1.5 hover:bg-[#009b45]"
          >
            <Server className="w-4 h-4" />
            <span className="hidden sm:inline">Self-Host</span>
          </button>

        </div>
      </header>

      {/* Floating Right Dock for Quick Camera & Layer Switches */}
      <div className="absolute right-4 top-24 z-20 flex flex-col space-y-2">
        <button
          onClick={() => setRadarOpen(true)}
          className="w-11 h-11 bg-slate-900/90 backdrop-blur-xl border border-slate-700 text-indigo-400 rounded-xl flex items-center justify-center shadow-xl btn-spring"
          title="WebGPU 3D Radar"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
        </button>

        <button
          onClick={() => setWhiteLabelOpen(true)}
          className="w-11 h-11 bg-slate-900/90 backdrop-blur-xl border border-slate-700 text-purple-400 rounded-xl flex items-center justify-center shadow-xl btn-spring"
          title="White Label Customizer"
        >
          <Palette className="w-5 h-5" />
        </button>

        <button
          onClick={() => setSourceCodeOpen(true)}
          className="w-11 h-11 bg-slate-900/90 backdrop-blur-xl border border-slate-700 text-teal-400 rounded-xl flex items-center justify-center shadow-xl btn-spring"
          title="Source Code Buyout"
        >
          <Code className="w-5 h-5" />
        </button>
      </div>

      {/* LAYER 3: Floating Interactive Grab Driver Bottom Action Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-300 ${
          bottomSheetState === 'collapsed'
            ? 'h-20'
            : bottomSheetState === 'peek'
            ? 'h-[360px]'
            : 'h-[85vh]'
        } bg-slate-900/95 backdrop-blur-2xl border-t border-slate-700/80 rounded-t-3xl shadow-2xl flex flex-col`}
      >
        {/* Bottom Sheet Drag Handle Bar */}
        <div
          onClick={() =>
            setBottomSheetState(prev =>
              prev === 'collapsed' ? 'peek' : prev === 'peek' ? 'expanded' : 'collapsed'
            )
          }
          className="w-full py-3 flex flex-col items-center cursor-pointer hover:bg-slate-800/50 rounded-t-3xl transition-colors"
        >
          <div className="w-12 h-1.5 bg-slate-600 rounded-full mb-1"></div>
          <div className="flex items-center space-x-2 text-[11px] font-bold text-slate-400">
            <span>{bottomSheetState === 'expanded' ? 'SWIPE DOWN TO PEEK' : 'SWIPE UP FOR FULL TELEMATICS'}</span>
            {bottomSheetState === 'expanded' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </div>

        {/* Active Truck Dispatch Action Card (Grab Style) */}
        {selectedTruck && (
          <div className="px-6 pb-6 flex-1 overflow-y-auto space-y-5">
            
            {/* Card Header: Vehicle & ETA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00B14F]/20 border border-[#00B14F]/40 text-[#00B14F] font-bold flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-[#00B14F]">{selectedTruck.id}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-300">{selectedTruck.location}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white">{selectedTruck.vehicleName}</h3>
                  <p className="text-xs text-slate-400 font-medium">Assigned Driver: <span className="text-white font-bold">{selectedTruck.driverName}</span></p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Arrival</span>
                  <span className="text-lg font-extrabold text-emerald-400 font-mono">{selectedTruck.eta}</span>
                </div>

                <button
                  onClick={() => handleOpenLevel2(selectedTruck)}
                  className="btn-spring px-5 py-3 bg-[#00B14F] hover:bg-[#009b45] text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center space-x-2"
                >
                  <span>INSPECT TELEMATICS ➔</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-1">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Current Speed</span>
                <p className="text-base font-extrabold text-emerald-400">{selectedTruck.speed}</p>
              </div>

              <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-1">
                <span className="text-slate-400 text-[10px] font-bold uppercase">360° AI Driver Coaching</span>
                <p className="text-base font-extrabold text-white truncate">{selectedTruck.fatigueStatus}</p>
              </div>

              <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-1">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Fuel Level</span>
                <p className="text-base font-extrabold text-teal-300">{selectedTruck.fuelLevel}</p>
              </div>

              <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-1">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Engine DTC Health</span>
                <p className={`text-base font-extrabold ${selectedTruck.dtcCode === 'None' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {selectedTruck.dtcCode === 'None' ? '● Normal' : selectedTruck.dtcCode}
                </p>
              </div>
            </div>

            {/* Other Available Fleet Units List */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Other Active Transport Corridor Units</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {trucks.map(t => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTruck(t)}
                    className={`p-3.5 rounded-xl border cursor-pointer btn-spring transition-colors ${
                      selectedTruck.id === t.id
                        ? 'bg-slate-800 border-[#00B14F]'
                        : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#00B14F] font-mono">{t.id}</span>
                      <span className="text-[10px] text-slate-400">{t.speed}</span>
                    </div>
                    <h5 className="font-extrabold text-white text-xs mt-1 truncate">{t.vehicleName}</h5>
                    <p className="text-[11px] text-slate-400 truncate">{t.location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ecosystem Integrations & Pricing Hub when Expanded */}
            {bottomSheetState === 'expanded' && (
              <div className="space-y-6 pt-4 border-t border-slate-700">
                <EcosystemIntegrationsHub />
              </div>
            )}

          </div>
        )}

      </div>

      {/* Level 2 & 3 Drawers */}
      <DriverInspectionDrawer
        isOpen={level2Open}
        onClose={() => setLevel2Open(false)}
        truckData={selectedTruck}
        onOpenLevel3={() => setLevel3Open(true)}
      />

      <VehicleDetailLeafDrawer
        isOpen={level3Open}
        onClose={() => { setLevel3Open(false); setLevel2Open(false); }}
        onBackToLevel2={() => setLevel3Open(false)}
        vehicleName={selectedTruck?.vehicleName || 'Truck Unit'}
        dtcCode={selectedTruck?.dtcCode || 'P0171'}
      />

      {/* Modals */}
      <UserOperationsGuide isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
      <CryptographicAuditProofModal isOpen={auditProofOpen} onClose={() => setAuditProofOpen(false)} />
      <WebGPU3DRadarModal isOpen={radarOpen} onClose={() => setRadarOpen(false)} />
      <SelfHostProvisioningModal isOpen={selfHostOpen} onClose={() => setSelfHostOpen(false)} />
      <WhiteLabelCustomizerModal isOpen={whiteLabelOpen} onClose={() => setWhiteLabelOpen(false)} />
      <SourceCodeLicenseModal isOpen={sourceCodeOpen} onClose={() => setSourceCodeOpen(false)} />

    </div>
  );
};
