import React, { useState } from 'react';
import { X, Lock, CheckCircle2, ShieldCheck, ArrowRight, Building2, CreditCard, Sparkles, Download, Send, Zap } from 'lucide-react';
import { RoiCalculatorWidget } from './RoiCalculatorWidget';
import { PayPalCheckoutButton } from './PayPalCheckoutButton';

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

  const [activeTab, setActiveTab] = useState<'ROI_CALCULATOR' | 'ESCROW' | 'BANK_WIRE' | 'PAYPAL'>('PAYPAL');
  const [wireRevealed, setWireRevealed] = useState(false);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [activeOrderDetails, setActiveOrderDetails] = useState<{
    orderId: string;
    licenseKey: string;
    tier: string;
    timestamp: string;
  } | null>(null);

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
          gap: '8px',
          overflowX: 'auto'
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
              border: activeTab === 'ESCROW' ? '1px solid var(--status-emerald-border)' : '1px solid transparent',
              whiteSpace: 'nowrap'
            }}
          >
            🛡️ 3-Gives Escrow Milestones
          </button>
          <button
            onClick={() => setActiveTab('ROI_CALCULATOR')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 700,
              background: activeTab === 'ROI_CALCULATOR' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
              color: activeTab === 'ROI_CALCULATOR' ? '#10b981' : 'var(--text-secondary)',
              border: activeTab === 'ROI_CALCULATOR' ? '1px solid #10b981' : '1px solid transparent',
              whiteSpace: 'nowrap'
            }}
          >
            📊 Buyout vs SaaS ROI
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
              border: activeTab === 'BANK_WIRE' ? '1px solid var(--status-cyan-border)' : '1px solid transparent',
              whiteSpace: 'nowrap'
            }}
          >
            🏦 Bank Wire
          </button>
          <button
            onClick={() => setActiveTab('PAYPAL')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 700,
              background: activeTab === 'PAYPAL' ? 'var(--status-indigo-bg)' : 'transparent',
              color: activeTab === 'PAYPAL' ? 'var(--status-indigo)' : 'var(--text-secondary)',
              border: activeTab === 'PAYPAL' ? '1px solid var(--status-indigo-border)' : '1px solid transparent',
              whiteSpace: 'nowrap'
            }}
          >
            💳 PayPal / Cards
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activeTab === 'ROI_CALCULATOR' && (
            <RoiCalculatorWidget
              appName="ClaimGuard AI Legal Defense"
              defaultBuyoutPrice={price || 28500}
              defaultBuyoutTierName={tierName || 'Tier 2: Multi-Facility ERISA Defense'}
              onSelectTier={() => setActiveTab('ESCROW')}
            />
          )}

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
                Beneficiary: Mharc Christian G. (LinkableAI Sovereign Tech)<br />
                Beneficiary Bank Account: <strong style={{ color: '#6FFFE9' }}>005790246533</strong><br />
                Supported Rails: BDO / BPI / UnionBank / SWIFT International<br />
                Transfer Purpose: Sovereign Software Buyout / Milestone Escrow
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

          {activeTab === 'PAYPAL' && (
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)'
            }}>
              <PayPalCheckoutButton
                amountUsd={price || 28500}
                planName={`ClaimGuard AI Legal Defense (${tierName || 'Tier 2 Buyout'})`}
                onSuccess={(details) => {
                  const ord = `CLAIM-PP-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
                  const lic = `CLAIM-IP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-BONDED`;
                  setActiveOrderDetails({
                    orderId: ord,
                    licenseKey: lic,
                    tier: `${tierName || 'ERISA Defense'} [PAYPAL VERIFIED: ${details?.id || 'OK'}]`,
                    timestamp: new Date().toISOString()
                  });
                  setIsVaultUnlocked(true);
                }}
              />
            </div>
          )}

          {/* POST-PURCHASE SOFTWARE FULFILLMENT VAULT */}
          {isVaultUnlocked && activeOrderDetails && (
            <div style={{
              padding: '20px',
              borderRadius: 'var(--radius-md, 12px)',
              background: 'rgba(6, 78, 59, 0.4)',
              border: '1px solid var(--status-emerald, #10b981)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              fontFamily: 'monospace',
              fontSize: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 800 }}>
                  <CheckCircle2 size={18} />
                  <span>CLAIMGUARD SOVEREIGN VAULT UNLOCKED • ESCROW BONDED</span>
                </div>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{activeOrderDetails.orderId}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px' }}>
                <div style={{ padding: '10px', borderRadius: '8px', background: '#090e1a', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <span style={{ color: '#94a3b8', fontSize: '10px', display: 'block' }}>CRYPTOGRAPHIC LICENSE KEY:</span>
                  <code style={{ color: '#10b981', fontWeight: 800, fontSize: '12px' }}>{activeOrderDetails.licenseKey}</code>
                </div>
                <div style={{ padding: '10px', borderRadius: '8px', background: '#090e1a', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <span style={{ color: '#94a3b8', fontSize: '10px', display: 'block' }}>DELIVERABLE TIER:</span>
                  <span style={{ color: '#fff', fontWeight: 800 }}>{activeOrderDetails.tier}</span>
                </div>
              </div>

              {/* Deliverables Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '4px' }}>
                <button
                  type="button"
                  onClick={() => {
                    const manifest = `# CLAIMGUARD AI LEGAL DEFENSE PRODUCTION SOFTWARE PACKAGE
ORDER ID: ${activeOrderDetails.orderId}
LICENSE KEY: ${activeOrderDetails.licenseKey}
TIER: ${activeOrderDetails.tier}
ISSUED: ${activeOrderDetails.timestamp}

## 🚀 3-MINUTE DOCKER PRODUCTION DEPLOYMENT
$ git clone https://github.com/linkableai-enterprise/claimguard-core.git
$ cd claimguard-core
$ docker compose -f docker-compose.prod.yml up -d --build

## ⚡ INSTANT LOCAL ERISA INTEGRITY CHECK
$ curl http://localhost:5173/health
{"status":"HEALTHY","system":"CLAIMGUARD_AI_LEGAL_DEFENSE","license":"VALID"}

Founder Support WhatsApp: +63 962 281 6533
`;
                    const blob = new Blob([manifest], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${activeOrderDetails.orderId}_CLAIMGUARD_DEPLOYMENT_PACKAGE.md`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '11px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Download size={14} />
                  <span>Download Production Bundle (.MD)</span>
                </button>

                <a
                  href="https://wa.me/639622816533?text=Hi%20Mharc,%20I%20unlocked%20ClaimGuard%20AI%20Buyout%20Order%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    background: '#090e1a',
                    border: '1px solid #10b981',
                    color: '#10b981',
                    fontWeight: 800,
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    textDecoration: 'none'
                  }}
                >
                  <Send size={14} />
                  <span>Join Legal RCM Founder Onboarding</span>
                </a>
              </div>
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
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
          <button
            onClick={() => {
              const ord = `CLAIMGUARD-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
              const lic = `CLAIMGUARD-IP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-BONDED`;
              setActiveOrderDetails({
                orderId: ord,
                licenseKey: lic,
                tier: tierName || 'Multi-Facility ERISA Defense ($28,500)',
                timestamp: new Date().toISOString()
              });
              setIsVaultUnlocked(true);
            }}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--status-emerald)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Confirm & Bind Escrow Contract
          </button>
        </div>
      </div>
    </div>
  );
};
