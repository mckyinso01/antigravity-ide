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
  ChevronRight,
  AlertTriangle,
  FileText,
  Wrench,
  Radio,
  Cpu,
  Layers,
  Maximize2
} from 'lucide-react';
import { DriverInspectionDrawer } from './DriverInspectionDrawer';
import { VehicleDetailLeafDrawer } from './VehicleDetailLeafDrawer';
import { EcosystemIntegrationsHub } from './EcosystemIntegrationsHub';
import { SelfHostProvisioningModal } from './SelfHostProvisioningModal';
import { WhiteLabelCustomizerModal } from './WhiteLabelCustomizerModal';
import { SourceCodeLicenseModal } from './SourceCodeLicenseModal';
import { EnterprisePriceComparisonMatrix } from './EnterprisePriceComparisonMatrix';
import { DesktopAppInstallShowcase } from './DesktopAppInstallShowcase';
import { UserOperationsGuide } from './UserOperationsGuide';
import { CryptographicAuditProofModal } from './CryptographicAuditProofModal';
import { WebGPU3DRadarModal } from './WebGPU3DRadarModal';

export const EnterpriseCommandSuite: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [selectedTruck, setSelectedTruck] = useState<any | null>(null);
  const [level2Open, setLevel2Open] = useState(false);
  const [level3Open, setLevel3Open] = useState(false);
  const [activeTab, setActiveTab] = useState<'fleet' | 'connectors' | 'roi' | 'desktop'>('fleet');

  // Commercial Modals State
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
    },
    {
      id: 'TRK-904',
      vehicleName: 'Peterbilt 579 Ultra #904',
      driverName: 'David Sterling',
      speed: '60 mph',
      fatigueStatus: 'Optimal Attentiveness (97.2%)',
      fuelLevel: '78%',
      dtcCode: 'None',
      location: 'I-75 South, Atlanta GA',
      eta: '25 mins',
      lat: 33.7490,
      lng: -84.3880
    }
  ];

  useEffect(() => {
    if (!selectedTruck && trucks.length > 0) {
      setSelectedTruck(trucks[0]);
    }
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [38.5000, -96.0000],
        zoom: 4,
        zoomControl: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    trucks.forEach(t => {
      const isAlert = t.dtcCode !== 'None';
      const color = isAlert ? '#ef4444' : t.id === 'TRK-903' ? '#818cf8' : '#10b981';

      const icon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            position: relative;
            width: 40px;
            height: 40px;
            background: #090d16;
            border: 2px solid ${color};
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 16px ${color}80;
            cursor: pointer;
          ">
            <span style="
              position: absolute;
              top: -4px;
              right: -4px;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: ${color};
              box-shadow: 0 0 8px ${color};
            "></span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5">
              <rect x="1" y="3" width="15" height="13" rx="2"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = L.marker([t.lat, t.lng], { icon }).addTo(map);
      marker.on('click', () => {
        setSelectedTruck(t);
      });
      markersRef.current[t.id] = marker;
    });

  }, []);

  const handleOpenLevel2 = (t: any) => {
    setSelectedTruck(t);
    setLevel2Open(true);
  };

  return (
    <div className="min-h-screen bg-[#060911] text-[#F8FAFC] flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Top High-Tech Cyberpunk Utility Header */}
      <header className="sticky top-0 z-30 bg-[#090D16]/90 backdrop-blur-xl border-b border-slate-800/80 px-6 py-3 flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-indigo-600 text-white font-extrabold flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-white text-base tracking-tight leading-none">FleetPulse-AI</h1>
                <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 rounded-full font-mono">
                  v2.4 PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Enterprise Fleet Telematics & Autonomous Command Suite</p>
            </div>
          </div>
        </div>

        {/* Live Telemetry Health Bar */}
        <div className="hidden lg:flex items-center space-x-6 bg-slate-900/80 border border-slate-800 px-4 py-1.5 rounded-xl text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono text-slate-300">120Hz Stream • 0.4ms Latency</span>
          </div>
          <div className="h-4 w-px bg-slate-800"></div>
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Replaced Headcount: $165k/yr</span>
          </div>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center space-x-2.5">
          
          <button
            onClick={() => setGuideOpen(true)}
            className="btn-spring px-3.5 py-1.5 bg-slate-900 border border-slate-700 text-teal-300 text-xs font-bold rounded-xl flex items-center space-x-1.5 hover:bg-slate-800 shadow-md"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">User Guide</span>
          </button>

          <button
            onClick={() => setAuditProofOpen(true)}
            className="btn-spring px-3.5 py-1.5 bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold rounded-xl flex items-center space-x-1.5 hover:bg-emerald-900 shadow-md"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xl:inline">Actual Proof</span>
          </button>

          <button
            onClick={() => setRadarOpen(true)}
            className="btn-spring px-3.5 py-1.5 bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-bold rounded-xl flex items-center space-x-1.5 hover:bg-indigo-900 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="hidden xl:inline">WebGPU 3D</span>
          </button>

          {/* Licensing Buttons */}
          <button
            onClick={() => setSelfHostOpen(true)}
            className="btn-spring px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-md shadow-teal-500/20"
          >
            <Server className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Self-Host</span>
          </button>

          <button
            onClick={() => setWhiteLabelOpen(true)}
            className="btn-spring px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-md shadow-purple-500/20"
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">White-Label</span>
          </button>

          <button
            onClick={() => setSourceCodeOpen(true)}
            className="btn-spring px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 flex items-center space-x-1.5 shadow-md"
          >
            <Code className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Source $6.9k</span>
          </button>

        </div>
      </header>

      {/* Navigation Sub-Header Tabs */}
      <div className="bg-[#090D16] border-b border-slate-800/80 px-6 py-2 flex items-center space-x-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('fleet')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
            activeTab === 'fleet'
              ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Real-Time Fleet Corridor Command</span>
        </button>

        <button
          onClick={() => setActiveTab('connectors')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
            activeTab === 'connectors'
              ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>8 Enterprise Ecosystem Connectors</span>
        </button>

        <button
          onClick={() => setActiveTab('roi')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
            activeTab === 'roi'
              ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Price & ROI Advantage Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('desktop')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
            activeTab === 'desktop'
              ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Native Desktop PWA Package</span>
        </button>
      </div>

      {/* Main Split-Screen Workspace Layout */}
      {activeTab === 'fleet' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
          
          {/* LEFT COMMAND PANEL (40% Width): High-Density Telematics Feed */}
          <div className="lg:col-span-5 border-r border-slate-800/80 p-5 space-y-5 overflow-y-auto bg-[#090D16]">
            
            {/* Header Telemetry Stat Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Active Heavy Transport</span>
                <p className="text-xl font-extrabold text-white">450 Freight Units</p>
                <p className="text-[10px] text-emerald-400 font-bold">100% Online & Tracking</p>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">AI Driver Attentiveness</span>
                <p className="text-xl font-extrabold text-teal-400">98.4% Score</p>
                <p className="text-[10px] text-slate-400 font-medium">0 Fatigue Incidents</p>
              </div>
            </div>

            {/* Selected Truck Live Telemetry Spotlight Card */}
            {selectedTruck && (
              <div className="p-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-teal-500/40 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold text-teal-400 uppercase tracking-wider font-mono">{selectedTruck.id} Spotlight</span>
                    <h3 className="text-lg font-extrabold text-white">{selectedTruck.vehicleName}</h3>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    selectedTruck.dtcCode === 'None' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}>
                    {selectedTruck.dtcCode === 'None' ? '● Normal' : selectedTruck.dtcCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Driver</span>
                    <span className="font-bold text-white truncate block">{selectedTruck.driverName}</span>
                  </div>

                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Velocity</span>
                    <span className="font-bold text-teal-400 block">{selectedTruck.speed}</span>
                  </div>

                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Location</span>
                    <span className="font-bold text-slate-300 truncate block">{selectedTruck.location}</span>
                  </div>

                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Fuel Level</span>
                    <span className="font-bold text-emerald-400 block">{selectedTruck.fuelLevel}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenLevel2(selectedTruck)}
                  className="btn-spring w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center space-x-2"
                >
                  <span>OPEN LEVEL 2 INSPECTION DRAWER</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Transport Unit Selection Cards */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Active US Freight Corridor Units</h4>

              <div className="space-y-2.5">
                {trucks.map(t => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTruck(t)}
                    className={`p-4 rounded-xl border cursor-pointer btn-spring transition-all ${
                      selectedTruck?.id === t.id
                        ? 'bg-slate-900 border-teal-500 shadow-md shadow-teal-500/10'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center font-bold text-xs">
                          <Truck className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-xs text-teal-400 font-mono">{t.id}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{t.speed}</span>
                    </div>

                    <h5 className="font-extrabold text-white text-xs mt-2">{t.vehicleName}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{t.location}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COMMAND PANEL (60% Width): Ultra-Resolution Interactive GIS Corridor Map */}
          <div className="lg:col-span-7 relative h-full min-h-[500px]">
            <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
          </div>

        </div>
      )}

      {/* Tab 2: Ecosystem Connectors */}
      {activeTab === 'connectors' && (
        <div className="p-6">
          <EcosystemIntegrationsHub />
        </div>
      )}

      {/* Tab 3: Price ROI Matrix */}
      {activeTab === 'roi' && (
        <div className="p-6">
          <EnterprisePriceComparisonMatrix />
        </div>
      )}

      {/* Tab 4: Desktop PWA Showcase */}
      {activeTab === 'desktop' && (
        <div className="p-6">
          <DesktopAppInstallShowcase />
        </div>
      )}

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
