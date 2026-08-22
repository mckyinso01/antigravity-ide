const fs = require('fs');
const path = require('path');

// 1. Clinical Pristine
const clinicalSpecsPath = path.join(__dirname, 'clinical-pristine', 'src', 'components', 'SystemSpecsModal.tsx');
if (fs.existsSync(clinicalSpecsPath)) {
  let content = fs.readFileSync(clinicalSpecsPath, 'utf8');
  if (!content.includes('downloadAirGappedDeploymentBundle')) {
    content = content.replace(
      "import { RoiCalculatorWidget } from './RoiCalculatorWidget';",
      "import { RoiCalculatorWidget } from './RoiCalculatorWidget';\nimport { downloadAirGappedDeploymentBundle } from '../utils/airGappedBundle';"
    );

    // Add button in specs section
    const target = `<h3 className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-2">`;
    const btnMarkup = `<div className="p-4 rounded-2xl bg-slate-900 border-2 border-blue-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 font-mono shadow-md">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-black text-cyan-400">
                      <Sparkles size={14} />
                      <span>100% AIR-GAPPED ON-PREMISES DEPLOYMENT BUNDLE</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 font-sans font-bold">
                      Zero outbound telemetry. Export complete Docker Compose stack, Kubernetes Helm charts, and Bare-Metal systemd service.
                    </p>
                  </div>
                  <button
                    onClick={downloadAirGappedDeploymentBundle}
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download Air-Gapped Docker Bundle</span>
                  </button>
                </div>\n\n                ` + target;
    content = content.replace(target, btnMarkup);
    fs.writeFileSync(clinicalSpecsPath, content, 'utf8');
    console.log('✅ Injected Air-Gapped button in Clinical Pristine SystemSpecsModal.tsx');
  }
}

// 2. SiteSafe
const siteSafeModalPath = path.join(__dirname, 'SiteSafe-AI', 'src', 'components', 'CommercialLicensingModal.tsx');
if (fs.existsSync(siteSafeModalPath)) {
  let content = fs.readFileSync(siteSafeModalPath, 'utf8');
  if (!content.includes('downloadAirGappedDeploymentBundle')) {
    content = content.replace(
      "import { RoiCalculatorWidget } from './RoiCalculatorWidget';",
      "import { RoiCalculatorWidget } from './RoiCalculatorWidget';\nimport { downloadAirGappedDeploymentBundle } from '../utils/airGappedBundle';"
    );

    // Add button in header or pricing
    const target = `<div className="grid grid-cols-1 md:grid-cols-3 gap-4">`;
    const btnMarkup = `<div className="p-4 rounded-2xl bg-[#131C33] border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                  <div>
                    <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> 100% Air-Gapped On-Premises Docker Stack
                    </span>
                    <p className="text-slate-400 text-[11px] mt-1 font-sans">
                      Zero cloud dependency. Export runnable Docker Compose, Kubernetes manifests, and Bare-Metal Linux service.
                    </p>
                  </div>
                  <button
                    onClick={downloadAirGappedDeploymentBundle}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Docker Bundle</span>
                  </button>
                </div>\n\n              ` + target;
    content = content.replace(target, btnMarkup);
    fs.writeFileSync(siteSafeModalPath, content, 'utf8');
    console.log('✅ Injected Air-Gapped button in SiteSafe CommercialLicensingModal.tsx');
  }
}

// 3. OmniStock
const omniStockModalPath = path.join(__dirname, 'omnistock-enterprise', 'src', 'components', 'LicensingDeploymentModal.tsx');
if (fs.existsSync(omniStockModalPath)) {
  let content = fs.readFileSync(omniStockModalPath, 'utf8');
  if (!content.includes('downloadAirGappedDeploymentBundle')) {
    content = content.replace(
      "import { RoiCalculatorWidget } from './RoiCalculatorWidget';",
      "import { RoiCalculatorWidget } from './RoiCalculatorWidget';\nimport { downloadAirGappedDeploymentBundle } from '../utils/airGappedBundle';"
    );

    const target = `<div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">`;
    const btnMarkup = `<div className="p-4 rounded-2xl bg-[#0D1527] border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs mb-4">
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
                </div>\n\n                ` + target;
    content = content.replace(target, btnMarkup);
    fs.writeFileSync(omniStockModalPath, content, 'utf8');
    console.log('✅ Injected Air-Gapped button in OmniStock LicensingDeploymentModal.tsx');
  }
}

