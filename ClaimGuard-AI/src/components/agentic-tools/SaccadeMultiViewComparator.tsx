import React from 'react';
import { X, Eye, CheckCircle2, AlertTriangle, Scale, ArrowRight } from 'lucide-react';
import { CaseStudy } from '../../engine/edgeCaseStudiesData';
import { SaccadeComparatorEngine, SaccadeComparisonFrame } from '../../engine/saccadeComparatorEngine';

interface SaccadeMultiViewComparatorProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

export const SaccadeMultiViewComparator: React.FC<SaccadeMultiViewComparatorProps> = ({
  isOpen,
  onClose,
  caseStudy
}) => {
  if (!isOpen || !caseStudy) return null;

  const frames: SaccadeComparisonFrame[] = SaccadeComparatorEngine.generate4PaneDiff(caseStudy.id);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1180px',
        maxHeight: '90vh',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'fadeIn var(--duration-fast) var(--ease-spring-smooth)'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface-elevated)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--status-cyan-bg)',
              border: '1px solid var(--status-cyan-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--status-cyan)'
            }}>
              <Eye size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Saccade 4-Pane Visual Optical Diff Comparator</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Synchronized 4-column token alignment across EHR, Billing Envelope, Payer Policy, and Statutory Patch.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* 4-Column Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          <div style={{ padding: '12px 16px', borderRight: '1px solid var(--border-subtle)' }}>
            1. EHR Clinical Narrative
          </div>
          <div style={{ padding: '12px 16px', borderRight: '1px solid var(--border-subtle)' }}>
            2. Itemized EDI 837 Line
          </div>
          <div style={{ padding: '12px 16px', borderRight: '1px solid var(--border-subtle)' }}>
            3. {caseStudy.payer} Policy Clause
          </div>
          <div style={{ padding: '12px 16px' }}>
            4. Counsel Lexis Statutory Patch
          </div>
        </div>

        {/* 4-Column Rows */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {frames.map((frame, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr',
                borderRadius: 'var(--radius-md)',
                background: frame.isDiscrepancy ? 'var(--status-amber-bg)' : 'var(--bg-surface-elevated)',
                border: frame.isDiscrepancy ? '1px solid var(--status-amber-border)' : '1px solid var(--border-subtle)',
                fontSize: '12px',
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '14px 16px', borderRight: '1px solid var(--border-subtle)', lineHeight: 1.5, color: 'var(--text-primary)' }}>
                {frame.ehrClinicalNarrative}
              </div>
              <div style={{ padding: '14px 16px', borderRight: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
                {frame.itemizedBillingLine}
              </div>
              <div style={{ padding: '14px 16px', borderRight: '1px solid var(--border-subtle)', fontSize: '11px', color: 'var(--text-muted)' }}>
                {frame.payerPolicyClause}
              </div>
              <div style={{ padding: '14px 16px', fontWeight: 600, color: frame.isDiscrepancy ? 'var(--status-amber)' : 'var(--status-emerald)' }}>
                {frame.counselLexisStatutoryPatch}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          background: 'var(--bg-surface-elevated)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Optical Saccade Verification: <span style={{ color: 'var(--status-emerald)', fontWeight: 700 }}>100% Token Concordance Verified</span>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--status-cyan)',
              color: 'var(--text-inverse)',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            Confirm & Save Saccade Mapping
          </button>
        </div>
      </div>
    </div>
  );
};
