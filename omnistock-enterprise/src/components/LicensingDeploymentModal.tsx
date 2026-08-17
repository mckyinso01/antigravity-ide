import React from 'react';
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
  Code2
} from 'lucide-react';
import { trackHighIntentAction } from '../utils/visitorEmailBeacon';

interface LicensingDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LicensingDeploymentModal: React.FC<LicensingDeploymentModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handleSelectTier = (tierName: string, price: string) => {
    trackHighIntentAction(`Selected Pricing Tier: ${tierName}`, { Price: price });
    window.open('https://pm.link/org-Z74G8b3xQ5pYt87/test_prod_omnistock_enterprise', '_blank');
  };

  const handleContactSales = () => {
    trackHighIntentAction('Clicked Direct Sales Inquiry');
    window.location.href = 'mailto:mckinsyo01@gmail.com?subject=OmniStock%20ERP%20Commercial%20Licensing%20Inquiry';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <div className="bg-[#070B14] border border-[#2A4374] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col glow-mint max-h-[90vh]">
        {/* Header */}
        <div className="h-16 border-b border-[#1E2D4D] bg-[#0D1527] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5BC0BE] to-[#3A86FF] flex items-center justify-center text-[#070B14] shadow-lg">
              <ShieldCheck size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-base text-white">Enterprise Licensing & Architecture Buyout</h3>
              <span className="text-xs text-slate-400 font-mono">Zero Per-User SaaS Tax • Transparent Commercial Deployment</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#121D36] transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="p-6 overflow-y-auto space-y-6">
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

            {/* Tier 2: Enterprise White-Label (Recommended) */}
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
      </div>
    </div>
  );
};
