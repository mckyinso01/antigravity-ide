import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, RefreshCw, Filter, Compass, Maximize2, ShieldCheck, Truck } from 'lucide-react';

interface InteractiveFleetMapProps {
  onSelectTruck: (truck: any) => void;
}

export const InteractiveFleetMap: React.FC<InteractiveFleetMapProps> = ({ onSelectTruck }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [activeLayer, setActiveLayer] = useState<'dark' | 'streets' | 'satellite'>('dark');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const trucks = [
    {
      id: 'TRK-901',
      vehicleName: 'Freightliner Cascadia #901',
      driverName: 'Marcus Vance',
      speed: '62 mph',
      fatigueStatus: 'Optimal Attentiveness (98%)',
      fuelLevel: '82%',
      dtcCode: 'None',
      location: 'I-95 North, Richmond VA',
      lat: 37.5407,
      lng: -77.4360,
      heading: 'North'
    },
    {
      id: 'TRK-902',
      vehicleName: 'Volvo VNL 860 Heavy #902',
      driverName: 'Elena Rostova',
      speed: '58 mph',
      fatigueStatus: 'Optimal Attentiveness (96%)',
      fuelLevel: '64%',
      dtcCode: 'P0171 Fuel Trim Lean',
      location: 'I-80 West, Davenport IA',
      lat: 41.5236,
      lng: -90.5776,
      heading: 'West'
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
      lat: 33.4484,
      lng: -112.0740,
      heading: 'East'
    },
    {
      id: 'TRK-904',
      vehicleName: 'Peterbilt 579 Ultra #904',
      driverName: 'David Sterling',
      speed: '60 mph',
      fatigueStatus: 'Optimal Attentiveness (97%)',
      fuelLevel: '78%',
      dtcCode: 'None',
      location: 'I-75 South, Atlanta GA',
      lat: 33.7490,
      lng: -84.3880,
      heading: 'South'
    },
    {
      id: 'TRK-905',
      vehicleName: 'Mack Anthem Express #905',
      driverName: 'Carlos Mendoza',
      speed: '64 mph',
      fatigueStatus: 'Optimal Attentiveness (95%)',
      fuelLevel: '88%',
      dtcCode: 'None',
      location: 'I-35 North, Dallas TX',
      lat: 32.7767,
      lng: -96.7970,
      heading: 'North'
    }
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet Map centered over the US
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [38.5000, -96.0000],
        zoom: 4,
        zoomControl: false
      });

      // Add CartoDB Dark Matter tile layer by default for ultra-sleek enterprise look
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    // Render Markers for each Heavy Truck
    trucks.forEach(t => {
      if (filterStatus !== 'all') {
        if (filterStatus === 'alert' && t.dtcCode === 'None') return;
        if (filterStatus === 'normal' && t.dtcCode !== 'None') return;
      }

      const isAlert = t.dtcCode !== 'None';
      const markerColor = isAlert ? '#ef4444' : t.id === 'TRK-903' ? '#6366f1' : '#0d9488';

      const customIcon = L.divIcon({
        className: 'custom-truck-pin',
        html: `
          <div style="
            position: relative;
            width: 38px;
            height: 38px;
            background: #0f172a;
            border: 2px solid ${markerColor};
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 14px rgba(0,0,0,0.5);
            cursor: pointer;
          ">
            <span style="
              position: absolute;
              top: -4px;
              right: -4px;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: ${markerColor};
              box-shadow: 0 0 8px ${markerColor};
            "></span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${markerColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="2"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });

      const marker = L.marker([t.lat, t.lng], { icon: customIcon }).addTo(map);

      // Bind rich popup card
      const popupContent = `
        <div style="font-family: system-ui, sans-serif; padding: 4px; color: #0f172a;">
          <div style="font-size: 11px; font-weight: 800; color: #0d9488; text-transform: uppercase;">${t.id} • Live GPS</div>
          <div style="font-size: 14px; font-weight: 800; margin-top: 2px;">${t.vehicleName}</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Driver: <b>${t.driverName}</b></div>
          <div style="display: flex; gap: 8px; margin-top: 8px; font-size: 11px;">
            <span style="background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-weight: 700; color: #0f172a;">Speed: ${t.speed}</span>
            <span style="background: ${isAlert ? '#fee2e2' : '#dcfce7'}; padding: 4px 8px; border-radius: 6px; font-weight: 700; color: ${isAlert ? '#991b1b' : '#166534'};">
              ${isAlert ? '⚠ DTC Alert' : '● Normal'}
            </span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onSelectTruck(t);
      });

      markersRef.current[t.id] = marker;
    });

  }, [filterStatus]);

  const switchTileLayer = (layer: 'dark' | 'streets' | 'satellite') => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    
    // Remove existing tile layers
    map.eachLayer(l => {
      if (l instanceof L.TileLayer) map.removeLayer(l);
    });

    let url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    if (layer === 'streets') {
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    } else if (layer === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }

    L.tileLayer(url, { maxZoom: 19 }).addTo(map);
    setActiveLayer(layer);
  };

  const centerFleet = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([38.5000, -96.0000], 4);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-xl bg-slate-900">
      
      {/* Map Header Control Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 text-white text-xs">
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600/30 border border-teal-500/50 flex items-center justify-center text-teal-400">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-100 tracking-tight">Interactive US Fleet GIS Corridor Map</h3>
            <p className="text-[11px] text-slate-400 font-mono">450 Transport Units • Real-Time GPS Polylines</p>
          </div>
        </div>

        {/* Filters & Layers */}
        <div className="flex items-center space-x-2">
          
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-colors ${filterStatus === 'all' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              All (450)
            </button>
            <button
              onClick={() => setFilterStatus('normal')}
              className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-colors ${filterStatus === 'normal' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Normal
            </button>
            <button
              onClick={() => setFilterStatus('alert')}
              className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-colors ${filterStatus === 'alert' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              DTC Alert
            </button>
          </div>

          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-lg">
            <button
              onClick={() => switchTileLayer('dark')}
              className={`px-2.5 py-1 rounded-md font-bold text-[11px] ${activeLayer === 'dark' ? 'bg-slate-800 text-teal-400 border border-teal-500/40' : 'text-slate-400'}`}
            >
              Dark GIS
            </button>
            <button
              onClick={() => switchTileLayer('satellite')}
              className={`px-2.5 py-1 rounded-md font-bold text-[11px] ${activeLayer === 'satellite' ? 'bg-slate-800 text-teal-400 border border-teal-500/40' : 'text-slate-400'}`}
            >
              Satellite
            </button>
          </div>

          <button
            onClick={centerFleet}
            className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg btn-spring"
            title="Recenter Fleet View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Leaflet Map Container */}
      <div ref={mapContainerRef} className="w-full h-[460px] z-10" />

    </div>
  );
};
