import React, { useState } from 'react';
import { X, Lock, CheckCircle2, ShieldCheck, ArrowRight, Building2, CreditCard } from 'lucide-react';

interface BuyoutEscrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierName: string;
  price: number;
}

export const BuyoutEscrowModal: React.FC<BuyoutEscrowModalProps> = ({
  isOpen,
  onClose,
  tierName,
  price
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'ESCROW' | 'BANK_WIRE' | 'PAYMONGO'>('ESCROW');
  const [wireRevealed, setWireRevealed] = useState(false);

  const milestone1 = price * 0.3;
  const milestone2 = price * 0.4;
  const milestone3 = price * 0.3;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 90,
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
        maxWidth: '640px',
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
              background: 'var(--status-emerald-bg)',
              border: '1px solid var(--status-emerald-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--status-emerald)'
            }}>
              <Lock size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>3-Gives Milestone Escrow & Settlement</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {tierName} • <span style={{ color: 'var(--status-emerald)', fontWeight: 700 }}>${price.toLocaleString()}</span>
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

        {/* Tab Selection */}
        <div style={{
          display: 'flex',
          padding: '8px 24px',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          gap: '8px'
        }}>
          <button
            onClick={() => setActiveTab('ESCROW')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 700,
              background: activeTab === 'ESCROW' ? 'var(--status-emerald-bg)' : 'transparent',
              color: activeTab === 'ESCROW' ? 'var(--status-emerald)' : 'var(--text-secondary)',
              border: activeTab === 'ESCROW' ? '1px solid var(--status-emerald-border)' : '1px solid transparent'
            }}
          >
            🛡️ 3-Gives Escrow Milestones
          </button>
          <button
            onClick={() => setActiveTab('BANK_WIRE')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 700,
              background: activeTab === 'BANK_WIRE' ? 'var(--status-cyan-bg)' : 'transparent',
              color: activeTab === 'BANK_WIRE' ? 'var(--status-cyan)' : 'var(--text-secondary)',
              border: activeTab === 'BANK_WIRE' ? '1px solid var(--status-cyan-border)' : '1px solid transparent'
            }}
          >
            🏛️ Institutional Bank Wire / Fedwire
          </button>
          <button
            onClick={() => setActiveTab('PAYMONGO')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 700,
              background: activeTab === 'PAYMONGO' ? 'var(--status-indigo-bg)' : 'transparent',
              color: activeTab === 'PAYMONGO' ? 'var(--status-indigo)' : 'var(--text-secondary)',
              border: activeTab === 'PAYMONGO' ? '1px solid var(--status-indigo-border)' : '1px solid transparent'
            }}
          >
            💳 Corporate Card / PayMongo
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeTab === 'ESCROW' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '12px' }}>Milestone 1 (30%): Core Engine & EHR Setup</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Released upon FHIR R4 connectivity verification.</div>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--status-cyan)' }}>${milestone1.toLocaleString()}</div>
              </div>

              <div style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '12px' }}>Milestone 2 (40%): Moot Court & Scanner Bridge</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Released upon live TWAIN test & Moot Court pre-debate.</div>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--status-cyan)' }}>${milestone2.toLocaleString()}</div>
              </div>

              <div style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '12px' }}>Milestone 3 (30%): Source Code & 100% Clean Pass</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Released upon zero-defect verification & code handover.</div>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--status-emerald)' }}>${milestone3.toLocaleString()}</div>
              </div>
            </div>
          )}

          {activeTab === 'BANK_WIRE' && (
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '12px', color: 'var(--status-cyan)' }}>
                Official Escrow & Fedwire Routing Details:
              </div>
              <div style={{
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.8,
                filter: wireRevealed ? 'none' : 'blur(4px)',
                transition: 'filter 0.3s ease'
              }}>
                Beneficiary: LinkableAI Global Healthcare LLC<br />
                Bank: JPMorgan Chase Bank, N.A. (New York, NY)<br />
                Fedwire ABA Routing: 021000021<br />
                Account Number: 8819-2041-9284-001<br />
                SWIFT / BIC: CHASUS33XXX
              </div>
              {!wireRevealed && (
                <button
                  onClick={() => setWireRevealed(true)}
                  style={{
                    marginTop: '12px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-xs)',
                    background: 'var(--status-cyan)',
                    color: 'var(--text-inverse)',
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                >
                  Reveal Institutional Wire Instructions
                </button>
              )}
            </div>
          )}

          {activeTab === 'PAYMONGO' && (
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}>
              <CreditCard size={32} color="var(--status-indigo)" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontSize: '13px', fontWeight: 700 }}>Corporate Procurement Card / Direct Debit</div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Secure 256-bit encrypted checkout via PayMongo Enterprise Gateway.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          background: 'var(--bg-surface-elevated)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--status-emerald)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 800
            }}
          >
            Confirm & Bind Escrow Contract
          </button>
        </div>
      </div>
    </div>
  );
};
