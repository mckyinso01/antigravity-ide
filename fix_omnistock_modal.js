const fs = require('fs');
const path = require('path');

const omniModalPath = path.join(__dirname, 'omnistock-enterprise', 'src', 'components', 'LicensingDeploymentModal.tsx');
let omni = fs.readFileSync(omniModalPath, 'utf8');

const target = `<div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono">`;
const btnMarkup = `<div className="p-4 rounded-2xl bg-[#0D1527] border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
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
              </div>\n\n              ` + target;

omni = omni.replace(target, btnMarkup);
fs.writeFileSync(omniModalPath, omni, 'utf8');
console.log('✅ Correctly injected Air-Gapped button in OmniStock LicensingDeploymentModal.tsx');
