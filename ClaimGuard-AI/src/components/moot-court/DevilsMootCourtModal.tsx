import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, ShieldAlert, Award, ArrowRight, 
  CheckCircle2, RefreshCw, AlertTriangle, Scale, Lock
} from 'lucide-react';
import { CaseStudy } from '../../engine/edgeCaseStudiesData';
import { DevilsMootCourtEngine, MootCourtDebateSession } from '../../engine/devilsMootCourtEngine';

interface DevilsMootCourtModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

export const DevilsMootCourtModal: React.FC<DevilsMootCourtModalProps> = ({
  isOpen,
  onClose,
  caseStudy
}) => {
  if (!isOpen || !caseStudy) return null;

  const [session, setSession] = useState<MootCourtDebateSession | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const res = DevilsMootCourtEngine.executeMootDebate(
      caseStudy.id,
      'Patient Chart Attached',
      caseStudy.payer,
      caseStudy.atRiskAmount,
      caseStudy.specialty,
      caseStudy.title
    );
    setSession(res);
  }, [caseStudy]);

  if (!session) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 80,
      display: 'flex',
      justifyContent: 'flex-end',
      pointerEvents: 'none'
    }}>
      {/* Non-blinding transparent click-away overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.25)',
          pointerEvents: 'auto',
          transition: 'opacity var(--duration-fast) var(--ease-spring-smooth)'
        }}
      />

      {/* Context-Preserving Slide-in Right Drawer */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '720px',
        height: '100%',
        background: 'var(--bg-drawer)',
        borderLeft: '1px solid var(--border-medium)',
        borderTop: '1px solid rgba(255, 255, 255, 0.16)',
        boxShadow: 'var(--shadow-drawer)',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'auto',
        animation: 'slideInRight var(--duration-drawer) var(--ease-spring-snappy)'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
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
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(99, 102, 241, 0.2))',
              border: '1px solid var(--status-rose-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--status-rose)'
            }}>
              <Scale size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800 }}>Devil's Moot Court: Pre-Submission Adversarial Debate</h3>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--status-cyan-bg)',
                  color: 'var(--status-cyan)'
                }}>
                  {session.claimId}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Target Payer: <strong>{caseStudy.payer}</strong> • At-Risk: <strong style={{ color: 'var(--status-rose)' }}>${caseStudy.atRiskAmount.toLocaleString()}</strong>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Debate Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {session.turns.map((t, idx) => {
            const isDevil = t.speaker === 'DEVIL_ATTORNEY';

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: isDevil ? 'rgba(244, 63, 94, 0.08)' : 'rgba(6, 182, 212, 0.08)',
                  border: isDevil ? '1px solid rgba(244, 63, 94, 0.25)' : '1px solid rgba(6, 182, 212, 0.25)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px' }}>{isDevil ? '😈' : '🛡️'}</span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: isDevil ? 'var(--status-rose)' : 'var(--status-cyan)'
                    }}>
                      {isDevil ? "The Devil's Payer Attorney" : "Counsel Lexis (Hospital Defense)"}
                    </span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {t.timestamp}
                  </span>
                </div>
                <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                  {t.statement}
                </p>
                {t.citedStatuteOrPolicy && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(0, 0, 0, 0.3)',
                        color: isDevil ? 'var(--status-rose)' : 'var(--status-emerald)'
                      }}
                    >
                      § {t.citedStatuteOrPolicy}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Action Ledger & Certification */}
          <div style={{
            marginTop: '8px',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderTop: '1px solid rgba(255, 255, 255, 0.16)'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, marginBottom: '8px', color: 'var(--status-emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} />
              <span>Pre-Submission Statutory Action Ledger Generated:</span>
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {session.actionLedger.map((a, aIdx) => (
                <li key={aIdx}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface-elevated)'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Certificate ID: <strong>{session.ironcladCertificateId}</strong>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--status-emerald), var(--status-cyan))',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 800
            }}
          >
            Apply Defense Patch & Approve EDI Dispatch
          </button>
        </div>
      </div>
    </div>
  );
};
