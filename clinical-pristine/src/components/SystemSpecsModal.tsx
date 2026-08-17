import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Shield, Activity, Cpu, Database, Network, Maximize2, Minimize2 } from 'lucide-react';
import { clinicalAudio } from '../utils/clinicalAudio';

interface SystemSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemSpecsModal = ({ isOpen, onClose }: SystemSpecsModalProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      clinicalAudio.playDrawerSwoosh();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[140] bg-slate-900/40 flex justify-end font-sans"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className={`${
            isFullScreen ? 'w-full' : 'w-full max-w-xl md:max-w-2xl'
          } bg-white border-l-2 border-slate-700 h-full flex flex-col shadow-2xl text-slate-900 transition-all duration-300`}
        >
          {/* Drawer Header */}
          <div className="p-4 bg-slate-100 border-b-2 border-slate-300 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-slate-300 text-blue-700 flex items-center justify-center font-black shadow-xs">
                <Terminal size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-950 font-display">Clinical Pristine OS Specifications</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 border-2 border-blue-300 text-blue-900 text-xs font-mono font-black">
                    v1.0.0
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">
                  Core Architecture &amp; Autonomous Telemetry Engines
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 text-slate-600 hover:text-slate-950 rounded-xl hover:bg-slate-200 border-2 border-slate-300 bg-white transition-colors cursor-pointer"
                title={isFullScreen ? "Restore Standard Drawer" : "Expand Full Screen"}
              >
                {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-slate-600 hover:text-rose-700 rounded-xl hover:bg-rose-50 border-2 border-slate-300 bg-white transition-colors cursor-pointer"
                title="Close Drawer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar text-sm bg-slate-50">
            <section className="space-y-3">
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-2">
                <Cpu size={14} className="text-blue-700" />
                AUTONOMOUS MEDICAL WORKSTATION ENGINES
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: <Network className="text-blue-700" />, title: 'Centralized Multi-Node WebSocket Cluster (Port 8089)', desc: 'Real-time synchronization across COW carts, mobile tablets, and central wallboard displays with sub-15ms latency & offline mutation replay queue.' },
                  { icon: <Activity className="text-emerald-700" />, title: 'Epic & Cerner HL7 v2.5.1 / FHIR Ingestion Gateway', desc: 'Native ER7 Pipe parser & generator for ADT-A01 hospital admissions, automatic bed placement, and emergency holding bay triage.' },
                  { icon: <Shield className="text-purple-700" />, title: 'Imprivata OneSign® RFID Badge Tap & HIPAA Auto-Lock', desc: 'Instant contactless badge authentication generating signed JWT sessions with automatic 5-minute inactivity privacy shield.' },
                  { icon: <Database className="text-amber-700" />, title: 'Offline-First Dexie Persistence & OCC Versioning', desc: 'Hardware-backed IndexedDB storage with Optimistic Concurrency Control preventing multi-nurse charting collisions.' },
                  { icon: <Cpu className="text-rose-700" />, title: 'AHA ACLS Precision CPR & FDA Non-Device CDS Deck', desc: 'Web Audio Lookahead ticker CPR Metronome (100% immune to background tab drift) with statutory FDA CDS legal compliance.' },
                  { icon: <Shield className="text-teal-700" />, title: 'Anti-Ghost Physical EVS Bedside Verification Gate', desc: 'Doorway physical QR scanning + EPA chemical disinfectant lot # tracking preventing premature clean bed releases.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border-2 border-slate-300 shadow-sm flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-100 border-2 border-slate-300 shrink-0 font-bold">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-950 text-sm font-display">{item.title}</h4>
                      <p className="text-xs text-slate-700 font-mono mt-1 leading-relaxed font-bold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-4 rounded-2xl bg-white border-2 border-slate-300 shadow-sm font-mono text-xs text-slate-800 space-y-3 font-bold">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-950 uppercase text-xs">COMMERCIAL LICENSING &amp; ENTERPRISE ACQUISITION TIERS</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px]">LIVE PAYMONGO RAILS</span>
              </div>

              <div className="space-y-2 pt-1">
                {/* Tier 1 */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-slate-950 font-black text-xs">1. Self-Hosted On-Premise (Docker Intranet)</div>
                    <div className="text-[11px] text-slate-500 font-mono font-normal">Perpetual license • Zero per-bed tax • 100% Air-Gapped</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900">$18,500 <span className="text-[10px] text-slate-500 font-normal">(₱1.05M)</span></span>
                    <a
                      href="https://pm.link/org-a71C9itbGW1tV5HJ38AsuzzW/s7WaGD2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Pay via PayMongo</span> &rarr;
                    </a>
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="p-3 bg-blue-50/50 rounded-xl border-2 border-blue-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-blue-950 font-black text-xs">2. Enterprise White-Label Custom System</div>
                    <div className="text-[11px] text-blue-700 font-mono font-normal">Bespoke hospital brand • 18 Pre-loaded CAD maps • 12mo Support</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-blue-900">$35,000 <span className="text-[10px] text-blue-600 font-normal">(₱1.995M)</span></span>
                    <a
                      href="https://pm.link/org-a71C9itbGW1tV5HJ38AsuzzW/QTfGlD7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Pay via PayMongo</span> &rarr;
                    </a>
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-slate-950 font-black text-xs">3. 100% Full Source Code &amp; Commercial IP Buyout</div>
                    <div className="text-[11px] text-slate-500 font-mono font-normal">Unminified React/TS repo • Proprietary CAD Engine • Zero Royalties</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-emerald-800">$65,000 <span className="text-[10px] text-emerald-600 font-normal">(₱3.7M)</span></span>
                    <a
                      href="https://pm.link/org-a71C9itbGW1tV5HJ38AsuzzW/GoouZyg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Pay via PayMongo</span> &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct B2B Corporate Wire / Zero-Surcharge Rails */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border-2 border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-blue-950 text-xs">DIRECT B2B CORPORATE WIRE (0% GATEWAY SURCHARGE)</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-bold">VERIFIED PRIMARY</span>
                </div>
                <p className="text-[11px] text-slate-700 font-normal leading-relaxed">
                  Enterprise healthcare networks executing high-value acquisitions ($18.5k–$65k) can bypass credit card processing fees via direct bank wire.
                </p>
                <div className="p-2.5 rounded-lg bg-white border border-blue-200 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500 block">BENEFICIARY ACCOUNT / RAILS:</span>
                    <span className="font-mono font-black text-blue-950 text-xs">005790246533 • BDO / BPI / UnionBank / SWIFT</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('005790246533');
                      alert('Beneficiary account number (005790246533) copied to clipboard!');
                    }}
                    className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 border border-blue-300 text-blue-900 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                  >
                    Copy Account No.
                  </button>
                </div>
              </div>

              {/* Tiered Refund Policy & Legal Protections */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-black text-slate-950 text-xs block">7-DAY 100% GUARANTEE &amp; 30-DAY TIERED REFUND POLICY</span>
                <div className="space-y-1.5 text-[11px] text-slate-700 font-normal leading-relaxed">
                  <p>
                    <strong className="text-emerald-700 font-bold">1. Days 1 – 7 (Grace Period):</strong> 100% Full Refund upon written notice within seven (7) calendar days with zero penalties.
                  </p>
                  <p>
                    <strong className="text-amber-700 font-bold">2. Days 8 – 30 (Post-Onboarding Phase):</strong> 90% Partial Refund. A 10% non-refundable retainer is retained to cover:
                  </p>
                  <ul className="pl-4 space-y-0.5 list-disc text-[10px] text-slate-600">
                    <li>Technical labor incurred on hospital CAD floorplan drafting &amp; EVS sensor mapping.</li>
                    <li>Non-refundable payment gateway transaction interchange and banking surcharges.</li>
                    <li>Digital IP delivery and license certificate de-registration overhead.</li>
                    <li>Dedicated intranet container environment de-provisioning.</li>
                  </ul>
                  <p>
                    <strong className="text-rose-700 font-bold">3. Beyond Day 30:</strong> Final settlement after 30 days of production hospital deployment.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-slate-100 border-t-2 border-slate-300 flex items-center justify-between text-xs font-mono text-slate-700 font-bold flex-shrink-0">
            <span>Clinical Pristine OS Core Architecture</span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-white hover:bg-slate-100 text-slate-950 font-black rounded-xl text-xs transition-all border-2 border-slate-300 shadow-xs cursor-pointer"
            >
              Close (Esc)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
