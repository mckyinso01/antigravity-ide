import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Server, 
  Globe, 
  Crown, 
  Check, 
  CreditCard, 
  Mail, 
  Sparkles,
  ExternalLink,
  Code2,
  Lock,
  Layers,
  ZoomIn,
  Camera,
  Route,
  TrendingUp,
  Tag,
  ShieldAlert,
  HelpCircle,
  EyeOff,
  CheckCircle2,
  DollarSign,
  FileText,
  Scale,
  AlertCircle
} from 'lucide-react';
import { trackHighIntentAction } from '../utils/visitorEmailBeacon';

interface LicensingDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'scenarios' | 'security' | 'ergonomics' | 'pricing' | 'terms';

interface PitchScenario {
  id: string;
  category: string;
  featureTitle: string;
  icon: any;
  badgeColor: string;
  description: string;
  realWorldScenario: string;
  howOmniStockResolves: string;
  enterpriseImpact: string;
}

export const LicensingDeploymentModal: React.FC<LicensingDeploymentModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('scenarios');
  const [selectedScenarioFilter, setSelectedScenarioFilter] = useState<string>('ALL');

  if (!isOpen) return null;

  const handleSelectTier = (tierName: string, price: string) => {
    trackHighIntentAction(`Selected Pricing Tier: ${tierName}`, { Price: price });
    window.open('https://pm.link/org-Z74G8b3xQ5pYt87/test_prod_omnistock_enterprise', '_blank');
  };

  const handleContactSales = () => {
    trackHighIntentAction('Clicked Direct Sales Inquiry');
    window.location.href = 'mailto:mckinsyo01@gmail.com?subject=OmniStock%20ERP%20Commercial%20Licensing%20Inquiry';
  };

  const pitchScenarios: PitchScenario[] = [
    {
      id: 'cad-digital-twin',
      category: 'FLOORPLAN & SPATIAL CAD',
      featureTitle: 'Spatial CAD Digital Twin & Zero-Tab Navigation',
      icon: Layers,
      badgeColor: 'text-[#6FFFE9] bg-[#5BC0BE]/15 border-[#5BC0BE]/30',
      description: 'An interactive, real-time 2D/3D spatial blueprint of the warehouse layout displaying exact rack locations, storage zones, velocity classes, and active pick paths.',
      realWorldScenario: 'A warehouse worker receives an urgent pick order for a medical SKU but only has an abstract code like "BAY-49-L3". They wander through massive aisle rows looking for markers, wasting 15 minutes per order and congesting forklift lanes.',
      howOmniStockResolves: 'The worker glances at the CAD Digital Twin. The exact bay illuminates with an active mint wave marker, the aisle sign shows visual category icons (e.g. 💊 Pharma & PPE), and the Eulerian pick path traces the shortest walking route.',
      enterpriseImpact: 'Cuts order transit time by 48% and eliminates picking location errors across complex multi-tier facilities.'
    },
    {
      id: 'viewport-zoom-pan',
      category: 'FLOORPLAN & SPATIAL CAD',
      featureTitle: 'Interactive Viewport Zoom & Pan Engine',
      icon: ZoomIn,
      badgeColor: 'text-blue-400 bg-blue-500/15 border-blue-500/30',
      description: 'A floating glassmorphic control HUD with smooth mouse wheel scaling (40%–250%), 1-click preset chips (75%, 100%, 125%, 150%, 200%), Fit-to-Screen maximization, and canvas drag-panning.',
      realWorldScenario: 'On a large 500-bay mezzanine warehouse, inspecting dense rack clusters on standard tablet screens requires frustrating pinch-to-zoom gestures that cause accidental button clicks and misplaced bin selections.',
      howOmniStockResolves: 'Workers use the quick preset chips or the smooth range slider to magnify bay clusters up to 250%. The Pan tool allows fluid exploration, while "Fit View" instantly recenters the blueprint to the maximum display area.',
      enterpriseImpact: '100% responsive on ruggedized Android handhelds, desktop supervisor consoles, and wall-mounted dock monitors.'
    },
    {
      id: 'overhead-signage',
      category: 'ERGONOMICS & WAYFINDING',
      featureTitle: 'Grocery-Style Overhead Aisle Signage Designer',
      icon: Tag,
      badgeColor: 'text-amber-300 bg-amber-500/15 border-amber-500/30',
      description: 'Customizable visual aisle signs with department headers, high-contrast category badges, and emoji icons (🥫 Canned Goods, 💊 Pharma, ⚡ Electronics, ❄️ Cold Storage, ☣️ Hazmat).',
      realWorldScenario: 'Elderly staff, newly hired temporary workers, or non-English-speaking seasonal staff struggle to memorize complex alphanumeric warehouse codes (e.g., "Zone B4-Sec-8"), resulting in mis-shelved inventory and training bottlenecks.',
      howOmniStockResolves: 'Supervisors customize aisle signs directly in the CAD Studio. Workers instantly recognize visual category signposts (e.g. 🥫 Food & Canned Goods, 🧰 Hydraulics & Tools), matching physical warehouse overhead banners with zero cognitive friction.',
      enterpriseImpact: 'Reduces seasonal onboarding time from 3 days to under 15 minutes.'
    },
    {
      id: 'accidental-deletion-shield',
      category: 'SECURITY & GOVERNANCE',
      featureTitle: 'Non-Empty Rack Deletion Lock & Safety Shield',
      icon: Lock,
      badgeColor: 'text-rose-400 bg-rose-500/15 border-rose-500/30',
      description: 'Hard architectural deletion locks preventing accidental erasure of active storage racks containing inventory, paired with a 30-day soft-delete Recovery Vault.',
      realWorldScenario: 'A supervisor reorganizing the warehouse layout accidentally clicks "Delete Rack" on Bay A-01, which currently holds 1,000 units of high-value respiratory apparatuses, wiping out stock ledger records and creating catastrophic audit discrepancies.',
      howOmniStockResolves: 'OmniStock strictly locks deletion whenever a bin has quantity > 0. The system halts the action, displays the current stock units and batch lot, and forces stock de-slotting or forklift transfer before layout modifications can occur.',
      enterpriseImpact: 'Zero risk of accidental data loss or phantom inventory caused by human clicking errors.'
    },
    {
      id: 'anti-theft-fraud-defense',
      category: 'SECURITY & GOVERNANCE',
      featureTitle: 'Anti-Theft, Pilferage & Inventory Tampering Defense',
      icon: ShieldAlert,
      badgeColor: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
      description: 'Blind cycle count prompts, immutable audit ledgers, variance escrow locks, live camera watermarking, and inbound-to-outbound reconciliation.',
      realWorldScenario: 'An employee plans to pilfer items from a pallet, manually zeroes out the inventory balance on the screen, uploads an old photo of an empty bin, and claims stock was "running low" upon arrival.',
      howOmniStockResolves: '1) Blind counting hides expected quantities so auditors cannot fake matching numbers. 2) Reductions exceeding $500 trigger a Variance Escrow Lock requiring supervisor sign-off. 3) Photos require live camera capture with digital watermarks. 4) The immutable audit ledger permanently ties the adjustment to the employee ID and timestamp.',
      enterpriseImpact: 'Eliminates internal shrinkage and provides airtight audit trails for insurance and regulatory compliance.'
    },
    {
      id: 'eulerian-pick-optimizer',
      category: 'ALGORITHMIC EFFICIENCY',
      featureTitle: 'Eulerian Shortest-Path Wave Pick Optimizer',
      icon: Route,
      badgeColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
      description: 'A client-side graph routing engine that batches customer orders into optimized single-pass picking waves across Class A, B, and Hazmat zones.',
      realWorldScenario: 'Pickers receive customer orders randomly, walking back and forth across 20 aisles multiple times a day. Workers cover 12+ kilometers daily, causing fatigue, high labor costs, and slow fulfillment times.',
      howOmniStockResolves: 'The Eulerian Algorithm computes the mathematical shortest traversal route connecting all active pick locations. It generates a step-by-step picking sequence from Inbound Dock to Pack & Ship in one continuous forward motion.',
      enterpriseImpact: 'Increases order fulfillment speed by 64% and reduces picker walking fatigue by over 5 kilometers per shift.'
    },
    {
      id: 'inbound-barcode-decoupler',
      category: 'DOCK & RECEIVING',
      featureTitle: 'Inbound Barcode Decoupler & Camera Scanner',
      icon: Camera,
      badgeColor: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30',
      description: 'Integrated hardware and camera barcode/RFID scanner that automatically parses GS1, UPC, Code128, and QR codes for instant bin slotting and lot tracking.',
      realWorldScenario: 'A freight truck unloads 44 mixed pallets at Dock Bay 04. Staff manually type 16-digit SKU serials and expiration dates into desktop keyboards, causing 2-hour receiving delays and typing mistakes.',
      howOmniStockResolves: 'Staff aim any ruggedized tablet or smartphone camera at the pallet barcode. OmniStock instantly verifies the SKU, checks storage temperature rules (e.g. routing Cold Vault items to Zone E), assigns an optimal bay, and records the batch lot.',
      enterpriseImpact: 'Reduces dock turnaround time from 120 minutes to under 18 minutes per truck.'
    },
    {
      id: '3pl-automated-billing',
      category: 'FINANCIAL & 3PL AUTOMATION',
      featureTitle: 'Automated 3PL Invoicing & Storage Accruals',
      icon: DollarSign,
      badgeColor: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30',
      description: 'Automated daily pallet storage calculations ($1.45/pallet/day), tiered pick fees, inbound receiving handling charges, and 1-click PDF invoice generation.',
      realWorldScenario: 'A 3PL logistics provider manages inventory for 8 different commercial clients. At the end of every month, accountants spend 4 days cross-referencing messy spreadsheets to calculate storage and pick fees, leading to billing disputes and lost revenue.',
      howOmniStockResolves: 'OmniStock tracks active pallet occupancy in real-time. Storage charges accrue automatically every midnight. With one click, managers generate professional itemized invoices with exact lot records, pick histories, and instant payment links.',
      enterpriseImpact: 'Eliminates billing disputes, captures 100% of billable handling events, and saves 30+ accounting hours monthly.'
    },
    {
      id: 'predictive-sop-analytics',
      category: 'SUPPLY CHAIN & S&OP',
      featureTitle: 'Predictive S&OP Analytics & Autonomous PO Generation',
      icon: TrendingUp,
      badgeColor: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/30',
      description: 'Real-time velocity scoring, days-of-supply burn-rate forecasting, stockout risk alerts, and automated purchase order dispatch.',
      realWorldScenario: 'A sudden surge in orders depletes critical packaging or medical inventory unnoticed. By the time procurement realizes, suppliers have a 3-week lead time, shutting down fulfillment operations.',
      howOmniStockResolves: 'OmniStock continuously calculates SKU run-rates against supplier lead times. When stock crosses the safety threshold, the system triggers an amber reorder warning and pre-populates a vendor Purchase Order with exact suggested reorder quantities.',
      enterpriseImpact: 'Prevents costly stockouts and reduces excess safety-stock holding capital by 22%.'
    },
    {
      id: 'zero-saas-tax-p2p',
      category: 'COMMERCIAL & DEPLOYMENT',
      featureTitle: 'Zero Per-User SaaS Tax & Air-Gapped P2P Cluster Sync',
      icon: Server,
      badgeColor: 'text-pink-400 bg-pink-500/15 border-pink-500/30',
      description: 'True perpetual ownership with zero recurring per-seat fees, paired with BroadcastChannel P2P cluster synchronization for air-gapped local networks.',
      realWorldScenario: 'A growing enterprise pays $150/month per warehouse worker on legacy SaaS WMS platforms, resulting in ballooning software bills of $90,000+/year. Furthermore, when internet cuts out in metal-walled warehouses, cloud-only systems freeze.',
      howOmniStockResolves: 'OmniStock is deployed on-premise or white-labeled with zero recurring per-user fees. Workers on the local Wi-Fi cluster stay synchronized via P2P BroadcastChannel even during external internet outages.',
      enterpriseImpact: 'Saves $50,000–$120,000 annually in SaaS licensing and guarantees 100% operational uptime.'
    }
  ];

  const categories = ['ALL', 'FLOORPLAN & SPATIAL CAD', 'SECURITY & GOVERNANCE', 'ERGONOMICS & WAYFINDING', 'ALGORITHMIC EFFICIENCY', 'DOCK & RECEIVING', 'FINANCIAL & 3PL AUTOMATION', 'SUPPLY CHAIN & S&OP', 'COMMERCIAL & DEPLOYMENT'];

  const filteredScenarios = selectedScenarioFilter === 'ALL'
    ? pitchScenarios
    : pitchScenarios.filter(s => s.category === selectedScenarioFilter);

  return (
    <div className="fixed inset-y-0 right-0 w-[780px] max-w-full z-[150] bg-[#070B14]/98 border-l border-[#2A4374] shadow-[0_0_80px_rgba(0,0,0,0.95)] flex flex-col h-full overflow-hidden animate-slideLeft font-sans backdrop-blur-2xl">
      {/* Header */}
      <div className="h-16 border-b border-[#1E2D4D] bg-[#0D1527] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5BC0BE] to-[#3A86FF] flex items-center justify-center text-[#070B14] shadow-lg">
            <ShieldCheck size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-mono font-bold text-base text-white flex items-center gap-2">
              OmniStock Enterprise Architecture & Pitch
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5BC0BE]/20 text-[#6FFFE9] border border-[#5BC0BE]/40 font-mono">
                WMS v2.6
              </span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Real-World Operational Scenarios • Security Governance • Commercial Buyout</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#121D36] transition-all cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="border-b border-[#1E2D4D] bg-[#0A1124] px-6 flex items-center gap-2 font-mono text-xs overflow-x-auto shrink-0 py-2">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === 'scenarios'
              ? 'bg-[#5BC0BE] text-[#070B14] shadow-md glow-mint'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#121D36]'
          }`}
        >
          <Sparkles size={14} />
          <span>Feature & Scenario Pitch ({pitchScenarios.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === 'security'
              ? 'bg-[#5BC0BE] text-[#070B14] shadow-md glow-mint'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#121D36]'
          }`}
        >
          <Lock size={14} />
          <span>Security & Anti-Theft Shield</span>
        </button>

        <button
          onClick={() => setActiveTab('ergonomics')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === 'ergonomics'
              ? 'bg-[#5BC0BE] text-[#070B14] shadow-md glow-mint'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#121D36]'
          }`}
        >
          <HelpCircle size={14} />
          <span>Zero-Learning Usability</span>
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === 'pricing'
              ? 'bg-gradient-to-r from-[#3A86FF] to-[#A855F7] text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#121D36]'
          }`}
        >
          <Crown size={14} />
          <span>Commercial Buyout Tiers</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === 'terms'
              ? 'bg-[#5BC0BE] text-[#070B14] shadow-md glow-mint'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#121D36]'
          }`}
        >
          <FileText size={14} />
          <span>SLA, Legal & Guidelines</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* TAB 1: FEATURE & SCENARIO PITCH MATRIX */}
        {activeTab === 'scenarios' && (
          <div className="space-y-6">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap font-mono text-[11px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedScenarioFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    selectedScenarioFilter === cat
                      ? 'bg-[#5BC0BE]/20 text-[#6FFFE9] border-[#5BC0BE] font-bold'
                      : 'bg-[#0D1527] text-slate-400 border-[#1E2D4D] hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Scenario Cards */}
            <div className="space-y-5">
              {filteredScenarios.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4D] hover:border-[#5BC0BE]/60 transition-all space-y-4 shadow-lg group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#121D36] border border-[#2A4374] flex items-center justify-center text-[#5BC0BE] group-hover:scale-105 transition-transform shrink-0">
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border inline-block mb-1 ${item.badgeColor}`}>
                            {item.category}
                          </span>
                          <h4 className="text-white text-base font-bold font-sans group-hover:text-[#6FFFE9] transition-colors">
                            {item.featureTitle}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Feature Description */}
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {item.description}
                    </p>

                    {/* Real-World Scenario Block */}
                    <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1 font-sans">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400">
                        <ShieldAlert size={14} />
                        <span>Real-World Warehouse Problem / Scenario:</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{item.realWorldScenario}"
                      </p>
                    </div>

                    {/* How OmniStock Resolves It */}
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-1 font-sans">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
                        <CheckCircle2 size={14} />
                        <span>How OmniStock Resolves It:</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {item.howOmniStockResolves}
                      </p>
                    </div>

                    {/* Enterprise Impact Badge */}
                    <div className="pt-2 border-t border-[#1E2D4D] flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 font-sans">Operational ROI:</span>
                      <span className="text-[#6FFFE9] font-bold">{item.enterpriseImpact}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: SECURITY & GOVERNANCE DEEP DIVE */}
        {activeTab === 'security' && (
          <div className="space-y-6 font-sans">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/30 to-[#0D1527] border border-purple-800/50 space-y-2">
              <h4 className="text-base font-bold text-purple-300 flex items-center gap-2">
                <Lock size={18} />
                Multi-Layer Warehouse Security & Anti-Fraud Shield
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                OmniStock implements strict separation of duties and automated fraud detection algorithms to prevent both accidental warehouse layout destruction and intentional inventory shrinkage.
              </p>
            </div>

            {/* Defense Mechanisms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-mono font-bold">
                  <ShieldAlert size={16} />
                  <span>1. Non-Empty Deletion Lock</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Racks holding inventory (<code className="text-[#6FFFE9] bg-[#121D36] px-1 py-0.5 rounded">quantity &gt; 0</code>) cannot be deleted. The system halts the action, presents unit counts, and forces stock transfer first.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-mono font-bold">
                  <EyeOff size={16} />
                  <span>2. Blind Cycle Counting</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Auditors on the warehouse floor are not shown system expected numbers. They must physically count and enter quantities, preventing fake matching counts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                  <Camera size={16} />
                  <span>3. Live Watermarked Photos</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Damaged or low-stock reports require live camera capture with device timestamp watermarking, preventing employees from uploading recycled stock photos.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold">
                  <Lock size={16} />
                  <span>4. Variance Escrow Lock</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Inventory adjustments exceeding 5% or $500 value are held in Escrow and require secondary supervisor approval before writing off the balance.
                </p>
              </div>
            </div>

            {/* Reconciliation Formula Banner */}
            <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] font-mono text-xs space-y-2">
              <span className="text-[#5BC0BE] font-bold block">MATHEMATICAL INBOUND-TO-OUTBOUND RECONCILIATION</span>
              <div className="p-3 bg-[#070B14] rounded-lg border border-[#1E2D4D] text-slate-200">
                Opening Balance (1,000) + Inbound (0) - Dispatched (0) = <strong className="text-emerald-400">Expected 1,000 Units</strong>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Even if someone zeroes a bin, the system balance reconciliation immediately flags an internal loss investigation report tying the discrepancy to the logged terminal ID.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: ERGONOMICS & USABILITY */}
        {activeTab === 'ergonomics' && (
          <div className="space-y-6 font-sans">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/30 to-[#0D1527] border border-blue-800/50 space-y-2">
              <h4 className="text-base font-bold text-blue-300 flex items-center gap-2">
                <HelpCircle size={18} />
                Designed for Non-Technical & Elderly Frontline Staff
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                OmniStock eliminates the steep learning curve of legacy ERPs through visual grocery icons, point-and-click drawers, and zero tab switching.
              </p>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-1.5">
                <h5 className="font-bold text-white font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5BC0BE]"></span>
                  1. Zero Tab-Switching Architecture
                </h5>
                <p className="text-slate-300 leading-relaxed">
                  Workers never get lost across confusing browser tabs. The stock manifest, bin inspection details, forklift transfers, and aisle signage editors all slide in effortlessly as right-side drawers over the CAD blueprint.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-1.5">
                <h5 className="font-bold text-white font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  2. Visual Iconography & High-Contrast Typography
                </h5>
                <p className="text-slate-300 leading-relaxed">
                  Instead of cryptic database IDs, bays display colorful visual emojis (💊, 🥫, ⚡, 🧰) and high-contrast color pills (Green = Class A Fast, Blue = Standard, Purple = Hazmat) that anyone can understand instantly.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-1.5">
                <h5 className="font-bold text-white font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  3. Embedded "Purpose" and "How to Use" Tooltips
                </h5>
                <p className="text-slate-300 leading-relaxed">
                  Every button and control features a plain-English tooltip explaining its exact business purpose and how to execute it, eliminating the need for bulky paper manuals.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMMERCIAL BUYOUT TIERS */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
              {/* Tier 1: On-Premise */}
              <div className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4D] hover:border-[#5BC0BE] transition-all flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                    <Server size={18} />
                  </div>
                  <span className="text-xs text-slate-400 font-bold block">TIER 1 • CORE</span>
                  <h4 className="text-white text-base font-bold">Self-Hosted On-Prem</h4>
                  <div className="mt-2 text-2xl font-bold text-[#5BC0BE]">$18,500</div>
                  <span className="text-[10px] text-slate-500 block">One-time buyout • Zero recurring fees</span>

                  <ul className="mt-4 space-y-2 text-[11px] text-slate-300 font-sans">
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Full Docker & K8s Container</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Unlimited Handheld Users</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Local P2P Cluster Sync</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> 1-Year Security Updates</li>
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectTier('Tier 1: On-Premise', '$18,500')}
                  className="w-full bg-[#121D36] hover:bg-[#1E2D4D] border border-[#2A4374] text-slate-200 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5"
                >
                  <CreditCard size={14} className="text-[#5BC0BE]" />
                  <span>Deploy On-Prem</span>
                </button>
              </div>

              {/* Tier 2: Enterprise White-Label */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#121D36] to-[#0D1527] border-2 border-[#5BC0BE] relative flex flex-col justify-between space-y-4 shadow-xl glow-mint">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5BC0BE] text-[#070B14] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Most Popular for 3PLs
                </span>

                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#5BC0BE]/20 text-[#5BC0BE] flex items-center justify-center mb-3">
                    <Globe size={18} />
                  </div>
                  <span className="text-xs text-[#5BC0BE] font-bold block">TIER 2 • 3PL NETWORK</span>
                  <h4 className="text-white text-base font-bold">White-Label Enterprise</h4>
                  <div className="mt-2 text-2xl font-bold text-white">$35,000</div>
                  <span className="text-[10px] text-slate-400 block">Complete Re-branding & Multi-Tenant</span>

                  <ul className="mt-4 space-y-2 text-[11px] text-slate-200 font-sans">
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Custom Domain & Branding</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> 3PL Multi-Client Portals</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Spatial CAD 3D Twin Modules</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Dedicated SLA & Onboarding</li>
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectTier('Tier 2: White-Label', '$35,000')}
                  className="w-full bg-gradient-to-r from-[#5BC0BE] to-[#3A86FF] hover:opacity-90 text-[#070B14] py-2.5 rounded-xl font-bold transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Sparkles size={14} />
                  <span>Acquire White-Label</span>
                </button>
              </div>

              {/* Tier 3: 100% Commercial IP Buyout */}
              <div className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4D] hover:border-purple-500 transition-all flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                    <Crown size={18} />
                  </div>
                  <span className="text-xs text-purple-400 font-bold block">TIER 3 • FULL IP</span>
                  <h4 className="text-white text-base font-bold">100% Commercial IP</h4>
                  <div className="mt-2 text-2xl font-bold text-purple-300">$65,000</div>
                  <span className="text-[10px] text-slate-500 block">Full source code & resell rights</span>

                  <ul className="mt-4 space-y-2 text-[11px] text-slate-300 font-sans">
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> 100% Source Code Ownership</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Unrestricted Resell & Sub-licensing</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> AI Slotting & Eulerian Engine Core</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Direct Engineer Consultation</li>
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectTier('Tier 3: IP Buyout', '$65,000')}
                  className="w-full bg-[#121D36] hover:bg-[#1E2D4D] border border-purple-800 text-purple-200 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5"
                >
                  <Code2 size={14} className="text-purple-400" />
                  <span>Acquire Full IP</span>
                </button>
              </div>
            </div>

            {/* Direct Sales & Consultation Banner */}
            <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[#5BC0BE] shrink-0" />
                <div>
                  <span className="text-white font-bold block">Need Custom WMS Integration or NetSuite Connector?</span>
                  <span className="text-[11px] text-slate-400 font-sans">Our solutions engineering team can deploy and migrate your warehouse within 72 hours.</span>
                </div>
              </div>
              <button
                onClick={handleContactSales}
                className="px-4 py-2 bg-[#121D36] hover:bg-[#1E2D4D] border border-[#5BC0BE]/40 text-[#6FFFE9] rounded-xl font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <span>Contact Lead Architect</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: ENTERPRISE SLA, TERMS & LEGAL GUIDELINES */}
        {activeTab === 'terms' && (
          <div className="space-y-6 font-sans text-xs">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-[#0D1527] border border-emerald-800/50 space-y-2">
              <h4 className="text-base font-bold text-emerald-300 flex items-center gap-2 font-mono">
                <Scale size={18} />
                Master Licensing Agreement & Operational Guidelines
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Clear contractual boundaries, infrastructure responsibilities, 72-hour onboarding commitments, and liability protections for both the enterprise client and the software vendor.
              </p>
            </div>

            {/* Responsibility Matrix */}
            <div className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4D] space-y-4">
              <h5 className="font-mono font-bold text-white text-sm flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#5BC0BE]" />
                Division of Responsibility Matrix (Vendor vs. Client)
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                {/* Vendor Responsibility */}
                <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E2D4D] space-y-2">
                  <span className="font-mono font-bold text-[#5BC0BE] block">VENDOR OBLIGATIONS (OmniStock Team)</span>
                  <ul className="space-y-1.5 text-slate-300 text-[11px]">
                    <li className="flex items-start gap-1.5">
                      <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>Delivery of pre-compiled, tested Docker container & source code.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>72-Hour Rapid Onboarding: Lead engineer assistance for Master SKU import and spatial CAD mapping.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>1-Year Core Maintenance & Security Patches against critical vulnerabilities.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>Zero recurring per-user fees or unexpected license lockouts.</span>
                    </li>
                  </ul>
                </div>

                {/* Client Responsibility */}
                <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E2D4D] space-y-2">
                  <span className="font-mono font-bold text-amber-400 block">CLIENT OBLIGATIONS (Warehouse Owner)</span>
                  <ul className="space-y-1.5 text-slate-300 text-[11px]">
                    <li className="flex items-start gap-1.5">
                      <AlertCircle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>Physical Infrastructure: Wi-Fi network coverage and local server hardware upkeep.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <AlertCircle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>Hardware Maintenance: Provisioning of handheld barcode guns and barcode label stock.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <AlertCircle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>Physical Safety & Operations: Forklift traffic management and OSHA compliance on the floor.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <AlertCircle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>Data Backup: Routine local database snapshots on on-premise deployments.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Legal Liability & Safety Disclaimers */}
            <div className="space-y-3 font-sans">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1.5">
                <div className="flex items-center gap-2 font-mono font-bold text-rose-400">
                  <ShieldAlert size={16} />
                  <span>Limitation of Liability & Physical Inventory Disclaimer</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  OmniStock provides digital spatial tracking, ledger calculations, and route optimization. Physical inventory accuracy, shrinkage prevention, and onsite physical security remain the operational responsibility of the client's certified inventory managers. The software vendor is not liable for physical goods damage, forklift collisions, or physical theft outside digital audit controls.
                </p>
              </div>

              {/* Tiered Refund Policy Card */}
              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-3 font-sans">
                <div className="flex items-center gap-2 font-mono font-bold text-amber-300">
                  <Scale size={16} />
                  <span>7-Day 100% Guarantee & 30-Day Tiered Refund Policy</span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>
                    <strong className="text-emerald-400 font-mono">1. Days 1 – 7 (Grace Period):</strong> Clients may request a <strong className="text-white">100% Full Refund</strong> within seven (7) calendar days of initial purchase with zero penalties or deductions.
                  </p>
                  <p>
                    <strong className="text-amber-400 font-mono">2. Days 8 – 30 (Post-Onboarding Phase):</strong> Refund requests submitted between Day 8 and Day 30 are eligible for a <strong className="text-white">90% refund of the total purchase price</strong>. A 10% non-refundable retainer fee is retained to cover:
                  </p>
                  <ul className="pl-4 space-y-1 text-slate-300 list-disc text-[10px]">
                    <li><strong>Dedicated Technical Labor Incurred:</strong> Solutions engineering hours already spent on Master SKU schema conversion, CAD floorplan drafting, and scanner calibration.</li>
                    <li><strong>Non-Refundable Gateway & Banking Fees:</strong> Merchant interchange fees and SWIFT wire surcharges deducted by payment processors that cannot be clawed back.</li>
                    <li><strong>Digital IP Delivery & License Revocation:</strong> Administrative overhead for cryptographic key blacklisting and software certificate de-authorization.</li>
                    <li><strong>Infrastructure De-provisioning:</strong> Secure data scrubbing and container registry decommissioning procedures.</li>
                  </ul>
                  <p>
                    <strong className="text-rose-400 font-mono">3. Beyond Day 30:</strong> All commercial buyout licenses and software deliveries are deemed final and non-refundable following thirty (30) days of production deployment.
                  </p>
                </div>
              </div>

              {/* Direct B2B Bank Wire / Corporate Transfer Option */}
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-2 font-sans">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono font-bold text-blue-300">
                    <CreditCard size={16} />
                    <span>Direct B2B Corporate Wire & Bank Transfer (0% Gateway Surcharge)</span>
                  </div>
                  <span className="text-[9px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
                    VERIFIED PRIMARY
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Enterprise clients executing high-value buyouts ($18.5k–$65k) can bypass third-party payment gateway transaction fees (2.9%–4.5%) via direct corporate bank wire transfer.
                </p>
                <div className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E2D4D] font-mono text-[11px] text-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-400 block text-[9px]">BENEFICIARY ACCOUNT / RAILS:</span>
                    <span className="font-bold text-[#6FFFE9]">005790246533 • BDO / BPI / UnionBank / SWIFT</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('005790246533');
                      alert('Beneficiary account number (005790246533) copied to clipboard!');
                    }}
                    className="px-2.5 py-1 bg-[#121D36] hover:bg-[#1E2D4D] border border-[#2A4374] text-[#6FFFE9] rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                  >
                    Copy Account No.
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-1.5">
                <div className="flex items-center gap-2 font-mono font-bold text-[#6FFFE9]">
                  <Lock size={16} />
                  <span>100% Client Data Ownership & Anti-Telemetry Guarantee</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  All inventory balances, SKU costs, lot numbers, customer orders, and 3PL client rates belong exclusively to the purchasing enterprise. On-premise installations run 100% air-gapped with zero telemetry data transmitted to external third-party advertisers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-1.5">
                <div className="flex items-center gap-2 font-mono font-bold text-purple-400">
                  <Code2 size={16} />
                  <span>IP Buyout & Sub-Licensing Rights (Tier 3)</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Upon full settlement of the Tier 3 Commercial Buyout ($65,000), full copyright and source code intellectual property are assigned to the buyer with unrestricted rights to modify, white-label, embed, and resell to third-party commercial clients globally without royalty encumbrances.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="h-14 border-t border-[#1E2D4D] bg-[#0D1527] px-6 flex items-center justify-between shrink-0 font-mono text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span>SOC-2 Ready • P2P Mesh Synchronization • 100% Offline Capable</span>
        </div>
        <button
          onClick={handleContactSales}
          className="text-[#6FFFE9] hover:underline font-bold cursor-pointer"
        >
          Request Enterprise Demo ➔
        </button>
      </div>
    </div>
  );
};

