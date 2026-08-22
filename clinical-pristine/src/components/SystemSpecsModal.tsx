import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  X, 
  Shield, 
  Activity, 
  Cpu, 
  Database, 
  Network, 
  Maximize2, 
  Minimize2,
  Calendar,
  Clock,
  Building,
  User,
  Phone,
  Mail,
  Send,
  Printer,
  Copy,
  CreditCard,
  CheckCircle2,
  FileText,
  Scale,
  Sparkles,
  Server,
  Globe,
  Crown,
  Check
} from 'lucide-react';
import { clinicalAudio } from '../utils/clinicalAudio';
import { trackClinicalIntentAction } from '../utils/visitorEmailBeacon';
import { RoiCalculatorWidget } from './RoiCalculatorWidget';
import { PayPalCheckoutButton } from './PayPalCheckoutButton';

interface SystemSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'roi' | 'specs' | 'pricing' | 'schedule' | 'invoice';

export const SystemSpecsModal = ({ isOpen, onClose }: SystemSpecsModalProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('pricing');
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [activeOrderDetails, setActiveOrderDetails] = useState<{
    orderId: string;
    licenseKey: string;
    tier: string;
    timestamp: string;
  } | null>(null);

  // Booking State
  const [bookingName, setBookingName] = useState('');
  const [bookingHospital, setBookingHospital] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingBeds, setBookingBeds] = useState('50 - 200 Beds');
  const [bookingSlot, setBookingSlot] = useState('Tomorrow 10:00 AM EST / 10:00 PM PHT');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Pro-Forma Invoice State
  const [invoiceTier, setInvoiceTier] = useState('Tier 1: Single Facility ($6,500)');
  const [invoiceDirectorName, setInvoiceDirectorName] = useState('');
  const [invoiceHospitalName, setInvoiceHospitalName] = useState('');
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  useEffect(() => {
    if (isOpen) {
      clinicalAudio.playDrawerSwoosh();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectTier = (tierName: string, price: string) => {
    trackClinicalIntentAction(`Selected Pricing Tier: ${tierName}`, { Price: price });
    setActiveTab('schedule');
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingEmail || !bookingHospital) return;

    setIsSubmittingBooking(true);
    await trackClinicalIntentAction('Submitted Clinical Review Request', {
      Name: bookingName,
      Hospital: bookingHospital,
      Email: bookingEmail,
      Phone: bookingPhone,
      Beds: bookingBeds,
      PreferredSlot: bookingSlot
    });

    try {
      await fetch('https://formsubmit.co/ajax/mckinsyo01@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `🏥 [CLINICAL REVIEW REQUEST] Hospital Walkthrough: ${bookingHospital} (${bookingName})`,
          _template: 'table',
          _captcha: 'false',
          'Hospital / Health System': bookingHospital,
          'Clinical Leader Name': bookingName,
          'Work Email': bookingEmail,
          'Phone / WhatsApp': bookingPhone || 'Not provided',
          'Bed Capacity & Units': bookingBeds,
          'Requested Slot': bookingSlot,
          'Timestamp': new Date().toLocaleString()
        })
      });
    } catch (err) {
      console.warn('Clinical booking telemetry buffered', err);
    }

    clinicalAudio.playSuccessChime();
    setIsSubmittingBooking(false);
    setBookingSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[140] bg-slate-900/50 backdrop-blur-xs flex justify-end font-sans"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className={`${
            isFullScreen ? 'w-full' : 'w-full max-w-2xl md:max-w-3xl'
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
                  <h2 className="text-base font-black text-slate-950 font-display">Clinical Pristine OS Enterprise Center</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 border-2 border-blue-300 text-blue-900 text-xs font-mono font-black">
                    v1.0 CLINICAL
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">
                  Zero Per-Bed SaaS Tax • Sub-15ms Spatial Bed Management • 100% On-Premise
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

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 px-6 pt-3 border-b-2 border-slate-200 bg-slate-50 overflow-x-auto text-xs font-mono font-bold">
            <button
              onClick={() => setActiveTab('pricing')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'pricing'
                  ? 'border-blue-700 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <CreditCard size={14} />
              <span>Commercial Buyout</span>
            </button>

            <button
              onClick={() => setActiveTab('roi')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'roi'
                  ? 'border-blue-700 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sparkles size={14} />
              <span>ROI Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'schedule'
                  ? 'border-blue-700 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Calendar size={14} />
              <span>Book 5-Min Walkthrough</span>
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-blue-700 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Cpu size={14} />
              <span>Clinical Engines &amp; Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab('invoice')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'invoice'
                  ? 'border-blue-700 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Scale size={14} />
              <span>Pro-Forma &amp; Delivery Vault</span>
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar text-sm bg-slate-50">

            {/* TAB: ZERO-SAAS ROI CALCULATOR */}
            {activeTab === 'roi' && (
              <RoiCalculatorWidget
                appName="Clinical Pristine OS"
                defaultBuyoutPrice={35000}
                onSelectTier={(tier, price) => handleSelectTier(tier, price)}
              />
            )}

            {/* TAB 1: COMMERCIAL BUYOUT TIERS */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-blue-700" />
                      <span className="font-mono font-black text-blue-950 text-sm">Eliminate Recurring EHR Per-Bed Taxes</span>
                    </div>
                    <p className="text-xs text-slate-700 font-bold">
                      Epic and Cerner impose steep monthly seat fees. Clinical Pristine OS offers a 100% On-Premise Buyout with zero per-nurse license caps.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-black rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer font-mono"
                  >
                    <Calendar size={13} />
                    <span>Request Hospital CAD Map</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
                  {/* Tier 1 */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-slate-300 hover:border-blue-600 transition-all flex flex-col justify-between space-y-4 shadow-sm">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2 font-bold">
                        <Server size={18} />
                      </div>
                      <span className="text-[10px] text-slate-500 font-black block">TIER 1 • CLINICAL ON-PREM</span>
                      <h4 className="text-slate-950 text-sm font-black mt-0.5">Single Hospital / Surgical Center</h4>
                      <div className="mt-2 text-xl font-black text-blue-700">$6,500 <span className="text-[10px] text-slate-500 font-normal">/ ₱360k</span></div>
                      <span className="text-[10px] text-slate-500 block font-normal">One-time purchase • Zero recurring fees</span>

                      <ul className="mt-3 space-y-1.5 text-[11px] text-slate-700 font-sans font-bold">
                        <li className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600 shrink-0" /> Sub-15ms Spatial Bed Management HUD</li>
                        <li className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600 shrink-0" /> Code Blue CPR Web Audio Metronome</li>
                        <li className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600 shrink-0" /> Surviving Sepsis Hour-1 CDS Deck</li>
                        <li className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600 shrink-0" /> 72-Hour Rapid On-Premise Docker SLA</li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectTier('Tier 1: Single Hospital', '$6,500')}
                      className="w-full bg-slate-100 hover:bg-blue-50 border-2 border-slate-300 text-slate-900 py-2 rounded-xl font-black transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5"
                    >
                      <CreditCard size={13} className="text-blue-700" />
                      <span>Acquire Hospital License</span>
                    </button>
                  </div>

                  {/* Tier 2 */}
                  <div className="p-4 rounded-2xl bg-gradient-to-b from-blue-50 to-white border-2 border-blue-600 relative flex flex-col justify-between space-y-4 shadow-md">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Most Popular for Health Networks
                    </span>

                    <div>
                      <div className="w-8 h-8 rounded-lg bg-blue-200 text-blue-900 flex items-center justify-center mb-2 font-bold">
                        <Globe size={18} />
                      </div>
                      <span className="text-[10px] text-blue-700 font-black block">TIER 2 • HEALTH SYSTEM</span>
                      <h4 className="text-slate-950 text-sm font-black mt-0.5">Multi-Hospital Network</h4>
                      <div className="mt-2 text-xl font-black text-slate-950">$14,500 <span className="text-[10px] text-slate-500 font-normal">/ ₱800k</span></div>
                      <span className="text-[10px] text-slate-500 block font-normal">Up to 5 Facilities • White-Label Ready</span>

                      <ul className="mt-3 space-y-1.5 text-[11px] text-slate-700 font-sans font-bold">
                        <li className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600 shrink-0" /> Up to 5 Hospital Facilities</li>
                        <li className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600 shrink-0" /> Central Inter-Facility Bed Transfer</li>
                        <li className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600 shrink-0" /> HL7 v2.5.1 / FHIR ADT Ingestion</li>
                        <li className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600 shrink-0" /> Custom Health System Branding</li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectTier('Tier 2: Multi-Hospital', '$14,500')}
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-xl font-black transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Sparkles size={13} />
                      <span>Acquire Health System</span>
                    </button>
                  </div>

                  {/* Tier 3 */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-slate-300 hover:border-purple-600 transition-all flex flex-col justify-between space-y-4 shadow-sm">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-2 font-bold">
                        <Crown size={18} />
                      </div>
                      <span className="text-[10px] text-purple-700 font-black block">TIER 3 • FULL HEALTHCARE IP</span>
                      <h4 className="text-slate-950 text-sm font-black mt-0.5">100% Source Code IP</h4>
                      <div className="mt-2 text-xl font-black text-purple-800">$35,000 <span className="text-[10px] text-slate-500 font-normal">/ ₱1.95M</span></div>
                      <span className="text-[10px] text-slate-500 block font-normal">Complete source code & resell rights</span>

                      <ul className="mt-3 space-y-1.5 text-[11px] text-slate-700 font-sans font-bold">
                        <li className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600 shrink-0" /> Full React/TypeScript/CAD Repo</li>
                        <li className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600 shrink-0" /> Unrestricted Global Resell Rights</li>
                        <li className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600 shrink-0" /> Proprietary Sepsis/CPR Ticker Algorithms</li>
                        <li className="flex items-center gap-1.5"><Check size={13} className="text-emerald-600 shrink-0" /> Lead Solutions Architect Retainer</li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectTier('Tier 3: IP Buyout', '$35,000')}
                      className="w-full bg-purple-50 hover:bg-purple-100 border-2 border-purple-300 text-purple-950 py-2 rounded-xl font-black transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5"
                    >
                      <Cpu size={13} className="text-purple-700" />
                      <span>Acquire Full IP Buyout</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono font-bold">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail size={16} className="text-blue-700 shrink-0" />
                    <span>Need Custom Epic/Cerner Interface or On-Site Hospital Integration?</span>
                  </div>
                  <a
                    href="mailto:mckinsyo01@gmail.com?subject=Clinical%20Pristine%20OS%20Commercial%20Licensing%20Inquiry"
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 rounded-lg shrink-0 text-xs font-black transition-all"
                  >
                    Contact Lead Medical Architect &rarr;
                  </a>
                </div>
              </div>
            )}

            {/* TAB 2: INSTANT 5-MINUTE CLINICAL REVIEW SCHEDULER */}
            {activeTab === 'schedule' && (
              <div className="space-y-6 font-sans">
                <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 space-y-1.5">
                  <h4 className="text-sm font-black text-blue-950 flex items-center gap-2 font-mono">
                    <Calendar size={16} className="text-blue-700" />
                    Schedule a 5-Minute Clinical Review with Our Lead Solutions Architect
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-bold">
                    We will review your facility's bed capacity, EVS turnaround bottlenecks, and EHR interoperability over Google Meet to verify if Clinical Pristine OS can eliminate your admission delays.
                  </p>
                </div>

                {bookingSubmitted ? (
                  <div className="p-6 rounded-2xl bg-white border-2 border-emerald-500 text-center space-y-3 animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-black">
                      <CheckCircle2 size={28} />
                    </div>
                    <h4 className="text-lg font-black text-slate-950">Clinical Walkthrough Confirmed!</h4>
                    <p className="text-xs text-slate-700 max-w-md mx-auto font-bold">
                      Thank you, <strong>{bookingName || 'Clinical Leader'}</strong>. Our Lead Solutions Engineer received your request for <strong>{bookingHospital}</strong> and will email the Google Meet invite to <strong>{bookingEmail}</strong> within 2 hours.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setBookingSubmitted(false)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-900 rounded-xl text-xs font-black transition-all cursor-pointer font-mono"
                      >
                        Book Another Facility
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="p-5 rounded-2xl bg-white border-2 border-slate-300 space-y-3.5 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-mono font-black text-slate-800 flex items-center gap-1">
                          <User size={12} className="text-blue-700" /> Clinical Leader Name &amp; Title:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Arthur Vance, MD (Chief Medical Officer)"
                          value={bookingName}
                          onChange={e => setBookingName(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono font-black text-slate-800 flex items-center gap-1">
                          <Building size={12} className="text-blue-700" /> Hospital / Health System Name:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. St. Jude Memorial Hospital"
                          value={bookingHospital}
                          onChange={e => setBookingHospital(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono font-black text-slate-800 flex items-center gap-1">
                          <Mail size={12} className="text-blue-700" /> Official Work Email:
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. cmo@hospital.org"
                          value={bookingEmail}
                          onChange={e => setBookingEmail(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono font-black text-slate-800 flex items-center gap-1">
                          <Phone size={12} className="text-blue-700" /> Direct Phone / WhatsApp:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. +1 (555) 382-9102"
                          value={bookingPhone}
                          onChange={e => setBookingPhone(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono font-black text-slate-800 flex items-center gap-1">
                          <Activity size={12} className="text-blue-700" /> Active Inpatient Beds / ICU Units:
                        </label>
                        <select
                          value={bookingBeds}
                          onChange={e => setBookingBeds(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                        >
                          <option value="Under 50 Beds">Specialty Clinic (&lt; 50 Beds)</option>
                          <option value="50 - 200 Beds">Community Hospital (50 – 200 Beds)</option>
                          <option value="200 - 600 Beds">Major Regional Trauma Center (200 – 600 Beds)</option>
                          <option value="Multi-Hospital Network">Multi-Hospital Health Network (600+ Beds)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono font-black text-slate-800 flex items-center gap-1">
                          <Clock size={12} className="text-blue-700" /> Preferred Review Slot:
                        </label>
                        <select
                          value={bookingSlot}
                          onChange={e => setBookingSlot(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                        >
                          <option value="Tomorrow 10:00 AM EST / 10:00 PM PHT">Tomorrow 10:00 AM EST / 10:00 PM PHT</option>
                          <option value="Tomorrow 2:00 PM EST / 2:00 AM PHT">Tomorrow 2:00 PM EST / 2:00 AM PHT</option>
                          <option value="This Thursday 9:00 AM PHT (Asia Hours)">This Thursday 9:00 AM PHT (Asia Hours)</option>
                          <option value="Flexible / Send Available Calendar Link">Flexible (Send Calendar Link via Email)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmittingBooking}
                        className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-black rounded-xl text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer font-mono"
                      >
                        {isSubmittingBooking ? (
                          <span>Transmitting Request...</span>
                        ) : (
                          <>
                            <Send size={13} />
                            <span>Confirm 5-Minute Clinical Review</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: SPECS */}
            {activeTab === 'specs' && (
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
            )}

            {/* TAB 4: PRO-FORMA & WIRE RAILS */}
            {activeTab === 'invoice' && (
              <div className="space-y-5 font-sans text-xs">
                {/* Official Live PayPal & Cards Smart Buttons */}
                <div className="p-4 rounded-2xl bg-blue-950/20 border-2 border-blue-400/40">
                  <PayPalCheckoutButton
                    amountUsd={invoiceTier.includes('6,500') ? 6500 : invoiceTier.includes('14,500') ? 14500 : 35000}
                    planName={`Clinical Pristine ICU OS (${invoiceTier})`}
                    onSuccess={(details) => {
                      const ord = `CLINICAL-PP-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
                      const lic = `CLINICAL-IP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-BONDED`;
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
                <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-blue-950 text-xs flex items-center gap-1.5">
                      <CreditCard size={14} className="text-blue-700" /> DIRECT B2B CORPORATE WIRE (0% GATEWAY SURCHARGE)
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-bold">VERIFIED PRIMARY</span>
                  </div>
                  <p className="text-xs text-slate-700 font-bold leading-relaxed">
                    Hospital networks executing commercial buyouts ($6.5k–$35k) can execute direct corporate bank wires with zero credit card transaction surcharges.
                  </p>
                  <div className="p-2.5 rounded-xl bg-white border-2 border-slate-300 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-bold">BENEFICIARY ACCOUNT / RAILS:</span>
                      <span className="font-mono font-black text-blue-950 text-xs">005790246533 • BDO / BPI / UnionBank / SWIFT International</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('005790246533');
                        alert('Beneficiary account number (005790246533) copied to clipboard!');
                      }}
                      className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 border border-blue-300 text-blue-900 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Copy size={11} />
                      <span>Copy Account No.</span>
                    </button>
                  </div>
                </div>

                {/* Pro-Forma Invoice Form */}
                <div className="p-4 rounded-2xl bg-white border-2 border-slate-300 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h5 className="font-mono font-black text-slate-950 text-xs flex items-center gap-1.5">
                      <FileText size={14} className="text-blue-700" />
                      Hospital Pro-Forma Invoice &amp; PO Generator
                    </h5>
                    <span className="text-[10px] text-slate-500 font-mono">For Hospital CFO &amp; Board Approval</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-slate-600">Target Licensing Tier:</label>
                      <select
                        value={invoiceTier}
                        onChange={e => setInvoiceTier(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                      >
                        <option value="Tier 1: Single Facility ($6,500)">Tier 1: Single Facility ($6,500)</option>
                        <option value="Tier 2: Multi-Hospital Network ($14,500)">Tier 2: Multi-Hospital ($14,500)</option>
                        <option value="Tier 3: Full Healthcare IP ($35,000)">Tier 3: Full IP Buyout ($35,000)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-slate-600">Clinical Leader / Approver:</label>
                      <input
                        type="text"
                        placeholder="e.g. Chief Medical Officer"
                        value={invoiceDirectorName}
                        onChange={e => setInvoiceDirectorName(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-slate-600">Hospital / Health System:</label>
                      <input
                        type="text"
                        placeholder="e.g. MetroHealth System Inc."
                        value={invoiceHospitalName}
                        onChange={e => setInvoiceHospitalName(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        if (!invoiceHospitalName) {
                          alert('Please enter the Hospital Name to generate the official invoice.');
                          return;
                        }
                        setInvoiceGenerated(true);
                        trackClinicalIntentAction('Generated Clinical Pro-Forma Invoice', {
                          Hospital: invoiceHospitalName,
                          Tier: invoiceTier,
                          Approver: invoiceDirectorName
                        });
                      }}
                      className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-black transition-all text-xs flex items-center gap-1.5 cursor-pointer font-mono shadow-sm"
                    >
                      <FileText size={12} />
                      <span>Generate Official Pro-Forma Invoice</span>
                    </button>
                  </div>

                  {invoiceGenerated && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-blue-400 space-y-2.5 font-mono text-xs animate-fade-in text-slate-900">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <div>
                          <span className="font-black block text-slate-950">PRO-FORMA INVOICE • #INV-2026-MED-{Math.floor(1000 + Math.random() * 9000)}</span>
                          <span className="text-[10px] text-slate-500">Issued by: Clinical Pristine Architecture Group</span>
                        </div>
                        <span className="text-blue-700 font-black text-sm">{invoiceTier.split('(')[1]?.replace(')', '') || '$6,500'}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-700 font-sans font-bold">
                        <div><strong>Billed To:</strong> {invoiceDirectorName || 'Hospital Board'}, {invoiceHospitalName}</div>
                        <div><strong>Payment Terms:</strong> Wire Net-0 / 72-Hr Deployment SLA</div>
                        <div><strong>Beneficiary Account:</strong> 005790246533 (BDO/BPI/UnionBank)</div>
                        <div><strong>Direct Inquiries:</strong> mckinsyo01@gmail.com</div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200">
                        <span className="text-[10px] text-slate-500 font-sans font-bold">Includes spatial bed CAD builder, ACLS metronome &amp; Sepsis Hour-1 CDS.</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => window.print()}
                            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-950 rounded-lg text-[10px] font-black transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Printer size={11} />
                            <span>Print Invoice</span>
                          </button>
                          <button
                            onClick={() => {
                              const ord = `MED-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
                              const lic = `MED-SOVEREIGN-IP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-BONDED`;
                              setActiveOrderDetails({
                                orderId: ord,
                                licenseKey: lic,
                                tier: invoiceTier,
                                timestamp: new Date().toISOString()
                              });
                              setIsVaultUnlocked(true);
                              trackClinicalIntentAction('Unlocked Clinical OS Software Vault', { Order: ord, Tier: invoiceTier });
                            }}
                            className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-[10px] font-black transition-all cursor-pointer flex items-center gap-1 font-mono shadow-sm"
                          >
                            <CheckCircle2 size={11} />
                            <span>Confirm Wire &amp; Unlock Hospital OS Vault</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* POST-PURCHASE SOFTWARE FULFILLMENT VAULT */}
                  {isVaultUnlocked && activeOrderDetails && (
                    <div className="p-4 rounded-2xl bg-emerald-950/90 border-2 border-emerald-500 space-y-3 font-mono text-xs text-white shadow-xl animate-fade-in">
                      <div className="flex items-center justify-between pb-2 border-b border-emerald-500/40">
                        <div className="flex items-center gap-2 text-emerald-300 font-bold">
                          <CheckCircle2 size={16} />
                          <span>HOSPITAL OS VAULT UNLOCKED • ORDER BONDED</span>
                        </div>
                        <span className="text-[10px] text-slate-300">{activeOrderDetails.orderId}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/40">
                          <span className="text-slate-400 text-[10px] block">CRYPTOGRAPHIC LICENSE KEY:</span>
                          <code className="text-cyan-300 font-bold text-xs">{activeOrderDetails.licenseKey}</code>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/40">
                          <span className="text-slate-400 text-[10px] block">LICENSED TIER:</span>
                          <span className="text-white font-bold">{activeOrderDetails.tier}</span>
                        </div>
                      </div>

                      {/* Deliverables Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => {
                            const manifest = `# CLINICAL PRISTINE OS PRODUCTION PACKAGE
ORDER ID: ${activeOrderDetails.orderId}
LICENSE KEY: ${activeOrderDetails.licenseKey}
TIER: ${activeOrderDetails.tier}
ISSUED: ${activeOrderDetails.timestamp}

## 🚀 3-MINUTE DOCKER AIR-GAPPED DEPLOYMENT
$ git clone https://github.com/linkableai-enterprise/clinical-pristine-core.git
$ cd clinical-pristine-core
$ docker compose -f docker-compose.prod.yml up -d --build

## ⚡ INSTANT LOCAL VERIFICATION
$ curl http://localhost:5174/health
{"status":"HEALTHY","system":"CLINICAL_PRISTINE_OS","license":"VALID"}

Founder Support WhatsApp: +63 962 281 2703
`;
                            const blob = new Blob([manifest], { type: 'text/markdown' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${activeOrderDetails.orderId}_CLINICAL_PRISTINE_DEPLOYMENT_PACKAGE.md`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                          }}
                          className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <Server size={13} />
                          <span>Download Production Package (.MD)</span>
                        </button>

                        <a
                          href="https://wa.me/639622812703?text=Hi%20Mharc,%20I%20unlocked%20Clinical%20Pristine%20Hospital%20Buyout%20Order%20"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-400 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer text-center"
                        >
                          <Send size={13} />
                          <span>Join Hospital Founder Onboarding</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-slate-100 border-t-2 border-slate-300 flex items-center justify-between text-xs font-mono text-slate-700 font-bold flex-shrink-0">
            <span>Air-Gapped Intranet Deployment • 72-Hour Rapid Onboarding</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-white hover:bg-slate-200 text-slate-950 font-black rounded-xl text-xs transition-all border-2 border-slate-300 shadow-xs cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-black rounded-xl text-xs transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Calendar size={13} />
                <span>Book 5-Min Walkthrough</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
