import React from 'react';
import { X, Check, ShieldCheck, DollarSign, ArrowRight, Lock, Award, Building } from 'lucide-react';
import { PricingGapEngine } from '../../engine/pricingGapEngine';

interface PricingGapReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEscrow: (tierName: string, price: number) => void;
}

export const PricingGapReportModal: React.FC<PricingGapReportModalProps> = ({
  isOpen,
  onClose,
  onOpenEscrow
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 85,
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
        maxWidth: '860px',
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
          padding: '20px 28px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--status-emerald), var(--status-cyan))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <DollarSign size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Sovereign Enterprise Pricing & 5-Year Cash Flow Comparison</h3>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--status-emerald-bg)',
                  color: 'var(--status-emerald)',
                  border: '1px solid var(--status-emerald-border)'
                }}>
                  $29.5M SAVED VS BPO
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Modeled on a 300-Bed Regional Hospital ($120,000,000 Net Patient Revenue / 85,000 Annual Claims).
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

        {/* 5-Year Cumulative Financial Comparison Table */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Comparison Matrix Box */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '12px 20px',
              background: 'var(--bg-app)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 800,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              5-Year Cumulative Financial Drain Matrix: Legacy BPO Extortion vs ClaimGuard AI
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '11px' }}>
                  <th style={{ padding: '12px 20px' }}>Pricing Archetype</th>
                  <th style={{ padding: '12px 20px' }}>Year 1 Expense</th>
                  <th style={{ padding: '12px 20px' }}>3-Year Cumulative</th>
                  <th style={{ padding: '12px 20px' }}>5-Year Cumulative TCO</th>
                  <th style={{ padding: '12px 20px' }}>Software Ownership</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', background: 'rgba(244, 63, 94, 0.05)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--status-rose)' }}>
                    1. 5% Rev-Share BPO (R1, Ensemble, Optum)
                  </td>
                  <td style={{ padding: '14px 20px' }}>$6,000,000</td>
                  <td style={{ padding: '14px 20px' }}>$18,000,000</td>
                  <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--status-rose)' }}>$30,000,000</td>
                  <td style={{ padding: '14px 20px', color: 'var(--status-rose)', fontWeight: 600 }}>0% (Pure Extortion)</td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700 }}>
                    2. Legacy Enterprise SaaS (Waystar, Epic Modules)
                  </td>
                  <td style={{ padding: '14px 20px' }}>$620,000</td>
                  <td style={{ padding: '14px 20px' }}>$1,320,000</td>
                  <td style={{ padding: '14px 20px' }}>$2,020,000</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>0% (Rented Forever)</td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-subtle)', background: 'rgba(6, 182, 212, 0.05)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--status-cyan)' }}>
                    3. ClaimGuard AI Tier 2 (Annual Enterprise)
                  </td>
                  <td style={{ padding: '14px 20px' }}>$185,000</td>
                  <td style={{ padding: '14px 20px' }}>$555,000</td>
                  <td style={{ padding: '14px 20px', color: 'var(--status-cyan)', fontWeight: 700 }}>$925,000</td>
                  <td style={{ padding: '14px 20px', color: 'var(--status-cyan)' }}>Full Hospital License</td>
                </tr>

                <tr style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--status-emerald)' }}>
                    4. ClaimGuard AI Tier 3 (100% IP Buyout)
                  </td>
                  <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--status-emerald)' }}>$485,000</td>
                  <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--status-emerald)' }}>$485,000 ($0 in Yr 2-3)</td>
                  <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--status-emerald)' }}>$485,000 ($0 in Yr 4-5)</td>
                  <td style={{ padding: '14px 20px', color: 'var(--status-emerald)', fontWeight: 800 }}>100% Sovereign Code</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 4 Tiers Pricing Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
            {/* Tier 1 */}
            <div style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  🥉 Tier 1: Clinical Pilot
                </span>
                <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
                  $12,500 <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>/ mo</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Single high-acuity department (Ortho/Cardio/Oncology). Up to 15,000 claims/mo.
                </p>
              </div>
              <button
                onClick={() => onOpenEscrow('Tier 1: Clinical Department Pilot', 12500)}
                style={{
                  marginTop: '16px',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '11px',
                  fontWeight: 700
                }}
              >
                Select Pilot
              </button>
            </div>

            {/* Tier 2 */}
            <div style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--status-cyan)', textTransform: 'uppercase' }}>
                  🥈 Tier 2: Full Enterprise Hospital
                </span>
                <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
                  $185,000 <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>/ year</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Entire hospital (250-500 beds). Unlimited claims, Dual US/UK, Moot Court, Scanner Bridge.
                </p>
              </div>
              <button
                onClick={() => onOpenEscrow('Tier 2: Full Enterprise Hospital', 185000)}
                style={{
                  marginTop: '16px',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--status-cyan-bg)',
                  border: '1px solid var(--status-cyan-border)',
                  color: 'var(--status-cyan)',
                  fontSize: '11px',
                  fontWeight: 700
                }}
              >
                Select Enterprise Annual
              </button>
            </div>

            {/* Tier 3: Flagship Sovereign Buyout */}
            <div style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15))',
              border: '2px solid var(--status-emerald)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '16px',
                background: 'var(--status-emerald)',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)'
              }}>
                MOST POPULAR BUYOUT
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--status-emerald)', textTransform: 'uppercase' }}>
                  🥇 Tier 3: 100% IP Sovereign Buyout
                </span>
                <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--status-emerald)' }}>
                  $485,000 <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>One-Time ($0 Yr 2-5+)</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
                  100% Source Code Ownership in self-hosted HIPAA VPC. Zero revenue share forever!
                </p>
              </div>
              <button
                onClick={() => onOpenEscrow('Tier 3: 100% Sovereign IP Buyout', 485000)}
                style={{
                  marginTop: '16px',
                  padding: '9px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--status-emerald)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 800,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                Initiate $485K 3-Gives Escrow
              </button>
            </div>

            {/* Tier 4 */}
            <div style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--status-indigo)', textTransform: 'uppercase' }}>
                  💎 Tier 4: Reseller Franchise
                </span>
                <div style={{ fontSize: '22px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
                  $750,000 <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)' }}>+ 5-10%</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Multi-hospital health systems (10+ facilities) and commercial healthcare IT resellers.
                </p>
              </div>
              <button
                onClick={() => onOpenEscrow('Tier 4: Commercial Reseller Franchise', 750000)}
                style={{
                  marginTop: '16px',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--status-indigo-bg)',
                  border: '1px solid var(--status-indigo-border)',
                  color: 'var(--status-indigo)',
                  fontSize: '11px',
                  fontWeight: 700
                }}
              >
                Franchise Licensing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
