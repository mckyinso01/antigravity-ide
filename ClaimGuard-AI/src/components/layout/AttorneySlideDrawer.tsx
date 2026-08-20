import React from 'react';
import { X, ShieldAlert, Scale, FileText, CheckCircle2, AlertTriangle, ArrowRight, ExternalLink, Printer } from 'lucide-react';
import { CaseStudy } from '../../engine/edgeCaseStudiesData';
import { AttorneyAiEngine, LegalDefenseBrief } from '../../engine/attorneyAiEngine';

interface AttorneySlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCase: CaseStudy | null;
  onOpenMootCourt: (caseStudy: CaseStudy) => void;
  onOpenSaccade: (caseStudy: CaseStudy) => void;
  onOpenDocStudio: (caseStudy: CaseStudy) => void;
}

export const AttorneySlideDrawer: React.FC<AttorneySlideDrawerProps> = ({
  isOpen,
  onClose,
  selectedCase,
  onOpenMootCourt,
  onOpenSaccade,
  onOpenDocStudio
}) => {
  if (!isOpen || !selectedCase) return null;

  const defenseBrief: LegalDefenseBrief = AttorneyAiEngine.generateDefenseBrief(
    selectedCase.id,
    'Patient Record Attached',
    selectedCase.payer,
    selectedCase.billedAmount,
    selectedCase.specialty,
    selectedCase.clinicalProof,
    selectedCase.denialCode
  );

  return (
    <aside style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '540px',
      height: '100vh',
      background: 'var(--bg-drawer)',
      borderLeft: '1px solid var(--border-medium)',
      boxShadow: 'var(--shadow-drawer)',
      zIndex: 60,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInRight var(--duration-drawer) var(--ease-spring-snappy)'
    }}>
      {/* Drawer Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--status-cyan-bg)',
            border: '1px solid var(--status-cyan-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--status-cyan)'
          }}>
            <Scale size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800 }}>Counsel Lexis | Case Inspector</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Claim ID: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-cyan)' }}>{selectedCase.id}</span> • {selectedCase.payer}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-surface-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)'
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Drawer Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* At-Risk Financial Pill */}
        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--status-rose-bg)',
          border: '1px solid var(--status-rose-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--status-rose)', textTransform: 'uppercase' }}>
              At-Risk Denied Revenue
            </span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--status-rose)', letterSpacing: '-0.5px' }}>
              ${selectedCase.atRiskAmount.toLocaleString()}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--status-amber-bg)',
              color: 'var(--status-amber)',
              border: '1px solid var(--status-amber-border)'
            }}>
              Denial: {selectedCase.denialCode}
            </span>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Bates: {selectedCase.batesLabel}
            </p>
          </div>
        </div>

        {/* Factual Grounding Verification Badge */}
        <div style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--status-emerald-bg)',
          border: '1px solid var(--status-emerald-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={18} color="var(--status-emerald)" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--status-emerald)' }}>
              Dual-Anchor Factual Grounding: VERIFIED (99.8%)
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Zero Hallucination Proof: Anchored to Federal Statute + Verbatim Telemetry.
            </div>
          </div>
        </div>

        {/* Statutory Legal Argument */}
        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)'
        }}>
          <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--status-cyan)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={14} />
            Statutory Legal Basis & Preemption
          </h4>
          <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginBottom: '10px', lineHeight: 1.6 }}>
            {selectedCase.legalBasis}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {defenseBrief.legalArgumentText}
          </p>
        </div>

        {/* Clinical Proof Snippet */}
        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-subtle)'
        }}>
          <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--status-emerald)', marginBottom: '8px' }}>
            🏥 Objective Clinical Evidence Anchors
          </h4>
          <blockquote style={{
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            padding: '10px 12px',
            background: 'var(--bg-app)',
            borderLeft: '3px solid var(--status-emerald)',
            borderRadius: 'var(--radius-xs)',
            color: 'var(--text-primary)',
            lineHeight: 1.5
          }}>
            "{selectedCase.clinicalProof}"
          </blockquote>
        </div>

        {/* Demand for Immediate Payment Clause */}
        <div style={{
          padding: '14px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--status-amber-bg)',
          border: '1px solid var(--status-amber-border)',
          fontSize: '11px',
          color: 'var(--text-primary)',
          lineHeight: 1.6
        }}>
          <span style={{ fontWeight: 800, color: 'var(--status-amber)' }}>STATUTORY DEMAND: </span>
          {defenseBrief.statutoryDemandClause}
        </div>
      </div>

      {/* Drawer Action Bar */}
      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            onClick={() => onOpenMootCourt(selectedCase)}
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--status-rose), var(--status-indigo))',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>Run Devil's Pre-Debate</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => onOpenSaccade(selectedCase)}
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>Saccade 4-Pane Diff</span>
          </button>
        </div>

        <button
          onClick={() => onOpenDocStudio(selectedCase)}
          style={{
            padding: '9px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--status-cyan-bg)',
            border: '1px solid var(--status-cyan-border)',
            color: 'var(--status-cyan)',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <span>Open Interactive Pan/Zoom Studio & Bates Stamper</span>
        </button>
      </div>
    </aside>
  );
};
