import React from 'react';
import { AlertOctagon, ShieldX, CheckCircle2, ArrowRight } from 'lucide-react';
import { VendorDiagnosticEngine, VendorArchetype } from '../../engine/vendorDiagnosticEngine';

export const VendorArchetypeDiagnostic: React.FC = () => {
  const archetypes: VendorArchetype[] = VendorDiagnosticEngine.getArchetypes();

  return (
    <section className="specular-card" style={{
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Vendor Archetype Diagnostic: "Is Your Current System Doing This To You?"</h2>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--status-rose-bg)',
            color: 'var(--status-rose)',
            border: '1px solid var(--status-rose-border)'
          }}>
            EXECUTIVE AUDIT
          </span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
          Compare your hospital's existing RCM billing software against predatory industry lock-in models.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {archetypes.map((arch) => (
          <div
            key={arch.id}
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderTop: '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: 'var(--shadow-sm)',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1.2fr',
              gap: '16px',
              alignItems: 'center',
              transition: 'transform var(--duration-fast) var(--ease-spring-smooth), border-color var(--duration-fast) var(--ease-spring-smooth)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'var(--status-cyan-border)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            {/* Vendor Name & Modus Operandi */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <AlertOctagon size={16} color="var(--status-rose)" />
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {arch.name}
                </h3>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {arch.modusOperandi}
              </p>
            </div>

            {/* Hidden Extortion Costs */}
            <div style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--status-rose-bg)',
              border: '1px solid var(--status-rose-border)',
              fontSize: '11px',
              color: 'var(--status-rose)'
            }}>
              <span style={{ fontWeight: 800, display: 'block', marginBottom: '2px' }}>
                💸 HIDDEN FINANCIAL DRAIN:
              </span>
              {arch.hiddenCosts}
            </div>

            {/* ClaimGuard Annihilation */}
            <div style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--status-emerald-bg)',
              border: '1px solid var(--status-emerald-border)',
              fontSize: '11px',
              color: 'var(--text-primary)'
            }}>
              <span style={{ fontWeight: 800, color: 'var(--status-emerald)', display: 'block', marginBottom: '2px' }}>
                🛡️ HOW CLAIMGUARD ANNIHILATES IT:
              </span>
              {arch.howClaimGuardAnnihilatesThem}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
