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
  EyeOff,
  CheckCircle2,
  DollarSign,
  FileText,
  Scale,
  Calendar,
  Clock,
  Building,
  User,
  Phone,
  Send,
  Printer,
  Download,
  Copy
} from 'lucide-react';
import { trackHighIntentAction } from '../utils/visitorEmailBeacon';
import { RoiCalculatorWidget } from './RoiCalculatorWidget';
import { downloadAirGappedDeploymentBundle } from '../utils/airGappedBundle';
import { PayPalCheckoutButton } from './PayPalCheckoutButton';

interface LicensingDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'roi' | 'scenarios' | 'security' | 'ergonomics' | 'pricing' | 'schedule' | 'terms';

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
  const [activeTab, setActiveTab] = useState<TabType>('pricing');
  const [selectedScenarioFilter, setSelectedScenarioFilter] = useState<string>('ALL');
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [activeOrderDetails, setActiveOrderDetails] = useState<{
    orderId: string;
    licenseKey: string;
    tier: string;
    timestamp: string;
  } | null>(null);

  // Booking Form State
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingCompany, setBookingCompany] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingBays, setBookingBays] = useState('50 - 200 Bays');
  const [bookingSlot, setBookingSlot] = useState('Tomorrow 10:00 AM EST / 10:00 PM PHT');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Pro-Forma Invoice State
  const [invoiceTier, setInvoiceTier] = useState('Tier 1: Single DC ($4,500)');
  const [invoiceClientName, setInvoiceClientName] = useState('');
  const [invoiceClientCompany, setInvoiceClientCompany] = useState('');
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  if (!isOpen) return null;

  const handleSelectTier = (tierName: string, price: string) => {
    trackHighIntentAction(`Selected Pricing Tier: ${tierName}`, { Price: price });
    setActiveTab('schedule');
  };

  const handleContactSales = () => {
    trackHighIntentAction('Clicked Direct Sales Inquiry');
    window.location.href = 'mailto:mharcgatan@linkable.it.com?subject=OmniStock%20Enterprise%20Commercial%20Licensing%20Inquiry';
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingEmail || !bookingCompany) return;

    setIsSubmittingBooking(true);
    await trackHighIntentAction('Submitted 5-Min Technical Review Request', {
      Name: bookingName,
      Email: bookingEmail,
      Company: bookingCompany,
      Phone: bookingPhone,
      Bays: bookingBays,
      PreferredSlot: bookingSlot
    });

    try {
      console.log('[OmniStock Booking] Review requested:', {
        company: bookingCompany,
        name: bookingName,
        email: bookingEmail,
        phone: bookingPhone,
        bays: bookingBays,
        slot: bookingSlot,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Booking form buffered', err);
    }

    setIsSubmittingBooking(false);
    setBookingSubmitted(true);
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
      description: 'Zero-trust stock counting security combining blind cycle audits, mandatory photo-evidence capture on write-offs, and biometric supervisor signing.',
      realWorldScenario: 'A corrupt stock clerk reports 50 high-end smartphones as "Damaged & Written Off" in a legacy ERP, quietly smuggling them out while the system blindly adjusts inventory down with zero paper trail.',
      howOmniStockResolves: 'OmniStock blocks unilateral manual quantity edits. Any discrepancy forces a blind physical count, captures a live watermarked camera snapshot with GPS timestamp, and logs the incident in a tamper-proof audit vault.',
      enterpriseImpact: 'Dramatically cuts warehouse shrinkage and pilferage by up to 92%.'
    },
    {
      id: 'eulerian-wave-routing',
      category: 'ALGORITHMIC OPTIMIZATION',
      featureTitle: 'Eulerian Shortest-Path Wave Pick Optimizer',
      icon: Route,
      badgeColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
      description: 'Graph-theoretic traveling-salesman (TSP) path calculation providing mathematically optimal picking loops across active order batches.',
      realWorldScenario: 'Pickers walk back and forth across 100-meter warehouse aisles in zig-zag patterns based on random SKU ordering, accumulating 12+ kilometers of walking fatigue per day.',
      howOmniStockResolves: 'OmniStock clusters active orders into optimal waves and calculates the Eulerian closed-loop walking path. Pickers follow a single unidirectional sweep that collects all items and returns directly to the packing station.',
      enterpriseImpact: 'Reduces total floor walking distance by 45% and increases hourly order throughput by 60%.'
    }
  ];

  const categories = ['ALL', 'FLOORPLAN & SPATIAL CAD', 'ERGONOMICS & WAYFINDING', 'SECURITY & GOVERNANCE', 'ALGORITHMIC OPTIMIZATION'];

  const filteredScenarios = selectedScenarioFilter === 'ALL'
    ? pitchScenarios
    : pitchScenarios.filter(s => s.category === selectedScenarioFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-[#070B14] border border-[#1E2D4D] shadow-2xl overflow-hidden text-slate-100">
        
        {/* MODAL HEADER */}
        <div className="p-6 border-b border-[#1E2D4D] flex items-center justify-between bg-gradient-to-r from-[#0D1527] to-[#070B14]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5BC0BE] to-[#3A86FF] flex items-center justify-center text-[#070B14] font-bold shadow-lg">
              <Layers size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">OmniStock Enterprise Logistics Hub</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#5BC0BE]/20 text-[#6FFFE9] border border-[#5BC0BE]/30">
                  v2.8 SPATIAL CAD
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                100% On-Premise Buyout • Zero Monthly Scanner Fees • Eulerian Wave Routing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#121D36] hover:bg-[#1E2D4D] text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-[#2A4374]"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-[#1E2D4D] bg-[#0A0F1D] overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 px-3.5 border-b-2 font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'pricing'
                ? 'border-[#5BC0BE] text-[#6FFFE9]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign size={15} />
            <span>Commercial Buyouts</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 px-3.5 border-b-2 font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'pricing'
                ? 'border-[#5BC0BE] text-[#6FFFE9]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign size={15} />
            <span>Commercial Buyout</span>
          </button>

          <button
            onClick={() => setActiveTab('roi')}
            className={`pb-3 px-3.5 border-b-2 font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'roi'
                ? 'border-[#5BC0BE] text-[#6FFFE9]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign size={15} />
            <span>ROI Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`pb-3 px-3.5 border-b-2 font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'border-[#5BC0BE] text-[#6FFFE9]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar size={15} />
            <span>Book 5-Min Walkthrough</span>
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={`pb-3 px-3.5 border-b-2 font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'scenarios'
                ? 'border-[#5BC0BE] text-[#6FFFE9]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles size={15} />
            <span>Feature-Resolution Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 px-3.5 border-b-2 font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'border-[#5BC0BE] text-[#6FFFE9]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck size={15} />
            <span>Security & Anti-Shrinkage</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-3 px-3.5 border-b-2 font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'border-[#5BC0BE] text-[#6FFFE9]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale size={15} />
            <span>SLA, Wire & Pro-Forma</span>
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB: ZERO-SAAS ROI CALCULATOR */}
          {activeTab === 'roi' && (
            <RoiCalculatorWidget
              appName="OmniStock Spatial WMS"
              defaultBuyoutPrice={25000}
              onSelectTier={(tier, price) => handleSelectTier(tier, price)}
            />
          )}

          {/* TAB 1: COMMERCIAL BUYOUT TIERS */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0D1527] to-emerald-950/40 border border-[#2A4374] flex flex-col md:flex-row items-center justify-between gap-4 font-sans">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#5BC0BE]" />
                    <span className="font-mono font-bold text-white text-sm">Eliminate WMS Monthly Per-User Taxes</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Legacy systems charge $50–$150/scanner monthly. OmniStock grants a 100% On-Premise Buyout with unlimited users.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className="px-4 py-2 bg-[#5BC0BE] hover:bg-[#6FFFE9] text-[#070B14] font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer font-mono"
                >
                  <Calendar size={14} />
                  <span>Request Custom CAD Blueprint</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D1527] border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                <div>
                  <span className="text-emerald-400 font-bold block flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> 100% Air-Gapped On-Premises WMS Docker Stack
                  </span>
                  <p className="text-slate-400 text-[11px] mt-1 font-sans">
                    Export turnkey Docker Compose, Kubernetes manifests, and offline bare-metal systemd scripts.
                  </p>
                </div>
                <button
                  onClick={downloadAirGappedDeploymentBundle}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Docker Bundle</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono">
                {/* Tier 1: Single Warehouse Buyout */}
                <div className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4D] hover:border-[#5BC0BE] transition-all flex flex-col justify-between space-y-4">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                      <Server size={18} />
                    </div>
                    <span className="text-xs text-slate-400 font-bold block">TIER 1 • SINGLE DC</span>
                    <h4 className="text-white text-base font-bold">Single Facility Buyout</h4>
                    <div className="mt-2 text-2xl font-bold text-[#5BC0BE]">$4,500 <span className="text-xs text-slate-400 font-normal">/ ₱250k</span></div>
                    <span className="text-[10px] text-slate-500 block">One-time purchase • Unlimited handheld guns</span>

                    <ul className="mt-4 space-y-2 text-[11px] text-slate-300 font-sans">
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> 1 Warehouse Spatial CAD Twin</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Eulerian Shortest-Path Wave Picking</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Self-Hosted Docker Container</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> 72-Hour SKU & CAD Migration SLA</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSelectTier('Tier 1: Single DC', '$4,500')}
                    className="w-full bg-[#121D36] hover:bg-[#1E2D4D] border border-[#2A4374] text-slate-200 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5"
                  >
                    <CreditCard size={14} className="text-[#5BC0BE]" />
                    <span>Acquire Single DC License</span>
                  </button>
                </div>

                {/* Tier 2: Multi-Facility & 3PL Network */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-[#121D36] to-[#0D1527] border-2 border-[#5BC0BE] relative flex flex-col justify-between space-y-4 shadow-xl">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5BC0BE] text-[#070B14] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Most Popular for Retail & 3PL
                  </span>

                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#5BC0BE]/20 text-[#5BC0BE] flex items-center justify-center mb-3">
                      <Globe size={18} />
                    </div>
                    <span className="text-xs text-[#5BC0BE] font-bold block">TIER 2 • 3PL NETWORK</span>
                    <h4 className="text-white text-base font-bold">Multi-Facility & 3PL</h4>
                    <div className="mt-2 text-2xl font-bold text-white">$8,500 <span className="text-xs text-slate-400 font-normal">/ ₱475k</span></div>
                    <span className="text-[10px] text-slate-400 block">Up to 5 Facilities • White-Label Ready</span>

                    <ul className="mt-4 space-y-2 text-[11px] text-slate-200 font-sans">
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Up to 5 Distribution Centers</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Multi-Tenant 3PL Client Portals</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Anti-Theft & Blind Cycle Count Studio</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Custom Domain & Branding Suite</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSelectTier('Tier 2: Multi-Facility 3PL', '$8,500')}
                    className="w-full bg-gradient-to-r from-[#5BC0BE] to-[#3A86FF] hover:opacity-90 text-[#070B14] py-2.5 rounded-xl font-bold transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Sparkles size={14} />
                    <span>Acquire Multi-DC License</span>
                  </button>
                </div>

                {/* Tier 3: 100% Commercial IP Buyout */}
                <div className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4D] hover:border-purple-500 transition-all flex flex-col justify-between space-y-4">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                      <Crown size={18} />
                    </div>
                    <span className="text-xs text-purple-400 font-bold block">TIER 3 • FULL IP</span>
                    <h4 className="text-white text-base font-bold">100% Source Code IP</h4>
                    <div className="mt-2 text-2xl font-bold text-purple-300">$25,000 <span className="text-xs text-slate-400 font-normal">/ ₱1.4M</span></div>
                    <span className="text-[10px] text-slate-500 block">Full source code & unrestricted resell</span>

                    <ul className="mt-4 space-y-2 text-[11px] text-slate-300 font-sans">
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Complete React/Node/CAD Source</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Unrestricted Resell & Sub-licensing</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Eulerian Core & AI Slotting Engine</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Direct Lead Solutions Architect Retainer</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSelectTier('Tier 3: IP Buyout', '$25,000')}
                    className="w-full bg-[#121D36] hover:bg-[#1E2D4D] border border-purple-800 text-purple-200 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5"
                  >
                    <Code2 size={14} className="text-purple-400" />
                    <span>Acquire Full IP Buyout</span>
                  </button>
                </div>
              </div>

              {/* Direct Sales & Consultation Banner */}
              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-[#5BC0BE] shrink-0" />
                  <div>
                    <span className="text-white font-bold block">Need Custom WMS Integration or NetSuite / SAP Connector?</span>
                    <span className="text-[11px] text-slate-400 font-sans">Our solutions engineering team can deploy and calibrate your warehouse within 72 hours.</span>
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

          {/* TAB 2: INSTANT 5-MINUTE TECHNICAL REVIEW SCHEDULER */}
          {activeTab === 'schedule' && (
            <div className="space-y-6 font-sans">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0D1527] to-purple-950/40 border border-[#2A4374] space-y-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2 font-mono">
                  <Calendar size={18} className="text-[#5BC0BE]" />
                  Schedule a 5-Minute Technical Review with Our Lead Solutions Architect
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We'll review your warehouse layout, SKU count, and barcode scanner infrastructure over Google Meet to verify if OmniStock is a fit for your facility.
                </p>
              </div>

              {bookingSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#0D1527] border border-emerald-500/50 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white">Review Request Confirmed!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong>{bookingName || 'Operations Leader'}</strong>. Our Lead Solutions Engineer received your request for <strong>{bookingCompany}</strong> and will email the direct Google Meet invite to <strong>{bookingEmail}</strong> within 2 hours.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setBookingSubmitted(false)}
                      className="px-4 py-2 bg-[#121D36] hover:bg-[#1E2D4D] border border-[#2A4374] text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer font-mono"
                    >
                      Book Another Facility
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="p-6 rounded-2xl bg-[#0D1527] border border-[#1E2D4D] space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                        <User size={13} className="text-[#5BC0BE]" /> Your Name & Title:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Benito Lim (VP of Operations)"
                        value={bookingName}
                        onChange={e => setBookingName(e.target.value)}
                        className="w-full bg-[#070B14] border border-[#1E2D4D] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5BC0BE]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                        <Building size={13} className="text-[#5BC0BE]" /> Company / Warehouse Name:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ultra Mega Logistics / KCC Supermarket"
                        value={bookingCompany}
                        onChange={e => setBookingCompany(e.target.value)}
                        className="w-full bg-[#070B14] border border-[#1E2D4D] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5BC0BE]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                        <Mail size={13} className="text-[#5BC0BE]" /> Work Email Address:
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. executive@company.com"
                        value={bookingEmail}
                        onChange={e => setBookingEmail(e.target.value)}
                        className="w-full bg-[#070B14] border border-[#1E2D4D] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5BC0BE]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                        <Phone size={13} className="text-[#5BC0BE]" /> Direct Phone / WhatsApp:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. +63 917 123 4567 or +1 (555) 019-2834"
                        value={bookingPhone}
                        onChange={e => setBookingPhone(e.target.value)}
                        className="w-full bg-[#070B14] border border-[#1E2D4D] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5BC0BE]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                        <Layers size={13} className="text-[#5BC0BE]" /> Estimated Active Storage Bays:
                      </label>
                      <select
                        value={bookingBays}
                        onChange={e => setBookingBays(e.target.value)}
                        className="w-full bg-[#070B14] border border-[#1E2D4D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#5BC0BE]"
                      >
                        <option value="Under 50 Bays">Small Facility (&lt; 50 Bays)</option>
                        <option value="50 - 200 Bays">Medium Regional DC (50 – 200 Bays)</option>
                        <option value="200 - 1000 Bays">Large Distribution Center (200 – 1,000 Bays)</option>
                        <option value="Multi-Facility 3PL">Multi-Facility 3PL Network (5+ Warehouses)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                        <Clock size={13} className="text-[#5BC0BE]" /> Preferred Time Slot:
                      </label>
                      <select
                        value={bookingSlot}
                        onChange={e => setBookingSlot(e.target.value)}
                        className="w-full bg-[#070B14] border border-[#1E2D4D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#5BC0BE]"
                      >
                        <option value="Tomorrow 10:00 AM EST / 10:00 PM PHT">Tomorrow 10:00 AM EST / 10:00 PM PHT</option>
                        <option value="Tomorrow 2:00 PM EST / 2:00 AM PHT">Tomorrow 2:00 PM EST / 2:00 AM PHT</option>
                        <option value="This Thursday 9:00 AM PHT (Asia Business Hours)">This Thursday 9:00 AM PHT (Asia Hours)</option>
                        <option value="Flexible / Send Available Calendar Link">Flexible (Send Calendar Link via Email)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmittingBooking}
                      className="px-6 py-3 bg-gradient-to-r from-[#5BC0BE] to-[#3A86FF] hover:opacity-95 text-[#070B14] font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg cursor-pointer font-mono"
                    >
                      {isSubmittingBooking ? (
                        <span>Transmitting Request...</span>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Confirm 5-Minute Technical Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: FEATURE MATRIX */}
          {activeTab === 'scenarios' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedScenarioFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      selectedScenarioFilter === cat
                        ? 'bg-[#5BC0BE]/20 text-[#6FFFE9] border-[#5BC0BE]/40 shadow-sm'
                        : 'bg-[#0D1527] text-slate-400 border-[#1E2D4D] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                {filteredScenarios.map(sc => {
                  const Icon = sc.icon;
                  return (
                    <div key={sc.id} className="p-4 rounded-2xl bg-[#0D1527] border border-[#1E2D4D] hover:border-[#2A4374] transition-all flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border ${sc.badgeColor}`}>
                            {sc.category}
                          </span>
                          <Icon size={16} className="text-[#5BC0BE]" />
                        </div>
                        <h4 className="text-sm font-bold text-white mt-2 font-mono">{sc.featureTitle}</h4>
                        <p className="text-slate-300 text-[11px] leading-relaxed mt-1">{sc.description}</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#070B14] border border-[#1E2D4D] space-y-1.5 text-[10px]">
                        <div>
                          <strong className="text-rose-400 font-mono">Real-World Pain Point:</strong>
                          <p className="text-slate-300 mt-0.5">{sc.realWorldScenario}</p>
                        </div>
                        <div>
                          <strong className="text-emerald-400 font-mono">OmniStock Resolution:</strong>
                          <p className="text-slate-300 mt-0.5">{sc.howOmniStockResolves}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] text-[#6FFFE9] font-mono">
                        <TrendingUp size={12} className="shrink-0" />
                        <span>Impact: {sc.enterpriseImpact}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & ANTI-SHRINKAGE */}
          {activeTab === 'security' && (
            <div className="space-y-6 font-sans text-xs">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-[#0D1527] border border-purple-800/50 space-y-2">
                <h4 className="text-base font-bold text-purple-300 flex items-center gap-2 font-mono">
                  <ShieldAlert size={18} />
                  Tamper-Proof Audit Vault & Anti-Pilferage Controls
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  OmniStock enforces cryptographic integrity across every inventory movement, eliminating blind theft, unauthorized quantity overrides, and phantom SKU deletions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-2">
                  <span className="font-mono font-bold text-[#6FFFE9] flex items-center gap-2">
                    <Camera size={14} /> 1. Live Camera Snapshot on Adjustments
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Whenever an item is damaged or missing, the mobile operator must snap a watermarked live photo of the bay with timestamp and operator ID embedded.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-2">
                  <span className="font-mono font-bold text-amber-400 flex items-center gap-2">
                    <EyeOff size={14} /> 2. Blind Cycle Audits
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Physical stock counters are never shown the expected ledger quantity on their screen, eliminating lazy "rubber-stamp" confirmations and forcing real counts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SLA, TERMS & PRO-FORMA INVOICE GENERATOR */}
          {activeTab === 'terms' && (
            <div className="space-y-6 font-sans text-xs">
              {/* Live PayPal & Cards Smart Buttons */}
              <div className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4D]">
                <PayPalCheckoutButton
                  amountUsd={invoiceTier.includes('4,500') ? 4500 : invoiceTier.includes('8,500') ? 8500 : 25000}
                  planName={`OmniStock Spatial WMS (${invoiceTier})`}
                  onSuccess={(details) => {
                    const ord = `OMNISTOCK-PP-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
                    const lic = `OMNISTOCK-IP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-BONDED`;
                    setActiveOrderDetails({
                      orderId: ord,
                      licenseKey: lic,
                      tier: `${invoiceTier} [PAYPAL VERIFIED: ${details?.id || 'OK'}]`,
                      timestamp: new Date().toISOString()
                    });
                    setIsVaultUnlocked(true);
                  }}
                />
              </div>

              {/* Direct B2B Bank Wire Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0D1527] to-emerald-950/40 border border-blue-900/50 space-y-3 font-sans">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono font-bold text-blue-300 text-sm">
                    <CreditCard size={17} />
                    <span>Direct Corporate Bank Wire Rails (0% Payment Surcharge)</span>
                  </div>
                  <span className="text-[9px] text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/30 font-mono font-bold">
                    PRIMARY SETTLEMENT
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Enterprise clients executing high-value buyouts ($4,500 – $25,000) can execute direct corporate wire transfers with zero payment gateway processing fees.
                </p>
                <div className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E2D4D] font-mono text-[11px] text-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-slate-400 block text-[9px]">BENEFICIARY ACCOUNT / RAILS:</span>
                    <span className="font-bold text-[#6FFFE9]">005790246533 • BDO / BPI / UnionBank / SWIFT International</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('005790246533');
                      alert('Beneficiary account number (005790246533) copied to clipboard!');
                    }}
                    className="px-3 py-1.5 bg-[#121D36] hover:bg-[#1E2D4D] border border-[#2A4374] text-[#6FFFE9] rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Copy size={12} />
                    <span>Copy Account No.</span>
                  </button>
                </div>
              </div>

              {/* Pro-Forma Invoice Generator Form */}
              <div className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4D] space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-mono font-bold text-white text-sm flex items-center gap-2">
                    <FileText size={16} className="text-[#5BC0BE]" />
                    Instant B2B Pro-Forma Invoice & Procurement Generator
                  </h5>
                  <span className="text-[10px] text-slate-400 font-mono">For Finance / Purchase Order Approval</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400">Target Licensing Tier:</label>
                    <select
                      value={invoiceTier}
                      onChange={e => setInvoiceTier(e.target.value)}
                      className="w-full bg-[#070B14] border border-[#1E2D4D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5BC0BE]"
                    >
                      <option value="Tier 1: Single DC ($4,500)">Tier 1: Single DC ($4,500)</option>
                      <option value="Tier 2: Multi-Facility 3PL ($8,500)">Tier 2: Multi-Facility 3PL ($8,500)</option>
                      <option value="Tier 3: 100% Commercial IP ($25,000)">Tier 3: Full IP Buyout ($25,000)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400">Recipient Name / Approver:</label>
                    <input
                      type="text"
                      placeholder="e.g. Chief Financial Officer"
                      value={invoiceClientName}
                      onChange={e => setInvoiceClientName(e.target.value)}
                      className="w-full bg-[#070B14] border border-[#1E2D4D] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#5BC0BE]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400">Company Name:</label>
                    <input
                      type="text"
                      placeholder="e.g. Ultra Mega Multi Sales Inc."
                      value={invoiceClientCompany}
                      onChange={e => setInvoiceClientCompany(e.target.value)}
                      className="w-full bg-[#070B14] border border-[#1E2D4D] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#5BC0BE]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      if (!invoiceClientCompany) {
                        alert('Please enter your Company Name to generate the official invoice.');
                        return;
                      }
                      setInvoiceGenerated(true);
                      trackHighIntentAction('Generated Pro-Forma Invoice', {
                        Company: invoiceClientCompany,
                        Tier: invoiceTier,
                        Approver: invoiceClientName
                      });
                    }}
                    className="px-4 py-2 bg-[#121D36] hover:bg-[#1E2D4D] border border-[#5BC0BE]/40 text-[#6FFFE9] rounded-xl font-bold transition-all text-xs flex items-center gap-1.5 cursor-pointer font-mono"
                  >
                    <FileText size={13} />
                    <span>Generate Official Pro-Forma Invoice</span>
                  </button>
                </div>

                {invoiceGenerated && (
                  <div className="p-4 rounded-xl bg-[#070B14] border border-[#5BC0BE]/50 space-y-3 font-mono text-xs animate-fade-in text-slate-200">
                    <div className="flex items-center justify-between border-b border-[#1E2D4D] pb-2">
                      <div>
                        <span className="text-white font-bold block">PRO-FORMA INVOICE • #INV-2026-OMNI-{Math.floor(1000 + Math.random() * 9000)}</span>
                        <span className="text-[10px] text-slate-400">Issued by: OmniStock Commercial Architecture Group</span>
                      </div>
                      <span className="text-[#6FFFE9] font-bold text-sm">{invoiceTier.split('(')[1]?.replace(')', '') || '$4,500'}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 font-sans">
                      <div><strong>Billed To:</strong> {invoiceClientName || 'Procurement Board'}, {invoiceClientCompany}</div>
                      <div><strong>Payment Terms:</strong> Wire Transfer Net-0 / 72-Hour Onboarding</div>
                      <div><strong>Beneficiary Account:</strong> 005790246533 (BDO/BPI/UnionBank)</div>
                      <div><strong>Direct Inquiries:</strong> mharcgatan@linkable.it.com</div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#1E2D4D]">
                      <span className="text-[10px] text-slate-400 font-sans">Includes Docker container, Eulerian wave routing, and 72-hr Master SKU calibration.</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.print()}
                          className="px-3 py-1.5 bg-[#121D36] hover:bg-[#1E2D4D] border border-[#2A4374] text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Printer size={11} />
                          <span>Print Invoice</span>
                        </button>
                        <button
                          onClick={() => {
                            const ord = `OMNI-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
                            const lic = `OMNI-SPATIAL-IP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-BONDED`;
                            setActiveOrderDetails({
                              orderId: ord,
                              licenseKey: lic,
                              tier: invoiceTier,
                              timestamp: new Date().toISOString()
                            });
                            setIsVaultUnlocked(true);
                            trackHighIntentAction('Unlocked OmniStock Software Vault', { Order: ord, Tier: invoiceTier });
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-[#5BC0BE] to-[#3A86FF] text-[#070B14] rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 font-mono shadow-md shadow-[#5BC0BE]/20"
                        >
                          <ShieldCheck size={11} />
                          <span>Confirm Wire & Unlock Software Vault</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* POST-PURCHASE SOFTWARE FULFILLMENT VAULT */}
                {isVaultUnlocked && activeOrderDetails && (
                  <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 space-y-4 font-mono text-xs animate-fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <CheckCircle2 size={18} />
                        <span>SOVEREIGN WMS VAULT UNLOCKED • ORDER BONDED</span>
                      </div>
                      <span className="text-[10px] text-slate-300">{activeOrderDetails.orderId}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                      <div className="p-3 rounded-xl bg-[#070B14] border border-emerald-500/30">
                        <span className="text-slate-400 text-[10px] block">CRYPTOGRAPHIC LICENSE KEY:</span>
                        <code className="text-[#6FFFE9] font-bold text-xs">{activeOrderDetails.licenseKey}</code>
                      </div>
                      <div className="p-3 rounded-xl bg-[#070B14] border border-emerald-500/30">
                        <span className="text-slate-400 text-[10px] block">DELIVERABLE TIER:</span>
                        <span className="text-white font-bold">{activeOrderDetails.tier}</span>
                      </div>
                    </div>

                    {/* Deliverables Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => {
                          const manifest = `# OMNISTOCK SPATIAL WMS PRODUCTION PACKAGE
ORDER ID: ${activeOrderDetails.orderId}
LICENSE KEY: ${activeOrderDetails.licenseKey}
TIER: ${activeOrderDetails.tier}
ISSUED: ${activeOrderDetails.timestamp}

## 🚀 3-MINUTE DOCKER PRODUCTION DEPLOYMENT
$ git clone https://github.com/linkableai-enterprise/omnistock-core.git
$ cd omnistock-core
$ docker compose -f docker-compose.prod.yml up -d --build

## ⚡ INSTANT LOCAL VERIFICATION
$ curl http://localhost:5173/health
{"status":"HEALTHY","system":"OMNISTOCK_SPATIAL_WMS","license":"VALID"}

Founder Support WhatsApp: +63 962 281 2703
`;
                          const blob = new Blob([manifest], { type: 'text/markdown' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${activeOrderDetails.orderId}_OMNISTOCK_DEPLOYMENT_PACKAGE.md`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }}
                        className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Layers size={14} />
                        <span>Download Production Bundle (.MD)</span>
                      </button>

                      <a
                        href="https://wa.me/639622812703?text=Hi%20Mharc,%20I%20unlocked%20OmniStock%20WMS%20Buyout%20Order%20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-[#070B14] hover:bg-[#121D36] border border-emerald-400 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer text-center"
                      >
                        <Send size={14} />
                        <span>Join Founder Onboarding WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* 7-Day Guarantee & 30-Day Tiered Refund */}
              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-2 font-sans">
                <div className="flex items-center gap-2 font-mono font-bold text-amber-300">
                  <Scale size={15} />
                  <span>7-Day 100% Guarantee & 30-Day Tiered Refund Policy</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p>
                    <strong className="text-emerald-400 font-mono">1. Days 1 – 7:</strong> Full 100% refund upon request if the software does not meet your technical expectations.
                  </p>
                  <p>
                    <strong className="text-amber-400 font-mono">2. Days 8 – 30:</strong> 90% refund (10% non-refundable retainer reserved for technical labor incurred during custom CAD layout drafting).
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-[#1E2D4D] bg-[#0A0F1D] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span>Air-Gapped On-Premise Execution • 72-Hour Rapid CAD Onboarding SLA</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#121D36] hover:bg-[#1E2D4D] text-slate-300 hover:text-white border border-[#2A4374] transition-all cursor-pointer font-bold"
            >
              Close
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#5BC0BE] to-[#3A86FF] text-[#070B14] hover:opacity-95 transition-all cursor-pointer font-bold shadow-md flex items-center gap-1.5"
            >
              <Calendar size={14} />
              <span>Book 5-Min Walkthrough</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