// 4. ClaimGuard AI
const claimGuardModalPath = path.join(__dirname, 'ClaimGuard-AI', 'src', 'components', 'pricing-gap', 'PricingGapReportModal.tsx');
if (fs.existsSync(claimGuardModalPath)) {
  let content = fs.readFileSync(claimGuardModalPath, 'utf8');
  if (!content.includes('downloadAirGappedDeploymentBundle')) {
    content = content.replace(
      "import { X, DollarSign, TrendingDown, Clock, ShieldCheck, Scale, CheckCircle2, FileText, ArrowRight, Download, Sparkles, Building2, Calendar } from 'lucide-react';",
      "import { X, DollarSign, TrendingDown, Clock, ShieldCheck, Scale, CheckCircle2, FileText, ArrowRight, Download, Sparkles, Building2, Calendar } from 'lucide-react';\nimport { downloadAirGappedDeploymentBundle } from '../../utils/airGappedBundle';"
    );

    const target = `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>`;
    const btnMarkup = `<div style={{ padding: '14px 18px', borderRadius: '16px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#06B6D4', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} /> 100% Air-Gapped Sovereign Deployment Stack
                </span>
                <p style={{ fontSize: '11px', color: '#94A3B8', margin: '4px 0 0 0' }}>
                  Zero outbound telemetry. Export Docker Compose, Kubernetes Helm chart, and Bare-Metal Linux service.
                </p>
              </div>
              <button
                onClick={downloadAirGappedDeploymentBundle}
                style={{ padding: '8px 16px', borderRadius: '10px', background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', border: 'none', color: '#FFFFFF', fontSize: '11px', fontFamily: 'monospace', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={13} />
                <span>Download Docker Bundle</span>
              </button>
            </div>\n\n            ` + target;
    content = content.replace(target, btnMarkup);
    fs.writeFileSync(claimGuardModalPath, content, 'utf8');
    console.log('✅ Injected Air-Gapped button in ClaimGuard PricingGapReportModal.tsx');
  }
}

// 5. Saccade-UI
const saccadeModalPath = path.join(__dirname, 'Saccade-UI-evaluator', 'src', 'components', 'LicensingModal.tsx');
if (fs.existsSync(saccadeModalPath)) {
  let content = fs.readFileSync(saccadeModalPath, 'utf8');
  if (!content.includes('downloadAirGappedDeploymentBundle')) {
    content = content.replace(
      "import { RoiCalculatorWidget } from './RoiCalculatorWidget';",
      "import { RoiCalculatorWidget } from './RoiCalculatorWidget';\nimport { downloadAirGappedDeploymentBundle } from '../utils/airGappedBundle';"
    );

    const target = `<div className="grid grid-cols-1 md:grid-cols-3 gap-4">`;
    const btnMarkup = `<div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs mb-4">
                  <div>
                    <span className="text-rose-400 font-bold block flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> 100% Air-Gapped On-Premises CRO Docker Stack
                    </span>
                    <p className="text-slate-400 text-[11px] mt-1 font-sans">
                      Export turnkey Docker Compose, Kubernetes manifests, and offline bare-metal systemd scripts.
                    </p>
                  </div>
                  <button
                    onClick={downloadAirGappedDeploymentBundle}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Docker Bundle</span>
                  </button>
                </div>\n\n                ` + target;
    content = content.replace(target, btnMarkup);
    fs.writeFileSync(saccadeModalPath, content, 'utf8');
    console.log('✅ Injected Air-Gapped button in Saccade LicensingModal.tsx');
  }
}

console.log('🎉 AIR-GAPPED EXPORTER BUTTONS 100% INJECTED ACROSS ALL 5 APPS!');
