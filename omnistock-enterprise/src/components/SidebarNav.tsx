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
      purpose: 'Digital twin ng buong bodega na nagpapakita ng 192 racking slots, vertical tiers L1-L4, at Eulerian shortest pick path.',
      howTo: 'I-click upang buksan ang CAD map, mag-switch ng levels, o i-click ang kahit anong bin slot para makita ang laman.'
    },
    { 
      id: 'inventory', 
      label: 'Inventory & SKUs', 
      icon: Package, 
      badge: stockoutAlertsCount > 0 ? stockoutAlertsCount : undefined, 
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      purpose: 'Master catalog ng lahat ng mga nakaimbak na produkto, on-hand stocks, safety thresholds, at GS1 barcodes.',
      howTo: 'I-click upang maghanap ng SKU, mag-filter ayon sa kategorya, o magrehistro ng bagong produkto gamit ang + Add New SKU.'
    },
    { 
      id: 'picking', 
      label: 'Wave Pick & Pack', 
      icon: Zap, 
      badge: pendingPicksCount > 0 ? pendingPicksCount : undefined, 
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      purpose: 'Eulerian Shortest-Path Execution Engine para sa batch order picking na nagtitipid ng 38.4% sa oras ng paglalakad.',
      howTo: 'I-click upang tingnan ang active wave orders, sundan ang pick sequence, at pindutin ang Confirm Pick sa bawat item.'
    },
    { 
      id: 'receiving', 
      label: 'Inbound Dock', 
      icon: ArrowDownToLine,
      purpose: 'Staging dock para sa mga dumarating na kargamento at AI Smart Put-Away Slotting recommender.',
      howTo: 'I-click upang mag-inbound ng bagong Purchase Order (PO) at hayaan ang AI na magmungkahi ng pinaka-angkop na racking bay.'
    },
    { 
      id: 'clients', 
      label: '3PL Client Billing', 
      icon: Building2,
      purpose: 'Multi-client automated pallet-day storage calculation at itemized pick-handling invoice generator.',
      howTo: 'I-click upang suriin ang billing status ng bawat kliyente at mag-export ng live PDF invoice sa 1-click.'
    },
    { 
      id: 'analytics', 
      label: 'S&OP & Velocity', 
      icon: TrendingUp,
      purpose: 'Inventory velocity analytics, Gross Margin ROI (GMROI), at Predictive Stockout Early Warning Radar.',
      howTo: 'I-click upang masubaybayan ang stockout risks at mag-auto generate ng replenishment purchase orders.'
    },
    { 
      id: 'settings', 
      label: 'Warehouse Config', 
      icon: Settings,
      purpose: 'No-Code visual racking topology builder, facility metadata customizer, at JSON database snapshot export.',
      howTo: 'I-click upang baguhin ang bilang ng Aisles/Bays/Tiers o mag-download ng complete database backup.'
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
          purpose="Real-time ETA at manifest tracker para sa mga paparating na freight truck at container pallets."
          howTo="Nagbibigay ng maagang abiso 18 minuto bago dumating ang kargamento upang maihanda ang mga forklift."
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
