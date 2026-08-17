import React from 'react';
import { 
  Map, 
  Package, 
  Zap, 
  ArrowDownToLine, 
  Building2, 
  TrendingUp, 
  Settings,
  Truck
} from 'lucide-react';
import { HelpTooltip } from './HelpTooltip';

export type TabId = 'cad' | 'inventory' | 'picking' | 'receiving' | 'clients' | 'analytics' | 'settings';

interface SidebarNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  pendingPicksCount: number;
  stockoutAlertsCount: number;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  pendingPicksCount,
  stockoutAlertsCount
}) => {
  const navItems: { 
    id: TabId; 
    label: string; 
    icon: React.FC<any>; 
    badge?: number; 
    badgeColor?: string;
    purpose: string;
    howTo: string;
  }[] = [
    { 
      id: 'cad', 
      label: 'Spatial CAD Blueprint', 
      icon: Map,
      purpose: 'Digital twin of the entire facility showing 192 racking slots, vertical tiers L1-L4, and the Eulerian shortest pick path.',
      howTo: 'Click to open the CAD map, switch racking levels, or click any bin slot to inspect stored inventory.'
    },
    { 
      id: 'inventory', 
      label: 'Inventory & SKUs', 
      icon: Package, 
      badge: stockoutAlertsCount > 0 ? stockoutAlertsCount : undefined, 
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      purpose: 'Master catalog of all stored enterprise inventory, on-hand counts, safety thresholds, and GS1 barcodes.',
      howTo: 'Search SKUs, filter by sector, or register new product lines using + Add New SKU.'
    },
    { 
      id: 'picking', 
      label: 'Wave Pick & Pack', 
      icon: Zap, 
      badge: pendingPicksCount > 0 ? pendingPicksCount : undefined, 
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      purpose: 'Eulerian Shortest-Path Execution Engine for multi-order batch picking, slashing walking transit by 38.4%.',
      howTo: 'Inspect active wave batches, follow the guided pick sequence, and click Confirm Pick for each bin.'
    },
    { 
      id: 'receiving', 
      label: 'Inbound Dock', 
      icon: ArrowDownToLine,
      purpose: 'Inbound shipment staging dock with AI-powered Smart Put-Away slotting recommendations.',
      howTo: 'Receive new Purchase Orders (PO) and review AI-suggested rack allocations based on velocity and hazmat rules.'
    },
    { 
      id: 'clients', 
      label: '3PL Client Billing', 
      icon: Building2,
      purpose: 'Automated multi-client pallet-day storage calculation and itemized pick-handling invoice generator.',
      howTo: 'Review accrued billing balances per 3PL tenant and generate exportable commercial invoices in 1 click.'
    },
    { 
      id: 'analytics', 
      label: 'S&OP & Velocity', 
      icon: TrendingUp,
      purpose: 'Inventory velocity classification, Gross Margin ROI (GMROI), and Predictive Stockout Early Warning Radar.',
      howTo: 'Monitor stockout risk factors and generate automated vendor replenishment orders.'
    },
    { 
      id: 'settings', 
      label: 'Warehouse Config', 
      icon: Settings,
      purpose: 'Visual racking topology builder, facility metadata customizer, and JSON database backup manager.',
      howTo: 'Adjust facility Aisles/Bays/Tiers or download complete offline database snapshots.'
    },
  ];

  return (
    <aside className="w-60 border-r border-[#1E2D4D] bg-[#070B14]/95 flex flex-col justify-between shrink-0 font-sans z-20">
      {/* Navigation Links */}
      <div className="p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
          Operations Rail
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <HelpTooltip
              key={item.id}
              title={item.label}
              purpose={item.purpose}
              howTo={item.howTo}
              position="right"
            >
              <button
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#121D36] to-[#0D1527] border border-[#5BC0BE]/40 text-[#6FFFE9] shadow-md glow-mint' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0D1527] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={isActive ? 'text-[#5BC0BE]' : 'text-slate-400'} />
                  <span className="font-mono">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border font-bold ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            </HelpTooltip>
          );
        })}
      </div>

      {/* Bottom Live Logistics Status & Help */}
      <div className="p-3 border-t border-[#1E2D4D]/80 bg-[#0D1527]/50 space-y-2.5">
        <HelpTooltip
          title="Inbound Dock Bay 04 Telemetry"
          purpose="Real-time ETA and manifest tracker for inbound freight trucks and container pallets."
          howTo="Provides 18-minute advance arrival alerts to dispatch forklift crews and stage dock doors."
          position="right"
        >
          <div className="p-2.5 rounded-xl bg-[#121D36] border border-[#1E2D4D] cursor-help">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 mb-1">
              <span className="flex items-center gap-1.5">
                <Truck size={13} className="text-[#5BC0BE]" />
                Dock Bay 04
              </span>
              <span className="text-emerald-400 font-bold">ACTIVE</span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans leading-tight">
              FedEx Freight arriving in 18 mins (44 pallets).
            </p>
          </div>
        </HelpTooltip>

        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
          <span>Eulerian Engine: Active</span>
          <span className="text-[#5BC0BE]">v2.6.4</span>
        </div>
      </div>
    </aside>
  );
};
