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
  '⚖️ AI Devil’s Moot Court Pre-Litigation Defense Engine',
  '📑 Automated ERISA § 503 & Prompt-Pay Statute Brief Drafter',
  '📠 Electronic HIPAA E-Fax Direct Dispatcher with Legal Header',
  '🔍 OCR EOB/Denial Letter Discrepancy & Line-Item Matcher',
  '💰 Multi-Payer Statutory Interest Penalty Compounding Calculator',
  '🏥 Epic / Cerner 835/837 EDI Revenue Cycle Automated Sync'
];

export const ExitSurveyModal: React.FC<ExitSurveyModalProps> = ({
  isOpen,
  onClose,
  prospectSession,
  appName = 'ClaimGuard AI Legal Defense OS'
}) => {
  const [problemScore, setProblemScore] = useState<number>(5);
  const [pricingScore, setPricingScore] = useState<number>(5);
  const [customizationNotes, setCustomizationNotes] = useState<string>('');
  const [selectedAutomations, setSelectedAutomations] = useState<string[]>([
    '⚖️ AI Devil’s Moot Court Pre-Litigation Defense Engine',
    '📑 Automated ERISA § 503 & Prompt-Pay Statute Brief Drafter'
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
      organization: orgName || 'Hospital Network / Health System Legal Counsel',
      contactName: contactName || 'General Counsel / RCM Lead',
      contactEmail: contactEmail || 'N/A',
      contactTitle: contactTitle || 'VP Managed Care / Legal Counsel',
      problemReductionRating: `${problemScore} / 5 Stars`,
      pricingRoiRating: `${pricingScore} / 5 Stars`,
      desiredCustomizations: customizationNotes || 'No specific modifications requested.',
      requestedAutomations: selectedAutomations.join(', '),
      _subject: `⚖️ [Demo Evaluation] ${orgName || 'Hospital Legal'} - ${problemScore}/5 Rating (${appName})`
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-xl bg-[#0e1726] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100 p-6 md:p-8 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Dismiss"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/40 rounded-full flex items-center justify-center mx-auto text-cyan-400">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Salamat sa Iyong Pagsusuri!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Naitala na ang iyong feedback. Gagamitin ito ng aming legal-tech engineering team upang mai-akma ang claims appeals engine para sa <strong>{orgName || 'inyong ospital o legal department'}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <Sparkles size={13} /> Quick 1-Minute Claims Defense Review
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Before You Leave: Help Us Align {appName}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Your direct evaluation helps us overturn wrongful insurer claim denials, calculate statutory prompt-pay interest, and eliminate legal retainers.
              </p>
            </div>

            {/* Auto-Populated Submitter Identity Card */}
            <div className="bg-[#070c14] border border-slate-800 rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <Building2 size={13} className="text-cyan-400" /> Health System / Hospital Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Salem Health / Regional Medical"
                  className="w-full bg-[#0e1726] border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400 font-medium"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <User size={13} className="text-cyan-400" /> Executive Contact Name
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. VP Managed Care / General Counsel"
                  className="w-full bg-[#0e1726] border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400 font-medium"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <Mail size={13} className="text-cyan-400" /> Work Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="legal@hospital.org"
                  className="w-full bg-[#0e1726] border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400 font-medium"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <Briefcase size={13} className="text-cyan-400" /> Title / Role
                </label>
                <input
                  type="text"
                  value={contactTitle}
                  onChange={(e) => setContactTitle(e.target.value)}
                  placeholder="e.g. VP Revenue Cycle / Chief Legal Officer"
                  className="w-full bg-[#0e1726] border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400 font-medium"
                />
              </div>
            </div>

            {/* Question 1: Problem Reduction (1-5 Rating) */}
            <div className="bg-[#070c14] border border-slate-800 rounded-xl p-3.5 space-y-2">
              <label className="block text-xs font-bold text-slate-200">
                1. Will this app help you recover stalled claims revenue and eliminate payer denial backlogs?
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
                      className={star <= problemScore ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-amber-400 ml-2">
                  {problemScore === 5 && '🔥 5/5 - High Dollar Recovery Potential'}
                  {problemScore === 4 && '⚡ 4/5 - Moderate Reduction'}
                  {problemScore === 3 && '📊 3/5 - Neutral'}
                  {problemScore <= 2 && '⚠️ 1-2/5 - Needs Adjustments'}
                </span>
              </div>
            </div>

            {/* Question 2: Pricing ROI vs Current System (1-5 Rating) */}
            <div className="bg-[#070c14] border border-slate-800 rounded-xl p-3.5 space-y-2">
              <label className="block text-xs font-bold text-slate-200">
                2. Does our zero-SaaS buyout / milestone pricing give you better ROI vs expensive law firm contingency retainers?
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
                      className={star <= pricingScore ? 'text-cyan-400 fill-cyan-400' : 'text-slate-600'}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-cyan-400 ml-2">
                  {pricingScore === 5 && '💰 5/5 - Massive Legal Cost Savings'}
                  {pricingScore === 4 && '📈 4/5 - Good Value'}
                  {pricingScore === 3 && '⚖️ 3/5 - Equal'}
                  {pricingScore <= 2 && '📉 1-2/5 - Not Aligned'}
                </span>
              </div>
            </div>

            {/* Question 3: What to Change / Add for Workflows */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                3. What specific state statutes (e.g. Texas Prompt Pay, California Knox-Keene) or EHR connectors (Epic Resolute, Cerner RevWorks) would you need?
              </label>
              <textarea
                value={customizationNotes}
                onChange={(e) => setCustomizationNotes(e.target.value)}
                placeholder="e.g. Integrate with our Epic Resolute denial workqueues, add specific Medicare Advantage pre-litigation templates..."
                rows={2}
                className="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500 font-sans resize-none"
              />
            </div>

            {/* Question 4: Automations Selection Chips */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-2 flex items-center gap-1">
                <Zap size={14} className="text-cyan-400" /> 4. Which legal automations would you like enabled for your hospital?
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
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold'
                          : 'bg-[#070c14] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Skip &amp; Close
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Submit &amp; Send Feedback</span>
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
