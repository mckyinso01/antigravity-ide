import React from 'react';
import { Truck, ShieldCheck, AlertTriangle, Activity, Fuel, MapPin, Search } from 'lucide-react';

interface FleetTelematicsGridProps {
  onSelectTruck: (truck: any) => void;
}

export const FleetTelematicsGrid: React.FC<FleetTelematicsGridProps> = ({ onSelectTruck }) => {
  const trucks = [
    {
      id: 'TRK-901',
      vehicleName: 'Freightliner Cascadia #901',
      driverName: 'Marcus Vance',
      speed: '62 mph',
      fatigueStatus: 'Optimal Attentiveness (98%)',
      fuelLevel: '82%',
      dtcCode: 'None',
      location: 'I-95 North, Richmond VA'
    },
    {
      id: 'TRK-902',
      vehicleName: 'Volvo VNL 860 Heavy #902',
      driverName: 'Elena Rostova',
      speed: '58 mph',
      fatigueStatus: 'Optimal Attentiveness (96%)',
      fuelLevel: '64%',
      dtcCode: 'P0171 Fuel Trim Lean',
      location: 'I-80 West, Davenport IA'
    },
    {
      id: 'TRK-903',
      vehicleName: 'Kenworth T680 Autonomous #903',
      driverName: 'ADS Autonomous Mode (CVSA Approved)',
      speed: '65 mph',
      fatigueStatus: 'System Self-Check (100%)',
      fuelLevel: '91%',
      dtcCode: 'None',
      location: 'I-10 East, Phoenix AZ'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Real-Time Telematics Grid</span>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">450 Active Heavy Transport Units</h3>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search vehicle or DTC code..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-2xs"
          />
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trucks.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelectTruck(t)}
            className="theme-glacial-frost p-5 rounded-2xl space-y-4 cursor-pointer btn-spring hover:border-teal-500 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 font-bold flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-indigo-600 font-mono">{t.id}</span>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                t.dtcCode === 'None' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
              }`}>
                {t.dtcCode === 'None' ? '● Normal' : '⚠ DTC Alert'}
              </span>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">{t.vehicleName}</h4>
              <p className="text-xs text-slate-500 font-medium flex items-center space-x-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{t.location}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/60">
              <div className="p-2 bg-white rounded-lg border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block">Velocity</span>
                <span className="font-bold text-teal-700">{t.speed}</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block">Fuel Level</span>
                <span className="font-bold text-slate-900">{t.fuelLevel}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 text-teal-700 font-bold group-hover:underline">
              <span>Inspect DVIR & Telematics</span>
              <span>Inspect ➔</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
