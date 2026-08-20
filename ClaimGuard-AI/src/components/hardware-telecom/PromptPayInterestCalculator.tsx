import React, { useState, useEffect } from 'react';
import { X, Scale, Calculator, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { PromptPayInterestEngine, STATE_PROMPT_PAY_LAWS } from '../../engine/promptPayInterestEngine';

interface PromptPayInterestCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptPayInterestCalculator: React.FC<PromptPayInterestCalculatorProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [claimAmount, setClaimAmount] = useState<number>(48500);
  const [daysOverdue, setDaysOverdue] = useState<number>(75);
  const [stateCode, setStateCode] = useState<string>('TX');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const calc = PromptPayInterestEngine.calculatePenaltyInterest(claimAmount, daysOverdue, stateCode);
  const activeLaw = STATE_PROMPT_PAY_LAWS[stateCode] || STATE_PROMPT_PAY_LAWS['TX'];

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
        maxWidth: '580px',
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
              background: 'var(--status-amber-bg)',
              border: '1px solid var(--status-amber-border)',
              color: 'var(--status-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Scale size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800 }}>State Prompt Pay Statutory Penalty Calculator</h3>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                1.5%–2.0%/mo statutory interest accrual on delayed hospital payments
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

        {/* Scrollable Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Select State Statutory Jurisdiction:
            </label>
            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              {Object.keys(STATE_PROMPT_PAY_LAWS).map((code) => (
                <option key={code} value={code}>
                  {STATE_PROMPT_PAY_LAWS[code].stateName} ({(STATE_PROMPT_PAY_LAWS[code].monthlyInterestRate * 1200).toFixed(1)}% Annual Rate) - {STATE_PROMPT_PAY_LAWS[code].statuteCitation}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Unpaid Claim Principal ($):
              </label>
              <input
                type="number"
                value={claimAmount}
                onChange={(e) => setClaimAmount(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Days Since Clean Submission:
              </label>
              <input
                type="number"
                value={daysOverdue}
                onChange={(e) => setDaysOverdue(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700
                }}
              />
            </div>
          </div>

          {/* Statutory Breakdown Result Card */}
          <div style={{
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderTop: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Statutory Accrued Penalty Interest:</span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--status-amber)', fontFamily: 'var(--font-mono)' }}>
                +${calc.totalInterestPenalty.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Total Demand Amount Payable:</span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--status-emerald)', fontFamily: 'var(--font-mono)' }}>
                ${calc.totalDemandAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '12px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}>
              <strong>Statutory Citation:</strong> {calc.statutoryCitation}
            </div>
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
            Statutory window: <strong>{activeLaw.statutoryDaysCleanClaim} calendar days</strong>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--status-amber), var(--status-rose))',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            Attach Demand Letter to EDI Packet
          </button>
        </div>
      </div>
    </div>
  );
};
