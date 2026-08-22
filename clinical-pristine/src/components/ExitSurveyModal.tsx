import React, { useState, useEffect } from 'react';
import { Star, X, CheckCircle2, Sparkles, Send, Building2, User, Mail, Briefcase, Zap } from 'lucide-react';
import type { ProspectSessionInfo } from '../hooks/useUrlTabNavigation';

interface ExitSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  prospectSession: ProspectSessionInfo;
  appName?: string;
}

const AUTOMATION_CHIPS = [
  '🏥 Epic Systems / Cerner Bidirectional FHIR R4 Ingestion',
  '⏱️ Automated ED Boarding & PACU Discharge Bottleneck Predictor',
  '🧹 EVS Room Turnover Automated QR Dispatch',
  '🚨 Multi-Wing ICU Telemetry & Code Blue Route Audio Alerts',
  '🔒 Sub-Department HIPAA Audit Ledger & Shift Auto-Lock',
  '📊 Automated CMS 30-Day Readmission & Length-of-Stay KPI Export'
];

export const ExitSurveyModal: React.FC<ExitSurveyModalProps> = ({
  isOpen,
  onClose,
  prospectSession,
  appName = 'Clinical Pristine OS'
}) => {
  const [problemScore, setProblemScore] = useState<number>(5);
  const [pricingScore, setPricingScore] = useState<number>(5);
  const [customizationNotes, setCustomizationNotes] = useState<string>('');
  const [selectedAutomations, setSelectedAutomations] = useState<string[]>([
    '🏥 Epic Systems / Cerner Bidirectional FHIR R4 Ingestion',
    '⏱️ Automated ED Boarding & PACU Discharge Bottleneck Predictor'
  ]);

  // Pre-populated identity fields
  const [orgName, setOrgName] = useState(prospectSession.organization || '');
  const [contactName, setContactName] = useState(prospectSession.name || '');
  const [contactEmail, setContactEmail] = useState(prospectSession.email || '');
  const [contactTitle, setContactTitle] = useState(prospectSession.title || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (prospectSession.organization && !orgName) setOrgName(prospectSession.organization);
    if (prospectSession.name && !contactName) setContactName(prospectSession.name);
    if (prospectSession.email && !contactEmail) setContactEmail(prospectSession.email);
    if (prospectSession.title && !contactTitle) setContactTitle(prospectSession.title);
  }, [prospectSession]);

  if (!isOpen) return null;

  const toggleAutomation = (chip: string) => {
    setSelectedAutomations(prev => 
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      app: appName,
      submittedAt: new Date().toISOString(),
      organization: orgName || 'Hospital / Health System',
      contactName: contactName || 'Clinical Lead',
      contactEmail: contactEmail || 'N/A',
      contactTitle: contactTitle || 'Chief Medical Officer / VP Nursing',
      problemReductionRating: `${problemScore} / 5 Stars`,
      pricingRoiRating: `${pricingScore} / 5 Stars`,
      desiredCustomizations: customizationNotes || 'No specific modifications requested.',
      requestedAutomations: selectedAutomations.join(', '),
      _subject: `🏥 [Demo Evaluation] ${orgName || 'Hospital'} - ${problemScore}/5 Rating (${appName})`
    };

    // 1. Save to Local Ledger
    try {
      const existing = JSON.parse(localStorage.getItem('linkable_exit_survey_ledger') || '[]');
      existing.push(payload);
      localStorage.setItem('linkable_exit_survey_ledger', JSON.stringify(existing, null, 2));
    } catch {}

    // 2. Transmit to FormSubmit Direct Relay
    try {
      await fetch('https://formsubmit.co/ajax/mckinsyo01@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('FormSubmit async notice:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Auto-close after brief confirmation
    setTimeout(() => {
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-900 p-6 md:p-8 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          title="Dismiss"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 border border-blue-300 rounded-full flex items-center justify-center mx-auto text-blue-600">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Salamat sa Iyong Pagsusuri!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Naitala na ang iyong pagsusuri. Gagamitin ito ng aming healthtech engineering team upang mai-customize ang platform para sa hospital SOPs ng <strong>{orgName || 'inyong ospital'}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <Sparkles size={13} /> Quick 1-Minute Clinical Review
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Before You Leave: Help Us Align {appName}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your direct evaluation helps us eliminate ED boarding delays, calibrate HL7/FHIR alerts, and tailor the platform to your hospital SOPs.
              </p>
            </div>

            {/* Auto-Populated Submitter Identity Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-600 font-medium flex items-center gap-1 mb-1">
                  <Building2 size={13} className="text-blue-600" /> Hospital / Health Network
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Salem Health / Regional Medical"
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
              <div>
                <label className="text-slate-600 font-medium flex items-center gap-1 mb-1">
                  <User size={13} className="text-blue-600" /> Executive Contact Name
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Dr. Robert Miller / VP Clinical Ops"
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
              <div>
                <label className="text-slate-600 font-medium flex items-center gap-1 mb-1">
                  <Mail size={13} className="text-blue-600" /> Work Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="director@healthsystem.org"
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
              <div>
                <label className="text-slate-600 font-medium flex items-center gap-1 mb-1">
                  <Briefcase size={13} className="text-blue-600" /> Title / Role
                </label>
                <input
                  type="text"
                  value={contactTitle}
                  onChange={(e) => setContactTitle(e.target.value)}
                  placeholder="e.g. CMO / CIO / Nursing Director"
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            {/* Question 1: Problem Reduction (1-5 Rating) */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
              <label className="block text-xs font-bold text-slate-900">
                1. Will this app help you eliminate critical hospital bottlenecks (ED boarding, bed turnover lag, discharge delays)?
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setProblemScore(star)}
                    className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={star <= problemScore ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-amber-700 ml-2">
                  {problemScore === 5 && '🔥 5/5 - Substantial Bottleneck Relief'}
                  {problemScore === 4 && '⚡ 4/5 - Moderate Relief'}
                  {problemScore === 3 && '📊 3/5 - Neutral'}
                  {problemScore <= 2 && '⚠️ 1-2/5 - Needs Work'}
                </span>
              </div>
            </div>

            {/* Question 2: Pricing ROI vs Current System (1-5 Rating) */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
              <label className="block text-xs font-bold text-slate-900">
                2. Does our zero-SaaS buyout / milestone pricing give you better ROI vs recurring Epic/Cerner add-on license fees?
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setPricingScore(star)}
                    className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={star <= pricingScore ? 'text-emerald-600 fill-emerald-600' : 'text-slate-300'}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-emerald-700 ml-2">
                  {pricingScore === 5 && '💰 5/5 - Substantial ROI Advantage'}
                  {pricingScore === 4 && '📈 4/5 - High Value'}
                  {pricingScore === 3 && '⚖️ 3/5 - Equal'}
                  {pricingScore <= 2 && '📉 1-2/5 - Not Aligned'}
                </span>
              </div>
            </div>

            {/* Question 3: What to Change / Add for Hospital Workflows */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                3. What specific features, telemetry thresholds, or EHR connectors (Epic MyChart, Cerner Millennium, MEDITECH) would you need?
              </label>
              <textarea
                value={customizationNotes}
                onChange={(e) => setCustomizationNotes(e.target.value)}
                placeholder="e.g. Integrate with our existing Epic ADT feed, customize ICU telemetry alert protocols, or add specific pharmacy dispensing workflows..."
                rows={2}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 placeholder:text-slate-400 font-sans resize-none"
              />
            </div>

            {/* Question 4: Automations Selection Chips */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-1">
                <Zap size={14} className="text-blue-600" /> 4. Which clinical automations would you like enabled for your hospital?
              </label>
              <div className="flex flex-wrap gap-2">
                {AUTOMATION_CHIPS.map((chip) => {
                  const isSelected = selectedAutomations.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleAutomation(chip)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Skip &amp; Close
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Submit &amp; Send Review</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
